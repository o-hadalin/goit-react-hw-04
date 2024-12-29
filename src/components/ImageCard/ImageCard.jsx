import PropTypes from 'prop-types';
import styles from './ImageCard.module.css';

const ImageCard = ({ src, alt, onClick }) => {
  return (
    <div className={styles.card} onClick={onClick}>
      <img className={styles.image} src={src} alt={alt} />
    </div>
  );
};

ImageCard.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default ImageCard;
