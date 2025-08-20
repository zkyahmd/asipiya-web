const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');

const adminRoutes = require('./routes/adminRoutes');
const blogRoutes = require('./routes/blogRoutes');
const applicationRoutes = require('./routes/applicationRoutes');
const jobRoutes = require('./routes/jobRoutes');
const logoRoutes = require('./routes/logoRoutes');
const reviewRoutes = require('./routes/reviewRoutes');
const contactRoutes = require('./routes/contactRoutes');

require('./models/db');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files for React assets and uploads

// Important: use absolute path for static folders to avoid path issues
const logoFolderPath = path.join(__dirname, '../asipiya_website_frontend/src/assets/ClientLogo');
app.use('/assets/ClientLogo', express.static(logoFolderPath));

// Serve uploaded files statically (important for images)
const uploadsFolderPath = path.join(__dirname, 'uploads');
app.use('/uploads', express.static(uploadsFolderPath));

// API Routes
app.use('/api/admin', adminRoutes);
app.use('/api/jobs', jobRoutes);
app.use('/api/applications', applicationRoutes);
app.use('/api/blogs', blogRoutes);
app.use('/api/client-logos', logoRoutes);
app.use('/api/client-reviews', reviewRoutes);
app.use('/api/contact', contactRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
