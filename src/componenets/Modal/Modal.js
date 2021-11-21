import { useEffect } from 'react';
import s from './Modal.module.css';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
const modalRoot = document.querySelector('#modal-root');

export default function Modal({ children, onClose, nextImage, prevImage }) {
  useEffect(() => {
    const handleKeyDown = e => {
      if (e.code === 'Escape') {
        onClose();
      } else if (e.code === 'ArrowRight') {
        nextImage();
      } else if (e.code === 'ArrowLeft') {
        prevImage();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose, nextImage, prevImage]);

  const handleClickBackdrop = e => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };
  return createPortal(
    <div className={s.Overlay} onClick={handleClickBackdrop}>
      <div className={s.Modal}>{children}</div>
    </div>,
    modalRoot,
  );
}

Modal.propTypes = {
  nextImage: PropTypes.func.isRequired,
  prevImage: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
};
