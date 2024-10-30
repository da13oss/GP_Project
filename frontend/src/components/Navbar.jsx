import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FaSearch, FaUser, FaHeart } from 'react-icons/fa';

/**
 * Navigation bar component
 * Provides navigation links and user-related actions
 */
const Navbar = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    /**
     * Handle search icon click
     * Navigates to search page
     */
    const handleSearchClick = () => {
        navigate('/search');
    };

    return (
        <nav className="bg-gray-900 text-white shadow-lg">
            <div className="max-w-7xl mx-auto px-4">
                <div className="flex justify-between items-center h-16">
                    <Link to="/" className="text-xl font-bold">MovieDB</Link>

                    <div className="flex items-center space-x-4">
                        <button
                            onClick={handleSearchClick}
                            className="hover:text-gray-300 focus:outline-none"
                            aria-label="Search movies"
                        >
                            <FaSearch className="text-xl" />
                        </button>

                        {user ? (
                            <>
                                <Link
                                    to="/favorites"
                                    className="hover:text-gray-300"
                                    aria-label="View favorites"
                                >
                                    <FaHeart className="text-xl" />
                                </Link>
                                <Link
                                    to="/profile"
                                    className="hover:text-gray-300"
                                    aria-label="View profile"
                                >
                                    <FaUser className="text-xl" />
                                </Link>
                                <button
                                    onClick={logout}
                                    className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded transition-colors"
                                >
                                    Logout
                                </button>
                            </>
                        ) : (
                            <div className="space-x-2">
                                <Link
                                    to="/login"
                                    className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded transition-colors"
                                >
                                    Login
                                </Link>
                                <Link
                                    to="/register"
                                    className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded transition-colors"
                                >
                                    Register
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;