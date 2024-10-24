import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import { FaStar } from 'react-icons/fa';

const ReviewForm = ({ movieId, onReviewSubmitted }) => {
    const { user } = useAuth();
    const [rating, setRating] = useState(0);
    const [hover, setHover] = useState(0);
    const [review, setReview] = useState('');
    const [message, setMessage] = useState('');
    const [existingReview, setExistingReview] = useState(null);

    useEffect(() => {
        const fetchUserReview = async () => {
            try {
                const { data } = await axios.get(`/api/reviews/movie/${movieId}/user`);
                if (data) {
                    setExistingReview(data);
                    setRating(data.rating);
                    setReview(data.review);
                }
            } catch (error) {
                console.error('Error fetching user review:', error);
            }
        };

        if (user) {
            fetchUserReview();
        }
    }, [movieId, user]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post(`/api/reviews/movie/${movieId}`, {
                rating,
                review
            });
            setMessage('Review submitted successfully!');
            if (onReviewSubmitted) onReviewSubmitted();
        } catch (error) {
            setMessage(error.response?.data?.message || 'Error submitting review');
        }
    };

    const handleDelete = async () => {
        try {
            await axios.delete(`/api/reviews/movie/${movieId}`);
            setRating(0);
            setReview('');
            setExistingReview(null);
            setMessage('Review deleted successfully!');
            if (onReviewSubmitted) onReviewSubmitted();
        } catch (error) {
            setMessage(error.response?.data?.message || 'Error deleting review');
        }
    };

    if (!user) {
        return (
            <div className="text-center py-4">
                Please log in to leave a review.
            </div>
        );
    }

    return (
        <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-xl font-semibold mb-4">
                {existingReview ? 'Edit Your Review' : 'Write a Review'}
            </h3>

            {message && (
                <div className="mb-4 p-3 rounded bg-green-100 text-green-700">
                    {message}
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="flex items-center space-x-2">
                    {[...Array(5)].map((_, index) => {
                        const ratingValue = index + 1;
                        return (
                            <button
                                type="button"
                                key={ratingValue}
                                className={`text-2xl focus:outline-none ${ratingValue <= (hover || rating) ? 'text-yellow-400' : 'text-gray-300'
                                    }`}
                                onClick={() => setRating(ratingValue)}
                                onMouseEnter={() => setHover(ratingValue)}
                                onMouseLeave={() => setHover(0)}
                            >
                                <FaStar />
                            </button>
                        );
                    })}
                </div>

                <textarea
                    value={review}
                    onChange={(e) => setReview(e.target.value)}
                    className="w-full p-2 border rounded-md focus:ring-2 focus:ring-indigo-500"
                    rows="4"
                    placeholder="Share your thoughts about this movie..."
                    required
                />

                <div className="flex justify-between">
                    <button
                        type="submit"
                        className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
                    >
                        {existingReview ? 'Update Review' : 'Submit Review'}
                    </button>

                    {existingReview && (
                        <button
                            type="button"
                            onClick={handleDelete}
                            className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700"
                        >
                            Delete Review
                        </button>
                    )}
                </div>
            </form>
        </div>
    );
};

export default ReviewForm;