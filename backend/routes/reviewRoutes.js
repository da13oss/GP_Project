import express from 'express';
import { auth } from '../middleware/auth.js';
import Review from '../models/Review.js';

const router = express.Router();

// Get all reviews for a movie
router.get('/movie/:movieId', async (req, res) => {
    try {
        const reviews = await Review.find({ movieId: req.params.movieId })
            .populate('user', 'username')
            .sort({ createdAt: -1 });
        res.json(reviews);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Get user's review for a movie
router.get('/movie/:movieId/user', auth, async (req, res) => {
    try {
        const review = await Review.findOne({
            movieId: req.params.movieId,
            user: req.userId
        });
        res.json(review);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Create or update review
router.post('/movie/:movieId', auth, async (req, res) => {
    try {
        const { rating, review } = req.body;
        const movieId = req.params.movieId;

        const updatedReview = await Review.findOneAndUpdate(
            { user: req.userId, movieId },
            { rating, review },
            { new: true, upsert: true }
        );

        res.json(updatedReview);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Delete review
router.delete('/movie/:movieId', auth, async (req, res) => {
    try {
        await Review.findOneAndDelete({
            user: req.userId,
            movieId: req.params.movieId
        });
        res.json({ message: 'Review deleted successfully' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

export default router;