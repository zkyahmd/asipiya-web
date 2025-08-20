import React from "react";
import { motion } from "framer-motion";

// GradientColors helper
const GradientColors = () => (
  <>
    <stop stopColor="#18CCFC" stopOpacity="0" />
    <stop stopColor="#18CCFC" />
    <stop offset="0.325" stopColor="#6344F5" />
    <stop offset="1" stopColor="#AE48FF" stopOpacity="0" />
  </>
);

// Animated SVG lines
const SVGs = () => {
  const width = 858;
  const height = 434;

  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="flex flex-shrink-0"
    >
      {/* Static SVG lines */}
      <path
        d="M269 220.5H16.5C10.9772 220.5 6.5 224.977 6.5 230.5V398.5"
        stroke="var(--slate-800)"
      />
      <path
        d="M568 200H841C846.523 200 851 195.523 851 190V40"
        stroke="var(--slate-800)"
      />
      <path
        d="M425.5 274V333C425.5 338.523 421.023 343 415.5 343H152C146.477 343 142 347.477 142 353V426.5"
        stroke="var(--slate-800)"
      />
      <path
        d="M493 274V333.226C493 338.749 497.477 343.226 503 343.226H760C765.523 343.226 770 347.703 770 353.226V427"
        stroke="var(--slate-800)"
      />
      <path
        d="M380 168V17C380 11.4772 384.477 7 390 7H414"
        stroke="var(--slate-800)"
      />

      {/* Animated gradients */}
      {[1, 2, 3, 4, 5].map((id, i) => (
        <motion.linearGradient
          key={id}
          id={`grad${id}`}
          gradientUnits="userSpaceOnUse"
          animate={{
            x1: [0, width * 1.2],
            x2: [0, width],
            y1: [height, height / 2],
            y2: [height * 1.2, height],
          }}
          transition={{
            duration: 4 + i,
            repeat: Infinity,
            ease: "linear",
            repeatDelay: 2,
          }}
        >
          <GradientColors />
        </motion.linearGradient>
      ))}

      <path
        d="M269 220.5H16.5C10.9772 220.5 6.5 224.977 6.5 230.5V398.5"
        stroke="url(#grad1)"
        strokeLinecap="round"
        strokeWidth="3"
      />
      <path
        d="M568 200H841C846.523 200 851 195.523 851 190V40"
        stroke="url(#grad2)"
        strokeWidth="3"
      />
      <path
        d="M425.5 274V333C425.5 338.523 421.023 343 415.5 343H152C146.477 343 142 347.477 142 353V426.5"
        stroke="url(#grad3)"
        strokeWidth="3"
      />
      <path
        d="M493 274V333.226C493 338.749 497.477 343.226 503 343.226H760C765.523 343.226 770 347.703 770 353.226V427"
        stroke="url(#grad4)"
        strokeWidth="3"
      />
      <path
        d="M380 168V17C380 11.4772 384.477 7 390 7H414"
        stroke="url(#grad5)"
        strokeWidth="3"
      />

      <circle
        cx="851"
        cy="34"
        r="6.5"
        fill="var(--slate-700)"
        stroke="var(--slate-600)"
      />
      <circle
        cx="770"
        cy="427"
        r="6.5"
        fill="var(--slate-700)"
        stroke="var(--slate-600)"
      />
      <circle
        cx="142"
        cy="427"
        r="6.5"
        fill="var(--slate-700)"
        stroke="var(--slate-600)"
      />
      <circle
        cx="6.5"
        cy="398.5"
        r="6"
        fill="var(--slate-700)"
        stroke="var(--slate-600)"
      />
      <circle
        cx="420.5"
        cy="6.5"
        r="6"
        fill="var(--slate-700)"
        stroke="var(--slate-600)"
      />
    </svg>
  );
};

const ServicePageBanner = ({
  children,
  bannerSrc,
  videoSrc = null,
  altText = "Service Page Banner",
}) => {
  return (
    <div className="w-full min-h-screen h-screen relative flex items-center justify-center overflow-hidden antialiased">
      {videoSrc ? (
        <>
          <video
            className="absolute inset-0 w-full h-full object-cover z-0"
            src={videoSrc}
            autoPlay
            loop
            muted
            playsInline
          />
          <div className="absolute inset-0 bg-black opacity-50 z-10 pointer-events-none" />
        </>
      ) : (
        <img
          src={bannerSrc}
          alt={altText}
          className="absolute inset-0 w-full h-full object-cover z-0 brightness-90"
        />
      )}
      <div className="absolute inset-0 z-10 bg-gradient-to-b from-black/80 via-purple-900/50 to-black/90" />

      <div className="absolute inset-0 flex items-center justify-center z-20">
        <SVGs />
      </div>

      <motion.div
        className="relative z-30 w-full flex flex-col items-center justify-center text-center px-4 pt-28 md:pt-36 pb-16"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        {children}
      </motion.div>
    </div>
  );
};

export default ServicePageBanner;
