import { Component } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import { Overlay, ModalWindow } from './Modal.styled';

// Объект модального окна в DOM-дереве
const modalRoot = document.querySelector('#modal-root');

// Классовый компонент Modal
class Modal extends Component {
  // Метод жизненного цикла: вызывается после монтирования компонента
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown); // Добавляем обработчик события нажатия клавиши
    document.body.style.overflow = 'hidden';
  }

  // Метод жизненного цикла: вызывается перед размонтированием компонента
  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown); // Удаляем обработчик события нажатия клавиши
    document.body.style.overflow = 'visible';
  }

  // Обработчик события нажатия клавиши
  handleKeyDown = event => {
    if (event.code === 'Escape') {
      this.props.onClose(); // Закрываем модальное окно при нажатии клавиши Escape
    }
  };

  // Обработчик клика по фону модального окна
  handleBackdropClick = event => {
    if (event.currentTarget === event.target) {
      this.props.onClose(); // Закрываем модальное окно при клике на фон
    }
  };

  render() {
    const { largeImageURL, tags } = this.props; // Получаем значения пропсов

    return createPortal(
      <Overlay onClick={this.handleBackdropClick}>
        <ModalWindow>
          <img src={largeImageURL} alt={tags} />
        </ModalWindow>
      </Overlay>,
      modalRoot // Рендерим модальное окно в объект modalRoot в DOM-дереве
    );
  }
}

Modal.propTypes = {
  largeImageURL: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default Modal;
