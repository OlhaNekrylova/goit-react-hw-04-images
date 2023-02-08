import PropTypes from 'prop-types';
import css from './ImageGalleryItem.module.css';

const ImageGalleryItem = ({ 
    webformatURL,
    largeImageURL,
    tags,
    onClick,
    }) => {
    return (
        <li
            onClick={() => {
            onClick(largeImageURL);
        }}
            className={css.galleryItem} >
            <img 
                src={webformatURL} 
                alt={tags} 
                className={css.galleryItemImage}
            />
        </li>
    );
};

ImageGalleryItem.propTypes = {
    webformatURL: PropTypes.string.isRequired,
    largeImageURL: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
};

export default ImageGalleryItem;

