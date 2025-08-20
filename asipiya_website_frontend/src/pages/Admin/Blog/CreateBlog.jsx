import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "../../../components/Admin/Navbar";
import { toast } from "react-toastify";
import MDEditor from '@uiw/react-md-editor';
import '@uiw/react-md-editor/markdown-editor.css';
import axiosClient from "../../axioClient";

export default function CreateBlog() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    slug: "",
    excerpt: "",
    content: "",
    author_name: "",
    category_slugs: "",
  });

  const [featuredImage, setFeaturedImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);

  // Auto-generate slug from title if slug is empty or matches previous title slug
  useEffect(() => {
    if (!form.slug || form.slug === generateSlug(form.title)) {
      setForm((prev) => ({ ...prev, slug: generateSlug(form.title) }));
    }
  }, [form.title]);

  // Preview image
  useEffect(() => {
    if (!featuredImage) {
      setPreview(null);
      return;
    }
    const objectUrl = URL.createObjectURL(featuredImage);
    setPreview(objectUrl);
    return () => URL.revokeObjectURL(objectUrl);
  }, [featuredImage]);

  function generateSlug(text) {
    return text
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9 -]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-");
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value.trimStart() }));
  };

  const handleContentChange = (value) => {
    setForm((prev) => ({ ...prev, content: value || '' }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic client-side validation
    if (!form.title || !form.content || !form.author_name) {
      toast.error("Please fill in all required fields.");
      return;
    }

    if (!featuredImage) {
      toast.error("Please upload a featured image.");
      return;
    }

    setLoading(true);

    const formData = new FormData();
    formData.append("title", form.title.trim());
    formData.append("slug", form.slug.trim());
    formData.append("excerpt", form.excerpt.trim());
    formData.append("content", form.content.trim());
    formData.append("author_name", form.author_name.trim());
    formData.append("category_slugs", form.category_slugs.trim());
    formData.append("featured_image", featuredImage);

    try {
      await axiosClient.post("/api/blogs", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success("Blog created successfully!");

      // Reset form and preview
      setForm({
        title: "",
        slug: "",
        excerpt: "",
        content: "",
        author_name: "",
        category_slugs: "",
      });
      setFeaturedImage(null);
      setPreview(null);

      // Redirect after short delay so user can see toast
      setTimeout(() => navigate("/admin/blog"), 1500);
    } catch (error) {
      console.error("Error creating blog:", error);
      toast.error(
        error.response?.data?.message || "Failed to create blog. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-black/20 to-purple-300 text-black">
      <Navbar />

      <div className="flex-grow pt-24 px-4">
        <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-md p-6 mb-10">
          <h2 className="text-3xl font-semibold mb-6 text-center">
            Create New Blog
          </h2>

          <form onSubmit={handleSubmit} className="space-y-5" noValidate>
            {[
              { name: "title", label: "Title", required: true },
              { name: "slug", label: "Slug", required: true },
              { name: "excerpt", label: "Excerpt" },
              { name: "author_name", label: "Author Name", required: true },
              {
                name: "category_slugs",
                label: "Category Slugs (comma-separated)",
              },
            ].map(({ name, label, required }) => (
              <div key={name} className="flex flex-col">
                <label htmlFor={name} className="mb-1 font-medium">
                  {label} {required && <span className="text-red-500">*</span>}
                </label>
                <input
                  type="text"
                  id={name}
                  name={name}
                  value={form[name]}
                  onChange={handleChange}
                  placeholder={`Enter ${label.toLowerCase()}`}
                  className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400"
                  required={required}
                />
              </div>
            ))}

            <div className="flex flex-col">
              <label htmlFor="content" className="mb-1 font-medium">
                Content <span className="text-red-500">*</span>
              </label>
              <div data-color-mode="light">
                <MDEditor
                  value={form.content}
                  onChange={handleContentChange}
                  placeholder="Write the full blog content here..."
                  height={300}
                  preview="edit"
                  visibleDragBar={false}
                />
              </div>
            </div>

            <div className="flex flex-col">
              <label htmlFor="featured_image" className="mb-1 font-medium">
                Featured Image <span className="text-red-500">*</span>
              </label>
              <input
                type="file"
                id="featured_image"
                accept="image/*"
                onChange={(e) => setFeaturedImage(e.target.files[0])}
                className="border border-gray-300 rounded px-3 py-2"
                required
              />
            </div>

            {preview && (
              <div className="text-center">
                <p className="text-sm text-gray-500 mb-2">Image Preview:</p>
                <img
                  src={preview}
                  alt="Preview"
                  className="w-32 h-32 object-contain mx-auto rounded-md border"
                />
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 rounded transition flex justify-center items-center gap-2"
            >
              {loading && (
                <svg
                  className="animate-spin h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v8H4z"
                  />
                </svg>
              )}
              {loading ? "Publishing..." : "Publish Blog"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
