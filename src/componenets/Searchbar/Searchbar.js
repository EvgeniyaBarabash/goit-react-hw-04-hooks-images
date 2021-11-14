import {Component} from 'react';
import s from './Searchbar.module.css';
import { ReactComponent as SearchIcon } from '../icons/search.svg';
import { toast } from 'react-toastify';
class SearchBar extends Component {
  state = {
    query: '',
  };
  handleQueryChange = e => {
    this.setState({ query: e.currentTarget.value.toLowerCase() });
  };
  handleSubmit = e => {
    e.preventDefault();
    if(this.state.query.trim()===''){
        toast.warning('Enter correct value');
        return;
    }
    this.props.onSubmit(this.state.query)
    this.setState({ query: '' });
  };
  render() {
    return (
      <header className={s.Searchbar}>
        <form className={s.form} onSubmit={this.handleSubmit}>
          <button type="submit" className={s.button}>
            <SearchIcon width="32" />
            <span className={s.buttonLabel}>Search</span>
          </button>

          <input
            className={s.input}
            type="text"
            autoComplete="off"
            value={this.state.query}
            autoFocus
            placeholder="Search images and photos"
            onChange={this.handleQueryChange}
          />
        </form>
      </header>
    );
  }
}
export default SearchBar;
