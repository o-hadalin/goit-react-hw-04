import PropTypes from 'prop-types';
import ImageCard from '../ImageCard/ImageCard';
import styles from './ImageGallery.module.css';

const ImageGallery = ({ images }) => {
  if (!images.length) return null;

  return (
    <ul className={styles.gallery}>
      {images.map(({ id, urls, alt_description }) => (
        <li key={id} className={styles.item}>
          <ImageCard src={urls.small} alt={alt_description || 'Image'} />
        </li>
      ))}
    </ul>
  );
};

ImageGallery.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      urls: PropTypes.shape({
        small: PropTypes.string.isRequired,
      }).isRequired,
      alt_description: PropTypes.string,
    })
  ).isRequired,
};

export default ImageGallery;
