import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const API_BASE_URL = import.meta.env.VITE_API_URL ?? '';

const ResetPasswordPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [token, setToken] = useState(null);

  const [statusMessage, setStatusMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const tokenFromUrl = params.get("token");

    if (!tokenFromUrl) {
      setStatusMessage(
        "Ошибка: Ссылка для сброса пароля недействительна. Отсутствует токен."
      );
      return;
    }
    setToken(tokenFromUrl);
  }, [location.search]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setStatusMessage("Пароли не совпадают!");
      return;
    }

    if (!token) {
      setStatusMessage(
        "Токен не найден. Пожалуйста, запросите сброс пароля заново."
      );
      return;
    }

    setIsLoading(true);
    setStatusMessage(""); 

    try {
      const response = await fetch(`${API_BASE_URL}/user/reset-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token, password }),
      });

      const data = await response.json();

      if (response.ok) {
        setStatusMessage(data.message || "Пароль успешно обновлен!");

        setTimeout(() => {
          navigate("/");
        }, 3000);
      } else {
        setStatusMessage(data.error || "Произошла ошибка при сбросе пароля.");
      }
    } catch (error) {
      console.error("Ошибка сети:", error);
      setStatusMessage("Сервер недоступен. Попробуйте позже.");
    } finally {
      setIsLoading(false);
    }
  };


  return (
    <div className="login-form">
      <h2 className="title">Сброс пароля</h2>

      {statusMessage && <p className="status-message">{statusMessage}</p>}
      {token ? (
        <form className="form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="label" htmlFor="password">Новый пароль: </label>
            <input
              className="input-field"
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={isLoading}
            />
          </div>

          <div className="form-group">
            <label className="label" htmlFor="confirm-password">Повторите пароль: </label>
            <input
              className="input-field"
              type="password"
              id="confirm-password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              disabled={isLoading}
            />
          </div>

          <button className="carousel-btn" type="submit" disabled={isLoading}>
            {isLoading ? "Сохраняю..." : "Установить пароль"}
          </button>
        </form>
      ) : (
        <div>Загрузка...</div>
      )}
    </div>
  );
};

export default ResetPasswordPage;