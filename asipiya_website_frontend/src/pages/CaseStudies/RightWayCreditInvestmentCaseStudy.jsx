import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import GoToTopButton from '../../components/GoToTopButton';
import ServicePageBanner from '../../components/motion/ServicePageBanner';
import rightwayCreditInvestmentBanner from '../../assets/caseStudies/rightwayCreditInvestmentBanner.jpg'; 
import iconChallenge from '../../assets/iconChallenge.png'; 
import realTimeTrackingIcon from '../../assets/caseStudies/realTimeTrackingIcon.png';
import inEfficiencies from '../../assets/caseStudies/inEfficiencies.png';
import barriorIcon from '../../assets/caseStudies/barriarIcon.jpg';
import reportIcon from '../../assets/caseStudies/reportIcon.jpg';
import cloudLogo from '../../assets/caseStudies/cloudLogo.webp';
import fullLoanCycleDigitization from '../../assets/caseStudies/FullLoanCycleDigitization.jpg'; 
import smartAlertsIcon from '../../assets/caseStudies/smartAlerts.jpg';
import noCentralClientIcon from '../../assets/caseStudies/noCentralClientIcon.jpg';
import CaseStudyNavigation from '../../components/CaseStudyNavigation';

const RightWayCreditInvestmentCaseStudy = () => {
  const [currentChallengeIndex, setCurrentChallengeIndex] = useState(0);
  const [currentSolutionIndex, setCurrentSolutionIndex] = useState(0);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Animation variants for sections
  const sectionVariants = {
    hidden: { opacity: 0, y: 80 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' } },
  };

  // Animation variants for individual items within sections
  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
  };

  // Challenge data
  const challenges = [
    {
      title: "Manual Loan Management",
      description: "Processing new loans required extensive paperwork, making approvals slow and error-prone. Staff had to spend hours updating records and cross-checking data.",
      icon: iconChallenge 
    },
    {
      title: "Difficulty in Tracking Repayments",
      description: "Monitoring repayment schedules was complex, leading to delayed reminders, missed collections, and inefficiencies in cash flow management.",
      icon: barriorIcon
    },
    {
      title: "No Centralized Customer Database",
      description: "Customer information was scattered across different files and systems, making it hard to retrieve complete profiles and loan histories.",
      icon: noCentralClientIcon 
    },
    {
      title: "Inefficient Reporting & Compliance",
      description: "Generating financial reports, compliance documents, and performance summaries took days, affecting decision-making and regulatory reporting.",
      icon: inEfficiencies
    }
  ];

  // Solution data
  const solutions = [
    {
      title: "Automated Loan Processing",
      description: "Digitized loan applications and approvals, reducing paperwork and approval time.",
      icon: fullLoanCycleDigitization
    },
    {
      title: "Real-time Customer Tracking",
      description: "Centralized customer database with complete loan histories and repayment records.",
      icon: realTimeTrackingIcon
    },
    {
      title: "Easy Repayment Scheduling & Alerts",
      description: "Automated reminders and alerts for both staff and customers, ensuring timely repayments.",
      icon: smartAlertsIcon 
    },
    {
      title: "Comprehensive Financial Reports",
      description: "Instant generation of loan performance, overdue summaries, and regulatory reports with a single click.",
      icon: reportIcon
    },
    {
      title: "Secure Cloud-based Access",
      description: "Authorized staff could securely access the system anytime, anywhere, enhancing flexibility and productivity.",
      icon: cloudLogo
    }
  ];

  // Auto-play functionality for challenges carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentChallengeIndex((prev) => (prev + 1) % challenges.length);
    }, 4000); // Change every 4 seconds

    return () => clearInterval(interval);
  }, [challenges.length]);

  // Auto-play functionality for solutions carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSolutionIndex((prev) => (prev + 1) % solutions.length);
    }, 4000); // Change every 4 seconds

    return () => clearInterval(interval);
  }, [solutions.length]);

  const MobileCarousel = ({ items, currentIndex, setCurrentIndex, isDark = false }) => {
    const handleSwipe = (direction) => {
      if (direction === 'left') {
        setCurrentIndex((prev) => (prev + 1) % items.length);
      } else {
        setCurrentIndex((prev) => (prev - 1 + items.length) % items.length);
      }
    };

    return (
      <div className="md:hidden">
        {/* Mobile Carousel */}
        <div className="relative overflow-hidden">
          <div 
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {items.map((item, index) => (
              <div key={index} className="w-full flex-shrink-0 px-4">
                <div className={`p-8 rounded-xl shadow-lg border transform transition duration-300 flex flex-col items-start text-left ${
                  isDark 
                    ? 'bg-white bg-opacity-10 backdrop-filter backdrop-blur-sm border-purple-500' 
                    : 'bg-white border-gray-100 hover:shadow-xl hover:-translate-y-2'
                }`}>
                  {item.icon && <img src={item.icon} alt="Icon" className="w-12 h-12 mb-4" />}
                  <h3 className={`text-xl font-semibold mb-3 ${
                    isDark ? 'text-yellow-300' : 'text-gray-900'
                  }`}>
                    {item.title}
                  </h3>
                  <p className={`leading-relaxed ${
                    isDark ? 'text-gray-200' : 'text-gray-700'
                  }`}>
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Navigation Dots */}
        <div className="flex justify-center mt-6 space-x-2">
          {items.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-3 h-3 rounded-full transition-colors duration-200 ${
                index === currentIndex 
                  ? (isDark ? 'bg-yellow-300' : 'bg-purple-600') 
                  : (isDark ? 'bg-white bg-opacity-30' : 'bg-gray-300')
              }`}
            />
          ))}
        </div>

        {/* Swipe Navigation Buttons */}
        <div className="flex justify-between items-center mt-4 px-4">
          <button
            onClick={() => handleSwipe('right')}
            className={`p-3 rounded-full shadow-lg transition-colors duration-200 ${
              isDark 
                ? 'bg-white bg-opacity-20 text-white hover:bg-opacity-30' 
                : 'bg-purple-600 text-white hover:bg-purple-700'
            }`}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/>
            </svg>
          </button>
          
          <span className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
            {currentIndex + 1} of {items.length}
          </span>
          
          <button
            onClick={() => handleSwipe('left')}
            className={`p-3 rounded-full shadow-lg transition-colors duration-200 ${
              isDark 
                ? 'bg-white bg-opacity-20 text-white hover:bg-opacity-30' 
                : 'bg-purple-600 text-white hover:bg-purple-700'
            }`}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M8.59 16.59L10 18l6-6-6-6-1.41 1.41L13.17 12z"/>
            </svg>
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-purple-50 font-sans text-gray-400">
      <Navbar />

      {/* Hero Section */}
      <ServicePageBanner bannerSrc={rightwayCreditInvestmentBanner} altText="RightWay Credit & Investment (Pvt) Ltd Banner">
        <motion.h1
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="text-4xl md:text-6xl font-extrabold text-white mb-4 drop-shadow-lg"
        >
          RightWay Credit & Investment (Pvt) Ltd
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
          className="text-xl md:text-2xl leading-relaxed text-purple-200 drop-shadow-md"
        >
          Providing Accessible Financial Solutions and Diverse Services
        </motion.p>
      </ServicePageBanner>

      {/* Introduction/Overview Section */}
      <motion.section
        className="py-20 px-6 max-w-7xl mx-auto"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={sectionVariants}
      >
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div variants={itemVariants}>
            <h2 className="text-4xl font-bold text-purple-700 mb-6 leading-tight">
              A Dynamic Microfinance and Lending Company in <span className="text-indigo-600">Sri Lanka</span>
            </h2>
            <p className="text-lg leading-relaxed text-gray-700 mb-4">
              RightWay Credit & Investment is a dynamic microfinance and lending company based in Sri Lanka. Focused on providing accessible financial solutions, they have been a trusted financial partner for individuals and businesses, continuing to expand their operations across Sri Lanka, leveraging technology to improve efficiency and customer satisfaction.
            </p>
          </motion.div>
          <motion.div variants={itemVariants} className="bg-white rounded-xl shadow-lg p-8 transform hover:scale-105 transition duration-300">
            <h3 className="text-2xl font-semibold text-purple-600 mb-6 flex items-center">
              <span className="mr-3 text-3xl">💼</span> Diverse Range of Services
            </h3>
            <ul className="space-y-3 text-lg text-gray-700 list-none pl-0">
              <li className="flex items-center"><span className="text-purple-500 mr-2">✔</span> Business Loans</li>
              <li className="flex items-center"><span className="text-purple-500 mr-2">✔</span> Auto Loans</li>
              <li className="flex items-center"><span className="text-purple-500 mr-2">✔</span> Gold Loans</li>
              <li className="flex items-center"><span className="text-purple-500 mr-2">✔</span> Micro Loans</li>
              <li className="flex items-center"><span className="text-purple-500 mr-2">✔</span> Mortgage Loans</li>
            </ul>
          </motion.div>
        </div>
      </motion.section>

      {/* The Challenge Section */}
      <motion.section
        className="py-20 px-6 bg-gradient-to-br from-white to-gray-100"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={sectionVariants}
      >
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-indigo-700 mb-12">
            The <span className="text-purple-600">Challenge</span>
          </h2>
          <motion.p variants={itemVariants} className="text-lg leading-relaxed text-gray-700 text-center max-w-3xl mx-auto mb-10">
            Despite their growing success, RightWay Credit & Investment faced significant operational challenges due to manual processes.
          </motion.p>
          
          {/* Desktop Grid */}
          <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {challenges.map((challenge, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="bg-white p-8 rounded-xl shadow-lg border border-gray-100 transform hover:shadow-xl hover:-translate-y-2 transition duration-300 flex flex-col items-start text-left"
              >
                {challenge.icon && <img src={challenge.icon} alt="Challenge Icon" className="w-12 h-12 mb-4 text-purple-600" />}
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{challenge.title}</h3>
                <p className="text-gray-700 leading-relaxed">{challenge.description}</p>
              </motion.div>
            ))}
          </div>

          {/* Mobile Carousel*/}
          <MobileCarousel 
            items={challenges} 
            currentIndex={currentChallengeIndex} 
            setCurrentIndex={setCurrentChallengeIndex} 
          />
        </div>
      </motion.section>

      {/* The Solution Section */}
      <motion.section
        className="py-20 px-6 bg-gradient-to-tl from-purple-700 to-indigo-800 text-white"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={sectionVariants}
      >
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-white mb-12">
            The <span className="text-yellow-300">Asipiya Solution</span>
          </h2>
          <motion.p variants={itemVariants} className="text-lg leading-relaxed opacity-90 text-center max-w-3xl mx-auto mb-10">
            To overcome these challenges, Asipiya Solutions implemented a comprehensive Microfinance Management System tailored for RightWay Credit & Investment. This cloud-based, secure, and scalable platform transformed their entire loan management process, offering:
          </motion.p>

          <h3 className="text-3xl font-bold text-yellow-300 mb-8 text-center">
            Key Benefits of the Solution
          </h3>
          
          {/* Desktop Grid */}
          <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {solutions.map((module, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="bg-white bg-opacity-10 backdrop-filter backdrop-blur-sm p-8 rounded-xl shadow-lg border border-purple-500 transform hover:bg-opacity-20 transition duration-300 flex flex-col items-start text-left"
              >
                {module.icon && <img src={module.icon} alt="Solution Icon" className="w-12 h-12 mb-4 text-white" />}
                <h4 className="text-xl font-semibold text-yellow-300 mb-3">{module.title}</h4>
                <p className="text-gray-200 leading-relaxed">{module.description}</p>
              </motion.div>
            ))}
          </div>

          {/* Mobile Carousel */}
          <MobileCarousel 
            items={solutions} 
            currentIndex={currentSolutionIndex} 
            setCurrentIndex={setCurrentSolutionIndex} 
            isDark={true}
          />
        </div>
      </motion.section>

      {/* Potential Future Section for Results */}
      <motion.section
        className="py-20 px-6 max-w-7xl mx-auto text-center"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={sectionVariants}
      >
        <h2 className="text-4xl font-bold text-gray-800 mb-6">
          Achieving <span className="text-purple-600">Tangible Outcomes</span>
        </h2>
        <p className="text-lg text-gray-700 leading-relaxed max-w-3xl mx-auto mb-10">
          With the Asipiya Microfinance Management System, RightWay Credit & Investment transformed from manual, time-consuming operations to fast, accurate, and data-driven decision-making, significantly enhancing their service delivery.
        </p>
        <div className="flex flex-wrap justify-center gap-6">
          <motion.div variants={itemVariants} className="bg-white p-6 rounded-xl shadow-md text-center border-b-4 border-purple-600 w-full sm:w-auto flex-1 min-w-[280px]">
            <h3 className="text-3xl font-extrabold text-purple-700 mb-2">Automated Operations</h3>
            <p className="text-gray-600">Streamlined loan processing and reduced manual errors.</p>
          </motion.div>
          <motion.div variants={itemVariants} className="bg-white p-6 rounded-xl shadow-md text-center border-b-4 border-indigo-600 w-full sm:w-auto flex-1 min-w-[280px]">
            <h3 className="text-3xl font-extrabold text-indigo-700 mb-2">Real-time Data Access</h3>
            <p className="text-gray-600">Centralized database for improved tracking and decision-making.</p>
          </motion.div>
          <motion.div variants={itemVariants} className="bg-white p-6 rounded-xl shadow-md text-center border-b-4 border-yellow-600 w-full sm:w-auto flex-1 min-w-[280px]">
            <h3 className="text-3xl font-extrabold text-yellow-700 mb-2">Enhanced Efficiency</h3>
            <p className="text-gray-600">Faster approvals, timely collections, and seamless reporting.</p>
          </motion.div>
        </div>
      </motion.section>

      <CaseStudyNavigation currentCaseStudyId="rightway-credit-investment" />
      <GoToTopButton />
      <Footer />
    </div>
  );
};

export default RightWayCreditInvestmentCaseStudy;