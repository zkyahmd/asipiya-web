const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');

// Signup route
router.post('/signup', adminController.registerAdmin);

// Signin route
router.post('/signin', adminController.loginAdmin);

module.exports = router;