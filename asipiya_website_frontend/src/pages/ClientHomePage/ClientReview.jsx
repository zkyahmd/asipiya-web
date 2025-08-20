import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import axiosClient from "../axioClient";

const ReviewCard = ({ review }) => {
  const initials = review.ReviwerName.split(" ")
    .map((n) => n[0])
    .join("");

  return (
    <motion.div
      className="bg-white rounded-3xl shadow-lg p-6 sm:p-8 flex flex-col justify-between h-[380px] max-h-[380px]"
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.3 }}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
    >
      <svg
        className="w-10 h-10 text-purple-500 mb-6 flex-shrink-0"
        fill="currentColor"
        viewBox="0 0 24 24"
      >
        <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
      </svg>

      <p className="text-gray-700 italic mb-6 sm:mb-8 flex-grow overflow-hidden text-sm sm:text-base">
        {review.ReviewMessage}
      </p>

      <div className="flex items-center gap-3 sm:gap-4 flex-shrink-0">
        <div className="w-12 h-12 sm:w-14 sm:h-14 bg-purple-600 rounded-full text-white flex items-center justify-center font-bold text-base sm:text-lg leading-none tracking-wide select-none">
          {initials.slice(0, 2).toUpperCase()}
        </div>

        <div>
          <p className="text-gray-900 font-semibold text-sm sm:text-base">
            {review.ReviwerName}
          </p>
          <p className="text-purple-600 text-xs sm:text-sm">
            {review.ReviwerPosition}, {review.CompanyName}
          </p>
        </div>
      </div>
    </motion.div>
  );
};

const ClientReview = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        setLoading(true);
        const response = await axiosClient.get(
          "/api/client-reviews"
        );
        setReviews(response.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching client reviews:", err);
        setError("Failed to load client reviews. Please try again later.");
        setLoading(false);
      }
    };

    fetchReviews();
  }, []);

  if (loading) {
    return (
      <section className="bg-gradient-to-r from-purple-50 via-purple-100 to-purple-200 px-6 text-center py-20">
        <div className="mb-12 px-4">
          <h2 className="text-5xl font-bold text-gray-600 mb-4">
            Client Testimonials
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Loading our client testimonials...
          </p>
        </div>
        <div className="flex justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-4 border-purple-700"></div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="bg-gradient-to-r from-purple-50 via-purple-100 to-purple-200 px-6 text-center py-20">
        <div className="mb-12 px-4">
          <h2 className="text-5xl font-bold text-gray-600 mb-4">
            Client Testimonials
          </h2>
          <p className="text-red-500 text-lg max-w-2xl mx-auto">{error}</p>
        </div>
      </section>
    );
  }

  if (!reviews.length) {
    return (
      <section className="bg-gradient-to-r from-purple-50 via-purple-100 to-purple-200 py-20 text-center">
        <h2 className="text-5xl font-bold text-gray-600 mb-4">
          Client Testimonials
        </h2>
        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
          No testimonials available at the moment. Check back soon!
        </p>
      </section>
    );
  }

  return (
    <section className="bg-gradient-to-r from-purple-50 via-purple-100 to-purple-200 py-20">
      <div className="max-w-7xl mx-auto px-4 text-center mb-16">
        <h2 className="text-5xl font-bold text-gray-800 mb-4">
          What Our Clients Say
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Hear from our satisfied clients and partners who have experienced the
          Asipiya difference.
        </p>
      </div>

      <Swiper
        modules={[Pagination, Autoplay]}
        slidesPerView={1}
        spaceBetween={16}
        pagination={{ clickable: true }}
        autoplay={{ delay: 6000, disableOnInteraction: false }}
        breakpoints={{
          640: { slidesPerView: 1, spaceBetween: 20 },
          768: { slidesPerView: 2, spaceBetween: 24 },
          1024: { slidesPerView: 3, spaceBetween: 24 },
        }}
        className="max-w-7xl mx-auto px-4"
      >
        {reviews.map((review) => (
          <SwiperSlide key={review.ReviewId}>
            <ReviewCard review={review} />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default ClientReview;
