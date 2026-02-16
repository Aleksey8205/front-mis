import React, { useState, useEffect } from 'react';
import images from '../../javaScript/images.js';

function Calculator() {
  const [selectedAnimal, setSelectedAnimal] = useState('animal1');
  const [heads, setHeads] = useState(1);
  const [animalImages] = useState({
    'animal1': images.broilerCalc,
    'animal2': images.rabbitCalc,
    'animal3': images.pigCalc,
    'animal4': images.cowCalc,
    'animal5': images.chickenCalc,
    'animal6': images.quailCalc,
    'animal7': images.gobblerCalc,
    'animal8': images.duckCalc,
  });

  const [animalColors] = useState({
    'animal1': 'rgb(153, 225, 239)',
    'animal2': 'rgb(230, 140, 120)',
    'animal3': 'rgb(244, 167, 89)',
    'animal4': 'rgb(101, 164, 126)',
    'animal5': 'rgb(106, 205, 228)',
    'animal6': 'rgb(255, 218, 90)',
    'animal7': 'rgb(249, 193, 198)',
    'animal8': 'rgb(240, 104, 141)'
  });

  const [animalData] = useState({
    'animal1': {
      A: { amount: 570 },
      B: { amount: 1700 },
      C: { amount: 2900 }
    },
    'animal2': {
      A: { amount: 0 },
      B: { amount: 0 },
      C: { amount: 0 },
      D: { amount: 0 }
    },
    'animal3': {
      A: { amount: 5500 },
      B: { amount: 16000 },
      C: { amount: 85000 },
      D: { amount: 170000 }
    },
    'animal4': {
      A: { amount: 0 },
    },
    'animal5': {
      A: { amount: 800 },
      B: { amount: 8000 },
      C: { amount: 100 },
    },
    'animal6': {
      A: { amount: 480 },
      B: { amount: 1000 },
      C: { amount: 30 }
    },
    'animal7': {
      A: { amount: 2900 },
      B: { amount: 16800 },
      C: { amount: 22700 }
    },
    'animal8': {
      A: { amount: 3000 },
      B: { amount: 5900 },
    }
  });

  useEffect(() => {
    updateResultBlocks(selectedAnimal);
    calculateFeed();
  }, [selectedAnimal, heads]);

  const calculateFeed = () => {
    const data = animalData[selectedAnimal];

    let totalKilogramsA = 0, totalKilogramsB = 0, totalKilogramsC = 0, totalKilogramsD = 0;

    if ('A' in data) {
      totalKilogramsA = heads * data.A.amount / 1000;
    }
    if ('B' in data) {
      totalKilogramsB = heads * data.B.amount / 1000;
    }
    if ('C' in data) {
      totalKilogramsC = heads * data.C.amount / 1000;
    }
    if ('D' in data) {
      totalKilogramsD = heads * data.D.amount / 1000;
    }

    const totalKilogramsTotal = totalKilogramsA + totalKilogramsB + totalKilogramsC + totalKilogramsD;

    const bagsOfFeedA = Math.ceil(totalKilogramsA / 25);
    const bagsOfFeedB = Math.ceil(totalKilogramsB / 25);
    const bagsOfFeedC = Math.ceil(totalKilogramsC / 25);
    const bagsOfFeedD = Math.ceil(totalKilogramsD / 25);

    const bagsOfFeedTotal = Math.ceil(totalKilogramsTotal / 25);

    updateResults(
      bagsOfFeedA, totalKilogramsA,
      bagsOfFeedB, totalKilogramsB,
      bagsOfFeedC, totalKilogramsC,
      bagsOfFeedD, totalKilogramsD,
      bagsOfFeedTotal, totalKilogramsTotal,
      selectedAnimal
    );
  };

  const updateResults = (
    bagsOfFeedA, totalKilogramsA,
    bagsOfFeedB, totalKilogramsB,
    bagsOfFeedC, totalKilogramsC,
    bagsOfFeedD, totalKilogramsD,
    bagsOfFeedTotal, totalKilogramsTotal,
    animalType
  ) => {
    switch (animalType) {
      case 'animal1':
        document.getElementById('itog').innerHTML = `<div class="itog-all">Итого: ${totalKilogramsTotal.toFixed(1)} кг (количество мешков: ${bagsOfFeedTotal})</div>`;
        break;
      case 'animal2':
        document.getElementById('itog').innerHTML = `<div class="itog-all">От условий</div>`;
        break;
      case 'animal3':
        document.getElementById('itog').innerHTML = `<div class="itog-all">Итого: ${totalKilogramsTotal.toFixed(1)} кг (количество мешков: ${bagsOfFeedTotal})</div>`;
        break;
      case 'animal4':
        document.getElementById('itog').innerHTML = `<div class="itog-all">От условий</div>`;
        break;
      case 'animal5':
        document.getElementById('itog').innerHTML = `<div class="itog-all">Итого: ${totalKilogramsTotal.toFixed(1)} кг (количество мешков: ${bagsOfFeedTotal})</div>`;
        break;
      case 'animal6':
        document.getElementById('itog').innerHTML = `<div class="itog-all">Итого: ${totalKilogramsTotal.toFixed(1)} кг (количество мешков: ${bagsOfFeedTotal})</div>`;
        break;
      case 'animal7':
        document.getElementById('itog').innerHTML = `<div class="itog-all">Итого: ${totalKilogramsTotal.toFixed(1)} кг (количество мешков: ${bagsOfFeedTotal})</div>`;
        break;
      case 'animal8':
        document.getElementById('itog').innerHTML = `<div class="itog-all">Итого: ${totalKilogramsTotal.toFixed(1)} кг (количество мешков: ${bagsOfFeedTotal})</div>`;
        break;
    }

    switch (animalType) {
      case 'animal1':
        document.querySelectorAll('.text-calc')[0].innerText = `Старт 0-14 дней \n${bagsOfFeedA} мешков ${totalKilogramsA.toFixed(1)}кг`;
        document.querySelectorAll('.text-calc')[1].innerText = `Рост 15-28 дней \n${bagsOfFeedB} мешков ${totalKilogramsB.toFixed(1)}кг`;
        document.querySelectorAll('.text-calc')[2].innerText = `Финиш  старше 29 дней \n${bagsOfFeedC} мешков ${totalKilogramsC.toFixed(1)}кг`;
        break;
      case 'animal2':
        document.querySelectorAll('.text-calc')[0].innerText = `На откорме вволю 63-77 дней`;
        document.querySelectorAll('.text-calc')[1].innerText = `После отъема 0.1 кг/сут \n 36-62 дней`;
        document.querySelectorAll('.text-calc')[2].innerText = `Матки 0.25 кг/сут окрол-отъем`;
        document.querySelectorAll('.text-calc')[3].innerText = `До отъема вволю \n 0 - 35 дней`;
        break;
      case 'animal3':
        document.querySelectorAll('.text-calc')[0].innerText = `Megapig  \n ${totalKilogramsA.toFixed(1)}  \n 5-42 дня`;
        document.querySelectorAll('.text-calc')[1].innerText = `${totalKilogramsB.toFixed(1)}кг\n Старт\n 43-60`;
        document.querySelectorAll('.text-calc')[2].innerText = `${totalKilogramsC.toFixed(1)}кг\n Рост \n 61- 104 дня`;
        document.querySelectorAll('.text-calc')[3].innerText = `${totalKilogramsD.toFixed(1)}кг\n Финиш \n105-170 дней`;
        break;
      case 'animal4':
        document.querySelectorAll('.text-calc')[0].innerText = `Данные в таблице\nна сайте мегакорм`;
        break;
      case 'animal5':
        document.querySelectorAll('.text-calc')[0].innerText = `${totalKilogramsA.toFixed(1)}кг \nСтарт\n 0-35 дней`;
        document.querySelectorAll('.text-calc')[1].innerText = `${totalKilogramsB.toFixed(1)}кг \nРост\n 42-133 дней`;
        document.querySelectorAll('.text-calc')[2].innerText = `${totalKilogramsC.toFixed(1)}кг \nПериод яйцекладки\n 29 дней`;
        break;
      case 'animal6':
        document.querySelectorAll('.text-calc')[0].innerText = `${totalKilogramsA.toFixed(1)}кг \nСтарт \n0-21 день`;
        document.querySelectorAll('.text-calc')[1].innerText = `${totalKilogramsB.toFixed(1)}кг \nРост \n21-42 день`;
        document.querySelectorAll('.text-calc')[2].innerText = `${totalKilogramsC.toFixed(1)}кг \nПериод Яйцекладки\n>42 дней`;
        break;
      case 'animal7':
        document.querySelectorAll('.text-calc')[0].innerText = `${totalKilogramsA.toFixed(1)}кг \nСтарт \n0-35 дней`;
        document.querySelectorAll('.text-calc')[1].innerText = `${totalKilogramsB.toFixed(1)}кг \nРост \n35-71 день`;
        document.querySelectorAll('.text-calc')[2].innerText = `${totalKilogramsC.toFixed(1)}кг \nФиниш\n>71 дней`;
        break;
      case 'animal8':
        document.querySelectorAll('.text-calc')[0].innerText = `${totalKilogramsA.toFixed(1)}кг \nСтарт \n0-28 дней`;
        document.querySelectorAll('.text-calc')[1].innerText = `${totalKilogramsB.toFixed(1)}кг \nРост \n29-56 дней`;
        break;
      default:
        console.log("Не найдено соответствующее животное");
    }
  };

  const updateResultBlocks = (animalType) => {
    const resultContainer = document.getElementById('result');
    const data = animalData[animalType];
    const stages = Object.keys(data);

    Array.from(resultContainer.querySelectorAll('.slider__plus__calculate')).forEach(el => el.remove());

    let parentDivClasses = [];
    for (let i = 1; i <= stages.length; i++) {
      if (i === 1) {
        parentDivClasses.push('itog-first');
      } else if (i === 2) {
        parentDivClasses.push('itog-second');
      } else if (i === 3) {
        parentDivClasses.push('itog-third');
      } else {
        parentDivClasses.push(`itog-${i}`);
      }
    }

    parentDivClasses.forEach(className => {
      const parentDiv = document.createElement('div');
      parentDiv.className = className;
      resultContainer.appendChild(parentDiv);
    });

    stages.forEach((stage, index) => {
      const stageDiv = document.createElement('div');
      stageDiv.classList.add('slider__plus__calculate');
      stageDiv.style.backgroundColor = animalColors[animalType];
      stageDiv.innerHTML = `<p class="text-calc"> 0 мешков 0 кг</p>`;
      resultContainer.querySelector(`.${parentDivClasses[index]}`).appendChild(stageDiv);
    });
  };

  return (
    <div className="calculator-wrapper">
      <div className="calculator-left">
        <p className="text">
          С помощью нашего калькулятора вы можете посчитать, сколько корма понадобится для вашего поголовья. Выберите сельскохозяйственное животное для рассчета. Введите количество голов и получите расчет кратный 1 мешку.
          <br />
        </p>
        <div className="animal-container">
          <div className="animals-item-list">
            <label htmlFor="animal1">
              <input
                id="animal1"
                className="animals"
                type="radio"
                name="animal"
                value="animal1"
                checked={selectedAnimal === 'animal1'}
                onChange={() => setSelectedAnimal('animal1')}
                hidden={true}
              />
              <img
                src={images.broilerSvg}
                alt="Animal 1"
                className="animal-image"
                onClick={() => setSelectedAnimal('animal1')}
              />
              <span className="tooltip-text">Бройлер</span>
            </label>
          </div>
          <div className="animals-item-list">
            <label htmlFor="animal2">
              <input
                id="animal2"
                className="animals"
                type="radio"
                name="animal"
                value="animal2"
                checked={selectedAnimal === 'animal2'}
                onChange={() => setSelectedAnimal('animal2')}
                hidden={true}
              />
              <img
                src={images.rabbitSvg}
                alt="Animal 2"
                className="animal-image"
                onClick={() => setSelectedAnimal('animal2')}
              />
              <span className="tooltip-text">Кролик</span>
            </label>
          </div>
          <div className="animals-item-list">
            <label htmlFor="animal3">
              <input
                id="animal3"
                type="radio"
                className="animals"
                name="animal"
                value="animal3"
                checked={selectedAnimal === 'animal3'}
                onChange={() => setSelectedAnimal('animal3')}
                hidden={true}
              />
              <img
                src={images.pigSvg}
                alt="Animal 2"
                className="animal-image"
                onClick={() => setSelectedAnimal('animal3')}
              />
              <span className="tooltip-text">Свинья</span>
            </label>
          </div>
          <div className="animals-item-list">
            <label htmlFor="animal4">
              <input
                id="animal4"
                type="radio"
                className="animals"
                name="animal"
                value="animal4"
                checked={selectedAnimal === 'animal4'}
                onChange={() => setSelectedAnimal('animal4')}
                hidden={true}
              />
              <img
                src={images.cowSvg}
                alt="Animal 2"
                className="animal-image"
                onClick={() => setSelectedAnimal('animal4')}
              />
              <span className="tooltip-text">Корова</span>
            </label>
          </div>
          <div className="animals-item-list">
            <label htmlFor="animal5">
              <input
                id="animal5"
                type="radio"
                className="animals"
                name="animal"
                value="animal5"
                checked={selectedAnimal === 'animal5'}
                onChange={() => setSelectedAnimal('animal5')}
                hidden={true}
              />
              <img
                src={images.chickenEggzSvg}
                alt="Animal 2"
                className="animal-image"
                onClick={() => setSelectedAnimal('animal5')}
              />
              <span className="tooltip-text">Несушка</span>
            </label>
          </div>
          <div className="animals-item-list">
            <label htmlFor="animal6">
              <input
                id="animal6"
                type="radio"
                className="animals"
                name="animal"
                value="animal6"
                checked={selectedAnimal === 'animal6'}
                onChange={() => setSelectedAnimal('animal6')}
                hidden={true}
              />
              <img
                src={images.perepelSvg}
                alt="Animal 2"
                className="animal-image"
                onClick={() => setSelectedAnimal('animal6')}
              />
              <span className="tooltip-text">Перепел</span>
            </label>
          </div>
          <div className="animals-item-list">
            <label htmlFor="animal7">
              <input
                id="animal7"
                type="radio"
                className="animals"
                name="animal"
                value="animal7"
                checked={selectedAnimal === 'animal7'}
                onChange={() => setSelectedAnimal('animal7')}
                hidden={true}
              />
              <img
                src={images.gobblerSvg}
                alt="Animal 2"
                className="animal-image"
                onClick={() => setSelectedAnimal('animal7')}
              />
              <span className="tooltip-text">Индейка</span>
            </label>
          </div>
          <div className="animals-item-list">
            <label htmlFor="animal8">
              <input
                id="animal8"
                type="radio"
                className="animals"
                name="animal"
                value="animal8"
                checked={selectedAnimal === 'animal8'}
                onChange={() => setSelectedAnimal('animal8')}
                hidden={true}
              />
              <img
                src={images.duckSvg}
                alt="Animal 2"
                className="animal-image"
                onClick={() => setSelectedAnimal('animal8')}
              />
              <span className="tooltip-text">Утка</span>
            </label>
          </div>
        </div>
        <label htmlFor="heads" />
        <input
          placeholder="Введите кол-во голов"
          className="input-head"
          type="number"
          id="heads"
          min={1}
          value={heads}
          onChange={(e) => setHeads(e.target.value)}
        />
        <div id="itog">
          <div className="itog-all">
            Итого: 0 кг (колличество мешков:)
          </div>
        </div>
      </div>
      <div className="calculator-right">
        <div className="results" id="result"></div>
        <img className="image-calculator" src={animalImages[selectedAnimal]} />
      </div>
    </div>
  );
}

export default Calculator;