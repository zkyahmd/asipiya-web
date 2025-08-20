import React, { useState, useEffect } from 'react';
import { FiMail, FiPhone, FiMapPin } from 'react-icons/fi';
import { FaFacebook, FaInstagram, FaLinkedin, FaWhatsapp } from 'react-icons/fa';
import { motion } from 'framer-motion';

import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import Map from '../../components/Map';
import ContactVideo from '../../assets/Video/ContactUs.mp4';
import axiosClient from '../axioClient';

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
    interest: '',
    agreeToPolicy: false,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // 'success', 'error', null

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleInterestClick = (interest) => {
    setFormData(prev => ({ ...prev, interest }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validation
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setSubmitStatus('error');
      alert('Please fill in all required fields.');
      return;
    }

    if (!formData.agreeToPolicy) {
      setSubmitStatus('error');
      alert('Please agree to the privacy policy.');
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const response = await fetch(`${axiosClient.defaults.baseURL}/api/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name.trim(),
          email: formData.email.trim(),
          message: formData.message.trim(),
          interest: formData.interest || null,
        }),
      });

      const data = await response.json();

      if (data.success) {
        setSubmitStatus('success');
        // Reset form
        setFormData({
          name: '',
          email: '',
          message: '',
          interest: '',
          agreeToPolicy: false,
        });
        alert('Thank you! Your message has been sent successfully. Please check your email for a confirmation message.');
      } else {
        setSubmitStatus('error');
        alert(data.message || 'An error occurred while sending your message.');
      }
    } catch (error) {
      console.error('Error submitting contact form:', error);
      setSubmitStatus('error');
      alert('An error occurred while sending your message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const interests = ["UI/UX Design", "Web Design", "Design System", "Software Solutions", "Other"];

  return (
    <div className="relative bg-gray-50 overflow-hidden">
      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover z-0"
      >
        <source src={ContactVideo} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Dark overlay */}
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-black/80 via-purple-900/50 to-black/90 z-0"></div>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
        <Navbar />
      </motion.div>

      <main className="pt-20 relative z-10">
        {/* Contact Form Section */}
        <motion.section
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative py-12 sm:py-20 px-2 xs:px-4 sm:px-6 flex justify-center items-center"
        >
          <div className="w-full max-w-7xl mx-auto rounded-2xl shadow-2xl bg-purple-20 p-4 xs:p-8 md:p-16 flex flex-col md:flex-row gap-6 xs:gap-10 md:gap-16 items-center">
            <div className="flex-1 flex flex-col items-start justify-start min-w-[180px] xs:min-w-[230px] w-full">
              <div className="w-full flex flex-col items-start">
                <h2 className="text-2xl xs:text-3xl md:text-4xl font-bold text-white mb-1 xs:mb-2">Contact Us</h2>
                <p className="text-sm xs:text-base md:text-lg text-purple-200 mb-2 xs:mb-4 max-w-md">
                  We're here to help. Reach out to us for any inquiries, support, or collaboration opportunities.
                </p>
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, x: 60 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1 }}
              className="bg-white p-8 rounded-lg shadow-lg"
            >
              <h2 className="text-2xl font-bold mb-6">Send us a Message</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700">Full Name *</label>
                  <input 
                    type="text" 
                    name="name" 
                    id="name" 
                    value={formData.name} 
                    onChange={handleInputChange}
                    required
                    disabled={isSubmitting}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500 disabled:bg-gray-100" 
                    placeholder="Enter your full name"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address *</label>
                  <input 
                    type="email" 
                    name="email" 
                    id="email" 
                    value={formData.email} 
                    onChange={handleInputChange}
                    required
                    disabled={isSubmitting}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500 disabled:bg-gray-100"
                    placeholder="Enter your email address"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700">Message *</label>
                  <textarea 
                    name="message" 
                    id="message" 
                    rows="4" 
                    value={formData.message} 
                    onChange={handleInputChange}
                    required
                    disabled={isSubmitting}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500 disabled:bg-gray-100"
                    placeholder="Tell us how we can help you..."
                  ></textarea>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-700 mb-2">I'm interested in... (Optional)</p>
                  <div className="flex flex-wrap gap-2">
                    {interests.map((interest) => (
                      <motion.button
                        key={interest}
                        type="button"
                        onClick={() => handleInterestClick(interest)}
                        disabled={isSubmitting}
                        whileHover={{ scale: isSubmitting ? 1 : 1.05 }}
                        whileTap={{ scale: isSubmitting ? 1 : 0.95 }}
                        className={`px-4 py-2 border rounded-full text-sm transition-all duration-300 disabled:cursor-not-allowed ${
                          formData.interest === interest 
                            ? 'bg-purple-600 text-white border-purple-600' 
                            : 'bg-white text-gray-700 border-gray-300 hover:bg-purple-100 hover:border-purple-300 disabled:hover:bg-white disabled:hover:border-gray-300'
                        }`}
                      >
                        {interest}
                      </motion.button>
                    ))}
                  </div>
                </div>
                <div className="flex items-start">
                  <input 
                    id="agreeToPolicy" 
                    name="agreeToPolicy" 
                    type="checkbox"
                    checked={formData.agreeToPolicy} 
                    onChange={handleInputChange}
                    required
                    disabled={isSubmitting}
                    className="h-4 w-4 text-purple-600 border-gray-300 rounded mt-1 focus:ring-purple-500 disabled:cursor-not-allowed" 
                  />
                  <label htmlFor="agreeToPolicy" className="ml-2 block text-sm text-gray-900">
                    You agree to our <a href="/privacy-policy" className="text-purple-600 hover:underline">privacy policy</a>. *
                  </label>
                </div>
                
                {submitStatus === 'success' && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 bg-green-50 border border-green-200 rounded-md"
                  >
                    <p className="text-green-800 text-sm">✅ Thank you! Your message has been sent successfully. Please check your email for a confirmation message. We'll get back to you soon!</p>
                  </motion.div>
                )}

                {submitStatus === 'error' && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 bg-red-50 border border-red-200 rounded-md"
                  >
                    <p className="text-red-800 text-sm">❌ There was an error sending your message. Please try again.</p>
                  </motion.div>
                )}

                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                  whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                  className={`w-full py-3 px-4 rounded-md font-semibold transition-all duration-300 ${
                    isSubmitting
                      ? 'bg-gray-400 text-white cursor-not-allowed'
                      : 'bg-purple-600 text-white hover:bg-purple-700 transform hover:shadow-lg'
                  }`}
                >
                  {isSubmitting ? (
                    <div className="flex items-center justify-center">
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                      Sending Message...
                    </div>
                  ) : (
                    'Send Message'
                  )}
                </motion.button>
              </form>
            </motion.div>
          </div>
        </motion.section>

        {/* Contact Info Cards */}
        <section className="max-w-full mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-6 pt-6">
            {[
              {
                title: "Chat with us",
                content: (
                  <>
                    <span className="block text-base xs:text-lg font-medium text-gray-600 mt-2">
                      Reach out to us for inquiries, support, or collaborations. We’re here to assist you!
                    </span>
                    <div className="space-y-4 text-sm mt-3 text-black font-bold">
                      <p className="flex items-center"><FiMail className="mr-3 text-purple-600" /> info@asipiya.lk</p>
                      <p className="flex items-center">
                        <a href="https://wa.me/94741870003" target="_blank" rel="noopener noreferrer" className="flex items-center">
                          <FaWhatsapp className="mr-3 text-purple-600" /> Start Live Chat
                        </a>
                      </p>
                    </div>
                  </>
                )
              },
              {
                title: "Call Us",
                content: (
                  <>
                    <span className="block text-base xs:text-lg font-medium text-gray-600 mt-2">
                      Call us for personalized assistance, inquiries, or support. We're just a phone call away!
                    </span>
                    <div className="space-y-4 text-sm mt-3 text-black font-bold">
                      <p className="flex items-center"><FiPhone className="mr-3 text-purple-600" /> +94 74 187 0003</p>
                    </div>
                  </>
                )
              },
              {
                title: "Visit Us",
                content: (
                  <>
                    <div className="h-40 rounded-md overflow-hidden">
                      <Map />
                    </div>
                    <p className="text-sm mt-3 text-black font-bold flex items-center">
                      <FiMapPin className="mr-3 text-purple-600" /> NO.716, Kohalwila Road, Dalugama, Kelaniya
                    </p>
                  </>
                )
              },
              {
                title: "Follow Us",
                content: (
                  <>
                    <span className="block text-base xs:text-lg font-medium text-gray-600 mt-2">
                      Follow us on social media for updates, news, and insights. Stay connected with our latest!
                    </span>
                    <div className="flex space-x-4 mt-5">
                      <a href="https://web.facebook.com/AsipiyaSoftSolutions?mibextid=ZbWKwL&_rdc=1&_rdr" target="_blank" rel="noopener noreferrer"><FaFacebook className="text-purple-600" size={28} /></a>
                      <a href="https://www.instagram.com/asipiyasoftsolutions/" target="_blank" rel="noopener noreferrer"><FaInstagram className="text-purple-600" size={28} /></a>
                      <a href="https://www.linkedin.com/company/asipiya/" target="_blank" rel="noopener noreferrer"><FaLinkedin className="text-purple-600" size={28} /></a>
                    </div>
                  </>
                )
              },
            ].map((card, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="bg-white p-8 rounded-lg shadow-lg h-[370px] w-full"
              >
                <h3 className="text-xl font-bold mb-4">{card.title}</h3>
                {card.content}
              </motion.div>
            ))}
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default ContactUs;
