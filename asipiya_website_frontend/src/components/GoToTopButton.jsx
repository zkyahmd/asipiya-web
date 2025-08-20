import React, { useState, useEffect } from "react";

const GoToTopButton = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    };
    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    visible && (
      <button
        onClick={scrollToTop}
        className="fixed bottom-20 right-2 z-50 bg-purple-700 text-white w-12 h-12 flex items-center justify-center rounded-full shadow-lg hover:bg-purple-800 transition border-4 border-white"
        aria-label="Go to top"
      >
        <span className="text-2xl">↑</span>
      </button>
    )
  );
};

export default GoToTopButton;
