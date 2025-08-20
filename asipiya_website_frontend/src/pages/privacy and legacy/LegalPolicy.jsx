import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import GoToTopButton from '../../components/GoToTopButton';

const LegalPolicy = () => {
  const [activeSection, setActiveSection] = useState('introduction');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Scroll tracking to update active section
  useEffect(() => {
    const handleScroll = () => {
      const sections = [
        'introduction',
        'patent-information',
        'trademark-information',
        'copyright-information',
        'anti-piracy',
        'infringement-notices',
        'risk-of-loss',
        'licensing-support',
        'governing-law'
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
    { id: 'patent-information', title: 'Patent Information' },
    { id: 'trademark-information', title: 'Trademark Information' },
    { id: 'copyright-information', title: 'Copyright Information' },
    { id: 'anti-piracy', title: 'Anti-Piracy Statement' },
    { id: 'infringement-notices', title: 'Infringement Notices' },
    { id: 'risk-of-loss', title: 'Risk of Loss' },
    { id: 'licensing-support', title: 'Licensing and Support' },
    { id: 'governing-law', title: 'Governing Law' }
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
            Legal Policy
          </motion.h1>
          <motion.p 
            className="text-xl text-purple-200"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Comprehensive legal information and intellectual property policies.
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
                  This Legal Policy outlines the intellectual property rights, legal protections, and compliance requirements 
                  governing the use of services provided by <strong>Asipiya International Private Limited</strong> and its 
                  subsidiaries. By using our services, you agree to comply with all applicable laws and respect our intellectual 
                  property rights.
                </motion.p>
              </section>

              {/* Patent Information */}
              <section id="patent-information" className="scroll-mt-24">
                <motion.h2 
                  className="text-3xl font-bold text-gray-800 mb-4"
                  variants={fadeInUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                >
                  Patent Information
                </motion.h2>
                <motion.div 
                  className="text-gray-600 leading-relaxed space-y-4"
                  variants={fadeInUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                >
                  <p>
                    <strong>Asipiya International Private Limited</strong> may hold various patents and patent applications 
                    related to our software technologies, business processes, and innovative solutions. These patents protect 
                    our proprietary methods and technologies.
                  </p>
                  <h4 className="text-lg font-semibold text-gray-800 mt-6 mb-3">Patent Protection Scope</h4>
                  <ul className="space-y-2 list-disc list-inside ml-4">
                    <li>Software algorithms and computational methods</li>
                    <li>Business process innovations</li>
                    <li>User interface designs and interaction methods</li>
                    <li>Data processing and management techniques</li>
                    <li>Integration and automation technologies</li>
                  </ul>
                  <p className="mt-4">
                    <strong>Patent Licensing:</strong> Any use of our patented technologies requires proper licensing. 
                    Unauthorized use may result in legal action. For licensing inquiries, please contact our legal department.
                  </p>
                </motion.div>
              </section>

              {/* Trademark Information */}
              <section id="trademark-information" className="scroll-mt-24">
                <motion.h2 
                  className="text-3xl font-bold text-gray-800 mb-4"
                  variants={fadeInUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                >
                  Trademark Information
                </motion.h2>
                <motion.div 
                  className="text-gray-600 leading-relaxed space-y-4"
                  variants={fadeInUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                >
                  <p>
                    The following trademarks are owned by <strong>Asipiya International Private Limited</strong> and are 
                    protected under applicable trademark laws:
                  </p>
                  <h4 className="text-lg font-semibold text-gray-800 mt-6 mb-3">Registered Trademarks</h4>
                  <ul className="space-y-2 list-disc list-inside ml-4">
                    <li><strong>ASIPIYA®</strong> - Company name and brand</li>
                    <li><strong>ASIPBOOK®</strong> - Software platform and services</li>
                    <li><strong>ASIPIYA LOGO®</strong> - Company logo and visual identity</li>
                    <li>Associated taglines and slogans</li>
                  </ul>
                  <h4 className="text-lg font-semibold text-gray-800 mt-6 mb-3">Trademark Usage Guidelines</h4>
                  <ul className="space-y-2 list-disc list-inside ml-4">
                    <li>Unauthorized use of our trademarks is strictly prohibited</li>
                    <li>Trademarks must be used with proper attribution when permitted</li>
                    <li>Commercial use requires written permission</li>
                    <li>Trademarks cannot be used in a way that suggests endorsement</li>
                  </ul>
                </motion.div>
              </section>

              {/* Copyright Information */}
              <section id="copyright-information" className="scroll-mt-24">
                <motion.h2 
                  className="text-3xl font-bold text-gray-800 mb-4"
                  variants={fadeInUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                >
                  Copyright Information
                </motion.h2>
                <motion.div 
                  className="text-gray-600 leading-relaxed space-y-4"
                  variants={fadeInUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                >
                  <p>
                    All content, software, documentation, and materials provided through our services are protected by copyright 
                    laws and are the exclusive property of <strong>Asipiya International Private Limited</strong> unless 
                    otherwise stated.
                  </p>
                  <h4 className="text-lg font-semibold text-gray-800 mt-6 mb-3">Copyright Protected Materials</h4>
                  <ul className="space-y-2 list-disc list-inside ml-4">
                    <li>Software source code and compiled applications</li>
                    <li>User interfaces and graphics</li>
                    <li>Documentation and user manuals</li>
                    <li>Website content and design</li>
                    <li>Marketing materials and presentations</li>
                    <li>Training materials and educational content</li>
                  </ul>
                  <h4 className="text-lg font-semibold text-gray-800 mt-6 mb-3">Copyright Notice</h4>
                  <div className="bg-gray-100 p-4 rounded-lg">
                    <p className="font-mono text-sm">
                      © 2024 Asipiya International Private Limited. All rights reserved.
                    </p>
                  </div>
                </motion.div>
              </section>

              {/* Anti-Piracy Statement */}
              <section id="anti-piracy" className="scroll-mt-24">
                <motion.h2 
                  className="text-3xl font-bold text-gray-800 mb-4"
                  variants={fadeInUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                >
                  Anti-Piracy Statement
                </motion.h2>
                <motion.div 
                  className="text-gray-600 leading-relaxed space-y-4"
                  variants={fadeInUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                >
                  <p>
                    <strong>Asipiya International Private Limited</strong> is committed to protecting intellectual property 
                    rights and combating software piracy. We take unauthorized use and distribution of our software very seriously.
                  </p>
                  <h4 className="text-lg font-semibold text-gray-800 mt-6 mb-3">Prohibited Activities</h4>
                  <ul className="space-y-2 list-disc list-inside ml-4">
                    <li>Unauthorized copying, distribution, or sharing of our software</li>
                    <li>Reverse engineering or decompiling our applications</li>
                    <li>Creating or distributing cracked versions</li>
                    <li>Using unlicensed or pirated versions of our software</li>
                    <li>Sharing login credentials or license keys</li>
                  </ul>
                  <h4 className="text-lg font-semibold text-gray-800 mt-6 mb-3">Enforcement Actions</h4>
                  <p>
                    We actively monitor for unauthorized use and will pursue legal action against violators, including:
                  </p>
                  <ul className="space-y-2 list-disc list-inside ml-4">
                    <li>Civil litigation for damages</li>
                    <li>Injunctive relief to stop unauthorized use</li>
                    <li>Criminal prosecution where applicable</li>
                    <li>Account termination and service suspension</li>
                  </ul>
                </motion.div>
              </section>

              {/* Infringement Notices */}
              <section id="infringement-notices" className="scroll-mt-24">
                <motion.h2 
                  className="text-3xl font-bold text-gray-800 mb-4"
                  variants={fadeInUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                >
                  Infringement Notices
                </motion.h2>
                <motion.div 
                  className="text-gray-600 leading-relaxed space-y-4"
                  variants={fadeInUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                >
                  <p>
                    If you believe that your intellectual property rights have been infringed by content or activities 
                    on our platform, or if you wish to report suspected infringement of our rights, please follow our 
                    notice and takedown procedures.
                  </p>
                  <h4 className="text-lg font-semibold text-gray-800 mt-6 mb-3">Filing an Infringement Notice</h4>
                  <p>Your notice must include:</p>
                  <ul className="space-y-2 list-disc list-inside ml-4">
                    <li>Identification of the copyrighted work or intellectual property</li>
                    <li>Description of the allegedly infringing material</li>
                    <li>Your contact information and signature</li>
                    <li>A statement of good faith belief that use is unauthorized</li>
                    <li>A statement that the information is accurate</li>
                  </ul>
                  <h4 className="text-lg font-semibold text-gray-800 mt-6 mb-3">Contact Information</h4>
                  <div className="bg-gray-100 p-4 rounded-lg">
                    <p><strong>Legal Department</strong></p>
                    <p>Email: legal@asipiya.lk</p>
                    <p>Phone: +94 74 187 0003</p>
                    <p>Address: Asipiya International Private Limited, Legal Department</p>
                  </div>
                </motion.div>
              </section>

              {/* Risk of Loss */}
              <section id="risk-of-loss" className="scroll-mt-24">
                <motion.h2 
                  className="text-3xl font-bold text-gray-800 mb-4"
                  variants={fadeInUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                >
                  Risk of Loss
                </motion.h2>
                <motion.div 
                  className="text-gray-600 leading-relaxed space-y-4"
                  variants={fadeInUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                >
                  <p>
                    Users acknowledge and accept the following risks associated with the use of our software and services:
                  </p>
                  <h4 className="text-lg font-semibold text-gray-800 mt-6 mb-3">Technology Risks</h4>
                  <ul className="space-y-2 list-disc list-inside ml-4">
                    <li>Potential for data loss due to technical failures</li>
                    <li>Service interruptions and downtime</li>
                    <li>Compatibility issues with user systems</li>
                    <li>Security vulnerabilities and cyber threats</li>
                  </ul>
                  <h4 className="text-lg font-semibold text-gray-800 mt-6 mb-3">Business Risks</h4>
                  <ul className="space-y-2 list-disc list-inside ml-4">
                    <li>Operational disruptions</li>
                    <li>Financial losses from system unavailability</li>
                    <li>Regulatory compliance challenges</li>
                    <li>Third-party integration risks</li>
                  </ul>
                  <p className="mt-4">
                    <strong>Mitigation:</strong> We implement industry-standard security measures and backup procedures, 
                    but users are responsible for maintaining their own backup systems and risk management strategies.
                  </p>
                </motion.div>
              </section>

              {/* Licensing and Support */}
              <section id="licensing-support" className="scroll-mt-24">
                <motion.h2 
                  className="text-3xl font-bold text-gray-800 mb-4"
                  variants={fadeInUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                >
                  Licensing and Support
                </motion.h2>
                <motion.div 
                  className="text-gray-600 leading-relaxed space-y-4"
                  variants={fadeInUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                >
                  <h4 className="text-lg font-semibold text-gray-800 mt-6 mb-3">Software Licensing</h4>
                  <p>
                    All software is licensed, not sold. Users receive limited rights to use the software according to the 
                    terms of their license agreement. Licensing options include:
                  </p>
                  <ul className="space-y-2 list-disc list-inside ml-4">
                    <li>Single-user licenses for individual use</li>
                    <li>Multi-user licenses for organizations</li>
                    <li>Enterprise licenses with custom terms</li>
                    <li>Trial licenses for evaluation purposes</li>
                  </ul>
                  <h4 className="text-lg font-semibold text-gray-800 mt-6 mb-3">Support Services</h4>
                  <p>Support is provided according to your license agreement and may include:</p>
                  <ul className="space-y-2 list-disc list-inside ml-4">
                    <li>Technical support via email and phone</li>
                    <li>Software updates and bug fixes</li>
                    <li>Documentation and training materials</li>
                    <li>Implementation assistance</li>
                  </ul>
                  <h4 className="text-lg font-semibold text-gray-800 mt-6 mb-3">License Compliance</h4>
                  <p>
                    Users must comply with all license terms and may be subject to audits to verify compliance. 
                    Non-compliance may result in license termination and legal action.
                  </p>
                </motion.div>
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
                <motion.div 
                  className="text-gray-600 leading-relaxed space-y-4"
                  variants={fadeInUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                >
                  <p>
                    This Legal Policy and all related matters are governed by the laws of <strong>Sri Lanka</strong>. 
                    Any disputes arising from or relating to our services, intellectual property, or this policy will be 
                    subject to the exclusive jurisdiction of the courts of Sri Lanka.
                  </p>
                  <h4 className="text-lg font-semibold text-gray-800 mt-6 mb-3">Dispute Resolution</h4>
                  <p>We encourage resolution of disputes through:</p>
                  <ul className="space-y-2 list-disc list-inside ml-4">
                    <li>Direct negotiation and communication</li>
                    <li>Mediation services when appropriate</li>
                    <li>Arbitration for commercial disputes</li>
                    <li>Litigation as a last resort</li>
                  </ul>
                  <h4 className="text-lg font-semibold text-gray-800 mt-6 mb-3">International Considerations</h4>
                  <p>
                    For international users, local laws may also apply. Users are responsible for ensuring compliance 
                    with applicable local regulations while respecting our intellectual property rights.
                  </p>
                  <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mt-6">
                    <p className="text-blue-800">
                      <strong>Important:</strong> This Legal Policy is subject to change. Users will be notified of 
                      material changes, and continued use constitutes acceptance of updated terms.
                    </p>
                  </div>
                  <p className="mt-6 text-sm text-gray-500">
                    <strong>Last updated:</strong> June 2025<br/>
                    <strong>Document version:</strong> 1.0
                  </p>
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

export default LegalPolicy;
