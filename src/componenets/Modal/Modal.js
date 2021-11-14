import { Component } from 'react';
import s from './Modal.module.css';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
const modalRoot = document.querySelector('#modal-root');

class Modal extends Component {
  static propTypes = {
    nextImage: PropTypes.func.isRequired,
    prevImage: PropTypes.func.isRequired,
  };
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }
  handleKeyDown = e => {
    if (e.code === 'Escape') {
      this.props.onClose();
    } else if (e.code === 'ArrowRight') {
      this.props.nextImage();
    } else if (e.code === 'ArrowLeft') {
      this.props.prevImage();
    }
  };
  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }
  handleClickBackdrop = e => {
    if (e.target === e.currentTarget) {
      this.props.onClose();
    }
  };
  render() {
    return createPortal(
      <div className={s.Overlay} onClick={this.handleClickBackdrop}>
        <div className={s.Modal}>{this.props.children}</div>
      </div>,
      modalRoot,
    );
  }
}
export default Modal;
