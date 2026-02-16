import React, { useState, useEffect} from "react";
import "../../shared/order.css";

const API_BASE_URL = import.meta.env.VITE_API_URL ?? '';

function OrderUser({ orderCreated }) {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [expandedItems, setExpandedItems] = useState({});
  const [message, setMessage] = useState(null)

  useEffect(() => {
      fetch(`${API_BASE_URL}/order/orders`, {
        credentials: 'include'
      })
        .then((response) => {
          if (!response.ok) {
            if (response.status === 401 || response.status === 403) {
              throw new Error("Необходима авторизация");
            } else {
              throw new Error(`Ошибка сервера (${response.status})`);
            }
          }
          return response.json();
        })
        .then((data) => {
          setOrders(data);
          setLoading(false);
        })
        .catch((error) => {
          setErrorMessage(error.message);
          setLoading(false);
        });
  }, [orderCreated]);

  if (loading) {
    return <div>Загрузка...</div>;
  }

  if (errorMessage) {
    return <div>{errorMessage}</div>;
  }

  const activeOrders = orders.filter((order) => order.isActive);
  const inactiveOrders = orders.filter((order) => !order.isActive);

  const handleRepeatOrder = (order) => {
    const newOrder = {
      items: order.items.map((item) => ({
        ...item,
        quantity: item.quantity,
      })),
    };

    fetch(`${API_BASE_URL}/order/create-order`, {
      method: "POST",
      credentials: 'include',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newOrder),
    })
      .then((response) => response.json())
      .then((data) => {
        refetchOrders();
      })
      .catch((error) => {
        console.error("Ошибка отправки:", error);
      });
  };

  const refetchOrders = () => {
      fetch(`${API_BASE_URL}/order/orders`, {
        method: "GET",
        credentials: 'include'
      })
        .then((response) => {
          if (!response.ok) {
            if (response.status === 401 || response.status === 403) {
              throw new Error("Необходима авторизация");
            } else {
              throw new Error(`Ошибка сервера (${response.status})`);
            }
          }
          return response.json();
        })
        .then((data) => {
          setOrders(data);
        })
        .catch((error) => {
          console.error("Ошибка обновления:", error);
        });

  };

  const deleteOrder = (order) => {
    fetch(`${API_BASE_URL}/order/delete-order/${order._id}`, {
      method: "DELETE",
      credentials: 'include'
    })
    .then((response) => response.json())
    .then((data) => {
      setMessage(data);
      refetchOrders()
    })
    .catch((error) => {
      console.error("Ошибка отправки:", error);
    })
  }

  const formatDate = (isoString) => {
    const date = new Date(isoString);
    return `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`;
  };

  return (
    <div className="container-order-all">
      <h2 className="caption">Мои активные заказы</h2>
      <p className="text">{message?.message}</p>
      <div className="orders-container">
        {activeOrders.length > 0 ? (
          activeOrders.map((order, index) => (
            <div className="items-order" key={index}>
              <div className="item-details-wrapper">
                <p className="text-order">
                  Создано: 
                  {formatDate(order.createdAt)}
                </p>
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
                  className="carousel-btn"
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
          <p className="text">Нет заказов</p>
        )}
      </div>

      <h2 className="caption">Мои завершённые заказы</h2>
      <div className="orders-container">
        {inactiveOrders.length > 0 ? (
          inactiveOrders.map((order, index) => (
            <div className="items-order complete" key={index}>
              <div className="item-details-wrapper">
                <p className="text-order">
                {formatDate(order.createdAt)}
                </p>
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
                  onClick={() => handleRepeatOrder(order)}
                >
                  Повторить
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text">Нет заказов</p>
        )}
      </div>
    </div>
  );
}

export default OrderUser;
