import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

/**
 * SearchBar component for movie searches
 * @param {Object} props - Component props
 * @param {Function} props.onSearch - Search callback function
 * @param {string} [props.initialQuery=''] - Initial search query
 */
const SearchBar = ({ onSearch, initialQuery = '' }) => {
    const [query, setQuery] = useState(initialQuery);

    // Update query when initialQuery changes
    useEffect(() => {
        setQuery(initialQuery);
    }, [initialQuery]);

    /**
     * Handle form submission
     * @param {Event} e - Form submit event
     */
    const handleSubmit = (e) => {
        e.preventDefault();
        if (query.trim()) {
            onSearch(query.trim());
        }
    };

    /**
     * Handle input change
     * @param {Event} e - Input change event
     */
    const handleChange = (e) => {
        setQuery(e.target.value);
    };

    return (
        <form onSubmit={handleSubmit} className="mb-8" role="search">
            <div className="flex gap-2">
                <label htmlFor="movie-search" className="sr-only">
                    Search for movies
                </label>
                <input
                    id="movie-search"
                    type="search"
                    value={query}
                    onChange={handleChange}
                    placeholder="Search movies..."
                    className="flex-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    minLength={2}
                    required
                    autoComplete="off"
                    spellCheck="false"
                    aria-label="Search for movies"
                    enterKeyHint="search"
                />
                <button
                    type="submit"
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={query.trim().length < 2}
                    aria-label="Submit search"
                >
                    Search
                </button>
            </div>
        </form>
    );
};

SearchBar.propTypes = {
    onSearch: PropTypes.func.isRequired,
    initialQuery: PropTypes.string
};

export default SearchBar;