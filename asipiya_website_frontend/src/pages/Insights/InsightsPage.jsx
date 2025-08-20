import React, { useEffect, useState, useMemo, useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '../../components/Navbar';
import Footer from "../../components/Footer";
import GoToTopButton from '../../components/GoToTopButton';
import ServicePageBanner from '../../components/motion/ServicePageBanner';
import Accordion from '../../components/Accordion';
import insightsBannerVideo from '../../assets/insightsBannerVideo.mp4';

import greenLankaCaseStudyThumbnail from '../../assets/greenLankaCaseStudyThumbnail.jpg';
import minvensCaseStudyThumbnail from '../../assets/caseStudies/minvensCaseStudyThumbnail.jpg';
import finwinCaseStudyThumbnail from '../../assets/caseStudies/finwinBanner.jpg';
import cbcCapitalCaseStudyThumbnail from '../../assets/caseStudies/cbcCapitalBanner.jpg';
import dandnInvestmentCaseStudyThumbnail from '../../assets/caseStudies/dandnInvestmentBanner.jpg';
import nskBusinessSolutionsCaseStudyThumbnail from '../../assets/caseStudies/nskBusinessSolutionsBanner.jpg';
import orientTrustInvestmentCaseStudyThumbnail from '../../assets/caseStudies/orientTrustInvestmentBanner.jpg';
import rightwayCreditInvestmentCaseStudyThumbnail from '../../assets/caseStudies/rightwayCreditInvestmentBanner.jpg';
import futureHopeInvestmentCaseStudyThumbnail from '../../assets/caseStudies/futureHopeInvestmentBanner.jpg';

const genericCaseStudyThumbnail = "https://placehold.co/300x200/B8B8E0/ffffff?text=Case+Study+Thumbnail";

import logoClient01 from '../../assets/clientLogos/logoClient01.jpg';
import logoClient02 from '../../assets/clientLogos/logoClient02.jpg';
import logoClient03 from '../../assets/clientLogos/logoClient03.jpg';
import logoClient04 from '../../assets/clientLogos/logoClient04.jpg';
import logoClient05 from '../../assets/clientLogos/logoClient05.jpg';
import logoClient06 from '../../assets/clientLogos/logoClient06.jpg';
import logoClient07 from '../../assets/clientLogos/logoClient07.jpg';
import logoClient08 from '../../assets/clientLogos/logoClient08.jpg';
import logoClient09 from '../../assets/clientLogos/logoClient09.jpg';
import logoClient10 from '../../assets/clientLogos/logoClient10.jpg';
import logoClient11 from '../../assets/clientLogos/logoClient11.jpg';

const InsightsPage = () => {
    const navigate = useNavigate();
    const location = useLocation();

    // State management
    const [currentPage, setCurrentPage] = useState(0);
    const [isMobile, setIsMobile] = useState(false);

    // Static data
    const faqs = [
        {
            question: "What industries do you specialize in?",
            answer: "We work across multiple industries, including finance, microfinance, leasing, retail, and service sectors. Our domain-specific systems, like ERP, pawning, and invoicing solutions, are designed to adapt to your industry's unique needs.",
        },
        {
            question: "Do you provide post-launch support?",
            answer: "Yes, we offer ongoing maintenance, upgrades, and technical support.",
        },
        {
            question: "How do you ensure the security of your software systems?",
            answer: "Security is a top priority. We follow industry best practices such as data encryption, role-based access, audit logging, and secure coding standards to ensure that your data and systems are fully protected.",
        },
        {
            question: "Do you offer customizations to your software?",
            answer: "Yes. All of our systems are developed with customization in mind. We tailor features, workflows, and interfaces to align perfectly with your specific business requirements.",
        },
        {
            question: "Do you provide training for your systems?",
            answer: "Absolutely. We offer online user training sessions and detailed documentation to ensure your team is confident in using the system effectively from day one.",
        },
        {
            question: "How scalable are your software solutions?",
            answer: "Our systems are built to grow with your business. Whether you operate a single branch or a multi-location enterprise, our platforms are fully scalable, supporting increasing user bases, transaction volumes, and operational complexity.",
        },
        {
            question: "What kind of support channels do you offer?",
            answer: "Our support team is available via phone, email, and ticketing system. We also provide remote access troubleshooting, routine health checks, and regular updates to ensure everything runs smoothly.",
        },
    ];

    const clientLogos = [
        logoClient01, logoClient02, logoClient03, logoClient04, logoClient05,
        logoClient06, logoClient07, logoClient08, logoClient09, logoClient10, logoClient11,
    ];

    const caseStudiesForDisplay = [
        {
            id: 'green-lanka',
            title: "Green Lanka Capital Holdings",
            description: "See how Asipiya's Microfinance System transformed Green Lanka's operations, automating loan processes and centralizing data.",
            thumbnail: greenLankaCaseStudyThumbnail || genericCaseStudyThumbnail,
            link: '/case-studies/green-lanka',
        },
        {
            id: 'minvens',
            title: "Minvens (Pvt) Ltd",
            description: "Discover how our Microfinance Management System digitized Minvens' operations, enhancing efficiency and scalability.",
            thumbnail: minvensCaseStudyThumbnail || genericCaseStudyThumbnail,
            link: '/case-studies/minvens',
        },
        {
            id: 'finwin',
            title: "FinWin Capital (Pvt) Ltd",
            description: "Learn how Asipiya's Microfinance System helped FinWin Capital achieve faster loan approvals and enhanced operational efficiency.",
            thumbnail: finwinCaseStudyThumbnail || genericCaseStudyThumbnail,
            link: '/case-studies/finwin',
        },
        {
            id: 'cbc-capital',
            title: "CBC Capital (Pvt) Ltd",
            description: "Explore how Asipiya's Microfinance System transformed CBC Capital's operations, leading to faster approvals and improved collections.",
            thumbnail: cbcCapitalCaseStudyThumbnail || genericCaseStudyThumbnail,
            link: '/case-studies/cbc-capital',
        },
        {
            id: 'd-n-investment',
            title: "D & N Investment (Pvt) Ltd",
            description: "See how Asipiya's Microfinance System empowered D&N Investment with streamlined workflows and enhanced data management.",
            thumbnail: dandnInvestmentCaseStudyThumbnail || genericCaseStudyThumbnail,
            link: '/case-studies/d-n-investment',
        },
        {
            id: 'nsk-business-solutions',
            title: "NSK Business Solutions (Pvt) Ltd",
            description: "Discover how Asipiya's Microfinance Platform modernized NSK Business Solutions' operations with automation and real-time insights.",
            thumbnail: nskBusinessSolutionsCaseStudyThumbnail || genericCaseStudyThumbnail,
            link: '/case-studies/nsk-business-solutions',
        },
        {
            id: 'orient-trust-investment',
            title: "Orient Trust Investment Lanka (Pvt) Ltd",
            description: "Learn how Asipiya's Microfinance System streamlined operations and expanded outreach for Orient Trust Investment.",
            thumbnail: orientTrustInvestmentCaseStudyThumbnail || genericCaseStudyThumbnail,
            link: '/case-studies/orient-trust-investment',
        },
        {
            id: 'rightway-credit-investment',
            title: "RightWay Credit & Investment (Pvt) Ltd",
            description: "Discover how Asipiya's Microfinance Management System transformed RightWay Credit & Investment's manual operations into a data-driven model.",
            thumbnail: rightwayCreditInvestmentCaseStudyThumbnail || genericCaseStudyThumbnail,
            link: '/case-studies/rightway-credit-investment',
        },
        {
            id: 'future-hope-investment',
            title: "Future Hope Investment (Pvt) Ltd",
            description: "Explore how Asipiya's Microfinance System transformed Future Hope Investment's operations with automation and scalability.",
            thumbnail: futureHopeInvestmentCaseStudyThumbnail || genericCaseStudyThumbnail,
            link: '/case-studies/future-hope-investment',
        },
    ];

    // Memoized pagination calculations
    const paginationData = useMemo(() => {
        const cardsPerPage = isMobile ? 1 : 3;
        const totalPages = Math.ceil(caseStudiesForDisplay.length / cardsPerPage);
        const startIndex = currentPage * cardsPerPage;
        const visibleCaseStudies = caseStudiesForDisplay.slice(startIndex, startIndex + cardsPerPage);

        return {
            cardsPerPage,
            totalPages,
            startIndex,
            visibleCaseStudies
        };
    }, [isMobile, currentPage, caseStudiesForDisplay.length]);

    // Animation variants
    const sectionVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
    };

    // Event handlers
    const handleNextPage = useCallback(() => {
        setCurrentPage(prev =>
            prev < paginationData.totalPages - 1 ? prev + 1 : prev
        );
    }, [paginationData.totalPages]);

    const handlePrevPage = useCallback(() => {
        setCurrentPage(prev => prev > 0 ? prev - 1 : prev);
    }, []);

    // Effects
    useEffect(() => {
        if (location.hash) {
            const element = document.getElementById(location.hash.substring(1));
            if (element) {
                setTimeout(() => {
                    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }, 100);
            } else {
                window.scrollTo(0, 0);
            }
        } else {
            window.scrollTo(0, 0);
        }
    }, [location.pathname, location.hash]);

    // Mobile detection effect
    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };

        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    // Reset page when switching between mobile/desktop
    useEffect(() => {
        setCurrentPage(0);
    }, [isMobile]);

    // Auto-advance carousel effect 
    useEffect(() => {
        const autoAdvanceInterval = setInterval(() => {
            setCurrentPage(prevPage => {
                const currentTotalPages = Math.ceil(caseStudiesForDisplay.length / (isMobile ? 1 : 3));
                return prevPage >= currentTotalPages - 1 ? 0 : prevPage + 1;
            });
        }, 5000);

        return () => clearInterval(autoAdvanceInterval);
    }, [isMobile, caseStudiesForDisplay.length]); // Added dependencies to fix stale closure

    return (
        <div className="min-h-screen bg-gray-50 font-sans relative overflow-x-hidden">
            <style jsx>{`
                .scrollbar-hide {
                    -ms-overflow-style: none;
                    scrollbar-width: none;
                }
                .scrollbar-hide::-webkit-scrollbar {
                    display: none;
                }
            `}</style>
            <Navbar />

            {/* Hero Section with ServicePageBanner */}
            <ServicePageBanner videoSrc={insightsBannerVideo} altText="Insights and Case Studies Banner">
                <motion.h1
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7 }}
                    className="text-4xl md:text-6xl font-extrabold text-white drop-shadow-lg mb-4"
                >
                    Insights & <br /> Success Stories
                </motion.h1>
                <motion.p
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.2 }}
                    className="text-white text-md md:text-xl leading-relaxed drop-shadow-md"
                >
                    Explore our expertise, client successes, and answers to your common questions.
                </motion.p>
            </ServicePageBanner>

            {/* Case Studies Section */}
            <motion.section
                id="case-studies"
                className="py-16 px-4 max-w-6xl mx-auto text-center"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                variants={sectionVariants}
            >
                <h2 className="text-4xl font-bold text-gray-800 mb-6">
                    Our <span className="text-purple-600">Case Studies</span>
                </h2>
                <p className="text-lg text-gray-700 leading-relaxed max-w-3xl mx-auto mb-12">
                    Explore our case studies to see how Asipiya Soft Solutions has helped brands grow
                    through tailored strategies in digital marketing, software development, and more.
                </p>

                {/* Case Study Cards with Pagination */}
                <div className="relative flex items-center justify-center">
                    {/* Previous Button */}
                    <button
                        onClick={handlePrevPage}
                        disabled={currentPage === 0}
                        className={`absolute left-2 md:-left-12 lg:-left-20 z-30 p-2 md:p-3 rounded-full bg-purple-600 text-white shadow-lg transition-all duration-300 transform ${currentPage === 0
                            ? 'opacity-50 cursor-not-allowed'
                            : 'hover:bg-purple-700 hover:scale-110'
                            }`}
                        aria-label="Previous case study"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5 md:w-8 md:h-8">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                        </svg>
                    </button>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-6xl mx-8 md:mx-0">
                        <AnimatePresence mode="wait">
                            {paginationData.visibleCaseStudies.map((caseStudy, index) => (
                                <motion.div
                                    key={caseStudy.id}
                                    className="bg-white rounded-xl shadow-lg p-6 flex flex-col items-center text-center border border-gray-100 transform hover:shadow-2xl hover:-translate-y-4 hover:scale-105 transition-all duration-500 ease-out hover:z-10 relative cursor-pointer"
                                    initial={{ opacity: 0, scale: 0.9, x: 100 * (index - (paginationData.cardsPerPage / 2 - 0.5)) }}
                                    animate={{ opacity: 1, scale: 1, x: 0 }}
                                    exit={{ opacity: 0, scale: 0.9, x: -100 * (index - (paginationData.cardsPerPage / 2 - 0.5)) }}
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                    whileHover={{
                                        scale: 1.05,
                                        y: -8,
                                        boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
                                        transition: { duration: 0.3, ease: "easeOut" }
                                    }}
                                >
                                    <img
                                        src={caseStudy.thumbnail}
                                        alt={caseStudy.title}
                                        className="rounded-lg mb-4 w-full h-48 object-cover"
                                        onError={(e) => {
                                            e.target.onerror = null;
                                            e.target.src = genericCaseStudyThumbnail;
                                        }}
                                    />
                                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{caseStudy.title}</h3>
                                    <p className="text-gray-600 mb-4">{caseStudy.description}</p>
                                    <button
                                        onClick={() => navigate(caseStudy.link)}
                                        className="text-purple-600 hover:text-purple-800 font-medium flex items-center gap-1"
                                    >
                                        Read More
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
                                        </svg>
                                    </button>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>

                    {/* Next Button */}
                    <button
                        onClick={handleNextPage}
                        disabled={currentPage === paginationData.totalPages - 1}
                        className={`absolute right-2 md:-right-12 lg:-right-20 z-30 p-2 md:p-3 rounded-full bg-purple-600 text-white shadow-lg transition-all duration-300 transform ${currentPage === paginationData.totalPages - 1
                            ? 'opacity-50 cursor-not-allowed'
                            : 'hover:bg-purple-700 hover:scale-110'
                            }`}
                        aria-label="Next case study"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5 md:w-8 md:h-8">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                        </svg>
                    </button>
                </div>

                {/* Mobile Pagination Dots */}
                <div className="flex justify-center mt-6 space-x-2 md:hidden">
                    {Array.from({ length: paginationData.totalPages }).map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setCurrentPage(index)}
                            className={`w-2 h-2 rounded-full transition-all duration-300 ${index === currentPage
                                ? 'bg-purple-600 w-6'
                                : 'bg-gray-300 hover:bg-purple-300'
                                }`}
                            aria-label={`Go to page ${index + 1}`}
                        />
                    ))}
                </div>
            </motion.section>

            {/* Clients Details Section */}
            <motion.section
                id="clients-details"
                className="py-16 px-4 bg-gradient-to-br from-gray-50 via-purple-50 to-indigo-50 relative overflow-hidden"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                variants={sectionVariants}
            >
                {/* Animated Background Elements */}
                <div className="absolute inset-0 pointer-events-none">
                    <motion.div
                        className="absolute top-20 left-10 w-32 h-32 bg-purple-200 rounded-full opacity-20"
                        animate={{
                            scale: [1, 1.2, 1],
                            rotate: [0, 180, 360],
                        }}
                        transition={{
                            duration: 8,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                    />
                    <motion.div
                        className="absolute bottom-20 right-10 w-24 h-24 bg-indigo-200 rounded-full opacity-20"
                        animate={{
                            scale: [1.2, 1, 1.2],
                            rotate: [360, 180, 0],
                        }}
                        transition={{
                            duration: 6,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                    />
                    <motion.div
                        className="absolute top-1/2 left-1/4 w-16 h-16 bg-pink-200 rounded-full opacity-15"
                        animate={{
                            y: [-20, 20, -20],
                            x: [-10, 10, -10],
                        }}
                        transition={{
                            duration: 4,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                    />
                </div>

                <motion.h2
                    className="text-4xl font-bold text-center text-gray-800 mb-4 relative z-10"
                    initial={{ opacity: 0, y: -30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                >
                    Our Valued <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-600">Clients</span>
                </motion.h2>

                {/* Floating particles effect */}
                <motion.div
                    className="text-center mb-12 relative"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                >
                    <motion.div
                        className="inline-block text-purple-500 text-2xl"
                        animate={{
                            rotate: [0, 10, -10, 0],
                            scale: [1, 1.1, 1]
                        }}
                        transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                    >
                        ✨
                    </motion.div>
                </motion.div>
                {/* Client Logos */}
                <div className="relative max-w-7xl mx-auto">
                    {/* Floating connection lines */}
                    <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-10" style={{ zIndex: 1 }}>
                        <motion.path
                            d="M 0,50 Q 200,20 400,50 T 800,50"
                            stroke="url(#gradient)"
                            strokeWidth="2"
                            fill="none"
                            initial={{ pathLength: 0 }}
                            whileInView={{ pathLength: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 2, delay: 0.5 }}
                        />
                        <defs>
                            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                <stop offset="0%" stopColor="#8B5CF6" />
                                <stop offset="100%" stopColor="#3B82F6" />
                            </linearGradient>
                        </defs>
                    </svg>

                    {/* Desktop Grid Layout */}
                    <div className="hidden md:grid md:grid-cols-4 lg:grid-cols-6 gap-6 relative z-10">
                        {clientLogos.map((logoSrc, index) => (
                            <motion.div
                                key={index}
                                className="group relative"
                                initial={{
                                    opacity: 0,
                                    y: 50,
                                    rotateY: -90,
                                    scale: 0.5
                                }}
                                whileInView={{
                                    opacity: 1,
                                    y: 0,
                                    rotateY: 0,
                                    scale: 1
                                }}
                                viewport={{ once: true, amount: 0.2 }}
                                transition={{
                                    duration: 0.8,
                                    delay: index * 0.1,
                                    type: "spring",
                                    stiffness: 100,
                                    damping: 15
                                }}
                                whileHover={{
                                    y: -15,
                                    rotateY: 5,
                                    rotateX: 5,
                                    scale: 1.1,
                                    transition: { duration: 0.3, ease: "easeOut" }
                                }}
                            >
                                {/* Glowing border effect */}
                                <motion.div
                                    className="absolute inset-0 rounded-xl bg-gradient-to-r from-purple-400 to-indigo-400 opacity-0 group-hover:opacity-30 blur-sm"
                                    initial={false}
                                    animate={{
                                        scale: [1, 1.05, 1],
                                    }}
                                    transition={{
                                        duration: 2,
                                        repeat: Infinity,
                                        ease: "easeInOut"
                                    }}
                                />

                                {/* Main card */}
                                <motion.div
                                    className="relative bg-white/80 backdrop-blur-sm p-4 rounded-xl shadow-lg flex items-center justify-center h-24 border border-white/20 overflow-hidden"
                                    whileHover={{
                                        boxShadow: "0 20px 40px rgba(139, 92, 246, 0.3)",
                                        backgroundColor: "rgba(255, 255, 255, 0.95)"
                                    }}
                                >
                                    {/* Animated background pattern */}
                                    <motion.div
                                        className="absolute inset-0 opacity-5"
                                        style={{
                                            backgroundImage: `repeating-linear-gradient(
                                45deg,
                                transparent,
                                transparent 10px,
                                rgba(139, 92, 246, 0.1) 10px,
                                rgba(139, 92, 246, 0.1) 20px
                            )`
                                        }}
                                        animate={{
                                            x: ["-100%", "100%"]
                                        }}
                                        transition={{
                                            duration: 3,
                                            repeat: Infinity,
                                            ease: "linear"
                                        }}
                                    />

                                    {/* Logo with filter effects */}
                                    <motion.img
                                        src={logoSrc}
                                        alt={`Client Logo ${index + 1}`}
                                        className="max-w-full max-h-full object-contain relative z-10 group-hover:brightness-110 transition-all duration-300"
                                        whileHover={{
                                            filter: "drop-shadow(0 0 20px rgba(139, 92, 246, 0.5))"
                                        }}
                                    />

                                    {/* Floating sparkles */}
                                    <AnimatePresence>
                                        <motion.div
                                            className="absolute top-2 right-2 text-purple-400 text-xs opacity-0 group-hover:opacity-100"
                                            initial={{ scale: 0, rotate: -180 }}
                                            animate={{
                                                scale: [0, 1, 0],
                                                rotate: [0, 180, 360],
                                                y: [-5, -15, -5]
                                            }}
                                            transition={{
                                                duration: 2,
                                                repeat: Infinity,
                                                ease: "easeInOut"
                                            }}
                                        >
                                            ✨
                                        </motion.div>
                                    </AnimatePresence>
                                </motion.div>

                                {/* Ripple effect on hover */}
                                <motion.div
                                    className="absolute inset-0 rounded-xl border-2 border-purple-400 opacity-0 group-hover:opacity-100 pointer-events-none"
                                    animate={{
                                        scale: [1, 1.1, 1.2],
                                        opacity: [0.5, 0.2, 0]
                                    }}
                                    transition={{
                                        duration: 1.5,
                                        repeat: Infinity,
                                        ease: "easeOut"
                                    }}
                                />
                            </motion.div>
                        ))}
                    </div>

                    {/* Mobile Auto-Scrolling Layout */}
                    <div className="md:hidden relative z-10 overflow-hidden">
                        {/* Gradient fade edges */}
                        <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-gray-50 via-purple-50 to-transparent z-20 pointer-events-none"></div>
                        <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-gray-50 via-purple-50 to-transparent z-20 pointer-events-none"></div>

                        {/* Auto-scrolling container */}
                        <motion.div
                            className="flex gap-4 pb-4 px-4"
                            animate={{
                                x: [0, -(clientLogos.length * 96 - (typeof window !== 'undefined' ? window.innerWidth - 64 : 300))]
                            }}
                            transition={{
                                duration: clientLogos.length * 2,
                                repeat: Infinity,
                                repeatType: "reverse",
                                ease: "linear"
                            }}
                        >
                            {clientLogos.map((logoSrc, index) => (
                                <motion.div
                                    key={index}
                                    className="group relative flex-shrink-0"
                                    initial={{
                                        opacity: 0,
                                        y: 20,
                                        scale: 0.8
                                    }}
                                    whileInView={{
                                        opacity: 1,
                                        y: 0,
                                        scale: 1
                                    }}
                                    viewport={{ once: true, amount: 0.2 }}
                                    transition={{
                                        duration: 0.6,
                                        delay: index * 0.05,
                                        type: "spring",
                                        stiffness: 100,
                                        damping: 15
                                    }}
                                >
                                    {/* Glowing border effect */}
                                    <motion.div
                                        className="absolute inset-0 rounded-xl bg-gradient-to-r from-purple-400 to-indigo-400 opacity-0 blur-sm"
                                        animate={{
                                            scale: [1, 1.02, 1],
                                            opacity: [0, 0.1, 0]
                                        }}
                                        transition={{
                                            duration: 3,
                                            repeat: Infinity,
                                            ease: "easeInOut",
                                            delay: index * 0.2
                                        }}
                                    />

                                    {/* Main card */}
                                    <motion.div
                                        className="relative bg-white/90 backdrop-blur-sm p-3 rounded-xl shadow-md flex items-center justify-center w-20 h-16 border border-white/30 overflow-hidden"
                                        whileHover={{
                                            scale: 1.05,
                                            backgroundColor: "rgba(255, 255, 255, 0.95)"
                                        }}
                                        transition={{ duration: 0.2 }}
                                    >
                                        {/* Animated background pattern */}
                                        <motion.div
                                            className="absolute inset-0 opacity-3"
                                            style={{
                                                backgroundImage: `repeating-linear-gradient(
                                    45deg,
                                    transparent,
                                    transparent 8px,
                                    rgba(139, 92, 246, 0.05) 8px,
                                    rgba(139, 92, 246, 0.05) 16px
                                )`
                                            }}
                                            animate={{
                                                x: ["-100%", "100%"]
                                            }}
                                            transition={{
                                                duration: 4,
                                                repeat: Infinity,
                                                ease: "linear"
                                            }}
                                        />

                                        {/* Logo */}
                                        <motion.img
                                            src={logoSrc}
                                            alt={`Client Logo ${index + 1}`}
                                            className="max-w-full max-h-full object-contain relative z-10 transition-all duration-200"
                                            whileHover={{
                                                filter: "drop-shadow(0 0 10px rgba(139, 92, 246, 0.3))"
                                            }}
                                        />
                                    </motion.div>
                                </motion.div>
                            ))}
                        </motion.div>
                    </div>
                </div>

                {/* Enhanced description with typing effect */}
                <motion.div
                    className="text-center mt-16 relative z-10"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.5 }}
                >
                    <motion.p
                        className="text-gray-600 text-lg max-w-2xl mx-auto leading-relaxed"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 0.7 }}
                    >
                        We're proud to partner with businesses of all sizes, helping them achieve their
                        <motion.span
                            className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-600 font-semibold"
                            animate={{
                                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"]
                            }}
                            transition={{
                                duration: 3,
                                repeat: Infinity,
                                ease: "easeInOut"
                            }}
                        >
                            {" "}digital transformation goals
                        </motion.span>
                        .
                    </motion.p>

                    {/* Animated statistics */}
                    <motion.div
                        className="flex justify-center items-center gap-8 mt-8"
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 1 }}
                    >
                        <motion.div
                            className="text-center"
                            whileHover={{ scale: 1.1 }}
                        >
                            <motion.div
                                className="text-2xl font-bold text-purple-600"
                                animate={{ scale: [1, 1.05, 1] }}
                                transition={{ duration: 2, repeat: Infinity }}
                            >
                                {/* {clientLogos.length}+ */}50+
                            </motion.div>
                            <div className="text-sm text-gray-500">Clients</div>
                        </motion.div>

                        <motion.div
                            className="w-px h-12 bg-gray-300"
                            initial={{ height: 0 }}
                            whileInView={{ height: 48 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: 1.2 }}
                        />

                        <motion.div
                            className="text-center"
                            whileHover={{ scale: 1.1 }}
                        >
                            <motion.div
                                className="text-2xl font-bold text-indigo-600"
                                animate={{ scale: [1, 1.05, 1] }}
                                transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                            >
                                100%
                            </motion.div>
                            <div className="text-sm text-gray-500">Success Rate</div>
                        </motion.div>
                    </motion.div>
                </motion.div>
            </motion.section>

            {/* FAQ Section */}
            <motion.section
                id="faq"
                className="py-16 px-4 max-w-7xl mx-auto"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                variants={sectionVariants}
            >
                <h2 className="text-4xl font-bold text-center text-gray-800 mb-12">
                    Frequently Asked <span className="text-purple-600">Questions</span>
                </h2>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Left Column */}
                    <div className="space-y-4">
                        {faqs.filter((_, index) => index % 2 === 0).map((faq, index) => (
                            <motion.div
                                key={index * 2}
                                initial={{ opacity: 0, x: -30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true, amount: 0.2 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                            >
                                <Accordion title={faq.question}>
                                    <p className="text-gray-700 leading-relaxed">{faq.answer}</p>
                                </Accordion>
                            </motion.div>
                        ))}
                    </div>

                    {/* Right Column */}
                    <div className="space-y-4">
                        {faqs.filter((_, index) => index % 2 === 1).map((faq, index) => (
                            <motion.div
                                key={index * 2 + 1}
                                initial={{ opacity: 0, x: 30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true, amount: 0.2 }}
                                transition={{ duration: 0.5, delay: index * 0.1 + 0.05 }}
                            >
                                <Accordion title={faq.question}>
                                    <p className="text-gray-700 leading-relaxed">{faq.answer}</p>
                                </Accordion>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </motion.section>

            <GoToTopButton />
            <Footer />
        </div>
    );
};

export default InsightsPage;