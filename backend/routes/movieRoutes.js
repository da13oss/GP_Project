import express from 'express';
import axios from 'axios';
import { auth } from '../middleware/auth.js';
import User from '../models/User.js';

const router = express.Router();

// Create an axios instance for OMDB API with base configuration
const omdbAPI = axios.create({
    baseURL: 'http://www.omdbapi.com'
});

// Helper function to add API key to requests
const addApiKey = (params = {}) => ({
    ...params,
    apikey: process.env.OMDB_API_KEY || '6df4a547'
});

/**
 * @route GET /api/movies/trending
 * @description Fetch trending movies from OMDB API
 * @access Public
 */
router.get('/trending', async (req, res) => {
    try {
        // List of popular movie IDs
        const popularMovies = [
            'tt0111161', // The Shawshank Redemption
            'tt0068646', // The Godfather
            'tt0071562', // The Godfather: Part II
            'tt0468569', // The Dark Knight
            'tt0050083', // 12 Angry Men
        ];

        // Fetch all movies in parallel
        const movies = await Promise.all(
            popularMovies.map(async (id) => {
                const response = await omdbAPI.get('/', {
                    params: addApiKey({ i: id })
                });
                return response.data;
            })
        );

        res.json(movies);
    } catch (error) {
        console.error('Error fetching trending movies:', error);
        res.status(500).json({ message: 'Error fetching trending movies' });
    }
});

/**
 * @route GET /api/movies/search
 * @description Search movies using OMDB API
 * @access Public
 */
router.get('/search', async (req, res) => {
    try {
        const { query } = req.query;

        if (!query) {
            return res.status(400).json({ message: 'Search query is required' });
        }

        const response = await omdbAPI.get('/', {
            params: addApiKey({
                s: query,
                type: 'movie'
            })
        });

        if (response.data.Response === 'True') {
            res.json(response.data);
        } else {
            res.json({ Search: [] });
        }
    } catch (error) {
        console.error('Error searching movies:', error);
        res.status(500).json({ message: 'Error searching movies' });
    }
});

/**
 * @route GET /api/movies/detail/:id
 * @description Get detailed movie information by ID
 * @access Public
 */
router.get('/detail/:id', async (req, res) => {
    try {
        const { id } = req.params;

        const response = await omdbAPI.get('/', {
            params: addApiKey({
                i: id,
                plot: 'full'
            })
        });

        if (response.data.Response === 'True') {
            res.json(response.data);
        } else {
            res.status(404).json({ message: 'Movie not found' });
        }
    } catch (error) {
        console.error('Error fetching movie details:', error);
        res.status(500).json({ message: 'Error fetching movie details' });
    }
});

/**
 * @route POST /api/movies/favorites
 * @description Add movie to user's favorites
 * @access Private
 */
router.post('/favorites', auth, async (req, res) => {
    try {
        // Validate required fields
        const { imdbID, title, poster, year } = req.body;

        if (!imdbID || !title) {
            return res.status(400).json({
                message: 'Missing required fields: imdbID and title are required'
            });
        }

        // Find user and check if movie is already in favorites
        const user = await User.findById(req.userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const isAlreadyFavorite = user.favorites.some(f => f.imdbID === imdbID);
        if (isAlreadyFavorite) {
            return res.status(400).json({ message: 'Movie already in favorites' });
        }

        // Add to favorites and save
        user.favorites.push({
            imdbID,
            title,
            poster: poster || 'N/A',
            year: year || 'N/A'
        });

        await user.save();
        res.json(user.favorites);
    } catch (error) {
        console.error('Error adding to favorites:', error);
        res.status(500).json({ message: 'Error adding to favorites' });
    }
});

/**
 * @route DELETE /api/movies/favorites/:id
 * @description Remove movie from user's favorites
 * @access Private
 */
router.delete('/favorites/:id', auth, async (req, res) => {
    try {
        const user = await User.findById(req.userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        user.favorites = user.favorites.filter(f => f.imdbID !== req.params.id);
        await user.save();
        res.json(user.favorites);
    } catch (error) {
        console.error('Error removing from favorites:', error);
        res.status(500).json({ message: 'Error removing from favorites' });
    }
});

/**
 * @route GET /api/movies/favorites
 * @description Get user's favorites
 * @access Private
 */
router.get('/favorites', auth, async (req, res) => {
    try {
        const user = await User.findById(req.userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(user.favorites);
    } catch (error) {
        console.error('Error fetching favorites:', error);
        res.status(500).json({ message: 'Error fetching favorites' });
    }
});

export default router;