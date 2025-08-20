import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Accordion = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  // Animation variants for the content
  const contentVariants = {
    hidden: { opacity: 0, height: 0 },
    visible: { 
      opacity: 1, 
      height: 'auto', 
      transition: { 
        duration: 0.4, 
        ease: 'easeOut',
        opacity: { duration: 0.3 }
      } 
    },
    exit: { 
      opacity: 0, 
      height: 0, 
      transition: { 
        duration: 0.3, 
        ease: 'easeOut',
        opacity: { duration: 0.2 }
      } 
    },
  };

  // Animation variants for the chevron icon
  const chevronVariants = {
    rotated: { rotate: 180 },
    normal: { rotate: 0 },
  };

  // Animation variants for the accordion container
  const containerVariants = {
    hover: {
      scale: 1.02,
      boxShadow: "0 8px 25px rgba(139, 92, 246, 0.15)",
      transition: { duration: 0.2, ease: 'easeOut' }
    },
    normal: {
      scale: 1,
      boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
      transition: { duration: 0.2, ease: 'easeOut' }
    }
  };

  // Handle mouse enter - open accordion
  const handleMouseEnter = () => {
    setIsOpen(true);
  };

  // Handle mouse leave 
  const handleMouseLeave = () => {
    // Small delay to prevent flickering when moving between elements
    setTimeout(() => {
      setIsOpen(false);
    }, 150);
  };

  return (
    <motion.div
      className="border border-gray-200 rounded-lg overflow-hidden mb-4 bg-white"
      initial={false}
      variants={containerVariants}
      animate={isOpen ? "hover" : "normal"}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <motion.button
        className="flex justify-between items-center w-full p-5 text-left bg-white hover:bg-gradient-to-r hover:from-purple-50 hover:to-indigo-50 focus:outline-none focus:ring-2 focus:ring-purple-500 rounded-t-lg transition-all duration-300"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        whileHover={{
          backgroundColor: "rgba(139, 92, 246, 0.05)"
        }}
      >
        <h3 className="text-lg font-semibold text-gray-800 flex-1 transition-colors duration-300">
          {title}
        </h3>
        
        {/* chevron with color change on hover */}
        <motion.div
          className="flex items-center justify-center w-8 h-8 rounded-full bg-purple-100 ml-4"
          whileHover={{
            backgroundColor: "rgba(139, 92, 246, 0.2)",
            scale: 1.1
          }}
          transition={{ duration: 0.2 }}
        >
          <motion.svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-purple-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            variants={chevronVariants}
            animate={isOpen ? "rotated" : "normal"}
            transition={{ duration: 0.3, ease: 'easeOut' }}
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
          </motion.svg>
        </motion.div>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="content"
            variants={contentVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="overflow-hidden"
          >
            <motion.div 
              className="p-5 bg-gradient-to-br from-gray-50 to-purple-50 text-gray-700 border-t border-gray-100"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
            >
              {children}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Subtle glow effect when hovered */}
      <motion.div
        className="absolute inset-0 rounded-lg bg-gradient-to-r from-purple-400 to-indigo-400 opacity-0 pointer-events-none -z-10"
        animate={{
          opacity: isOpen ? 0.1 : 0,
        }}
        transition={{ duration: 0.3 }}
      />
    </motion.div>
  );
};

export default Accordion;