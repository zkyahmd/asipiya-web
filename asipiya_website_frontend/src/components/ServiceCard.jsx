import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useNavigate } from "react-router-dom";

const ServiceCard = ({ service }) => {
  const navigate = useNavigate();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.2 });

  return (
    <div
      ref={ref}
      className="overflow-hidden rounded-2xl shadow-lg"
      style={{
        backgroundImage: `url(${service.backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Blur overlay for readability */}
      <div className="bg-black/70 rounded-2xl">
        <motion.div
          className="group flex flex-col md:flex-row items-center gap-10 p-6 cursor-pointer rounded-2xl"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: "easeOut" }}
          onClick={() => navigate(service.link)}
        >
          {/* Icon image */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="w-30 h-30 flex-shrink-0 p-2 rounded-xl shadow-md"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              loading="lazy"
              src={service.image}
              alt={service.title}
              className="w-full h-full object-contain rounded-md group-hover:scale-105 transition duration-300"
            />
          </motion.div>

          {/* Text section */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex-1 flex flex-col justify-between items-center md:items-start text-center md:text-left"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-2xl font-bold mb-3 text-white drop-shadow-md">
              {service.title}
            </h2>
            <p className="whitespace-pre-line text-lg text-white mb-6 leading-relaxed hidden md:block drop-shadow-sm">
              {service.description}
            </p>
            <button
              onClick={() => navigate(service.link)}
              className="min-w-[150px] h-12 bg-purple-600 text-white px-5 py-2 rounded-lg font-medium hover:bg-purple-700 transition text-center"
            >
              Learn More
            </button>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default ServiceCard;
