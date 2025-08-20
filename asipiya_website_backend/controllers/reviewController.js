const dbPromise = require('../models/db');

// Create a new review
exports.createReview = async (req, res) => {
  try {
    const connection = await dbPromise;
    const { CompanyName, ReviwerName, ReviwerPosition, ReviewMessage } = req.body;

    await connection.query(
      'INSERT INTO client_review (CompanyName, ReviwerName, ReviwerPosition, ReviewMessage) VALUES (?, ?, ?, ?)',
      [CompanyName, ReviwerName, ReviwerPosition, ReviewMessage]
    );

    res.status(201).json({ message: 'Review added successfully' });
  } catch (err) {
    console.error('Error adding review:', err);
    res.status(500).json({ message: err.message });
  }
};

// Get all reviews
exports.getReviews = async (req, res) => {
  try {
    const connection = await dbPromise;
    const [rows] = await connection.query('SELECT * FROM client_review');
    res.json(rows);
  } catch (err) {
    console.error('Error fetching reviews:', err);
    res.status(500).json({ message: err.message });
  }
};

// Get a single review by ID
exports.getReviewById = async (req, res) => {
  try {
    const connection = await dbPromise;
    const id = req.params.id;
    
    const [rows] = await connection.query('SELECT * FROM client_review WHERE ReviewId = ?', [id]);
    
    if (rows.length === 0) {
      return res.status(404).json({ message: 'Review not found' });
    }
    
    res.json(rows[0]);
  } catch (err) {
    console.error('Error fetching review:', err);
    res.status(500).json({ message: err.message });
  }
};

// Update a review
exports.updateReview = async (req, res) => {
  try {
    const connection = await dbPromise;
    const id = req.params.id;
    const { CompanyName, ReviwerName, ReviwerPosition, ReviewMessage } = req.body;
    
    const [result] = await connection.query(
      'UPDATE client_review SET CompanyName = ?, ReviwerName = ?, ReviwerPosition = ?, ReviewMessage = ? WHERE ReviewId = ?',
      [CompanyName, ReviwerName, ReviwerPosition, ReviewMessage, id]
    );
    
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Review not found' });
    }
    
    res.json({ message: 'Review updated successfully' });
  } catch (err) {
    console.error('Error updating review:', err);
    res.status(500).json({ message: err.message });
  }
};

// Delete a review
exports.deleteReview = async (req, res) => {
  try {
    const connection = await dbPromise;
    const id = req.params.id;
    
    const [result] = await connection.query('DELETE FROM client_review WHERE ReviewId = ?', [id]);
    
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Review not found' });
    }
    
    res.json({ message: 'Review deleted successfully' });
  } catch (err) {
    console.error('Error deleting review:', err);
    res.status(500).json({ message: err.message });
  }
};