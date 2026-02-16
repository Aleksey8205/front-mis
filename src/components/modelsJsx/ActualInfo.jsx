import React, { useState, useEffect } from "react";

const API_BASE_URL = import.meta.env.VITE_API_URL ?? '';

function ActualInfo() {
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true); 

  useEffect(() => {
    fetch(`${API_BASE_URL}/info/get-info`)
      .then((response) => response.json())
      .then((data) => {
        if (data.length === 0) {
          setIsLoading(true)
        } else {
        setEvents(data);
        setIsLoading(false);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);

  const formatDate = (isoString) => {
    const date = new Date(isoString);
    return `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`;
  };

  return (
    <>
      <h2 className="caption">Актуальная информация</h2>
      <div className="actual-info">
        {isLoading ? (
          <p className="text">Загрузка данных...</p>
        ) : (
          events.map((evt, index) => (
            <div className="actual-item" key={index}>
              <time className="date-time">
                <span className="public">Опубликовано </span> 
                {formatDate(evt.createdAt)}
              </time>
              <p className="date-text font">{evt.text}</p>
            </div>
          ))
        )}
      </div>
    </>
  );
}

export default ActualInfo;