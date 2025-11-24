import React from 'react';

interface BlurTextProps {
  text: string;
  className?: string;
  delay?: number;
  as?: 'h1' | 'h2' | 'p' | 'span' | 'div';
}

const BlurText: React.FC<BlurTextProps> = ({ text, className = "", delay = 50, as: Component = 'div' }) => {
  // Split text into words, then characters if needed, but words usually look better for titles
  const words = text.split(' ');

  return (
    <Component className={`flex flex-wrap gap-[0.25em] ${className}`}>
      {words.map((word, i) => (
        <span 
          key={i} 
          className="inline-block animate-blur-in opacity-0"
          style={{ animationDelay: `${i * delay}ms` }}
        >
          {word === '<br/>' ? <br className="w-full basis-full" /> : word}
        </span>
      ))}
    </Component>
  );
};

export default BlurText;