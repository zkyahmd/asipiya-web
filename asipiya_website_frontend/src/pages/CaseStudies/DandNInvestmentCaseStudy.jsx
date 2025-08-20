import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import GoToTopButton from '../../components/GoToTopButton';
import ServicePageBanner from '../../components/motion/ServicePageBanner';
import dandnInvestmentBanner from '../../assets/caseStudies/dandnInvestmentBanner.jpg'; 
import iconChallenge from '../../assets/iconChallenge.png'; 
import iconSolution from '../../assets/iconSolution.png'; 
import clientRecordsIcon from '../../assets/caseStudies/clientRecordsIcon.webp';
import limitedLoan from '../../assets/caseStudies/limitedLoan.jpg';
import reportIcon from '../../assets/caseStudies/reportIcon.jpg';
import scalabilityStruggles from '../../assets/caseStudies/scalabilityStruggle.jpg';
import clientRecordsIconTwo from '../../assets/caseStudies/clientRecordsIconTwo.jpg';
import fullLoanCycleDigitization from '../../assets/caseStudies/FullLoanCycleDigitization.jpg';
import centralDbIcon from '../../assets/caseStudies/centralDbIcon.webp';
import smartAlertsIcon from '../../assets/caseStudies/smartAlerts.jpg';
import managerIcon from '../../assets/caseStudies/managerIcon.webp';
import CaseStudyNavigation from '../../components/CaseStudyNavigation';

const DandNInvestmentCaseStudy = () => {
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
      title: "Paper-Based Loan Workflows",
      description: "All core loan processes—applications, approvals, collections—were managed through physical files and spreadsheets, resulting in inefficiencies and high error margins.",
      icon: iconChallenge 
    },
    {
      title: "Dispersed Client Records",
      description: "Client and loan information was maintained separately at each location, complicating performance monitoring and cross-branch reporting.",
      icon: clientRecordsIconTwo
    },
    {
      title: "Reactive Collections",
      description: "Loan officers lacked tools to track repayment behavior in real-time, delaying follow-up on missed payments and increasing portfolio risk.",
      icon: limitedLoan
    },
    {
      title: "Time-Consuming Reporting",
      description: "Central Bank reports, loan summaries, and internal audits required extensive manual data entry and consolidation.",
      icon: reportIcon
    },
    {
      title: "Scaling Challenges",
      description: "Expansion into new service areas demanded more administrative manpower and physical resources without a scalable backend system.",
      icon: scalabilityStruggles
    }
  ];

  // Solution data
  const solutions = [
    {
      title: "Full Loan Lifecycle Digitization",
      description: "The system streamlined everything from application to disbursement, including: Automated interest and penalty calculations, Flexible installment tracking, Paperless loan closure workflows.",
      icon: fullLoanCycleDigitization
    },
    {
      title: "Centralized Client & Loan Database",
      description: "Consolidated all KYC records, guarantor info, repayment logs, and borrower behavior into a secure, centralized system—ensuring fast access and full compliance.",
      icon: centralDbIcon 
    },
    {
      title: "Real-Time Dashboards for Staff & Branches",
      description: "Officers now monitor: Daily disbursements and collections, Delinquent clients, Product-wise and branch-wise performance metrics.",
      icon: iconSolution 
    },
    {
      title: "Automated Alerts & Notifications",
      description: "The system issues real-time reminders for: Due payments, Missed installments, High-risk accounts needing follow-up.",
      icon: smartAlertsIcon
    },
    {
      title: "Regulatory & Internal Reporting Engine",
      description: "Generates: Loan aging and collection trends, Export-ready audit and compliance documentation.",
      icon: reportIcon
    },
    {
      title: "Multi-Level Role-Based Access",
      description: "Tailored access controls ensure only authorized personnel can view or edit data, increasing accountability and reducing risk.",
      icon: managerIcon 
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
      <ServicePageBanner bannerSrc={dandnInvestmentBanner} altText="D & N Investment (Pvt) Ltd Banner">
        <motion.h1
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="text-4xl md:text-6xl font-extrabold text-white mb-4 drop-shadow-lg"
        >
          D & N Investment (Pvt) Ltd
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
          className="text-xl md:text-2xl leading-relaxed text-purple-200 drop-shadow-md"
        >
          Empowering Individuals and Small Businesses with Ethical Financial Solutions
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
              A Dynamic Financial Services and Consultancy Firm in <span className="text-indigo-600">Gampaha, Sri Lanka</span>
            </h2>
            <p className="text-lg leading-relaxed text-gray-700 mb-4">
              D&N Investment Holding is a dynamic financial services and consultancy firm based in Gampaha, Sri Lanka, focused on empowering individuals and small businesses with accessible, ethical, and growth-oriented financial solutions.
            </p>
            <p className="text-lg leading-relaxed text-gray-700">
              Operating under the Dhanesha Group umbrella, D&N positions itself as a reliable and approachable partner, especially for financially underserved individuals and entrepreneurs in both urban and semi-urban communities.
            </p>
          </motion.div>
          <motion.div variants={itemVariants} className="bg-white rounded-xl shadow-lg p-8 transform hover:scale-105 transition duration-300">
            <h3 className="text-2xl font-semibold text-purple-600 mb-6 flex items-center">
              <span className="mr-3 text-3xl">📈</span> Diverse Portfolio of Services
            </h3>
            <ul className="space-y-3 text-lg text-gray-700 list-none pl-0">
              <li className="flex items-center"><span className="text-purple-500 mr-2">✔</span> Personal and microfinance loans</li>
              <li className="flex items-center"><span className="text-purple-500 mr-2">✔</span> SME working capital loans</li>
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
            With client demand growing and branch operations expanding, D&N faced multiple operational and technical challenges:
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
            To overcome these issues, D&N adopted the Asipiya Microfinance System, a cloud-based digital solution specifically designed for microfinance institutions and financial consultants in emerging markets.
          </motion.p>

          <h3 className="text-3xl font-bold text-yellow-300 mb-8 text-center">
            Key Modules & Features Implemented:
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

      {/* Potential Future Section for Results/Impact */}
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
          With the Asipiya Microfinance System, D&N Investment has significantly enhanced operational efficiency, data accuracy, and scalability, enabling them to better serve their clients and achieve sustainable growth.
        </p>
        <div className="flex flex-wrap justify-center gap-6">
          <motion.div variants={itemVariants} className="bg-white p-6 rounded-xl shadow-md text-center border-b-4 border-purple-600 w-full sm:w-auto flex-1 min-w-[280px]">
            <h3 className="text-3xl font-extrabold text-purple-700 mb-2">Streamlined Workflows</h3>
            <p className="text-gray-600">Eliminated paperwork and reduced processing delays.</p>
          </motion.div>
          <motion.div variants={itemVariants} className="bg-white p-6 rounded-xl shadow-md text-center border-b-4 border-indigo-600 w-full sm:w-auto flex-1 min-w-[280px]">
            <h3 className="text-3xl font-extrabold text-indigo-700 mb-2">Improved Data Management</h3>
            <p className="text-gray-600">Centralized records for real-time insights.</p>
          </motion.div>
          <motion.div variants={itemVariants} className="bg-white p-6 rounded-xl shadow-md text-center border-b-4 border-yellow-600 w-full sm:w-auto flex-1 min-w-[280px]">
            <h3 className="text-3xl font-extrabold text-yellow-700 mb-2">Enhanced Scalability</h3>
            <p className="text-gray-600">Digital infrastructure supporting business expansion.</p>
          </motion.div>
        </div>
      </motion.section>

      <CaseStudyNavigation currentCaseStudyId="d-n-investment" />
      <GoToTopButton />
      <Footer />
    </div>
  );
};

export default DandNInvestmentCaseStudy;