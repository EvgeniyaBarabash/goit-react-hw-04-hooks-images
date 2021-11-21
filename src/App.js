import './App.css';
import { useEffect, useState } from 'react';
import { ToastContainer } from 'react-toastify';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SearchBar from 'componenets/Searchbar/Searchbar';
import ImageGallery from 'componenets/ImageGallery/ImageGallery';
import Button from 'componenets/Button/Button';
import { fetchImages } from 'services/pixabay-api';
import Loader from 'react-loader-spinner';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';

export default function App() {
  const [query, setQuery] = useState('');
  const [error, setError] = useState(null);
  const [status, setStatus] = useState('idle');
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    if (!query) return;
    fetchImages(query, page)
      .then(results => {
        const resultsCount = results.hits.length;
        if (resultsCount === 0) {
          toast.error('Nothing was found. Please try another search');
          return;
        }
        setImages(images => [...images, ...results.hits]);
        setStatus('resolved');
      })
      .catch(error => {
        setError(error);
        setStatus('rejected');
      });
  }, [query, page]);
  const handleSubmit = query => {
    setImages([]);
    setQuery(query);
    setPage(1);
    setStatus('pending');
  };
  const loadMore = () => {
    setPage(page => page + 1);
    setStatus('resolved');
  };
  return (
    <div className="App">
      <SearchBar onSubmit={handleSubmit} />
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
          onClick={loadMore}
        ></Button>
      )}
    </div>
  );
}
