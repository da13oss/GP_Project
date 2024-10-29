import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import MovieGrid from '../components/MovieGrid';
import SearchBar from '../components/SearchBar';
import ErrorMessage from '../components/ErrorMessage';
import LoadingSpinner from '../components/LoadingSpinner';

const Home = () => {
    const [movies, setMovies] = useState([]);
    const [searchResults, setSearchResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Fetch trending movies from our backend API
    const fetchTrending = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);
            const response = await axios.get('/api/movies/trending');
            setMovies(response.data);
            setSearchResults([]);
        } catch (err) {
            setError('Failed to fetch trending movies');
            console.error('Error:', err.message);
        } finally {
            setLoading(false);
        }
    }, []);

    // Handle search functionality through our backend API
    const handleSearch = useCallback(async (query) => {
        if (!query.trim()) {
            setSearchResults([]);
            fetchTrending();
            return;
        }

        try {
            setLoading(true);
            setError(null);
            const response = await axios.get('/api/movies/search', {
                params: { query: query.trim() }
            });

            if (response.data.Search && response.data.Search.length > 0) {
                setSearchResults(response.data.Search);
            } else {
                setSearchResults([]);
                setError('No movies found for your search');
            }
        } catch (err) {
            setError('Search failed. Please try again.');
            console.error('Search error:', err.message);
        } finally {
            setLoading(false);
        }
    }, []);

    // Load trending movies on component mount
    useEffect(() => {
        fetchTrending();
    }, [fetchTrending]);

    return (
        <div className="container mx-auto px-4 py-8">
            <SearchBar onSearch={handleSearch} />

            {error && <ErrorMessage message={error} />}

            {loading ? (
                <LoadingSpinner />
            ) : (
                <MovieGrid movies={searchResults.length > 0 ? searchResults : movies} />
            )}
        </div>
    );
};

export default Home;