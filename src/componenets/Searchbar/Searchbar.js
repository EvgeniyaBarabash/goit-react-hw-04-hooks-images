import { useState } from 'react';
import s from './Searchbar.module.css';
import { ReactComponent as SearchIcon } from '../icons/search.svg';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';

export default function SearchBar({ onSubmit }) {
  const [query, setQuery] = useState('');

  const handleQueryChange = e => {
    setQuery(e.target.value.toLowerCase());
  };
  const handleSubmit = e => {
    e.preventDefault();
    if (query.trim() === '') {
      toast.warning('Enter correct value');
      return;
    }
    onSubmit(query);
    setQuery('');
  };
  return (
    <header className={s.Searchbar}>
      <form className={s.form} onSubmit={handleSubmit}>
        <button type="submit" className={s.button}>
          <SearchIcon width="32" />
          <span className={s.buttonLabel}>Search</span>
        </button>

        <input
          className={s.input}
          type="text"
          autoComplete="off"
          value={query}
          autoFocus
          placeholder="Search images and photos"
          onChange={handleQueryChange}
        />
      </form>
    </header>
  );
}
SearchBar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
