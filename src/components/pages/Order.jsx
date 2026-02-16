import React, { useState, useEffect } from "react";
import "../../shared/order.css";
import { useSelector } from "react-redux";

const API_BASE_URL = import.meta.env.VITE_API_URL ?? "";

function Order() {
  const authState = useSelector((state) => state.auth);

  const [orders, setOrders] = useState([]);
  const [usersInfo, setUsersInfo] = useState({});
  const [uniqueUserIds, setUniqueUserIds] = useState([]);
  const [expandedItems, setExpandedItems] = useState({});
  const [message, setMessage] = useState(null);

  useEffect(() => {
    async function loadAllData() {
      try {
        const ordersResponse = await fetch(`${API_BASE_URL}/order/all`, {
          credentials: "include",
        });
        const ordersData = await ordersResponse.json();

        const uniqueUserIds = Array.from(
          new Set(ordersData.map((order) => order.user))
        );

        const usersPromises = uniqueUserIds.map(async (userId) => {
          const userResponse = await fetch(`${API_BASE_URL}/order/${userId}`, {
            method: "GET",
            credentials: "include",
          });
          const userData = await userResponse.json();
          return {
            id: userId,
            name: userData.name || userData.username || "Имя неизвестно",
            phoneNumber: userData.phoneNumber || "",
            email: userData.email || "",
          };
        });

        const allUsersData = await Promise.all(usersPromises);

        const usersInfo = {};
        allUsersData.forEach((user) => {
          usersInfo[user.id] = user;
        });

        setOrders(ordersData);
        setUniqueUserIds(uniqueUserIds);
        setUsersInfo(usersInfo);
      } catch (error) {
        console.error("Ошибка при загрузке данных:", error);
      }
    }

    loadAllData();
  }, []);

  async function handleSuccess(orderId) {
    try {
      const response = await fetch(`${API_BASE_URL}/order/${orderId}`, {
        method: "PATCH",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          isActive: false,
        }),
      });

      if (response.ok) {
        const updatedOrder = await response.json();
        setOrders((prevOrders) =>
          prevOrders.map((order) =>
            order._id === orderId ? updatedOrder : order
          )
        );
      } else {
        throw new Error("Ошибка сервера");
      }
    } catch (err) {
      console.error("Ошибка при изменении статуса заказа:", err.message);
      alert("Что-то пошло не так. Попробуйте позже.");
    }
  }

  const activeOrders = orders
    .filter((order) => order.isActive)
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  const inactiveOrders = orders
    .filter((order) => !order.isActive)
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  const deleteOrder = (order) => {
    fetch(`${API_BASE_URL}/order/delete-order/${order._id}`, {
      method: "DELETE",
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => {
        setMessage(data);
        setOrders((prevOrders) =>
          prevOrders.filter((o) => o._id !== order._id)
        );
      })
      .catch((error) => {
        console.error("Ошибка отправки:", error);
      });
  };

  const formatDate = (isoString) => {
    const date = new Date(isoString);
    return `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`;
  };

  return (
    <>
      <div className="container-order-all">
        <h2 className="caption">Активные заказы:</h2>
        <p className="text">{message?.message}</p>
        <div className="orders-container">
          {activeOrders.length > 0 ? (
            activeOrders.map((order, index) => (
              <div className="items-order" key={index}>
                <div className="info-user">
                  {order && (!order.dopName || order.dopName.trim() === "") ? (
                    <>
                      <p className="text-order">
                        Создано:
                        {formatDate(order.createdAt)}
                      </p>
                      <p className="text-order">
                        Имя фамилия:{" "}
                        {usersInfo[order.user]?.name || "Имя неизвестно"}
                      </p>
                      <p className="text-order">
                        Телефон: {usersInfo[order.user]?.phoneNumber || ""}
                      </p>
                    </>
                  ) : (
                    <>
                      <p className="text-order">Адрес: {order.dopAddress}</p>
                      <p className="text-order">Имя: {order.dopName}</p>
                      <p className="text-order">Телефон: {order.dopPhone}</p>
                    </>
                  )}
                </div>
                <div className="item-details-wrapper">
                  <div
                    className={`details-container ${
                      expandedItems[index] ? "expanded" : "collapsed"
                    }`}
                  >
                    {order.items.map((item, i) => (
                      <div className="item-description" key={`${index}-${i}`}>
                        <p className="text-order">Название: {item.title}</p>
                        <p className="text-order">
                          Количество: {item.quantity} {item.unit}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="button-order">
                  <button
                    className="carousel-btn"
                    onClick={() => {
                      setExpandedItems((prevState) => ({
                        ...prevState,
                        [index]: !prevState[index],
                      }));
                    }}
                  >
                    {expandedItems[index] ? "Скрыть" : "Развернуть"}
                  </button>
                  <button
                    className="carousel-btn"
                    onClick={() => handleSuccess(order._id)}
                  >
                    Выполнен
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text">Нет активных заказов</p>
          )}
        </div>

        <h2 className="caption">Завершенные заказы:</h2>
        <div className="orders-container ">
          {inactiveOrders.length > 0 ? (
            inactiveOrders.map((order, index) => (
              <div className="items-order complete" key={index}>
                <div className="info-user">
                  <p className="text-order">
                    Создано:
                    {formatDate(order.createdAt)}
                  </p>
                  <p className="text-order">
                    Имя фамилия:{" "}
                    {usersInfo[order.user]?.name || "Имя неизвестно"}
                  </p>
                  <p className="text-order">
                    Телефон: {usersInfo[order.user]?.phoneNumber || ""}
                  </p>
                </div>
                <div className="item-details-wrapper">
                  <div
                    className={`details-container ${
                      expandedItems[order._id] ? "expanded" : "collapsed"
                    }`}
                  >
                    {order.items.map((item, i) => (
                      <div className="item-description" key={`${index}-${i}`}>
                        <p className="text-order">Название: {item.title}</p>
                        <p className="text-order">
                          Количество: {item.quantity} {item.unit}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="button-order">
                  <button
                    className=" btn-complete"
                    onClick={() => {
                      setExpandedItems((prevState) => ({
                        ...prevState,
                        [order._id]: !prevState[order._id],
                      }));
                    }}
                  >
                    {expandedItems[order._id] ? "Скрыть" : "Развернуть"}
                  </button>
                  <button
                    className="carousel-btn"
                    onClick={() => deleteOrder(order)}
                  >
                    Удалить
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text">Нет завершенных заказов</p>
          )}
        </div>
      </div>
    </>
  );
}

export default Order;
