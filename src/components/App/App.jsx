import { useState, useEffect } from 'react';
import * as API from '../../services/PixabayApi';
import SearchBar from '../SearchBar/SearchBar';
import ImageGallery from '../ImageGallery/ImageGallery';
import Loader from '../Loader/Loader';
import Button from '../Button/Button';
import { ToastContainer, toast, Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  // Установка начального состояния
  const [searchName, setSearchName] = useState(''); // Хранит запрос для поиска
  const [images, setImages] = useState([]); // Хранит загруженные изображения
  const [currentPage, setCurrentPage] = useState(1); // Хранит текущий номер страницы
  const [isLoading, setIsLoading] = useState(false); // Индикатор загрузки изображений
  const [totalPages, setTotalPages] = useState(0); // Хранит общее количество страниц

  useEffect(() => {
    if (searchName === '') {
      return;
    }

    async function addImages() {
      try {
        // Устанавливаем флаг загрузки
        setIsLoading(true);
        // Получаем данные с помощью API запроса к Pixabay
        const data = await API.getImages(searchName, currentPage);

        if (data.hits.length === 0) {
          // Если изображения не найдены, выводим сообщение
          return toast.info('Sorry image not found...', {
            position: toast.POSITION.TOP_RIGHT,
          });
        }

        // Нормализуем полученные изображения
        const normalizedImages = API.normalizedImages(data.hits);

        setImages(prevImages => [...prevImages, ...normalizedImages]); // Добавляем новые изображения к существующим
        setIsLoading(false); // Сбрасываем флаг загрузки
        setTotalPages(Math.ceil(data.totalHits / 12)); // Вычисляем общее количество страниц
      } catch {
        toast.error('Something went wrong!', {
          position: toast.POSITION.TOP_RIGHT,
        }); // Если произошла ошибка, выводим сообщение
      } finally {
        setIsLoading(false); // В любом случае сбрасываем флаг загрузки
      }
    }
    addImages();
  }, [searchName, currentPage]);

  // Метод для загрузки дополнительных изображений путем увеличения номера текущей страницы
  const loadMore = () => {
    setCurrentPage(prevPage => prevPage + 1);
  };

  // Метод для обработки отправки формы поиска
  const handleSubmit = query => {
    setSearchName(query); // Устанавливаем введенный запрос в состояние
    setImages([]); // Очищаем массив с изображениями
    setCurrentPage(1); // Сбрасываем номер текущей страницы на первую
  };

  return (
    <div>
      <ToastContainer transition={Slide} />
      <SearchBar onSubmit={handleSubmit} />
      {images.length > 0 ? (
        <ImageGallery images={images} />
      ) : (
        <p
          style={{
            padding: 100,
            textAlign: 'center',
            fontSize: 30,
          }}
        >
          Image gallery is empty... 📷
        </p>
      )}
      {isLoading && <Loader />}
      {images.length > 0 && totalPages !== currentPage && !isLoading && (
        <Button onClick={loadMore} /> // Кнопка для загрузки дополнительных изображений
      )}
    </div>
  );
};

export default App;
