import PropTypes from 'prop-types';
import styles from './LoadMoreBtn.module.css';

const LoadMoreBtn = ({ onClick, isVisible }) => {
  if (!isVisible) return null;

  return (
    <button className={styles.loadMoreBtn} onClick={onClick}>
      Load More
    </button>
  );
};

LoadMoreBtn.propTypes = {
  onClick: PropTypes.func.isRequired,
  isVisible: PropTypes.bool.isRequired,
};

export default LoadMoreBtn;
