import { useState } from "react";
import React from "react";
import { useNavigate } from "react-router-dom";
import ReactModal from 'react-modal';
import { useDispatch } from 'react-redux';
import { loginSuccess, loginError } from '../../utils/authSlice.js'
import "../../shared/loginform.css";
import { X } from "lucide-react";

const API_BASE_URL = import.meta.env.VITE_API_URL ?? '';

function SignUpModal({isOpen, onClose}) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [login, setLogin] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("+7");
  const [error, setError] = useState("");

  const handleRegistration = async (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      setError("Пароли не совпадают!");
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/user/signup`, {
        credentials: 'include',
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
          userName: login,
          contactPhone: phoneNumber,
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || `Ошибка ${response.status}`);
      }

      const result = await response.json();
      dispatch(loginSuccess(result.userData)); 
      onClose();
      navigate('/me');
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
        dispatch(loginError(error.message));
      }
    }
  };

  const handleYandexLogin = () => {
    window.location.href = `${API_BASE_URL}/auth/yandex`;
  };


  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={onClose}
      shouldCloseOnOverlayClick={true}
      overlayClassName="modal-overlay"
      className="modal-login-content"
    >
      <button className="button-close" onClick={onClose}>
      <X className="x-icon"/>
      </button>
    <div className="login-form">
      <h2 className="title">Регистрация</h2>
      <form onSubmit={handleRegistration} className="form">
        <label htmlFor="name" className="label">
          Имя:
        </label>
        <input
          type="text"
          id="name"
          placeholder="Иван Иванов"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="input-field"
        />

        <label htmlFor="email" className="label">
          Электронная почта:
        </label>
        <input
          type="email"
          id="email"
          placeholder="example@example.com"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="input-field"
        />

        <label htmlFor="password" className="label">
          Пароль:
        </label>
        <input
          type="password"
          id="password"
          placeholder="******"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="input-field"
        />

        <label htmlFor="confirm-password" className="label">
          Подтверждение пароля:
        </label>
        <input
          type="password"
          id="confirm-password"
          placeholder="******"
          required
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="input-field"
        />

        <label htmlFor="login" className="label">
          Логин
        </label>
        <input
          type="text"
          id="login"
          placeholder="например ivan1234"
          required
          value={login}
          onChange={(e) => setLogin(e.target.value)}
          className="input-field"
        />

        <label htmlFor="phone" className="label">
          Телефон:
        </label>
        <input
          type="text"
          id="phone"
          placeholder="+7(999)-999-99-77"
          required
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          className="input-field"
        />

        {error && <p className="error-message">{error}</p>}

        <button type="submit" className="carousel-btn">
          Зарегистрироваться
        </button>
      </form>
      <button
          className="btn-yandex-signin"
          onClick={handleYandexLogin}
        >
          Войти с Яндекс ID
        </button>
    </div>
    </ReactModal>
  );
}

export default SignUpModal;
