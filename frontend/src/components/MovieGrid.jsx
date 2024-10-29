import PropTypes from 'prop-types';
import MovieCard from './MovieCard';

const MovieGrid = ({ movies }) => {
    if (!movies || movies.length === 0) {
        return (
            <div className="text-center text-gray-600 py-8">
                No movies found.
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {movies.map((movie) => (
                <MovieCard
                    key={movie.imdbID}
                    movie={{
                        id: movie.imdbID,
                        title: movie.Title,
                        year: movie.Year,
                        poster: movie.Poster,
                        imdbRating: movie.imdbRating
                    }}
                />
            ))}
        </div>
    );
};

MovieGrid.propTypes = {
    movies: PropTypes.arrayOf(
        PropTypes.shape({
            imdbID: PropTypes.string.isRequired,
            Title: PropTypes.string.isRequired,
            Year: PropTypes.string.isRequired,
            Poster: PropTypes.string,
            imdbRating: PropTypes.string
        })
    ).isRequired
};

export default MovieGrid;