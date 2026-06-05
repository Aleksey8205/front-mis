import React, { useState } from "react";
// import FormOrder from "../modelsJsx/formOrder.jsx";
import "../../shared/me.css";
import LogOutButton from "../modelsJsx/LogoutBtn.jsx";
import OrderUser from "../modelsJsx/OrderUser.jsx";
import { useSelector } from 'react-redux';

import { useCheckAuth } from './../../utils/checkAuth';
import CreateProd from './../modelsJsx/CreateProd';

function Me() {

  const [orderCreated, setOrderCreated] = useState(false);

  const authState = useSelector((state) => state.auth);
  useCheckAuth();
  
  return (
        <>
          {!authState.user ? (
            <p className="text">Необходима авторизация</p>
          ) : (
            
            <>
              <div className="container">
                <LogOutButton />
                <div className="me">
                  <div>
                    <p>Имя Пользователя: {authState.user?.name}</p>
                    <p>Логин: {authState.user?.userName}</p>
                    <p>Почта: {authState.user?.email}</p>
                    <p>Телефон: {authState.user?.contactPhone}</p>
                  </div>
                  {authState && authState.user?.isAdmin && (
                    <>
                  {/* <FormOrder  onOrderCreated={() => setOrderCreated(true)}/> */}
                  <CreateProd />
                  </>
                  )}
                </div>
              </div>
              <OrderUser orderCreated={orderCreated} />
            </>
          )}
        </>
      )}

export default Me;