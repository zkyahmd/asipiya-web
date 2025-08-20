import React from 'react';
import logo from '../assets/logo.png';

function LoadingScreen() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-white animate-fadeIn">
      <img src={logo} alt="Logo" className="w-55 h-20 mb-6 animate-bounce" />
    </div>
  );
}

export default LoadingScreen;
