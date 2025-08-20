import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import GoToTopButton from '../../components/GoToTopButton';
import ServicePageBanner from '../../components/motion/ServicePageBanner';
import greenLankaBanner from '../../assets/greenLankaBanner.jpg'; 
import iconChallenge from '../../assets/iconChallenge.png'; 
import iconSolution from '../../assets/iconSolution.png';
import distributedCient from '../../assets/caseStudies/distributedCient.jpg';
import limitedLoan from '../../assets/caseStudies/limitedLoan.jpg';
import inEfficiencies from '../../assets/caseStudies/inEfficiencies.png';
import barriorIcon from '../../assets/caseStudies/barriarIcon.jpg';
import centralDbIcon from '../../assets/caseStudies/centralDbIcon.webp';
import reportIcon from '../../assets/caseStudies/reportIcon.jpg';
import cloudLogo from '../../assets/caseStudies/cloudLogo.webp';   
import managerIcon from '../../assets/caseStudies/managerIcon.webp'; 
import CaseStudyNavigation from '../../components/CaseStudyNavigation';

const GreenLankaCaseStudy = () => {
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
      title: "Manual Loan Processes",
      description: "Loan officers relied heavily on paper-based documentation and Excel spreadsheets for managing client data, repayment logs, and loan calculations. This created high risk of human error, duplicate entries, and delayed access to updated loan balances.",
      icon: iconChallenge 
    },
    {
      title: "Operational Silos Across Branches",
      description: "Each branch maintained its records, making it difficult for central management to obtain real-time performance data or identify trends at the institutional level.",
      icon: distributedCient
    },
    {
      title: "Limited Monitoring of Delinquency",
      description: "Without an automated alert system or repayment dashboard, tracking overdue payments and high-risk borrowers became inefficient. Portfolio-at-Risk (PAR) assessments were rarely accurate or timely.",
      icon: limitedLoan
    },
    {
      title: "Resource Drain on Reporting",
      description: "Regulatory and audit reporting consumed days of staff time due to manual compilation and verification—especially during year-end reviews or Central Bank inspections.",
      icon: inEfficiencies
    },
    {
      title: "Scalability Barrier",
      description: "As their client base grew, so did the administrative workload. Green Lanka needed a system that could scale effortlessly without requiring significant increases in manpower or infrastructure.",
      icon: barriorIcon
    }
  ];

  // Solution data
  const solutions = [
    {
      title: "Full Loan Lifecycle Automation",
      description: "Green Lanka now manages the complete loan journey digitally—from application, appraisal, disbursement, and installment tracking, to closure. The system automates interest calculations (flat/reducing), penalty application for overdue payments, and daily collection schedules and due date alerts.",
      icon: iconSolution 
    },
    {
      title: "Centralized Client Database",
      description: "All borrower data, including KYC, guarantor info, group affiliations, and past loan history, is stored securely in one place. This ensures quick data retrieval, seamless compliance with AML/CFT regulations, and a 360° view of each borrower's credit behaviour.",
      icon: centralDbIcon
    },
    {
      title: "Branch & Field Officer Dashboards",
      description: "Every branch and field officer now has a real-time dashboard to monitor total disbursements, outstanding balances, daily collections, and delinquent accounts. This has empowered team leaders to monitor progress and intervene proactively where needed.",
      icon: managerIcon
    },
    {
      title: "Dynamic Repayment Scheduling",
      description: "The system supports flexible repayment configurations—weekly, bi-weekly, monthly—based on loan types. Loan officers receive automatic alerts for upcoming installments, missed payments, and partial payments.",
      icon: limitedLoan
    },
    {
      title: "Regulatory Reporting & Compliance",
      description: "Asipiya's built-in reporting engine provides Portfolio at Risk (PAR) reports, loan aging summaries, branch-wise and product-wise performance metrics, and exportable reports for Central Bank submissions and internal audits.",
      icon: reportIcon
    },
    {
      title: "Multi-Level Role-Based Access",
      description: "With granular permissions, each user—from field officers to auditors—can only access relevant modules, ensuring data security and accountability.",
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
        <ServicePageBanner bannerSrc={greenLankaBanner} altText="Green Lanka Capital Holdings Banner">
          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="text-4xl md:text-6xl font-extrabold text-white mb-4 drop-shadow-lg"
          >
            Green Lanka Capital Holdings (Pvt) Ltd
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
            className="text-xl md:text-2xl leading-relaxed text-purple-200 drop-shadow-md"
          >
            Empowering Underserved Communities with Inclusive Financial Solutions
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
              A Leader in Microfinance for <span className="text-indigo-600">Sri Lankan Communities</span>
            </h2>
            <p className="text-lg leading-relaxed text-gray-700 mb-4">
              Green Lanka Capital Holdings (Pvt) Ltd is a leading non-bank microfinance institution (MFI) headquartered in Welimada, Sri Lanka. Since its inception in 2018, the company has built a strong reputation for delivering inclusive financial solutions to underserved communities across the Uva and Central provinces.
            </p>
            <p className="text-lg leading-relaxed text-gray-700">
              With a current outreach of over 5,000 active clients and 7 operational branches in locations such as Nuwara Eliya, Ragala, Badulla, and Haputale, Green Lanka focuses on grassroots lending products. Their mission is rooted in financial empowerment, enabling economically vulnerable groups to uplift their living standards through access to fair, timely, and transparent credit.
            </p>
          </motion.div>
          <motion.div variants={itemVariants} className="bg-white rounded-xl shadow-lg p-8 transform hover:scale-105 transition duration-300">
            <h3 className="text-2xl font-semibold text-purple-600 mb-6 flex items-center">
              <span className="mr-3 text-3xl">🌿</span> Lending Products
            </h3>
            <ul className="space-y-3 text-lg text-gray-700 list-none pl-0">
              <li className="flex items-center"><span className="text-purple-500 mr-2">✔</span> Cultivation loans</li>
              <li className="flex items-center"><span className="text-purple-500 mr-2">✔</span> Educational assistance loans</li>
              <li className="flex items-center"><span className="text-purple-500 mr-2">✔</span> SME and entrepreneur loans</li>
              <li className="flex items-center"><span className="text-purple-500 mr-2">✔</span> Self-employment microloans</li>
              <li className="flex items-center"><span className="text-purple-500 mr-2">✔</span> Gold loans</li>
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
            As Green Lanka scaled operations to meet the growing demand for credit services in remote regions, their internal systems struggled to keep up. Key operational difficulties included:
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
            To address these challenges, Green Lanka adopted the Asipiya Microfinance System, a cloud-based, modular, and highly customizable digital solution tailored specifically for MFIs operating in emerging markets like Sri Lanka. Here's how the Asipiya system helped transform their operations:
          </motion.p>

          <h3 className="text-3xl font-bold text-yellow-300 mb-8 text-center">
            Key Modules & Functionalities Implemented
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
          While specific numerical metrics are being compiled, the implementation of the Asipiya Microfinance System has already led to significant improvements in Green Lanka's operational efficiency, data accuracy, and scalability, directly contributing to their mission of financial empowerment.
        </p>
        <div className="flex flex-wrap justify-center gap-6">
          <motion.div variants={itemVariants} className="bg-white p-6 rounded-xl shadow-md text-center border-b-4 border-purple-600 w-full sm:w-auto flex-1 min-w-[280px]">
            <h3 className="text-3xl font-extrabold text-purple-700 mb-2">Enhanced Efficiency</h3>
            <p className="text-gray-600">Streamlined workflows and reduced manual errors.</p>
          </motion.div>
          <motion.div variants={itemVariants} className="bg-white p-6 rounded-xl shadow-md text-center border-b-4 border-indigo-600 w-full sm:w-auto flex-1 min-w-[280px]">
            <h3 className="text-3xl font-extrabold text-indigo-700 mb-2">Improved Accuracy</h3>
            <p className="text-gray-600">Centralized, real-time data for better decision-making.</p>
          </motion.div>
          <motion.div variants={itemVariants} className="bg-white p-6 rounded-xl shadow-md text-center border-b-4 border-yellow-600 w-full sm:w-auto flex-1 min-w-[280px]">
            <h3 className="text-3xl font-extrabold text-yellow-700 mb-2">Scalability & Growth</h3>
            <p className="text-gray-600">Foundation for sustainable expansion without increased administrative burden.</p>
          </motion.div>
        </div>
      </motion.section>

      <CaseStudyNavigation currentCaseStudyId="green-lanka" />
      <GoToTopButton />
      <Footer />
    </div>
  );
};

export default GreenLankaCaseStudy;