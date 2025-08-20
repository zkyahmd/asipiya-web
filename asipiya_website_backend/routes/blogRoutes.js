const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const {
  getAllPosts,
  getPostById,
  getPostBySlug,
  createPost,
  updatePost,
  deletePost,
  getCommentsForPost,
  addCommentToPost,
  deleteComment,
  getAllComments,
  getApprovedComments,
  getPendingComments,
  approveComment
} = require('../controllers/blogPostController');

const router = express.Router();

// Ensure the upload directory exists
const uploadDir = path.join(__dirname, '../uploads/blogs');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Multer storage configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1e9)}${ext}`;
    cb(null, uniqueName);
  }
});

// Optional: file filter (to accept only images)
const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|webp|gif/;
  const ext = path.extname(file.originalname).toLowerCase();
  if (allowedTypes.test(ext)) {
    cb(null, true);
  } else {
    cb(new Error('Only image files are allowed!'), false);
  }
};

// Multer upload instance
const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 } // Limit: 5MB
});

// --- Blog Routes ---

// Important: Keep specific routes before dynamic :id to avoid conflicts
router.post('/', upload.single('featured_image'), createPost);       // Create a blog post with image
router.put('/:id', upload.single('featured_image'), updatePost);     // Update post with optional image

router.get('/slug/:slug', getPostBySlug);                            // Get post by slug
router.get('/', getAllPosts);                                        // Get all posts
router.get('/:id', getPostById);                                     // Get post by ID
router.delete('/:id', deletePost);                                   // Delete post

// --- Comment Routes ---
router.get('/:slug/comments', getCommentsForPost);
router.post('/:slug/comments', addCommentToPost);
router.delete('/comments/:commentId', deleteComment);

// Admin-only comment moderation
router.get('/admin/comments/all', getAllComments);
router.get('/admin/comments/approved', getApprovedComments);
router.get('/admin/comments/pending', getPendingComments);
router.patch('/admin/comments/approve/:commentId', approveComment);

module.exports = router;
