// src/pages/Careers.jsx

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom"; // Ensure Link is imported for navigation
//import { mockOpportunities } from "../../data/mockOpportunities";
// import OpportunityDetailModal from "../../components/OpportunityDetailModal"; // No longer needed for job list items
import career from '../../assets/career/career.jpg';
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { motion } from 'framer-motion';
import { PulseBeamsSecond } from "../../components/motion/PulseBeamsSecond";
import { ParallaxProvider } from 'react-scroll-parallax'; // ParallaxProvider is kept for potential future use or other components
import GoToTopButton from "../../components/GoToTopButton";
import axios from "axios";
import { VideoBanner } from '../../components/motion/VideoBanner';
import CareersBanner from "../../assets/Video/CareersBanner.mp4";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination, Autoplay } from "swiper/modules";
import axiosClient from "../axioClient";

// Skeleton Loader for Job Opportunity Card
const OpportunityCardSkeleton = () => (
  <div className="bg-white p-8 rounded-lg shadow-md animate-pulse">
    <div className="h-6 bg-gray-300 rounded w-3/4 mb-4"></div>
    <div className="h-4 bg-gray-300 rounded w-1/2 mb-3"></div>
    <div className="h-4 bg-gray-300 rounded w-1/3 mb-6"></div>
    <div className="h-4 bg-gray-300 rounded mb-2"></div>
    <div className="h-4 bg-gray-300 rounded w-5/6 mb-6"></div>
    <div className="h-10 bg-gray-300 rounded-full w-1/3 mx-auto"></div>
  </div>
);

// Animation variants for consistent entrance effects
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

function Careers() {
  const [opportunities, setOpportunities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Form State for "Apply for Job" section (no change)
  const [formData, setFormData] = useState({
    fullName: "",
    emailAddress: "",
    contactNumber: "",
    positionApplied: "",
    linkedinProfile: "",
    nicNumber: "",
    cvFile: null,
  });
  const [formSubmitted, setFormSubmitted] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    setLoading(true);
    setError(null);

    // Fetch from your live backend
    axiosClient
      .get("/api/jobs")
      .then((res) => {
        setOpportunities(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setError("Failed to load job opportunities.");
        setLoading(false);
        console.error("Error fetching jobs:", err);
      });
  }, []);

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    // Validation - use formData state
    if (!formData.fullName || !formData.emailAddress || !formData.contactNumber || !formData.cvFile) {
      setError("Please fill in all required fields and upload your CV.");
      return;
    }

    const formDataToSend = new FormData();
    formDataToSend.append("fullName", formData.fullName);
    formDataToSend.append("email", formData.emailAddress); // Note the field name change
    formDataToSend.append("contactNumber", formData.contactNumber);
    formDataToSend.append("positionApplied", formData.positionApplied);
    formDataToSend.append("linkedinProfile", formData.linkedinProfile || '');
    formDataToSend.append("nicNumber", formData.nicNumber || '');
    formDataToSend.append("cv", formData.cvFile);

    try {
      setLoading(true);
      const response = await axiosClient.post(
        "/api/jobs/applications",
        formDataToSend,
        {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
      );

      if (response.data.success) {
        setFormSubmitted(true);
      } else {
        throw new Error(response.data.error || 'Submission failed');
      }
    } catch (err) {
      setError(err.response?.data?.error || "Failed to submit the form. Please try again later.");
      console.error("Submission error:", err);
    } finally {
      setLoading(false);
    }
  };

  // Why Work at Asipiya data
  const whyWorkReasons = [
    {
      title: "Growth-Oriented Culture",
      description: "We provide continuous learning and development opportunities for both recent graduates and seasoned professionals. Your growth is our growth.",
      icon: (
        <svg
          className="w-12 h-12"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M13 10V3L4 14h7v7l9-11h-7z"
          ></path>
        </svg>
      )
    },
    {
      title: "Supportive & Collaborative",
      description: "Join a close-knit family where every idea is valued. We thrive on teamwork and mutual support to achieve common goals.",
      icon: (
        <svg
          className="w-12 h-12"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H2m20 0h-2.18m-4.075-1.246A3.001 3.001 0 0013 16a3 3 0 00-3-3H6a3 3 0 00-3 3v4m6.75-4.996V10a2 2 0 112-2h2a2 2 0 112 2v4.004M16 11l4 4m0 0l-4 4m4-4H4"
          ></path>
        </svg>
      )
    },
    {
      title: "Meaningful Work",
      description: "Your contributions help local startups go digital and build scalable solutions for national businesses, making a real impact.",
      icon: (
        <svg
          className="w-12 h-12"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-1.009-8.755-2.745M10 19l-2-2m0 0l-2 2m2-2V3m10 4l2 2m0 0l2-2m-2 2V3"
          ></path>
        </svg>
      )
    },
    {
      title: "Creativity & Technology",
      description: "Work in a vibrant, multi-disciplinary environment where designers, developers, marketers, and strategists innovate together.",
      icon: (
        <svg
          className="w-12 h-12"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M9.663 17h4.673M12 22V2m8 17H4a2 2 0 01-2-2V7a2 2 0 012-2h16a2 2 0 012 2v10a2 2 0 01-2 2z"
          ></path>
        </svg>
      )
    },
    {
      title: "Flexible & Balanced",
      description: "We promote a healthy work-life balance with flexible arrangements that support your well-being and productivity.",
      icon: (
        <svg
          className="w-12 h-12"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2zm3-6h.01M17 14h.01"
          ></path>
        </svg>
      )
    },
    {
      title: "Innovation & Impact",
      description: "Be at the forefront of technological advancements, creating solutions that make a tangible difference.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-12 h-12">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
        </svg>
      )
    }
  ];

  return (
    <ParallaxProvider>
      <div className="font-sans text-gray-800">
        <Navbar />

        {/* Hero Section - Still uses PulseBeamsSecond with motion */}
        <div className="font-sans text-gray-800 flex-1">
          <VideoBanner videoSrc={CareersBanner}>
            {/* Content that goes inside the PulseBeamsSecond component */}
            <motion.div
              className="relative z-10 w-full flex flex-col items-center justify-center text-center px-4 max-w-7xl mx-auto"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight text-white drop-shadow-2xl animate-text-pop tracking-tight">
                Join Our <span className="text-purple-300">Dynamic Team</span>
              </h1>
              <p className="mt-4 text-lg md:text-xl max-w-3xl mx-auto text-purple-100 drop-shadow-xl animate-text-pop font-semibold">
                Want to be part of one of the fastest-growing companies in Sri
                Lanka?
              </p>
              <motion.a
                href="mailto:info@asipiya.lk?subject=General%20Career%20Inquiry%20from%20Website"
                className="mt-8 inline-flex items-center px-8 py-3 border border-transparent text-base font-medium rounded-full shadow-lg text-purple-900 bg-white hover:bg-gray-100 transition-all duration-300 transform hover:scale-105"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                Connect With Us
              </motion.a>
            </motion.div>
          </VideoBanner>
        </div>

        {/* Why Join Us / Culture Section */}
        <section className="py-16 sm:py-20 px-4 flex justify-center items-center bg-gray-50">
          {/* Inline style for purple swiper dots */}
          <style>{`
            .swiper-pagination-bullet {
              background-color: #a855f7; /* Tailwind purple-600 */
              opacity: 0.5;
            }
            .swiper-pagination-bullet-active {
              background-color: #a855f7;
              opacity: 1;
            }
          `}</style>

          <div className="w-full max-w-7xl mx-auto">
            <motion.h2
              className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-900"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6 }}
            >
              Why Work at Asipiya?
            </motion.h2>

            {/* Mobile Swiper */}
            <div className="block md:hidden">
              <Swiper
                spaceBetween={16}
                slidesPerView={1}
                pagination={{ clickable: true }}
                autoplay={{ delay: 3000, disableOnInteraction: false }}
                modules={[Pagination, Autoplay]}
                loop
              >
                {whyWorkReasons.map((reason, index) => (
                  <SwiperSlide key={index}>
                    <motion.div
                      className="bg-white p-8 rounded-lg shadow-xl border border-purple-100 flex flex-col items-center text-center"
                      style={{
                        width: "300px",
                        height: "310px",
                        margin: "0 auto",
                      }}
                      initial={{ opacity: 0, y: 40 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: false, amount: 0.2 }}
                      transition={{ duration: 0.8, ease: "easeOut" }}
                    >
                      <div className="text-purple-600 mb-4 transition-transform duration-300 hover:scale-110">
                        {reason.icon}
                      </div>
                      <h3 className="text-xl font-bold mb-3 text-gray-900">
                        {reason.title}
                      </h3>
                      <p className="text-gray-700 text-base leading-relaxed">
                        {reason.description}
                      </p>
                    </motion.div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>

            {/* Desktop Grid */}
            <motion.div
              className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-8"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
            >
              {whyWorkReasons.map((reason, index) => (
                <motion.div
                  key={index}
                  className="bg-white p-8 rounded-lg shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 flex flex-col items-center text-center border border-purple-100"
                  variants={itemVariants}
                >
                  <div className="text-purple-600 mb-4 transition-transform duration-300 hover:scale-110">
                    {reason.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-gray-900">
                    {reason.title}
                  </h3>
                  <p className="text-gray-700 text-base leading-relaxed">
                    {reason.description}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* --- Current Opportunities Section (Now links to detail pages) --- */}
        <section className="py-16 sm:py-20 px-4 flex justify-center items-center bg-white">
          <div className="w-full max-w-7xl mx-auto">
            <motion.h2 // Retained motion for this heading
              className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-900"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6 }}
            >
              Current Opportunities
            </motion.h2>
            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"> {/* Adjusted skeleton grid for 3 columns */}
                <OpportunityCardSkeleton />
                <OpportunityCardSkeleton />
                <OpportunityCardSkeleton />
                <OpportunityCardSkeleton />
                <OpportunityCardSkeleton />
                <OpportunityCardSkeleton />
              </div>
            ) : error ? (
              <p className="text-red-600 text-center text-lg">{error}</p>
            ) : opportunities.length > 0 ? (
              <motion.div // Retained motion for the grid container
                className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-8"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.1 }}
              >
                {opportunities.map((opp) => (
                  <motion.div // Retained motion for individual cards
                    key={opp.id}
                    variants={itemVariants}
                    whileHover={{ scale: 1.02, boxShadow: "0 10px 40px rgba(0,0,0,0.08)" }}
                    className="flex flex-col border-purple-400 bg-purple-200 border rounded-lg shadow-sm p-6 transition-all duration-300 cursor-pointer"
                  >
                    <Link // Now a Link component wrapping the entire card content
                      to={`/opportunities/${opp.id}`} // Navigate to the dedicated detail page
                      className="flex flex-col h-full" // Ensure Link takes up full card space
                    >
                      <div className="flex justify-between ">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:gap-4 text-left">
                          <h3 className="text-xl font-bold text-gray-900">
                            {opp.title}
                          </h3>
                          <span className="text-sm font-semibold px-3 py-1 rounded-full bg-gray-100 text-gray-600 border border-gray-300 mt-2 sm:mt-0">
                            {opp.type}
                          </span>
                        </div>
                        <span className="inline-flex items-center px-5 py-2 rounded-full bg-purple-600 text-white hover:bg-purple-700 transition transform hover:scale-105 shadow-md">
                          View Details
                          <svg
                            className="ml-2 w-5 h-5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M17 8l4 4m0 0l-4 4m4-4H3"
                            />
                          </svg>
                        </span>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <div className="bg-purple-50 border border-purple-200 rounded-lg p-10 text-center shadow-md">
                <h3 className="text-2xl font-bold text-purple-800 mb-4">
                  No Current Vacancies
                </h3>
                <p className="text-lg text-center text-purple-700 mb-6 max-w-2xl mx-auto">
                  Please check back later for new openings.
                </p>
                <Link
                  to="/contact"
                  className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-purple-600 hover:bg-purple-700 transition-colors duration-300 transform hover:scale-105"
                >
                  Contact Us for Future Opportunities
                </Link>
              </div>
            )}
          </div>
        </section>

        {/* Resume Submission Form */}
        <section className="py-16 bg-gray-50 flex justify-center items-center">
          <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 ">
            <motion.div
              className="p-8 md:p-12 rounded-2xl shadow-xl border border-purple-200 bg-white"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.7 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-4 ">
                Apply for Job
              </h2>
              <p className="text-lg text-center text-gray-600 mb-8">
                Submit your application, and we'll get back to you!
              </p>
              {formSubmitted ? (
                <motion.div
                  className="text-center p-6 bg-green-50 text-green-700 rounded-lg shadow-md"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <p className="text-lg font-medium">
                    Thank you for your application! We'll be in touch soon.
                  </p>
                </motion.div>
              ) : (
                <>
                  {/* Show error if any */}
                  {error && (
                    <div className="text-center p-4 bg-red-50 text-red-700 rounded-lg mb-4">
                      {typeof error === 'string' ? error : 'Submission failed. Please try again.'}
                    </div>
                  )}
                  <form onSubmit={handleSubmit} encType="multipart/form-data" className="space-y-6 ">
                    <div>
                      <label
                        htmlFor="fullName"
                        className="block text-base font-medium text-gray-700 mb-1"
                      >
                        Full Name
                      </label>
                      <input
                        type="text"
                        id="fullName"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleInputChange}
                        placeholder="Enter your full name"
                        required
                        className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-purple-500 focus:border-purple-500 text-base transition-all duration-200"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="emailAddress"
                        className="block text-base font-medium text-gray-700 mb-1"
                      >
                        Email Address
                      </label>
                      <input
                        type="email"
                        id="emailAddress"
                        name="emailAddress"
                        value={formData.emailAddress}
                        onChange={handleInputChange}
                        placeholder="Enter your email"
                        required
                        className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-purple-500 focus:border-purple-500 text-base transition-all duration-200"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="contactNumber"
                        className="block text-base font-medium text-gray-700 mb-1"
                      >
                        Contact Number
                      </label>
                      <input
                        type="tel"
                        id="contactNumber"
                        name="contactNumber"
                        value={formData.contactNumber}
                        onChange={handleInputChange}
                        placeholder="Enter your contact number"
                        required
                        className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-purple-500 focus:border-purple-500 text-base transition-all duration-200"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="positionApplied"
                        className="block text-base font-medium text-gray-700 mb-1"
                      >
                        Position Applied For
                      </label>
                      <input
                        type="text"
                        id="positionApplied"
                        name="positionApplied"
                        value={formData.positionApplied}
                        onChange={handleInputChange}
                        placeholder="Enter desired position"
                        required
                        className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-purple-500 focus:border-purple-500 text-base transition-all duration-200"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="linkedinProfile"
                        className="block text-base font-medium text-gray-700 mb-1"
                      >
                        LinkedIn Profile Link
                      </label>
                      <input
                        type="url"
                        id="linkedinProfile"
                        name="linkedinProfile"
                        value={formData.linkedinProfile}
                        onChange={handleInputChange}
                        placeholder="Enter your linkedin profile URL (optional)"
                        className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-purple-500 focus:border-purple-500 text-base transition-all duration-200"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="nicNumber"
                        className="block text-base font-medium text-gray-700 mb-1"
                      >
                        National Identity Card (NIC) Number
                      </label>
                      <input
                        type="text"
                        id="nicNumber"
                        name="nicNumber"
                        value={formData.nicNumber}
                        onChange={handleInputChange}
                        placeholder="Enter your NIC number (optional)"
                        className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-purple-500 focus:border-purple-500 text-base transition-all duration-200"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="cvFile"
                        className="block text-base font-medium text-gray-700 mb-1"
                      >
                        Upload CV
                      </label>
                      <div className="mt-1 flex items-center justify-between border border-gray-300 rounded-md shadow-sm bg-white cursor-pointer hover:bg-gray-50 transition duration-150 ease-in-out">
                        <input
                          type="file"
                          id="cvFile"
                          name="cvFile"
                          accept=".pdf,.doc,.docx"
                          onChange={handleInputChange}
                          className="hidden" // Hide the default file input
                        />
                        <label
                          htmlFor="cvFile"
                          className="flex-grow py-3 px-4 text-gray-500 cursor-pointer truncate"
                        >
                          {formData.cvFile
                            ? formData.cvFile.name
                            : "No file chosen (PDF, DOC, DOCX)"}
                        </label>
                        <button
                          type="button"
                          onClick={() => document.getElementById("cvFile").click()}
                          className="px-6 py-3 bg-gray-200 text-gray-700 rounded-r-md font-medium hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-colors duration-200"
                        >
                          Browse
                        </button>
                      </div>
                    </div>
                    <button
                      type="submit"
                      className="w-full inline-flex justify-center py-3 px-6 border border-transparent shadow-sm text-lg font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-colors duration-300 transform hover:scale-105"
                      disabled={loading}
                    >
                      {loading ? (
                        <>
                          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Processing...
                        </>
                      ) : (
                        'Submit Application'
                      )}
                    </button>
                  </form>
                </>
              )}
            </motion.div>
          </div>
        </section>
        <GoToTopButton />
        <Footer />
      </div>
    </ParallaxProvider>
  );
}

export default Careers;