import './App.css';
import { Component } from 'react';
import { ToastContainer } from 'react-toastify';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SearchBar from 'componenets/Searchbar/Searchbar';
import ImageGallery from 'componenets/ImageGallery/ImageGallery';
import Button from 'componenets/Button/Button';
import { fetchImages } from 'services/pixabay-api';
import Loader from 'react-loader-spinner';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
class App extends Component {
  state = {
    query: '',
    error: null,
    status: 'idle',
    images: [],
    page: 1,
  };
  componentDidUpdate(prevProps, prevState) {
    const { query, page, images } = this.state;
    if (query === prevState.query && page === prevState.page) return;
    fetchImages(this.state.query, this.state.page)
      .then(results => {
        const resultsCount = results.hits.length;
        if (resultsCount === 0) {
          toast.error('Nothing was found. Please try another search');
          return;
        }
        this.setState({
          images: [...images, ...results.hits],
          status: 'resolved',
        });
      })
      .catch(error => this.setState({ error, status: 'rejected' }));
  }
  handleSubmit = query => {
    this.setState({ images: [], query, page: 1, status: 'pending' });
  };
  loadMore = () => {
    this.setState(({ page }) => ({ page: page + 1, status: 'pending' }));
  };
  render() {
    const { error, status, images } = this.state;
    return (
      <div className="App">
        <SearchBar onSubmit={this.handleSubmit} />
        <ToastContainer autoClose={3000} />
        <ImageGallery images={images} />
        {status === 'pending' && (
          <Loader
            className="Loader"
            type="ThreeDots"
            color="#00BFFF"
            height={80}
            width={80}
            timeout={3000}
          />
        )}
        {status === 'rejected' && <h2>{error.massage}</h2>}
        {status === 'resolved' && (
          <Button
            aria-label="Load more"
            children="Load more"
            onClick={this.loadMore}
          ></Button>
        )}
      </div>
    );
  }
}
export default App;
