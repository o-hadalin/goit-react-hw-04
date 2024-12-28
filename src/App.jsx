import { useState, useEffect } from 'react';
import SearchBar from './components/SearchBar/SearchBar';
import ImageGallery from './components/ImageGallery/ImageGallery';
import Loader from './components/Loader/Loader';
import ErrorMessage from './components/ErrorMessage/ErrorMessage';
import LoadMoreBtn from './components/LoadMoreBtn/LoadMoreBtn';
import { fetchImages } from './http-api';
import './App.css';

const App = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!searchQuery) return;

    const getImages = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const data = await fetchImages(searchQuery, page);
        setImages(prevImages => [...prevImages, ...data.results]);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    getImages();
  }, [searchQuery, page]);

  const handleSearchSubmit = query => {
    setSearchQuery(query);
    setImages([]);
    setPage(1);
  };

  const handleLoadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  return (
    <div className="App">
      <SearchBar onSubmit={handleSearchSubmit} />
      {error && <ErrorMessage message={error} />}
      {images.length > 0 && <ImageGallery images={images} />}
      {isLoading && <Loader />}
      {images.length > 0 && !isLoading && (
        <LoadMoreBtn onClick={handleLoadMore} />
      )}
    </div>
  );
};

export default App;
