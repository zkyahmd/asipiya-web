import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import GoToTopButton from "../../components/GoToTopButton";
import leasingPageBanner from "../../assets/LeasingSystemBanner.jpg";
import leasingImg from "../../assets/LeasingSystemBannerImg.png";
import reasonsBg from "../../assets/MicrofinanceImg1.jpg";
import ServicePageBanner from "../../components/motion/ServicePageBanner";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination, Autoplay } from "swiper/modules";
import ServiceNavigation from "../../components/ServiceNavigation";

// Animation variant for feature cards
const staggeredFade = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 1) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.2,
      duration: 0.6,
      ease: "easeOut",
    },
  }),
};

const LeasingSystem = () => {
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
      icon: "🚗",
      title: "Vehicle & Asset Management",
      description:
        "Track all physical assets or vehicles with detailed records including ownership, depreciation, insurance, service history, and usage. Maintain complete visibility over your leasing inventory.",
    },
    {
      icon: "📄",
      title: "Lease Agreement Management",
      description:
        "Digitize lease contracts with customizable terms, interest rates, payment schedules, and document uploads. Automate renewals, alerts, and agreement generation to minimize human error.",
    },
    {
      icon: "💳",
      title: "Integrated Payment & Billing System",
      description:
        "Generate invoices, automate due date reminders, track late fees, and monitor payment history - all within a secure and real-time billing engine.",
    },
    {
      icon: "📈",
      title: "Financial Reports & Analytics",
      description:
        "Generate detailed reports including profit/loss summaries, asset performance, portfolio health, and account aging to evaluate the financial health of your leasing operations.",
    },
    {
      icon: "💰",
      title: "Cash Flow Tracking",
      description:
        "Monitor incoming and outgoing cash tied to each lease, helping your team better manage liquidity and budgeting for both short-term and long-term planning.",
    },
    {
      icon: "📊",
      title: "Balance Sheet & P&L Statements",
      description:
        "Auto-generate key financial statements with accurate lease revenue, asset depreciation, and operating costs - reducing the need for manual calculations.",
    },
    {
      icon: "🛡️",
      title: "Compliance & Audit Readiness",
      description:
        "Keep your records audit-ready with a transparent log of all transactions, document uploads, customer interactions, and system-generated reports.",
    },
  ];

  const reasons = [
    {
      title: "Enhanced Efficiency",
      description:
        "Automate routine tasks such as agreement creation, billing reminders, and payment tracking. Free up your team to focus on strategy and client service.",
    },
    {
      title: "User-Friendly Interface",
      description:
        "Our intuitive dashboard and clear workflows make it easy for your staff to manage leases, generate reports, and serve customers — with minimal training.",
    },
    {
      title: "Data-Driven Insights",
      description:
        "Make better, faster decisions with in-depth analytics on leasing performance, payment trends, and customer behavior. Visual dashboards bring clarity to your KPIs.",
    },
    {
      title: "Customizable Features",
      description:
        "From lease types and asset categories to contract templates and billing logic, the system is highly flexible, built to fit your unique business model and operational requirements.",
    },
    {
      title: "Secure & Scalable",
      description:
        "Built with enterprise-grade security and the ability to scale with your business growth, our solution supports multi-branch operations, role-based access, and cloud backup.",
    },
  ];

  return (
    <div className="bg-gradient-to-r from-purple-50 via-purple-100 to-purple-200 font-sans">
      <Navbar />

      {/* Hero / Banner Section */}
      <ServicePageBanner bannerSrc={leasingPageBanner} altText="Leasing Banner">
        {showBannerText && (
          <div className="relative z-20 px-4 w-full max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
              className="text-center md:text-left md:max-w-xl"
            >
              <h1 className="text-4xl md:text-5xl font-extrabold text-white drop-shadow-xl mb-4">
                Leasing Management System
              </h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.2 }}
                className="text-white text-md md:text-lg leading-relaxed drop-shadow-md"
              >
                Simplify and automate the full leasing lifecycle with a powerful
                platform designed for leasing companies and asset managers.
              </motion.p>
            </motion.div>

            <motion.img
              src={leasingImg}
              alt="Leasing System"
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
              className="w-70 md:w-90 mt-10 md:mt-0"
            />
          </div>
        )}
      </ServicePageBanner>

      {/* Overview Section */}
      <motion.section
        className="py-16 px-4 max-w-6xl mx-auto text-center"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.2 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <h2 className="text-4xl font-bold text-gray-800 mb-6">
          Smarter <span className="text-purple-600">Leasing</span> Starts Here
        </h2>
        <p className="text-lg text-gray-700 leading-relaxed max-w-3xl mx-auto">
          Managing vehicle and asset leases shouldn’t be complicated - and with
          Asipiya's Leasing Management System, it isn’t. Our end-to-end platform
          is built to simplify, automate, and optimize every step of the leasing
          lifecycle - from initial application to contract closure.
        </p>
      </motion.section>

      {/* Features Section */}
      <motion.section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-gray-800 mb-12">
            Key <span className="text-purple-600">Features</span>
          </h2>

          {/* Mobile Slider */}
          <div className="block md:hidden">
            <Swiper
              modules={[Pagination, Autoplay]}
              spaceBetween={20}
              slidesPerView={1}
              loop={true}
              autoplay={{ delay: 3000 }}
              pagination={{ clickable: true }}
            >
              {features.map((feature, index) => (
                <SwiperSlide key={index}>
                  <motion.div
                    className="bg-purple-200 p-6 rounded-xl shadow-lg text-center"
                    style={{
                      width: "280px",
                      height: "360px",
                      margin: "0 auto",
                    }}
                    variants={staggeredFade}
                    initial="hidden"
                    whileInView="visible"
                    custom={index}
                    viewport={{ once: false, amount: 0.2 }}
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
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false, amount: 0.2 }}
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

      {/* Why Choose Asipiya Section */}
      <motion.section
        className="relative py-16 px-4 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${reasonsBg})` }}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
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
        <div className="relative z-10 max-w-6xl mx-auto p-8">
          <motion.h2
            className="text-2xl sm:text-4xl font-bold text-center text-white mb-8 sm:mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
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
                      width: "280px",
                      height: "300px",
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

      {/* Our Approach Section */}
      <motion.section
        className="py-16 px-4 bg-gradient-to-r from-purple-700 to-indigo-700 text-white"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.2 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
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
                  "We tailor solutions to fit your unique business processes and requirements, ensuring a perfect fit.",
              },
              {
                title: "Seamless Implementation",
                description:
                  "Our expert team ensures a smooth transition with minimal disruption to your daily operations.",
              },
              {
                title: "Training & Support",
                description:
                  "We provide comprehensive training and ongoing support to maximize your team's proficiency and system performance.",
              },
            ].map((approach, index) => (
              <motion.div
                key={index}
                className="bg-white bg-opacity-10 p-6 rounded-xl shadow-lg border border-purple-500 hover:border-yellow-300 transition-all duration-300 transform hover:-translate-y-2"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.2 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              >
                <h3 className="text-2xl font-semibold mb-3 text-yellow-300">
                  {approach.title}
                </h3>
                <p className="text-purple-100">{approach.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Call to Action */}
      <motion.section
        className="py-20 px-4 text-center bg-gray-50"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.2 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <h2 className="text-4xl font-bold text-gray-800 mb-6">
          Streamline Leasing with{" "}
          <span className="text-purple-600">Asipiya</span>
        </h2>
        <p className="text-xl text-gray-700 mb-8 max-w-2xl mx-auto">
          A comprehensive system to manage every part of your leasing business —
          securely and intelligently.
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
      <ServiceNavigation currentServiceId="leasing" />

      <Footer />
      <GoToTopButton />
    </div>
  );
};

export default LeasingSystem;
