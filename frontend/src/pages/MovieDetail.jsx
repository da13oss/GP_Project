import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import ReviewForm from '../components/ReviewForm';
import ReviewList from '../components/ReviewList';
import LoadingSpinner from '../components/LoadingSpinner';

/**
 * MovieDetail component displays detailed information about a specific movie
 * Including plot, ratings, cast, and user reviews
 */
const MovieDetail = () => {
    // Get movie ID from URL parameters
    const { id } = useParams();

    // Get authentication context and favorite-related functions
    const { user, addFavorite, removeFavorite, isFavorite } = useAuth();

    // Component state
    const [movie, setMovie] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [favoriteLoading, setFavoriteLoading] = useState(false);
    const [reviewsKey, setReviewsKey] = useState(0); // Add reviewsKey state for forcing review list updates

    /**
     * Fetch movie details from the API
     */
    useEffect(() => {
        const fetchMovieDetails = async () => {
            try {
                setLoading(true);
                setError(null);

                const { data } = await axios.get(`/api/movies/detail/${id}`);
                setMovie(data);
            } catch (err) {
                console.error('Error fetching movie:', err);
                setError('Failed to load movie details');
            } finally {
                setLoading(false);
            }
        };

        fetchMovieDetails();
    }, [id]);

    /**
     * Handle adding/removing movie from favorites
     */
    const handleFavorite = async () => {
        if (!user) {
            setError('Please log in to add favorites');
            return;
        }

        try {
            setFavoriteLoading(true);
            setError(null);

            if (isFavorite(id)) {
                await removeFavorite(id);
            } else {
                await addFavorite(movie);
            }
        } catch (err) {
            console.error('Error updating favorites:', err);
            setError(err.response?.data?.message || 'Failed to update favorites');
        } finally {
            setFavoriteLoading(false);
        }
    };

    /**
     * Handle successful review submission
     * Forces review list to refresh by updating its key
     */
    const handleReviewSubmitted = () => {
        setReviewsKey(prev => prev + 1);
    };

    // Show loading spinner while fetching data
    if (loading) {
        return <LoadingSpinner />;
    }

    // Show error message if something went wrong
    if (error) {
        return (
            <div className="container mx-auto px-4 py-8">
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                    {error}
                </div>
            </div>
        );
    }

    // Show message if movie not found
    if (!movie) {
        return (
            <div className="container mx-auto px-4 py-8">
                <div className="text-center">Movie not found</div>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-8">
                <div className="md:flex">
                    {/* Movie Poster */}
                    <div className="md:flex-shrink-0">
                        <img
                            src={movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/300x450?text=No+Poster'}
                            alt={movie.Title}
                            className="h-96 w-full object-cover md:w-96"
                            onError={(e) => {
                                e.target.src = 'https://via.placeholder.com/300x450?text=No+Poster';
                            }}
                        />
                    </div>

                    {/* Movie Details */}
                    <div className="p-8">
                        <div className="flex justify-between items-start">
                            <h1 className="text-3xl font-bold text-gray-900">{movie.Title}</h1>
                            {user && (
                                <button
                                    onClick={handleFavorite}
                                    disabled={favoriteLoading}
                                    className={`text-2xl text-red-500 hover:text-red-600 transition-colors ${favoriteLoading ? 'opacity-50 cursor-not-allowed' : ''
                                        }`}
                                    aria-label={isFavorite(id) ? 'Remove from favorites' : 'Add to favorites'}
                                >
                                    {isFavorite(id) ? <FaHeart /> : <FaRegHeart />}
                                </button>
                            )}
                        </div>

                        <div className="mt-2 text-gray-600">
                            <p className="text-sm">
                                {movie.Year} • {movie.Runtime} • {movie.Rated}
                            </p>
                        </div>

                        <div className="mt-4">
                            <p className="text-gray-700">{movie.Plot}</p>
                        </div>

                        <div className="mt-6 grid grid-cols-2 gap-4">
                            <div>
                                <h3 className="text-gray-600 text-sm">Director</h3>
                                <p className="text-gray-900">{movie.Director}</p>
                            </div>
                            <div>
                                <h3 className="text-gray-600 text-sm">Cast</h3>
                                <p className="text-gray-900">{movie.Actors}</p>
                            </div>
                            <div>
                                <h3 className="text-gray-600 text-sm">Genre</h3>
                                <p className="text-gray-900">{movie.Genre}</p>
                            </div>
                            <div>
                                <h3 className="text-gray-600 text-sm">IMDb Rating</h3>
                                <p className="text-gray-900">{movie.imdbRating}/10</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Reviews Section */}
            <div className="space-y-8">
                <div>
                    <h2 className="text-2xl font-bold mb-4">Reviews</h2>
                    <ReviewForm movieId={id} onReviewSubmitted={handleReviewSubmitted} />
                </div>

                <div>
                    <h3 className="text-xl font-semibold mb-4">All Reviews</h3>
                    <ReviewList key={reviewsKey} movieId={id} />
                </div>
            </div>
        </div>
    );
};

export default MovieDetail;