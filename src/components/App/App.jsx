import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import fetchData from '../../services/imagesApi';
import SearchBar from '../SearchBar/SearchBar';
import Loader from 'components/Loader/Loader';
import ImageGallery from '../ImageGallery/ImageGallery';
import Button from '../Button/Button';
import Modal from '../Modal/Modal';
import css from './App.module.css';

export default class App extends React.Component {
  state = {
    page: 1,
    query: '',
    showModal: false,
    largeImageURL: null,
    error: null,
    images: [],
    isLoading: false,
};

  componentDidUpdate(prevProps, prevState) {
    const prevImages = prevState.query;
    const nextImages = this.state.query;
    const { page } = this.state;
    
    if ((prevImages !== nextImages) || (
      prevState.page !== page && page !== 1 )) {
      this.fetchImages();
    }
  };

  fetchImages = () => {
    const { query, page } = this.state;
    const perPage = 12;

    this.setState({ isLoading: true });

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
        this.setState(({ images }) => ({
          images: [...images, ...data],
          total: totalHits,
        }));
      })
      .catch(error => this.setState({ error }))
      .finally(() => this.setState({ isLoading: false }));
  };

  handleSubmit = (query) => {
    if (query === this.state.query) return;
    this.setState({
      images: [],
      query,
      page: 1,
      error: null,
    });
  };

  handleSearch = query => {
    if (query === this.state.query) return;
    this.setState({
      images: [],
      query,
      page: 1,
      error: null,
    });
  };

  loadMore = () => {
    this.setState(({ page }) => ({
      page: page + 1,
      isLoading: true,
      }));
  };

  toggleModal = (largeImageURL) => {
    this.setState(({showModal}) => ({
      showModal: !showModal,
    }));
    this.setState({ largeImageURL: largeImageURL });
  };

  render () {
    const { images, error, isLoading, showModal, largeImageURL, tags, total } = this.state;
    const loadImages = images.length !== 0;
    const isLastPage = images.length === total;
    const loadMoreBtn = loadImages && !isLoading && !isLastPage;
    
    return (
      <div className={css.app}>
        <SearchBar onSubmit={this.handleSearch} />
        {error && toast.error(error.message)}
        {isLoading && <Loader />}
        {loadImages && <ImageGallery onClick={this.toggleModal} images={images} />}
        {loadMoreBtn && <Button onClick={this.loadMore}>Load more</Button>} 
        {showModal && (
        <Modal onClose={this.toggleModal}>
          <img src={largeImageURL} alt={tags} />
        </Modal>
        )}
        <ToastContainer theme="colored" position="top-right" autoClose={3000}/>
      </div>
    );
  };
};