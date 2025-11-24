import React from 'react';
import { motion } from 'framer-motion';

interface ShinyTextProps {
  text: string;
  className?: string;
  speed?: number; // Duration of the shine loop
}

const ShinyText: React.FC<ShinyTextProps> = ({ text, className = '', speed = 5 }) => {
  return (
    <div className={`relative inline-block overflow-hidden ${className}`}>
      {/* Base Text (Darker Metallic) */}
      <span className="relative z-10 bg-gradient-to-b from-gray-300 via-gray-500 to-gray-700 bg-clip-text text-transparent">
        {text}
      </span>
      
      {/* Shining Overlay */}
      <motion.div
        className="absolute inset-0 z-20 bg-gradient-to-r from-transparent via-emperor-gold/80 to-transparent w-[200%] opacity-0"
        animate={{
          x: ['-100%', '100%'],
          opacity: [0, 1, 0]
        }}
        transition={{
          repeat: Infinity,
          duration: speed,
          ease: "linear",
          repeatDelay: 1
        }}
        style={{
             mixBlendMode: 'color-dodge',
             maskImage: `linear-gradient(to right, transparent, black 50%, transparent)`,
             WebkitMaskImage: `linear-gradient(to right, transparent, black 50%, transparent)`
        }}
      />
      
       {/* Reflection Layer (Reacts to SpotlightOverlay via blend modes globally) */}
       <span className="absolute inset-0 z-10 text-transparent bg-clip-text bg-gradient-to-b from-[#ffecb3] via-[#ffc107] to-[#ff6f00] opacity-30 mix-blend-overlay pointer-events-none">
          {text}
       </span>
    </div>
  );
};

export default ShinyText;
