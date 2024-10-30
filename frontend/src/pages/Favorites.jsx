import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FaTrash } from 'react-icons/fa';
import LoadingSpinner from '../components/LoadingSpinner';

const Favorites = () => {
    const { user, loading, removeFavorite } = useAuth();
    const [error, setError] = useState(null);
    const [removingId, setRemovingId] = useState(null);

    const handleRemove = async (movieId) => {
        try {
            setError(null);
            setRemovingId(movieId);
            await removeFavorite(movieId);
        } catch (err) {
            setError('Failed to remove movie from favorites');
            console.error('Error removing from favorites:', err);
        } finally {
            setRemovingId(null);
        }
    };

    if (loading) {
        return <LoadingSpinner />;
    }

    if (!user?.favorites?.length) {
        return (
            <div className="container mx-auto px-4 py-8">
                <div className="text-center">
                    <h1 className="text-2xl font-bold mb-4">My Favorites</h1>
                    <p className="text-gray-600">You haven't added any movies to your favorites yet.</p>
                    <Link to="/" className="text-indigo-600 hover:text-indigo-700 mt-4 inline-block">
                        Browse Movies
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-2xl font-bold mb-8">My Favorites</h1>

            {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                    {error}
                </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {user.favorites.map((movie) => (
                    <div
                        key={movie.imdbID}
                        className="bg-white rounded-lg shadow-md overflow-hidden relative group"
                    >
                        <Link to={`/movie/${movie.imdbID}`}>
                            <img
                                src={movie.poster !== 'N/A' ? movie.poster : 'https://via.placeholder.com/300x450?text=No+Poster'}
                                alt={movie.title}
                                className="w-full h-96 object-cover"
                                onError={(e) => {
                                    e.target.src = 'https://via.placeholder.com/300x450?text=No+Poster';
                                }}
                            />
                        </Link>
                        <div className="p-4">
                            <h2 className="text-xl font-semibold mb-2">{movie.title}</h2>
                            <p className="text-gray-600">{movie.year}</p>
                        </div>
                        <button
                            onClick={() => handleRemove(movie.imdbID)}
                            disabled={removingId === movie.imdbID}
                            className={`absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full 
                opacity-0 group-hover:opacity-100 transition-opacity duration-200
                hover:bg-red-600 ${removingId === movie.imdbID ? 'cursor-not-allowed opacity-50' : ''}`}
                            aria-label="Remove from favorites"
                        >
                            <FaTrash />
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Favorites;