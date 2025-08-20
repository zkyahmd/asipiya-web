const express = require('express');
const multer = require('multer');
const { createLogo, getLogos, deleteLogo, updateLogo } = require('../controllers/logoController');
const path = require('path');

const router = express.Router();

// Set storage destination to the frontend assets folder
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, '../asipiya_website_frontend/src/assets/ClientLogo');
  },
  filename: function (req, file, cb) {
    // Create a unique filename with timestamp
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const extension = path.extname(file.originalname);
    cb(null, uniqueSuffix + extension);
  },
});

// File filter to accept only images
const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('Only image files are allowed!'), false);
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit
  }
});

// Routes
router.post('/', upload.single('logo'), createLogo);
router.get('/', getLogos);
router.delete('/:id', deleteLogo);
router.put('/:id', upload.single('logo'), updateLogo);

module.exports = router;
