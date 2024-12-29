import PropTypes from 'prop-types';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { HiOutlineSearch } from 'react-icons/hi';
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
        <div className={styles.inputWrapper}>
          <HiOutlineSearch className={styles.icon} onClick={handleSubmit} />
          <input
            type="text"
            id="search-input"
            name="search"
            className={styles.input}
            value={query}
            onChange={handleInputChange}
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
        </div>
      </form>
    </header>
  );
};

SearchBar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default SearchBar;
