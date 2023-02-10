import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import { ImSearch } from "react-icons/im";
import css from './SearchBar.module.css';

export default function SearchBar ({ onSubmit }) {
    const [query, setQuery] = useState('');
    
    const handleChange = event => {
        setQuery(event.currentTarget.value.toLowerCase());
    };

    const handleSubmit = event => {
        event.preventDefault();
        // event.target.reset();

        if (query.trim() === '') {
            return toast.info('Please, specify your search query.');
        }
        onSubmit(query);
        // reset();
    };

    // const reset = () => {
    //     setQuery('');
    // };

    return (
            <header className={css.searchbar}>
                <form onSubmit={handleSubmit}
                    className={css.searchForm}>
                    <button className={css.searchFormBtn}
                            type="submit">
                                <ImSearch style={{ width: 20, height: 20 }}
                                />
                    </button>
                    <input onChange={handleChange}
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

SearchBar.propTypes = {
    onSubmit: PropTypes.func.isRequired,
};
