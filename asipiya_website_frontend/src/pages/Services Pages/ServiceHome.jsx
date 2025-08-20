import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Navbar from "../../components/Navbar";
import GoToTopButton from "../../components/GoToTopButton";
import Footer from "../../components/Footer";
import servicePageVideo from "../../assets/Video/serviceBannerVideo.mp4";

// Icon Images (for inside cards)
import erpImg from "../../assets/erp.png";
import pawningImg from "../../assets/pawning.png";
import microfinanceImg from "../../assets/microfinance.png";
import invoiceImg from "../../assets/invoice.png";
import leasingImg from "../../assets/leasing.png";
import marketingImg from "../../assets/digitalMarketing.png";
import realEstateImg from "../../assets/realEstate.png";

// Background Images (new!)
import erpBg from "../../assets/erpBg.jpg";
import pawningBg from "../../assets/pawningBg.jpg";
import microfinanceBg from "../../assets/microfinanceBg.jpg";
import invoiceBg from "../../assets/invoiceBg.jpg";
import leasingBg from "../../assets/leasingBg.jpeg";
import marketingBg from "../../assets/marketingBg.jpg";
import realEstateBg from "../../assets/realEstateBg.jpg";

import ServicePageBanner from "../../components/motion/ServicePageBanner";
import { ParallaxProvider } from "react-scroll-parallax";
import ServiceCard from "../../components/ServiceCard";

const services = [
  {
    id: 1,
    title: "Microfinance Solutions",
    description:
      "Finance for All.\nEmpower financial inclusion with robust microfinance platforms. \nWe deliver tools to handle client onboarding, loan cycles, repayments, and reporting.",
    image: microfinanceImg,
    backgroundImage: microfinanceBg,
    link: "/services/microfinance",
  },
  {
    id: 2,
    title: "Invoice System",
    description:
      "Bill Smarter, Get Paid Faster.\nAutomate your billing processes with intelligent invoicing systems:\n- Recurring invoice generation\n- Tax & payment tracking\n- Real-time analytics and reporting",
    image: invoiceImg,
    backgroundImage: invoiceBg,
    link: "/services/invoice",
  },
  {
    id: 3,
    title: "Leasing System",
    description:
      "Complete Leasing Lifecycle Management.\nTrack lease agreements, schedule payments, and monitor assets with:\n- Digital workflows\n- Custom alerts\n- Compliance automation",
    image: leasingImg,
    backgroundImage: leasingBg,
    link: "/services/leasing",
  },
  {
    id: 4,
    title: "ERP Systems",
    description:
      "Efficient. Integrated. Scalable.\nMaximize your enterprise's performance with fully customized ERP solutions. \nWe streamline finance, HR, inventory, and operations under one powerful platform.",
    image: erpImg,
    backgroundImage: erpBg,
    link: "/services/erp",
  },
  {
    id: 5,
    title: "Pawning Systems",
    description:
      "Simplified Pawnshop Operations.\nFrom inventory tracking to loan management, our pawning systems offer security, automation, and regulatory compliance in one intuitive solution.",
    image: pawningImg,
    backgroundImage: pawningBg,
    link: "/services/pawning",
  },
  {
    id: 6,
    title: "Digital Marketing",
    description:
      "Grow Your Online Presence.\nWe help businesses build brand visibility and generate leads with tailored digital marketing strategies.",
    image: marketingImg,
    backgroundImage: marketingBg,
    link: "/services/marketing",
  },
  {
    id: 7,
    title: "Real Estate",
    description:
      "Modern Real Estate Management.\nStreamline listings, track inquiries, manage transactions, and deliver a seamless customer experience with our smart real estate solutions.",
    image: realEstateImg,
    backgroundImage: realEstateBg,
    link: "/services/realestate",
  },
];

const ServiceHome = () => {
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

  return (
    <ParallaxProvider>
      <div className="bg-gradient-to-r from-purple-50 via-purple-100 to-purple-200 min-h-screen">
        <Navbar />

        <ServicePageBanner videoSrc={servicePageVideo} altText="Our Services Banner">
          {showBannerText && (
            <div className="relative z-20 text-center px-4 max-w-4xl mx-auto">
              <motion.h1
                initial={{ opacity: 0, y: -40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
                className="text-4xl md:text-5xl font-extrabold text-white drop-shadow-xl mb-4"
              >
                Our Services <br /> & Expertise
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.2 }}
                className="text-white text-md md:text-lg leading-relaxed drop-shadow-md"
              >
                At Asipiya Soft Solutions, we empower your business for success
                in the digital age. Join us on an innovative journey towards
                efficiency and thrive together in shaping your future.
              </motion.p>
            </div>
          )}
        </ServicePageBanner>

        <div className="max-w-6xl mx-auto px-4 mt-16 mb-8">
          <h2 className="text-4xl md:text-5xl font-bold text-center text-gray-800">
            Services We're <span className="text-purple-600">Offering</span>
          </h2>
        </div>

        <div className="py-20 px-4">
          <motion.div
            className="max-w-6xl mx-auto flex flex-col gap-20"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            {services.map((service, index) => (
              <ServiceCard key={service.id} service={service} index={index} />
            ))}
          </motion.div>
        </div>

        <GoToTopButton />
        <Footer />
      </div>
    </ParallaxProvider>
  );
};

export default ServiceHome;
