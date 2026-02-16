import React, { useEffect } from 'react';

const ModalHandler = () => {
  useEffect(() => {
    // Функция для открытия модального окна
    function openModal(event) {
      event.preventDefault(); // Отменяем стандартное поведение ссылки

      // Находим ближайшее модальное окно относительно кнопки
      const modalId = event.target.getAttribute('data-modal'); // Если у кнопки есть атрибут data-modal
      let modal = null;

      if (modalId) {
        modal = document.getElementById(modalId);
      } else {
        modal = event.target.closest('.item').querySelector('.modal');
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
    }

    // Добавляем обработчик события для каждой кнопки
    const openModalButtons = document.querySelectorAll('.carousel-label');
    openModalButtons.forEach(button => {
      button.addEventListener('click', openModal);
    });

    // Очистка обработчиков событий при размонтировании компонента
    return () => {
      openModalButtons.forEach(button => {
        button.removeEventListener('click', openModal);
      });
    };
  }, []);

  return null;
};

export default ModalHandler;