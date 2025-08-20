import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import GoToTopButton from '../../components/GoToTopButton';

const TermsOfService = () => {
  const [activeSection, setActiveSection] = useState('introduction');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Scroll tracking to update active section
  useEffect(() => {
    const handleScroll = () => {
      const sections = [
        'introduction',
        'parts-agreement',
        'acceptance',
        'description-service',
        'free-trial',
        'signup-obligations',
        'restrictions',
        'spamming-illegal',
        'fees-payments',
        'organization-accounts',
        'personal-info',
        'complaints',
        'inactive-accounts',
        'data-ownership',
        'trademark',
        'disclaimer',
        'intellectual-property',
        'refunds',
        'limitation-liability',
        'governing-law',
        'suspension-termination',
        'modification-terms',
        'contact'
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
    { id: 'parts-agreement', title: 'Parts of Agreement' },
    { id: 'acceptance', title: 'Acceptance' },
    { id: 'description-service', title: 'Description of Service' },
    { id: 'free-trial', title: 'Free Trial' },
    { id: 'signup-obligations', title: 'User Sign-up Obligations' },
    { id: 'restrictions', title: 'Restriction on Use' },
    { id: 'spamming-illegal', title: 'Spamming and Illegal Activities' },
    { id: 'fees-payments', title: 'Fees and Payments' },
    { id: 'organization-accounts', title: 'Organization Accounts' },
    { id: 'personal-info', title: 'Personal Information' },
    { id: 'complaints', title: 'Complaints' },
    { id: 'inactive-accounts', title: 'Inactive User Accounts' },
    { id: 'data-ownership', title: 'Data Ownership' },
    { id: 'trademark', title: 'Trademark' },
    { id: 'disclaimer', title: 'Disclaimer of Warranties' },
    { id: 'intellectual-property', title: 'Intellectual Property' },
    { id: 'refunds', title: 'Refunds' },
    { id: 'limitation-liability', title: 'Limitation of Liability' },
    { id: 'governing-law', title: 'Governing Law' },
    { id: 'suspension-termination', title: 'Suspension and Termination' },
    { id: 'modification-terms', title: 'Modification of Terms' },
    { id: 'contact', title: 'Contact Us' }
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
        className="bg-gradient-to-r from-purple-700 via-purple-800 to-indigo-800 text-white py-16 px-4"
        initial="hidden"
        animate="visible"
        variants={fadeInUp}
      >
        <div className="max-w-4xl mx-auto text-center">
          <motion.h1 
            className="text-4xl md:text-5xl font-bold mb-4"
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Terms of Service
          </motion.h1>
          <motion.p 
            className="text-xl text-purple-200"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Please read these terms carefully before using our services.
          </motion.p>
        </div>
      </motion.section>

      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Table of Contents - Left Sidebar */}
          <motion.div 
            className="lg:w-1/4"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <div className="bg-white rounded-xl shadow-lg p-6 sticky top-24 max-h-[calc(100vh-120px)] overflow-y-auto">
              <h3 className="text-lg font-bold text-gray-800 mb-4 uppercase tracking-wide">
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
            className="lg:w-3/4"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <div className="bg-white rounded-xl shadow-lg p-8 space-y-8">
              
              {/* Introduction */}
              <section id="introduction" className="scroll-mt-24">
                <motion.h2 
                  className="text-3xl font-bold text-gray-800 mb-4"
                  variants={fadeInUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                >
                  Introduction
                </motion.h2>
                <motion.p 
                  className="text-gray-600 leading-relaxed"
                  variants={fadeInUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                >
                  Welcome to <strong>Asipbook</strong>, the platform provided by <strong>Asipiya Soft Solutions Private Limited</strong>, 
                  a subsidiary of <strong>Asipiya International Private Limited</strong>.
                </motion.p>
              </section>

              {/* Parts of this Agreement */}
              <section id="parts-agreement" className="scroll-mt-24">
                <motion.h2 
                  className="text-3xl font-bold text-gray-800 mb-4"
                  variants={fadeInUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                >
                  Parts of this Agreement
                </motion.h2>
                <motion.p 
                  className="text-gray-600 leading-relaxed"
                  variants={fadeInUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                >
                  This Agreement includes General Terms and Service Specific Terms. In case of conflict, Service Specific Terms prevail.
                </motion.p>
              </section>

              {/* Acceptance of the Agreement */}
              <section id="acceptance" className="scroll-mt-24">
                <motion.h2 
                  className="text-3xl font-bold text-gray-800 mb-4"
                  variants={fadeInUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                >
                  Acceptance of the Agreement
                </motion.h2>
                <motion.p 
                  className="text-gray-600 leading-relaxed"
                  variants={fadeInUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                >
                  You must be of legal age to accept this agreement. If you disagree, please do not use the Services.
                </motion.p>
              </section>

              {/* Description of Service */}
              <section id="description-service" className="scroll-mt-24">
                <motion.h2 
                  className="text-3xl font-bold text-gray-800 mb-4"
                  variants={fadeInUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                >
                  Description of Service
                </motion.h2>
                <motion.p 
                  className="text-gray-600 leading-relaxed"
                  variants={fadeInUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                >
                  We offer cloud software accessible via internet browsers. Services can be used for personal, business, or internal organizational purposes.
                </motion.p>
              </section>

              {/* Free Trial */}
              <section id="free-trial" className="scroll-mt-24">
                <motion.h2 
                  className="text-3xl font-bold text-gray-800 mb-4"
                  variants={fadeInUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                >
                  Free Trial
                </motion.h2>
                <motion.ul 
                  className="space-y-2 text-gray-600 list-disc list-inside"
                  variants={fadeInUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                >
                  <li>Ends with trial expiration, subscription start, or Asipbook's discretion.</li>
                  <li>Data may be lost unless a subscription is purchased or data is exported.</li>
                  <li>Free trials are provided as-is without warranties or support.</li>
                </motion.ul>
              </section>

              {/* User Sign-up Obligations */}
              <section id="signup-obligations" className="scroll-mt-24">
                <motion.h2 
                  className="text-3xl font-bold text-gray-800 mb-4"
                  variants={fadeInUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                >
                  User Sign-up Obligations
                </motion.h2>
                <motion.ul 
                  className="space-y-2 text-gray-600 list-disc list-inside"
                  variants={fadeInUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                >
                  <li>Provide true and accurate information during signup.</li>
                  <li>Keep your account information updated.</li>
                  <li>Failure may result in termination of your account.</li>
                </motion.ul>
              </section>

              {/* Restriction on Use */}
              <section id="restrictions" className="scroll-mt-24">
                <motion.h2 
                  className="text-3xl font-bold text-gray-800 mb-4"
                  variants={fadeInUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                >
                  Restriction on Use
                </motion.h2>
                <motion.div 
                  className="text-gray-600 leading-relaxed"
                  variants={fadeInUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                >
                  <p className="mb-3">You agree not to:</p>
                  <ul className="space-y-2 list-disc list-inside ml-4">
                    <li>Transfer, reverse-engineer, or resell the Services without permission.</li>
                    <li>Share licenses across multiple users.</li>
                    <li>Upload or share unauthorized content or access the system unlawfully.</li>
                  </ul>
                </motion.div>
              </section>

              {/* Spamming and Illegal Activities */}
              <section id="spamming-illegal" className="scroll-mt-24">
                <motion.h2 
                  className="text-3xl font-bold text-gray-800 mb-4"
                  variants={fadeInUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                >
                  Spamming and Illegal Activities
                </motion.h2>
                <motion.p 
                  className="text-gray-600 leading-relaxed"
                  variants={fadeInUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                >
                  You are solely responsible for your data and agree not to submit false or harmful information.
                </motion.p>
              </section>

              {/* Fees and Payments */}
              <section id="fees-payments" className="scroll-mt-24">
                <motion.h2 
                  className="text-3xl font-bold text-gray-800 mb-4"
                  variants={fadeInUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                >
                  Fees and Payments
                </motion.h2>
                <motion.ul 
                  className="space-y-2 text-gray-600 list-disc list-inside"
                  variants={fadeInUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                >
                  <li>Services may carry fees based on subscription plans.</li>
                  <li>Auto-renewal applies unless canceled 7 days before the renewal date.</li>
                  <li>Price changes take effect after the current billing cycle ends.</li>
                </motion.ul>
              </section>

              {/* Organization Accounts and Administrators */}
              <section id="organization-accounts" className="scroll-mt-24">
                <motion.h2 
                  className="text-3xl font-bold text-gray-800 mb-4"
                  variants={fadeInUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                >
                  Organization Accounts and Administrators
                </motion.h2>
                <motion.ul 
                  className="space-y-2 text-gray-600 list-disc list-inside"
                  variants={fadeInUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                >
                  <li>You are responsible for account access, security, and administrator roles.</li>
                  <li>Asipbook does not manage internal administration for you.</li>
                </motion.ul>
              </section>

              {/* Personal Information and Privacy */}
              <section id="personal-info" className="scroll-mt-24">
                <motion.h2 
                  className="text-3xl font-bold text-gray-800 mb-4"
                  variants={fadeInUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                >
                  Personal Information and Privacy
                </motion.h2>
                <motion.p 
                  className="text-gray-600 leading-relaxed"
                  variants={fadeInUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                >
                  Your data is governed by our Privacy Policy. You're responsible for keeping your credentials confidential.
                </motion.p>
              </section>

              {/* Complaints */}
              <section id="complaints" className="scroll-mt-24">
                <motion.h2 
                  className="text-3xl font-bold text-gray-800 mb-4"
                  variants={fadeInUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                >
                  Complaints
                </motion.h2>
                <motion.p 
                  className="text-gray-600 leading-relaxed"
                  variants={fadeInUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                >
                  Complaints will be forwarded to your email. You must respond directly to the complainant within 10 days.
                </motion.p>
              </section>

              {/* Inactive User Accounts */}
              <section id="inactive-accounts" className="scroll-mt-24">
                <motion.h2 
                  className="text-3xl font-bold text-gray-800 mb-4"
                  variants={fadeInUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                >
                  Inactive User Accounts
                </motion.h2>
                <motion.p 
                  className="text-gray-600 leading-relaxed"
                  variants={fadeInUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                >
                  Accounts inactive for 120 days may be terminated and all data deleted.
                </motion.p>
              </section>

              {/* Data Ownership */}
              <section id="data-ownership" className="scroll-mt-24">
                <motion.h2 
                  className="text-3xl font-bold text-gray-800 mb-4"
                  variants={fadeInUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                >
                  Data Ownership
                </motion.h2>
                <motion.p 
                  className="text-gray-600 leading-relaxed"
                  variants={fadeInUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                >
                  You retain full ownership of your stored data. We will not use or modify it without your permission.
                </motion.p>
              </section>

              {/* Trademark */}
              <section id="trademark" className="scroll-mt-24">
                <motion.h2 
                  className="text-3xl font-bold text-gray-800 mb-4"
                  variants={fadeInUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                >
                  Trademark
                </motion.h2>
                <motion.p 
                  className="text-gray-600 leading-relaxed"
                  variants={fadeInUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                >
                  'Asipbook' and its logos are trademarks of Asipiya Soft Solutions Private Limited. Unauthorized use is prohibited.
                </motion.p>
              </section>

              {/* Disclaimer of Warranties */}
              <section id="disclaimer" className="scroll-mt-24">
                <motion.h2 
                  className="text-3xl font-bold text-gray-800 mb-4"
                  variants={fadeInUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                >
                  Disclaimer of Warranties
                </motion.h2>
                <motion.p 
                  className="text-gray-600 leading-relaxed"
                  variants={fadeInUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                >
                  Services are provided "as is" without warranties of any kind including availability, performance, or virus protection.
                </motion.p>
              </section>

              {/* Intellectual Property */}
              <section id="intellectual-property" className="scroll-mt-24">
                <motion.h2 
                  className="text-3xl font-bold text-gray-800 mb-4"
                  variants={fadeInUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                >
                  Intellectual Property
                </motion.h2>
                <motion.p 
                  className="text-gray-600 leading-relaxed"
                  variants={fadeInUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                >
                  All platform content belongs to Asipiya International (Pvt) Ltd or its licensors. You are granted limited rights to use the platform.
                </motion.p>
              </section>

              {/* Refunds */}
              <section id="refunds" className="scroll-mt-24">
                <motion.h2 
                  className="text-3xl font-bold text-gray-800 mb-4"
                  variants={fadeInUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                >
                  Refunds
                </motion.h2>
                <motion.p 
                  className="text-gray-600 leading-relaxed"
                  variants={fadeInUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                >
                  No refunds are provided. Please review plans and services carefully before purchasing.
                </motion.p>
              </section>

              {/* Limitation of Liability */}
              <section id="limitation-liability" className="scroll-mt-24">
                <motion.h2 
                  className="text-3xl font-bold text-gray-800 mb-4"
                  variants={fadeInUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                >
                  Limitation of Liability
                </motion.h2>
                <motion.p 
                  className="text-gray-600 leading-relaxed"
                  variants={fadeInUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                >
                  Asipiya is not liable for any indirect, incidental, or consequential damages, including business or data loss.
                </motion.p>
              </section>

              {/* Governing Law */}
              <section id="governing-law" className="scroll-mt-24">
                <motion.h2 
                  className="text-3xl font-bold text-gray-800 mb-4"
                  variants={fadeInUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                >
                  Governing Law
                </motion.h2>
                <motion.p 
                  className="text-gray-600 leading-relaxed"
                  variants={fadeInUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                >
                  These terms are governed by the laws of Sri Lanka.
                </motion.p>
              </section>

              {/* Suspension and Termination */}
              <section id="suspension-termination" className="scroll-mt-24">
                <motion.h2 
                  className="text-3xl font-bold text-gray-800 mb-4"
                  variants={fadeInUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                >
                  Suspension and Termination
                </motion.h2>
                <motion.p 
                  className="text-gray-600 leading-relaxed"
                  variants={fadeInUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                >
                  Accounts may be suspended or terminated for illegal activity, inactivity, or by government request.
                </motion.p>
              </section>

              {/* Modification of Terms */}
              <section id="modification-terms" className="scroll-mt-24">
                <motion.h2 
                  className="text-3xl font-bold text-gray-800 mb-4"
                  variants={fadeInUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                >
                  Modification of Terms
                </motion.h2>
                <motion.p 
                  className="text-gray-600 leading-relaxed"
                  variants={fadeInUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                >
                  Terms may be updated at any time. Changes will be posted, and you're advised to review them regularly.
                </motion.p>
              </section>

              {/* Contact Us */}
              <section id="contact" className="scroll-mt-24">
                <motion.h2 
                  className="text-3xl font-bold text-gray-800 mb-4"
                  variants={fadeInUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                >
                  Contact Us
                </motion.h2>
                <motion.div 
                  className="text-gray-600 leading-relaxed"
                  variants={fadeInUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                >
                  <p className="mb-4">If you have questions about these Terms, contact us:</p>
                  <div className="space-y-2">
                    <p><strong>Phone:</strong> +94 74 187 0003 / +94 77 403 0083</p>
                    <p><strong>Email:</strong> info@asipiya.lk, asipiyasoftsolution@gmail.com, asipiyainternational@gmail.com</p>
                    <p><strong>Website:</strong> www.asipiya.lk</p>
                  </div>
                  <p className="mt-4 text-sm text-gray-500"><strong>Last updated:</strong> June 2025</p>
                </motion.div>
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

export default TermsOfService;
