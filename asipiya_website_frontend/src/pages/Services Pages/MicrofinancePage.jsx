import React, { useState, useEffect } from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import GoToTopButton from "../../components/GoToTopButton";
import microfinancePageBanner from "../../assets/MicrofinancePageBanner.jpg";
import microfinanceImg from "../../assets/img1.png";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import ServicePageBanner from "../../components/motion/ServicePageBanner";
import reasonsBg from "../../assets/MicrofinanceImg1.jpg";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination, Autoplay } from "swiper/modules";
import ServiceNavigation from "../../components/ServiceNavigation";

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const staggeredFade = {
  hidden: { opacity: 0, y: 40 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      delay: i * 0.15,
      ease: "easeOut",
    },
  }),
};

const reasonsAnimation = {
  hidden: { opacity: 0, y: 30 },
  visible: (index) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: index * 0.2, ease: "easeOut" },
  }),
};

const MicrofinancePage = () => {
  const [showBannerText, setShowBannerText] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setShowBannerText(window.scrollY < 500);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const features = [
    {
      title: "Individual and Group Loan Management",
      icon: "👥",
      description:
        "Easily manage individual and group-based lending schemes with flexible installments, interest types, and payment schedules.",
    },
    {
      title: "Penalty Handling & Automation",
      icon: "⚖️",
      description:
        "Automated penalty calculations for overdue payments ensure repayment discipline with zero manual effort.",
    },
    {
      title: "Unlimited Document Uploads",
      icon: "📂",
      description:
        "Store NICs, agreements, and collateral proofs under client profiles for seamless recordkeeping.",
    },
    {
      title: "Advanced Risk Management Reports",
      icon: "📉",
      description:
        "Identify risks early through dynamic reports that analyze overdue loans, defaults, and borrower behaviors.",
    },
    {
      title: "Smart Collection Reports",
      icon: "🗓️",
      description:
        "Field officers get real-time access to collection schedules and outstanding loan details.",
    },
    {
      title: "Predictive Analytics",
      icon: "📈",
      description:
        "Forecast repayment patterns and detect high-risk customers using historical data.",
    },
    {
      title: "Cashier & Financial Reports",
      icon: "💰",
      description:
        "Track daily cash flows, transactions, and branch-level summaries with comprehensive financial reports.",
    },
    {
      title: "Agreement Printing",
      icon: "🖨️",
      description:
        "Instantly generate loan agreements with auto-filled borrower and loan details.",
    },
    {
      title: "Branch-Wise Operational Management",
      icon: "🏢",
      description:
        "Manage multiple branches with role-based access, branch dashboards, and centralized control.",
    },
  ];

  const reasons = [
    {
      title: "Mobile-Optimized Accessibility",
      description:
        "Designed to function seamlessly on smartphones and tablets, allowing field officers and loan officers to access and update data from anywhere - even in remote, low-connectivity areas.",
    },
    {
      title: "Bank-Grade Data Security",
      description:
        "We implement top-tier security protocols including encrypted data transmission, role-based access control, and secure backup management to ensure your sensitive financial and customer data is always protected.",
    },
    {
      title: "Actionable, Data-Driven Insights",
      description:
        "With built-in analytics and visual dashboards, your team can monitor performance, identify trends, and make evidence-based decisions to scale operations efficiently.",
    },
    {
      title: "Integrated Accounting Module",
      description: (
        <>
          Our platform comes with a robust accounting engine that supports:
          <ul className="list-disc ml-6 mt-2 text-sm text-white space-y-1">
            <li>Auto-generated financial reports</li>
            <li>Manual journal entries</li>
            <li>Reduced paperwork</li>
            <li>Transparent audits</li>
          </ul>
          <p className="mt-2">
            All of this helps your team manage finances more accurately and
            reduce the risk of human error.
          </p>
        </>
      ),
    },
  ];

  return (
    <div className="bg-gradient-to-r from-purple-50 via-purple-100 to-purple-200 min-h-screen font-sans">
      <Navbar />

      <ServicePageBanner
        bannerSrc={microfinancePageBanner}
        altText="Microfinance Banner"
      >
        {showBannerText && (
          <div className="relative z-20 px-4 w-full max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
              className="text-center md:text-left md:max-w-xl"
            >
              <h1 className="text-4xl md:text-5xl font-extrabold text-white drop-shadow-xl mb-4">
                Microfinance Solutions
              </h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.2 }}
                className="text-white text-md md:text-lg leading-relaxed drop-shadow-md"
              >
                Empower financial inclusion with robust tools to manage client
                onboarding, loans, repayments, and reporting.
              </motion.p>
            </motion.div>

            <motion.img
              src={microfinanceImg}
              alt="Microfinance"
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
              className="w-70 md:w-90 mt-10 md:mt-0"
            />
          </div>
        )}
      </ServicePageBanner>

      <motion.section
        className="py-16 px-4 max-w-6xl mx-auto text-center"
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <h2 className="text-4xl font-bold text-gray-800 mb-6">
          What is <span className="text-purple-600">Microfinance</span>?
        </h2>
        <p className="text-lg text-gray-700 leading-relaxed max-w-3xl mx-auto">
          At Asipiya Soft Solutions, We understand the unique challenges faced
          by microfinance institutions from managing scattered field operations
          to tracking repayments across thousands of customers. That’s why we’ve
          developed a comprehensive Microfinance Management System that
          digitizes and automates your entire loan lifecycle...
        </p>
      </motion.section>

      {/* Features */}
      <motion.section
        className="py-16 px-4"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-gray-800 mb-12">
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
              {features.map((feature, index) => (
                <SwiperSlide key={index}>
                  <motion.div
                    className="bg-purple-200 p-6 rounded-xl shadow-lg text-center"
                    style={{
                      width: "280px",
                      height: "320px",
                      margin: "0 auto",
                    }}
                    custom={index}
                    variants={staggeredFade}
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
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          {/* Desktop Grid */}
          <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className="bg-purple-200 p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 text-center"
                custom={index}
                variants={staggeredFade}
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

      {/* Why Choose Asipiya */}
      <motion.section
        className="relative py-12 px-4 sm:py-16 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${reasonsBg})` }}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
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

        <div className="absolute inset-0 bg-black/60 z-0" />
        <div className="relative z-10 max-w-6xl mx-auto p-4 sm:p-8 rounded-xl shadow-lg">
          <motion.h2
            className="text-2xl sm:text-4xl font-bold text-center text-white mb-8 sm:mb-12"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            Why Choose the{" "}
            <span className="text-purple-600">
              Asipiya Microfinance System
            </span>?
          </motion.h2>

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
              {reasons.map((reason, index) => (
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
                    {/* <div className="text-purple-600 text-2xl">✔</div> */}
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

          {/* Static list for desktop */}
          <div className="hidden sm:block space-y-8">
            {reasons.map((reason, index) => (
              <motion.div
                key={index}
                className="flex items-start gap-4 p-4 bg-black bg-opacity-40 rounded-lg shadow-md"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.2 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              >
                <div className="text-purple-600 text-3xl flex-shrink-0">✔</div>
                <div>
                  <h3 className="text-xl font-semibold text-white mb-1">
                    {reason.title}
                  </h3>
                  <p className="text-white">{reason.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Our Approach */}
      <motion.section
        className="py-16 px-4 bg-gradient-to-r from-purple-700 to-indigo-700 text-white"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-12">
            Our <span className="text-yellow-300">Approach</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
              {
                title: "Customization",
                description:
                  "Tailored configurations to suit your workflows and regional needs.",
              },
              {
                title: "Seamless Implementation",
                description:
                  "We ensure quick deployment with minimal disruption to operations.",
              },
              {
                title: "Training & Support",
                description:
                  "Our team trains your staff and provides ongoing support for success.",
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                className="bg-white bg-opacity-10 p-6 rounded-xl shadow-lg border border-purple-500 hover:border-yellow-300 transition-all duration-300 transform hover:-translate-y-2"
                custom={index}
                variants={staggeredFade}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.2 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              >
                <h3 className="text-2xl font-semibold mb-3 text-yellow-300">
                  {item.title}
                </h3>
                <p className="text-purple-100">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* CTA Section */}
      <motion.section
        className="py-20 px-4 text-center bg-gray-50"
        variants={fadeInUp}
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.2 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <h2 className="text-4xl font-bold text-gray-800 mb-6">
          Empower Microfinance with{" "}
          <span className="text-purple-600">Asipiya</span>
        </h2>
        <p className="text-xl text-gray-700 mb-8 max-w-2xl mx-auto">
          Transform operations, reach more clients, and scale with our secure,
          modern microfinance platform.
        </p>
        <motion.button
          onClick={() => navigate("/contact-us")}
          className="bg-purple-600 text-white px-8 py-4 rounded-full font-semibold text-lg shadow-lg hover:bg-purple-700 transition-all duration-300 transform hover:scale-105"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Get a Free Consultation
        </motion.button>
      </motion.section>
      <ServiceNavigation currentServiceId="microfinance" />

      <Footer />
      <GoToTopButton />
    </div>
  );
};

export default MicrofinancePage;
