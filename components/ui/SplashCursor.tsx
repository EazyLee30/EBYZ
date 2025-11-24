import React, { useEffect, useRef } from 'react';

interface Props {
  color?: string;
  count?: number;
  size?: number;
}

const SplashCursor: React.FC<Props> = ({ 
  color = '#D4AF37', // Emperor Gold
  count = 25, 
  size = 4 
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particles = useRef<any[]>([]);
  const mouse = useRef({ x: 0, y: 0 });
  const isActive = useRef(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    window.addEventListener('resize', resize);
    resize();

    const handleMouseMove = (e: MouseEvent) => {
      mouse.current = { x: e.clientX, y: e.clientY };
      isActive.current = true;
      // Add particles on move
      for (let i = 0; i < 2; i++) {
         particles.current.push(createParticle(e.clientX, e.clientY));
      }
    };

    window.addEventListener('mousemove', handleMouseMove);

    const createParticle = (x: number, y: number) => {
      return {
        x,
        y,
        size: Math.random() * size + 1,
        speedX: Math.random() * 2 - 1,
        speedY: Math.random() * 2 - 1,
        life: 1,
        decay: Math.random() * 0.02 + 0.01
      };
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particles.current.forEach((p, index) => {
        p.x += p.speedX;
        p.y += p.speedY;
        p.life -= p.decay;
        p.size *= 0.95;

        if (p.life <= 0 || p.size <= 0.1) {
          particles.current.splice(index, 1);
        } else {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fillStyle = color;
          ctx.globalAlpha = p.life * 0.5;
          ctx.fill();
        }
      });
      
      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [color, count, size]);

  return (
    <canvas 
      ref={canvasRef} 
      className="fixed inset-0 pointer-events-none z-[9999]"
    />
  );
};

export default SplashCursor;

