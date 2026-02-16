import React from "react";
import SliderMegakorm from "../modelsJsx/Slider.jsx";
import ActualInfo from "../modelsJsx/ActualInfo.jsx";
import CreateInfo from "../modelsJsx/CreateInfo.jsx";
import images from "../../javaScript/images.js";
import Slider from "../../javaScript/slider-megakorm.js";
import Calculator from "../modelsJsx/Calculate.jsx";
import AboutSection from "../../javaScript/aboutSectionObserve.js";
import ModalsIndex from "../../javaScript/modals-index.js";
import ModalHandler from "../../javaScript/sliderBtnMegakorm.js";
import { Helmet } from "react-helmet";

function Home() {
  return (
    <>
      <Helmet>
        <title>МИСБРОЙЛЕР Главная</title>
        <meta
          name="description"
          content="ЛПХ МисБройлер занимается инкубацией и выращиванием цыплят бройлера из инкубационного яйца лучших отечественных и импортных производителей кросс РОСС 308 и КОББ 500 круглогодично.
    А так же на сайте имеется калькулятор для рассчета комбикорма для сельскохозяйственных животных. Купить цыплят бройлеров в подольске. Яйцо инкубационное бройлера РОСС 308 кобб 500 в подольске. тушка бройлера домашнего"
        />
        <meta
          name="keywords"
          content="мясо птицы, столовое яйцо, куриное яйцо, тушки бройлера, мясо, бройлера"
        />
        <meta
          property="og:title"
          content="Купить цыплят бройлеров в Московской области"
        />
        <meta property="og:site_name" content="MISBROYLER" />
        <meta property="og:locale" content="ru_RU" />
      </Helmet>
      <div id="content">
        <div className="container">
          <main className="main">
            <CreateInfo></CreateInfo>
            <ActualInfo></ActualInfo>
            <article className="about">
              <h2 className="caption">Чем занимается наше хозяйство</h2>
              <section className="section">
                <div
                  data-item="item1"
                  data-direction="left"
                  className="about-item-list item1"
                >
                  <div className="card">
                    <h3 className="heading">Цыплята</h3>
                    <div className="card-image">
                      <img className="image" src={images.broilerDay} alt="" />
                    </div>
                    <p className="text-item">
                        Выводим цыплят бройлера КРОСС ROSS308 / КОББ500 /
                        КОББ700 / Смена9 из лучшего инкубационного яйца
                        отечественных и импортных производителей. Выращиваем
                        цыплят без применения лекарственной химии в своем
                        хозяйстве до убоя.
                      </p>

                    <div >
                      <button className="carousel-btn" >Подробнее</button>
                    </div>
                  </div>
                </div>
                <div className="item-modal" id="item1">
                  <div className="image-grid">
                    <img className="image-chicken" src={images.photo1} alt="" />
                    <img className="image-chicken" src={images.photo2} alt="" />
                    <img className="image-chicken" src={images.photo3} alt="" />
                    <img className="image-chicken" src={images.photo4} alt="" />
                    <img className="image-chicken" src={images.photo5} alt="" />
                    <img
                      className="image-chicken"
                      src={images.photo11}
                      alt=""
                    />
                  </div>
                  <span className="closed-button">Закрыть</span>
                </div>
                <div
                  data-item="item2"
                  data-direction="right"
                  className="about-item-list item2"
                >
                  <div className="card">
                    <h3 className="heading">Тушки домашнего бройлера</h3>
                    <div className="card-image">
                      <img className="image" src={images.tushka} alt="" />
                      
                    </div>
                    <p className="text-item">
                        Реализуем экологически чистые, гипоаллергенные тушки
                        домашнего бройлера, высокого качества и аппетитного
                        внешнего вида. Вес от 2.2 кг до 3 кг.
                      </p>
                    <div>
                      <button className="carousel-btn">Подробнее</button>
                    </div>
                  </div>
                </div>
                <div className="item-modal" id="item2">
                  <div className="image-grid">
                    <img
                      className="image-chicken"
                      src={images.photoProd1}
                      alt=""
                    />
                    <img
                      className="image-chicken"
                      src={images.photoProd2}
                      alt=""
                    />
                    <img
                      className="image-chicken"
                      src={images.photoProd3}
                      alt=""
                    />
                    <img
                      className="image-chicken"
                      src={images.photoProd4}
                      alt=""
                    />
                    <img
                      className="image-chicken"
                      src={images.photoProd5}
                      alt=""
                    />
                    <img
                      className="image-chicken"
                      src={images.photoProd6}
                      alt=""
                    />
                  </div>
                  <span className="closed-button">Закрыть</span>
                </div>

                <div data-direction="bottom" className="about-item-list item3">
                  <div className="card">
                    <h3 className="heading">Мегакорм</h3>
                    <p className="text-item center">
                      {" "}
                      Являемся официальным дистрибьютором
                      <a href="https://megakorm.ru/#map" className="dist-mega">
                        Мегакорм
                      </a>
                      . Продаем комбикорм для различных видов
                      сельскохозяйственных животных. В наличии есть комбикорм
                      для бройлеров и кур-несушек. Корма для других
                      сельскохозяйственных животных под заказ от 1 до 4 дней.
                    </p>

                    <button
                      className="carousel-btn"
                      onClick={() => {
                        setTimeout(() => {
                          window.scrollTo({
                            top: document.querySelector("#slider").offsetTop,
                            behavior: "smooth",
                          });
                        }, 300);
                      }}
                    >
                      Подробнее
                    </button>
                  </div>
                  <div className="flex">
                    <img className="image" src={images.MeakormPng} alt="" />
                  </div>
                </div>

                <div
                  data-item="item4"
                  data-direction="left"
                  className="about-item-list item4"
                >
                  <div className="card">
                    <h3 className="heading">Домашнее яйцо</h3>
                    <div className="card-image-right">
                      <img className="image" src={images.LayersEgg} alt="" />
                    </div>
                    <p className="text-item right">
                      Реализуем свежее куриное яйцо от домашних здоровых кур.
                      Куры молодые и активные. Содержатся на свободном выгуле,
                      питаются зерновыми кормами. Лекарственные препараты не
                      применяем.
                    </p>
                    <button className="carousel-btn">Подробнее</button>
                  </div>
                </div>
                <div className="item-modal" id="item4">
                  <div>
                    <img
                      className="chicken__eggz__big__img"
                      src={images.eggzIn}
                      alt=""
                    />
                  </div>
                  <span className="closed-button">Закрыть</span>
                </div>
                <div
                  data-item="item5"
                  data-direction="right"
                  className="about-item-list item5"
                >
                  <div className="card">
                    <h3 className="heading">Куры несушки</h3>
                    <div className="card-image-left">
                      <img className="image" src={images.layers} alt="" />
                    </div>
                    <p className="text-item left">
                      Реализуем кур молодок в начале сезона. Отдаем предпочтение
                      мясояичной породе «Доминант». Средний показатель 300 яиц в
                      год массой до 70г, часто двухжелтковое. В зависимости от
                      подвида яйцо имеет декоративный цвет скорлупы.
                    </p>
                    {/* <button class="carousel-btn">Подробнее</button> */}
                  </div>
                </div>
                {/*   <div class="item-modal" id="item5">
                  <p></p>
                  <span class="closed-button">Закрыть</span>

              </div> */}

                <div data-direction="bottom" className="about-item-list item6 ">
                  <div className="card">
                    <h3 className="heading">Наши наработки</h3>
                    <p className="text-item center">
                      Творчески подходим к доработкам всякого рода устройств для
                      выращивания птицы(отопление, охлаждение, вентиляции,
                      осушение, систем поддержания температуры и контроля
                      влажности).
                      <br />
                      Улучшаем системы поения и кормления птицы. Работаем над
                      вариантами утилизации помёта без вреда Для природы.
                    </p>
                    <button
                      className="carousel-btn"
                      onClick={() => {
                        window.location.assign("/#/about");
                        window.scrollTo({ top: 0 });
                      }}
                    >
                      Подробнее
                    </button>
                  </div>
                  <img className="image" src={images.ideaBox} alt="" />
                </div>

                <div className="overlay" />
              </section>
            </article>
            <article className="megakorm">
              <section className="slider-wrapper">
                <SliderMegakorm />
              </section>
              <section className="whats-mega">
                <h2
                  className="caption"
                  style={{ textAlign: "center", color: "#294a96" }}
                >
                  Почему именно Мегакорм?
                </h2>
                <div className="benefits__wrapper">
                  <div className="benefits__item">
                    <img
                      className="image-benefits"
                      src={images.pigBenefist}
                      alt=" свинка"
                    />
                    <h4 className="caption-benefits">Эффективный и полезный</h4>
                    <p className="benefits-text">
                      Зерно, белковые вещества, микроэлементы и витамины. Есть
                      все для быстрого роста здоровых животных.
                    </p>
                  </div>
                  <div className="benefits__item">
                    <img
                      className="image-benefits"
                      src={images.chickenBenefist}
                    />
                    <h4 className="caption-benefits">
                      Легко купить. Легко использовать{" "}
                    </h4>
                    <p className="benefits-text">
                      Выпускается в удобной упаковке. Доступен в большинстве
                      регионов.
                    </p>
                  </div>
                  <div className="benefits__item">
                    <img
                      className="image-benefits"
                      src={images.cowBenefist}
                      alt=""
                    />
                    <h4 className="caption-benefits">
                      Просто добиться результата
                    </h4>
                    <p className="benefits-text">
                      Состав каждого продукта соответствует биологическим
                      потребностям конкретного вида животных. Повышенный
                      иммунитет, сохранение и прирост поголовья – вот результат.
                    </p>
                  </div>
                  <div className="benefits__item">
                    {" "}
                    <img
                      className="image-benefits"
                      src={images.rabbitBenefist}
                      alt=""
                    />
                    <h4 className="caption-benefits">
                      Гарантия качества ингредиентов
                    </h4>
                    <p className="benefits-text">
                      <a href="https://megakorm.ru" className="dist-mega">
                        Мегакорм
                      </a>
                      использует только качественное сырье от лучших
                      отечественных и мировых поставщиков. В собственной
                      лаборатории{" "}
                      <a href="https://megakorm.ru" className="dist-mega">
                        Мегакорм
                      </a>
                      использует более 280 критериев для анализа качества
                      входящего сырья и готовой продукции
                    </p>
                  </div>
                  <div className="benefits__item">
                    <img
                      className="image-benefits"
                      src={images.chickensBenefist}
                      alt=""
                    />
                    <h4 className="caption-benefits">Безопасно и экологично</h4>
                    <p className="benefits-text">
                      Качество продукции соответствует международным стандартам
                      ISO и GMP+. Без гормонов и стимуляторов роста. Нет повода
                      для беспокойства.
                    </p>
                  </div>
                  <div className="benefits__item">
                    <img
                      className="image-benefits"
                      src={images.duckBenefist}
                      alt=""
                    />
                    <h4 className="caption-benefits">
                      Ассортимент для всех и каждого
                    </h4>
                    <p className="benefits-text">
                      <a href="https://megakorm.ru" className="dist-mega">
                        Мегакорм
                      </a>
                      выпускает смеси для кормления разных видов
                      сельскохозяйственных животных, учитывая пол и возраст.
                      Есть и универсальные корма.
                    </p>
                  </div>
                </div>
              </section>
              <section className="whats-mega-mobile">
                <div className="mySlides fade">
                  <img className="img-whats-m" src={images.pigBenefist} />
                  <h4 className="caption-benefits">Эффективный и полезный</h4>
                  <p className="benefits-text">
                    Зерно, белковые вещества, микроэлементы и витамины. Есть все
                    для быстрого роста здоровых животных.
                  </p>
                </div>
                <div className="mySlides fade">
                  <img className="img-whats-m" src={images.chickenBenefist} />
                  <h4 className="caption-benefits">
                    Легко купить. Легко использовать{" "}
                  </h4>
                  <p className="benefits-text">
                    Выпускается в удобной упаковке. Доступен в большинстве
                    регионов.
                  </p>
                </div>
                <div className="mySlides fade">
                  <img className="img-whats-m" src={images.cowBenefist} />
                  <h4 className="caption-benefits">
                    Просто добиться результата
                  </h4>
                  <p className="benefits-text">
                    Состав каждого продукта соответствует биологическим
                    потребностям конкретного вида животных. Повышенный
                    иммунитет, сохранение и прирост поголовья – вот результат.
                  </p>
                </div>
                <div className="mySlides fade">
                  <img className="img-whats-m" src={images.rabbitBenefist} />
                  <h4 className="caption-benefits">
                    Гарантия качества ингредиентов
                  </h4>
                  <p className="benefits-text">
                    <a href="https://megakorm.ru" className="dist-mega">
                      Мегакорм
                    </a>
                    использует только качественное сырье от лучших отечественных
                    и мировых поставщиков. В собственной лаборатории{" "}
                    <a href="https://megakorm.ru" className="dist-mega">
                      Мегакорм
                    </a>
                    использует более 280 критериев для анализа качества
                    входящего сырья и готовой продукции
                  </p>
                </div>
                <div className="mySlides fade">
                  <img className="img-whats-m" src={images.chickenBenefist} />
                  <h4 className="caption-benefits">Безопасно и экологично</h4>
                  <p className="benefits-text">
                    Качество продукции соответствует международным стандартам
                    ISO и GMP+. Без гормонов и стимуляторов роста. Нет повода
                    для беспокойства.
                  </p>
                </div>
                <div className="mySlides fade">
                  <img className="img-whats-m" src={images.chickensBenefist} />
                  <h4 className="caption-benefits">
                    Ассортимент для всех и каждого
                  </h4>
                  <p className="benefits-text">
                    <a href="https://megakorm.ru" className="dist-mega">
                      Мегакорм
                    </a>
                    выпускает смеси для кормления разных видов
                    сельскохозяйственных животных, учитывая пол и возраст. Есть
                    и универсальные корма.
                  </p>
                </div>
                <a className="prever" onClick={() => plusSlides(-1)}>
                  ❮
                </a>
                <a className="nexter" onClick={() => plusSlides(1)}>
                  ❯
                </a>
                <div style={{ textAlign: "center" }}>
                  <span className="dot" onClick={() => currentSlide(1)}></span>
                  <span className="dot" onClick={() => currentSlide(2)}></span>
                  <span className="dot" onClick={() => currentSlide(3)}></span>
                  <span className="dot" onClick={() => currentSlide(4)}></span>
                  <span className="dot" onClick={() => currentSlide(5)}></span>
                  <span className="dot" onClick={() => currentSlide(6)}></span>
                </div>
              </section>
            </article>
            <section>
              <div>
                <h1 className="caption" id="calc">
                  Калькулятор корма
                </h1>
                <Calculator />
              </div>
            </section>
          </main>
          <div
            data-item="item6"
            data-direction="bottom"
            className="about-item-list animate-bottom image-megamiks"
          >
            <p className="text-megamiks">
              Нами была организована встреча с представителем компании
              «Мегакорм». Мы продемонстрировали своё подсобное хозяйство, а
              также обсудили вопросы сотрудничества и возможные перспективы
              развития и партнёрства.
            </p>
          </div>
        </div>
        <label htmlFor="menu-toggle" style={{ width: 1 }}>
          <img className="menu-sticky" src={images.styckMenu} alt="" />
        </label>
      </div>
      <Slider />
      <AboutSection />
      <ModalsIndex />
      <ModalHandler />
    </>
  );
}

export default Home;
