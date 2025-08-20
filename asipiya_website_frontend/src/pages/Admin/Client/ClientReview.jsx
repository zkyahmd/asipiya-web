import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import Navbar from '../../../components/Admin/Navbar';
import axiosClient from '../../axioClient';

const ClientReview = () => {
  const [reviews, setReviews] = useState([]);
  const [formData, setFormData] = useState({
    CompanyName: '',
    ReviwerName: '',
    ReviwerPosition: '',
    ReviewMessage: ''
  });
  const [editMode, setEditMode] = useState(false);
  const [currentReviewId, setCurrentReviewId] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      setLoading(true);
      const res = await axiosClient.get('/api/client-reviews');
      setReviews(res.data);
      setLoading(false);
    } catch (error) {
      toast.error('Failed to load client reviews');
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      if (editMode) {
        await axiosClient.put(`/api/client-reviews/${currentReviewId}`, formData);
        toast.success('Review updated successfully');
      } else {
        await axiosClient.post('/api/client-reviews', formData);
        toast.success('Review added successfully');
      }

      setFormData({
        CompanyName: '',
        ReviwerName: '',
        ReviwerPosition: '',
        ReviewMessage: ''
      });
      setEditMode(false);
      setCurrentReviewId(null);
      fetchReviews();
    } catch (error) {
      toast.error(editMode ? 'Failed to update review' : 'Failed to add review');
      setLoading(false);
    }
  };

  const handleEdit = (review) => {
    setFormData({
      CompanyName: review.CompanyName,
      ReviwerName: review.ReviwerName,
      ReviwerPosition: review.ReviwerPosition,
      ReviewMessage: review.ReviewMessage
    });
    setCurrentReviewId(review.ReviewId);
    setEditMode(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this review?')) return;
    try {
      setLoading(true);
      await axiosClient.delete(`/api/client-reviews/${id}`);
      toast.success('Review deleted successfully');
      fetchReviews();
    } catch (error) {
      toast.error('Failed to delete review');
      setLoading(false);
    }
  };

  const cancelEdit = () => {
    setFormData({
      CompanyName: '',
      ReviwerName: '',
      ReviwerPosition: '',
      ReviewMessage: ''
    });
    setEditMode(false);
    setCurrentReviewId(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black/20 to-purple-300 text-white">
      <Navbar />
      <div className="p-6 pt-[120px] max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-900">
          {editMode ? 'Edit Client Review' : 'Add New Client Review'}
        </h2>

        <form
          onSubmit={handleSubmit}
          className="bg-gray-900 p-6 rounded-xl shadow-lg mb-10"
        >
          {['CompanyName', 'ReviwerName', 'ReviwerPosition'].map((field) => (
            <div key={field} className="mb-4">
              <label className="block text-sm font-semibold mb-2">
                {field.replace('Reviwer', 'Reviewer ').replace(/([A-Z])/g, ' $1').trim()}
              </label>
              <input
                type="text"
                name={field}
                value={formData[field]}
                onChange={handleChange}
                className="w-full bg-gray-800 border border-gray-600 rounded-md px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-400"
                required
              />
            </div>
          ))}

          <div className="mb-4">
            <label className="block text-sm font-semibold mb-2">Review Message</label>
            <textarea
              name="ReviewMessage"
              value={formData.ReviewMessage}
              onChange={handleChange}
              rows="4"
              className="w-full bg-gray-800 border border-gray-600 rounded-md px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-400"
              required
            ></textarea>
          </div>

          <div className="flex gap-4">
            <button
              type="submit"
              disabled={loading}
              className="bg-purple-600 hover:bg-purple-700 text-white font-semibold px-6 py-2 rounded-md"
            >
              {loading ? 'Processing...' : editMode ? 'Update Review' : 'Add Review'}
            </button>
            {editMode && (
              <button
                type="button"
                onClick={cancelEdit}
                className="bg-gray-500 hover:bg-gray-600 text-white font-semibold px-6 py-2 rounded-md"
              >
                Cancel
              </button>
            )}
          </div>
        </form>

        <h3 className="text-2xl font-bold mb-4 text-gray-900">Client Reviews</h3>

        {loading && !reviews.length ? (
          <p className="text-center text-gray-300">Loading reviews...</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {reviews.map((review) => (
              <div
                key={review.ReviewId}
                className="bg-gray-800 rounded-lg shadow-md p-5 hover:shadow-xl transition duration-300"
              >
                <h4 className="font-semibold text-xl mb-2">{review.CompanyName}</h4>
                <p className="text-gray-300 mb-1">
                  <span className="font-medium text-white">Reviewer:</span> {review.ReviwerName}
                </p>
                <p className="text-gray-300 mb-1">
                  <span className="font-medium text-white">Position:</span> {review.ReviwerPosition}
                </p>
                <p className="text-gray-300 mb-4">
                  <span className="font-medium text-white">Message:</span> {review.ReviewMessage}
                </p>
                <div className="flex justify-between">
                  <button
                    onClick={() => handleEdit(review)}
                    className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded text-sm"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(review.ReviewId)}
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
            {!loading && reviews.length === 0 && (
              <p className="text-center col-span-full text-gray-400">No reviews found.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ClientReview;
