// src/pages/OpportunityDetail.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import GoToTopButton from '../components/GoToTopButton';
import { motion } from 'framer-motion';
import { PulseBeamsSecond } from '../components/motion/PulseBeamsSecond';
import job from '../assets/career/job.avif';
import { ParallaxProvider } from 'react-scroll-parallax';

const inputFadeIn = {
  hidden: { opacity: 0, y: 50, scale: 0.9, rotateX: -15, transformOrigin: 'bottom center' },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    rotateX: 0,
    transition: {
      type: 'spring',
      stiffness: 200,
      damping: 20,
      delay: i * 0.08,
      duration: 0.6,
    },
  }),
};

// Helper function to safely parse array data
const safeParseArray = (data) => {
  if (Array.isArray(data)) {
    return data;
  }
  if (typeof data === 'string') {
    // Try to parse as JSON first
    try {
      const parsed = JSON.parse(data);
      return Array.isArray(parsed) ? parsed : [data];
    } catch {
      // If JSON parsing fails, treat as a single string item
      return data.trim() ? [data] : [];
    }
  }
  return [];
};

export default function OpportunityDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [opportunity, setOpportunity] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    emailAddress: '',
    contactNumber: '',
    positionApplied: '',
    linkedinProfile: '',
    nicNumber: '',
    cvFile: null,
  });

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/jobs/${id}`);
        const data = res.data;
        setOpportunity(data);
        setFormData((prev) => ({
          ...prev,
          positionApplied: data.title || '',
        }));
      } catch (err) {
        setError('Job not found');
      } finally {
        setLoading(false);
        window.scrollTo(0, 0);
      }
    };
    fetchJob();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const subject = `Job Application: ${formData.positionApplied}`;
    const body = `
Full Name: ${formData.fullName}
Email Address: ${formData.emailAddress}
Contact Number: ${formData.contactNumber}
Position Applied For: ${formData.positionApplied}
LinkedIn Profile: ${formData.linkedinProfile || 'N/A'}
NIC Number: ${formData.nicNumber || 'N/A'}

(Please attach CV manually)
    `;
    window.location.href = `mailto:info@asipiya.lk?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setFormSubmitted(true);
    setFormData({
      fullName: '',
      emailAddress: '',
      contactNumber: '',
      positionApplied: opportunity.title || '',
      linkedinProfile: '',
      nicNumber: '',
      cvFile: null,
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-700 text-xl">
        Loading...
      </div>
    );
  }

  if (error || !opportunity) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-gray-700 text-center px-4">
        <h2 className="text-3xl font-bold text-red-600 mb-4">Opportunity Not Found</h2>
        <p className="mb-4">{error || 'This job may have been removed or does not exist.'}</p>
        <button
          onClick={() => navigate('/careers')}
          className="px-6 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
        >
          Back to Careers
        </button>
      </div>
    );
  }

  const {
    title,
    location,
    type,
    description,
    requirements,
    responsibilities,
    application_deadline,
    benefits,
    postedDate,
  } = opportunity;

  // Use the safe parsing function
  const parsedRequirements = safeParseArray(requirements);
  const parsedResponsibilities = safeParseArray(responsibilities);
  const parsedBenefits = safeParseArray(benefits); 

  return (
    <ParallaxProvider>
      <div className="font-sans text-gray-800 bg-purple-30">
        <Navbar />
        <div className="font-sans text-gray-800 flex-1">
          <PulseBeamsSecond bannerSrc={job}>
            <motion.div
              className="relative z-10 w-full flex flex-col items-center justify-center text-center px-4 py-16 md:py-24 lg:py-32 max-w-7xl mx-auto"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
            >
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white tracking-tight">
                {title}
              </h1>
              <p className="mt-4 text-lg md:text-xl text-purple-100 font-semibold">
                {location} &bull; {type}
              </p>
              <motion.a
                href="#apply-form"
                className="mt-8 inline-flex items-center px-8 py-3 bg-white text-purple-900 rounded-full hover:bg-gray-100 transition-all"
              >
                Apply Now
              </motion.a>
            </motion.div>
          </PulseBeamsSecond>
        </div>

        <div className="max-w-4xl mx-auto px-4 py-8 md:py-12">
          <button
            onClick={() => navigate('/careers')}
            className="inline-flex items-center px-6 py-2 bg-purple-100 text-purple-700 rounded-full hover:bg-purple-200 mb-10"
          >
            ← Back to Careers
          </button>

          <div className="bg-purple-50 p-6 rounded-lg shadow-lg border mb-10">
            <h2 className="text-3xl font-bold text-purple-700 mb-2">Job Description</h2>
            <p className="text-sm text-gray-500 mb-6">
              Posted: {postedDate ? new Date(postedDate).toLocaleDateString() : new Date().toLocaleDateString()}
            </p>
            <p className="mb-6 text-gray-700">{description}</p>

            {parsedRequirements.length > 0 && (
              <div className="mb-6">
                <h3 className="text-2xl font-semibold mb-3 border-b pb-2">Requirements</h3>
                <ul className="list-disc list-inside space-y-2 text-gray-700">
                  {parsedRequirements.map((req, i) => <li key={i}>{req}</li>)}
                </ul>
              </div>
            )}

            {parsedResponsibilities.length > 0 && (
              <div>
                <h3 className="text-2xl font-semibold mb-3 border-b pb-2">Responsibilities</h3>
                <ul className="list-disc list-inside space-y-2 text-gray-700">
                  {parsedResponsibilities.map((res, i) => <li key={i}>{res}</li>)}
                </ul>
              </div>
            )}

            {parsedBenefits.length > 0 && (
              <div>
                <h3 className="text-2xl font-semibold mb-3 border-b pb-2">Benefits</h3>
                <ul className="list-disc list-inside space-y-2 text-gray-700">
                  {parsedBenefits.map((benefit, i) => <li key={i}>{benefit}</li>)}
                </ul>
              </div>
            )}

            {application_deadline && (
              <div className="mt-6">
                <h3 className="text-2xl font-semibold mb-3 border-b pb-2">Application Deadline</h3>
                <p className="text-gray-700 font-medium text-lg">
                  {new Date(application_deadline).toLocaleDateString()}
                </p>
              </div>
            )}
          </div>

          {/* Application Form */}
          <section id="apply-form">
            <motion.div
              className="p-8 md:p-12 bg-white border shadow-xl rounded-2xl"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
              variants={inputFadeIn}
            >
              <h2 className="text-3xl font-bold text-center text-gray-900 mb-4">
                Apply for this Position
              </h2>
              {formSubmitted ? (
                <motion.div
                  className="text-center p-6 bg-green-50 text-green-700 rounded-lg"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                >
                  <p className="text-lg font-medium">
                    Thank you for your application!
                  </p>
                  <button
                    onClick={() => setFormSubmitted(false)}
                    className="mt-4 px-6 py-2 bg-purple-600 text-white rounded-full"
                  >
                    Apply for another job
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {[
                    { label: 'Full Name', name: 'fullName', type: 'text', required: true },
                    { label: 'Email Address', name: 'emailAddress', type: 'email', required: true },
                    { label: 'Contact Number', name: 'contactNumber', type: 'tel', required: true },
                    { label: 'Position Applied For', name: 'positionApplied', type: 'text', required: true },
                    { label: 'LinkedIn Profile', name: 'linkedinProfile', type: 'url', required: false },
                    { label: 'NIC Number', name: 'nicNumber', type: 'text', required: false },
                  ].map((field, i) => (
                    <motion.div key={field.name} custom={i} initial="hidden" animate="visible" variants={inputFadeIn}>
                      <label htmlFor={field.name} className="block font-medium text-gray-700 mb-1">
                        {field.label} {field.required && '*'}
                      </label>
                      <motion.input
                        type={field.type}
                        name={field.name}
                        id={field.name}
                        value={formData[field.name]}
                        onChange={handleInputChange}
                        required={field.required}
                        className="w-full px-4 py-3 border rounded-md shadow-sm"
                      />
                    </motion.div>
                  ))}

                  <motion.div custom={6} initial="hidden" animate="visible" variants={inputFadeIn}>
                    <label htmlFor="cvFile" className="block font-medium text-gray-700 mb-1">
                      Upload CV *
                    </label>
                    <div className="flex items-center border rounded-md bg-white">
                      <input
                        type="file"
                        id="cvFile"
                        name="cvFile"
                        accept=".pdf,.doc,.docx"
                        onChange={handleInputChange}
                        required
                        className="hidden"
                      />
                      <label htmlFor="cvFile" className="flex-grow py-3 px-4 text-gray-500 cursor-pointer truncate">
                        {formData.cvFile ? formData.cvFile.name : 'No file chosen (PDF, DOC, DOCX)'}
                      </label>
                      <button
                        type="button"
                        onClick={() => document.getElementById('cvFile').click()}
                        className="px-6 py-3 bg-gray-200 text-gray-700 rounded-r-md"
                      >
                        Browse
                      </button>
                    </div>
                  </motion.div>

                  <motion.div custom={7} initial="hidden" animate="visible" variants={inputFadeIn}>
                    <motion.button
                      type="submit"
                      whileHover={{ scale: 1.05 }}
                      className="w-full py-3 px-6 bg-purple-600 text-white rounded-md"
                    >
                      Submit Application
                    </motion.button>
                  </motion.div>
                </form>
              )}
            </motion.div>
          </section>
        </div>
        <GoToTopButton />
        <Footer />
      </div>
    </ParallaxProvider>
  );
}