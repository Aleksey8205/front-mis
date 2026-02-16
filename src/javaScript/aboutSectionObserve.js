import React, { useEffect } from 'react';

const AboutSection = () => {
  useEffect(() => {
    const container = document.querySelector('.container');
    const observerOptions = {
      rootMargin: '0px',
      threshold: [0, 0.1]
    };

    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        const direction = entry.target.dataset.direction;
        if (entry.isIntersecting) {
          entry.target.classList.add(`animate-${direction}`);
        } else {
          entry.target.classList.remove(`animate-${direction}`);
        }
      });
    }, observerOptions);

    // Функция для наблюдения за новыми элементами
    const observeNewElements = () => {
      const newItems = container.querySelectorAll('.about-item-list');
      newItems.forEach(item => {
        observer.observe(item);
      });
    };

    // Наблюдаем за всеми существующими элементами
    observeNewElements();

    // Очистка наблюдателя при размонтировании компонента
    return () => {
        observer.disconnect();
      };
    }, []);
  
    return ;
};

export default AboutSection;