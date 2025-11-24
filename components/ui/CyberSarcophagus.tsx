import React from 'react';
import { motion } from 'framer-motion';

const CyberSarcophagus: React.FC = () => {
  return (
    <div className="relative w-64 h-96 md:w-80 md:h-[500px] perspective-1000 mx-auto">
      {/* Sarcophagus Body */}
      <motion.div 
        className="relative w-full h-full preserve-3d"
        initial={{ rotateY: -20, rotateX: 10 }}
        animate={{ rotateY: [-20, 20, -20], rotateX: [10, -5, 10] }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Front Face */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#1a1a1a] to-black border-2 border-emperor-gold/30 rounded-lg flex flex-col items-center justify-between py-8 shadow-[0_0_50px_rgba(212,175,55,0.1)] backface-hidden">
           {/* Top Ornament */}
           <div className="w-16 h-16 border border-emperor-gold/50 rounded-full flex items-center justify-center animate-pulse-slow">
              <div className="w-10 h-10 border border-emperor-gold/30 rotate-45"></div>
           </div>
           
           {/* Central Core */}
           <div className="w-48 h-64 bg-black/50 border border-emperor-gold/20 rounded relative overflow-hidden group">
              <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
              
              {/* Data Streams */}
              <div className="absolute top-0 left-1/4 w-[1px] h-full bg-gradient-to-b from-transparent via-emperor-gold/50 to-transparent animate-slide-down" style={{ animationDuration: '3s' }}></div>
              <div className="absolute top-0 left-2/4 w-[1px] h-full bg-gradient-to-b from-transparent via-red-900/50 to-transparent animate-slide-down" style={{ animationDuration: '4s', animationDelay: '1s' }}></div>
              <div className="absolute top-0 left-3/4 w-[1px] h-full bg-gradient-to-b from-transparent via-emperor-gold/50 to-transparent animate-slide-down" style={{ animationDuration: '2.5s', animationDelay: '0.5s' }}></div>
              
              {/* Core Light */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 bg-red-900/20 rounded-full blur-xl animate-pulse"></div>
           </div>

           {/* Bottom Vent */}
           <div className="w-full px-8 space-y-2">
              <div className="h-1 w-full bg-gray-800 rounded overflow-hidden">
                <div className="h-full w-1/3 bg-emperor-gold animate-progress"></div>
              </div>
              <div className="flex justify-between text-[10px] text-emperor-gold/50 font-mono">
                 <span>SYS.OK</span>
                 <span>TEMP.ERR</span>
              </div>
           </div>
        </div>

        {/* Side Face (Left) - for 3D effect */}
        <div className="absolute inset-y-0 -left-4 w-4 bg-[#0f0f0f] border-l border-t border-b border-emperor-gold/20 origin-right transform -rotate-y-90 translate-x-full"></div>
        
        {/* Side Face (Right) - for 3D effect */}
        <div className="absolute inset-y-0 -right-4 w-4 bg-[#0f0f0f] border-r border-t border-b border-emperor-gold/20 origin-left transform rotate-y-90 -translate-x-full"></div>

        {/* Back Glow */}
        <div className="absolute inset-0 bg-emperor-gold/5 blur-3xl -z-10 translate-z-[-50px]"></div>
      </motion.div>
      
      {/* Floor Reflection */}
      <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 w-48 h-12 bg-emperor-gold/10 blur-xl rounded-[100%]"></div>
    </div>
  );
};

export default CyberSarcophagus;

