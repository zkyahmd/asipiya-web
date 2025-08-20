import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../../../components/Admin/Navbar";
import axiosClient from "../../axioClient";

export default function EditBlog() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    title: "",
    slug: "",
    excerpt: "",
    content: "",
    author_name: "",
    featured_image_url: "",
    category_slugs: "",
  });

  useEffect(() => {
    axiosClient
      .get(`/api/blogs/${id}`)
      .then((res) => setForm(res.data))
      .catch((err) => console.error("Error loading blog:", err));
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axiosClient.put(`/api/blogs/${id}`, form);
      navigate("/admin/blog");
    } catch (err) {
      console.error("Error updating blog:", err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black/20 to-purple-300 text-black">
      <Navbar />
      <div className="pt-[80px] px-4 sm:px-8 lg:px-16 pb-10 max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-white mb-6">Edit Blog</h2>
        <form onSubmit={handleSubmit} className="bg-white shadow-lg rounded-xl p-6 space-y-6">
          {[
            { name: "title", label: "Title" },
            { name: "slug", label: "Slug" },
            { name: "excerpt", label: "Excerpt" },
            { name: "author_name", label: "Author Name" },
            { name: "featured_image_url", label: "Featured Image URL" },
            { name: "category_slugs", label: "Category Slugs (comma-separated)" }
          ].map(({ name, label }) => (
            <div key={name}>
              <label htmlFor={name} className="block text-sm font-semibold text-gray-700 mb-1">
                {label}
              </label>
              <input
                type="text"
                id={name}
                name={name}
                value={form[name]}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:outline-none"
                required
              />
            </div>
          ))}

          <div>
            <label htmlFor="content" className="block text-sm font-semibold text-gray-700 mb-1">
              Content
            </label>
            <textarea
              id="content"
              name="content"
              value={form.content}
              onChange={handleChange}
              rows={10}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:outline-none"
              required
            />
          </div>

          <div className="text-right">
            <button
              type="submit"
              className="bg-purple-600 hover:bg-purple-700 text-white font-semibold px-6 py-2 rounded-md transition"
            >
              Update Blog
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
