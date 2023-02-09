import React, { useState, useEffect }  from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import fetchData from '../../services/imagesApi';
import SearchBar from '../SearchBar/SearchBar';
import Loader from 'components/Loader/Loader';
import ImageGallery from '../ImageGallery/ImageGallery';
import Button from '../Button/Button';
import Modal from '../Modal/Modal';
import css from './App.module.css';

export default function App () {
  const [page, setPage] = useState(1);
  const [query, setQery] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [largeImageURL, setLargeImageURL] = useState(null);
  const [error, setError] = useState(null);
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [total, setTotal] = useState(0);
  const [tags, setTags] = useState('');

useEffect(() => {
  if (!query) return; 
    fetchImages(query, page);
  }, [query, page]);

  const fetchImages = (query, page) => {
  const perPage = 12;
  setIsLoading(true);

  fetchData(query, page, perPage)
    .then(({ hits, totalHits }) => {
      const totalPages = Math.ceil(totalHits / perPage);

      if (hits.length === 0) {
        return toast.error('Sorry, no images found. Please, try again!');
      }

      if (page === totalPages) {
        toast.info("You've reached the end of search results.");
      }

      const data = hits.map(({ id, webformatURL, largeImageURL, tags }) => {
        return {
          id,
          webformatURL,
          largeImageURL,
          tags,
        };
      });

      setImages(images => [...images, ...data]);
        setTotal(totalHits);
    })
    .catch(error => setError(error))
    .finally(() => setIsLoading(false));
};

  const handleSearch = query => {
    setQery(query);
    setImages([]);
    setPage(1);
    setError(null);
  };

  const loadMore = () => {
    setPage(page => page + 1);
    setIsLoading(true);
  };

  const toggleModal = (largeImageURL, tags) => {
    setShowModal(!showModal);
    setLargeImageURL(largeImageURL);
    setTags(tags);
  };

  const loadImages = images.length !== 0;
  const isLastPage = images.length === total;
  const loadMoreBtn = loadImages && !isLoading && !isLastPage;
    
  return (
      <div className={css.app}>
        <SearchBar onSubmit={handleSearch} />
        {error && toast.error(error.message)}
        {isLoading && <Loader />}
        {loadImages && <ImageGallery onClick={toggleModal} images={images} />}
        {loadMoreBtn && <Button onClick={loadMore}>Load more</Button>} 
        {showModal && (
        <Modal onClose={toggleModal}>
          <img src={largeImageURL} alt={tags} />
        </Modal>
        )}
        <ToastContainer theme="colored" position="top-right" autoClose={3000}/>
      </div>
    );
  };