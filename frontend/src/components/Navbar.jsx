import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FaSearch, FaUser, FaHeart } from 'react-icons/fa';

const Navbar = () => {
    const { user, logout } = useAuth();

    return (
        <nav className="bg-gray-900 text-white shadow-lg">
            <div className="max-w-7xl mx-auto px-4">
                <div className="flex justify-between items-center h-16">
                    <Link to="/" className="text-xl font-bold">MovieDB</Link>

                    <div className="flex items-center space-x-4">
                        <Link to="/search" className="hover:text-gray-300">
                            <FaSearch className="text-xl" />
                        </Link>

                        {user ? (
                            <>
                                <Link to="/favorites" className="hover:text-gray-300">
                                    <FaHeart className="text-xl" />
                                </Link>
                                <Link to="/profile" className="hover:text-gray-300">
                                    <FaUser className="text-xl" />
                                </Link>
                                <button
                                    onClick={logout}
                                    className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded"
                                >
                                    Logout
                                </button>
                            </>
                        ) : (
                            <div className="space-x-2">
                                <Link
                                    to="/login"
                                    className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded"
                                >
                                    Login
                                </Link>
                                <Link
                                    to="/register"
                                    className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded"
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