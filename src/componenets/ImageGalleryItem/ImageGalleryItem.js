import React from 'react';
import s from './ImageGalleryItem.module.css';
const ImageGalleryItem = ({ webformatURL, tags, onClick}) => {
  return (
    <li className={s.ImageGalleryItem}  onClick={onClick} >
      <img className={s.image} src={webformatURL} alt={tags} />
    </li>
  );
};
export default ImageGalleryItem;
