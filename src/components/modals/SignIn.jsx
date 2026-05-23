import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ReactModal from 'react-modal';
import { useDispatch } from 'react-redux';
import { loginSuccess, loginError } from '../../utils/authSlice.js'
import "../../shared/loginform.css";
import { X } from "lucide-react";

const API_BASE_URL = import.meta.env.VITE_API_URL ?? '';

ReactModal.setAppElement('#root');

function SignInModal({isOpen, onClose}) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [showRecoveryForm, setShowRecoveryForm] = useState(false);
  const [recoveryFormOk, setRecoveryFormOk] = useState(false);
  const [message, setMessage] = useState('');


  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch(`${API_BASE_URL}/user/signin`, {
        credentials: 'include',
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email.toLowerCase(),
          password,
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || `Ошибка ${response.status}`);
      }

      const result = await response.json();
      dispatch(loginSuccess(result.user)); 
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

  const resetPassword = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/user/fogot-password`, {
        credentials: "include",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email.toLowerCase(),
        }),
      });

      const result = await response.json();
      setRecoveryFormOk(true)
      setMessage(result.message)
    } catch (error) {
      console.error("Ошибка", err.message);
    }
  }

  const close = () => {
    setRecoveryFormOk(false);
    setShowRecoveryForm(false);
    onClose();
  }

  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={onClose}
      shouldCloseOnOverlayClick={true}
      overlayClassName="modal-overlay"
      className="modal-login-content"
    >
       <button className="button-close" onClick={() => onClose()}>
        <X  className="x-icon"/>
        </button>
      {!recoveryFormOk ? (
        <>
       
  
        <div className="login-form">
          <h2 className="title">Авторизация</h2>
  
          {error && <p style={{ color: "red" }}>{error}</p>}
  
          <form onSubmit={handleLogin} className="form">
            {/* Поля формы */}
            <label htmlFor="email" className="label">
              Почта:
            </label>
            <input
              type="email"
              id="email"
              placeholder="Ваша почта"
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
  
            <button type="submit" className="carousel-btn">
              Войти
            </button>
          </form>
  
          {!showRecoveryForm ? (
            <button
              type="button"
              onClick={() => setShowRecoveryForm(true)}
              className="carousel-btn form"
            >
              Забыли пароль?
            </button>
          ) : null}
  
          {showRecoveryForm && (
            <div className="recovery-form">
              <p>Введите вашу почту на которую будет отправлен пароль</p>
             <label htmlFor="emailReset" className="label">
            
            </label>
            <input
              type="email"
              id="emailReset"
              placeholder="Ваша почта"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input-field"
            />
            <button className="submit-btn" type="button" onClick={() => resetPassword()}>отправить</button>
            </div>
          )}
  
          {/* Кнопка входа через Яндекс */}
          <button
            className="btn-yandex-signin"
            onClick={handleYandexLogin}
          >
            Войти с Яндекс ID
          </button>
        </div>
        </>
      ) : (
      <>
      <div className="login-form">
        <p>{message}</p>
        <button className="carousel-btn" onClick={() => close()}>OK!</button>
      </div>
      </>
      )}
      
    </ReactModal>

  );
}

export default SignInModal;