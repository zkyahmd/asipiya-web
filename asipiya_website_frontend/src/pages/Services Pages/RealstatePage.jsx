import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import Navbar from '../../components/Navbar';
import Footer from "../../components/Footer";
import GoToTopButton from '../../components/GoToTopButton';
import ServicePageBanner from '../../components/motion/ServicePageBanner';
import realEstateBanner from '../../assets/realstatehero.png'; 
import realEstateBenefitsImage from '../../assets/services/realstate.jpg';
import realEstatePopup from '../../assets/realpopup.png';
import { ParallaxProvider } from 'react-scroll-parallax';
import ServiceNavigation from "../../components/ServiceNavigation";

const RealstatePage = () => {
  const navigate = useNavigate();

   useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

   const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
  };

  return (
    <ParallaxProvider>
     <div className="min-h-screen bg-white relative overflow-x-hidden">
        <Navbar forceDarkIcons={false} />

         <ServicePageBanner bannerSrc={realEstateBanner} altText="Asipiya Real Estate">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-4 sm:gap-6 lg:gap-8 max-w-7xl mx-auto px-4 sm:px-6">
             <motion.div
              className="w-full sm:w-4/5 md:w-3/4 lg:w-1/2 flex justify-center lg:justify-start"
              initial={{ opacity: 0, x: -50, scale: 0.8 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <div className="relative w-full max-w-sm sm:max-w-md lg:max-w-lg">
                <motion.img
                  src={realEstatePopup}
                  alt="Asipiya Real Estate System"
                  className="w-full h-auto rounded-lg sm:rounded-xl shadow-lg sm:shadow-2xl relative z-10"
                  whileHover={{ 
                    scale: 1.02,
                    transition: { duration: 0.3 }
                  }}
                  onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/600x400/8A2BE2/ffffff?text=Real+Estate+System"; }}
                />
                
                 <motion.div
                  className="absolute -top-2 -right-2 sm:-top-3 sm:-right-3 lg:-top-4 lg:-right-4 w-10 h-10 sm:w-12 sm:h-12 lg:w-16 lg:h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg z-20"
                  animate={{ 
                    y: [0, -8, 0],
                    rotate: [0, 5, -5, 0],
                    scale: [1, 1.1, 1]
                  }}
                  transition={{ 
                    duration: 3, 
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  <span className="text-white text-lg sm:text-xl lg:text-2xl">📊</span>
                </motion.div>

                <motion.div
                  className="absolute -top-3 left-1/4 sm:-top-4 sm:left-1/4 lg:-top-6 lg:left-1/4 w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center shadow-lg z-20"
                  animate={{ 
                    y: [0, -6, 0],
                    x: [0, 4, 0],
                    scale: [1, 1.05, 1]
                  }}
                  transition={{ 
                    duration: 2.5, 
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 0.5
                  }}
                >
                  <span className="text-white text-sm sm:text-base lg:text-lg">🏠</span>
                </motion.div>

                <motion.div
                  className="absolute -bottom-3 -left-2 sm:-bottom-4 sm:-left-3 lg:-bottom-6 lg:-left-4 w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center shadow-lg z-20"
                  animate={{ 
                    y: [0, 6, 0],
                    rotate: [0, -5, 5, 0],
                    scale: [1, 1.08, 1]
                  }}
                  transition={{ 
                    duration: 2.8, 
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 1
                  }}
                >
                  <span className="text-white text-lg sm:text-xl lg:text-xl">💰</span>
                </motion.div>

                <motion.div
                  className="absolute top-1/3 -right-4 sm:-right-6 lg:-right-8 w-8 h-8 sm:w-9 sm:h-9 lg:w-10 lg:h-10 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center shadow-lg z-20"
                  animate={{ 
                    x: [0, 8, 0],
                    y: [0, -4, 0],
                    scale: [1, 1.15, 1]
                  }}
                  transition={{ 
                    duration: 2.2, 
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 1.5
                  }}
                >
                  <span className="text-white text-xs sm:text-sm lg:text-sm">🔑</span>
                </motion.div>

                <motion.div
                  className="absolute bottom-1/4 -left-3 sm:-left-4 lg:-left-6 w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg z-20"
                  animate={{ 
                    rotate: [0, 360],
                    scale: [1, 1.2, 1]
                  }}
                  transition={{ 
                    duration: 4, 
                    repeat: Infinity,
                    ease: "linear"
                  }}
                >
                  <span className="text-white text-xs lg:text-xs">⭐</span>
                </motion.div>

                 <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-purple-400/20 to-blue-400/20 rounded-lg sm:rounded-xl blur-xl -z-10"
                  animate={{ 
                    scale: [1, 1.05, 1],
                    opacity: [0.3, 0.6, 0.3]
                  }}
                  transition={{ 
                    duration: 3, 
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
              </div>
            </motion.div>
            
             <motion.div
              className="w-full lg:w-1/2 text-center lg:text-right px-4 sm:px-6 lg:px-0"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <motion.h1
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
                className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-extrabold text-white drop-shadow-lg mb-3 sm:mb-4"
              >
                Asipiya Real Estate
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.2 }}
                className="text-white text-sm sm:text-base md:text-lg lg:text-xl leading-relaxed drop-shadow-md max-w-2xl mx-auto lg:mx-0"
              >
                At Asipiya Real Estate, we are committed to redefining the property experience by offering a complete range of real estate services tailored to meet the diverse needs of individuals, families, and businesses.
              </motion.p>
            </motion.div>
          </div>
        </ServicePageBanner>

         <motion.section
          className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto text-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={sectionVariants}
        >
          <motion.h2 
            className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-gray-800 mb-4 sm:mb-6 lg:mb-8"
            initial={{ opacity: 0, y: -50, scale: 0.8 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ 
              duration: 0.8, 
              ease: "easeOut",
              type: "spring",
              stiffness: 100
            }}
          >
            About <span className="text-purple-600">Asipiya Real Estate</span>
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="space-y-4 sm:space-y-6"
          >
            <motion.p 
              className="text-sm sm:text-base lg:text-lg xl:text-xl text-gray-700 leading-relaxed max-w-4xl mx-auto"
              initial={{ opacity: 0, x: -100 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              At Asipiya Real Estate, we are committed to redefining the property experience by offering a
              complete range of real estate services tailored to meet the diverse needs of individuals,
              families, and businesses. Whether you are searching for your dream home, a lucrative
              investment property, or the perfect commercial space, we provide trusted guidance, market
              expertise, and seamless transactions every step of the way.
            </motion.p>
            <motion.p 
              className="text-sm sm:text-base lg:text-lg xl:text-xl text-gray-700 leading-relaxed max-w-4xl mx-auto"
              initial={{ opacity: 0, x: 100 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              We specialize in residential, commercial, and investment properties, ensuring that clients
              have access to a wide portfolio of verified properties. Our team is dedicated to delivering
              transparent, reliable, and client-focused solutions that simplify the complex processes of
              buying, selling, leasing, or managing properties.
            </motion.p>
            <motion.p 
              className="text-sm sm:text-base lg:text-lg xl:text-xl text-gray-700 leading-relaxed max-w-4xl mx-auto"
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ 
                duration: 0.6, 
                delay: 0.8,
                type: "spring",
                stiffness: 100
              }}
            >
              By combining in-depth market knowledge, strong industry networks, and personalized
              service, we help our clients achieve their real estate goals efficiently and with complete peace
              of mind.
            </motion.p>
          </motion.div>
        </motion.section>

         <motion.section
          className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 bg-white"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={sectionVariants}
        >
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-center text-gray-800 mb-8 sm:mb-12 lg:mb-16">
              Our <span className="text-purple-600">Services</span>
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
                  { title: "Property Sales & Acquisitions", icon: "🏡", description: "We assist clients in buying and selling properties with comprehensive market analysis, accurate valuations, and professional negotiation support, ensuring the best possible outcomes." },
                  { title: "Leasing & Rental Solutions", icon: "🏢", description: "Whether you're a landlord seeking reliable tenants or a tenant looking for the ideal space, we streamline the leasing process, preparing agreements, managing renewals, and ensuring smooth transactions." },
                  { title: "Property Management", icon: "🛠️", description: "For owners who want hassle-free property ownership, we provide full management services including maintenance coordination, tenant communication, rent collection, and regular reporting." },
                  { title: "Investment & Market Advisory", icon: "📈", description: "We guide investors by offering strategic insights into high-potential properties, analyzing trends, and providing advisory services to maximize return on investment." },
                  { title: "Valuation & Market Insights", icon: "📊", description: "Our team delivers accurate property valuations and detailed market reports, helping clients make informed decisions based on current trends and pricing dynamics." },
                ].map((service, index) => (
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
                      <div className="text-5xl mb-4">{service.icon}</div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">
                        {service.title}
                      </h3>
                      <p className="text-gray-600 text-sm">{service.description}</p>
                    </motion.div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>

            {/* Desktop Grid */}
            <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
              {[
                { title: "Property Sales & Acquisitions", icon: "🏡", description: "We assist clients in buying and selling properties with comprehensive market analysis, accurate valuations, and professional negotiation support, ensuring the best possible outcomes." },
                { title: "Leasing & Rental Solutions", icon: "🏢", description: "Whether you're a landlord seeking reliable tenants or a tenant looking for the ideal space, we streamline the leasing process, preparing agreements, managing renewals, and ensuring smooth transactions." },
                { title: "Property Management", icon: "🛠️", description: "For owners who want hassle-free property ownership, we provide full management services including maintenance coordination, tenant communication, rent collection, and regular reporting." },
                { title: "Investment & Market Advisory", icon: "📈", description: "We guide investors by offering strategic insights into high-potential properties, analyzing trends, and providing advisory services to maximize return on investment." },
                { title: "Valuation & Market Insights", icon: "📊", description: "Our team delivers accurate property valuations and detailed market reports, helping clients make informed decisions based on current trends and pricing dynamics." },
              ].map((service, index) => (
                <motion.div
                  key={index}
                  className="bg-purple-200 p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 text-center"
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: false, amount: 0.2 }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                >
                  <div className="text-5xl mb-4">{service.icon}</div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {service.title}
                  </h3>
                  <p className="text-gray-600">{service.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

         {/* Why Choose Asipiya Real Estate */}
        <motion.section
          className="relative py-12 px-4 sm:py-16 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${realEstateBenefitsImage})` }}
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
              Why Choose{" "}
              <span className="text-purple-600">
                Asipiya Real Estate?
              </span>
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
                {[
                  {
                    title: "Proven Expertise in the Real Estate Market",
                    description: "With a deep understanding of local property trends, we help you make confident and profitable decisions."
                  },
                  {
                    title: "Personalized & Client-Centric Approach",
                    description: "We take the time to understand your unique needs, ensuring tailored solutions for buyers, sellers, landlords, and investors."
                  },
                  {
                    title: "Wide Property Network & Verified Listings",
                    description: "Gain access to a diverse range of verified properties that meet your budget, location preferences, and lifestyle or business goals."
                  },
                  {
                    title: "End-to-End Transaction Support",
                    description: "From property search and market evaluation to legal documentation and final closing, we manage the entire process with transparency."
                  },
                  {
                    title: "Trust, Integrity & Transparency",
                    description: "We prioritize honesty and open communication, ensuring a smooth, secure, and stress-free experience."
                  }
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

            {/* Static list for desktop */}
            <div className="hidden sm:block space-y-8">
              {[
                {
                  title: "Proven Expertise in the Real Estate Market",
                  description: "With a deep understanding of local property trends, we help you make confident and profitable decisions."
                },
                {
                  title: "Personalized & Client-Centric Approach",
                  description: "We take the time to understand your unique needs, ensuring tailored solutions for buyers, sellers, landlords, and investors."
                },
                {
                  title: "Wide Property Network & Verified Listings",
                  description: "Gain access to a diverse range of verified properties that meet your budget, location preferences, and lifestyle or business goals."
                },
                {
                  title: "End-to-End Transaction Support",
                  description: "From property search and market evaluation to legal documentation and final closing, we manage the entire process with transparency."
                },
                {
                  title: "Trust, Integrity & Transparency",
                  description: "We prioritize honesty and open communication, ensuring a smooth, secure, and stress-free experience."
                }
              ].map((reason, index) => (
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

         
        <motion.section
          className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 text-center bg-gray-50"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={sectionVariants}
        >
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-gray-800 mb-4 sm:mb-6 lg:mb-8">
              Ready to Find Your Perfect Property with <span className="text-purple-600">Asipiya Real Estate</span>?
            </h2>
            <p className="text-base sm:text-lg lg:text-xl xl:text-2xl text-gray-700 mb-6 sm:mb-8 lg:mb-10 max-w-3xl mx-auto leading-relaxed">
              Contact us today for a free consultation and discover how our expert team can help you 
              achieve your real estate goals with confidence and ease.
            </p>
            <motion.button
              onClick={() => navigate('/contact-us')} 
              className="bg-purple-600 text-white px-6 sm:px-8 lg:px-10 py-3 sm:py-4 lg:py-5 rounded-full font-semibold text-base sm:text-lg lg:text-xl shadow-lg hover:bg-purple-700 transition-all duration-300 transform hover:scale-105 active:scale-95"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              Get a Free Consultation
            </motion.button>
          </div>
        </motion.section>

      {/* <div className="py-10 px-4 text-center">
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

        <ServiceNavigation currentServiceId="realestate" />
        <GoToTopButton />
        <Footer />
      </div>
    </ParallaxProvider>
  );
};

export default RealstatePage; 