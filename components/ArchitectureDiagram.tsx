import React, { forwardRef } from 'react';
import { motion } from 'framer-motion';
import { Database, Server, Smartphone, Cloud, Radio, Cpu, Lock, ShieldCheck } from 'lucide-react';

const ArchitectureDiagram = forwardRef<HTMLDivElement>((props, ref) => {
  return (
    <div ref={ref} className="relative w-full max-w-5xl mx-auto p-4 md:p-12 overflow-hidden perspective-1000">
      
      {/* 3D Container */}
      <motion.div 
        initial={{ rotateX: 10, opacity: 0 }}
        whileInView={{ rotateX: 0, opacity: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="relative z-10 grid gap-16"
        style={{ transformStyle: 'preserve-3d' }}
      >
        
        {/* Layer 1: User / Physical Layer */}
        <div className="relative flex justify-center gap-12 z-30">
            <Node icon={Smartphone} label="生者终端" sub="App / H5" color="text-blue-400" />
            <Node icon={Radio} label="祭祀传感器" sub="Zigbee / LoRa" color="text-yellow-400" />
            <Node icon={Cpu} label="嵌入式墓碑" sub="ESP32 / RISC-V" color="text-green-400" />
        </div>

        {/* Animated Data Streams (SVG) */}
        <div className="absolute inset-0 pointer-events-none z-0">
             <DataStream x1="30%" y1="12%" x2="50%" y2="45%" delay={0} />
             <DataStream x1="50%" y1="12%" x2="50%" y2="45%" delay={1} />
             <DataStream x1="70%" y1="12%" x2="50%" y2="45%" delay={2} />
        </div>

        {/* Layer 2: Edge / Gateway Layer (The Core) */}
        <div className="relative flex justify-center z-20">
            <div className="relative p-1 bg-gradient-to-b from-emperor-gold/50 to-transparent rounded-2xl backdrop-blur-xl">
                 <div className="absolute inset-0 bg-emperor-gold/20 blur-3xl rounded-full animate-pulse-slow"></div>
                 <motion.div 
                    whileHover={{ scale: 1.05 }}
                    className="relative bg-[#0a0a0a] border border-emperor-gold/50 rounded-xl p-8 w-64 text-center shadow-[0_0_50px_rgba(212,175,55,0.15)]"
                 >
                    <Server size={48} className="mx-auto text-emperor-gold mb-4 animate-float" />
                    <h3 className="text-xl font-bold text-white mb-2">OpenWrt Gateway</h3>
                    <p className="text-xs text-gray-400">本地雾计算节点</p>
                    <p className="text-[10px] text-gray-600 mt-1 font-mono">MQTT Broker / Nginx</p>
                    
                    {/* Status Lights */}
                    <div className="flex justify-center gap-2 mt-4">
                        <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-ping"></span>
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-ping delay-75"></span>
                        <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-ping delay-150"></span>
                    </div>
                 </motion.div>
            </div>
        </div>

        {/* Animated Data Streams (Down) */}
        <div className="absolute inset-0 pointer-events-none z-0">
             <DataStream x1="50%" y1="55%" x2="30%" y2="85%" delay={1.5} reverse />
             <DataStream x1="50%" y1="55%" x2="70%" y2="85%" delay={2.5} reverse />
        </div>

        {/* Layer 3: Cloud / Afterlife Layer */}
        <div className="relative flex justify-center gap-24 z-10">
            <Node icon={Cloud} label="冥府私有云" sub="Docker K8s" color="text-purple-400" />
            <Node icon={Database} label="灵魂数据库" sub="PostgreSQL" color="text-pink-400" />
            <Node icon={ShieldCheck} label="因果防火墙" sub="AI Audit" color="text-red-400" />
        </div>

      </motion.div>

      {/* Background Decor */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-[radial-gradient(circle_at_center,_rgba(212,175,55,0.05)_0%,_transparent_70%)] pointer-events-none"></div>
    </div>
  );
});

ArchitectureDiagram.displayName = 'ArchitectureDiagram';

// Subcomponents

const Node = ({ icon: Icon, label, sub, color }: { icon: any, label: string, sub: string, color: string }) => (
    <motion.div 
        whileHover={{ y: -5 }}
        className="flex flex-col items-center p-4 rounded-xl bg-[#111] border border-white/5 backdrop-blur-sm min-w-[120px]"
    >
        <div className={`p-3 rounded-full bg-white/5 mb-3 ${color} border border-white/5 shadow-inner`}>
            <Icon size={24} />
        </div>
        <h4 className="text-sm font-bold text-gray-200">{label}</h4>
        <span className="text-[10px] text-gray-600 font-mono mt-1">{sub}</span>
    </motion.div>
);

const DataStream = ({ x1, y1, x2, y2, delay = 0, reverse = false }: { x1: string, y1: string, x2: string, y2: string, delay?: number, reverse?: boolean }) => {
    // Generate a unique ID for the gradient
    const gradientId = `gradient-${Math.random().toString(36).substr(2, 9)}`;
    
    return (
        <svg className="absolute inset-0 w-full h-full overflow-visible">
            <defs>
                <linearGradient id={gradientId} gradientUnits="userSpaceOnUse">
                    <stop offset="0%" stopColor="transparent" />
                    <stop offset="50%" stopColor={reverse ? "#8b5cf6" : "#D4AF37"} /> {/* Gold or Purple */}
                    <stop offset="100%" stopColor="transparent" />
                </linearGradient>
            </defs>
            {/* Base Path */}
            <path 
                d={`M ${x1} ${y1} C ${x1} ${parseInt(y1) + 20}%, ${x2} ${parseInt(y2) - 20}%, ${x2} ${y2}`}
                fill="none"
                stroke="rgba(255,255,255,0.05)"
                strokeWidth="1"
                strokeDasharray="5 5"
            />
            {/* Animated Packet */}
            <motion.circle 
                r="3" 
                fill={reverse ? "#a78bfa" : "#FCD34D"}
                initial={{ offsetDistance: "0%" }}
                animate={{ offsetDistance: "100%" }}
                transition={{ 
                    duration: 3, 
                    repeat: Infinity, 
                    delay: delay,
                    ease: "linear"
                }}
                style={{ 
                    offsetPath: `path("M ${x1} ${y1} C ${x1} ${parseInt(y1) + 20}%, ${x2} ${parseInt(y2) - 20}%, ${x2} ${y2}")`
                } as any} 
            >
                <animate 
                    attributeName="opacity" 
                    values="0;1;0" 
                    dur="3s" 
                    repeatCount="indefinite"
                    begin={`${delay}s`}
                />
            </motion.circle>
        </svg>
    );
};

export default ArchitectureDiagram;
