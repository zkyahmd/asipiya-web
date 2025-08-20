import React, { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ParallaxProvider } from "react-scroll-parallax";
import { motion, useInView } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import CountUp from "react-countup";
import homePageBanner from "../assets/homePageBanner.jpeg";
import ChooseUsImage from "../assets/ChooseUsImage.jpg";
import MicroFinance from "../assets/servicesImageHome/MicroFinance.jpg";
import InvoiceSystem from "../assets/servicesImageHome/Invoice.jpg";
import Leasing from "../assets/servicesImageHome/Leasing.jpeg";
import Pawning from "../assets/servicesImageHome/Pawning.jpg";
import Erp from "../assets/servicesImageHome/Erp.jpg";
import DigitalMarketing from "../assets/servicesImageHome/DigitalMarketing.jpg";
import RealEstate from "../assets/servicesImageHome/RealEstate.jpg";
import Navbar from "../components/Navbar";
import { PulseBeamsSecond } from "../components/motion/PulseBeamsSecond";
import Footer from "../components/Footer";
import ClientLogo from "./ClientHomePage/ClientLogo";
import GoToTopButton from "../components/GoToTopButton";
import ClientReview from "./ClientHomePage/ClientReview";

// Service Card Component
function ServiceCard({ icon, title, desc, index }) {
  const CountingNumbers = ({ value, suffix }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });
    const [displayValue, setDisplayValue] = useState(0);

    useEffect(() => {
      if (isInView) {
        let start = 0;
        const end = parseFloat(value);
        const duration = 2000;
        let startTime = null;

        const animateCount = (currentTime) => {
          if (!startTime) startTime = currentTime;
          const progress = (currentTime - startTime) / duration;
          const current = Math.min(progress, 1) * end;
          setDisplayValue(Math.floor(current));

          if (progress < 1) {
            requestAnimationFrame(animateCount);
          }
        };

        requestAnimationFrame(animateCount);
      }
    }, [isInView, value]);

    return (
      <motion.h3
        ref={ref}
        className="text-3xl sm:text-4xl lg:text-5xl font-bold text-black"
      >
        {displayValue}
        {suffix}
      </motion.h3>
    );
  };

  return (
    <motion.div
      className="bg-white rounded-2xl shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 p-8 text-center flex flex-col items-center"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index ? index * 0.15 : 0 }}
      whileHover={{ scale: 1.05, boxShadow: "0 8px 32px rgba(80,0,200,0.15)" }}
    >
      <div className="mb-4">{icon}</div>
      <h3 className="text-xl font-bold mb-2 text-gray-900">{title}</h3>
      <p className="text-gray-600 text-base leading-relaxed">{desc}</p>
    </motion.div>
  );
}

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (index) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: index * 0.2,
      duration: 0.6,
      ease: "easeOut",
    },
  }),
};

const CountingNumbers = ({ value, suffix }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    const end = parseFloat(value);
    const duration = 2000;
    let start = null;

    const step = (timestamp) => {
      if (!start) start = timestamp;
      const progress = timestamp - start;
      const current = Math.min(progress / duration, 1) * end;
      setDisplayValue(Math.floor(current));

      if (progress < duration) {
        requestAnimationFrame(step);
      }
    };

    requestAnimationFrame(step);
  }, [isInView, value]);

  return (
    <motion.h3
      ref={ref}
      className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-black"
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6 }}
    >
      {displayValue}
      {suffix}
    </motion.h3>
  );
};

const HomePage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, []);

  const featureCards = [
    {
      icon: <LightbulbIcon />,
      title: "Tailor-Made Solutions",
      desc: "Every system we develop is customized to match your business workflows, industry challenges, and growth goals.",
    },
    {
      icon: <BriefcaseIcon />,
      title: "Domain Expertise",
      desc: "With proven experience in ERP, pawning, microfinance, leasing, and invoicing systems.",
    },
    {
      icon: <RocketIcon />,
      title: "End-to-End Service",
      desc: "From ideation to deployment and post-launch support, we cover everything.",
    },
    {
      icon: <ChipIcon />,
      title: "Future-Ready Architecture",
      desc: "Built with modern, modular, and API-friendly frameworks.",
    },
    {
      icon: <ShieldIcon />,
      title: "Data Security & Compliance",
      desc: "We follow secure development, access control, and compliance protocols.",
    },
    {
      icon: <UsersIcon />,
      title: "Client-Centric Approach",
      desc: "We believe in long-term partnerships with responsive communication.",
    },
    {
      icon: <GlobeIcon />,
      title: "Local Roots, Global Standards",
      desc: "Sri Lankan pride with international development standards.",
    },
  ];

  const services = [
    {
      icon: MicroFinance,
      title: "Microfinance System",
      desc: "Empowering financial inclusion with robust, scalable microfinance platforms.",
      link: "/services/microfinance",
    },
    {
      icon: InvoiceSystem,
      title: "Invoice System",
      desc: "Automate billing, track payments, and get real-time analytics for smarter business.",
      link: "/services/invoice",
    },
    {
      icon: Pawning,
      title: "Pawning System",
      desc: "Secure, compliant, and efficient gold loan management for modern financial institutions.",
      link: "/services/pawning",
    },
    {
      icon: Erp,
      title: "ERP System",
      desc: "Integrated solutions for finance, HR, inventory, and operations-tailored for your business.",
      link: "/services/erp",
    },
    {
      icon: Leasing,
      title: "Leasing System",
      desc: "Manage lease agreements, payments, and assets with digital workflows and compliance.",
      link: "/services/leasing",
    },
    {
      icon: RealEstate,
      title: "Real Estate System",
      desc: "Modern Real Estate Management. Simplify listings and enhance client experience.",
      link: "/services/realestate",
    },
    {
      icon: DigitalMarketing,
      title: "Digital Marketing",
      desc: "Boost your brand and reach your audience with targeted digital marketing solutions.",
      link: "/services/marketing",
    },
  ];

  return (
    <ParallaxProvider>
      <div className="min-h-screen flex flex-col">
        <Navbar />

        <div className="font-sans text-gray-800 flex-1">
          <PulseBeamsSecond bannerSrc={homePageBanner}>
            <motion.h1
              className="text-6xl text-white text-center font-extrabold mb-4"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, delay: 0.2 }}
            >
              Unlocking Potential Worldwide
            </motion.h1>
            <motion.p
              className="text-3xl text-purple-200 text-center mb-4"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, delay: 0.4 }}
            >
              With Trusted Microfinance Services.
            </motion.p>
            <motion.p
              className="text-xl text-white text-center mb-6"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, delay: 0.6 }}
            >
              Empowering Businesses with Scalable, Smart Financial Solutions.
            </motion.p>
            <motion.div
              className="flex justify-center gap-4"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, delay: 1 }}
            >
              <button
                className="bg-purple-500 text-white px-6 py-3 rounded-xl font-bold hover:bg-purple-600 transition"
                onClick={() => navigate("/ServiceHome")}
              >
                Explore Our Services
              </button>
              <button
                className="border-2 border-white text-white px-6 py-3 rounded-xl font-bold hover:bg-white hover:text-purple-900 transition"
                onClick={() => navigate("/contact-us")}
              >
                Let’s Talk
              </button>
            </motion.div>
          </PulseBeamsSecond>

          {/* --- Swiper Services Section --- */}
          <section className="py-5 px-6 bg-gradient-to-r from-purple-50 via-purple-100 to-purple-200">
            <div className="max-w-7xl mx-auto text-center mb-16 px-4">
              {/* Animated heading */}
              <motion.h2
                className="text-5xl md:text-5xl font-bold text-gray-800"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
              >
                Our Core <span className="text-purple-500">Services</span>
              </motion.h2>

              {/* Animated description */}
              <motion.p
                className="text-xl text-gray-600 mt-6 max-w-2xl mx-auto leading-relaxed"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
              >
                At{" "}
                <span className="font-semibold text-purple-600">
                  Asipiya Software Solutions
                </span>
                , we specialise in developing custom business software that
                streamlines operations and drives digital transformation. <br />
                Whether you're in finance, retail, or services, our systems are
                built to scale with your vision.
              </motion.p>
            </div>

            <Swiper
              modules={[Navigation, Autoplay]}
              navigation
              loop={true}
              autoplay={{
                delay: 3000,
                disableOnInteraction: false,
              }}
              spaceBetween={20}
              breakpoints={{
                640: { slidesPerView: 1 },
                768: { slidesPerView: 2 },
                1024: { slidesPerView: 3 },
                1280: { slidesPerView: 4 },
              }}
              className="px-4"
            >
              {services.map((card, idx) => (
                <SwiperSlide key={card.title}>
                  <motion.div
                    onClick={() => navigate(card.link)}
                    className="w-full sm:w-[472px] h-[520px] sm:h-[720px] bg-cover bg-center flex items-end text-left cursor-pointer relative group overflow-hidden shadow-lg transition-all duration-300"
                    style={{ backgroundImage: `url(${card.icon})` }}
                    whileHover={{ scale: 1.03 }}
                    transition={{ duration: 0.5 }}
                  >
                    {/* Dark overlay */}
                    <div className="absolute inset-0 bg-black/40 group-hover:bg-black/60 transition-all duration-300 z-0" />

                    {/* Text Content */}
                    <div className="relative z-10 w-full px-4 sm:px-6 pb-8 sm:pb-10">
                      {/* Title */}
                      <h3 className="text-2xl sm:text-4xl font-semibold text-purple-100 mb-2 leading-snug">
                        {card.title}
                      </h3>

                      {/* Description (always visible on mobile, only on hover on desktop) */}
                      <div className="block sm:hidden">
                        <p className="text-sm text-white mb-4">{card.desc}</p>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            navigate(card.link);
                          }}
                        ></button>
                      </div>

                      {/* Desktop-only (visible on hover) */}
                      <motion.div className="hidden sm:block opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                        <p className="text-xl text-white mb-4">{card.desc}</p>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            navigate(card.link);
                          }}
                        ></button>
                      </motion.div>
                    </div>
                  </motion.div>
                </SwiperSlide>
              ))}
            </Swiper>
          </section>

          <section className="py-20 bg-gradient-to-r from-purple-50 via-purple-100 to-purple-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  { value: 10, suffix: "+", label: "Years of Experience" },
                  { value: 100, suffix: "%", label: "Satisfied Clients" },
                  { value: 30, suffix: "+", label: "Expert Team Member" },
                  { value: 35, suffix: "+", label: "Projects Completed" },
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    custom={index}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: false }}
                    variants={cardVariants}
                    whileHover={{ scale: 1.06, y: -8 }}
                    className="p-6 sm:p-8 bg-white rounded-3xl shadow-lg border border-purple-300 hover:shadow-purple-400/60 hover:border-purple-400 transition-all duration-300 text-center"
                  >
                    <CountingNumbers value={item.value} suffix={item.suffix} />
                    <p className="text-sm sm:text-base text-purple-400 font-medium">
                      {item.label}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
          {/* Why Choose Us */}
          <section
            className="relative px-4 py-16 bg-cover bg-center"
            style={{ backgroundImage: `url(${ChooseUsImage})` }}
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
            <div className="relative z-10 max-w-7xl mx-auto flex flex-col md:flex-row gap-10 items-center">
              {/* Left Text Content */}
              <div className="flex-1 text-white">
                <h2 className="text-4xl font-bold mb-2">
                  Why You Should{" "}
                  <span className="text-purple-600">Choose Us?</span>
                </h2>
                <p className="text-purple-200 text-lg max-w-md">
                  Discover the Asipiya difference - where innovation, expertise,
                  and partnership drive your business forward.
                </p>
              </div>

              {/* Desktop Feature Cards */}
              <div className="hidden md:flex flex-1 flex-col gap-4">
                {featureCards.map((item, idx) => (
                  <motion.div
                    key={idx}
                    className="bg-black bg-opacity-40 rounded-xl shadow-md p-5 flex items-start gap-4 hover:bg-black/15"
                    initial={{ opacity: 0, scale: 0.95, y: 40 }}
                    whileInView={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: idx * 0.1 }}
                  >
                    <div className="text-purple-500 text-2xl">{item.icon}</div>
                    <div>
                      <h3 className="text-xl font-semibold text-white">
                        {item.title}
                      </h3>
                      <p className="text-white">{item.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Mobile Swiper */}
              <div className="w-full md:hidden mt-8">
                <Swiper
                  modules={[Pagination, Autoplay]}
                  spaceBetween={16}
                  slidesPerView={1}
                  pagination={{ clickable: true }}
                  autoplay={{
                    delay: 3000,
                    disableOnInteraction: false,
                  }}
                >
                  {featureCards.map((item, idx) => (
                    <SwiperSlide key={idx}>
                      <motion.div
                        className="bg-black bg-opacity-40 rounded-xl shadow-md p-5 flex items-start gap-4"
                        initial={{ opacity: 0, scale: 0.95, y: 40 }}
                        whileInView={{ opacity: 1, scale: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: idx * 0.1 }}
                      >
                        <div className="text-purple-500 text-2xl">
                          {item.icon}
                        </div>
                        <div>
                          <h3 className="text-xl font-semibold text-white">
                            {item.title}
                          </h3>
                          <p className="text-white">{item.desc}</p>
                        </div>
                      </motion.div>
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
            </div>
          </section>

          {/* Clients Section */}
          <section className="bg-gradient-to-r from-purple-50 via-purple-100 to-purple-200 py-16 px-6 text-center">
            <ClientLogo />
          </section>

          {/* Reviews */}
          <section className="bg-gradient-to-r from-purple-50 via-purple-100 to-purple-200 py-16 px-6 text-center">
            <ClientReview />
          </section>
          <GoToTopButton />
          <Footer />
        </div>
      </div>
    </ParallaxProvider>
  );
};

// Icons used above
const LightbulbIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="w-6 h-6"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M12 2a7 7 0 00-7 7c0 2.386 1.34 4.434 3.25 5.5A2.5 2.5 0 0011 19h2a2.5 2.5 0 002.75-4.5C17.66 13.434 19 11.386 19 9a7 7 0 00-7-7z"
    />
  </svg>
);
const BriefcaseIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="w-6 h-6"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M9 7V6a3 3 0 016 0v1m-9 4h12a2 2 0 012 2v7a2 2 0 01-2 2H6a2 2 0 01-2-2v-7a2 2 0 012-2z"
    />
  </svg>
);
const RocketIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="w-6 h-6"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M5 13l4 4L19 7"
    />
  </svg>
);
const ChipIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="w-6 h-6"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <rect width="12" height="12" x="6" y="6" rx="2" />
    <path d="M9 9h6v6H9z" />
  </svg>
);
const ShieldIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="w-6 h-6"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"
    />
  </svg>
);
const UsersIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="w-6 h-6"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M17 20h5v-2a4 4 0 00-3-3.87M9 20H4v-2a4 4 0 013-3.87M16 3.13a4 4 0 010 7.75M8 3.13a4 4 0 000 7.75"
    />
  </svg>
);
const GlobeIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="w-6 h-6"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <circle cx="12" cy="12" r="10" />
    <path d="M2 12h20M12 2a15.3 15.3 0 010 20M12 2a15.3 15.3 0 000 20" />
  </svg>
);

export default HomePage;
