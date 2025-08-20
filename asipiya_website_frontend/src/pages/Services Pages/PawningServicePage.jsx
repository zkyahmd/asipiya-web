import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import GoToTopButton from "../../components/GoToTopButton";
import pawningBannerImage from "../../assets/pawningBanner.jpg";
import pawningBenefitsImage from "../../assets/pawningBenefitsImage.jpg";
import ServicePageBanner from "../../components/motion/ServicePageBanner";
import reasonsBg from "../../assets/MicrofinanceImg1.jpg";
import ServiceNavigation from "../../components/ServiceNavigation";

const PawningServicePage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-50 via-purple-100 to-purple-200 font-sans">
      <Navbar />

      {/* Hero Section */}
      <ServicePageBanner bannerSrc={pawningBannerImage} altText="Pawning Systems Banner">
        <div className="relative z-20 text-center px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-3xl sm:text-4xl md:text-6xl font-extrabold text-white drop-shadow-lg mb-4"
          >
            Pawning Systems <br /> for Secure Gold Loans
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-white text-base sm:text-lg md:text-xl leading-relaxed drop-shadow-md"
          >
            Manage your entire gold loan lifecycle with our comprehensive, secure, and efficient digital platform.
          </motion.p>
        </div>
      </ServicePageBanner>

      {/* Introduction Section */}
      <motion.section
        className="py-16 px-4 sm:px-6 max-w-6xl mx-auto text-center"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={sectionVariants}
      >
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-6">
          The Asipiya <span className="text-purple-600">Pawning Systems</span>
        </h2>
        <p className="text-base sm:text-lg text-gray-700 leading-relaxed max-w-3xl mx-auto mb-4">
          The Asipiya Pawning Systems is a comprehensive digital platform designed to manage the entire gold loan lifecycle — from pawn acceptance and valuation to repayment, renewal, and auction.
        </p>
        <p className="text-base sm:text-lg text-gray-700 leading-relaxed max-w-3xl mx-auto">
          With built-in automation, real-time tracking, and robust security protocols, the system ensures accuracy, transparency, and confidence — for both your organization and your customers.
        </p>
      </motion.section>

      {/* Key Features Section */}
      <motion.section
        className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 bg-white"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={sectionVariants}
      >
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-center text-gray-800 mb-8 sm:mb-12 lg:mb-16">
            Key <span className="text-purple-600">Features</span>
          </h2>

          {/* Mobile Swiper */}
          <div className="block md:hidden">
            <Swiper
              modules={[Pagination, Autoplay]}
              spaceBetween={20}
              slidesPerView={1}
              loop={true}
              autoplay={{
                delay: 3000,
                disableOnInteraction: false,
              }}
              pagination={{ clickable: true }}
            >
              {[
                {
                  title: "Automated Pawn Ticket Generation",
                  icon: "🎟️",
                  description: "Instantly generate digital pawn tickets with all relevant loan details, borrower info, gold specs, and terms.",
                },
                {
                  title: "Real-Time Gold Valuation",
                  icon: "⚖️",
                  description: "Access gold rates and apply weight-based pricing instantly during pledge entry.",
                },
                {
                  title: "Customer KYC & Profile Management",
                  icon: "🆔",
                  description: "Digitally collect, verify, and store customer IDs and docs to stay compliant.",
                },
                {
                  title: "Interest & Penalty Calculations",
                  icon: "🧮",
                  description: "Automate interest and penalty calculations based on time and terms.",
                },
                {
                  title: "Inventory & Vault Tracking",
                  icon: "🔒",
                  description: "Track pledged gold items with inventory logs, vault locations, and audit trails.",
                },
                {
                  title: "Loan Renewal & Auction Handling",
                  icon: "🔨",
                  description: "Renew loans easily and manage auctions with workflow automation.",
                },
                {
                  title: "Multi-Branch & Role-Based Access",
                  icon: "🏢",
                  description: "Operate across multiple branches with role-based user access.",
                },
                {
                  title: "Alerts & Notifications",
                  icon: "🔔",
                  description: "Send alerts via SMS/email for dues, renewals, and auctions.",
                },
              ].map((feature, index) => (
                <SwiperSlide key={index}>
                  <motion.div
                    className="bg-purple-200 p-6 rounded-xl shadow-lg text-center"
                    style={{
                      width: "280px",
                      height: "320px",
                      margin: "0 auto",
                    }}
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: false, amount: 0.2 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                  >
                    <div className="text-5xl mb-4">{feature.icon}</div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 text-sm">{feature.description}</p>
                  </motion.div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          {/* Desktop Grid */}
          <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            {[
              {
                title: "Automated Pawn Ticket Generation",
                icon: "🎟️",
                description: "Instantly generate digital pawn tickets with all relevant loan details, borrower info, gold specs, and terms.",
              },
              {
                title: "Real-Time Gold Valuation",
                icon: "⚖️",
                description: "Access gold rates and apply weight-based pricing instantly during pledge entry.",
              },
              {
                title: "Customer KYC & Profile Management",
                icon: "🆔",
                description: "Digitally collect, verify, and store customer IDs and docs to stay compliant.",
              },
              {
                title: "Interest & Penalty Calculations",
                icon: "🧮",
                description: "Automate interest and penalty calculations based on time and terms.",
              },
              {
                title: "Inventory & Vault Tracking",
                icon: "🔒",
                description: "Track pledged gold items with inventory logs, vault locations, and audit trails.",
              },
              {
                title: "Loan Renewal & Auction Handling",
                icon: "🔨",
                description: "Renew loans easily and manage auctions with workflow automation.",
              },
              {
                title: "Multi-Branch & Role-Based Access",
                icon: "🏢",
                description: "Operate across multiple branches with role-based user access.",
              },
              {
                title: "Alerts & Notifications",
                icon: "🔔",
                description: "Send alerts via SMS/email for dues, renewals, and auctions.",
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                className="bg-purple-200 p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 text-center"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.2 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              >
                <div className="text-5xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Benefits Section */}
      <motion.section
        className="relative py-12 px-4 sm:py-16 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${reasonsBg})` }}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={sectionVariants}
      >
        <div className="absolute inset-0 bg-black/60 z-0" />
        <div className="relative z-10 max-w-6xl mx-auto p-4 sm:p-8 rounded-xl shadow-lg">
          <h2 className="text-3xl sm:text-4xl font-bold text-center text-white mb-12">
            Why Choose <span className="text-purple-600">Asipiya’s Pawning Systems</span>?
          </h2>
          <div className="hidden sm:flex flex-col lg:flex-row items-center gap-10">
            <div className="w-full md:w-1/2">
              <img
                src={pawningBenefitsImage}
                alt="Pawning Benefits"
                className="rounded-xl shadow-lg w-full h-48 sm:h-64 md:h-80 lg:h-96 object-cover border-4 border-white"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "https://placehold.co/600x400/8A2BE2/ffffff?text=Pawning+Benefits";
                }}
              />
            </div>
            <div className="md:w-1/2 space-y-6">
              {[
                {
                  title: "Enhanced Operational Efficiency",
                  description: "Say goodbye to manual ledgers. Automate ticketing, accounting, and more.",
                },
                {
                  title: "User-Friendly Interface",
                  description: "Simple dashboards and workflows allow quick adaptation with minimal training.",
                },
                {
                  title: "Data-Driven Insights",
                  description: "Real-time reporting helps optimize pricing, assess risk, and reduce defaults.",
                },
                {
                  title: "Highly Customizable",
                  description: "Adapt to your unique formats, rules, and workflows — scales as you grow.",
                },
                {
                  title: "Security & Compliance First",
                  description: "Encrypted logs, user controls, and audit trails keep your data safe.",
                },
              ].map((benefit, index) => (
                <motion.div
                  key={index}
                  className="flex items-start gap-4 p-4 bg-black bg-opacity-40 rounded-lg shadow-md"
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <div className="text-purple-600 text-2xl sm:text-3xl flex-shrink-0">✔</div>
                  <div>
                    <h3 className="text-lg sm:text-xl font-semibold text-white mb-1">
                      {benefit.title}
                    </h3>
                    <p className="text-white text-sm sm:text-base text-justify">{benefit.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Inline style for purple swiper dots */}
          <style>{`
            .swiper-pagination-bullet {
              background-color: #a855f7; /* Tailwind purple-600 */
              opacity: 0.5;
            }
            .swiper-pagination-bullet-active {
              background-color: #a855f7;
              opacity: 1;
            }
          `}</style>

          {/* Swiper for mobile */}
          <div className="block sm:hidden">
            <Swiper
              spaceBetween={16}
              slidesPerView={1}
              pagination={{ clickable: true }}
              autoplay={{ delay: 3000, disableOnInteraction: false }}
              modules={[Pagination, Autoplay]}
              loop
            >
              {[
                {
                  title: "Enhanced Operational Efficiency",
                  description: "Say goodbye to manual ledgers. Automate ticketing, accounting, and more.",
                },
                {
                  title: "User-Friendly Interface",
                  description: "Simple dashboards and workflows allow quick adaptation with minimal training.",
                },
                {
                  title: "Data-Driven Insights",
                  description: "Real-time reporting helps optimize pricing, assess risk, and reduce defaults.",
                },
                {
                  title: "Highly Customizable",
                  description: "Adapt to your unique formats, rules, and workflows — scales as you grow.",
                },
                {
                  title: "Security & Compliance First",
                  description: "Encrypted logs, user controls, and audit trails keep your data safe.",
                },
              ].map((reason, index) => (
                <SwiperSlide key={index}>
                  <motion.div
                    className="flex flex-col items-start gap-3 p-4 bg-black bg-opacity-40 rounded-lg shadow-md"
                    style={{
                      width: "300px",
                      height: "310px",
                      margin: "0 auto",
                    }}
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: false, amount: 0.2 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                  >
                    <div className="text-purple-600 text-2xl">✔</div>
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-1">
                        {reason.title}
                      </h3>
                      <p className="text-sm text-white text-justify">{reason.description}</p>
                    </div>
                  </motion.div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </motion.section>

      {/* Our Approach */}
      <motion.section
        className="py-16 px-4 sm:px-6 bg-gradient-to-r from-purple-700 to-indigo-700 text-white"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={sectionVariants}
      >
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-12">
            Our <span className="text-yellow-300">Approach</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-10">
            {[
              {
                title: "Customization",
                description: "Tailored to fit your unique business workflows.",
              },
              {
                title: "Seamless Implementation",
                description: "Expert team ensures a smooth transition.",
              },
              {
                title: "Training & Support",
                description: "Hands-on training and continued support.",
              },
            ].map((approach, index) => (
              <motion.div
                key={index}
                className="bg-white bg-opacity-10 p-6 rounded-xl shadow-lg border border-purple-500 hover:border-yellow-300 transition-all duration-300 transform hover:-translate-y-2"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <h3 className="text-xl sm:text-2xl font-semibold mb-3 text-yellow-300">{approach.title}</h3>
                <p className="text-purple-100 text-sm sm:text-base">{approach.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Call to Action */}
      <motion.section
        className="py-20 px-4 sm:px-6 text-center bg-gray-50"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={sectionVariants}
      >
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-6">
          Designed for Modern <span className="text-purple-600">Pawning Operations</span>
        </h2>
        <p className="text-base sm:text-xl text-gray-700 mb-8 max-w-2xl mx-auto">
          Whether you're a single-branch lender or a multi-location institution, our system scales to fit your needs.
        </p>
        <motion.button
          onClick={() => navigate("/contact-us")}
          className="bg-purple-600 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full font-semibold text-base sm:text-lg shadow-lg hover:bg-purple-700 transition-all duration-300 transform hover:scale-105"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Get a Free Consultation
        </motion.button>
      </motion.section>

      {/* Back to Services */}
      {/* <div className="py-10 px-4 text-center">
        <button
          onClick={() => navigate("/ServiceHome")}
          className="inline-flex items-center gap-2 bg-gray-200 text-gray-800 px-6 py-3 rounded-full font-medium hover:bg-gray-300 transition-all duration-300 shadow-md"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to All Services
        </button>
      </div> */}
      <ServiceNavigation currentServiceId="pawning" />

      <GoToTopButton />
      <Footer />
    </div>
  );
};

export default PawningServicePage;
