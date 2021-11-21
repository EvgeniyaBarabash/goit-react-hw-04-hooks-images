import { useState } from 'react';
import s from './ImageGallary.module.css';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';
import Modal from 'componenets/Modal/Modal';
import PropTypes from 'prop-types';
export default function ImageGallery({ images }) {
  const [showModal, setShowModal] = useState(false);
  const [imgIndex, setImgIndex] = useState(null);
  const toggleModal = () => {
    setShowModal(!showModal);
  };
  const handleClick = index => {
    setImgIndex(index);
    setShowModal(true);
  };
  const nextImage = () => {
    setImgIndex(imgIndex < images.length - 1 ? imgIndex + 1 : 0);
  };
  const prevImage = () => {
    setImgIndex(imgIndex > 0 ? imgIndex - 1 : images.length - 1);
  };
  return (
    <ul className={s.ImageGallery}>
      {images.map(({ id, webformatURL, tags }, imgIndex) => (
        <ImageGalleryItem
          key={id}
          webformatURL={webformatURL}
          tags={tags}
          onClick={() => handleClick(imgIndex)}
        />
      ))}
      {showModal && (
        <Modal
          onClose={toggleModal}
          nextImage={nextImage}
          prevImage={prevImage}
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

ImageGallery.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      largeImageURL: PropTypes.string.isRequired,
      id: PropTypes.number.isRequired,
      webformatURL: PropTypes.string.isRequired,
      tags: PropTypes.string.isRequired,
    }),
  ),
};
