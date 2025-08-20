import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { mockCategories, mockPosts } from "../../data/mockData";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { motion } from "framer-motion";
import {
  FaSpinner,
  FaArrowLeft,
  FaTwitter,
  FaFacebookF,
  FaLinkedinIn,
} from "react-icons/fa";
import GoToTopButton from "../../components/GoToTopButton";
import CommentSection from "../../components/blog/CommentSection";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axiosClient from "../axioClient";

// API Base URL
//const API_BASE_URL = "http://localhost:5000/api";

const parseJsonArray = (jsonString) => {
  try {
    return JSON.parse(jsonString);
  } catch {
    return [];
  }
};

const getCategoryName = (slug) => {
  const cat = mockCategories.find((c) => c.slug === slug);
  return cat ? cat.name : "Unknown";
};

const resolveImageUrl = (url) => {
  if (!url) return "https://placehold.co/1920x600?text=No+Image";
  // URL is already processed in the fetchBlogPost function
  return url;
};

function BlogPostDetail() {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [toc, setToc] = useState([]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const fetchBlogPost = async () => {
      setLoading(true);
      setError(null);
      
      try {
        // First try to fetch from API
        try {
          const response = await axiosClient.get(`/api/blogs/slug/${slug}`);
          const apiPost = response.data;
          
          // Process the post data
          setPost({
            ...apiPost,
            // Ensure category_slugs is an array
            category_slugs: typeof apiPost.category_slugs === 'string'
              ? apiPost.category_slugs.split(',')
              : (apiPost.category_slugs || []),
            // Fix image URL if it's a relative path
            featured_image_url: apiPost.featured_image_url && apiPost.featured_image_url.startsWith('/')
              ? `${axiosClient.defaults.baseURL}${apiPost.featured_image_url}`
              : apiPost.featured_image_url
          });
          return; // Exit if API fetch is successful
        } catch (apiError) {
          console.log("API fetch failed, falling back to mock data:", apiError);
          // If API fetch fails, continue to try mock data
        }
        
        // Fallback to mock data if API fetch fails
        const foundPost = mockPosts.find(post => post.slug === slug);
        
        if (foundPost) {
          // If post is found in mock data, use it
          setPost({
            ...foundPost,
            // Ensure category_slugs is an array (in case it's a string in mockData)
            category_slugs: Array.isArray(foundPost.category_slugs) 
              ? foundPost.category_slugs 
              : parseJsonArray(foundPost.category_slugs),
          });
        } else {
          // If post is not found in either API or mock data
          setError("Blog post not found.");
        }
      } catch (err) {
        console.error("Error loading blog post:", err);
        setError("Failed to load blog post.");
        toast.error("Failed to load blog post.");
      } finally {
        setLoading(false);
      }
    };
    
    fetchBlogPost();
  }, [slug]);

  useEffect(() => {
    if (post?.content) {
      const container = document.createElement("div");
      container.innerHTML = post.content;

      const headings = [...container.querySelectorAll("h2, h3")].map((el, i) => {
        const id = `heading-${i}-${el.textContent.trim().replace(/\s+/g, "-").toLowerCase()}`;
        el.id = id;
        return {
          id,
          text: el.textContent,
          level: el.tagName,
        };
      });

      setToc(headings);
      setPost((prev) => ({ ...prev, content: container.innerHTML }));
    }
  }, [post?.content]);

  const calculateReadTime = (content) => {
    const words = content.replace(/<[^>]+>/g, "").split(/\s+/).length;
    return Math.max(1, Math.ceil(words / 200));
  };

  const getPostDate = (post) => {
  return post.date_posted || post.published_date || post.created_at || new Date().toISOString();
};

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <FaSpinner className="animate-spin text-indigo-600 text-5xl" />
        <p className="ml-4 text-xl text-gray-600">Loading...</p>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-6">
        <div className="bg-red-100 text-red-800 px-6 py-4 rounded shadow">
          <strong>Error:</strong> {error || "Post not found."}
        </div>
        <Link
          to="/blog"
          className="mt-6 inline-flex items-center px-5 py-3 text-white bg-indigo-600 hover:bg-indigo-700 rounded"
        >
          <FaArrowLeft className="mr-2" /> Back to Blog
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-r from-purple-50 via-purple-100 to-purple-200 text-gray-800 font-sans min-h-screen">
      <ToastContainer position="top-right" autoClose={3000} />
      <Navbar />

      {/* Hero */}
      <div
        className="relative h-96 bg-cover bg-center"
        style={{ backgroundImage: `url(${resolveImageUrl(post.featured_image_url)})` }}
      >
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="absolute inset-0 bg-black bg-opacity-40 flex flex-col items-center justify-center text-center px-6"
        >
          <h1 className="text-5xl lg:text-6xl font-extrabold text-white drop-shadow-lg">
            {post.title}
          </h1>
          <p className="mt-4 text-lg text-gray-200">
            By <span className="font-semibold">{post.author_name || "Admin"}</span> •{" "}
            {new Date(getPostDate(post)).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}{" "}
            • {calculateReadTime(post.content)} min read
          </p>
        </motion.div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-12 flex flex-col lg:flex-row gap-8">
        <article className="flex-1 space-y-6">
          {/* Social Share */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="flex gap-4"
          >
            <a
              href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.href)}`}
              target="_blank"
              rel="noreferrer"
              title="Share on Twitter"
              className="text-blue-500 hover:text-blue-700"
            >
              <FaTwitter size={24} />
            </a>
            <a
              href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`}
              target="_blank"
              rel="noreferrer"
              title="Share on Facebook"
              className="text-blue-800 hover:text-blue-900"
            >
              <FaFacebookF size={24} />
            </a>
            <a
              href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(window.location.href)}`}
              target="_blank"
              rel="noreferrer"
              title="Share on LinkedIn"
              className="text-blue-600 hover:text-blue-800"
            >
              <FaLinkedinIn size={24} />
            </a>
          </motion.div>

          {/* Content */}
          <div
            className="prose prose-lg max-w-none text-justify"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          {/* Author Bio */}
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="p-6 bg-indigo-50 rounded-lg shadow-md flex items-center gap-4"
          >
            <div className="flex-shrink-0">
              <img
                src={resolveImageUrl(post.author_avatar_url)}
                alt={post.author_name || "Author"}
                className="w-20 h-20 rounded-full object-cover"
              />
            </div>
            <div>
              <h4 className="text-xl font-semibold text-indigo-800">
                {post.author_name || "Author"}
              </h4>
              <p className="text-gray-700">
                {post.author_bio || "Author at Asipiya"}
              </p>
            </div>
          </motion.div>

          {/* Comments */}
          <CommentSection />
        </article>

        {/* Table of Contents */}
        {toc.length > 0 && (
          <nav className="hidden lg:block w-48 sticky top-32 self-start max-h-[calc(100vh-8rem)] overflow-auto">
            <div className="bg-gray-100 p-3 rounded-lg shadow-md">
              <h2 className="text-base font-bold text-gray-800 mb-2">Contents</h2>
              <ul className="space-y-1 text-xs">
                {toc.map(({ id, text, level }) => (
                  <li key={id} className={level === "H3" ? "ml-4" : ""}>
                    <a href={`#${id}`} className="text-indigo-600 hover:text-indigo-800">
                      {text}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </nav>
        )}
      </div>

      <GoToTopButton />
      <Footer />
    </div>
  );
}

export default BlogPostDetail;
