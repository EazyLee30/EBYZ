import React, { useEffect, useState } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';

const SpotlightOverlay: React.FC = () => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth spring physics for the spotlight lag
  const springConfig = { damping: 25, stiffness: 150, mass: 0.5 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <div className="fixed inset-0 pointer-events-none z-[60] overflow-hidden mix-blend-color-dodge">
      <motion.div
        className="absolute w-[600px] h-[600px] rounded-full bg-radial-gradient"
        style={{
          x: smoothX,
          y: smoothY,
          translateX: '-50%',
          translateY: '-50%',
          background: `
            radial-gradient(
              circle at center,
              rgba(212, 175, 55, 0.15) 0%,
              rgba(212, 175, 55, 0.05) 30%,
              rgba(0, 0, 0, 0) 70%
            )
          `,
        }}
      />
    </div>
  );
};

export default SpotlightOverlay;

