const path = require('path');
const dbPromise = require('../models/db');

// Get all posts
const getAllPosts = async (req, res) => {
  try {
    const connection = await dbPromise;
    const [rows] = await connection.query(`
      SELECT 
        bp.*,
        COALESCE((
          SELECT COUNT(*) 
          FROM comments c 
          WHERE c.PostSlug = bp.slug 
          AND c.IsApproved = 1
        ), 0) AS comments
      FROM blog_posts bp
      ORDER BY bp.date_posted DESC
    `);
    res.status(200).json(rows);
  } catch (err) {
    console.error('Error in getAllPosts:', err);
    res.status(500).json({ message: 'Server error while fetching posts', error: err.message });
  }
};

// Get post by ID
const getPostById = async (req, res) => {
  const { id } = req.params;
  try {
    const connection = await dbPromise;
    const [rows] = await connection.query('SELECT * FROM blog_posts WHERE id = ?', [id]);
    if (rows.length === 0) return res.status(404).json({ message: 'Post not found' });
    res.status(200).json(rows[0]);
  } catch (err) {
    console.error('Error fetching post by ID:', err);
    res.status(500).json({ message: 'Server error while fetching post', error: err.message });
  }
};

// Get post by slug
const getPostBySlug = async (req, res) => {
  const { slug } = req.params;
  try {
    const connection = await dbPromise;
    const [rows] = await connection.query('SELECT * FROM blog_posts WHERE slug = ?', [slug]);
    if (rows.length === 0) return res.status(404).json({ message: 'Post not found' });
    res.status(200).json(rows[0]);
  } catch (err) {
    console.error('Error fetching post by SLUG:', err);
    res.status(500).json({ message: 'Server error while fetching post', error: err.message });
  }
};

// Create new post
const createPost = async (req, res) => {
  const { title, slug, excerpt, content, author_name, category_slugs } = req.body;

  if (!title || !content || !author_name) {
    return res.status(400).json({ message: 'Title, content, and author name are required.' });
  }

  const generatedSlug = slug || title.toLowerCase()
    .replace(/[^a-z0-9 -]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');

  const date_posted = new Date().toISOString().slice(0, 19).replace('T', ' ');
  const categorySlugsForDb = Array.isArray(category_slugs) ? category_slugs.join(',') : category_slugs;
  const featured_image_url = req.file ? `/uploads/blogs/${req.file.filename}` : '';

  try {
    const connection = await dbPromise;
    const [result] = await connection.query(
      `INSERT INTO blog_posts 
      (title, slug, excerpt, content, author_name, featured_image_url, category_slugs, date_posted, views, comments)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, 0, 0)`,
      [
        title,
        generatedSlug,
        excerpt,
        content,
        author_name,
        featured_image_url,
        categorySlugsForDb,
        date_posted,
      ]
    );

    const [newPostRows] = await connection.query('SELECT * FROM blog_posts WHERE id = ?', [result.insertId]);
    res.status(201).json({ message: 'Post created successfully', post: newPostRows[0] });
  } catch (err) {
    console.error('Error creating post:', err);
    if (err.code === 'ER_DUP_ENTRY') {
      return res.status(409).json({ message: 'A post with this slug already exists.' });
    }
    res.status(500).json({ message: 'Server error while creating post', error: err.message });
  }
};

// Update post
const updatePost = async (req, res) => {
  const { id } = req.params;
  const { title, slug, excerpt, content, author_name, featured_image_url, category_slugs } = req.body;

  const categorySlugsForDb = Array.isArray(category_slugs) ? category_slugs.join(',') : category_slugs;

  try {
    const connection = await dbPromise;
    const [result] = await connection.query(
      `UPDATE blog_posts SET title=?, slug=?, excerpt=?, content=?, author_name=?, featured_image_url=?, category_slugs=? WHERE id=?`,
      [title, slug, excerpt, content, author_name, featured_image_url, categorySlugsForDb, id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Post not found or no changes made' });
    }

    res.status(200).json({ message: 'Post updated successfully' });
  } catch (err) {
    console.error('Error updating post:', err);
    if (err.code === 'ER_DUP_ENTRY') {
      return res.status(409).json({ message: 'Another post with this slug already exists.' });
    }
    res.status(500).json({ message: 'Server error while updating post', error: err.message });
  }
};

// Delete post
const deletePost = async (req, res) => {
  const { id } = req.params;
  try {
    const connection = await dbPromise;
    const [result] = await connection.query('DELETE FROM blog_posts WHERE id = ?', [id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Post not found' });
    }
    res.status(200).json({ message: 'Post deleted successfully' });
  } catch (err) {
    console.error('Error deleting post:', err);
    res.status(500).json({ message: 'Server error while deleting post', error: err.message });
  }
};

// The rest (comments-related functions) remain unchanged.


// Get comments for a post
const getCommentsForPost = async (req, res) => {
    const { slug } = req.params;
    try {
        const connection = await dbPromise;
        const [rows] = await connection.query(
            'SELECT * FROM comments WHERE PostSlug = ? AND IsApproved = 1 ORDER BY CreatedAt DESC',
            [slug]
        );
        res.status(200).json(rows);
    } catch (err) {
        console.error('Error fetching comments:', err);
        res.status(500).json({ message: 'Server error while fetching comments', error: err.message });
    }
};

// Add a new comment
const addCommentToPost = async (req, res) => {
    const { slug } = req.params;
    const { name, email, comment } = req.body;
    
    if (!name || !email || !comment) {
        return res.status(400).json({ message: 'Name, email, and comment are required.' });
    }

    try {
        const connection = await dbPromise;
        
        // 1. Add the new comment (default IsApproved = 0)
        const [result] = await connection.query(
            'INSERT INTO comments (PostSlug, Name, Email, Comment) VALUES (?, ?, ?, ?)',
            [slug, name, email, comment]
        );

        // 2. Only update count if auto-approved (or remove this for manual approval)
        await connection.query(
            'UPDATE comments SET IsApproved = 1 WHERE CommentId = ?',
            [result.insertId]
        );

        // 3. Update the blog post's comment count
        await connection.query(
            `UPDATE blog_posts SET comments = (
                SELECT COUNT(*) FROM comments 
                WHERE PostSlug = ? AND IsApproved = 1
            ) WHERE slug = ?`,
            [slug, slug]
        );

        const [newComment] = await connection.query(
            'SELECT * FROM comments WHERE CommentId = ?',
            [result.insertId]
        );

        res.status(201).json({ message: 'Comment added successfully', comment: newComment[0] });
    } catch (err) {
        console.error('Error adding comment:', err);
        res.status(500).json({ message: 'Server error while adding comment', error: err.message });
    }
};

// Delete a comment (admin only)
const deleteComment = async (req, res) => {
    const { commentId } = req.params;
    try {
        const connection = await dbPromise;
        const [result] = await connection.query(
            'DELETE FROM comments WHERE CommentId = ?',
            [commentId]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Comment not found' });
        }

        res.status(200).json({ message: 'Comment deleted successfully' });
    } catch (err) {
        console.error('Error deleting comment:', err);
        res.status(500).json({ message: 'Server error while deleting comment', error: err.message });
    }
};

const getAllComments = async (req, res) => {
    try {
        const connection = await dbPromise;
        const [rows] = await connection.query(
            'SELECT * FROM comments ORDER BY CreatedAt DESC'
        );
        res.status(200).json(rows);
    } catch (err) {
        console.error('Error fetching all comments:', err);
        res.status(500).json({ message: 'Server error while fetching comments', error: err.message });
    }
};

const getApprovedComments = async (req, res) => {
    try {
        const connection = await dbPromise;
        const [rows] = await connection.query(
            'SELECT * FROM comments WHERE IsApproved = 1 ORDER BY CreatedAt DESC'
        );
        res.status(200).json(rows);
    } catch (err) {
        console.error('Error fetching approved comments:', err);
        res.status(500).json({ message: 'Server error while fetching comments', error: err.message });
    }
};

const getPendingComments = async (req, res) => {
    try {
        const connection = await dbPromise;
        const [rows] = await connection.query(
            'SELECT * FROM comments WHERE IsApproved = 0 ORDER BY CreatedAt DESC'
        );
        res.status(200).json(rows);
    } catch (err) {
        console.error('Error fetching pending comments:', err);
        res.status(500).json({ message: 'Server error while fetching comments', error: err.message });
    }
};
const approveComment = async (req, res) => {
    const { commentId } = req.params;
    try {
        const connection = await dbPromise;
        
        // 1. Get the comment first to know which post it belongs to
        const [comment] = await connection.query(
            'SELECT PostSlug FROM comments WHERE CommentId = ?',
            [commentId]
        );
        
        if (comment.length === 0) {
            return res.status(404).json({ message: 'Comment not found' });
        }
        
        const postSlug = comment[0].PostSlug;

        // 2. Approve the comment
        const [result] = await connection.query(
            'UPDATE comments SET IsApproved = 1 WHERE CommentId = ?',
            [commentId]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Comment not found' });
        }

        // 3. Update the blog post's comment count
        await connection.query(
            `UPDATE blog_posts SET comments = (
                SELECT COUNT(*) FROM comments 
                WHERE PostSlug = ? AND IsApproved = 1
            ) WHERE slug = ?`,
            [postSlug, postSlug]
        );

        res.status(200).json({ message: 'Comment approved successfully' });
    } catch (err) {
        console.error('Error approving comment:', err);
        res.status(500).json({ message: 'Server error while approving comment', error: err.message });
    }
};

// Add these to the exports
module.exports = {
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
};