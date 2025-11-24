import React, { useRef, useEffect, useState } from 'react';
// import { useSpring, animated } from '@react-spring/web'; // Removed to fix dependency issue

import { motion } from 'framer-motion';

interface BlurTextProps {
  text: string;
  delay?: number;
  className?: string;
  textClassName?: string; // New prop for styling individual characters
}

const BlurText: React.FC<BlurTextProps> = ({ text, delay = 0, className = '', textClassName = '' }) => {
  return (
    <div className={`flex flex-wrap gap-x-2 justify-center ${className}`}>
      {text.split(' ').map((word, i) => (
        <span key={i} className="inline-block overflow-visible py-2">
             <motion.span
                initial={{ filter: 'blur(10px)', opacity: 0, y: 20 }}
                animate={{ filter: 'blur(0px)', opacity: 1, y: 0 }}
                transition={{ 
                    duration: 0.8, 
                    delay: delay + i * 0.1,
                    ease: [0.2, 0.65, 0.3, 0.9]
                }}
                className={`inline-block ${textClassName}`}
            >
            {word}
            </motion.span>
        </span>
      ))}
    </div>
  );
};

export default BlurText;
