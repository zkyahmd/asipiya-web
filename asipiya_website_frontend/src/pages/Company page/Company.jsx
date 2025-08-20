import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { ParallaxProvider } from 'react-scroll-parallax';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import aboutVideo from '../../assets/company/about.mp4';
import inco1 from '../../assets/company/INCo-1.jpg';
import inco2 from '../../assets/company/INCo-2.jpg';
import inco3 from '../../assets/company/INCo-3.jpg';
import inco4 from '../../assets/company/INCo-4.jpg';
import inco5 from '../../assets/company/INCo-5.jpg';
import inco6 from '../../assets/company/INCo-6.jpg';
import inco7 from '../../assets/company/INCo-7.jpg';
import inco8 from '../../assets/company/INCo-8.jpg';
import inco9 from '../../assets/company/INCo-9.jpg';
import inco10 from '../../assets/company/INCo-10.jpg';
import inco11 from '../../assets/company/INCo-11.jpg';
import inco12 from '../../assets/company/INCo-12.jpg';
import inco13 from '../../assets/company/INCo-13.jpg';
import inco14 from '../../assets/company/INCo-14.jpg';
import MissionBg1 from '../../assets/company/Mission.png';
import MissionBg2 from '../../assets/company/mission2.png';
import MissionBg3 from '../../assets/company/mission3.png';
import MissionBg4 from '../../assets/company/mission4.png';
import VisionImage from '../../assets/company/vision.png';
import { PulseBeamsSecond } from '../../components/motion/PulseBeamsSecond';
import { VideoBanner } from '../../components/motion/VideoBanner';

const CountingNumbers = ({ value, suffix }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const end = parseFloat(value);
      const duration = 2000; // 2 seconds
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
    <motion.h3 ref={ref} className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white">
      {displayValue}{suffix}
    </motion.h3>
  );
};


const Company = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [hoveredIndustry, setHoveredIndustry] = useState(null);
  const [hoveredMission, setHoveredMission] = useState(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoScrolling, setIsAutoScrolling] = useState(true);

  const incoImages = [
    { src: inco1, alt: 'INCO Exhibition 2024 - 1' },
    { src: inco2, alt: 'INCO Exhibition 2024 - 2' },
    { src: inco3, alt: 'INCO Exhibition 2024 - 3' },
    { src: inco4, alt: 'INCO Exhibition 2024 - 4' },
    { src: inco5, alt: 'INCO Exhibition 2024 - 5' },
    { src: inco6, alt: 'INCO Exhibition 2024 - 6' },
    { src: inco7, alt: 'INCO Exhibition 2024 - 7' },
    { src: inco8, alt: 'INCO Exhibition 2024 - 8' },
    { src: inco9, alt: 'INCO Exhibition 2024 - 9' },
    { src: inco10, alt: 'INCO Exhibition 2024 - 10' },
    { src: inco11, alt: 'INCO Exhibition 2024 - 11' },
    { src: inco12, alt: 'INCO Exhibition 2024 - 12' },
    { src: inco13, alt: 'INCO Exhibition 2024 - 13' },
    { src: inco14, alt: 'INCO Exhibition 2024 - 14' },
  ];

  const incoExhibitionData = [
    {
      image: incoImages[0].src,
      title: 'Opening Ceremony & Keynote',
      description: 'Witnessing the grand inauguration and insightful opening remarks from industry leaders.',
      category: 'Highlights',
      bgColor: 'bg-purple-800',
      textColor: 'text-white'
    },
    {
      image: incoImages[1].src,
      title: 'Interactive Tech Demos',
      description: 'Experience hands-on with our cutting-edge software solutions tailored for modern businesses.',
      category: 'Experience',
      bgColor: 'bg-red-700',
      textColor: 'text-white'
    },
    {
      image: incoImages[2].src,
      title: 'Engaging Visitor Discussions',
      description: 'Our team connecting deeply with visitors, addressing their unique tech challenges and needs.',
      category: 'Interaction',
      bgColor: 'bg-blue-800',
      textColor: 'text-white'
    },
    {
      image: incoImages[3].src,
      title: 'Awareness on Digitalization',
      description: 'Leading impactful campaigns to educate small and medium-sized enterprises on digital transformation.',
      category: 'Awareness',
      bgColor: 'bg-white',
      textColor: 'text-gray-900'
    },
    {
      image: incoImages[4].src,
      title: 'Lively Booth Activities',
      description: 'Energetic atmosphere with interactive games and engaging sessions at the Asipiya booth.',
      category: 'Engagement',
      bgColor: 'bg-green-700',
      textColor: 'text-white'
    },
    {
      image: incoImages[5].src,
      title: 'Personalized Expert Consultations',
      description: 'Providing bespoke advice and strategic solutions to businesses seeking digital growth.',
      category: 'Consultations',
      bgColor: 'bg-blue-900',
      textColor: 'text-white'
    },
    {
      image: incoImages[6].src,
      title: 'Dynamic Networking Sessions',
      description: 'Fostering new connections and cultivating strategic collaborations with industry peers.',
      category: 'Networking',
      bgColor: 'bg-white',
      textColor: 'text-gray-900'
    },
    {
      image: incoImages[7].src,
      title: 'Dedicated Team Collaboration',
      description: 'Showcasing our cohesive team spirit and collaborative efforts for event success.',
      category: 'Teamwork',
      bgColor: 'bg-gray-700',
      textColor: 'text-white'
    },
    {
      image: incoImages[8].src,
      title: 'Future Tech Showcases',
      description: 'Unveiling groundbreaking innovations and showcasing our research and development projects.',
      category: 'Innovation',
      bgColor: 'bg-teal-700',
      textColor: 'text-white'
    },
    {
      image: incoImages[9].src,
      title: 'Key Takeaways & Event Recap',
      description: 'Summarizing the pivotal insights and outlining future opportunities from INCO 2024.',
      category: 'Summary',
      bgColor: 'bg-black',
      textColor: 'text-white'
    },
    {
      image: incoImages[10].src,
      title: 'Community Empowerment Initiatives',
      description: 'Our ongoing commitment to empowering local communities through accessible technology.',
      category: 'Community',
      bgColor: 'bg-indigo-700',
      textColor: 'text-white'
    },
    {
      image: incoImages[11].src,
      title: 'Prominent Media Coverage',
      description: "Capturing Asipiya International's presence and influence in various media outlets.",
      category: 'Media Spotlight',
      bgColor: 'bg-orange-700',
      textColor: 'text-white'
    },
  ];

  const missionData = [
    {
      title: 'Client Empowerment',
    desc: "At Asipiya Soft Solutions, we believe in enabling our clients to thrive by equipping them with custom-built software solutions tailored to their unique business needs. Our client-centric approach ensures that every solution we deliver adds tangible value, promotes operational efficiency, and empowers organizations to take confident strides toward their goals.",
      icon: '🚀',
      bgImage: MissionBg1,
      gradient: 'from-blue-500 to-purple-600'
    },
    {
      title: 'Innovation',
      desc: 'Innovation is the driving force behind everything we do. We are committed to remaining at the forefront of technology by continuously exploring new tools, frameworks, and methodologies. By embracing creativity and forward-thinking, we transform ideas into cutting-edge solutions that help businesses stay ahead in an ever-evolving digital landscape.',
      icon: '💡',
      bgImage: MissionBg2,
      gradient: 'from-yellow-500 to-orange-600'
    },
    {
      title: 'Strategic Partnership',
      desc: 'We view our clients not just as customers, but as long-term partners. By working collaboratively and understanding their goals, challenges, and vision, we cultivate strategic relationships built on trust and mutual success.',
      icon: '🤝',
      bgImage: MissionBg3,
      gradient: 'from-green-500 to-teal-600'
    },
    {
      title: 'Excellence in Execution',
      desc: 'We pride ourselves on delivering results that not only meet but exceed expectations. Our commitment to excellence is reflected in every stage of our process—from planning and development to deployment and ongoing support.',
      icon: '⭐',
      bgImage: MissionBg4,
      gradient: 'from-purple-500 to-pink-600'
    },
  ];


  useEffect(() => {
    if (missionData.length > 0) {
      setHoveredMission(missionData[0]);
    }
  }, []);

  // Scroll to top on component mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 50);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Auto scroll for INCO 2024 exhibition gallery
  useEffect(() => {
    if (!isAutoScrolling) return;
    
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % incoExhibitionData.length);
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval);
  }, [isAutoScrolling, incoExhibitionData.length]);

  const handleSlideChange = (index) => {
    setCurrentSlide(index);
  };

return (
    <ParallaxProvider>
      <div className="min-h-screen bg-gradient-to-r from-purple-50 via-purple-100 to-purple-200 font-sans relative overflow-x-hidden">
        <Navbar forceDarkIcons={false} />

      <div className="relative h-screen flex items-center justify-center overflow-hidden">
        <VideoBanner videoSrc={aboutVideo}>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.3, ease: "easeOut" }}
            className={`space-y-4 sm:space-y-6 transition-all duration-300 px-4 sm:px-6 ${
              isScrolled ? 'opacity-0 translate-y-[-50px] pointer-events-none scale-0' : 'opacity-100 translate-y-0 scale-100'
            }`}
          >
            <motion.h1
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.2, delay: 0.5 }}
              className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-bold text-white leading-tight text-center"
            >
              About{" "}
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Asipiya Soft Solutions
              </span>
            </motion.h1>

            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "6rem" }}
              transition={{ duration: 1, delay: 0.8 }}
              className="h-1 bg-gradient-to-r from-purple-400 to-pink-400 mx-auto rounded-full"
            />

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 1 }}
              className="text-base sm:text-lg md:text-xl text-white/90 max-w-2xl mx-auto leading-relaxed text-center"
            >Welcome to Asipiya Soft Solutions, your gateway to comprehensive and
              cutting-edge software solutions tailored for businesses of all sizes.
              At Asipiya, we pride ourselves on being your trusted partner to navigating the digital
              landscape, offering a range of services designed to enhance and streamline your
              business operations.
            </motion.p>
          </motion.div>
        </VideoBanner>
      </div>

      {/* Main Content (removes max-width from this parent div to allow Vision section to be full width) */}
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        viewport={{ once: true }}
        className="bg-gradient-to-r from-purple-800 via-purple-700 to-indigo-800 py-12 sm:py-16 px-4 sm:px-6 text-center relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-purple-600/30 via-transparent to-pink-600/30" />
        <div className="absolute top-0 left-1/4 w-48 sm:w-96 h-48 sm:h-96 bg-purple-400/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-48 sm:w-96 h-48 sm:h-96 bg-pink-400/20 rounded-full blur-3xl" />
        
        <div className="max-w-6xl mx-auto space-y-8 sm:space-y-10 relative z-10">
          <div className="text-center mb-8 sm:mb-12">
            <div className="w-16 sm:w-20 h-1 bg-gradient-to-r from-purple-400 to-pink-400 mx-auto rounded-full mb-4 sm:mb-6" />
            <h2 className="text-2xl sm:text-3xl lg:text-5xl font-bold text-white mb-4 tracking-tight">
              Asipiya At a <span className="bg-gradient-to-r from-purple-300 to-pink-300 bg-clip-text text-transparent">Glance</span>
            </h2>
            <p className="text-purple-100 text-lg sm:text-xl max-w-3xl mx-auto leading-relaxed">
              Key facts and figures about Asipiya Soft Solutions
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
            <motion.div 
              className="space-y-2 sm:space-y-3 p-4 sm:p-5 bg-purple-600/40 backdrop-blur-sm rounded-2xl border border-purple-400/50 hover:border-pink-400/70 transition-all duration-300 hover:bg-purple-600/60"
              whileHover={{ scale: 1.05, y: -5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <CountingNumbers value={10} suffix="+" />
              <p className="text-sm sm:text-base text-purple-100 font-medium">Years of Experience</p>
            </motion.div>
            <motion.div 
              className="space-y-2 sm:space-y-3 p-4 sm:p-5 bg-purple-600/40 backdrop-blur-sm rounded-2xl border border-purple-400/50 hover:border-pink-400/70 transition-all duration-300 hover:bg-purple-600/60"
              whileHover={{ scale: 1.05, y: -5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <CountingNumbers value={100} suffix="%" />
              <p className="text-sm sm:text-base text-purple-100 font-medium">Satisfied Clients</p>
            </motion.div>
            <motion.div 
              className="space-y-2 sm:space-y-3 p-4 sm:p-5 bg-purple-600/40 backdrop-blur-sm rounded-2xl border border-purple-400/50 hover:border-pink-400/70 transition-all duration-300 hover:bg-purple-600/60"
              whileHover={{ scale: 1.05, y: -5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <CountingNumbers value={30} suffix="+" />
              <p className="text-sm sm:text-base text-purple-100 font-medium">Expert Team Member</p>
            </motion.div>
            <motion.div 
              className="space-y-2 sm:space-y-3 p-4 sm:p-5 bg-purple-600/40 backdrop-blur-sm rounded-2xl border border-purple-400/50 hover:border-pink-400/70 transition-all duration-300 hover:bg-purple-600/60"
              whileHover={{ scale: 1.05, y: -5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <CountingNumbers value={35} suffix="+" />
              <p className="text-sm sm:text-base text-purple-100 font-medium">Projects Completed</p>
            </motion.div>
          </div>
        </div>
      </motion.section>
       <div className="py-12 sm:py-16 space-y-16 sm:space-y-20">

        <motion.section
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="max-w-7xl mx-auto px-4 sm:px-6"
        >
          <div className="relative bg-gradient-to-br from-white via-purple-50 to-pink-50 rounded-3xl shadow-2xl overflow-hidden border border-purple-100">
            <div className="absolute top-0 right-0 w-48 sm:w-96 h-48 sm:h-96 bg-gradient-to-br from-purple-200/30 to-pink-200/30 rounded-full blur-3xl -translate-y-24 sm:-translate-y-48 translate-x-24 sm:translate-x-48" />
            <div className="absolute bottom-0 left-0 w-48 sm:w-96 h-48 sm:h-96 bg-gradient-to-tr from-blue-200/30 to-purple-200/30 rounded-full blur-3xl translate-y-24 sm:translate-y-48 -translate-x-24 sm:-translate-x-48" />
            
            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 items-center p-6 sm:p-8 lg:p-16">
              <div className="space-y-6 sm:space-y-8 text-center lg:text-left order-2 lg:order-1">
                <div className="space-y-4">
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6 }}
                    className="flex items-center justify-center lg:justify-start gap-4"
                  >
                    <div className="p-3 sm:p-4 bg-gradient-to-br from-purple-600 to-pink-600 rounded-2xl shadow-xl">
                      <svg className="w-6 sm:w-8 h-6 sm:h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                          d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    </div>
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-purple-700 to-pink-600 bg-clip-text text-transparent">
                      Vision
                    </h2>
                  </motion.div>
                  
                  <motion.div 
                    initial={{ width: 0 }}
                    whileInView={{ width: "100px" }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="h-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full mx-auto lg:mx-0"
                  />
                </div>

                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="space-y-4 sm:space-y-6"
                >
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 to-pink-600/10 rounded-2xl blur-sm" />
                    <div className="relative bg-white/70 backdrop-blur-sm border border-purple-200 rounded-2xl p-4 sm:p-6 shadow-lg">
                      <p className="text-base sm:text-lg lg:text-xl font-medium text-gray-800 leading-relaxed">
                        To be the <span className="font-bold text-purple-700">forefront innovators</span> in delivering 
                        <span className="font-bold text-pink-600"> transformative software solutions</span> that empower businesses
                        to thrive in an ever-evolving digital landscape.
                      </p>
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-4 sm:p-6 border border-purple-100">
                    <p className="text-gray-700 leading-relaxed text-sm sm:text-base">
                      We envision a future where technology seamlessly integrates with business operations,
                      driving <span className="font-semibold text-purple-700">efficiency</span>, 
                      <span className="font-semibold text-pink-600"> sustainability</span>, and 
                      <span className="font-semibold text-blue-600"> success</span> for our clients.
                    </p>
                  </div>
                </motion.div>
              </div>

              <div className="flex justify-center items-center relative order-1 lg:order-2">
                <motion.div
                  className="absolute bg-gradient-to-br from-purple-200/50 to-pink-200/50 rounded-full"
                  initial={{ width: 0, height: 0, opacity: 0 }}
                  whileInView={{ width: '85%', height: '85%', opacity: 1 }}
                  transition={{ duration: 1, ease: "easeOut" }}
                  style={{
                    maxWidth: '300px',
                    maxHeight: '300px',
                    aspectRatio: '1/1',
                  }}
                />
                
                <motion.div
                  className="absolute border-4 border-gradient-to-r from-purple-400 to-pink-400 rounded-full"
                  initial={{ width: 0, height: 0, opacity: 0 }}
                  whileInView={{ width: '95%', height: '95%', opacity: 0.3 }}
                  transition={{ duration: 1.2, ease: "easeOut", delay: 0.2 }}
                  style={{
                    maxWidth: '320px',
                    maxHeight: '320px',
                    aspectRatio: '1/1',
                    borderImage: 'linear-gradient(45deg, #a855f7, #ec4899) 1'
                  }}
                />

                <motion.img
                  src={VisionImage}
                  alt="Vision Illustration"
                  className="relative z-20 max-w-full h-auto object-contain drop-shadow-2xl"
                  initial={{ scale: 0.7, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 1, ease: "easeOut", delay: 0.3 }}
                  style={{ maxWidth: '250px' }}
                />

                {[...Array(3)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-3 sm:w-4 h-3 sm:h-4 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full opacity-60"
                    initial={{ scale: 0, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 0.6 }}
                    transition={{ duration: 0.5, delay: 0.6 + i * 0.2 }}
                    animate={{
                      y: [0, -10, 0],
                      x: [0, 5, 0],
                    }}
                    style={{
                      animationDuration: `${3 + i}s`,
                      animationIterationCount: 'infinite',
                      top: `${20 + i * 25}%`,
                      right: `${10 + i * 15}%`,
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        </motion.section>

      </div>

      <section className="relative py-16 sm:py-20 px-4 sm:px-6 bg-gradient-to-br from-purple-50 via-white to-purple-100 text-gray-800">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-100/30 via-transparent to-purple-200/30" />
        <div className="absolute top-0 left-1/4 w-48 sm:w-96 h-48 sm:h-96 bg-purple-300/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-48 sm:w-96 h-48 sm:h-96 bg-purple-400/10 rounded-full blur-3xl" />
        
        <div className="text-center mb-12 sm:mb-16 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="w-16 sm:w-20 h-1 bg-gradient-to-r from-purple-600 to-purple-800 mx-auto rounded-full mb-4 sm:mb-6" />
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 text-gray-800">
              Our <span className="bg-gradient-to-r from-purple-600 to-purple-800 bg-clip-text text-transparent">Mission</span>
            </h2>
            <p className="text-gray-600 text-base sm:text-lg mt-4 max-w-2xl mx-auto leading-relaxed">
              We are driven by our values. Here's what defines how we work and serve our clients.
            </p>
          </motion.div>
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 lg:gap-10">
            
            <motion.div 
              className="group relative min-h-96 rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 bg-gradient-to-br from-white via-purple-50 to-purple-100 border border-purple-200"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05, y: -10 }}
            >
              <motion.div 
                className="absolute inset-0 bg-cover bg-center opacity-30 transition-opacity duration-700 group-hover:opacity-40"
                style={{ backgroundImage: `url(${MissionBg1})` }}
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              />
              
              <div className="absolute top-4 sm:top-6 right-4 sm:right-6 w-12 sm:w-16 h-12 sm:h-16 bg-gradient-to-br from-purple-500 to-purple-700 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                <svg className="w-6 sm:w-8 h-6 sm:h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              
              <div className="relative h-full p-4 sm:p-6 flex flex-col justify-end z-10">
                <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3 text-purple-800 group-hover:text-purple-900 transition-colors">Client Empowerment</h3>
                <p className="text-sm sm:text-base text-gray-800 leading-relaxed font-bold">
At Asipiya Soft Solutions, we believe in enabling our clients to
thrive by equipping them with custom-built software solutions tailored to their unique
business needs. Our client-centric approach ensures that every solution we deliver adds
tangible value, promotes operational efficiency and empowers organizations to take
confident strides toward their goals.
                </p>
              </div>
            </motion.div>

            <motion.div 
              className="group relative min-h-96 rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 bg-gradient-to-br from-white via-purple-50 to-purple-100 border border-purple-200"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05, y: -10 }}
            >
              <motion.div 
                className="absolute inset-0 bg-cover bg-center opacity-30 transition-opacity duration-700 group-hover:opacity-40"
                style={{ backgroundImage: `url(${MissionBg2})` }}
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              />
              
              <div className="absolute top-4 sm:top-6 right-4 sm:right-6 w-12 sm:w-16 h-12 sm:h-16 bg-gradient-to-br from-blue-500 to-blue-700 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                <svg className="w-6 sm:w-8 h-6 sm:h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              
              <div className="relative h-full p-4 sm:p-6 flex flex-col justify-end z-10">
                <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3 text-blue-800 group-hover:text-blue-900 transition-colors">Innovation</h3>
                <p className="text-sm sm:text-base text-gray-800 leading-relaxed font-bold">
 Innovation is the driving force behind everything we do. We are committed
to remaining at the forefront of technology by continuously exploring new tools,
frameworks, and methodologies. By embracing creativity and forward-thinking, we
transform ideas into cutting-edge solutions that help businesses stay ahead in an
ever-evolving digital landscape.                </p>
              </div>
            </motion.div>

            <motion.div 
              className="group relative min-h-96 rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 bg-gradient-to-br from-white via-purple-50 to-purple-100 border border-purple-200"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05, y: -10 }}
            >
              <motion.div 
                className="absolute inset-0 bg-cover bg-center opacity-30 transition-opacity duration-700 group-hover:opacity-40"
                style={{ backgroundImage: `url(${MissionBg3})` }}
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              />
              
              <div className="absolute top-4 sm:top-6 right-4 sm:right-6 w-12 sm:w-16 h-12 sm:h-16 bg-gradient-to-br from-teal-500 to-teal-700 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                <svg className="w-6 sm:w-8 h-6 sm:h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              
              <div className="relative h-full p-4 sm:p-6 flex flex-col justify-end z-10">
                <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3 text-teal-800 group-hover:text-teal-900 transition-colors">Strategic Partnership</h3>
                <p className="text-sm sm:text-base text-gray-800 leading-relaxed font-bold">
 We view our clients not just as customers, but as long-term
partners. By working collaboratively and understanding their goals, challenges, and
vision, we cultivate strategic relationships built on trust and mutual success.</p>
              </div>
            </motion.div>

            <motion.div 
              className="group relative min-h-96 rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 bg-gradient-to-br from-white via-purple-50 to-purple-100 border border-purple-200"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05, y: -10 }}
            >
              <motion.div 
                className="absolute inset-0 bg-cover bg-center opacity-30 transition-opacity duration-700 group-hover:opacity-40"
                style={{ backgroundImage: `url(${MissionBg4})` }}
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              />
              
              <div className="absolute top-4 sm:top-6 right-4 sm:right-6 w-12 sm:w-16 h-12 sm:h-16 bg-gradient-to-br from-amber-500 to-amber-700 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                <svg className="w-6 sm:w-8 h-6 sm:h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                </svg>
              </div>
              
              <div className="relative h-full p-4 sm:p-6 flex flex-col justify-end z-10">
                <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3 text-amber-800 group-hover:text-amber-900 transition-colors">Excellence in <br />Execution</h3>
                <p className="text-sm sm:text-base text-gray-800 leading-relaxed font-bold">
 We pride ourselves on delivering results that not only meet
but exceed expectations. Our commitment to excellence is reflected in every stage of our
process—from planning and development to deployment and ongoing support.
Continuous Improvement: we embrace the culture of continuous improvement postering
a dynamic environment that encourages learning, growth, and adaptability.                </p>
              </div>
            </motion.div>

          </div>
        </div>
      </section>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-16 space-y-16 sm:space-y-20">

        <motion.section
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="space-y-8 sm:space-y-12"
        >
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="w-16 sm:w-20 h-1 bg-gradient-to-r from-purple-600 to-pink-600 mx-auto rounded-full mb-4 sm:mb-6" />
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4 sm:mb-6">
                Our <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">Journey</span>
              </h2>
              <p className="text-gray-600 text-base sm:text-lg max-w-3xl mx-auto leading-relaxed">
                From humble beginnings to becoming a leading software solutions provider
              </p>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 items-center">
            
            <motion.div 
              className="bg-gradient-to-br from-white via-purple-50 to-purple-100 rounded-3xl shadow-2xl p-6 sm:p-8 border border-purple-200 relative overflow-hidden"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <div className="absolute top-0 right-0 w-24 sm:w-32 h-24 sm:h-32 bg-gradient-to-br from-purple-200/30 to-pink-200/30 rounded-full blur-2xl -translate-y-8 sm:-translate-y-16 translate-x-8 sm:translate-x-16" />
              <div className="absolute bottom-0 left-0 w-16 sm:w-24 h-16 sm:h-24 bg-gradient-to-tr from-blue-200/30 to-purple-200/30 rounded-full blur-2xl translate-y-6 sm:translate-y-12 -translate-x-6 sm:-translate-x-12" />
              
              <div className="relative z-10 space-y-4 sm:space-y-6 text-gray-700 leading-relaxed">
                <motion.p 
                  className="text-base sm:text-lg"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  viewport={{ once: true }}
                >
                  <span className="font-bold text-purple-800 text-lg sm:text-xl">Asipiya Soft Solutions (Pvt) Ltd</span> is a Sri Lankan company duly incorporated under the
                  Companies Act No. 07 of 2007, bearing registration number PV 00287018. The
                  company's registered office is located at No: 716, Kohalwila Road, Dalugama, Kelaniya.
                </motion.p>
                
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  viewport={{ once: true }}
                  className="text-sm sm:text-base"
                >
                  Established as a printing specialist, Asipiya Soft Solutions began offering offset and
                  digital printing services and earned recognition as <span className="font-semibold text-purple-700">Sri Lanka's Largest Online Printing Shop</span>.
                </motion.p>
                
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                  viewport={{ once: true }}
                  className="text-sm sm:text-base"
                >
                  Over time, the company expanded into technology and digital solutions, evolving into a
                  comprehensive business solutions provider. This transformation integrated <span className="font-semibold text-blue-700">software
                  development and digital marketing services</span>, catering to a diverse clientele.
                </motion.p>
                
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                  viewport={{ once: true }}
                  className="text-sm sm:text-base"
                >
                  With a reputation built on <span className="font-semibold text-green-700">innovation, reliability, and tailored solutions</span>, the company has
                  become a trusted partner for numerous institutional clients.
                </motion.p>
                
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.7 }}
                  viewport={{ once: true }}
                  className="text-sm sm:text-base"
                >
                  Committed to staying ahead in a rapidly evolving market, Asipiya Soft Solutions
                  continuously adapts to emerging technologies and market needs, ensuring it remains <span className="font-semibold text-amber-700">future-ready</span>.
                </motion.p>
              </div>
            </motion.div>

            <motion.div 
              className="relative"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <div className="relative">
                
                <motion.div 
                  className="absolute left-6 sm:left-8 top-0 w-1 bg-gradient-to-b from-purple-500 via-blue-500 to-green-500 rounded-full"
                  initial={{ height: 0 }}
                  whileInView={{ height: "100%" }}
                  transition={{ duration: 2, delay: 0.5 }}
                  viewport={{ once: true }}
                />

                <div className="space-y-8 sm:space-y-12">
                  
                  <motion.div 
                    className="flex items-center space-x-4 sm:space-x-6"
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.6 }}
                    viewport={{ once: true }}
                  >
                    <div className="relative">
                      <motion.div 
                        className="w-12 sm:w-16 h-12 sm:h-16 bg-gradient-to-br from-purple-500 to-purple-700 rounded-full flex items-center justify-center shadow-lg"
                        whileHover={{ scale: 1.1 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        <svg className="w-6 sm:w-8 h-6 sm:h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                        </svg>
                      </motion.div>
                    </div>
                    <div className="bg-white rounded-xl p-3 sm:p-4 shadow-lg border border-purple-200 flex-1">
                      <h3 className="font-bold text-purple-800 text-base sm:text-lg">Foundation (2015)</h3>
                      <p className="text-gray-600 text-xs sm:text-sm">Started as Sri Lanka's largest online printing shop</p>
                    </div>
                  </motion.div>

                  <motion.div 
                    className="flex items-center space-x-4 sm:space-x-6"
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.8 }}
                    viewport={{ once: true }}
                  >
                    <div className="relative">
                      <motion.div 
                        className="w-12 sm:w-16 h-12 sm:h-16 bg-gradient-to-br from-blue-500 to-blue-700 rounded-full flex items-center justify-center shadow-lg"
                        whileHover={{ scale: 1.1 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        <svg className="w-6 sm:w-8 h-6 sm:h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                      </motion.div>
                    </div>
                    <div className="bg-white rounded-xl p-3 sm:p-4 shadow-lg border border-blue-200 flex-1">
                      <h3 className="font-bold text-blue-800 text-base sm:text-lg">Digital Expansion (2020-2021)</h3>
                      <p className="text-gray-600 text-xs sm:text-sm">Expanded into technology and digital solutions</p>
                    </div>
                  </motion.div>

                  <motion.div 
                    className="flex items-center space-x-4 sm:space-x-6"
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 1.0 }}
                    viewport={{ once: true }}
                  >
                    <div className="relative">
                      <motion.div 
                        className="w-12 sm:w-16 h-12 sm:h-16 bg-gradient-to-br from-green-500 to-green-700 rounded-full flex items-center justify-center shadow-lg"
                        whileHover={{ scale: 1.1 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        <svg className="w-6 sm:w-8 h-6 sm:h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                      </motion.div>
                    </div>
                    <div className="bg-white rounded-xl p-3 sm:p-4 shadow-lg border border-green-200 flex-1">
                      <h3 className="font-bold text-green-800 text-base sm:text-lg">Strategic Growth (2022-2023)</h3>
                      <p className="text-gray-600 text-xs sm:text-sm">Became trusted partner for institutional clients</p>
                    </div>
                  </motion.div>

                  <motion.div 
                    className="flex items-center space-x-4 sm:space-x-6"
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 1.2 }}
                    viewport={{ once: true }}
                  >
                    <div className="relative">
                      <motion.div 
                        className="w-12 sm:w-16 h-12 sm:h-16 bg-gradient-to-br from-amber-500 to-amber-700 rounded-full flex items-center justify-center shadow-lg"
                        whileHover={{ scale: 1.1 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        <svg className="w-6 sm:w-8 h-6 sm:h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                        </svg>
                      </motion.div>
                    </div>
                    <div className="bg-white rounded-xl p-3 sm:p-4 shadow-lg border border-amber-200 flex-1">
                      <h3 className="font-bold text-amber-800 text-base sm:text-lg">Future Ready (2024+)</h3>
                      <p className="text-gray-600 text-xs sm:text-sm">Continuously adapting to emerging technologies</p>
                    </div>
                  </motion.div>

                </div>

                {[...Array(5)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-1.5 sm:w-2 h-1.5 sm:h-2 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full opacity-60"
                    initial={{ scale: 0, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 0.6 }}
                    transition={{ duration: 0.5, delay: 1.5 + i * 0.2 }}
                    animate={{
                      y: [0, -20, 0],
                      x: [0, 10, 0],
                    }}
                    style={{
                      animationDuration: `${4 + i}s`,
                      animationIterationCount: 'infinite',
                      top: `${10 + i * 20}%`,
                      right: `${5 + i * 10}%`,
                    }}
                  />
                ))}
              </div>
            </motion.div>

          </div>
        </motion.section>

      </div>

      {/* Beyond Business Section */}
      <section className="py-8 sm:py-12 px-4 sm:px-6 bg-purple-900 text-white relative overflow-hidden">
        {/* Decorative background elements */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-800/40 via-transparent to-pink-800/40" />
        <div className="absolute top-0 left-1/4 w-48 sm:w-96 h-48 sm:h-96 bg-purple-600/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-48 sm:w-96 h-48 sm:h-96 bg-pink-600/10 rounded-full blur-3xl" />

        <div className="max-w-6xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <div className="w-16 sm:w-20 h-1 bg-gradient-to-r from-purple-400 to-pink-400 mx-auto rounded-full mb-4 sm:mb-6" />
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 tracking-tight">
              Beyond <span className="bg-gradient-to-r from-purple-300 to-pink-300 bg-clip-text text-transparent">Business</span>
            </h2>
            <p className="text-purple-100 text-base sm:text-lg max-w-3xl mx-auto leading-relaxed mb-4 sm:mb-6">
              At the INCO 2024 Exhibition, Asipiya Soft Solutions spearheaded a social awareness
              initiative aimed at highlighting the critical role of business software in today's digital era.
              Recognizing the challenges faced by businesses in adapting to rapidly evolving
              technological landscapes, our program was designed to educate and inspire attendees
              about the transformative potential of digital tools.
            </p>
            <p className="text-purple-100 text-base sm:text-lg max-w-3xl mx-auto leading-relaxed">
              At the exhibition, we led Educational Outreach sessions to demonstrate how integrating
              business software can enhance operational efficiency, data security, and scalability.
              Visitors engaged with Interactive Demonstrations, experiencing live software showcases
              that highlighted key functionalities and real-world benefits. Our team of experts provided
              Personalized Consultations, addressing specific business challenges and recommending
              tailored digital solutions. Through dynamic presentations and case studies, we reinforced
              our Advocacy for Digital Adoption, emphasizing the need for businesses to embrace
              digital transformation to stay competitive and future-ready in an evolving marketplace.
              The event successfully bridged knowledge gaps and showcased practical pathways for
              digital growth.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-12 sm:py-16 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900">Beyond Business at INCO 2024</h2>
            <p className="mt-4 text-base sm:text-lg text-gray-600">
              A glance at our awareness mission, interactive demos, and real-world engagements at the exhibition.
            </p>
          </div>

          {/* Mobile Carousel View - Card Style Design */}
          <div className="block md:hidden">
            <div className="relative max-w-sm mx-auto">
              
              {/* Left Navigation Arrow */}
              <button
                onClick={() => handleSlideChange(currentSlide === 0 ? incoExhibitionData.length - 1 : currentSlide - 1)}
                className="absolute left-2 top-1/2 transform -translate-y-1/2 z-20 w-10 h-10 bg-purple-600 hover:bg-purple-700 text-white rounded-full flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-110"
                aria-label="Previous slide"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>

              {/* Right Navigation Arrow */}
              <button
                onClick={() => handleSlideChange((currentSlide + 1) % incoExhibitionData.length)}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 z-20 w-10 h-10 bg-purple-600 hover:bg-purple-700 text-white rounded-full flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-110"
                aria-label="Next slide"
              >
                <svg className="w-5 h-5" fill="nonfe" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>

              {/* Main Card Container */}
              <motion.div
                key={currentSlide}
                initial={{ opacity: 1, x: 0 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="relative bg-white rounded-3xl shadow-2xl overflow-hidden mx-4 mb-8"
              >
                {/* Dark Header Section with Full Image Display */}
                <div className="bg-gradient-to-br from-gray-800 to-gray-900 h-64 flex items-center justify-center relative overflow-hidden">
                  {/* Large Exhibition Image */}
                  <div className="relative z-10 w-full h-full p-4">
                    <img
                      src={incoExhibitionData[currentSlide].image}
                      alt={incoExhibitionData[currentSlide].title}
                      className="w-full h-full object-cover rounded-2xl shadow-2xl border-4 border-white/20"
                    />
                    {/* Overlay gradient for better text readability */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-black/20 rounded-2xl"></div>
                    
                    {/* Category Badge */}
                    <div className="absolute top-6 left-6">
                      <span className="bg-orange-500 text-white px-3 py-1 rounded-full text-xs font-semibold shadow-lg">
                        {incoExhibitionData[currentSlide].category}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Content Section */}
                <div className="p-6 text-center">
                  {/* Title */}
                  <h3 className="text-xl font-bold text-gray-900 mb-3 leading-tight">
                    {incoExhibitionData[currentSlide].title}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-600 text-sm leading-relaxed mb-6 min-h-[4rem]">
                    {incoExhibitionData[currentSlide].description}
                  </p>

                  {/* Read More Button */}
                   
                </div>
              </motion.div>

              {/* Navigation Dots */}
              <div className="flex justify-center items-center space-x-2 mb-6">
                {incoExhibitionData.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => handleSlideChange(index)}
                    className={`transition-all duration-300 rounded-full ${
                      index === currentSlide 
                        ? 'w-8 h-3 bg-gradient-to-r from-purple-500 to-purple-600 shadow-lg' 
                        : 'w-3 h-3 bg-gray-300 hover:bg-gray-400'
                    }`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>

               
            </div>
          </div>

          {/* Desktop Grid View - Keep Original Design */}
          <div className="hidden md:block">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0 overflow-hidden rounded-3xl shadow-2xl bg-gray-100 border border-gray-200">
              {incoExhibitionData.map((item, index) => (
                <motion.div
                  key={index}
                  className={`relative flex flex-col h-80 sm:h-96 ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} ${item.bgColor} border-b border-r border-gray-200 ${index % 3 === 2 ? 'lg:border-r-0' : ''} ${index >= 9 ? 'border-b-0' : ''} ${index % 3 === 0 ? 'border-l-0' : ''} ${index < 3 ? 'border-t-0' : ''} transition-all duration-300 ease-in-out hover:scale-[1.02] hover:shadow-xl`}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="w-full md:w-1/2 h-1/2 md:h-full overflow-hidden relative group">
                    <motion.img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover"
                      whileHover={{ scale: 1.25, rotate: 5 }}
                      transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    />
                    <div className="absolute inset-0 bg-black/30 group-hover:bg-black/0 transition-colors duration-300"></div>
                  </div>
                  <div className={`w-full md:w-1/2 h-1/2 md:h-full p-4 sm:p-6 flex flex-col justify-center text-center md:text-left ${item.textColor}`}>
                    <p className="text-xs uppercase opacity-80 mb-1">{item.category}</p>
                    <h3 className="font-bold text-base sm:text-lg mb-2 leading-tight">{item.title}</h3>
                    <p className="text-xs sm:text-sm opacity-90 leading-relaxed">{item.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>
        <Footer />
      </div>
    </ParallaxProvider>
  );
};

export default Company;