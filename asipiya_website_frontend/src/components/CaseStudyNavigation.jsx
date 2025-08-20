// src/components/CaseStudyNavigation.js
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const CaseStudyNavigation = ({ currentCaseStudyId }) => {
  const navigate = useNavigate();

  const caseStudies = [
    'green-lanka',
    'minvens',
    'finwin',
    'cbc-capital',
    'd-n-investment',
    'nsk-business-solutions',
    'orient-trust-investment',
    'rightway-credit-investment',
    'future-hope-investment'
  ];

  const currentIndex = caseStudies.indexOf(currentCaseStudyId);
  const prevCaseStudy = currentIndex > 0 ? caseStudies[currentIndex - 1] : null;
  const nextCaseStudy = currentIndex < caseStudies.length - 1 ? caseStudies[currentIndex + 1] : null;

  return (
    <div className="py-12 px-6 bg-[#F5F3FF]">
      <div className="max-w-6xl mx-auto">
        {/* Desktop View */}
        <div className="hidden md:flex justify-between items-center">
          {/* Previous Button */}
          <motion.button
            whileHover={{ x: -4 }}
            onClick={() =>
              prevCaseStudy
                ? navigate(`/case-studies/${prevCaseStudy}`)
                : navigate('/insights#case-studies')
            }
            className="flex items-center gap-3 group"
          >
            <div className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center group-hover:shadow-md transition-all">
              <DoubleLeftArrowIcon />
            </div>
            <div className="text-left">
              <p className="text-sm text-gray-600">
                {prevCaseStudy ? 'Previous case study' : 'Go to case studies'}
              </p>
              <p className="font-medium text-gray-800">
                {prevCaseStudy
                  ? formatCaseStudyName(prevCaseStudy)
                  : 'All Success Stories'}
              </p>
            </div>
          </motion.button>

          {/* Next Button */}
          {nextCaseStudy && (
            <motion.button
              whileHover={{ x: 4 }}
              onClick={() => navigate(`/case-studies/${nextCaseStudy}`)}
              className="flex items-center gap-3 group"
            >
              <div className="text-right">
                <p className="text-sm text-gray-600">Next case study</p>
                <p className="font-medium text-gray-800">
                  {formatCaseStudyName(nextCaseStudy)}
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
              prevCaseStudy
                ? navigate(`/case-studies/${prevCaseStudy}`)
                : navigate('/insights#case-studies')
            }
            className="w-12 h-12 rounded-full bg-white shadow-sm flex items-center justify-center"
          >
            <DoubleLeftArrowIcon />
          </motion.button>

          {nextCaseStudy && (
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate(`/case-studies/${nextCaseStudy}`)}
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

// Helper function to format case study ID to display name
function formatCaseStudyName(id) {
  return id
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
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

export default CaseStudyNavigation;
