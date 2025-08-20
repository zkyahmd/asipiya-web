import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Navbar from '../../components/Navbar';
import GoToTopButton from '../../components/GoToTopButton'; 
import digitalMarketingBannerImage from '../../assets/digitalMarketingBanner.jpg'; 
import digitalMarketingBenefitsImage from '../../assets/digitalMarketingBenefitsImage.webp'; 
import Footer from "../../components/Footer";
import ServicePageBanner from '../../components/motion/ServicePageBanner';
import reasonsBg from '../../assets/digitalMarketingback.jpg';
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination, Autoplay } from "swiper/modules";
import ServiceNavigation from "../../components/ServiceNavigation";

const DigitalMarketingServicePage = () => {
  const navigate = useNavigate();

  // Scroll to top on component mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Animation variants for sections
  const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
  };

  return (
   <div className="min-h-screen bg-white relative overflow-x-hidden">
        <Navbar forceDarkIcons={false} />

      {/* Hero Section */}
      <ServicePageBanner bannerSrc={digitalMarketingBannerImage} altText="Digital Marketing Solutions Banner">
      {/* <div className="w-full min-h-screen h-screen relative flex items-center justify-center overflow-hidden">
        <img
          src={digitalMarketingBannerImage} 
          alt="Digital Marketing Solutions Banner"
          className="absolute inset-0 w-full h-full object-cover z-0"
          onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/1920x600/6A0DAD/ffffff?text=Digital+Marketing+Solutions"; }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-purple-900 via-purple-800 to-purple-700 opacity-80 z-10" /> */}
        <div className="relative z-20 text-center px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl font-extrabold text-white drop-shadow-lg mb-3 sm:mb-4 lg:mb-6"
          >
            Digital Marketing <br className="hidden sm:block" /> 
            <span className="sm:hidden"> </span>for Online Growth
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-white text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl 2xl:text-2xl leading-relaxed drop-shadow-md max-w-3xl mx-auto px-2 sm:px-0"
          >
            Drive your business growth through smart, targeted, and measurable online strategies.
          </motion.p>
        </div>
        </ServicePageBanner>

      {/* Introduction Section */}
      <motion.section
        className="py-12 sm:py-16 lg:py-20 xl:py-24 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto text-center"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={sectionVariants}
      >
        <motion.h2 
          className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-800 mb-6 sm:mb-8 lg:mb-12"
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
          Asipiya <span className="text-purple-600">Digital Marketing Solutions</span>
        </motion.h2>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="space-y-4 sm:space-y-6 lg:space-y-8"
        >
          <p className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl text-gray-700 leading-relaxed max-w-4xl mx-auto px-2 sm:px-0">
            Asipiya Digital Marketing Solutions provide a comprehensive suite of digital
            marketing tools designed to drive your business growth through smart, targeted,
            and measurable online strategies. Tailored for businesses of all sizes, our
            solutions empower you to attract, engage, and convert your audience across
            multiple channels, boosting brand visibility and customer acquisition efficiently.
          </p>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-700 leading-relaxed max-w-3xl mx-auto px-2 sm:px-0">
            With a focus on automation, data-driven insights, and seamless integration, our
            services ensure your marketing efforts deliver consistent and scalable results.
          </p>
        </motion.div>
      </motion.section>

      {/* Key Services Section */}
      <motion.section
        className="py-12 sm:py-16 lg:py-20 xl:py-24 px-4 sm:px-6 lg:px-8 bg-white"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={sectionVariants}
      >
        <div className="max-w-7xl mx-auto">
          <motion.h2 
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-center text-gray-800 mb-8 sm:mb-12 lg:mb-16 xl:mb-20"
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
            our <span className="text-purple-600">Features</span>
          </motion.h2>

          {/* Mobile View - Swiper */}
          <div className="block md:hidden">
            <Swiper
              modules={[Pagination, Autoplay]}
              pagination={{ clickable: true }}
              spaceBetween={20}
              slidesPerView={1}
              autoplay={{
                delay: 4000,
                disableOnInteraction: false,
                pauseOnMouseEnter: true,
              }}
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

              {/* Social Media Marketing Slide */}
              <SwiperSlide>
                <motion.div
                  className="bg-gray-50 p-4 rounded-xl shadow-lg border border-gray-100 mx-4"
                  style={{ minHeight: "500px" }}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.5 }}
                >
                  <h3 className="text-lg font-bold text-purple-700 mb-4 flex flex-col items-center text-center">
                    <span className="text-3xl mb-2">📱</span> 
                    <span>Social Media Marketing</span>
                  </h3>
                  <p className="text-sm text-gray-700 mb-4 text-center leading-relaxed">
                    Build your brand presence, increase engagement, and drive traffic with expertly
                    managed social media campaigns.
                  </p>
                  <div className="space-y-3">
                    {[
                      { title: "Profiles Creation & Optimization", description: "Set up and optimize business profiles across platforms." },
                      { title: "Social Media Management", description: "Ongoing content creation, scheduling, and audience engagement." },
                      { title: "Paid Advertising", description: "Run targeted ads designed to maximize reach and ROI." },
                      { title: "Post Design & Video Editing", description: "Engage your audience with professional graphics and videos." },
                      { title: "Engagement Monitoring", description: "Track interactions and optimize campaigns based on behavior." },
                    ].map((item, idx) => (
                      <div key={idx} className="flex items-start gap-2 p-3 bg-white rounded-lg shadow-sm">
                        <div className="text-purple-600 text-lg flex-shrink-0 mt-1">✅</div>
                        <div>
                          <h4 className="text-sm font-semibold text-gray-900 mb-1">{item.title}</h4>
                          <p className="text-xs text-gray-600 leading-relaxed">{item.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              </SwiperSlide>

              {/* SEO Slide */}
              <SwiperSlide>
                <motion.div
                  className="bg-gray-50 p-4 rounded-xl shadow-lg border border-gray-100 mx-4"
                  style={{ minHeight: "500px" }}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.5 }}
                >
                  <h3 className="text-lg font-bold text-purple-700 mb-4 flex flex-col items-center text-center">
                    <span className="text-3xl mb-2">🔍</span> 
                    <span>Search Engine Optimization (SEO)</span>
                  </h3>
                  <p className="text-sm text-gray-700 mb-4 text-center leading-relaxed">
                    Enhance your online visibility by ranking higher in search results and attracting
                    relevant, high-intent traffic.
                  </p>
                  <div className="space-y-3">
                    {[
                      { title: "Technical SEO", description: "Improve website speed, mobile usability, and crawlability." },
                      { title: "Local SEO", description: "Get discovered by customers nearby through optimized profiles." },
                      { title: "Blog & E-commerce SEO", description: "Optimize your content and product pages to rank higher." },
                      { title: "In-depth Analysis", description: "Conduct keyword research and competitive audits." },
                    ].map((item, idx) => (
                      <div key={idx} className="flex items-start gap-2 p-3 bg-white rounded-lg shadow-sm">
                        <div className="text-purple-600 text-lg flex-shrink-0 mt-1">✅</div>
                        <div>
                          <h4 className="text-sm font-semibold text-gray-900 mb-1">{item.title}</h4>
                          <p className="text-xs text-gray-600 leading-relaxed">{item.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              </SwiperSlide>

              {/* Branding Slide */}
              <SwiperSlide>
                <motion.div
                  className="bg-gray-50 p-4 rounded-xl shadow-lg border border-gray-100 mx-4"
                  style={{ minHeight: "500px" }}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.5 }}
                >
                  <h3 className="text-lg font-bold text-purple-700 mb-4 flex flex-col items-center text-center">
                    <span className="text-3xl mb-2">🎨</span> 
                    <span>Branding & Creative Services</span>
                  </h3>
                  <p className="text-sm text-gray-700 mb-4 text-center leading-relaxed">
                    Create a distinctive and memorable brand identity that resonates with your
                    audience and builds trust.
                  </p>
                  <div className="space-y-3">
                    {[
                      { title: "Brand Naming & Logo Design", description: "Develop unique brand names and professional logos." },
                      { title: "Branding Strategies", description: "Craft messaging and visual identity aligned with your goals." },
                      { title: "Graphical Innovation", description: "Design business cards and marketing materials with creative flair." },
                      { title: "Photography & Visual Content", description: "Produce high-quality imagery that supports your brand story." },
                    ].map((item, idx) => (
                      <div key={idx} className="flex items-start gap-2 p-3 bg-white rounded-lg shadow-sm">
                        <div className="text-purple-600 text-lg flex-shrink-0 mt-1">✅</div>
                        <div>
                          <h4 className="text-sm font-semibold text-gray-900 mb-1">{item.title}</h4>
                          <p className="text-xs text-gray-600 leading-relaxed">{item.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              </SwiperSlide>
            </Swiper>
          </div>

          {/* Desktop View - Original Grid */}
          <div className="hidden md:grid grid-cols-1 gap-6 sm:gap-8 lg:gap-10 xl:gap-12">

            {/* Social Media Marketing */}
            <motion.div
              className="bg-gray-50 p-4 sm:p-6 lg:p-8 xl:p-10 rounded-lg sm:rounded-xl lg:rounded-2xl shadow-lg hover:shadow-xl hover:shadow-purple-200 transition-all duration-300 transform hover:-translate-y-2 border border-gray-100"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <h3 className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold text-purple-700 mb-4 sm:mb-6 lg:mb-8 flex flex-col sm:flex-row items-center sm:items-center text-center sm:text-left">
                <span className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl mb-2 sm:mb-0 sm:mr-4">📱</span> 
                <span>Social Media Marketing</span>
              </h3>
              <p className="text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl text-gray-700 mb-4 sm:mb-6 lg:mb-8 text-center sm:text-left leading-relaxed">
                Build your brand presence, increase engagement, and drive traffic with expertly
                managed social media campaigns.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
                {[
                  { title: "Profiles Creation & Optimization", description: "Set up and optimize business profiles across platforms like Facebook, Instagram, LinkedIn, and TikTok." },
                  { title: "Social Media Management", description: "Ongoing content creation, scheduling, and audience engagement to keep your brand active and connected." },
                  { title: "Paid Advertising", description: "Run targeted ads designed to maximize reach and ROI with creative, optimized campaigns." },
                  { title: "Post Design & Video Editing", description: "Engage your audience with professional graphics, videos, and promotional content." },
                  { title: "Engagement Monitoring", description: "Track interactions and optimize campaigns based on audience behavior and feedback." },
                ].map((item, idx) => (
                  <motion.div 
                    key={idx} 
                    className="flex items-start gap-2 sm:gap-3 lg:gap-4 p-3 sm:p-4 lg:p-5 bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-200"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.4, delay: idx * 0.1 }}
                  >
                    <div className="text-purple-600 text-lg sm:text-xl lg:text-2xl xl:text-3xl flex-shrink-0 mt-1">✅</div>
                    <div>
                      <h4 className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl font-semibold text-gray-900 mb-1 sm:mb-2">{item.title}</h4>
                      <p className="text-xs sm:text-sm md:text-base lg:text-lg text-gray-600 leading-relaxed">{item.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Search Engine Optimization (SEO) */}
            <motion.div
              className="bg-gray-50 p-4 sm:p-6 lg:p-8 xl:p-10 rounded-lg sm:rounded-xl lg:rounded-2xl shadow-lg hover:shadow-xl hover:shadow-purple-200 transition-all duration-300 transform hover:-translate-y-2 border border-gray-100"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <h3 className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold text-purple-700 mb-4 sm:mb-6 lg:mb-8 flex flex-col sm:flex-row items-center sm:items-center text-center sm:text-left">
                <span className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl mb-2 sm:mb-0 sm:mr-4">🔍</span> 
                <span>Search Engine Optimization (SEO)</span>
              </h3>
              <p className="text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl text-gray-700 mb-4 sm:mb-6 lg:mb-8 text-center sm:text-left leading-relaxed">
                Enhance your online visibility by ranking higher in search results and attracting
                relevant, high-intent traffic.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
                {[
                  { title: "Technical SEO", description: "Improve website speed, mobile usability, and crawlability for better search engine indexing." },
                  { title: "Local SEO", description: "Get discovered by customers nearby through optimized Google Business Profiles and localized content." },
                  { title: "Blog & E-commerce SEO", description: "Optimize your content and product pages to rank higher and attract qualified visitors." },
                  { title: "In-depth Analysis & White-Hat Practices", description: "Conduct keyword research, competitive audits, and employ ethical SEO strategies for sustainable growth." },
                ].map((item, idx) => (
                  <motion.div 
                    key={idx} 
                    className="flex items-start gap-2 sm:gap-3 lg:gap-4 p-3 sm:p-4 lg:p-5 bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-200"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.4, delay: idx * 0.1 }}
                  >
                    <div className="text-purple-600 text-lg sm:text-xl lg:text-2xl xl:text-3xl flex-shrink-0 mt-1">✅</div>
                    <div>
                      <h4 className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl font-semibold text-gray-900 mb-1 sm:mb-2">{item.title}</h4>
                      <p className="text-xs sm:text-sm md:text-base lg:text-lg text-gray-600 leading-relaxed">{item.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Branding & Creative Services */}
            <motion.div
              className="bg-gray-50 p-4 sm:p-6 lg:p-8 xl:p-10 rounded-lg sm:rounded-xl lg:rounded-2xl shadow-lg hover:shadow-xl hover:shadow-purple-200 transition-all duration-300 transform hover:-translate-y-2 border border-gray-100"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <h3 className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold text-purple-700 mb-4 sm:mb-6 lg:mb-8 flex flex-col sm:flex-row items-center sm:items-center text-center sm:text-left">
                <span className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl mb-2 sm:mb-0 sm:mr-4">🎨</span> 
                <span>Branding & Creative Services</span>
              </h3>
              <p className="text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl text-gray-700 mb-4 sm:mb-6 lg:mb-8 text-center sm:text-left leading-relaxed">
                Create a distinctive and memorable brand identity that resonates with your
                audience and builds trust.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
                {[
                  { title: "Brand Naming & Logo Design", description: "Develop unique brand names and professional logos that capture your business vision." },
                  { title: "Branding Strategies & Campaigns", description: "Craft messaging, visual identity, and campaigns aligned with your goals and target market." },
                  { title: "Graphical Innovation & Business Collateral", description: "Design business cards, stationery, and marketing materials with creative flair." },
                  { title: "Photography & Visual Content", description: "Produce high-quality imagery that supports your brand story across digital and print." },
                ].map((item, idx) => (
                  <motion.div 
                    key={idx} 
                    className="flex items-start gap-2 sm:gap-3 lg:gap-4 p-3 sm:p-4 lg:p-5 bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-200"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.4, delay: idx * 0.1 }}
                  >
                    <div className="text-purple-600 text-lg sm:text-xl lg:text-2xl xl:text-3xl flex-shrink-0 mt-1">✅</div>
                    <div>
                      <h4 className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl font-semibold text-gray-900 mb-1 sm:mb-2">{item.title}</h4>
                      <p className="text-xs sm:text-sm md:text-base lg:text-lg text-gray-600 leading-relaxed">{item.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

          </div>
        </div>
      </motion.section>

      {/* Why Choose Asipiya Digital Marketing? Section */}
       <motion.section
        className="relative py-12 sm:py-16 lg:py-20 xl:py-24 px-4 sm:px-6 lg:px-8 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${reasonsBg})` }}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={sectionVariants}
      >
        <div className="absolute inset-0 bg-black/60 z-0" />
        <div className="relative z-10 max-w-7xl mx-auto">
          <motion.h2 
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-center text-white mb-8 sm:mb-12 lg:mb-16 xl:mb-20"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            Why Choose <span className="text-purple-400">Asipiya Digital Marketing</span>?
          </motion.h2>

          {/* Desktop View */}
          <div className="hidden md:flex flex-col lg:flex-row items-center gap-6 sm:gap-8 lg:gap-10 xl:gap-12">
            <motion.div 
              className="w-full lg:w-1/2 block lg:block"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.8 }}
            >
              <img
                src={digitalMarketingBenefitsImage}
                alt="Digital Marketing Benefits"
                className="rounded-lg sm:rounded-xl lg:rounded-2xl shadow-lg sm:shadow-xl w-full h-48 sm:h-64 md:h-72 lg:h-80 xl:h-96 object-cover border-2 sm:border-4 border-white mx-auto"
              />
            </motion.div>
            <div className="w-full lg:w-1/2 space-y-3 sm:space-y-4 lg:space-y-6">
              {[
                { title: "Boosted Efficiency & Automation", description: "Automate your marketing workflows and monitor performance in real-time for faster results." },
                { title: "User-Friendly Experience", description: "Our tools and platforms are designed to be intuitive, empowering businesses without technical expertise." },
                { title: "Data-Driven Insights", description: "Access powerful analytics to make informed decisions, refine strategies, and maximize ROI." },
                { title: "Seamless Integration", description: "Easily connect with your existing systems to maintain workflow continuity." },
                { title: "Customizable & Scalable Solutions", description: "Adapt your marketing plans to your unique needs and scale with your business growth." },
                { title: "Real-Time Campaign Monitoring", description: "Stay on top of your campaigns with live performance tracking and quick adjustments." },
              ].map((benefit, index) => (
                <motion.div
                  key={index}
                  className="flex items-start gap-2 sm:gap-3 lg:gap-4 p-3 sm:p-4 lg:p-5 xl:p-6 bg-black bg-opacity-40 rounded-lg sm:rounded-xl shadow-md backdrop-blur-sm"
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <div className="text-purple-400 text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl flex-shrink-0 mt-1">✔</div>
                  <div>
                    <h3 className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl font-semibold text-white mb-1 sm:mb-2">{benefit.title}</h3>
                    <p className="text-xs sm:text-sm md:text-base lg:text-lg text-white text-justify leading-relaxed">{benefit.description}</p>
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
              {[
                { title: "Boosted Efficiency & Automation", description: "Automate your marketing workflows and monitor performance in real-time for faster results." },
                { title: "User-Friendly Experience", description: "Our tools and platforms are designed to be intuitive, empowering businesses without technical expertise." },
                { title: "Data-Driven Insights", description: "Access powerful analytics to make informed decisions, refine strategies, and maximize ROI." },
                { title: "Seamless Integration", description: "Easily connect with your existing systems to maintain workflow continuity." },
                { title: "Customizable & Scalable Solutions", description: "Adapt your marketing plans to your unique needs and scale with your business growth." },
                { title: "Real-Time Campaign Monitoring", description: "Stay on top of your campaigns with live performance tracking and quick adjustments." },
              ].map((benefit, index) => (
                <SwiperSlide key={index}>
                  <motion.div
                    className="flex flex-col gap-4 p-4 bg-black bg-opacity-40 rounded-lg shadow-md"
                    style={{
                      width: "280px",
                      height: "200px",
                      margin: "0 auto",
                    }}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-2">
                        {benefit.title}
                      </h3>
                      <p className="text-white text-sm leading-relaxed">
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

      {/* Our Approach Section  */}
      <motion.section
        className="py-12 sm:py-16 lg:py-20 xl:py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-purple-700 to-indigo-700 text-white"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={sectionVariants}
      >
        <div className="max-w-7xl mx-auto text-center">
          <motion.h2 
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-8 sm:mb-12 lg:mb-16 xl:mb-20"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            Our <span className="text-yellow-300">Approach</span>
          </motion.h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10 xl:gap-12">
            {[
              { title: "Customization", description: "We tailor solutions to fit your unique business processes and requirements, ensuring a perfect fit." },
              { title: "Seamless Implementation", description: "Our expert team ensures a smooth transition with minimal disruption to your daily operations." },
              { title: "Training & Support", description: "We provide comprehensive training and ongoing support to maximize your team's proficiency and system performance." },
            ].map((approach, index) => (
              <motion.div
                key={index}
                className="bg-white bg-opacity-10 p-4 sm:p-6 lg:p-8 xl:p-10 rounded-lg sm:rounded-xl lg:rounded-2xl shadow-lg border border-purple-500 hover:border-yellow-300 transition-all duration-300 transform hover:-translate-y-2 backdrop-blur-sm"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <h3 className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl font-semibold mb-2 sm:mb-3 lg:mb-4 text-yellow-300">{approach.title}</h3>
                <p className="text-xs sm:text-sm md:text-base lg:text-lg text-purple-100 leading-relaxed">{approach.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Call to Action / Contact Section */}
      <motion.section
        className="py-12 sm:py-16 lg:py-20 xl:py-24 px-4 sm:px-6 lg:px-8 text-center bg-gray-50"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={sectionVariants}
      >
        <div className="max-w-5xl mx-auto">
          <motion.h2 
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-800 mb-4 sm:mb-6 lg:mb-8 xl:mb-10"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            Grow Your Online Presence with <span className="text-purple-600">Asipiya Digital Marketing</span>
          </motion.h2>
          <motion.p 
            className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl text-gray-700 mb-6 sm:mb-8 lg:mb-10 max-w-3xl mx-auto px-2 sm:px-4 leading-relaxed"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          >
            Partner with us to attract, engage, and convert your audience across multiple channels,
            boosting brand visibility and customer acquisition efficiently.
          </motion.p>
          <motion.button
            onClick={() => navigate('/contact-us')}
            className="bg-purple-600 text-white px-6 sm:px-8 lg:px-10 xl:px-12 py-3 sm:py-4 lg:py-5 rounded-full font-semibold text-sm sm:text-base md:text-lg lg:text-xl shadow-lg hover:bg-purple-700 transition-all duration-300 transform hover:scale-105 hover:shadow-xl"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          >
            Get a Free Consultation
          </motion.button>
        </div>
      </motion.section>

      {/* Back to Services Button */}
      {/* <div className="py-6 sm:py-8 lg:py-10 xl:py-12 px-4 text-center">
        <motion.button
          onClick={() => navigate('/ServiceHome')}
          className="inline-flex items-center bg-gray-200 text-gray-800 px-4 sm:px-6 lg:px-8 py-2 sm:py-3 lg:py-4 rounded-full font-medium hover:bg-gray-300 transition-all duration-300 shadow-md hover:shadow-lg text-sm sm:text-base md:text-lg transform hover:scale-105"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <svg className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 mr-1 sm:mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
          Back to All Services
        </motion.button>
      </div> */}
      <ServiceNavigation currentServiceId="marketing" />
      <GoToTopButton />
      <Footer />
    </div>
  );
};

export default DigitalMarketingServicePage;
