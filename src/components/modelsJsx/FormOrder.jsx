import React, { useState } from "react";
import production from "../../javaScript/order.js";

const API_BASE_URL = import.meta.env.VITE_API_URL ?? "";
import { useSelector } from 'react-redux';

const FormOrder = ({ onOrderCreated }) => {
  const authState = useSelector((state) => state.auth);

  const [showForm, setShowForm] = useState(true);
  const [orderCreated, setOrderCreated] = useState(false);
  const [dopAddress, setDopAddress] = useState("");
  const [dopName, setDopName] = useState("");
  const [dopPhone, setDopPhone] = useState("");

  const animalTypes = Object.keys(production);
  const [forms, setForms] = useState([
    { animalType: "", feedType: "", amount: "" },
  ]);
  const [eggs, setEggs] = useState("");
  const [carcassWeight, setCarcassWeight] = useState("");
  const [broilerDay, setBroilerDay] = useState("");

  const handleAnimalChange = (index, selectedAnimal) => {
    const newForms = forms.map((form, i) => {
      if (i === index) {
        return { ...form, animalType: selectedAnimal, feedType: "" };
      }
      return form;
    });
    setForms(newForms);
  };

  const handleFeedChange = (index, selectedFeed) => {
    const newForms = forms.map((form, i) => {
      if (i === index) {
        return { ...form, feedType: selectedFeed };
      }
      return form;
    });
    setForms(newForms);
  };

  const handleAmountChange = (index, enteredAmount) => {
    const newForms = forms.map((form, i) => {
      if (i === index) {
        return { ...form, amount: enteredAmount };
      }
      return form;
    });
    setForms(newForms);
  };

  const handleEggsChange = (enteredEggs) => {
    setEggs(enteredEggs);
  };

  const handleCarcassWeightChange = (enteredWeight) => {
    setCarcassWeight(enteredWeight);
  };

  const handleBroilerDayChange = (enteredPcs) => {
    setBroilerDay(enteredPcs);
  };

  const handleAddress = (enterAddr) => {
    setDopAddress(enterAddr)
  }

  const handleName = (enterName) => {
    setDopName(enterName)
  }

  const handlePhone = (enterPhone) => {
    setDopPhone(enterPhone)
  }

  const addNewRow = () => {
    setForms([...forms, { animalType: "", feedType: "", amount: "" }]);
  };

  const collectedData = forms
    .filter((item) => item.animalType !== "" && item.feedType !== "")
    .map((item) => ({
      category: "Корм",
      title: `${item.animalType} "${item.feedType}"`,
      quantity: parseFloat(item.amount),
      unit: "меш.",
    }));

  if (broilerDay) {
    collectedData.push({
      category: "Суточные цыплята",
      title: "Суточные цыплята",
      quantity: parseFloat(broilerDay),
      unit: "шт.",
    });
  }

  if (eggs) {
    collectedData.push({
      category: "Eggz",
      title: "Яйца",
      quantity: parseInt(eggs),
      unit: "десяток",
    });
  }

  if (carcassWeight) {
    collectedData.push({
      category: "Тушки",
      title: "Тушки бройлеров",
      quantity: parseFloat(carcassWeight),
      unit: "шт.",
    });
  }

  const finalPayload = {
    dopAddress: dopAddress,
    dopName: dopName,
    dopPhone: dopPhone,
    items: collectedData,
  };

  const orderSubmit = (event) => {
    event.preventDefault();

    fetch(`${API_BASE_URL}/order/create-order`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(finalPayload),
    })
      .then((response) => response.json())
      .then((data) => {
        setShowForm(false);
        setOrderCreated(true);
        setForms([{ animalType: "", feedType: "", amount: "" }]);
        setEggs("");
        setCarcassWeight("");
        onOrderCreated();
      })
      .catch((error) => {
        console.error("Ошибка отправки:", error);
      });
  };

  return (
    <>
    <div className="formOrder">
    {authState && authState.user?.isAdmin && (
       <div className="order-container">
       <div>
         <p className="text">Адрес(если требуется)</p>
         <input
           className="input-order"
           type="text"
           value={dopAddress}
           onChange={(e) => handleAddress(e.target.value)}
           placeholder="Город Улица Дом"
         />
       </div>
       <div>
         <p className="text">Имя</p>
         <input
           className="input-order"
           type="text"
           value={dopName}
           onChange={(e) =>
             handleName(e.target.value)
           }
           placeholder="Например Иванов Иван"
         />
       </div>
       <div>
         <p className="text">Контактный телефон</p>
         <input
           className="input-order"
           type="text"
           value={dopPhone}
           onChange={(e) =>
             handlePhone(e.target.value)
           }
           placeholder="8(999) 999-99-99"
         />
       </div>
     </div>
    )}
                    <h2 className="caption-benefist">Форма для заказа</h2>
                    {showForm && (
                      <form className="form" onSubmit={orderSubmit}>
                        <div className="form-margin">
                          {forms.map((form, index) => (
                            <div key={index} className="container-order">
                              <p className="text">{index + 1} Выбор</p>
                              <p className="text">Шаг 1</p>
                              <select
                                className="select-order"
                                value={form.animalType}
                                onChange={(e) =>
                                  handleAnimalChange(index, e.target.value)
                                }
                              >
                                <option value="">Выберите с\х животное</option>
                                {animalTypes.map((animal) => (
                                  <option key={animal} value={animal}>
                                    {animal}
                                  </option>
                                ))}
                              </select>
                              <p className="text">Шаг 2</p>
                              <select
                                className="select-order"
                                value={form.feedType}
                                onChange={(e) =>
                                  handleFeedChange(index, e.target.value)
                                }
                              >
                                <option value="">Выберите корм</option>
                                {form.animalType &&
                                  production[form.animalType].map((feed) => (
                                    <option key={feed.id} value={feed.feed}>
                                      {feed.feed}
                                    </option>
                                  ))}
                              </select>
                              <p className="text">Шаг 3</p>
                              <input
                                className="input-order"
                                type="number"
                                value={form.amount}
                                onChange={(e) =>
                                  handleAmountChange(index, e.target.value)
                                }
                                placeholder="Количество мешков."
                              />
                            </div>
                          ))}
                          <button
                            type="button"
                            className="carousel-btn btn-add"
                            onClick={addNewRow}
                          >
                            + Добавить строку
                          </button>
                        </div>
                        <div className="order-container">
                          <div>
                            <p className="text">Яйцо-количество в десятках.</p>
                            <input
                              className="input-order"
                              type="number"
                              value={eggs}
                              onChange={(e) => handleEggsChange(e.target.value)}
                              placeholder="Яйца десяток."
                            />
                          </div>
                          <div>
                            <p className="text">Тушки бройлера шт.</p>
                            <input
                              className="input-order"
                              type="number"
                              value={carcassWeight}
                              onChange={(e) =>
                                handleCarcassWeightChange(e.target.value)
                              }
                              placeholder="Введите количество шт."
                            />
                          </div>
                          <div>
                            <p className="text">Суточные цыплята</p>
                            <input
                              className="input-order"
                              type="number"
                              value={broilerDay}
                              onChange={(e) =>
                                handleBroilerDayChange(e.target.value)
                              }
                              placeholder="Введите количество шт."
                            />
                          </div>
                        </div>
                        <button className="carousel-btn btn-add">
                          Оформить заказ
                        </button>
                      </form>
                    )}
                    {!showForm && (
                      <div className="success-message">
                        <p className="text">Ваш заказ успешно отправлен!</p>
                        <button
                          className="carousel-btn"
                          onClick={() => {
                            setShowForm(true);
                            setOrderCreated(false);
                          }}
                        >
                          Сделать ещё один заказ
                        </button>
                      </div>
                    )}
                  </div>
    </>
  )
};

export default FormOrder;
