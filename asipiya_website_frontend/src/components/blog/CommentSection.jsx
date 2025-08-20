// src/components/blog/CommentSection.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaUser, FaReply, FaTrash } from 'react-icons/fa';
import { useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CommentSection = () => {
    const { slug } = useParams();
    const [comments, setComments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [newComment, setNewComment] = useState({
        name: '',
        email: '',
        comment: ''
    });
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        // Check if user is admin (you'll need to implement this based on your auth system)
        const checkAdminStatus = () => {
            const token = localStorage.getItem('adminToken');
            setIsAdmin(!!token);
        };

        checkAdminStatus();
        fetchComments();
    }, [slug]);

    const fetchComments = async () => {
        setLoading(true);
        setError(null);
        try {
            const res = await axios.get(`http://localhost:5000/api/blogs/${slug}/comments`);
            setComments(res.data);
        } catch (err) {
            console.error("Error fetching comments:", err);
            setError("Failed to load comments. Please try again later.");
        } finally {
            setLoading(false);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewComment(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!newComment.name || !newComment.email || !newComment.comment) {
            toast.error('Please fill in all fields');
            return;
        }

        try {
            const res = await axios.post(
                `http://localhost:5000/api/blogs/${slug}/comments`,
                newComment
            );
            
            setComments(prev => [res.data.comment, ...prev]);
            setNewComment({ name: '', email: '', comment: '' });
            toast.success('Comment submitted successfully!');
        } catch (err) {
            console.error("Error submitting comment:", err);
            toast.error('Failed to submit comment. Please try again.');
        }
    };

    const handleDelete = async (commentId) => {
        if (!window.confirm('Are you sure you want to delete this comment?')) return;
        
        try {
            await axios.delete(`http://localhost:5000/api/blogs/comments/${commentId}`);
            setComments(prev => prev.filter(c => c.CommentId !== commentId));
            toast.success('Comment deleted successfully');
        } catch (err) {
            console.error("Error deleting comment:", err);
            toast.error('Failed to delete comment');
        }
    };

    if (loading) {
        return <div className="text-center py-4">Loading comments...</div>;
    }

    if (error) {
        return <div className="text-red-500 text-center py-4">{error}</div>;
    }

    return (
        <div className="mt-12">
            <ToastContainer position="top-right" autoClose={3000} />
            
            <h3 className="text-2xl font-bold mb-6 text-gray-900 border-b pb-2">
                {comments.length} {comments.length === 1 ? 'Comment' : 'Comments'}
            </h3>

            {/* Comment Form */}
            <div className="bg-white p-6 rounded-lg shadow-md mb-8">
                <h4 className="text-lg font-semibold mb-4">Leave a Comment</h4>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                            Name (required)
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={newComment.name}
                            onChange={handleInputChange}
                            className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                            Email (will not be published) (required)
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={newComment.email}
                            onChange={handleInputChange}
                            className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="comment" className="block text-sm font-medium text-gray-700 mb-1">
                            Comment
                        </label>
                        <textarea
                            id="comment"
                            name="comment"
                            rows="4"
                            value={newComment.comment}
                            onChange={handleInputChange}
                            className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                            required
                        ></textarea>
                    </div>
                    <button
                        type="submit"
                        className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 transition-colors duration-300"
                    >
                        Post Comment
                    </button>
                </form>
            </div>

            {/* Comments List */}
            <div className="space-y-6">
                {comments.map(comment => (
                    <div key={comment.CommentId} className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                        <div className="flex items-start">
                            <div className="bg-purple-100 text-purple-800 rounded-full p-3 mr-4">
                                <FaUser className="text-lg" />
                            </div>
                            <div className="flex-1">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <h4 className="font-semibold text-gray-900">{comment.Name}</h4>
                                        <p className="text-xs text-gray-500">
                                            {new Date(comment.CreatedAt).toLocaleDateString('en-US', {
                                                year: 'numeric',
                                                month: 'long',
                                                day: 'numeric',
                                                hour: '2-digit',
                                                minute: '2-digit'
                                            })}
                                        </p>
                                    </div>
                                    {/* {isAdmin && (
                                        <button
                                            onClick={() => handleDelete(comment.CommentId)}
                                            className="text-red-500 hover:text-red-700"
                                            title="Delete comment"
                                        >
                                            <FaTrash />
                                        </button>
                                    )} */}
                                </div>
                                <p className="mt-2 text-gray-700">{comment.Comment}</p>
                                
                                {/* Reply button - can implement this later */}
                                {/* <button className="mt-2 text-sm text-purple-600 hover:text-purple-800 flex items-center">
                                    <FaReply className="mr-1" /> Reply
                                </button> */}
                                
                                {/* Replies section - can implement this later */}
                                {/* {comment.replies && comment.replies.length > 0 && (
                                    <div className="mt-4 pl-4 border-l-2 border-gray-200">
                                        {comment.replies.map(reply => (
                                            <div key={reply.id} className="mb-3">
                                                <p className="text-sm font-medium">{reply.author}</p>
                                                <p className="text-sm text-gray-600">{reply.text}</p>
                                            </div>
                                        ))}
                                    </div>
                                )} */}
                            </div>
                        </div>
                    </div>
                ))}
                
                {comments.length === 0 && (
                    <div className="text-center py-6 text-gray-500">
                        No comments yet. Be the first to comment!
                    </div>
                )}
            </div>
        </div>
    );
};

export default CommentSection;