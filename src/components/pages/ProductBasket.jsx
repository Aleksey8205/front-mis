import "../../shared/basketProd.css";
import { useEffect, useState } from "react";
import ReactModal from "react-modal";
import { X } from "lucide-react";
import SignInModal from "./../modals/SignIn";
import Preloader from "./../Preloader";

const API_BASE_URL = import.meta.env.VITE_API_URL ?? "";

const ProductBasket = () => {
  const [cartItems, setCartItems] = useState(
    JSON.parse(localStorage.getItem("cartItems")) || []
  );
  const [products, setProducts] = useState([]);
  const [isProdOpen, setIsProdOpen] = useState(false);
  const [text, setText] = useState("");
  const [message, setMessage] = useState("");
  const [orderOk, setOrderOk] = useState(false);
  const [addElement, setAddElement] = useState(false);
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [totalSum, setTotalSum] = useState(0);
  const [phoneName, setPhoneName] = useState(false);
  const [dopName, setDopName] = useState("");
  const [dopPhone, setDopPhone] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [messageOK, setMessageOk] = useState("")

  useEffect(() => {
    fetch(`${API_BASE_URL}/product/product`)
      .then((response) => response.json())
      .then((data) => {
        if (data.length > 0) {
          setProducts(data);
        } else {
        }
      });
  }, []);

  const modalOpen = () => {
    setIsProdOpen(true);
    setPhoneName(false);
  };

  const onProdClose = () => {
    setIsProdOpen(false);
  };

  const saveToLocalStorage = (items) => {
    localStorage.setItem("cartItems", JSON.stringify(items));
  };

  const addProd = (prod, quanty) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item._id === prod._id);
      let newItems;
      if (existingItem) {
        newItems = prevItems.map((item) =>
          item._id === prod._id
            ? { ...item, quantity: item.quantity + quanty }
            : item
        );
      } else {
        newItems = [
          ...prevItems,
          {
            _id: prod._id,
            category: prod.category,
            title: prod.name,
            quantity: quanty,
            feed: prod.feed,
            unit: prod.unit,
            price: prod.price,
          },
        ];
      }
      saveToLocalStorage(newItems);
      return newItems;
    });
  };

  const clearProd = (prod, quanty) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item._id === prod._id);

      if (!existingItem) {
        setAddElement(false);
        return prevItems;
      }

      if (existingItem.quantity <= quanty) {
        const newItems = prevItems.filter((item) => item._id !== prod._id);
        saveToLocalStorage(newItems);
        return newItems;
      }

      const newItems = prevItems.map((item) =>
        item._id === prod._id
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

  useEffect(() => {
    const sum = cartItems.reduce((accumulator, currentItem) => {
      return accumulator + currentItem.price * currentItem.quantity;
    }, 0);

    setTotalSum(sum);
  }, [cartItems]);

  const createOrder = async (cartItems) => {
    const withoutId = cartItems.map(({ _id, ...rest }) => rest);

    const payload = {
      items: withoutId,
      text: text,
      totalSum: totalSum,
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

  const createOrderDopNamePhone = async (cartItems) => {
    setErrorMessage("");
    if (!dopName.trim() || !dopPhone.trim()) {
      setErrorMessage("Пожалуйста, заполните все поля!");
      return;
    }
    const withoutId = cartItems.map(({ _id, ...rest }) => rest);

    const payload = {
      items: withoutId,
      text: text,
      totalSum: totalSum,
      dopName: dopName,
      dopPhone: dopPhone,
    };
    try {
      const response = await fetch(`${API_BASE_URL}/order/create-no-auth`, {
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
        const data = await response.json();
        setCartItems([]);
        localStorage.removeItem("cartItems");
        setOrderOk(true);
        setText("");
        setAddElement(false);
        setMessageOk(data.orderNumber)
      }
    } catch (error) {
      setMessage("Ошибка на стороне сервера, закажите по телефону");
      console.error("Ошибка при изменении статуса заказа:", err.message);
    }
  };

  if (products.length == 0) {
    return Preloader();
  }

  return (
    <>
      <div className="container">
        <h1 className="caption">Продукция</h1>
        {cartItems.length > 0 ? (
          <button className="carousel-btn" onClick={(e) => modalOpen()}>
            Корзина: {cartItems.length}
          </button>
        ) : (
          <button className="carousel-btn" onClick={(e) => modalOpen()}>
            Корзина
          </button>
        )}
        <div className="product-cards">
          {products.map((prod) => (
            <div className="product-item" key={prod._id}>
              <img
                className="prod-image"
                src={prod.coverImage || ""}
                alt={prod.name}
              />
              <h2 className="caption-benefits">{prod.name}</h2>
              <h3 className="textProd-order">{prod.feed}</h3>
              <p className="decription-text">{prod.description}</p>
              <p className="textProd-order price">{prod.price} ₽</p>
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
                      <p className="count-color">{getCount(prod._id)}</p>
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
                      Добавить в корзину {getCount(prod._id)}
                    </button>
                  )
                ) : (
                  <button
                    className="carousel-btn"
                    onClick={() => {
                      addProd(prod, 1);
                    }}
                  >
                    Добавить в корзину {getCount(prod._id)}
                    {getCount(prod._id) > 0 && ` ${prod.unit}`}
                  </button>
                )}

                {getCount(prod._id) > 0 && (
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
          {cartItems.length == 0 && !orderOk ? (
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
                  <p className="x-icon-basket">
                  <X
                  className="x-i"
                      onClick={(e) => setIsProdOpen(false)}
                    />
                    </p>
                  <h2 className="caption-basket">
                    Проверьте заказ перед отправкой
                  </h2>
                  
                  <div className="item-box">
                    {cartItems.map((prod, id) => (
                      <div className="item-list-prod" key={id}>
                        <div className="items-desc-prod">
                          <p className="text-order">{prod.category}:</p>
                          <p className="text-order">{prod.title}</p>
                          <p className="text-order">{prod.feed}</p>
                          <p className="text-order">Колличество: </p>
                          <p className="text-order">{prod.quantity}</p>
                          <p className="text-order">{prod.unit}</p>
                          <p className="text-order">
                            /{prod.price * prod.quantity} ₽
                          </p>
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
                  <div className="totalSum_createBtn">
                    <h3 className="caption-basket">Сумма: {totalSum} ₽</h3>
                    {!phoneName ? (
                      <button
                        className="submit-btn"
                        onClick={(e) => createOrder(cartItems)}
                      >
                        Оформить заказ
                      </button>
                    ) : (
                      <button
                        className="submit-btn"
                        onClick={(e) => createOrderDopNamePhone(cartItems)}
                      >
                        Оформить заказ
                      </button>
                    )}
                  </div>

                  <div className="info-manage">
                    <p className={message ? "active-box" : "hidden"}>
                      {message}
                    </p>
                    <button
                      className={message ? "submit-btn btn-auth" : "hidden"}
                      onClick={() => setLoginModalOpen(true)}
                    >
                      Войти
                    </button>
                    <button
                      className={message ? "submit-btn btn-auth" : "hidden"}
                      onClick={() => {
                        setPhoneName(true);
                        setMessage("");
                      }}
                    >
                      Войти по тел.
                    </button>
                  </div>
                  <div className="error-box">
                    <p
                      className={errorMessage ? "active text-order" : "hidden"}
                    >
                      {errorMessage}
                    </p>
                  </div>
                  {phoneName === true && (
                    <div className="dopInfo">
                      <div className="input-dop-info">
                      <label htmlFor="dopName">
                        <p className="text-order">Имя: </p>
                      </label>
                      <input
                        type="text"
                        className="input-dopInfo"
                        id="dopName"
                        value={dopName}
                        required={true}
                        placeholder="Иван Иванов"
                        onChange={(e) => setDopName(e.target.value)}
                      />
                      </div>

                      <div className="input-dop-info">
                      <label htmlFor="dopPhone">
                        <p className="text-order">Телефон:</p>
                      </label>
                      <input
                        type="text"
                        className="input-dopInfo"
                        placeholder="8-999-999-01-01"
                        id="dopPhone"
                        value={dopPhone}
                        required={true}
                        onChange={(e) => setDopPhone(e.target.value)}
                      />
                      </div>
                    </div>
                  )}
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
                </div>
              ) : (
                <div className="success-order">
                  <p className="text">Ваш заказ успешно отправлен!</p>
                  <p className="text">
                    Ваш заказ сформирован №<strong>{messageOK}</strong>. <br /> Вы можете получить его по адресу М.
                    О. пос. МИС ул. Академика горячкина д. 83
                  </p>
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
