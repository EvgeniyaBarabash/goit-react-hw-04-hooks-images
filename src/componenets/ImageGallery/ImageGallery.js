import { Component } from 'react';
import s from './ImageGallary.module.css';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';
class ImageGallery extends Component {
  render() {
    return (
      <ul className={s.ImageGallery}>
        {this.props.images.map(({ id, webformatURL, tags }) => (
          <ImageGalleryItem key={id} webformatURL={webformatURL} tags={tags} />
        ))}
      </ul>
    );
  }
}
export default ImageGallery;
