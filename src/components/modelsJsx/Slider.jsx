import React from "react";
import Modal1 from '../modal-animal-component/Modal1.jsx';
import Modal2 from '../modal-animal-component/Modal2.jsx';
import Modal3 from '../modal-animal-component/Modal3.jsx';
import Modal4 from '../modal-animal-component/Modal4.jsx';
import Modal5 from '../modal-animal-component/Modal5.jsx';
import Modal6 from '../modal-animal-component/Modal6.jsx';
import Modal7 from '../modal-animal-component/Modal7.jsx'; 
import Modal8 from '../modal-animal-component/Modal8.jsx';
import images from "../../javaScript/images.js";

function SliderMegakorm() {
    return (
        <div className="slider" id="slider">
        <div className="item">
          {" "}
          {/* 1 животное*/}
          <div className="image-slider">
            <img
              className="animal-img"
              src={images.broilerCalc}
              alt="Бройлер"
            />
            <img
              className="korm-img"
              src={images.cookNutrition}
              alt="Комбикорм для Бройлеров"
            />
            <div
              className="slider__bubble"
              style={{ backgroundColor: "rgb(245, 141, 117)" }}
            />
            <div
              className="slider__plus"
              style={{ backgroundColor: "rgb(153, 225, 239)" }}
            >
              <p className="text-carousel">Красивый цвет тушки</p>
            </div>
          </div>
          <div className="item_col">
            <h2 className="caption-slider">Комбикорм для бройлеров</h2>
            <p className="text">
              Изготовлен из отборных зерновых продуктов с высокими
              показателями питательности. Содержит фитобиотики для
              повышения иммунитета и ферменты для пищеварения. «Мегакорм»
              обеспечивает высокую продуктивность птиц и темпы роста, так
              как содержит весь необходимый комплекс витаминов и
              микроэлементов, оптимальный для бройлеров.
            </p>
            <div className="more">
            <button
              onClick={() => {
              setTimeout(() => {
              window.scrollTo({
             top: document.querySelector("#calc")?.offsetTop ?? 0,
              behavior: "smooth",
              });
              }, 300); 
            }}
            className="carousel-btn"
            >
              Рассчитать
              </button>
              <button
                data-modal="modal1"
                className="carousel-label carousel-btn"
              >
                Подробнее о продукте
              </button>
            </div>
            <div className="modal" id="modal1">
            <Modal1 />
            </div>
          </div>
        </div>
        <div className="item">
          {/* 2 животное*/}
          <div className="image-slider">
            <img
              className="animal-img"
              src={images.rabbitCalc}
              alt="Кролик"
            />
            <img
              className="korm-img"
              src={images.rabbitNutrition}
              alt="комбикорм для кролика"
            />
            <div
              className="slider__bubble"
              style={{ backgroundColor: "rgb(127, 90, 154)" }}
            />
            <div
              className="slider__plus"
              style={{ backgroundColor: "rgb(247, 184, 111)" }}
            >
              <p className="text-carousel">Много травяной муки</p>
            </div>
          </div>
          <div className="item_col">
            <h2 className="caption-slider">Комбикорм для кроликов</h2>
            <p className="text">
              Изготовлен из отборных злаковых смесей и
              высококачественного, экологически чистого растительного
              сырья. Содержит продукты переработки масличных и бобовых
              культур - для обогащения протеинами и повышения
              питательности.
            </p>
            <div className="more">
            <button
              onClick={() => {
              setTimeout(() => {
              window.scrollTo({
             top: document.querySelector("#calc")?.offsetTop ?? 0,
              behavior: "smooth",
              });
              }, 300); 
            }}
            className="carousel-btn"
            >
              Рассчитать
              </button>
              <button
                data-modal="modal2"
                className="carousel-label carousel-btn"
              >
                Подробнее о продукте
              </button>
            </div>
            <div className="modal" id="modal2">
              <Modal2 />
            </div>
          </div>
        </div>
        <div className="item">
          {/* 3 животное*/}
          <div className="image-slider">
            <img
              className="animal-img"
              src={images.chickenCalc}
              alt=""
            />
            <img
              className="korm-img"
              src={images.chickenNutrition}
              alt=""
            />
            <div
              className="slider__bubble"
              style={{ backgroundColor: "rgb(244, 167, 89)" }}
            />
            <div
              className="slider__plus"
              style={{ backgroundColor: "rgb(249, 193, 198)" }}
            >
              <p className="text-carousel">Яркий желток</p>
            </div>
          </div>
          <div className="item_col">
            <h2 className="caption-slider">Комбикорм для кур-несушек</h2>
            <p className="text">
              Полностью покрывает потребность кур-несушек во всех
              питательных веществах и обеспечивает высокую яйценоскость.
              Изготовлен из отборных зерновых продуктов, а также продуктов
              переработки сои и подсолнечника. Для улучшения
              перевариваемости корма в состав добавлены ферменты. Содержит
              белки животного происхождения, аминокислоты, макро-и
              микроэлементы, а также комплекс витаминов.
            </p>
            <div className="more">
            <button
              onClick={() => {
              setTimeout(() => {
              window.scrollTo({
             top: document.querySelector("#calc")?.offsetTop ?? 0,
              behavior: "smooth",
              });
              }, 300); 
            }}
            className="carousel-btn"
            >
              Рассчитать
              </button>
              <button
                data-modal="modal3"
                className="carousel-label carousel-btn"
              >
                Подробнее о продукте
              </button>
            </div>
            <div className="modal" id="modal3">
              <div className="modal-content">
                <Modal3 />
              </div>
            </div>
          </div>
        </div>
        <div className="item">
          {/* 4 животное*/}
          <div className="image-slider">
            <img
              className="animal-img"
              src={images.cowCalc}
              alt="Крупный рогатый скот"
            />
            <img
              className="korm-img"
              src={images.cowNutrition}
              alt="Комбикорм для крупноо рогатого скота"
            />
            <div
              className="slider__bubble"
              style={{ backgroundColor: "rgb(101, 164, 126)" }}
            />
            <div
              className="slider__plus"
              style={{ backgroundColor: "rgb(153, 225, 239)" }}
            >
              <p className="text-carousel">Оптимальный рацион</p>
            </div>
          </div>
          <div className="item_col">
            <h2 className="caption-slider">
              Комбикорм для крупного рогатого скота
            </h2>
            <p className="text">
              Уникальный рецепт обеспечивает оптимальный рацион для
              обеспечения высоких показателей надоя. Изготовлен из
              отборных злаковых смесей и высококачественного, экологически
              чистого растительного сырья. Для обогащения протеином и
              повышения питательности в состав добавлены продукты
              переработки масличных и бобовых культур. Включает все
              необходимые витамины, макро- и микроэлементы, а также
              специальные добавки и органические микроэлементы,
              укрепляющие иммунитет.
            </p>
            <div className="more">
            <button
              onClick={() => {
              setTimeout(() => {
              window.scrollTo({
             top: document.querySelector("#calc")?.offsetTop ?? 0,
              behavior: "smooth",
              });
              }, 300); 
            }}
            className="carousel-btn"
            >
              Рассчитать
              </button>
              <button
                data-modal="modal4"
                className="carousel-label carousel-btn"
              >
                Подробнее о продукте
              </button>
            </div>
            <div className="modal" id="modal4">
              <div className="modal-content">
               <Modal4 />
              </div>
            </div>
          </div>
        </div>
        <div className="item">
          {/* 5 животное*/}
          <div className="image-slider">
            <img
              className="animal-img"
              src={images.duckCalc}
              alt=""
            />
            <img
              className="korm-img"
              src={images.duckNutrition}
              alt=""
            />
            <div
              className="slider__bubble"
              style={{ backgroundColor: "rgb(106, 205, 228)" }}
            />
            <div
              className="slider__plus"
              style={{ backgroundColor: "rgb(249, 193, 198)" }}
            >
              <p className="text-carousel">Ферментный комплекс</p>
            </div>
          </div>
          <div className="item_col">
            <h2 className="caption-slider">Комбикорм для уток</h2>
            <p className="text">
              Обеспечивает лучшие результаты по выращиванию здоровой птицы
              и снижает риски развития патологий желудочно-кишечного
              тракта птиц. Изготовлен из зерновых культур, оптимально
              подобранных под особенности организма водоплавающих. Высокая
              питательность. За счет содержания продуктов переработки
              подсолнечника и сои увеличена питательность. Содержит полный
              набор ферментов, витаминов, макро– и микроэлементов для
              здоровья птиц.
            </p>
            <div className="more">
            <button
              onClick={() => {
              setTimeout(() => {
              window.scrollTo({
             top: document.querySelector("#calc")?.offsetTop ?? 0,
              behavior: "smooth",
              });
              }, 300); 
            }}
            className="carousel-btn"
            >
              Рассчитать
              </button>
              <button
                data-modal="modal5"
                className="carousel-label carousel-btn"
              >
                Подробнее о продукте
              </button>
            </div>
            <div className="modal" id="modal5">
              <div className="modal-content">
                <div className="modal-window__animal-wrapper">
                  <span className="close">×</span>
                  <div className="">
                    <Modal5 />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="item">
          {/* 6 животное*/}
          <div className="image-slider">
            <img
              className="animal-img"
              src={images.pigCalc}
              alt=""
            />
            <img
              className="korm-img"
              src={images.pigNutrition}
              alt=""
            />
            <div
              className="slider__bubble"
              style={{ backgroundColor: "rgb(249, 193, 198)" }}
            />
            <div
              className="slider__plus"
              style={{ backgroundColor: "rgb(255, 223, 100)" }}
            >
              <p className="text-carousel">Баланс аминокислот</p>
            </div>
          </div>
          <div className="item_col">
            <h2 className="caption-slider">Комбикорм для свиней</h2>
            <p className="text">
              Укрепляет иммунную систему животных и положительно влияет на
              слизистую оболочку желудочно-кишечного тракта. Изготовлен из
              качественной зерновой смеси оптимальной для усвоения
              организмом свиней. За счет содержания продуктов переработки
              подсолнечника и сои увеличена питательность. Для увеличения
              поедаемости, в состав добавлены фитобиотики и натуральные
              ароматизаторы. Включает в себя макро- и микроэлементы,
              ферменты, витамины, а также специальные добавки.
            </p>
            <div className="more">
            <button
              onClick={() => {
              setTimeout(() => {
              window.scrollTo({
             top: document.querySelector("#calc")?.offsetTop ?? 0,
              behavior: "smooth",
              });
              }, 300); 
            }}
            className="carousel-btn"
            >
              Рассчитать
              </button>
              <button
                data-modal="modal6"
                className="carousel-label carousel-btn"
              >
                Подробнее о продукте
              </button>
            </div>
            <div className="modal" id="modal6">
             <Modal6 />
            </div>
          </div>
        </div>
        <div className="item">
          {/* 7 животное*/}
          <div className="image-slider">
            <img
              className="animal-img"
              src={images.quailCalc}
              alt=""
            />
            <img
              className="korm-img"
              src={images.quailNutrition}
              alt=""
            />
            <div
              className="slider__bubble"
              style={{ backgroundColor: "rgb(255, 218, 90)" }}
            />
            <div
              className="slider__plus"
              style={{ backgroundColor: "rgb(194, 224, 207)" }}
            >
              <p className="text-carousel">Удобная гранула</p>
            </div>
          </div>
          <div className="item_col">
            <h2 className="caption-slider">Комбикорм для перепелов</h2>
            <p className="text">
              Изготовлен из качественной зерновой смеси, оптимальной для
              роста и здоровья перепелов. За счет содержания продуктов
              переработки подсолнечника и сои увеличена питательность.
              Содержит ферменты для улучшения перевариваемости корма, а
              также натуральные каротиноиды для ярких желтков, здорового
              цвета кожи и привлекательного вида мяса. Содержит белки
              животного происхождения, макро и микроэлементы, и витамины.
            </p>
            <div className="more">
            <button
              onClick={() => {
              setTimeout(() => {
              window.scrollTo({
             top: document.querySelector("#calc")?.offsetTop ?? 0,
              behavior: "smooth",
              });
              }, 300); 
            }}
            className="carousel-btn"
            >
              Рассчитать
              </button>
              <button
                data-modal="modal7"
                className="carousel-label carousel-btn"
              >
                Подробнее о продукте
              </button>
            </div>
            <div className="modal" id="modal7">
              <Modal7 />
            </div>
          </div>
        </div>
        <div className="item">
          {/* 8 животное*/}
          <div className="image-slider">
            <img
              className="animal-img"
              src={images.gobblerCalc}
              alt=""
            />
            <img
              className="korm-img"
              src={images.gobblerNutrition}
              alt=""
            />
            <div
              className="slider__bubble"
              style={{ backgroundColor: "rgb(240, 104, 141)" }}
            />
            <div
              className="slider__plus"
              style={{ backgroundColor: "rgb(153, 225, 239)" }}
            >
              <p className="text-carousel">Усваиваемые аминокислоты</p>
            </div>
          </div>
          <div className="item_col">
            <h2 className="caption-slider">Комбикорм для Индейки</h2>
            <p className="text">
              Повышает иммунитет организма птицы к заболеваниям и
              укрепляет общее здоровье. Изготовлен из злаковой смеси,
              оптимальной для потребностей индеек. За счет содержания
              продуктов переработки подсолнечника и сои увеличена
              питательность. Для улучшения перевариваемости корма в состав
              добавлены ферменты. Содержит оптимальный для индеек комплекс
              витаминов, микро- и макроэлементов.
            </p>
            <div className="more">
            <button
              onClick={() => {
              setTimeout(() => {
              window.scrollTo({
             top: document.querySelector("#calc")?.offsetTop ?? 0,
              behavior: "smooth",
              });
              }, 300); 
            }}
            className="carousel-btn"
            >
              Рассчитать
              </button>
              <button
                data-modal="modal8"
                className="carousel-label carousel-btn"
              >
                Подробнее о продукте
              </button>
            </div>
            <div className="modal" id="modal8">
             <Modal8 />
            </div>
          </div>
        </div>
        <button
          className="prev-button"
          aria-label="Посмотреть предыдущий слайд"
        >
          <img
            src={images.arrowLeft}
            alt=""
            className='img-arrow'
          />
        </button>
        <button
          className="next-button"
          aria-label="Посмотреть следующий слайд"
        >
          <img
            src={images.arrowRight}
            alt=""
            className='img-arrow'
          />
        </button>
        {/*Карусель обоев закончилась*/}
      </div>
    )
}

export default SliderMegakorm;