// src/components/ServiceNavigation.js
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const ServiceNavigation = ({ currentServiceId }) => {
  const navigate = useNavigate();

  // List of all service IDs in the same order 
  const services = [
    'microfinance',
    'invoice',
    'leasing',
    'erp',
    'pawning',
    'marketing',
    'realestate'
  ];

  const currentIndex = services.indexOf(currentServiceId);
  const prevService = currentIndex > 0 ? services[currentIndex - 1] : null;
  const nextService = currentIndex < services.length - 1 ? services[currentIndex + 1] : null;

  return (
    <div className="py-12 px-6 bg-gradient-to-r from-purple-50 to-purple-100">
      <div className="max-w-6xl mx-auto">
        {/* Desktop View */}
        <div className="hidden md:flex justify-between items-center">
          {/* Previous Button */}
          <motion.button
            whileHover={{ x: -4 }}
            onClick={() =>
              prevService
                ? navigate(`/services/${prevService}`)
                : navigate('/ServiceHome')
            }
            className="flex items-center gap-3 group"
          >
            <div className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center group-hover:shadow-md transition-all">
              <DoubleLeftArrowIcon />
            </div>
            <div className="text-left">
              <p className="text-sm text-gray-600">
                {prevService ? 'Previous service' : 'All services'}
              </p>
              <p className="font-medium text-gray-800">
                {prevService
                  ? formatServiceName(prevService)
                  : 'Our Services'}
              </p>
            </div>
          </motion.button>

          {/* Next Button */}
          {nextService && (
            <motion.button
              whileHover={{ x: 4 }}
              onClick={() => navigate(`/services/${nextService}`)}
              className="flex items-center gap-3 group"
            >
              <div className="text-right">
                <p className="text-sm text-gray-600">Next service</p>
                <p className="font-medium text-gray-800">
                  {formatServiceName(nextService)}
                </p>
              </div>
              <div className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center group-hover:shadow-md transition-all">
                <DoubleRightArrowIcon />
              </div>
            </motion.button>
          )}
        </div>

        {/* Mobile View */}
        <div className="md:hidden flex justify-between">
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() =>
              prevService
                ? navigate(`/services/${prevService}`)
                : navigate('/')
            }
            className="w-12 h-12 rounded-full bg-white shadow-sm flex items-center justify-center"
          >
            <DoubleLeftArrowIcon />
          </motion.button>

          {nextService && (
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate(`/services/${nextService}`)}
              className="w-12 h-12 rounded-full bg-white shadow-sm flex items-center justify-center"
            >
              <DoubleRightArrowIcon />
            </motion.button>
          )}
        </div>
      </div>
    </div>
  );
};

// Helper function to format service ID to display name
function formatServiceName(id) {
  const nameMap = {
    microfinance: 'Microfinance Solutions',
    invoice: 'Invoice System',
    leasing: 'Leasing System',
    erp: 'ERP Systems',
    pawning: 'Pawning Systems',
    marketing: 'Digital Marketing',
    realestate: 'Real Estate'
  };
  
  return nameMap[id] || id
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

// SVG Icons
function DoubleLeftArrowIcon() {
  return (
    <svg
      className="w-6 h-6 text-purple-600"
      fill="currentColor"
      viewBox="0 0 20 20"
    >
      <path
        fillRule="evenodd"
        d="M11.707 14.707a1 1 0 01-1.414 0L5.586 10l4.707-4.707a1 1 0 011.414 1.414L8.414 10l3.293 3.293a1 1 0 010 1.414zM16.707 14.707a1 1 0 01-1.414 0L10.586 10l4.707-4.707a1 1 0 111.414 1.414L13.414 10l3.293 3.293a1 1 0 010 1.414z"
        clipRule="evenodd"
      />
    </svg>
  );
}

function DoubleRightArrowIcon() {
  return (
    <svg
      className="w-6 h-6 text-purple-600"
      fill="currentColor"
      viewBox="0 0 20 20"
    >
      <path
        fillRule="evenodd"
        d="M8.293 5.293a1 1 0 011.414 0L14.414 10l-4.707 4.707a1 1 0 01-1.414-1.414L11.586 10 8.293 6.707a1 1 0 010-1.414zM3.293 5.293a1 1 0 011.414 0L9.414 10l-4.707 4.707a1 1 0 01-1.414-1.414L6.586 10 3.293 6.707a1 1 0 010-1.414z"
        clipRule="evenodd"
      />
    </svg>
  );
}

export default ServiceNavigation;