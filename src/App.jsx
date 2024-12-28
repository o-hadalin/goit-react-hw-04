import { useState, useEffect } from 'react';
import SearchBar from './components/SearchBar/SearchBar';
import ImageGallery from './components/ImageGallery/ImageGallery';
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

  return (
    <div>
      <SearchBar onSubmit={handleSearchSubmit} />
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <ImageGallery images={images} />

      {isLoading && <p>Loading...</p>}
      {images.length > 0 && !isLoading && (
        <button onClick={() => setPage(prevPage => prevPage + 1)}>
          Load More
        </button>
      )}
    </div>
  );
};

export default App;
