import { Component } from 'react';
import { BsSearch } from 'react-icons/bs';
import PropTypes from 'prop-types';
import {
  SearchForm,
  SearchInput,
  SearchButton,
  SearchSpan,
  SearchLogo,
} from './SearchBar.styled';

class SearchBar extends Component {
  state = {
    searchName: '', // Хранит значение введенного поискового запроса
    inputValue: '',
  };

  handleChange = event => {
    this.setState({ inputValue: event.target.value });
  };

  handleSubmit = event => {
    event.preventDefault(); // Предотвращаем стандартное поведение формы
    const searchQuery = event.target.elements.searchName.value.trim(); // Получаем введенный поисковый запрос и удаляем пробелы
    this.props.onSubmit(searchQuery); // Передаем введенный поисковый запрос родительскому компоненту
    event.target.reset(); // Сбрасываем значение в поле ввода после отправки формы
  };

  render() {
    return (
      <header>
        <SearchForm onSubmit={this.handleSubmit}>
          <a href="https://pixabay.com/" target="_blank" rel="noreferrer">
            <SearchLogo
              src={require('./pixabay-logo.png')} // Логотип Pixabay
              alt="logo"
              width="200"
            />
          </a>
          <SearchButton>
            <BsSearch />
            <SearchSpan>Search</SearchSpan>
          </SearchButton>
          <SearchInput
            name="searchName"
            type="text"
            id="search"
            value={this.state.inputValue}
            onChange={this.handleChange}
          />
        </SearchForm>
      </header>
    );
  }
}

SearchBar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default SearchBar;
