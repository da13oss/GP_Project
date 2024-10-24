import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FaTrash } from 'react-icons/fa';
import axios from 'axios';

const Favorites = () => {
    const { user } = useAuth();
    const [favorites, setFavorites] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (user) {
            setFavorites(user.favorites || []);
            setLoading(false);
        }
    }, [user]);

    const handleRemove = async (movieId) => {
        try {
            await axios.delete(`/api/movies/favorites/${movieId}`);
            setFavorites(favorites.filter(movie => movie.imdbID !== movieId));
        } catch (error) {
            console.error('Error removing from favorites:', error);
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
            </div>
        );
    }

    if (favorites.length === 0) {
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
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {favorites.map((movie) => (
                    <div
                        key={movie.imdbID}
                        className="bg-white rounded-lg shadow-md overflow-hidden relative group"
                    >
                        <Link to={`/movie/${movie.imdbID}`}>
                            <img
                                src={movie.poster}
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
                            className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200"
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