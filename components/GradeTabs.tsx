import React from 'react';
import { motion } from 'framer-motion';
import { GradeLevel } from '../types';

interface Props {
  selectedGrade: GradeLevel;
  onSelect: (grade: GradeLevel) => void;
}

const GradeTabs: React.FC<Props> = ({ selectedGrade, onSelect }) => {
  const grades = [GradeLevel.Six, GradeLevel.Seven, GradeLevel.Eight];
  
  return (
    <div className="flex flex-col md:flex-row justify-center gap-4 mb-12">
      {grades.map((grade) => {
        const isActive = selectedGrade === grade;
        const displayTitle = grade.split('：')[0];
        const subTitle = grade.split('：')[1].split('(')[0];
        
        return (
          <button
            key={grade}
            onClick={() => onSelect(grade)}
            className={`
              relative px-8 py-4 rounded-xl border transition-all duration-300 overflow-hidden group
              ${isActive 
                ? 'bg-[#1a1a1a] border-emperor-gold text-emperor-gold shadow-[0_0_20px_rgba(212,175,55,0.15)]' 
                : 'bg-[#0f0f0f] border-gray-800 text-gray-500 hover:border-gray-600 hover:text-gray-300'
              }
            `}
          >
            {isActive && (
              <motion.div
                layoutId="activeTabBackground"
                className="absolute inset-0 bg-[#1a1a1a]"
                initial={false}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
              />
            )}
            
            {isActive && (
               <div className="absolute inset-0 bg-emperor-gold/5 animate-pulse-slow pointer-events-none"></div>
            )}

            <div className="relative z-10 flex flex-col items-center">
                <span className={`text-xs font-mono uppercase tracking-[0.2em] mb-1 ${isActive ? 'text-emperor-gold' : 'text-gray-600'}`}>
                    Level
                </span>
                <span className="text-2xl font-serif font-bold whitespace-nowrap">
                    {displayTitle}
                </span>
                <span className={`text-xs mt-1 ${isActive ? 'text-white/80' : 'text-gray-600'}`}>
                    {subTitle}
                </span>
            </div>
          </button>
        );
      })}
    </div>
  );
};

export default GradeTabs;
