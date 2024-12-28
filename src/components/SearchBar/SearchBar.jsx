import PropTypes from 'prop-types';
import { useState } from 'react';
import toast from 'react-hot-toast';
import styles from './SearchBar.module.css';

const SearchBar = ({ onSubmit }) => {
  const [query, setQuery] = useState('');

  const handleInputChange = e => {
    setQuery(e.target.value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (query.trim() === '') {
      toast.error('Please enter a search term.');
      return;
    }
    onSubmit(query.trim());
    setQuery('');
  };

  return (
    <header className={styles.header}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <input
          type="text"
          className={styles.input}
          value={query}
          onChange={handleInputChange}
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
        <button type="submit" className={styles.button}>
          Search
        </button>
      </form>
    </header>
  );
};

SearchBar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default SearchBar;
