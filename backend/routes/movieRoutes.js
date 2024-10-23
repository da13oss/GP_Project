const express = require('express');
const axios = require('axios');
const auth = require('../middleware/auth');
const User = require('../models/User');

const router = express.Router();

const OMDB_API_KEY = '6df4a547';
const OMDB_API_URL = 'http://www.omdbapi.com/';

router.get('/search', async (req, res) => {
    try {
        const { query } = req.query;
        const response = await axios.get(`${OMDB_API_URL}?apikey=${OMDB_API_KEY}&s=${query}`);
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching movies', error: error.message });
    }
});

router.get('/detail/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const response = await axios.get(`${OMDB_API_URL}?apikey=${OMDB_API_KEY}&i=${id}`);
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching movie details', error: error.message });
    }
});

router.post('/favorite', auth, async (req, res) => {
    try {
        const { movieId } = req.body;
        const user = await User.findById(req.user.id);
        if (!user.favorites.includes(movieId)) {
            user.favorites.push(movieId);
            await user.save();
        }
        res.json({ message: 'Movie added to favorites' });
    } catch (error) {
        res.status(500).json({ message: 'Error adding favorite', error: error.message });
    }
});

router.delete('/favorite/:id', auth, async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findById(req.user.id);
        user.favorites = user.favorites.filter(favId => favId !== id);
        await user.save();
        res.json({ message: 'Movie removed from favorites' });
    } catch (error) {
        res.status(500).json({ message: 'Error removing favorite', error: error.message });
    }
});

router.get('/favorites', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        const favorites = await Promise.all(user.favorites.map(async (movieId) => {
            const response = await axios.get(`${OMDB_API_URL}?apikey=${OMDB_API_KEY}&i=${movieId}`);
            return response.data;
        }));
        res.json(favorites);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching favorites', error: error.message });
    }
});

module.exports = router;