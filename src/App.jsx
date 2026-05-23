import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import HeaderFunc from "./components/Header.jsx";
import FooterFunc from "./components/Footer.jsx";
import Home from "./components/pages/Home.jsx";
import About from "./components/pages/About.jsx";
// import Product from "./components/pages/Product.jsx";
import Me from "./components/pages/Me.jsx";
import Order from "./components/pages/Order.jsx";
import Review from "./components/pages/Reviews.jsx";
import "./shared/style.css";
import Preloader from "./components/Preloader.jsx";
import { useCheckAuth } from "./utils/checkAuth.js";
import ProductBasket from "./components/pages/ProductBasket.jsx";
import ResetPasswordPage from "./components/pages/ResetPassword.jsx";

function App() {
  const [loading, setLoading] = useState(true);

  useCheckAuth();

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1500);
  }, []);

  if (loading) {
    return <Preloader />;
  }

  return (
    <>
      <HeaderFunc />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/me" element={<Me />} />
        <Route path="/order" element={<Order />} />
        <Route path="/reviews" element={<Review />} />
        <Route path="/about" element={<About />} />
        {/* <Route path="/product" element={<Product />} /> */}
        <Route  path="/reset-password?" element={<ResetPasswordPage />}/>
        <Route path="/product" element={<ProductBasket />} />
      </Routes>
      <FooterFunc />
    </>
  );
}

export default App;