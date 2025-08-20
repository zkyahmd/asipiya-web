import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import GoToTopButton from "../../components/GoToTopButton";
import erpBannerImage from "../../assets/erpBanner.jpg";
import erpBenefitsImage from "../../assets/erpBenefitsImage.jpg";
import ServicePageBanner from "../../components/motion/ServicePageBanner";
// import { PulseBeamsSecond } from '../../components/motion/PulseBeamsSecond';
import { ParallaxProvider } from "react-scroll-parallax";
import reasonsBg from "../../assets/MicrofinanceImg1.jpg";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination, Autoplay } from "swiper/modules";
import erpIllustrationImg from "../../assets/ERPSystemBannerimg.png";
import ServiceNavigation from "../../components/ServiceNavigation";

//const erpBannerPlaceholder = "https://placehold.co/1920x600/6A0DAD/ffffff?text=ERP+Solutions+Banner";

const ErpServicePage = () => {
  const navigate = useNavigate();

  // Scroll to top on component mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Animation variants for sections
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
      title: "Sales Management",
      icon: "📈",
      description:
        "Track and manage your entire sales lifecycle — from lead generation to order fulfillment. Automate quotations, sales orders, invoicing, and follow-ups to boost efficiency and conversion rates.",
    },
    {
      title: "CRM (Customer Relationship Management)",
      icon: "🤝",
      description:
        "Build stronger customer relationships with detailed client profiles, communication history, and automated lead tracking. Never miss a follow-up again.",
    },
    {
      title: "POS (Point of Sale)",
      icon: "🛒",
      description:
        "Integrate front-end sales with back-end inventory and accounting. Perfect for retail operations, enabling faster checkouts, inventory updates, and real-time reporting.",
    },
    {
      title: "Subscription Management",
      icon: "🔄",
      description:
        "Easily manage recurring billing, customer subscriptions, and automated renewals. Ideal for service-based or SaaS businesses.",
    },
    {
      title: "Rental Management",
      icon: "🏠",
      description:
        "Streamline rental operations with asset tracking, rental contracts, billing, and return tracking — all in one module.",
    },
    {
      title: "Accounting & Finance",
      icon: "💰",
      description:
        "Track revenue, expenses, taxes, and cash flow with a powerful accounting engine. Generate balance sheets, P&L statements, journal entries, and financial forecasts with ease.",
    },
    {
      title: "Document Management",
      icon: "📄",
      description:
        "Digitize and store all important documents securely. Attach records to customer profiles, sales orders, employee files, and more for easy reference and compliance.",
    },
    {
      title: "Invoicing",
      icon: "🧾",
      description:
        "Create and send branded, professional invoices with just a few clicks. Automate reminders for unpaid invoices and track payment statuses in real time.",
    },
  ];

  const benefits = [
    {
      title: "Comprehensive Integration",
      description:
        "Say goodbye to fragmented systems and manual data transfers. Our ERP seamlessly integrates all your critical business functions-from finance and HR to inventory, sales, and customer service-ensuring a unified experience and eliminating redundancy. Cross-departmental data flows automatically, improving coordination and reducing turnaround time.",
    },
    {
      title: "Tailored to Your Business",
      description:
        "No two businesses are alike and neither should their ERP systems be. We offer full customization of modules, workflows, and reporting tools to reflect your specific industry, operational structure, and goals. Whether you're in manufacturing, retail, services, or finance, our system molds itself to your exact needs.",
    },
    {
      title: "Real-Time Intelligence for Smart Decisions",
      description:
        "Gain access to real-time dashboards, KPIs, and analytics that help you track performance, identify issues early, and seize new opportunities. With up-to-date insights at your fingertips, you can make faster, more informed decisions at every level of your business.",
    },
    {
      title: "Scalable, Secure, and Cloud-Ready",
      description:
        "Our ERP grows with you. Whether you’re expanding locations, adding more users, or diversifying operations, the system is designed to scale effortlessly. Plus, with secure cloud hosting, regular backups, and role-based access controls, your business data remains protected and accessible-anytime, anywhere.",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-50 via-purple-100 to-purple-200 font-sans">
      <Navbar />
      {/* Hero Section */}
      <div className="w-full min-h-screen h-screen relative flex items-center justify-center overflow-hidden">
        <ParallaxProvider>
          <ServicePageBanner
            bannerSrc={erpBannerImage}
            altText="ERP Systems Banner"
          >
            <div className="relative z-20 px-4 w-full max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between">
              {/* IMAGE on LEFT */}
              <motion.img
                src={erpIllustrationImg}
                alt="ERP Systems"
                initial={{ opacity: 0, x: -40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7 }}
                className="w-70 md:w-90 mt-10 md:mt-0"
              />

              {/* TEXT on RIGHT */}
              <motion.div
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7 }}
                className="text-center md:text-left md:max-w-xl"
              >
                <h1 className="text-4xl md:text-5xl font-extrabold text-white drop-shadow-xl mb-4">
                  ERP Systems <br /> for Seamless Operations
                </h1>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.2 }}
                  className="text-white text-md md:text-lg leading-relaxed drop-shadow-md"
                >
                  Streamline your entire business with our comprehensive and
                  customized Enterprise Resource Planning solutions.
                </motion.p>
              </motion.div>
            </div>
          </ServicePageBanner>
        </ParallaxProvider>
      </div>

      {/* Introduction Section */}
      <motion.section
        className="py-16 px-4 max-w-6xl mx-auto text-center"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={sectionVariants}
      >
        <h2 className="text-4xl font-bold text-gray-800 mb-6">
          Our <span className="text-purple-600">All-in-One ERP System</span>
        </h2>
        <p className="text-lg text-gray-700 leading-relaxed max-w-3xl mx-auto mb-4">
          Our All-in-One ERP System is built to transform the way your business
          operates — by bringing together your core departments and processes
          into one centralized, intelligent platform. Whether you're managing
          finances, HR, inventory, customer relationships, or production, our
          ERP solution ensures every function works in perfect harmony.
        </p>
        <p className="text-lg text-gray-700 leading-relaxed max-w-3xl mx-auto">
          By eliminating data silos, reducing manual errors, and providing
          real-time visibility into your business, this system enables you to
          make faster decisions, optimize resources, and improve overall
          performance across your organization.
        </p>
      </motion.section>
      {/* Key Features Section*/}
      <motion.section
        className="py-16 px-4"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={sectionVariants}
      >
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-gray-800 mb-12">
            Key <span className="text-purple-600">Features</span>
          </h2>

          {/* Mobile View - Swiper */}
          <div className="block md:hidden">
            <Swiper
              modules={[Pagination, Autoplay]}
              pagination={{ clickable: true }}
              spaceBetween={20}
              slidesPerView={1}
              autoplay={{
                delay: 3000,
                disableOnInteraction: false,
                pauseOnMouseEnter: true,
              }}
            >
              {features.map((feature, index) => (
                <SwiperSlide key={index}>
                  <motion.div
                    className="bg-purple-200 p-6 rounded-xl shadow-lg flex flex-col items-center text-center"
                    style={{
                      width: "280px",
                      height: "360px",
                      margin: "0 auto",
                    }}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.5 }}
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

          {/* Desktop View - Grid */}
          <div className="hidden md:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className="bg-purple-200 p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 flex flex-col items-center text-center"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
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
        className="relative py-16 px-4 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${reasonsBg})` }}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={sectionVariants}
      >
        <div className="absolute inset-0 bg-black/60 z-0" />
        <div className="relative z-10 max-w-6xl mx-auto">
          <h2 className="text-2xl sm:text-4xl font-bold text-center text-white mb-8 sm:mb-12">
            Why Choose <span className="text-purple-600">Asipiya ERP</span>?
          </h2>

          {/* Desktop View */}
          <div className="hidden md:flex flex-row items-center gap-10">
            <div className="md:w-1/2">
              <img
                src={erpBenefitsImage}
                alt="Asipiya ERP Benefits"
                className="rounded-xl shadow-lg w-full h-64 md:h-96 object-cover border-4 border-white"
              />
            </div>
            <div className="md:w-1/2 space-y-6">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={index}
                  className="flex items-start gap-4 p-4 bg-black bg-opacity-40 rounded-lg shadow-md"
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <div className="text-purple-400 text-3xl flex-shrink-0">
                    ✔
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-1">
                      {benefit.title}
                    </h3>
                    <p className="text-white text-justify">
                      {benefit.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Mobile View Swiper */}
          <div className="md:hidden mt-6">
            <Swiper
              modules={[Pagination, Autoplay]}
              pagination={{ clickable: true }}
              autoplay={{ delay: 4000, disableOnInteraction: false }}
              spaceBetween={16}
              slidesPerView={1}
            >
              {benefits.map((benefit, index) => (
                <SwiperSlide key={index}>
                  <motion.div
                    className="flex flex-col gap-4 p-4 bg-black bg-opacity-40 rounded-lg shadow-md"
                    style={{
                      width: "280px",
                      height: "360px",
                      margin: "0 auto",
                    }}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
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
                    {/* <div className="text-purple-400 text-3xl">✔</div> */}
                    <div>
                      <h3 className="text-xl font-semibold text-white mb-1">
                        {benefit.title}
                      </h3>
                      <p className="text-white ">
                        {benefit.description}
                      </p>
                    </div>
                  </motion.div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </motion.section>

      {/* Our Approach Section*/}
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
            {[
              {
                title: "Customization",
                description:
                  "We tailor ERP solutions to fit your unique business processes and requirements, ensuring a perfect fit.",
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
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
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
      {/* Call to Action / Contact Section */}
      <motion.section
        className="py-20 px-4 text-center bg-gray-50"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={sectionVariants}
      >
        <h2 className="text-4xl font-bold text-gray-800 mb-6">
          Empower Your Business with{" "}
          <span className="text-purple-600">Asipiya ERP</span>
        </h2>
        <p className="text-xl text-gray-700 mb-8 max-w-2xl mx-auto">
          Whether you're a startup looking to centralize operations or a growing
          enterprise ready to scale, our ERP platform delivers the tools,
          visibility, and agility you need to thrive in a competitive
          marketplace.
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
      {/* Back to Services Button
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
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            ></path>
          </svg>
          Back to All Services
        </button>
      </div> */}
      <ServiceNavigation currentServiceId="erp" />
      <GoToTopButton />
      <Footer />
    </div>
  );
};

export default ErpServicePage;
