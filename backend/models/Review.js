import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    movieId: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5
    },
    review: {
        type: String,
        required: true,
        trim: true,
        maxLength: 1000
    }
}, {
    timestamps: true
});

// Compound index to ensure one review per user per movie
reviewSchema.index({ user: 1, movieId: 1 }, { unique: true });

export default mongoose.model('Review', reviewSchema);