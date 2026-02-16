import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { loginSuccess, loginError } from '../utils/authSlice.js';


const API_BASE_URL = import.meta.env.VITE_API_URL ?? '';

export const useCheckAuth = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    fetch(`${API_BASE_URL}/user/me`, { credentials: 'include' })
      .then(response => {
        if (!response.ok) {
          throw new Error(`Ошибка сети: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        if (data) {
          dispatch(loginSuccess(data));
        } else {
          dispatch(loginError(data));
        }
      })
      .catch(error => {
        dispatch(loginError('Ошибка входа' + error));
      });
  }, [dispatch]);
};