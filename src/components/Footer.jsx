import React from "react";
import { Link } from 'react-router-dom';
import MisLogo from "../public/images/image-index/mis-logo.png"
import chickenGif from "../public/images/image-index/chicken-gif.gif";
import telegramSvg from "../public/images/image-index/telegram.png";
import whattsapp from "../public/images/image-index/whattsapp.png";

const FooterFunc = () => {
  return (
    <footer className="footer-wrapper">
        <div className="row">
          <div className="col-md-6 col-sm-12">
            <ul className="nav nav-stacked">
              <li className="nav-list">
                <Link className="link" to="/">
                  Главная
                </Link>
              </li>
              <li className="nav-list">
                <Link className="link" to="/about">
                  О нас
                </Link>
              </li>
              <li className="nav-list">
                <Link className="link" to="/"
                onClick={() => {
                  setTimeout(() => {
                    document.getElementById("menu-toggle").checked = false;
                    window.scrollTo({
                      top: document.querySelector("#calc").offsetTop,
                      behavior: "smooth",
                    });
                  }, 300); 
                }}>
                  Калькулятор
                </Link>
              </li>
              <li className="nav-list">
                <Link className="link" to="/product">
                  Продукция
                </Link>
              </li>
              <li className="nav-list">
                <Link className="link" to="/"
                onClick={() => {
                  setTimeout(() => {
                    document.getElementById("menu-toggle").checked = false;
                    window.scrollTo({
                      top: document.querySelector("#slider").offsetTop,
                      behavior: "smooth",
                    });
                  }, 300); 
                }}>
                  Комбикорм
                </Link>
              </li>
            </ul>
          </div>
          
          <div className="col-md-6 col-sm-12 text-center">
            <address className="up-col">
              <a className="logo-link" href="about.html">
                <img className="logo-gif" src={chickenGif} alt=""/>
                <img className="logo" src={MisLogo} alt="Логотип"/>
              </a>
              
              <div className="social-icons">
                <a href="https://wa.me/+79169927150">
                  <img className="whatsapp-icon" src={whattsapp} alt="WhatsApp"/>
                </a>
                <a href="https://t.me/+79778018260">
                  <img className="telegram-icon" src={telegramSvg} alt="Telegram"/>
                </a>
              </div>
            
              <ul className="address">
                <li className="contact-text">Контакты</li>
                <li className="address-list">
                  <a className="link link-tel" href="tel:+79169927150">
                    8 (916) 992-71-50
                  </a>
                </li>
                <li className="address-list">
                  <a className="link link-tel" href="tel:+79778018260">
                    8 (977) 801-82-60
                  </a>
                </li>
                <li className="address-list">
                  <a className="link link-nav" href="https://yandex.ru/maps/1/moscow-and-moscow-oblast/house/ulitsa_akademika_goryachkina_83/Z04YcwRpQU0BQFtvfX91eH1jZg==/?ll=37.539886%2C55.349102&utm_source=main_stripe_big&z=16">
                    Мы на карте
                  </a>
                </li>
              </ul>
            </address>
          </div>
        </div>
    </footer>
  );
};

export default FooterFunc;