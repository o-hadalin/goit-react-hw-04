import PropTypes from 'prop-types';
import styles from './ImageCard.module.css';

const ImageCard = ({ src, alt }) => {
  return (
    <div className={styles.card}>
      <img className={styles.image} src={src} alt={alt} />
    </div>
  );
};

ImageCard.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
};

export default ImageCard;
