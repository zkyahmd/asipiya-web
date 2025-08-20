import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import GoToTopButton from '../../components/GoToTopButton';

const PrivacyPolicy = () => {
  const [activeSection, setActiveSection] = useState('introduction');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Scroll tracking to update active section
  useEffect(() => {
    const handleScroll = () => {
      const sections = [
        'introduction',
        'info-collect',
        'use-info',
        'info-sharing',
        'retention',
        'data-security',
        'dpo',
        'cookies',
        'legal-disclosure',
        'compliance',
        'changes'
      ];

      const scrollPosition = window.scrollY + 200; // Offset for better UX

      for (let i = sections.length - 1; i >= 0; i--) {
        const element = document.getElementById(sections[i]);
        if (element && element.offsetTop <= scrollPosition) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const tableOfContents = [
    { id: 'introduction', title: 'Introduction' },
    { id: 'info-collect', title: 'Information We Collect' },
    { id: 'use-info', title: 'Use of Information' },
    { id: 'info-sharing', title: 'Information Sharing' },
    { id: 'retention', title: 'Retention of Information' },
    { id: 'data-security', title: 'Data Security' },
    { id: 'dpo', title: 'Data Protection Officer' },
    { id: 'cookies', title: 'Cookies and Tracking' },
    { id: 'legal-disclosure', title: 'Legal Disclosures' },
    { id: 'compliance', title: 'Compliance' },
    { id: 'changes', title: 'Policy Changes' }
  ];

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(sectionId);
    }
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      {/* Header Section */}
      <motion.section 
        className="bg-gradient-to-r from-purple-700 via-purple-800 to-indigo-800 text-white py-16 px-4 sm:py-20 sm:px-6 lg:py-24"
        initial="hidden"
        animate="visible"
        variants={fadeInUp}
      >
        <div className="max-w-4xl mx-auto text-center">
          <motion.h1 
            className="text-4xl md:text-5xl font-bold mb-4 sm:text-3xl md:text-4xl"
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Privacy Policy
          </motion.h1>
          <motion.p 
            className="text-xl text-purple-200 sm:text-base md:text-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Your privacy matters to us. Learn how we protect your data.
          </motion.p>
        </div>
      </motion.section>

      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-8 sm:gap-12">
          {/* Table of Contents - Left Sidebar */}
          <motion.div 
            className="lg:w-1/4 w-full"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <div className="bg-white rounded-xl shadow-lg p-6 sticky top-24 lg:relative lg:top-auto">
              <h3 className="text-lg font-bold text-gray-800 mb-4 uppercase tracking-wide sm:text-base">
                Table of Contents
              </h3>
              <nav className="space-y-2">
                {tableOfContents.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className={`block w-full text-left px-3 py-2 rounded-lg transition-all duration-200 text-sm ${
                      activeSection === item.id
                        ? 'bg-purple-100 text-purple-700 font-semibold'
                        : 'text-gray-600 hover:bg-gray-100 hover:text-gray-800'
                    }`}
                  >
                    {item.title}
                  </button>
                ))}
              </nav>
            </div>
          </motion.div>

          {/* Content - Right Side */}
          <motion.div 
            className="lg:w-3/4 w-full"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <div className="bg-white rounded-xl shadow-lg p-8 space-y-8 sm:p-6 sm:space-y-6">
              
              {/* Introduction */}
              <section id="introduction" className="scroll-mt-24 sm:scroll-mt-16">
                <motion.h2 
                  className="text-3xl font-bold text-gray-800 mb-4 sm:text-2xl"
                  variants={fadeInUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                >
                  Introduction
                </motion.h2>
                <motion.p 
                  className="text-gray-600 leading-relaxed sm:text-sm"
                  variants={fadeInUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                >
                  Thank you for choosing our services offered by <strong>Asipiya Soft Solutions Private Limited</strong>, 
                  a subsidiary of <strong>Asipiya International Private Limited</strong>. At Asipiya, we care deeply about 
                  your privacy. We only request the minimal information necessary to provide our services and are committed 
                  to protecting your personal data.
                </motion.p>
              </section>

              {/* Information We Collect */}
              <section id="info-collect" className="scroll-mt-24 sm:scroll-mt-16">
                <motion.h2 
                  className="text-3xl font-bold text-gray-800 mb-6 sm:text-2xl"
                  variants={fadeInUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                >
                  Information We Collect
                </motion.h2>
                
                <div className="space-y-6 sm:space-y-4">
                  <motion.div 
                    variants={fadeInUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                  >
                    <h3 className="text-xl font-semibold text-gray-800 mb-3 sm:text-lg">
                      Provided by You
                    </h3>
                    <ul className="space-y-2 text-gray-600 sm:text-sm">
                      <li>
                        <strong>Account Information:</strong> We collect personal details such as name,
                        email, phone number, and login credentials when you sign up.
                      </li>
                      <li>
                        <strong>Payment Information:</strong> When subscribing to a plan, we collect
                        relevant billing details. These are used strictly for processing and are
                        stored only when needed for recurring payments or legal obligations.
                      </li>
                    </ul>
                  </motion.div>

                  <motion.div 
                    variants={fadeInUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                  >
                    <h3 className="text-xl font-semibold text-gray-800 mb-3 sm:text-lg">
                      Collected Automatically
                    </h3>
                    <ul className="space-y-2 text-gray-600 sm:text-sm">
                      <li>
                        <strong>Usage Information:</strong> Includes feature usage, time spent, clicks,
                        scrolls, errors, and settings.
                      </li>
                      <li>
                        <strong>Device Information:</strong> Includes IP address, browser type,
                        operating system, and device model for compatibility and performance
                        optimization.
                      </li>
                    </ul>
                  </motion.div>

                  <motion.div 
                    variants={fadeInUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                  >
                    <h3 className="text-xl font-semibold text-gray-800 mb-3 sm:text-lg">
                      From Third Parties
                    </h3>
                    <ul className="space-y-2 text-gray-600 sm:text-sm">
                      <li>
                        <strong>Login Information:</strong> If using social logins like Google or Facebook,
                        we may receive basic profile and email data to ease sign-in.
                      </li>
                    </ul>
                  </motion.div>
                </div>
              </section>

              {/* Use of Information */}
              <section id="use-info" className="scroll-mt-24 sm:scroll-mt-16">
                <motion.h2 
                  className="text-3xl font-bold text-gray-800 mb-4 sm:text-2xl"
                  variants={fadeInUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                >
                  Use of Information
                </motion.h2>
                <motion.ul 
                  className="space-y-2 text-gray-600 list-disc list-inside sm:text-sm"
                  variants={fadeInUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                >
                  <li>To communicate with you about services, updates, notifications, support, and
                    promotions.</li>
                  <li>To deliver, support, and improve our platform and services.</li>
                  <li>To personalize user experience and analyze feedback and usage behavior.
                  </li>
                  <li>To process transactions, manage billing, and notify of any issues.</li>
                  <li>To detect and prevent fraudulent activities and ensure security.</li>
                  <li>To perform analytics for service and experience improvements.</li>
                </motion.ul>
              </section>

              {/* Information Sharing */}
              <section id="info-sharing" className="scroll-mt-24 sm:scroll-mt-16">
                <motion.h2 
                  className="text-3xl font-bold text-gray-800 mb-4 sm:text-2xl"
                  variants={fadeInUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                >
                  Information Sharing
                </motion.h2>
                <motion.ul 
                  className="space-y-2 text-gray-600 list-disc list-inside sm:text-sm"
                  variants={fadeInUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                >
                  <li>
                    <strong>With Your Consent:</strong> We share data only when you give explicit
                    permission.
                  </li>
                  <li>
                    <strong>Employees:</strong> Shared internally only for operational purposes with
                    confidentiality obligations.
                  </li>
                  <li>
                    <strong>Service Providers:</strong> Used for payment processing, analytics, or support
                    under strict terms.
                  </li>
                  <li>
                    <strong>Legal Compliance:</strong> Disclosed when required by law or government
                    authorities.
                  </li>
                  <li>
                    <strong>Protection of Rights:</strong> Shared to protect Asipiya's legal interests or
                    public safety.
                  </li>
                </motion.ul>
              </section>

              {/* Retention of Information */}
              <section id="retention" className="scroll-mt-24 sm:scroll-mt-16">
                <motion.h2 
                  className="text-3xl font-bold text-gray-800 mb-4 sm:text-2xl"
                  variants={fadeInUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                >
                  Retention of Information
                </motion.h2>
                <motion.p 
                  className="text-gray-600 leading-relaxed sm:text-sm"
                  variants={fadeInUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                >
                  We retain your personal data as long as necessary to fulfill the purposes outlined in
                  this policy. In some cases, we may retain it longer for legal or compliance reasons.
                  Once no longer required, your data will be deleted or anonymized from our active
                  systems and backups.
                </motion.p>
              </section>

              {/* Data Security */}
              <section id="data-security" className="scroll-mt-24 sm:scroll-mt-16">
                <motion.h2 
                  className="text-3xl font-bold text-gray-800 mb-4 sm:text-2xl"
                  variants={fadeInUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                >
                  Data Security
                </motion.h2>
                <motion.p 
                  className="text-gray-600 leading-relaxed sm:text-sm"
                  variants={fadeInUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                >
                  We implement administrative, technical, and physical safeguards to protect your
                  data. Please refer to our Security Policy for more details.
                </motion.p>
              </section>

              {/* Data Protection Officer */}
              <section id="dpo" className="scroll-mt-24 sm:scroll-mt-16">
                <motion.h2 
                  className="text-3xl font-bold text-gray-800 mb-4 sm:text-2xl"
                  variants={fadeInUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                >
                  Data Protection Officer
                </motion.h2>
                <motion.p 
                  className="text-gray-600 leading-relaxed sm:text-sm"
                  variants={fadeInUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                >
                  We've appointed a Data Protection Officer (DPO) to oversee compliance. For any
                  concerns or queries, you may contact the DPO via email at
                  <strong>privacy@asipiya.com</strong>.
                </motion.p>
              </section>

              {/* Cookies and Tracking Technologies */}
              <section id="cookies" className="scroll-mt-24 sm:scroll-mt-16">
                <motion.h2 
                  className="text-3xl font-bold text-gray-800 mb-4 sm:text-2xl"
                  variants={fadeInUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                >
                  Cookies and Tracking Technologies
                </motion.h2>
                <motion.p 
                  className="text-gray-600 leading-relaxed sm:text-sm"
                  variants={fadeInUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                >
                  We use persistent cookies to enhance your experience. These cookies remain on
                  your browser until you delete them or they expire.
                </motion.p>
              </section>

              {/* Disclosures for Legal Obligations */}
              <section id="legal-disclosure" className="scroll-mt-24 sm:scroll-mt-16">
                <motion.h2 
                  className="text-3xl font-bold text-gray-800 mb-4 sm:text-2xl"
                  variants={fadeInUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                >
                  Disclosures for Legal Obligations
                </motion.h2>
                <motion.p 
                  className="text-gray-600 leading-relaxed sm:text-sm"
                  variants={fadeInUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                >
                  If required by law or national security demands, we may preserve or disclose
                  your data to relevant authorities.
                </motion.p>
              </section>

              {/* Compliance with this Policy */}
              <section id="compliance" className="scroll-mt-24 sm:scroll-mt-16">
                <motion.h2 
                  className="text-3xl font-bold text-gray-800 mb-4 sm:text-2xl"
                  variants={fadeInUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                >
                  Compliance with this Policy
                </motion.h2>
                <motion.p 
                  className="text-gray-600 leading-relaxed sm:text-sm"
                  variants={fadeInUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                >
                  We conduct periodic reviews to ensure compliance. If you have any concerns,
                  please email us at <strong>privacy@asipiya.com</strong>. We will work with
                  appropriate regulatory authorities to address them.
                </motion.p>
              </section>

              {/* Changes to Privacy Policy */}
              <section id="changes" className="scroll-mt-24 sm:scroll-mt-16">
                <motion.h2 
                  className="text-3xl font-bold text-gray-800 mb-4 sm:text-2xl"
                  variants={fadeInUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                >
                  Changes to Privacy Policy
                </motion.h2>
                <motion.p 
                  className="text-gray-600 leading-relaxed sm:text-sm"
                  variants={fadeInUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                >
                  This Privacy Policy may be updated anytime. You will be notified via
                  service announcements or emails (make sure your email is verified).
                  For significant changes, we'll notify you 30 days in advance.
                </motion.p>
              </section>
            </div>
          </motion.div>
        </div>
      </div>

      <GoToTopButton />
      <Footer />
    </div>
  );
};

export default PrivacyPolicy;
