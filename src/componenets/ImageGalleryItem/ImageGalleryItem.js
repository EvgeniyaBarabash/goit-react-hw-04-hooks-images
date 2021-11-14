import React from 'react';
import s from './ImageGalleryItem.module.css';
import PropTypes from 'prop-types';
const ImageGalleryItem = ({ webformatURL, tags, onClick }) => {
  return (
    <li className={s.ImageGalleryItem} onClick={onClick}>
      <img className={s.image} src={webformatURL} alt={tags} />
    </li>
  );
};
ImageGalleryItem.propTypes = {
  webformatURL: PropTypes.string.isRequired,
  tags: PropTypes.string,
  onClick: PropTypes.func.isRequired,
};
export default ImageGalleryItem;
