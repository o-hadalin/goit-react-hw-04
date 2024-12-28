import PropTypes from 'prop-types';
import styles from './LoadMoreBtn.module.css';

const LoadMoreBtn = ({ onClick }) => {
  return (
    <button className={styles.loadMoreBtn} onClick={onClick}>
      Load More
    </button>
  );
};

LoadMoreBtn.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default LoadMoreBtn;
