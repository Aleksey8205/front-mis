import React, { useEffect } from 'react';

const ModalsIndex = () => {
  useEffect(() => {
    // Функция для открытия модального окна
    document.addEventListener('DOMContentLoaded', function() {
      // Находим все кнопки открытия модальных окон
      const openModalButtons = document.querySelectorAll('.carousel-label');
  
      // Добавляем обработчик события для каждой кнопки
      openModalButtons.forEach(button => {
          button.addEventListener('click', function(event) {
              event.preventDefault(); 
  
              const modalId = this.getAttribute('data-modal'); // Если у кнопки есть атрибут data-modal
              let modal = null;
  
              if (modalId) {
                  modal = document.getElementById(modalId);
              } else {
                  
                  modal = this.closest('.item').querySelector('.modal');
              }
  
              if (modal) {
                  // Открываем найденное модальное окно
                  modal.style.display = 'block';
  
                  // Добавляем обработчик закрытия модального окна по клику на крестик
                  const closeButton = modal.querySelector('.close');
                  closeButton.addEventListener('click', () => {
                      modal.style.display = 'none'; // Закрытие модального окна
                  });
  
                  // Закрытие модального окна по клику вне его области
                  window.addEventListener('click', (event) => {
                      if (event.target === modal) {
                          modal.style.display = 'none';
                      }
                  });
              }
          });
      });
  });
  
  var slideIndexTwo = 1;
  showSlides(slideIndexTwo);
  
  function plusSlides(n) {
      showSlides(slideIndexTwo += n);
  }
  
  function currentSlide(n) {
      showSlides(slideIndexTwo = n);
  }
  
  function showSlides(n) {
      var i;
      var slides = document.getElementsByClassName("mySlides");
      var dots = document.getElementsByClassName("dot");

      if (!slides.length || !dots.length) return;

      if (n > slides.length) slideIndexTwo = 1;
      if (n < 1) slideIndexTwo = slides.length;
      for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
      }
      for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
      }
      slides[slideIndexTwo - 1].style.display = "block";
      dots[slideIndexTwo - 1].className += " active";
    }
    
  let touchStartX = 0;
  
  document.addEventListener('touchstart', function(event) {
      touchStartX = event.touches[0].clientX;
  }, false);
  
  document.addEventListener('touchmove', function(event) {
  }, false);
  
  document.addEventListener('touchend', function(event) {
      let touchEndX = event.changedTouches[0].clientX;
      const deltaX = touchStartX - touchEndX;
      
      if (Math.abs(deltaX) > 40) {
          if (deltaX > 0) {
              plusSlides(1);
          } else {
              plusSlides(-1);
          }
      }
  }, false);
  
  document.addEventListener("DOMContentLoaded", function() {
      currentSlide(1);
  });
  
  setInterval(function() {
      plusSlides(1);
  }, 10000);
  
  // Обработчик событий для кнопок переключения слайдов
  document.querySelectorAll('.slide-control').forEach(button => {
      button.addEventListener('click', function(event) {
          const direction = this.dataset.direction;
          if (direction === 'next') {
              plusSlides(1);
          } else if (direction === 'prev') {
              plusSlides(-1);
          }
      });
  });
  
   // Функция для открытия модального окна
   function openModal(itemId) {
      const modal = document.getElementById(itemId);
      const overlay = document.querySelector('.overlay');
      if (modal && overlay) {
          modal.classList.add('actives');
          overlay.classList.add('actives');
      }
  }
  
  // Функция для закрытия всех открытых модальных окон
  function closeAllModals() {
      const modals = document.querySelectorAll('.item-modal');
      const overlay = document.querySelector('.overlay');
      modals.forEach(modal => modal.classList.remove('actives'));
      if (overlay) {
          overlay.classList.remove('actives');
      }
  }
  
  // Обработчик событий для кнопок открытия модальных окон
  document.body.addEventListener('click', function(event) {
      const target = event.target.closest('.about-item-list');
      if (target) {
          const itemId = target.dataset.item;
          if (itemId) {
              openModal(itemId);
          }
      }
  });
  
  // Обработчик событий для кнопок закрытия модальных окон
  document.querySelectorAll('.closed-button').forEach(button => {
      button.addEventListener('click', () => {
          closeAllModals();
      });
  });
  
  // Закрытие модального окна при клике вне его области
  window.onclick = function(event) {
      if (event.target.classList.contains('overlay')) {
          closeAllModals();
      }
  };

    // Очистка обработчиков событий при размонтировании компонента
    return () => {
      document.body.removeEventListener('click', openModal);
      document.querySelectorAll('.closed-button').forEach(button => {
        button.removeEventListener('click', closeAllModals);
      });
      window.onclick = null;
    };
  }, []);

  return null;
};

export default ModalsIndex;