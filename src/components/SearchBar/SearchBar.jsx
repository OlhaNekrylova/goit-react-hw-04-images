import React from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import { ImSearch } from "react-icons/im";
import css from './SearchBar.module.css';

export default class SearchBar extends React.Component {
    static propTypes = {
        onSubmit: PropTypes.func.isRequired,
    };

    state = {
        query: '',
    };
    
    handleChange = event => {
        // console.log(event);
        // console.log(event.currentTarget);
        // console.log(event.currentTarget.value);
        this.setState({query: event.currentTarget.value.toLowerCase()});
    };

    handleSubmit = event => {
        event.preventDefault();
        // console.log(event);
        // console.log(event.target);
        // console.log(event.target.elements);
        // console.log( event.target.elements.query);
        // console.log(event.target.elements.query.value);
        event.target.reset();

        if (this.state.query.trim() === '') {
            return toast.info('Please, specify your search query.');
        }
        this.props.onSubmit(this.state.query);
        this.reset();
    };

    reset = () => {
        this.setState({ query: '' });
    };

    render () {
        const { query } = this.state;

        return (
            <header className={css.searchbar}>
                <form onSubmit={this.handleSubmit}
                    className={css.searchForm}>
                    <button className={css.searchFormBtn}
                            type="submit">
                                <ImSearch style={{ width: 20, height: 20 }}
                                />
                    </button>
                    <input onChange={this.handleChange}
                        className={css.searchFormInput}
                        type="text"
                        autoComplete="off"
                        autoFocus
                        placeholder="Search images and photos"
                        name="query"
                        value={query}
                    />
                </form>
            </header>
        );
    };

}