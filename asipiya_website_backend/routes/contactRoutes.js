const express = require('express');
const router = express.Router();
const {
  submitContactForm,
  getAllContactSubmissions,
  getContactSubmissionById,
  deleteContactSubmission,
  updateContactSubmissionStatus
} = require('../controllers/contactController');

// POST /api/contact - Submit contact form
router.post('/', submitContactForm);

// GET /api/contact - Get all contact submissions (for admin)
router.get('/', getAllContactSubmissions);

// GET /api/contact/:id - Get specific contact submission
router.get('/:id', getContactSubmissionById);

// DELETE /api/contact/:id - Delete contact submission
router.delete('/:id', deleteContactSubmission);

// PUT /api/contact/:id/status - Update contact submission status
router.put('/:id/status', updateContactSubmissionStatus);

module.exports = router;
