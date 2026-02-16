import React, { useState } from "react";
import { productionImages } from "../../javaScript/imagesProductionPage";
import images from "../../javaScript/images.js";
import { Helmet } from "react-helmet";

function Product() {
  const [selectedImage, setSelectedImage] = useState(null);

  const handleOpenModal = (event) => {
    if (window.innerWidth >= 1024) {
      setSelectedImage(event.target.src);
    }
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  return (
    <>
      <Helmet>
        <title>Продукция</title>
        <meta
          name="description"
          content="Официальный сайт ЛПХ МисБройлер. Покупка цыплят бройлеров, яиц для инкубации, кур несушек. Информация о продукции и калькулятор расчёта комбикорма."
        />
        <meta
          name="keywords"
          content="бройлеры, купить цыплят, мясные породы, инкубационные яйца, рост, развитие, Кобб500, Росс308, Подмосковье, производство мяса"
        />
        <meta
          property="og:title"
          content="Купить цыплят бройлеров в Московской области"
        />
        <meta property="og:site_name" content="MISBROYLER" />
        <meta property="og:locale" content="ru_RU" />
      </Helmet>
      <div>
        <div id="content">
          <div className="content">
            <h2 className="caption">Тушки домашнего бройлера</h2>
            <div className="about-items">
              {productionImages.map((image, index) => {
                return (
                  <img
                    key={index}
                    className="images"
                    loading="lazy"
                    src={image}
                    onClick={handleOpenModal}
                  />
                );
              })}
              {selectedImage && window.innerWidth >= 1024 && (
                <div
                  id="modal"
                  className="modal-image"
                  style={{ display: "flex" }}
                >
                  <img
                    className="modal-content"
                    src={selectedImage}
                    alt="Fullsize Image"
                  />
                  <span className="closeModal" onClick={closeModal}>
                    ×
                  </span>
                </div>
              )}
            </div>
          </div>
          <label htmlFor="menu-toggle" style={{ width: "1px" }}>
            <img className="menu-sticky" src={images.styckMenu} alt="" />
          </label>
        </div>
      </div>
    </>
  );
}

export default Product;
