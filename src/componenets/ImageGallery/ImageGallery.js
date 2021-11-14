import { Component } from 'react';
import s from './ImageGallary.module.css';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';
import Modal from 'componenets/Modal/Modal';
import PropTypes from 'prop-types';
class ImageGallery extends Component {
  static propTypes = {
    images: PropTypes.arrayOf(
      PropTypes.shape({
        largeImageURL: PropTypes.string.isRequired,
        id: PropTypes.number.isRequired,
        webformatURL: PropTypes.string.isRequired,
        tags: PropTypes.string.isRequired,
      }),
    ),
  };
  state = {
    showModal: false,
    imgIndex: null,
  };
  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };
  handleClick = imgIndex => {
    this.setState({ imgIndex, showModal: true });
  };
  nextImage = () => {
    this.setState(({ imgIndex }) => {
      const imageLength = this.props.images.length;
      return { imgIndex: imgIndex < imageLength - 1 ? (imgIndex += 1) : 0 };
    });
  };
  prevImage = () => {
    this.setState(({ imgIndex }) => {
      const imageLength = this.props.images.length;
      return { imgIndex: imgIndex > 0 ? (imgIndex -= 1) : imageLength - 1 };
    });
  };
  render() {
    const { showModal, imgIndex } = this.state;
    const { images } = this.props;
    return (
      <ul className={s.ImageGallery}>
        {images.map(({ id, webformatURL, tags }, imgIndex) => (
          <ImageGalleryItem
            key={id}
            webformatURL={webformatURL}
            tags={tags}
            onClick={() => this.handleClick(imgIndex)}
          />
        ))}
        {showModal && (
          <Modal
            onClose={this.toggleModal}
            nextImage={this.nextImage}
            prevImage={this.prevImage}
          >
            <img
              src={images[imgIndex].largeImageURL}
              alt={images[imgIndex].tags}
            />
          </Modal>
        )}
      </ul>
    );
  }
}
export default ImageGallery;

