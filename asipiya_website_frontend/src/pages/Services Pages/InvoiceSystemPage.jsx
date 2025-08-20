import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import GoToTopButton from "../../components/GoToTopButton";
import invoiceBanner from "../../assets/InvoiceSystemPageBanner.jpg";
import invoiceImg from "../../assets/invoiceBannerImg.png";
import backgroundImage from "../../assets/MicrofinanceImg1.jpg";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import ServicePageBanner from "../../components/motion/ServicePageBanner";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import ServiceNavigation from "../../components/ServiceNavigation";

const InvoiceSystemPage = () => {
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

  const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const features = [
    {
      title: "Invoice & Billing Management",
      icon: "🧾",
      description:
        "Generate professional invoices, track payments, manage credit notes, and ensure accurate billing across all transactions.",
    },
    {
      title: "Customer & Supplier Management",
      icon: "🤝",
      description:
        "Keep a detailed, searchable database of all your clients and vendors with history logs, contact records, and payment tracking.",
    },
    {
      title: "Inventory & Stock Tracking",
      icon: "📦",
      description:
        "Monitor stock levels, track product movement, manage reorders, and reduce stockouts with real-time inventory updates.",
    },
    {
      title: "Quotation & Purchase Orders",
      icon: "📑",
      description:
        "Easily create and convert quotations into invoices or generate purchase orders with approval workflows and supplier tracking.",
    },
    {
      title: "Expense & Income Recording",
      icon: "💵",
      description:
        "Track business expenses and income streams in real time, helping you stay on top of profitability and cash flow.",
    },
    {
      title: "Tax & Discount Configurations",
      icon: "💼",
      description:
        "Automatically apply taxes, VAT, and custom discounts tailored to your business or regulatory needs.",
    },
    {
      title: "Customizable Reports & Dashboards",
      icon: "📊",
      description:
        "Access real-time dashboards and generate detailed reports on sales, expenses, inventory, and customer trends.",
    },
    {
      title: "Multi-User Access & Role-Based Permissions",
      icon: "🔐",
      description:
        "Control who can view or edit each module with secure, role-based access — ideal for growing teams.",
    },
    {
      title: " Real-Time Data Sync & Secure Backup",
      icon: "🔄",
      description:
        "Keep your data synced, secured, and always available with automated backups.",
    },
    {
      title: " User-Friendly Interface",
      icon: "🧑‍💻 ",
      description:
        "Designed for ease of use-no technical background required. Just log in, manage, and grow.",
    },
  ];

  const benefits = [
    {
      title: "All-in-One Solution",
      description:
        "No more juggling multiple tools. Run your invoicing, inventory, purchases, and reports through a single, centralized platform.",
    },
    {
      title: "Tailored to Your Business",
      description:
        "We understand that every business is unique. That’s why our system is modular and fully customizable - allowing you to adapt workflows, fields, and features to fit your exact industry needs.",
    },
    {
      title: "User-Friendly Design",
      description:
        "Built for simplicity and efficiency, the interface is intuitive even for non-technical users, with guided steps and helpful tooltips throughout.",
    },
    {
      title: "Real-Time Business Intelligence",
      description:
        "Gain instant access to up-to-date metrics, cash flow reports, and customer insights. Make informed decisions with confidence.",
    },
  ];

  const approachItems = [
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
  ];

  return (
    <div className="bg-gradient-to-r from-purple-50 via-purple-100 to-purple-200 min-h-screen font-sans ">
      <Navbar />

      {/* Banner */}
      <ServicePageBanner
        bannerSrc={invoiceBanner}
        altText="Invoice System Banner"
      >
        {showBannerText && (
          <div className="relative z-20 px-4 w-full max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between">
            <motion.img
              src={invoiceImg}
              alt="Invoice Illustration"
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
              className="w-72 md:w-[550px] h-auto mt-10 md:mt-0 object-contain"
            />
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
              className="text-center md:text-left md:max-w-xl"
            >
              <h1 className="text-4xl md:text-5xl font-extrabold text-white drop-shadow-xl mb-4">
                Discover smarter invoicing <br /> with the Asipiya Invoice
                System.
              </h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.2 }}
                className="text-white text-md md:text-lg leading-relaxed drop-shadow-md"
              >
                Take full control of your operations with a powerful,
                easy-to-use platform built for growth.
              </motion.p>
            </motion.div>
          </div>
        )}
      </ServicePageBanner>

      {/* Intro Section */}
      <motion.section
        className="py-16 px-4 max-w-6xl mx-auto text-center"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.2 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <h2 className="text-4xl font-bold text-gray-800 mb-6">
          All-in-One <span className="text-purple-600">Invoice System</span>
        </h2>
        <p className="text-lg text-gray-700 leading-relaxed max-w-3xl mx-auto mb-4">
          Take full control of your operations with Asipbook System - a
          powerful, easy-to-use platform designed to simplify, streamline, and
          automate your day-to-day business activities. Whether you're a small
          business or a growing enterprise, our system brings together
          everything you need to manage your operations in one intelligent
          dashboard. From generating invoices to tracking inventory, managing
          customers, and analyzing performance, Asipiya provides the tools you
          need to run your business smarter, faster, and more efficiently.
        </p>
        <p className="text-lg text-gray-700 leading-relaxed max-w-3xl mx-auto">
          Asipiya empowers you to work smarter, make faster decisions, and run
          your business more efficiently.
        </p>
      </motion.section>

      {/* Features */}
      <motion.section
        className="py-16 px-4"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.2 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-gray-800 mb-12">
            Key <span className="text-purple-600">Features</span>
          </h2>

          {/* Desktop Grid */}
          <div className="hidden md:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
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
        </div>
      </motion.section>

      {/* Why Choose - Background Image with Overlay */}
      <motion.section
        className="relative py-16 px-4 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${backgroundImage})` }}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={sectionVariants}
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
        <div className="relative z-10 max-w-6xl mx-auto p-8 rounded-xl shadow-lg">
          <motion.h2
            className="text-2xl sm:text-4xl font-bold text-center text-white mb-8 sm:mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Why Choose{" "}
            <span className="text-purple-600">Asipbook invoice Software?</span>
          </motion.h2>

          {/* Swiper for mobile */}
          <div className="block sm:hidden">
            <Swiper
              spaceBetween={20}
              slidesPerView={1}
              pagination={{ clickable: true }}
              autoplay={{ delay: 3000, disableOnInteraction: false }}
              modules={[Pagination, Autoplay]}
              loop
              style={{ paddingBottom: "2rem" }}
            >
              {benefits.map((benefit, index) => (
                <SwiperSlide key={index}>
                  <motion.div
                    className="flex items-start gap-4 p-6 bg-black bg-opacity-40 rounded-lg shadow-md mx-auto"
                    style={{
                      width: "280px",
                      height: "320px",
                      margin: "0 auto",
                    }}
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: false, amount: 0.2 }}
                    transition={{
                      duration: 0.8,
                      ease: "easeOut",
                      delay: index * 0.15,
                    }}
                  >
                    {/* <div className="text-purple-600 text-3xl flex-shrink-0">
                      ✔
                    </div> */}
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-1">
                        {benefit.title}
                      </h3>
                      <p className="text-white">{benefit.description}</p>
                    </div>
                  </motion.div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          {/* Static list for desktop */}
          <div className="hidden sm:block space-y-8">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                className="flex items-start gap-4 p-6 bg-black bg-opacity-40 rounded-lg shadow-md"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.2 }}
                transition={{
                  duration: 0.8,
                  ease: "easeOut",
                  delay: index * 0.15,
                }}
              >
                <div className="text-purple-600 text-3xl flex-shrink-0">✔</div>
                <div>
                  <h3 className="text-xl font-semibold text-white mb-1">
                    {benefit.title}
                  </h3>
                  <p className="text-white">{benefit.description}</p>
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
        variants={sectionVariants}
      >
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-12">
            Our <span className="text-yellow-300">Approach</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {approachItems.map((item, index) => (
              <motion.div
                key={index}
                className="bg-white bg-opacity-10 p-6 rounded-xl shadow-lg border border-purple-500 hover:border-yellow-300 transition-all duration-300 transform hover:-translate-y-2"
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
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.2 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <h2 className="text-4xl font-bold text-gray-800 mb-6">
          Run Smarter with <span className="text-purple-600">Asipbook</span>
        </h2>
        <p className="text-xl text-gray-700 mb-8 max-w-2xl mx-auto">
          Whether you're a solo entrepreneur or a scaling team, our platform
          helps you run your business with clarity and confidence.
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

      {/* Back to Services
      <div className="py-10 px-4 text-center">
        <button
          onClick={() => navigate("/ServiceHome")}
          className="inline-flex items-center bg-gray-200 text-gray-800 px-6 py-3 rounded-full font-medium hover:bg-gray-300 transition-all duration-300 shadow-md"
        >
          <svg
            className="w-5 h-5 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
          Back to All Services
        </button>
      </div> */}
      <ServiceNavigation currentServiceId="invoice" />

      <Footer />
      <GoToTopButton />
    </div>
  );
};

export default InvoiceSystemPage;
