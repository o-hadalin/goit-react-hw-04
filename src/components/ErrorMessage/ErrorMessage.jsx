import PropTypes from 'prop-types';
import styles from './ErrorMessage.module.css';

const ErrorMessage = ({ message }) => {
  return <p className={styles.error}>{message}</p>;
};

ErrorMessage.propTypes = {
  message: PropTypes.string.isRequired,
};

export default ErrorMessage;
