import { useEffect } from 'react';
import Modal from 'react-modal';
Modal.setAppElement('#root');
import PropTypes from 'prop-types';
import styles from './ImageModal.module.css';

const ImageModal = ({ isOpen, onClose, imageUrl, imageAlt }) => {
  useEffect(() => {
    const handleEsc = e => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEsc);

    return () => {
      document.removeEventListener('keydown', handleEsc);
    };
  }, [onClose]);

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      shouldCloseOnOverlayClick={true}
      className={styles.modal}
      overlayClassName={styles.overlay}
    >
      <div className={styles.modalContent}>
        <img src={imageUrl} alt={imageAlt} />
      </div>
    </Modal>
  );
};

ImageModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  imageUrl: PropTypes.string.isRequired,
  imageAlt: PropTypes.string.isRequired,
};

export default ImageModal;
