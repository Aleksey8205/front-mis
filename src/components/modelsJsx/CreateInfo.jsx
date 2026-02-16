import React, { useState, useEffect } from "react";
import { useSelector } from 'react-redux';

const API_BASE_URL = import.meta.env.VITE_API_URL ?? '';

function CreateInfo() {
  const authState = useSelector((state) => state.auth);

  const [text, setText] = useState("");
  const [message, setMessage] = useState("");

  const handleChange = (event) => {
    setText(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    fetch(`${API_BASE_URL}/info/create-info`,  {
      credentials: 'include',
      method: "POST",
      headers: {
        "Content-Type": "application/json", 
      },
      body: JSON.stringify({ text }),
    })
      .then((response) => response.json())
      .then((data) => {
        setMessage("Данные успешно сохранены");
      })
      .catch((error) => {
        console.error("Error:", error);
        setMessage("Что-то пошло не так");
      });
  };

  return (
        <>
          {authState.authenticated && authState.user?.isAdmin ? (
            <>
              <h3 className="caption-benefits">Создать объявление</h3>
              <form onSubmit={handleSubmit}>
                <div className="formCreate">
                  <textarea
                    className="createText"
                    name="text"
                    id="text"
                    cols="30"
                    rows="10"
                    value={text}
                    onChange={handleChange}
                  ></textarea>
                </div>
                <button className="carousel-btn" type="submit">
                  Отправить
                </button>
              </form>
            </>
          ) : (
            <p></p>
          )}
          {message && <p>{message}</p>}
        </>
  );
}

export default CreateInfo;
