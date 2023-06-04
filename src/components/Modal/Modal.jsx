import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import { Overlay, ModalWindow } from './Modal.styled';

// Объект модального окна в DOM-дереве
const modalRoot = document.querySelector('#modal-root');

// Классовый компонент Modal
const Modal = ({ largeImageURL, tags, onClose }) => {
  useEffect(() => {
    const handleKeyDown = event => {
      if (event.code === 'Escape') {
        onClose(); // Закрываем модальное окно при нажатии клавиши Escape
      }
    };

    window.addEventListener('keydown', handleKeyDown); // Добавляем обработчик события нажатия клавиши
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown); // Удаляем обработчик события нажатия клавиши
      document.body.style.overflow = 'visible';
    };
  }, [onClose]);

  // Обработчик клика по фону модального окна
  const handleBackdropClick = event => {
    if (event.currentTarget === event.target) {
      onClose(); // Закрываем модальное окно при клике на фон
    }
  };

  return createPortal(
    <Overlay onClick={handleBackdropClick}>
      <ModalWindow>
        <img src={largeImageURL} alt={tags} />
      </ModalWindow>
    </Overlay>,
    modalRoot // Рендерим модальное окно в объект modalRoot в DOM-дереве
  );
};

Modal.propTypes = {
  largeImageURL: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default Modal;
