import React, { useState } from "react";
import { imageItems, hangarImages } from "../../javaScript/imagesAboutPage";
import { Helmet } from "react-helmet";

function About() {
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
        <title>МИСБРОЙЛЕР О нас</title>
        <meta
          name="description"
          content="ЛПХ МисБройлер занимается инкубацией и выращиванием цыплят бройлера из инкубационного яйца лучших отечественных и импортных производителей кросс РОСС 308 и КОББ 500 круглогодично"
        />
        <meta
          name="keywords"
          content="мис бройлер, ЛПХ, цыплята, мясо птицы, мегакорм, комбикорм, консультация по уходу за бройлерами"
        />
        <meta
          property="og:title"
          content="Купить цыплят бройлеров в Московской области"
        />
        <meta property="og:site_name" content="MISBROYLER" />
        <meta property="og:locale" content="ru_RU" />
      </Helmet>
      <div id="content">
        <div className="content">
          <main className="main">
            <article className="about-main">
              <h1 className="caption">Немного о нас</h1>
              <p className="text-about">
                ЛПХ <span className="misbroiler">МисБройлер</span> занимается
                инкубацией и выращиванием цыплят бройлера из инкубационного яйца
                лучших отечественных и импортных производителей кросс РОСС 308 и
                КОББ 500 круглогодично.
              </p>
              <div className="about-list">
                <ul className="list item-1">
                  <li className="aboot-list-item">
                    Осуществляем выведение цыплят в своем инкубатории.
                  </li>
                  <li className="aboot-list-item">
                    Реализуем суточных цыплят бройлера.
                  </li>
                  <li className="aboot-list-item">
                    Выращиваем цыплят бройлера на мясо.
                  </li>
                  <li className="aboot-list-item">
                    Имеется собственная линия по убою птицы.
                  </li>
                  <li className="aboot-list-item item-5">
                    Реализуем тушки бройлера высокого качества (экологически
                    чистого гипоаллергенного мяса).
                  </li>
                  <li className="aboot-list-item">
                    Даём консультацию по уходу, выращиванию и кормлению
                    бройлера.
                  </li>
                </ul>
                <ul className="list item-2">
                  <li className="aboot-list-item">
                    Являемся дистрибьютором компании{" "}
                    <a href="https://megakorm.ru/#map" className="dist-mega">
                      Мегакорм
                    </a>
                    .
                  </li>
                  <li className="aboot-list-item">
                    Реализуем корма компании{" "}
                    <a href="https://megakorm.ru/#map" className="dist-mega">
                      Мегакорм
                    </a>{" "}
                    для сельскохозяйственных животных и птицы.
                  </li>
                  <li className="aboot-list-item">
                    Реализуем домашнее яйцо от кур несушек содержащихся на
                    свободном выгуле.
                  </li>
                  <li className="aboot-list-item">
                    Реализуем молодок кур несушек по сезону.
                  </li>
                  <li className="aboot-list-item">
                    Обмениваемся личными наработками и опытом, для улучшения
                    условий содержания и сокращения потерь.
                  </li>
                </ul>
              </div>
              <section>
                <h2 className="caption">
                  Фотографии технологического процесса
                </h2>
                <div className="about-items">
                  {imageItems.map((item, idx) => (
                    <div key={idx} className="description">
                      <img
                        className="images"
                        src={item.imgSrc}
                        alt=""
                        onClick={handleOpenModal}
                      />
                      <p className="text-description">{item.desc}</p>
                    </div>
                  ))}
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

                <h2 className="caption">
                  Фото помещения для выращивания бройлера.
                </h2>
                <div className="item-hangar">
                  {hangarImages.map((img, idx) => (
                    <img key={idx} className="image-hangar" src={img} alt="" />
                  ))}
                </div>
                <p className="text">
                  Если вы хотите увидеть этапы постройки, посмотрите в нашем
                  разделе{" "}
                  <button className="carousel-btn" disabled>
                    Находится в разработке
                  </button>
                </p>
              </section>
            </article>
          </main>
        </div>
        <label htmlFor="menu-toggle" style={{ width: "1px" }}>
          <img
            className="menu-sticky"
            src="image/menu_w88x7uezfxkn.svg"
            alt=""
          />
        </label>
      </div>
    </>
  );
}

export default About;
