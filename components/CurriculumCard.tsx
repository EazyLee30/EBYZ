import React, { useState } from 'react';
import { CurriculumModule, Lesson } from '../types';
import { Cpu, Network, Activity, ChevronDown, BookOpen, Scroll, ArrowUpRight, ImageOff } from 'lucide-react';
import SpotlightCard from './ui/SpotlightCard';
import { motion } from 'framer-motion';

interface UnitProps {
    unit: CurriculumModule['units'][0];
    module: CurriculumModule;
    onLessonClick: (lesson: Lesson) => void;
}

const UnitItem: React.FC<UnitProps> = ({ unit, module, onLessonClick }) => {
    const [imgError, setImgError] = useState(false);

    return (
        <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10% 0px" }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-24 relative group"
        >
            {/* Left Column: Image & Info */}
            <div className="lg:col-span-1 space-y-6">
                <div className="aspect-video w-full rounded-lg overflow-hidden border border-white/10 bg-[#111] relative shadow-2xl shadow-black/50 group-hover:border-emperor-gold/30 transition-colors duration-500">
                    {!imgError ? (
                         <img 
                            src={unit.imageUrl} 
                            alt={unit.title}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-80 group-hover:opacity-100"
                            onError={() => setImgError(true)}
                        />
                    ) : (
                        <div className="w-full h-full bg-neutral-900 flex flex-col items-center justify-center p-4 text-center">
                            <div className="w-12 h-12 rounded-full bg-emperor-gold/10 flex items-center justify-center mb-3">
                                <ImageOff className="text-emperor-gold/50" size={24} />
                            </div>
                            <span className="text-xs text-gray-600 font-mono uppercase tracking-widest">Image Unavailable</span>
                        </div>
                    )}
                   
                    {/* Overlay Gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent pointer-events-none"></div>
                    <div className="absolute bottom-4 left-4 right-4 pointer-events-none">
                        <h5 className="text-white text-lg font-bold font-serif leading-tight drop-shadow-md border-l-2 border-emperor-gold pl-3">
                            {unit.title}
                        </h5>
                    </div>
                </div>

                <div className="pt-2 border-t border-white/5">
                    <h4 className="text-xs font-mono text-gray-500 uppercase mb-3 flex items-center gap-2 tracking-widest">
                        <span className="w-1 h-1 bg-gray-500 rounded-full"></span>
                        Tech Stack
                    </h4>
                    <div className="flex flex-wrap gap-2">
                        {module.techStack.map((tech, idx) => (
                        <span key={idx} className="px-3 py-1 text-xs bg-[#111] text-gray-400 border border-white/10 rounded hover:border-emperor-gold/30 hover:text-white transition-colors cursor-default">
                            {tech}
                        </span>
                        ))}
                    </div>
                </div>
            </div>

            {/* Right Column: Lessons List */}
            <div className="lg:col-span-2 relative lg:pl-8">
                {/* Connector Line */}
                <div className="absolute left-0 top-0 bottom-0 w-[1px] bg-gradient-to-b from-white/10 via-emperor-gold/20 to-white/5 hidden lg:block opacity-30"></div>

                {/* Unit Title Header */}
                 <div className="mb-6">
                    <h3 className="text-2xl font-serif font-bold text-white mb-2">
                        {unit.title}
                    </h3>
                    <div className="h-1 w-12 bg-emperor-gold rounded-full opacity-50"></div>
                </div>

                <div className="space-y-3">
                     {unit.lessons.map((lesson, idx) => (
                        <motion.button
                            key={lesson.id} 
                            onClick={() => onLessonClick(lesson)}
                            whileHover={{ x: 4, backgroundColor: "rgba(255, 255, 255, 0.08)" }}
                            className="w-full text-left p-4 rounded-lg bg-white/5 border border-white/5 hover:border-emperor-gold/30 transition-all duration-300 flex items-center justify-between gap-4 group/lesson"
                        >
                            <div className="flex items-center gap-4 min-w-0">
                                <span className="text-xs font-mono text-emperor-gold/50 font-bold group-hover/lesson:text-emperor-gold transition-colors">
                                    {String(idx + 1).padStart(2, '0')}
                                </span>
                                <div className="flex flex-col gap-1">
                                    <span className="text-sm font-bold text-gray-200 group-hover/lesson:text-white transition-colors">
                                        {lesson.coffinTitle}
                                    </span>
                                    <span className="text-xs text-gray-500 line-clamp-1 group-hover/lesson:text-gray-400 font-light">
                                        {lesson.description}
                                    </span>
                                </div>
                            </div>
                            <ArrowUpRight size={14} className="text-gray-600 group-hover/lesson:text-emperor-gold transition-colors opacity-0 group-hover/lesson:opacity-100" />
                        </motion.button>
                    ))}
                </div>
            </div>
        </motion.div>
    );
};

interface Props {
  module: CurriculumModule;
  onLessonClick: (lesson: Lesson) => void;
  defaultExpanded?: boolean;
}

const CurriculumCard: React.FC<Props> = ({ module, onLessonClick, defaultExpanded = false }) => {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);

  const getIcon = () => {
    if (module.id.includes('g6')) return <Cpu className="text-jade-green" size={32} />;
    if (module.id.includes('g7')) return <Network className="text-blue-400" size={32} />;
    return <Activity className="text-red-500" size={32} />;
  };

  return (
    <SpotlightCard 
        className={`transition-all duration-700 bg-[#080808] border border-white/5 ${isExpanded ? 'bg-[#0a0a0a]' : 'hover:-translate-y-1'}`}
        spotlightColor="rgba(212, 175, 55, 0.08)"
    >
      <div className="p-8 md:p-10">
        <div className="flex justify-between items-start mb-12 cursor-pointer select-none" onClick={() => setIsExpanded(!isExpanded)}>
            <div className="flex items-center gap-6">
                <div className="relative">
                    <div className="absolute inset-0 bg-emperor-gold/20 blur-xl rounded-full animate-pulse-slow"></div>
                    <div className="relative p-4 bg-[#111] rounded-2xl border border-white/10 shadow-2xl">
                        {getIcon()}
                    </div>
                </div>
                <div>
                    <div className="flex items-center gap-3 mb-1">
                        <span className="px-2 py-0.5 text-[10px] font-bold bg-white/5 text-gray-400 rounded border border-white/5 uppercase tracking-[0.2em]">
                            Grade {module.grade.includes('六') ? '06' : module.grade.includes('七') ? '07' : '08'}
                        </span>
                    </div>
                    <h3 className="text-3xl md:text-4xl font-serif font-bold text-white leading-none tracking-tight">
                        {module.title.split('：')[1]}
                    </h3>
                </div>
            </div>
            {!defaultExpanded && (
                <button className={`text-gray-500 transition-transform duration-500 ${isExpanded ? 'rotate-180 text-emperor-gold' : ''}`}>
                <ChevronDown size={24} />
                </button>
            )}
        </div>
      
        <div className="mb-10 pl-4 border-l-2 border-emperor-gold/30">
            <p className="text-emperor-gold/80 text-xl font-serif italic">
            "{module.metaphor}"
            </p>
        </div>

        <div className="space-y-10">
            {!isExpanded && (
                <div className="text-base text-gray-400 leading-relaxed max-w-2xl animate-fade-in">
                    {module.scenario}
                </div>
            )}

            {isExpanded && (
                <div className="animate-fade-in">
                    {/* Header Info */}
                    <div className="mb-16 border-b border-white/5 pb-12">
                         <h4 className="text-xs font-mono text-gray-500 uppercase mb-4 flex items-center gap-2 tracking-widest">
                            <span className="w-1 h-1 bg-gray-500 rounded-full"></span>
                            Scenario Context
                        </h4>
                        <p className="text-gray-300 text-lg leading-relaxed font-light max-w-3xl">
                            {module.scenario}
                        </p>
                    </div>

                    {/* Sequence Header */}
                    <h4 className="text-white text-xs font-bold mb-12 flex items-center gap-2 uppercase tracking-widest opacity-50">
                        <Scroll size={14} />
                        Modules sequence
                    </h4>

                    {/* Units List - Standard Row Layout */}
                    <div>
                        {module.units.map((unit) => (
                            <UnitItem 
                                key={unit.id} 
                                unit={unit} 
                                module={module}
                                onLessonClick={onLessonClick}
                            />
                        ))}
                    </div>
                </div>
            )}

            {!isExpanded && (
                <div className="pt-4">
                    <button 
                        onClick={(e) => { e.stopPropagation(); setIsExpanded(true); }}
                        className="w-full py-4 text-center text-xs font-bold text-gray-500 hover:text-white border border-dashed border-gray-800 hover:border-emperor-gold/50 hover:bg-emperor-gold/5 rounded-xl transition-all flex items-center justify-center gap-2 group uppercase tracking-widest"
                    >
                        <BookOpen size={16} className="group-hover:scale-110 transition-transform"/>
                        Access Full Curriculum
                    </button>
                </div>
            )}
        </div>
      </div>
    </SpotlightCard>
  );
};

export default CurriculumCard;
