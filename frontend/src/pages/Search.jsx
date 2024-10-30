import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';
import MovieGrid from '../components/MovieGrid';
import SearchBar from '../components/SearchBar';
import LoadingSpinner from '../components/LoadingSpinner';

/**
 * Search page component that handles movie search functionality
 * Uses URL search parameters to maintain search state
 */
const Search = () => {
    // State management
    const [searchParams, setSearchParams] = useSearchParams();
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Get initial query from URL params
    const initialQuery = searchParams.get('q') || '';

    /**
     * Handles the search submission
     * @param {string} query - The search query
     */
    const handleSearch = async (query) => {
        try {
            // Update URL with search query
            setSearchParams({ q: query });

            if (!query.trim()) {
                setMovies([]);
                return;
            }

            setLoading(true);
            setError(null);

            const response = await axios.get('/api/movies/search', {
                params: { query }
            });

            if (response.data.Search) {
                setMovies(response.data.Search);
            } else {
                setMovies([]);
            }
        } catch (err) {
            console.error('Search error:', err);
            setError('Failed to search movies. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    // Perform initial search if query exists in URL
    useEffect(() => {
        if (initialQuery) {
            handleSearch(initialQuery);
        }
    }, [initialQuery]);

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-8">Search Movies</h1>

            <SearchBar
                onSearch={handleSearch}
                initialQuery={initialQuery}
            />

            {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                    {error}
                </div>
            )}

            {loading ? (
                <LoadingSpinner />
            ) : (
                <MovieGrid movies={movies} />
            )}
        </div>
    );
};

export default Search;