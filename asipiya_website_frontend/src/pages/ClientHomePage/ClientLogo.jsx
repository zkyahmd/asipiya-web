import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import axiosClient from '../axioClient';

const ClientLogo = () => {
  const [logos, setLogos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLogos = async () => {
      try {
        setLoading(true);
        const response = await axiosClient.get('/api/client-logos');
        setLogos(response.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching client logos:', err);
        setError('Failed to load client logos. Please try again later.');
        setLoading(false);
      }
    };

    fetchLogos();
  }, []);

  // Fallback content for loading state
  if (loading) {
    return (
      <section className="bg-gradient-to-r from-purple-50 via-purple-100 to-purple-200 py-20">
        <div className="text-center mb-12 px-4">
          <h2 className="text-5xl font-bold text-gray-600 mb-4">Our Happy Customers</h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Loading our client partners...
          </p>
        </div>
        <div className="flex justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-700"></div>
        </div>
      </section>
    );
  }

  // Fallback content for error state
  if (error) {
    return (
      <section className="bg-gradient-to-r from-purple-50 via-purple-100 to-purple-200 py-20">
        <div className="text-center mb-12 px-4">
          <h2 className="text-5xl font-bold text-gray-600 mb-4">Our Happy Customers</h2>
          <p className="text-red-500 text-lg max-w-2xl mx-auto">
            {error}
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-gradient-to-r from-purple-50 via-purple-100 to-purple-200 py-20">
      <div className="text-center mb-12 px-4">
        <h2 className="text-5xl font-bold text-gray-600 mb-4">Our Happy Customers</h2>
        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
          We are proud to have collaborated with businesses of all sizes across multiple industries.
        </p>
      </div>

      <div className="flex flex-wrap justify-center items-center gap-6 md:gap-10 px-4 max-w-7xl mx-auto">
        {logos.length > 0 ? (
          logos.map((logo, index) => (
            <motion.div
              key={logo.LogoId}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              viewport={{ once: false, amount: 0.2 }}
              className="bg-white p-5 rounded-2xl shadow-lg hover:shadow-purple-300 transition-all w-32 md:w-40 h-24 flex items-center justify-center"
            >
              <img
                src={`${axiosClient.defaults.baseURL}${logo.LogoPath}`}
                alt={logo.CompanyName}
                className="object-contain h-16 w-full"
              />
            </motion.div>
          ))
        ) : (
          <p className="text-gray-500 text-center py-8">No client logos available at the moment.</p>
        )}
      </div>
    </section>
  );
};

export default ClientLogo;
