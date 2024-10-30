import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            fetchUser();
        } else {
            setLoading(false);
        }
    }, []);

    const fetchUser = async () => {
        try {
            const { data } = await axios.get('/api/users/profile');
            setUser(data);
        } catch (error) {
            localStorage.removeItem('token');
            delete axios.defaults.headers.common['Authorization'];
        } finally {
            setLoading(false);
        }
    };

    const login = async (credentials) => {
        const { data } = await axios.post('/api/users/login', credentials);
        localStorage.setItem('token', data.token);
        axios.defaults.headers.common['Authorization'] = `Bearer ${data.token}`;
        setUser(data.user);
        return data;
    };

    const register = async (userData) => {
        const { data } = await axios.post('/api/users/register', userData);
        localStorage.setItem('token', data.token);
        axios.defaults.headers.common['Authorization'] = `Bearer ${data.token}`;
        setUser(data.user);
        return data;
    };

    const logout = () => {
        localStorage.removeItem('token');
        delete axios.defaults.headers.common['Authorization'];
        setUser(null);
    };

    // New methods for handling favorites
    const addFavorite = async (movie) => {
        try {
            const { data } = await axios.post('/api/movies/favorites', {
                imdbID: movie.imdbID,
                title: movie.Title,
                poster: movie.Poster,
                year: movie.Year
            });

            // Update user state with new favorites
            setUser(prev => ({
                ...prev,
                favorites: data
            }));

            return true;
        } catch (error) {
            throw error;
        }
    };

    const removeFavorite = async (movieId) => {
        try {
            const { data } = await axios.delete(`/api/movies/favorites/${movieId}`);

            // Update user state with new favorites
            setUser(prev => ({
                ...prev,
                favorites: data
            }));

            return true;
        } catch (error) {
            throw error;
        }
    };

    const isFavorite = (movieId) => {
        return user?.favorites?.some(f => f.imdbID === movieId) || false;
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                login,
                register,
                logout,
                loading,
                addFavorite,
                removeFavorite,
                isFavorite
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);