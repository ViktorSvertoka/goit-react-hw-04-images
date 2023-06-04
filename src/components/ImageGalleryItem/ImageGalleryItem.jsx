import { useState } from 'react';
import PropTypes from 'prop-types';
import Modal from '../Modal/Modal';
import { Item, Img } from './ImageGalleryItem.styled';

const ImageItem = ({ image }) => {
  const [showModal, setShowModal] = useState(false); // Хранит состояние модального окна (открыто или закрыто)

  // Метод для переключения состояния модального окна
  const toggleModal = () => {
    setShowModal(prevModal => !prevModal); // Инвертирует значение showModal
  };

  return (
    <>
      <Item>
        <Img
          src={image.webformatURL} // URL маленького изображения
          alt={image.tags} // Теги изображения
          onClick={toggleModal} // Обработчик клика для открытия модального окна
        />
        {showModal && ( // Если showModal равно true, отображаем модальное окно
          <Modal
            largeImageURL={image.largeImageURL} // URL большого изображения
            tags={image.tags} // Теги изображения
            onClose={toggleModal} // Обработчик для закрытия модального окна
          />
        )}
      </Item>
    </>
  );
};

ImageItem.propTypes = {
  image: PropTypes.shape({
    webformatURL: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,
    largeImageURL: PropTypes.string.isRequired,
  }).isRequired,
};

export default ImageItem;
