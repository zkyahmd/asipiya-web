import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import GoToTopButton from '../../components/GoToTopButton';

const SecurityPolicy = () => {
  const [activeSection, setActiveSection] = useState('introduction');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Scroll tracking to update active section
  useEffect(() => {
    const handleScroll = () => {
      const sections = [
        'introduction',
        'organizational-security',
        'infrastructure-security',
        'data-security',
        'identity-access',
        'operational-security',
        'incident-management'
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
    { id: 'organizational-security', title: 'Organizational Security' },
    { id: 'infrastructure-security', title: 'Infrastructure Security' },
    { id: 'data-security', title: 'Data Security' },
    { id: 'identity-access', title: 'Identity and Access Control' },
    { id: 'operational-security', title: 'Operational Security' },
    { id: 'incident-management', title: 'Incident Management' }
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
            Security Policy
          </motion.h1>
          <motion.p 
            className="text-xl text-purple-200"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Your security is our priority. Learn about our comprehensive security measures.
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
            <div className="bg-white rounded-xl shadow-lg p-6 sticky top-24">
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
                  Security Policy
                </motion.h2>
                <motion.p 
                  className="text-gray-600 leading-relaxed"
                  variants={fadeInUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                >
                  At <strong>Asipiya Soft Solutions Private Limited</strong>, security is fundamental to everything we do. 
                  This policy outlines our comprehensive approach to protecting your data and maintaining the highest 
                  standards of security across all our services and operations.
                </motion.p>
              </section>

              {/* Organizational Security */}
              <section id="organizational-security" className="scroll-mt-24">
                <motion.h2 
                  className="text-3xl font-bold text-gray-800 mb-6"
                  variants={fadeInUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                >
                  Organizational Security
                </motion.h2>
                
                <motion.ul 
                  className="space-y-3 text-gray-600"
                  variants={fadeInUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                >
                  <li>• We have an <strong>Information Security Management System (ISMS)</strong> aligned with our objectives and risk assessments.</li>
                  <li>• Employees undergo background checks including criminal records, employment history, and education.</li>
                  <li>• All employees sign confidentiality and acceptable use agreements and receive role-specific security training.</li>
                  <li>• Our dedicated security and privacy team manages the security and privacy programs.</li>
                  <li>• All business mobile devices are enrolled in a <strong>Mobile Device Management system</strong> for compliance.</li>
                </motion.ul>
              </section>

              {/* Infrastructure Security */}
              <section id="infrastructure-security" className="scroll-mt-24">
                <motion.h2 
                  className="text-3xl font-bold text-gray-800 mb-6"
                  variants={fadeInUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                >
                  Infrastructure Security
                </motion.h2>
                
                <div className="space-y-4">
                  <motion.div 
                    variants={fadeInUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                  >
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">Network Security</h3>
                    <p className="text-gray-600">We use firewalls and layered protection strategies, monitored regularly.</p>
                  </motion.div>

                  <motion.div 
                    variants={fadeInUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                  >
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">Network Redundancy</h3>
                    <p className="text-gray-600">Distributed grid architecture provides failover and redundancy support.</p>
                  </motion.div>

                  <motion.div 
                    variants={fadeInUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                  >
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">Intrusion Detection & Prevention</h3>
                    <p className="text-gray-600">Host and network-level signals are logged and monitored.</p>
                  </motion.div>
                </div>
              </section>

              {/* Data Security */}
              <section id="data-security" className="scroll-mt-24">
                <motion.h2 
                  className="text-3xl font-bold text-gray-800 mb-6"
                  variants={fadeInUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                >
                  Data Security
                </motion.h2>
                
                <motion.ul 
                  className="space-y-3 text-gray-600"
                  variants={fadeInUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                >
                  <li>• All changes go through secure SDLC processes, including secure coding, code analysis, and reviews.</li>
                  <li>• Customer data is logically separated to prevent unauthorized access.</li>
                  <li>• Data in transit is encrypted using secure protocols.</li>
                  <li>• Data is retained only while the account is active. After termination, it is permanently deleted after 3 months.</li>
                </motion.ul>
              </section>

              {/* Identity and Access Control */}
              <section id="identity-access" className="scroll-mt-24">
                <motion.h2 
                  className="text-3xl font-bold text-gray-800 mb-6"
                  variants={fadeInUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                >
                  Identity and Access Control
                </motion.h2>
                
                <motion.ul 
                  className="space-y-3 text-gray-600"
                  variants={fadeInUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                >
                  <li>• Multi-factor authentication is enabled for users.</li>
                  <li>• Access control is based on roles and the principle of least privilege.</li>
                  <li>• Internal policies prevent unauthorized employee access to user data.</li>
                </motion.ul>
              </section>

              {/* Operational Security */}
              <section id="operational-security" className="scroll-mt-24">
                <motion.h2 
                  className="text-3xl font-bold text-gray-800 mb-6"
                  variants={fadeInUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                >
                  Operational Security
                </motion.h2>
                
                <motion.ul 
                  className="space-y-3 text-gray-600"
                  variants={fadeInUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                >
                  <li>• System logs and internal traffic are continuously monitored for anomalies.</li>
                  <li>• Daily incremental and weekly full backups are taken and retained for 3 months.</li>
                  <li>• Customers can request recovery within the backup retention period.</li>
                </motion.ul>
              </section>

              {/* Incident Management */}
              <section id="incident-management" className="scroll-mt-24">
                <motion.h2 
                  className="text-3xl font-bold text-gray-800 mb-6"
                  variants={fadeInUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                >
                  Incident Management
                </motion.h2>
                
                <motion.ul 
                  className="space-y-3 text-gray-600"
                  variants={fadeInUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                >
                  <li>• We notify customers about applicable incidents and recommend actions.</li>
                  <li>• Incidents are tracked, documented, and resolved with corrective actions.</li>
                  <li>• We notify Data Protection Authorities of any breaches as per regional law timelines.</li>
                </motion.ul>
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

export default SecurityPolicy;
