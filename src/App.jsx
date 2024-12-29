import { useState, useEffect } from 'react';
import SearchBar from './components/SearchBar/SearchBar';
import ImageGallery from './components/ImageGallery/ImageGallery';
import Loader from './components/Loader/Loader';
import ErrorMessage from './components/ErrorMessage/ErrorMessage';
import LoadMoreBtn from './components/LoadMoreBtn/LoadMoreBtn';
import { fetchImages } from './http-api';
import ImageModal from './components/ImageModal/ImageModal';
import './App.css';

const App = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalImage, setModalImage] = useState({ url: '', alt: '' });
  const [totalPages, setTotalPages] = useState(0);
  const [noImagesFound, setNoImagesFound] = useState(false);

  useEffect(() => {
    if (!searchQuery) return;

    const getImages = async () => {
      setIsLoading(true);
      setError(null);
      setNoImagesFound(false);

      try {
        const data = await fetchImages(searchQuery, page);
        if (data.results.length === 0) {
          setNoImagesFound(true);
        }
        setImages(prevImages => [...prevImages, ...data.results]);
        setTotalPages(data.total_pages);
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
    setNoImagesFound(false);
  };

  const handleLoadMore = () => {
    setPage(prevPage => prevPage + 1);

    setTimeout(() => {
      window.scrollBy({
        top: 200,
        behavior: 'smooth',
      });
    }, 300);
  };

  const openModal = (imageUrl, imageAlt) => {
    setModalImage({ url: imageUrl, alt: imageAlt });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const hasMoreImages = page < totalPages;

  return (
    <div className="App">
      <SearchBar onSubmit={handleSearchSubmit} />
      {error && <ErrorMessage message={error} />}
      {noImagesFound && (
        <p>No images found for {searchQuery}. Please try another search.</p>
      )}
      {images.length > 0 && (
        <ImageGallery images={images} onImageClick={openModal} />
      )}
      {isLoading && <Loader />}
      {images.length > 0 && !isLoading && hasMoreImages && (
        <LoadMoreBtn onClick={handleLoadMore} isVisible={hasMoreImages} />
      )}

      <ImageModal
        isOpen={isModalOpen}
        onClose={closeModal}
        imageUrl={modalImage.url}
        imageAlt={modalImage.alt}
      />
    </div>
  );
};

export default App;
