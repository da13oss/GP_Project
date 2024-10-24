import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Home = () => {
    const [trendingMovies, setTrendingMovies] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTrending = async () => {
            try {
                const { data } = await axios.get('http://localhost:5000/api/movies/search?query=marvel');
                setTrendingMovies(data.Search || []);
            } catch (error) {
                console.error('Error fetching trending movies:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchTrending();
    }, []);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-8">Popular Movies</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {trendingMovies.map((movie) => (
                    <Link
                        key={movie.imdbID}
                        to={`/movie/${movie.imdbID}`}
                        className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300"
                    >
                        <img
                            src={movie.Poster}
                            alt={movie.Title}
                            className="w-full h-96 object-cover"
                            onError={(e) => {
                                e.target.src = 'https://via.placeholder.com/300x450?text=No+Poster';
                            }}
                        />
                        <div className="p-4">
                            <h2 className="text-xl font-semibold mb-2">{movie.Title}</h2>
                            <p className="text-gray-600">{movie.Year}</p>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default Home;