import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEdit, FaTrashAlt, FaPlus, FaSpinner } from "react-icons/fa";
import axios from "axios";
import Navbar from "../../../components/Admin/Navbar";
import axiosClient from "../../axioClient";
// import { toast } from "react-toastify"; // Optional

const ConfirmationModal = ({ isOpen, message, onConfirm, onCancel }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-lg p-6 max-w-sm w-full text-center">
        <p className="text-lg font-medium text-gray-800 mb-6">{message}</p>
        <div className="flex justify-center gap-4">
          <button
            onClick={onCancel}
            className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100 transition"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-6 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

const BlogManager = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [blogToDeleteId, setBlogToDeleteId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await axiosClient.get("/api/blogs");
      setBlogs(res.data);
    } catch (err) {
      console.error("Error fetching blogs", err);
      setError("Failed to load blogs. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteClick = (id) => {
    setBlogToDeleteId(id);
    setIsModalOpen(true);
  };

  const confirmDelete = async () => {
    setIsModalOpen(false);
    if (!blogToDeleteId) return;

    try {
      await axiosClient.delete(`/api/blogs/${blogToDeleteId}`);
      setBlogs((prev) => prev.filter((blog) => blog.id !== blogToDeleteId));
      setBlogToDeleteId(null);
      // toast.success("Blog deleted successfully");
    } catch (err) {
      console.error("Error deleting blog", err);
      setError("Failed to delete blog. Please try again.");
      // toast.error("Error deleting blog");
    }
  };

  const cancelDelete = () => {
    setIsModalOpen(false);
    setBlogToDeleteId(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black/20 to-purple-300 text-white">
      <Navbar />
      <div className="pt-24 px-4 sm:px-8 lg:px-12 pb-12">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900">
            Manage Blogs
          </h2>
          <button
            onClick={() => navigate("/admin/create-blog")}
            className="inline-flex items-center px-5 py-2 text-base font-medium rounded-md shadow-sm text-white bg-purple-600 hover:bg-purple-700 focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition transform hover:scale-105"
          >
            <FaPlus className="mr-2" /> Create Blog
          </button>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <FaSpinner className="animate-spin text-purple-500 text-4xl" />
            <p className="ml-4 text-lg text-gray-600">Loading blogs...</p>
          </div>
        ) : error ? (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
            <strong className="font-bold">Error!</strong>
            <span className="block sm:inline ml-2">{error}</span>
          </div>
        ) : blogs.length === 0 ? (
          <div className="bg-gray-900 p-10 rounded-lg shadow-md text-center">
            <h3 className="text-2xl font-bold text-white mb-4">
              No Blogs Found
            </h3>
            <p className="text-gray-300">
              Start by creating your first blog post!
            </p>
            <button
              onClick={() => navigate("/admin/create-blog")}
              className="mt-6 inline-flex items-center px-6 py-3 bg-purple-600 text-white rounded-md shadow hover:bg-purple-700 transition"
            >
              <FaPlus className="mr-2" /> Create New Blog
            </button>
          </div>
        ) : (
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {blogs.map((blog) => (
              <div
                key={blog.id}
                className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-transform duration-300 hover:-translate-y-1 border"
              >
                <img
                  src={
                    blog.featured_image_url
                      ? `${axiosClient.defaults.baseURL}${blog.featured_image_url.replace(
                          /^\.\./,
                          ""
                        )}`
                      : "https://placehold.co/600x400/E0E0E0/6C6C6C?text=No+Image"
                  }
                  alt={blog.title}
                  className="w-full h-48 object-cover rounded-md mb-4"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src =
                      "https://placehold.co/600x400/E0E0E0/6C6C6C?text=Image+Error";
                  }}
                />
                <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2">
                  {blog.title}
                </h3>
                <p className="text-sm text-gray-600 mb-4 line-clamp-3">
                  {blog.excerpt}
                </p>
                <div className="flex justify-between items-center border-t pt-4 text-sm text-gray-500">
                  <span>
                    {new Date(blog.date_posted).toLocaleDateString()}
                  </span>
                  <div className="flex gap-4">
                    <FaEdit
                      onClick={() =>
                        navigate(`/admin/edit-blog/${blog.id}`)
                      }
                      className="cursor-pointer text-purple-600 hover:text-purple-800"
                      title="Edit Blog"
                    />
                    <FaTrashAlt
                      onClick={() => handleDeleteClick(blog.id)}
                      className="cursor-pointer text-red-600 hover:text-red-800"
                      title="Delete Blog"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <ConfirmationModal
        isOpen={isModalOpen}
        message="Are you sure you want to delete this blog post? This action cannot be undone."
        onConfirm={confirmDelete}
        onCancel={cancelDelete}
      />
    </div>
  );
};

export default BlogManager;
