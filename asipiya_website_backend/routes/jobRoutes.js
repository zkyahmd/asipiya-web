const express = require('express');
const multer = require('multer');
const path = require('path');
const {
  getAllJobs,
  createJob,
  updateJob,
  deleteJob,
  getJobById,
  submitApplication,
  getAllApplications,
  deleteApplication
} = require('../controllers/jobController');

const router = express.Router();

// Configure Multer for CV uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../uploads'));
  },
  filename: (req, file, cb) => {
    cb(null, `cv-${Date.now()}-${file.originalname}`);
  }
});

const upload = multer({ 
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 } // 5MB limit
});

// Existing job routes
router.get('/', getAllJobs);
router.get('/:id', getJobById);
router.post('/', createJob);
router.put('/:id', updateJob);
router.delete('/:id', deleteJob);
router.post('/applications', upload.single('cv'), submitApplication);
router.get('/applications/all', getAllApplications); // For viewing all applications
router.delete('/applications/:id', deleteApplication);


module.exports = router;