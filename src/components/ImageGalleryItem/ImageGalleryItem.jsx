import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Modal from '../Modal/Modal';
import { Item, Img } from './ImageGalleryItem.styled';

// Классовый компонент ImageItem
class ImageItem extends Component {
  state = {
    showModal: false, // Хранит состояние модального окна (открыто или закрыто)
  };

  // Метод для переключения состояния модального окна
  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal, // Инвертирует значение showModal
    }));
  };

  render() {
    const { showModal } = this.state; // Получаем текущее значение showModal из состояния
    const { image } = this.props; // Получаем переданный пропс image

    return (
      <>
        <Item>
          <Img
            src={image.webformatURL} // URL маленького изображения
            alt={image.tags} // Теги изображения
            onClick={this.toggleModal} // Обработчик клика для открытия модального окна
          />
          {showModal && ( // Если showModal равно true, отображаем модальное окно
            <Modal
              largeImageURL={image.largeImageURL} // URL большого изображения
              tags={image.tags} // Теги изображения
              onClose={this.toggleModal} // Обработчик для закрытия модального окна
            />
          )}
        </Item>
      </>
    );
  }
}

ImageItem.propTypes = {
  image: PropTypes.shape({
    webformatURL: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,
    largeImageURL: PropTypes.string.isRequired,
  }).isRequired,
};

export default ImageItem;
