const express = require('express');
const { 
  createReview, 
  getReviews, 
  getReviewById, 
  updateReview, 
  deleteReview 
} = require('../controllers/reviewController');

const router = express.Router();

// Create a new review
router.post('/', createReview);

// Get all reviews
router.get('/', getReviews);

// Get a single review by ID
router.get('/:id', getReviewById);

// Update a review
router.put('/:id', updateReview);

// Delete a review
router.delete('/:id', deleteReview);

module.exports = router;