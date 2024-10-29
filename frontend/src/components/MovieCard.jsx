import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const MovieCard = ({ movie }) => {
    const defaultPoster = 'https://via.placeholder.com/300x450?text=No+Poster';

    return (
        <Link to={`/movie/${movie.id}`} className="block">
            <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-105">
                <div className="aspect-[2/3] relative">
                    <img
                        src={movie.poster === 'N/A' ? defaultPoster : movie.poster}
                        alt={movie.title}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = defaultPoster;
                        }}
                    />
                </div>
                <div className="p-4">
                    <h3 className="text-lg font-semibold text-gray-800 truncate">
                        {movie.title}
                    </h3>
                    <p className="text-sm text-gray-600">{movie.year}</p>
                    {movie.imdbRating && (
                        <div className="mt-2 flex items-center">
                            <span className="text-yellow-500">★</span>
                            <span className="ml-1">{movie.imdbRating}</span>
                        </div>
                    )}
                </div>
            </div>
        </Link>
    );
};

MovieCard.propTypes = {
    movie: PropTypes.shape({
        id: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        year: PropTypes.string.isRequired,
        poster: PropTypes.string,
        imdbRating: PropTypes.string
    }).isRequired
};

export default MovieCard;