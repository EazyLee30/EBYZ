import React, { useState } from 'react';
import { CurriculumModule, Lesson } from '../types';
import { Cpu, Network, Activity, ChevronDown, BookOpen, Scroll, ArrowRight } from 'lucide-react';

interface Props {
  module: CurriculumModule;
  onLessonClick: (lesson: Lesson) => void;
}

const CurriculumCard: React.FC<Props> = ({ module, onLessonClick }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [expandedUnit, setExpandedUnit] = useState<string | null>(null);

  const getIcon = () => {
    if (module.id.includes('g6')) return <Cpu className="text-jade-green" size={24} />;
    if (module.id.includes('g7')) return <Network className="text-blue-400" size={24} />;
    return <Activity className="text-red-500" size={24} />;
  };

  const toggleUnit = (unitId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setExpandedUnit(expandedUnit === unitId ? null : unitId);
  };

  return (
    <div 
        className={`relative overflow-hidden rounded-xl bg-[#121212] border border-gray-800 p-6 shadow-xl transition-all duration-500 hover:-translate-y-1 ${isExpanded ? 'row-span-2 ring-1 ring-emperor-gold/30 bg-[#161616]' : ''}`}
    >
      <div className="flex justify-between items-start mb-6 cursor-pointer select-none" onClick={() => setIsExpanded(!isExpanded)}>
        <div className="flex items-center space-x-4">
          <div className="p-3 bg-white/5 rounded-xl border border-white/5 backdrop-blur-sm shadow-inner">
            {getIcon()}
          </div>
          <div>
            <span className="text-[10px] font-bold text-gray-500 uppercase tracking-[0.2em]">{module.grade.split('：')[0]}</span>
            <h3 className="text-lg font-bold text-white mt-1 leading-tight">{module.title.split('：')[1]}</h3>
          </div>
        </div>
        <button className={`text-gray-500 transition-transform duration-300 ${isExpanded ? 'rotate-180 text-emperor-gold' : ''}`}>
          <ChevronDown size={20} />
        </button>
      </div>
      
      <div className="mb-6">
        <p className="text-emperor-gold/80 text-sm font-serif italic border-l-2 border-emperor-gold/30 pl-3 py-1 bg-gradient-to-r from-emperor-gold/5 to-transparent rounded-r">
          "{module.metaphor}"
        </p>
      </div>

      <div className="space-y-4">
        {!isExpanded && (
            <div className="text-sm text-gray-400 line-clamp-3 leading-relaxed">
                {module.scenario}
            </div>
        )}

        {isExpanded && (
            <div className="animate-fade-in">
                 <h4 className="text-gray-500 text-xs uppercase font-bold mb-3 tracking-wider">技术架构</h4>
                 <div className="flex flex-wrap gap-2 mb-6">
                    {module.techStack.map((tech, idx) => (
                    <span key={idx} className="px-2 py-1 bg-white/5 text-gray-300 text-xs rounded border border-gray-800 backdrop-blur-md">
                        {tech}
                    </span>
                    ))}
                </div>

                <div className="border-t border-gray-800 pt-4">
                    <h4 className="text-white text-sm font-bold mb-4 flex items-center gap-2">
                    <Scroll size={16} className="text-emperor-gold" />
                    <span>课程大纲目录</span>
                    </h4>
                    <div className="space-y-3">
                    {module.units.map((unit) => (
                        <div key={unit.id} className="border border-gray-800 rounded-lg bg-[#0a0a0a]/50 overflow-hidden group/unit transition-colors hover:border-gray-700">
                        <div 
                            className="p-3 flex justify-between items-center cursor-pointer select-none"
                            onClick={(e) => toggleUnit(unit.id, e)}
                        >
                            <h5 className="text-sm font-medium text-gray-300 group-hover/unit:text-white transition-colors">
                                {unit.title.split(' ')[0]}
                            </h5>
                            <ChevronDown size={14} className={`text-gray-600 transition-transform duration-300 ${expandedUnit === unit.id ? 'rotate-180' : ''}`} />
                        </div>
                        
                        {expandedUnit === unit.id && (
                            <div className="bg-[#111] p-1 border-t border-gray-800 animate-slide-up">
                            {unit.lessons.map((lesson) => (
                                <button
                                    key={lesson.id} 
                                    onClick={() => onLessonClick(lesson)}
                                    className="w-full text-left p-3 rounded hover:bg-white/5 group/lesson transition-all flex items-center justify-between"
                                >
                                <div className="flex flex-col gap-1">
                                    <span className="text-sm text-gray-200 font-medium group-hover/lesson:text-emperor-gold transition-colors">
                                        {lesson.coffinTitle}
                                    </span>
                                    <span className="text-[10px] text-gray-600">
                                        {lesson.originalTitle}
                                    </span>
                                </div>
                                <ArrowRight size={14} className="text-gray-700 group-hover/lesson:text-emperor-gold opacity-0 group-hover/lesson:opacity-100 -translate-x-2 group-hover/lesson:translate-x-0 transition-all" />
                                </button>
                            ))}
                            </div>
                        )}
                        </div>
                    ))}
                    </div>
                </div>
            </div>
        )}

        {!isExpanded && (
             <div className="pt-2">
                <button 
                    onClick={(e) => { e.stopPropagation(); setIsExpanded(true); }}
                    className="w-full py-2 text-center text-xs font-bold text-gray-500 hover:text-white border border-dashed border-gray-700 hover:border-gray-500 rounded transition-all flex items-center justify-center gap-2 group"
                >
                    <BookOpen size={14} className="group-hover:scale-110 transition-transform"/>
                    展开详细课表
                </button>
             </div>
        )}
      </div>
    </div>
  );
};

export default CurriculumCard;