import React from 'react';

const Logo = ({ className = "h-12 w-auto" }) => {
  return (
    <div className={`flex items-center justify-center ${className}`}>
      <svg
        viewBox="0 0 200 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
      >
        {/* Elegant RTH Monogram */}
        <path
          d="M40 30 V90 M40 30 H70 C90 30 90 55 70 55 H40 M70 55 L90 90"
          stroke="currentColor"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-white"
        />
        <path
          d="M100 30 V90 M85 30 H115"
          stroke="currentColor"
          strokeWidth="4"
          strokeLinecap="round"
          className="text-[#fbbf24]" // Gold color for middle letter accent
        />
        <path
          d="M130 30 V90 M130 60 H160 M160 30 V90"
          stroke="currentColor"
          strokeWidth="4"
          strokeLinecap="round"
          className="text-white"
        />
        
        {/* Decorative elements */}
        <path
          d="M20 100 Q100 115 180 100"
          stroke="#fbbf24"
          strokeWidth="2"
          fill="none"
        />
      </svg>
    </div>
  );
};

export default Logo;