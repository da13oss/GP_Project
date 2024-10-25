import { Link } from 'react-router-dom';

function MovieCard({ movie }) {
    return (
        <Link to={`/movie/${movie.imdbID}`} className="block">
            <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-105">
                <img
                    src={movie.Poster !== 'N/A' ? movie.Poster : '/placeholder.jpg'}
                    alt={movie.Title}
                    className="w-full h-96 object-cover"
                />
                <div className="p-4">
                    <h2 className="text-xl font-semibold mb-2 truncate">{movie.Title}</h2>
                    <p className="text-gray-600">{movie.Year}</p>
                    <div className="mt-2 flex items-center">
                        <span className="text-yellow-500">★</span>
                        <span className="ml-1">{movie.imdbRating}</span>
                    </div>
                </div>
            </div>
        </Link>
    );
}

export default MovieCard;