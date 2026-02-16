import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import "../shared/header.css";
import chickenGif from "../public/images/image-index/chicken-gif.gif";
import MisLogo from "../public/images/image-index/mis-logo.png";
import favicon from "../public/favicon.ico";
import SignInModal from "./modals/SignIn";
import SignUpModal from "./modals/SignUp";

import { useSelector } from "react-redux";

const HeaderFunc = () => {
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [registerModalOpen, setRegisterModalOpen] = useState(false)
  const authState = useSelector((state) => state.auth);

  return (
    <>
      <Helmet>
        <link rel="shortcut icon" href={favicon} type="image/x-icon" />
      </Helmet>
      <header id="header" className="header">
        <a className="logo-link" href="about.html">
          <img className="logo-gif" src={chickenGif} alt="logo" />
          <img className="logo" src={MisLogo} alt="Логотип" />
        </a>

        {/* Меню-триггер (чекбокс и иконка) */}
        <input type="checkbox" className="menu-checkbox" id="menu-toggle" />
        <label htmlFor="menu-toggle">
          <span className="menu-icon"></span>
        </label>

        {/* Основное меню */}
        <nav className="menu">
          <ul className="navigation">
            <li className="item-list linked">
              <Link
                className="linked"
                to="/"
                onClick={() =>
                  (document.getElementById("menu-toggle").checked = false)
                }
              >
                Главная
              </Link>
            </li>
            <li className="item-list linked">
              <Link
                className="linked"
                to="/about"
                onClick={() =>
                  (document.getElementById("menu-toggle").checked = false)
                }
              >
                О нас
              </Link>
            </li>
            <li className="item-list linked">
              <Link
                className="linked"
                to="/"
                onClick={() => {
                  setTimeout(() => {
                    document.getElementById("menu-toggle").checked = false;
                    window.scrollTo({
                      top: document.querySelector("#calc").offsetTop,
                      behavior: "smooth",
                    });
                  }, 300);
                }}
              >
                Калькулятор
              </Link>
            </li>
            <li className="item-list linked">
              <Link
                className="linked"
                to="/product"
                onClick={() =>
                  (document.getElementById("menu-toggle").checked = false)
                }
              >
                Продукция
              </Link>
            </li>
            <li className="item-list linked">
              <Link
                className="linked"
                to="/#slider"
                onClick={() => {
                  setTimeout(() => {
                    document.getElementById("menu-toggle").checked = false;
                    window.scrollTo({
                      top: document.querySelector("#slider").offsetTop,
                      behavior: "smooth",
                    });
                  }, 300);
                }}
              >
                Комбикорм
              </Link>
            </li>
          </ul>

          {/* Кнопка закрытия меню */}
          <span
            className="close-button"
            onClick={() =>
              (document.getElementById("menu-toggle").checked = false)
            }
          >
            ×
          </span>

          {/* Адрес и контактные данные */}
          <address>
            <ul className="nav-link">
              <li className="item-list linked">
                <a
                  className="linked link-nav"
                  href="https://yandex.ru/maps/1/moscow-and-moscow-oblast/house/ulitsa_akademika_goryachkina_83/Z04YcwRpQU0BQFtvfX91eH1jZg==/?ll=37.539886%2C55.349102&utm_source=main_stripe_big&z=16"
                  aria-label="Наш адрес: улица Академика Горячкина, дом 83, Подольск"
                >
                  Мы на карте
                </a>
              </li>
              <li className="item-list linked">
                <a
                  className="linked link-avito"
                  href="https://m.avito.ru/podolsk/ptitsy/sutochnye_tsyplyata_broylera_4708678547?context=H4sIAAAAAAAA_wEmANn_YToxOntzOjE6IngiO3M6MTY6IjJpYjFWSVFxZXhGT1c2bVAiO31iMLHiJgAAAA"
                >
                  Мы на Авито
                </a>
              </li>
              <li className="item-list linked link-tel">
                <a className="linked" href="tel:+79169927150">
                  +7(916)9927150
                </a>
              </li>
              <li className="item-list linked link-tel">
                <a className="linked" href="tel:+79778018260">
                  +7(977)8018260
                </a>
              </li>
              {!authState.authenticated ? (
                <>
                  <li className="item-list linked">
                    <Link
                    className="linked"
                    onClick={(event) => {
                      event.preventDefault(); 
                      document.getElementById("menu-toggle")?.setAttribute("checked", false); 
                      setLoginModalOpen(true); 
                    }}
                    >
                      Войти
                    </Link>
                  </li>
                  <li className="item-list linked">
                    <Link
                      className="linked"
                      to="/signup"
                      onClick={(event) => {
                      event.preventDefault(); 
                      document.getElementById("menu-toggle")?.setAttribute("checked", false); 
                      setRegisterModalOpen(true); 
                    }}
                    >
                      Регистрация
                    </Link>
                  </li>
                </>
              ) : (
                <>
                  <li className="item-list linked">
                    <Link
                      className="linked"
                      to="/me"
                      onClick={() =>
                        (document.getElementById("menu-toggle").checked = false)
                      }
                    >
                      Профиль
                    </Link>
                  </li>
                  <li className="item-list linked">
                    <Link
                      className="linked"
                      to="/me"
                      onClick={() =>
                        (document.getElementById("menu-toggle").checked = false)
                      }
                    >
                      Сделать заказ
                    </Link>
                  </li>
                </>
              )}
              <li className="item-list linked span2">
                <Link
                  className="linked"
                  to="/reviews"
                  onClick={() =>
                    (document.getElementById("menu-toggle").checked = false)
                  }
                >
                  Отзывы
                </Link>
              </li>
              <li className="item-list linked span2">
                {authState.user?.isAdmin ? (
                  <Link
                    className="linked"
                    to="/order"
                    onClick={() =>
                      (document.getElementById("menu-toggle").checked = false)
                    }
                  >
                    Все заказы
                  </Link>
                ) : null}
              </li>
            </ul>
          </address>
        </nav>
        <SignInModal
          isOpen={loginModalOpen}
          onClose={() => setLoginModalOpen(false)}
        />
        <SignUpModal
          isOpen={registerModalOpen}
          onClose={() => setRegisterModalOpen(false)}
        />
      </header>
    </>
  );
};

export default HeaderFunc;
