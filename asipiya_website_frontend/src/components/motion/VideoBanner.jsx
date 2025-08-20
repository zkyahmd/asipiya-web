import React from "react";
import { Parallax } from 'react-scroll-parallax';
import { motion } from "framer-motion";
import { SVGs } from './PulseBeamsSecond'; // Assuming SVGs are still needed here

export const VideoBanner = ({ videoSrc, children }) => {
  return (
    <div className="w-full min-h-screen h-screen relative flex items-center justify-center overflow-hidden antialiased">
      {/* Background Video */}
      <Parallax speed={-40} className="absolute inset-0 w-full h-full z-0">
        <video
          src={videoSrc}
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full min-h-screen object-cover select-none pointer-events-none blur-sm brightness-90"
        >
          Your browser does not support the video tag.
        </video>
      </Parallax>

      {/* Dark Overlay */}
      <div className="absolute inset-0 z-10 bg-gradient-to-b from-black/80 via-purple-900/50 to-black/90" />

      {/* SVG Pulse Beams */}
      <div className="absolute inset-0 flex items-center justify-center">
        <SVGs />
      </div>

      {/* Content on top */}
      <motion.div
        className="relative z-30 w-full flex flex-col items-center justify-center text-center px-4 pt-28 md:pt-36 pb-16"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: 'easeOut' }}
      >
        {children}
      </motion.div>
    </div>
  );
}; 