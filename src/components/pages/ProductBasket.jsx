import data from "./busket.json";
import "../../shared/basketProd.css";
import { useState } from "react";
import ReactModal from "react-modal";
import { X } from "lucide-react";

const API_BASE_URL = import.meta.env.VITE_API_URL ?? "";
import SignInModal from "./../modals/SignIn";

const ProductBasket = () => {
  const [cartItems, setCartItems] = useState(
    JSON.parse(localStorage.getItem("cartItems")) || []
  );
  const [isProdOpen, setIsProdOpen] = useState(false);
  const [text, setText] = useState("");
  const [message, setMessage] = useState("");
  const [orderOk, setOrderOk] = useState(false);
  const [addElement, setAddElement] = useState(false);
  const [loginModalOpen, setLoginModalOpen] = useState(false);

  const modalOpen = () => {
    setIsProdOpen(true);
  };

  const onProdClose = () => {
    setIsProdOpen(false);
  };

  const saveToLocalStorage = (items) => {
    localStorage.setItem("cartItems", JSON.stringify(items));
  };

  const addProd = (prod, quanty) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item._id === prod.id);
      let newItems;
      if (existingItem) {
        newItems = prevItems.map((item) =>
          item._id === prod.id
            ? { ...item, quantity: item.quantity + quanty }
            : item
        );
      } else {
        newItems = [
          ...prevItems,
          {
            _id: prod.id,
            category: prod.category,
            type: prod.type,
            title: prod.name,
            quantity: quanty,
            feed: prod.feed,
            unit: prod.unit,
          },
        ];
      }
      saveToLocalStorage(newItems);
      return newItems;
    });
  };

  const clearProd = (prod, quanty) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item._id === prod.id);

      if (!existingItem) {
        setAddElement(false);
        return prevItems;
      }

      if (existingItem.quantity <= quanty) {
        const newItems = prevItems.filter((item) => item._id !== prod.id);
        saveToLocalStorage(newItems);
        return newItems;
      }

      const newItems = prevItems.map((item) =>
        item._id === prod.id
          ? { ...item, quantity: item.quantity - quanty }
          : item
      );
      saveToLocalStorage(newItems);
      return newItems;
    });
  };
  const getCount = (prodId) => {
    const item = cartItems.find((item) => item._id === prodId);
    return item ? item.quantity : "";
  };

  const mapCart = cartItems.map((prod) => prod.quantity);
  let sum = 0;
  for (let num of mapCart) {
    sum += num;
  }

  const createOrder = async (cartItems) => {
    const withoutId = cartItems.map(({ _id, ...rest }) => rest);

    const payload = {
      items: withoutId,
      text: text,
    };
    try {
      const response = await fetch(`${API_BASE_URL}/order/create-order`, {
        credentials: "include",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
      if (!response.ok) {
        const errorData = await response.json();
        setMessage(errorData.message);
      }
      if (response.ok) {
        setCartItems([]);
        localStorage.removeItem("cartItems");
        setOrderOk(true);
        setText("");
        setAddElement(false);
      }
    } catch (error) {
      setMessage("Ошибка на стороне сервера, закажите по телефону");
      console.error("Ошибка при изменении статуса заказа:", err.message);
    }
  };

  return (
    <>
      <div className="container">
        <h1 className="caption"></h1>
        {mapCart.length > 0 ? (
          <button className="carousel-btn" onClick={(e) => modalOpen()}>
            Корзина: {sum}
          </button>
        ) : (
          <button className="carousel-btn" onClick={(e) => modalOpen()}>
            Корзина
          </button>
        )}
        <div className="product-cards">
          {data.products.map((prod) => (
            <div className="product-item" key={prod.id}>
              <img
                className="prod-image"
                src={prod.coverImage || ""}
                alt={prod.name}
              />
              <h2 className="caption-benefits">{prod.category}</h2>
              <p className="textProd-name">{prod.name}</p>
              <div className="prod-info">
                <p className="textProd-order">{prod.type}</p>
                <p className="textProd-order">{prod.feed}</p>
              </div>
              <div className="button-add-clear">
                {prod.category === "Цыплята" ? (
                  addElement ? (
                    <div className="add-prod">
                      <div className="style-inc-prod">
                        <button
                          className="inc-prod"
                          onClick={() => clearProd(prod, 1)}
                        >
                          - 1
                        </button>
                        <button
                          className="inc-prod"
                          onClick={() => addProd(prod, 1)}
                        >
                          + 1
                        </button>
                      </div>
                      <p className="count-color">{getCount(prod.id)}</p>
                      <div className="style-inc-prod">
                        <button
                          className="inc-prod"
                          onClick={() => {
                            clearProd(prod, 10);
                          }}
                        >
                          - 10
                        </button>
                        <button
                          className="inc-prod"
                          onClick={() => addProd(prod, 10)}
                        >
                          + 10
                        </button>
                      </div>
                    </div>
                  ) : (
                    <button
                      className="carousel-btn"
                      onClick={() => {
                        setAddElement(true);
                        addProd(prod, 1);
                      }}
                    >
                      Добавить в корзину {getCount(prod.id)}
                    </button>
                  )
                ) : (
                  <button
                    className="carousel-btn"
                    onClick={() => {
                      addProd(prod, 1);
                    }}
                  >
                    Добавить в корзину {getCount(prod.id)}
                  </button>
                )}

                {getCount(prod.id) > 0 && (
                  <>
                    {prod.category === "Цыплята" ? (
                      addElement && <p className="text-order"></p>
                    ) : (
                      <button
                        className="carousel-btn"
                        onClick={() => clearProd(prod, 1)}
                      >
                        удалить
                      </button>
                    )}
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
        <ReactModal
          isOpen={isProdOpen}
          onRequestClose={onProdClose}
          shouldCloseOnOverlayClick={true}
          overlayClassName="modal-overlay"
          className={
            orderOk || cartItems.length == 0
              ? "modal-basket-success"
              : "modal-basket"
          }
        >
          {mapCart.length == 0 && !orderOk ? (
            <div className="success-order">
              <p className="text">Вы ничего не положили</p>
              <button
                className="carousel-btn"
                onClick={() => {
                  setIsProdOpen(false);
                }}
              >
                Положите товары в корзину
              </button>
            </div>
          ) : (
            <>
              {!orderOk ? (
                <div className="prod-list">
                  <h2 className="caption-basket">
                    Проверьте заказ перед отправкой
                    <X
                      className="x-icon-basket"
                      onClick={(e) => setIsProdOpen(false)}
                    />
                  </h2>
                  <div className="item-box">
                    {cartItems.map((prod, id) => (
                      <div className="item-list-prod" key={id}>
                        <p className="text-order">Позиция:</p>
                        <div className="items-desc-prod">
                          <p className="text-order">{prod.category}:</p>
                          <p className="text-order">{prod.title}</p>
                          <p className="text-order">"{prod.feed}"</p>
                          <p className="text-order">Колличество: </p>
                          <p className="text-order">{prod.quantity}</p>
                          <p className="text-order">{prod.unit}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <textarea
                    type="text"
                    placeholder="Введите дополнительный комментарий!"
                    className="input-textarea"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                  />
                  <button
                    className="submit-btn"
                    onClick={(e) => createOrder(cartItems)}
                  >
                    Оформить заказ
                  </button>
                  <button
                    className="submit-btn red"
                    onClick={(e) => {
                      setOrderOk(false);
                      setCartItems([]);
                      localStorage.clear("cartItems");
                      setAddElement(false);
                    }}
                  >
                    очистить
                  </button>
                  <div className="info-manage">
                    <p className={message ? "active" : "hidden"}>{message}</p>
                    <button
                      className={message ? "carousel-btn" : "hidden"}
                      onClick={() => setLoginModalOpen(true)}
                    >
                      Войти
                    </button>
                  </div>
                </div>
              ) : (
                <div className="success-order">
                  <p className="text">Ваш заказ успешно отправлен!</p>
                  <button
                    className="carousel-btn"
                    onClick={() => {
                      setOrderOk(false);
                      setCartItems([]);
                      localStorage.clear("cartItems");
                      setIsProdOpen(false);
                    }}
                  >
                    Сделать ещё один заказ
                  </button>
                </div>
              )}
            </>
          )}
        </ReactModal>
      </div>

      <SignInModal
        isOpen={loginModalOpen}
        onClose={() => setLoginModalOpen(false)}
      />
    </>
  );
};

export default ProductBasket;
