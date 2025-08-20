// src/pages/Admin/Comments/CommentsManager.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaCheck, FaTimes, FaTrash, FaSearch } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from '../../../components/Admin/Navbar';
import axiosClient from '../../axioClient';

const CommentsManager = () => {
    const [comments, setComments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [filter, setFilter] = useState('all'); // 'all', 'approved', 'pending'

    useEffect(() => {
        fetchComments();
    }, [filter]);

    const fetchComments = async () => {
        setLoading(true);
        setError(null);
        try {
            // let url = 'http://localhost:5000/api/blogs/comments/all';
            // if (filter === 'approved') {
            //     url = 'http://localhost:5000/api/blogs/comments/approved';
            // } else if (filter === 'pending') {
            //     url = 'http://localhost:5000/api/blogs/comments/pending';
            // }
            let url = `/api/blogs/admin/comments/all`;
            if (filter === 'approved') {
                url = `/api/blogs/admin/comments/approved`;
            } else if (filter === 'pending') {
                url = `/api/blogs/admin/comments/pending`;
            }

            const res = await axiosClient.get(url);
            setComments(res.data);
        } catch (err) {
            console.error("Error fetching comments:", err);
            setError("Failed to load comments. Please try again later.");
        } finally {
            setLoading(false);
        }
    };

    const handleApprove = async (commentId) => {
        try {
            await axiosClient.patch(`/api/blogs/admin/comments/approve/${commentId}`);
            setComments(prev => prev.map(c =>
                c.CommentId === commentId ? { ...c, IsApproved: 1 } : c
            ));
            toast.success('Comment approved successfully');
        } catch (err) {
            console.error("Error approving comment:", err);
            toast.error('Failed to approve comment');
        }
    };

    const handleDelete = async (commentId) => {
        if (!window.confirm('Are you sure you want to delete this comment?')) return;

        try {
            await axiosClient.delete(`/api/blogs/comments/${commentId}`);
            setComments(prev => prev.filter(c => c.CommentId !== commentId));
            toast.success('Comment deleted successfully');
        } catch (err) {
            console.error("Error deleting comment:", err);
            toast.error('Failed to delete comment');
        }
    };

    const filteredComments = comments.filter(comment => {
        const matchesSearch = comment.Name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            comment.Comment.toLowerCase().includes(searchTerm.toLowerCase()) ||
            comment.PostSlug.toLowerCase().includes(searchTerm.toLowerCase());

        return matchesSearch;
    });

    if (loading) {
        return <div className="flex justify-center py-8">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-purple-500"></div>
        </div>;
    }

    if (error) {
        return <div className="text-red-500 text-center py-8">{error}</div>;
    }

    return (
        <>
            <Navbar />
            <div className="p-6 mt-20">
                <ToastContainer position="top-right" autoClose={3000} />

                <h1 className="text-3xl font-bold mb-6">Manage Comments</h1>

                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
                    <div className="flex items-center space-x-4">
                        <button
                            onClick={() => setFilter('all')}
                            className={`px-4 py-2 rounded ${filter === 'all' ? 'bg-purple-600 text-white' : 'bg-gray-200'}`}
                        >
                            All
                        </button>
                        <button
                            onClick={() => setFilter('approved')}
                            className={`px-4 py-2 rounded ${filter === 'approved' ? 'bg-purple-600 text-white' : 'bg-gray-200'}`}
                        >
                            Approved
                        </button>
                        <button
                            onClick={() => setFilter('pending')}
                            className={`px-4 py-2 rounded ${filter === 'pending' ? 'bg-purple-600 text-white' : 'bg-gray-200'}`}
                        >
                            Pending
                        </button>
                    </div>

                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Search comments..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                        />
                        <FaSearch className="absolute left-3 top-3 text-gray-400" />
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-700">
                            <thead className="bg-gray-700">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Post</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Name</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Comment</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Date</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Status</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="bg-gray-900 divide-y divide-gray-200">
                                {filteredComments.length > 0 ? (
                                    filteredComments.map(comment => (
                                        <tr key={comment.CommentId}>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm font-medium text-gray-900">
                                                    {comment.PostSlug}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm text-gray-900">{comment.Name}</div>
                                                <div className="text-sm text-gray-500">{comment.Email}</div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="text-sm text-gray-900 max-w-xs truncate">{comment.Comment}</div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm text-gray-500">
                                                    {new Date(comment.CreatedAt).toLocaleDateString()}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                                                ${comment.IsApproved ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                                                    {comment.IsApproved ? 'Approved' : 'Pending'}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                {!comment.IsApproved && (
                                                    <button
                                                        onClick={() => handleApprove(comment.CommentId)}
                                                        className="text-green-600 hover:text-green-900 mr-4"
                                                        title="Approve comment"
                                                    >
                                                        <FaCheck />
                                                    </button>
                                                )}
                                                <button
                                                    onClick={() => handleDelete(comment.CommentId)}
                                                    className="text-red-600 hover:text-red-900"
                                                    title="Delete comment"
                                                >
                                                    <FaTrash />
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="6" className="px-6 py-4 text-center text-sm text-gray-500">
                                            No comments found
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    );
};

export default CommentsManager;