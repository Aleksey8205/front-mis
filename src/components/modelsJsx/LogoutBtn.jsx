import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../../utils/authSlice";



const API_BASE_URL = import.meta.env.VITE_API_URL ?? '';

function LogOutButton() {
  const navigate = useNavigate();
  const dispatch = useDispatch()

  const handleLogOut = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/user/logout`, {
        method: "POST",
        credentials: "include",
      });
      if (response.ok) {
        dispatch(logout());
        navigate("/");
        console.log("Logout successful");
      } else {
        console.error("Ошибка выхода из системы:", await response.text());
      }
    } catch (error) {
      console.error("Ошибка при выполнении запроса:", error);
    }
  };

  return (
    <div className="container">
      <button className="carousel-btn" onClick={handleLogOut}>
        Выход
      </button>
    </div>
  );
}

export default LogOutButton;