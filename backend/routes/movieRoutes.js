import express from 'express';
import axios from 'axios';
import { auth } from '../middleware/auth.js';
import User from '../models/User.js';

const router = express.Router();

// Create an axios instance for OMDB API
const omdbAPI = axios.create({
    baseURL: 'http://www.omdbapi.com'
});

// Helper function to add API key to requests
const addApiKey = (params = {}) => ({
    ...params,
    apikey: process.env.OMDB_API_KEY || '6df4a547'
});

// Fetch trending movies from OMDB API
router.get('/trending', async (req, res) => {
    try {
        const popularMovies = [
            'tt0111161', // The Shawshank Redemption
            'tt0068646', // The Godfather
            'tt0071562', // The Godfather: Part II
            'tt0468569', // The Dark Knight
            'tt0050083', // 12 Angry Men
        ];

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

// Search movies using OMDB API
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

// Get detailed movie information by ID
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

// Add movie to user's favorites
router.post('/favorites', auth, async (req, res) => {
    try {
        const { imdbID, title, poster, year } = req.body;
        const user = await User.findById(req.userId);

        if (user.favorites.some(f => f.imdbID === imdbID)) {
            return res.status(400).json({ message: 'Movie already in favorites' });
        }

        user.favorites.push({ imdbID, title, poster, year });
        await user.save();

        res.json(user.favorites);
    } catch (error) {
        console.error('Error adding to favorites:', error);
        res.status(500).json({ message: 'Error adding to favorites' });
    }
});

// Remove movie from user's favorites
router.delete('/favorites/:id', auth, async (req, res) => {
    try {
        const user = await User.findById(req.userId);
        user.favorites = user.favorites.filter(f => f.imdbID !== req.params.id);
        await user.save();
        res.json(user.favorites);
    } catch (error) {
        console.error('Error removing from favorites:', error);
        res.status(500).json({ message: 'Error removing from favorites' });
    }
});

// Get user's favorites
router.get('/favorites', auth, async (req, res) => {
    try {
        const user = await User.findById(req.userId);
        res.json(user.favorites);
    } catch (error) {
        console.error('Error fetching favorites:', error);
        res.status(500).json({ message: 'Error fetching favorites' });
    }
});

export default router;