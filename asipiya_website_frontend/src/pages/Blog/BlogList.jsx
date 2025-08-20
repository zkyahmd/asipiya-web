// BlogList.jsx
import React, { useState, useEffect, useMemo, useCallback } from "react";
import { useLocation, Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import AOS from "aos";
import "aos/dist/aos.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaBookmark, FaEye, FaComments, FaArrowRight } from "react-icons/fa";
import BlogTopicTabs from "../../components/BlogTopicTabs";
import { mockCategories, mockPosts } from "../../data/mockData";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { PulseBeamsSecond } from "../../components/motion/PulseBeamsSecond";
import { ParallaxProvider } from "react-scroll-parallax";
import GoToTopButton from "../../components/GoToTopButton";
import axios from "axios";
import BlogBanner from "../../assets/Video/BlogBanner.mp4";
import { VideoBanner } from "../../components/motion/VideoBanner";
import axiosClient from "../axioClient";

// --- API Base URL ---
//const API_BASE_URL = "http://localhost:5000/api"; // Adjust this to match your backend URL

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 50, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: "easeOut",
      damping: 10,
      stiffness: 100,
    },
  },
};

function BlogList() {
  const [blogPosts, setBlogPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
  const location = useLocation();
  const navigate = useNavigate();

  const queryParams = useMemo(
    () => new URLSearchParams(location.search),
    [location.search]
  );
  const filterCategorySlug = queryParams.get("filter") || "";

  // Helper function to get category name
  const getCategoryName = useCallback((slug) => {
    const cat = mockCategories.find((c) => c.slug === slug);
    return cat ? cat.name : "Unknown";
  }, []); // getCategoryName depends only on mockCategories which is static for now

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  // --- FETCH FROM BACKEND AND COMBINE WITH MOCK DATA ---
  useEffect(() => {
    setLoading(true);
    setError(null);
    
    // Function to fetch posts from API
    const fetchPostsFromAPI = async () => {
      try {
        const response = await axiosClient.get(`/api/blogs`);
        return response.data;
      } catch (error) {
        console.error("Error fetching posts from API:", error);
        return [];
      }
    };
    
    const loadPosts = async () => {
      try {
        // Get posts from both sources
        const apiPosts = await fetchPostsFromAPI();
        
        // Process API posts to match mockPosts structure
        const processedApiPosts = apiPosts.map(post => ({
          ...post,
          // Convert comma-separated category_slugs string to array if needed
          category_slugs: typeof post.category_slugs === 'string' 
            ? post.category_slugs.split(',') 
            : (post.category_slugs || []),
          // Fix image URLs by prepending API_BASE_URL if they're relative paths
          featured_image_url: post.featured_image_url && post.featured_image_url.startsWith('/') 
            ? `${axiosClient.defaults.baseURL}${post.featured_image_url}` 
            : post.featured_image_url
        }));
        
        // Combine API posts with mock posts
        let postsToDisplay = [...processedApiPosts, ...mockPosts];
        
        // Apply category filter if active
        if (filterCategorySlug) {
          postsToDisplay = postsToDisplay.filter((p) =>
            Array.isArray(p.category_slugs) && p.category_slugs.includes(filterCategorySlug)
          );
        }
        
        // Apply search filter if active
        if (debouncedSearchTerm.trim()) {
          postsToDisplay = postsToDisplay.filter(
            (post) =>
              post.title
                .toLowerCase()
                .includes(debouncedSearchTerm.toLowerCase()) ||
              post.excerpt
                .toLowerCase()
                .includes(debouncedSearchTerm.toLowerCase()) ||
              (Array.isArray(post.category_slugs) && post.category_slugs.some((slug) =>
                getCategoryName(slug)
                  .toLowerCase()
                  .includes(debouncedSearchTerm.toLowerCase())
              ))
          );
        }
        
        // Sort by date (newest first)
        postsToDisplay.sort((a, b) => {
          const dateA = new Date(a.date_posted);
          const dateB = new Date(b.date_posted);
          return dateB - dateA;
        });
        
        setBlogPosts(postsToDisplay);
      } catch (err) {
        console.error("Error loading blog posts:", err);
        setError("Failed to load blog posts. Please try again later.");
        toast.error("Failed to load blog posts.");
      } finally {
        setLoading(false);
      }
    };
    
    loadPosts();
  }, [filterCategorySlug, debouncedSearchTerm, getCategoryName]);

  const handleSearchChange = (value) => {
    setSearchTerm(value);
  };
  
  const mainFeatured = useMemo(() => {
    return blogPosts.length > 0 ? blogPosts[0] : null;
  }, [blogPosts]);

  const trendingPosts = useMemo(() => {
    if (filterCategorySlug) {
      return [];
    }
    return blogPosts.filter((post) => post.id !== mainFeatured?.id).slice(0, 5);
  }, [mainFeatured, filterCategorySlug, blogPosts]);

  const articlesToShow = useMemo(() => {
    return blogPosts;
  }, [blogPosts]);

  const currentSectionTitle = useMemo(() => {
    if (debouncedSearchTerm.trim()) {
      return `Search Results for "${debouncedSearchTerm}"`;
    }

    if (filterCategorySlug) {
      const category = mockCategories.find(
        (cat) => cat.slug === filterCategorySlug
      );
      return category ? `All ${category.name} Articles` : "All Articles";
    }
    return "All Latest Articles";
  }, [filterCategorySlug, debouncedSearchTerm]);

  return (
    <ParallaxProvider>
      <div className="font-sans text-gray-800 bg-gradient-to-r from-purple-50 via-purple-100 to-purple-200 min-h-screen">
        <ToastContainer position="top-right" autoClose={3000} />
        <Navbar />

        {/* Hero Section - Integrated with PulseBeamsSecond */}
        <div className="font-sans text-gray-800 flex-1">
          <VideoBanner videoSrc={BlogBanner}>
            <motion.div
              className="relative z-10 w-full h-full flex flex-col items-center justify-center text-center px-4 max-w-7xl mx-auto"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <motion.h1
                className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight text-white drop-shadow-2xl tracking-tight"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                Explore Our <span className="text-purple-400">Blog</span>
              </motion.h1>
              <motion.p
                className="mt-4 text-lg md:text-xl max-w-3xl mx-auto text-purple-100 drop-shadow-xl font-semibold"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                Insights, Tips & Trends from Asipiya
              </motion.p>
            </motion.div>
          </VideoBanner>
        </div>

        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-4">
            <div className="flex-shrink-0">
              <BlogTopicTabs />
            </div>

            {/* Search Bar positioned to the right */}
            <div className="lg:max-w-md lg:w-full">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search blog posts..."
                  value={searchTerm}
                  onChange={(e) => handleSearchChange(e.target.value)}
                  className="w-full p-3 pl-10 pr-10 text-sm border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 shadow-sm hover:shadow-md"
                />
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg
                    className="h-5 w-5 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </div>
                {/* Loading indicator when search is active */}
                {searchTerm !== debouncedSearchTerm && searchTerm.trim() && (
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                    <div className="animate-spin rounded-full h-4 w-4 border-2 border-purple-400 border-t-transparent"></div>
                  </div>
                )}
                {/* Clear search button - only show when not loading */}
                {searchTerm.trim() && searchTerm === debouncedSearchTerm && (
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                    <button
                      onClick={() => {
                        setSearchTerm("");
                        setDebouncedSearchTerm("");
                      }}
                      className="text-gray-400 hover:text-gray-600 transition-colors duration-200"
                      aria-label="Clear search"
                    >
                      <svg
                        className="h-4 w-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* This section displays category filter badges */}
          <motion.div
            className="flex flex-wrap gap-3 mt-4"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
          >
            {/* "All Posts" / "All Categories" link */}
            <motion.span
              variants={itemVariants}
              onClick={() => {
                const newParams = new URLSearchParams();
                // newParams.set("topic", currentTopic); // Removed
                navigate(`/blog?${newParams.toString()}`); // No topic needed
              }}
              whileHover={{
                scale: 1.05,
                boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
              }}
              className={`cursor-pointer px-4 py-1 rounded-full text-sm font-medium border transition-all duration-200
                ${
                  !filterCategorySlug
                    ? "bg-purple-600 text-white border-purple-700"
                    : "bg-purple-100 hover:bg-purple-200 text-purple-700 border-purple-300"
                }`}
            >
              All Posts
            </motion.span>

            {/* Dynamic category links based on mockCategories */}
            {mockCategories.map((cat) => (
              <motion.span
                key={cat.slug}
                variants={itemVariants}
                onClick={() => {
                  const newParams = new URLSearchParams();
                  // newParams.set("topic", currentTopic); // Removed
                  newParams.set("filter", cat.slug);
                  navigate(`/blog?${newParams.toString()}`);
                }}
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
                }}
                className={`cursor-pointer px-4 py-1 rounded-full text-sm font-medium border transition-all duration-200
                  ${
                    filterCategorySlug === cat.slug
                      ? "bg-purple-600 text-white border-purple-700"
                      : "bg-purple-100 hover:bg-purple-200 text-purple-700 border-purple-300"
                  }`}
              >
                {cat.name}
              </motion.span>
            ))}

            {/* Clear Filter button (only if a category filter is active) */}
            {filterCategorySlug && (
              <motion.span
                variants={itemVariants}
                onClick={() => {
                  const newParams = new URLSearchParams();
                  // newParams.set("topic", currentTopic); // Removed
                  navigate(`/blog?${newParams.toString()}`); // Remove 'filter' param
                }}
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
                }}
                className="cursor-pointer bg-red-100 hover:bg-red-200 text-red-700 px-4 py-1 rounded-full text-sm font-medium border border-red-300 transition-all duration-200"
              >
                Clear Filter
              </motion.span>
            )}

            {/* Clear Search button (only if search is active) */}
            {searchTerm.trim() && (
              <motion.span
                variants={itemVariants}
                onClick={() => {
                  setSearchTerm("");
                  setDebouncedSearchTerm("");
                }}
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
                }}
                className="cursor-pointer bg-orange-100 hover:bg-orange-200 text-orange-700 px-4 py-1 rounded-full text-sm font-medium border border-orange-300 transition-all duration-200"
              >
                Clear Search
              </motion.span>
            )}
          </motion.div>
        </div>

        {/* Main Featured Blog Carousel */}
        {mainFeatured && (
          <div className="max-w-7xl mx-auto px-4 mb-12">
            <Swiper
              modules={[Autoplay]}
              autoplay={{ delay: 4000, disableOnInteraction: false }}
              loop={true}
              spaceBetween={20}
              slidesPerView={1}
            >
              <SwiperSlide>
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col md:flex-row border border-gray-200"
                >
                  <img
                    src={mainFeatured.featured_image_url || "https://placehold.co/600x400/E0E0E0/6C6C6C?text=No+Image"}
                    alt={mainFeatured.title}
                    className="w-full md:w-1/2 h-64 md:h-auto object-cover"
                    loading="lazy"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src =
                        "https://placehold.co/600x400/E0E0E0/6C6C6C?text=Image+Error";
                    }}
                  />

                  <div className="p-6 flex-1 flex flex-col justify-between">
                    <div>
                      <h2 className="text-2xl font-bold mb-2 text-gray-900">
                        {mainFeatured.title}
                      </h2>
                      <p className="text-gray-700 mb-4 line-clamp-3">
                        {mainFeatured.excerpt}
                      </p>
                    </div>

                    <div className="flex gap-3 text-sm text-gray-500 items-center mt-4">
                      <span className="flex items-center gap-1">
                        <FaComments className="text-purple-500" />{" "}
                        {mainFeatured.comments || 0}
                      </span>
                    </div>
                  </div>
                </motion.div>
              </SwiperSlide>
            </Swiper>
          </div>
        )}

        {/* Trending Posts Carousel - Now only shown if no filter is active */}
        {trendingPosts.length > 0 && !filterCategorySlug && (
          <div className="max-w-7xl mx-auto px-4 py-8 mb-12 bg-gradient-to-r from-purple-50 to-purple-100 rounded-lg shadow-inner">
            <motion.h2
              className="text-3xl md:text-4xl font-bold text-center mb-8 text-purple-800"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-block mr-2">Trending Posts</span>
            </motion.h2>

            {loading ? (
              <div className="flex space-x-4 overflow-hidden">
                {[...Array(3)].map((_, i) => (
                  <div
                    key={i}
                    className="flex-shrink-0 w-80 h-72 bg-gray-200 rounded-lg animate-pulse shadow-md"
                  ></div>
                ))}
              </div>
            ) : (
              <div className="relative">
                <Swiper
                  modules={[Pagination, Navigation]}
                  spaceBetween={20}
                  slidesPerView={1}
                  navigation={{
                    nextEl: ".swiper-button-next",
                    prevEl: ".swiper-button-prev",
                  }}
                  pagination={{ clickable: true }}
                  breakpoints={{
                    640: {
                      slidesPerView: 2,
                      spaceBetween: 20,
                    },
                    1024: {
                      slidesPerView: 3,
                      spaceBetween: 30,
                    },
                  }}
                  className="pb-10"
                >
                  {trendingPosts.map((post) => (
                    <SwiperSlide key={post.id}>
                      <motion.div
                        variants={itemVariants}
                        whileHover={{
                          scale: 1.03,
                          boxShadow: "0 10px 40px rgba(0,0,0,0.15)",
                        }}
                        className="bg-white border border-purple-200 rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl
                                  transform hover:-translate-y-2 group cursor-pointer"
                        onClick={() => navigate(`/blog/${post.slug}`)}
                      >
                        <div className="w-full h-40 overflow-hidden">
                          <img
                            src={post.featured_image_url || "https://placehold.co/600x400/E0E0E0/6C6C6C?text=No+Image"}
                            alt={post.title}
                            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                            loading="lazy"
                            onError={(e) => {
                              e.target.onerror = null;
                              e.target.src =
                                "https://placehold.co/600x400/E0E0E0/6C6C6C?text=Image+Not+Found";
                            }}
                          />
                        </div>
                        <div className="p-4">
                          <h3 className="text-lg font-bold mb-2 line-clamp-2 text-purple-900 leading-tight group-hover:text-purple-700 transition-colors duration-300">
                            {post.title}
                          </h3>
                          <p className="text-xs text-gray-600 mb-3 line-clamp-3">
                            {post.excerpt}
                          </p>
                          <div className="flex justify-between items-center text-xs text-gray-500 pt-2 border-t border-gray-100">
                            <span className="flex items-center gap-1">
                              <FaComments className="text-purple-500" />{" "}
                              {post.comments}
                            </span>
                          </div>
                        </div>
                      </motion.div>
                    </SwiperSlide>
                  ))}
                </Swiper>
                {/* Custom Swiper Navigation Arrows (ensure unique classes if you have multiple Swipers) */}
                <div className="swiper-button-prev absolute !text-purple-600 !w-10 !h-10  !rounded-full !shadow-md top-1/2 -translate-y-1/2 -left-5 z-20 flex items-center justify-center cursor-pointer transition-all duration-300 hover:!scale-110 md:-left-8"></div>
                <div className="swiper-button-next absolute !text-purple-600 !w-10 !h-10  !rounded-full !shadow-md top-1/2 -translate-y-1/2 -right-5 z-20 flex items-center justify-center cursor-pointer transition-all duration-300 hover:!scale-110 md:-right-8"></div>
              </div>
            )}
          </div>
        )}

        {/* Main Article Grid - Conditional Title and Content */}
        {
          articlesToShow.length > 0 || loading || error ? ( // Show content if there are articles, loading, or an error to display message
            <div className="max-w-7xl mx-auto px-4 pb-12">
              <motion.h2
                className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-900"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6 }}
              >
                {currentSectionTitle}
              </motion.h2>
              {loading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
                  {[...Array(4)].map(
                    (
                      _,
                      i // Reduced skeleton count for better visual
                    ) => (
                      <div
                        key={i}
                        className="flex flex-col h-96 md:flex-row bg-gray-200 animate-pulse shadow-md rounded-lg overflow-hidden"
                      >
                        <div className="md:w-1/2 w-full h-48 md:h-auto bg-gray-300"></div>
                        <div className="p-6 md:w-1/2 w-full flex flex-col justify-between">
                          <div className="space-y-3">
                            <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                            <div className="h-4 bg-gray-300 rounded"></div>
                            <div className="h-4 bg-gray-300 rounded w-5/6"></div>
                          </div>
                          <div className="flex justify-between mt-6">
                            <div className="h-4 bg-gray-300 rounded w-1/4"></div>
                            <div className="h-4 bg-gray-300 rounded w-1/4"></div>
                          </div>
                        </div>
                      </div>
                    )
                  )}
                </div>
              ) : (
                <AnimatePresence mode="wait">
                  {articlesToShow.length === 0 ? ( // Only show "No articles found" if not loading
                    <motion.p
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      className="text-center text-gray-600 text-lg py-10"
                    >
                      {error
                        ? error
                        : debouncedSearchTerm.trim()
                        ? `No articles found for "${debouncedSearchTerm}". Try a different search term.`
                        : "No articles found for the selected filters."}
                    </motion.p>
                  ) : (
                    <motion.div
                      className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-2" // Changed back to 2 columns for larger screens as per design block
                      variants={containerVariants}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true, amount: 0.1 }}
                    >
                      {articlesToShow.map((post) => (
                        <motion.div
                          key={post.id}
                          variants={itemVariants}
                          whileHover={{
                            scale: 1.01,
                            boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
                          }}
                          className="flex flex-col h-96 md:flex-row items-stretch bg-purple-50 shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl group"
                        >
                          {/* Image Side */}
                          <Link
                            to={`/blog/${post.slug}`}
                            className="md:w-1/2 w-full h-64 md:h-auto overflow-hidden"
                          >
                            <img
                              src={post.featured_image_url || "https://placehold.co/600x400/E0E0E0/6C6C6C?text=No+Image"}
                              alt={post.title}
                              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                              loading="lazy"
                              onError={(e) => {
                                e.target.onerror = null;
                                e.target.src =
                                  "https://placehold.co/600x400/E0E0E0/6C6C6C?text=Image+Not+Found";
                              }}
                            />
                          </Link>

                          {/* Content Side */}
                          <div className="flex flex-col justify-between p-6 md:w-1/2 w-full">
                            <div>
                              <div className="mb-3">
                                {post.category_slugs &&
                                  post.category_slugs.length > 0 && (
                                    <span className="bg-purple-600 text-white text-xs px-3 py-1 rounded-full font-semibold opacity-90">
                                      {post.category_slugs
                                        .map(getCategoryName)
                                        .join(", ")}
                                    </span>
                                  )}
                              </div>
                              <Link to={`/blog/${post.slug}`}>
                                <h3 className="text-2xl font-bold mb-2 text-gray-900 group-hover:text-purple-700 transition-colors duration-300 line-clamp-2">
                                  {post.title}
                                </h3>
                              </Link>
                              <p className="text-gray-600 text-sm line-clamp-3">
                                {post.excerpt}
                              </p>
                            </div>

                            {/* Footer Section */}
                            <div className="flex justify-between items-center text-sm text-gray-500 pt-6">
                              <span className="flex items-center gap-1">
                                <FaComments className="text-purple-500" />{" "}
                                {post.comments}
                              </span>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              )}
            </div>
          ) : null /* Don't render if no articles, not loading, and no error */
        }
        <GoToTopButton />
        <Footer />
      </div>
    </ParallaxProvider>
  );
}

export default BlogList;
