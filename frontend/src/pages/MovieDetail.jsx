import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import ReviewForm from '../components/ReviewForm';
import ReviewList from '../components/ReviewList';

const MovieDetail = () => {
    const { id } = useParams();
    const { user } = useAuth();
    const [movie, setMovie] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isFavorite, setIsFavorite] = useState(false);
    const [reviewsKey, setReviewsKey] = useState(0);

    useEffect(() => {
        const fetchMovie = async () => {
            try {
                const { data } = await axios.get(`/api/movies/detail/${id}`);
                setMovie(data);
                if (user) {
                    setIsFavorite(user.favorites?.some(f => f.imdbID === id));
                }
            } catch (error) {
                console.error('Error fetching movie:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchMovie();
    }, [id, user]);

    const handleFavorite = async () => {
        try {
            if (isFavorite) {
                await axios.delete(`/api/movies/favorites/${id}`);
            } else {
                await axios.post('/api/movies/favorites', {
                    imdbID: movie.imdbID,
                    title: movie.Title,
                    poster: movie.Poster,
                    year: movie.Year,
                });
            }
            setIsFavorite(!isFavorite);
        } catch (error) {
            console.error('Error updating favorites:', error);
        }
    };

    const handleReviewSubmitted = () => {
        // Force review list to refresh
        setReviewsKey(prev => prev + 1);
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-8">
                <div className="md:flex">
                    <div className="md:flex-shrink-0">
                        <img
                            src={movie.Poster}
                            alt={movie.Title}
                            className="h-96 w-full object-cover md:w-96"
                            onError={(e) => {
                                e.target.src = 'https://via.placeholder.com/300x450?text=No+Poster';
                            }}
                        />
                    </div>
                    <div className="p-8">
                        <div className="flex justify-between items-start">
                            <h1 className="text-3xl font-bold text-gray-900">{movie.Title}</h1>
                            {user && (
                                <button
                                    onClick={handleFavorite}
                                    className="text-2xl text-red-500 hover:text-red-600"
                                >
                                    {isFavorite ? <FaHeart /> : <FaRegHeart />}
                                </button>
                            )}
                        </div>
                        <div className="mt-2 text-gray-600">
                            <p className="text-sm">{movie.Year} • {movie.Runtime} • {movie.Rated}</p>
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