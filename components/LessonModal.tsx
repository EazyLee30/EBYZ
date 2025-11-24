
import React from 'react';
import { X, BookOpen, AlertTriangle, Skull } from 'lucide-react';
import { Lesson } from '../types';

interface Props {
  lesson: Lesson;
  onClose: () => void;
}

const LessonModal: React.FC<Props> = ({ lesson, onClose }) => {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn" onClick={onClose}>
      <div 
        className="bg-[#1e1e1e] border-2 border-emperor-gold rounded-xl w-full max-w-2xl max-h-[80vh] overflow-y-auto shadow-2xl relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 bg-[#252010] p-6 border-b border-gray-700 flex justify-between items-start z-10">
          <div>
            <div className="flex items-center gap-2 text-emperor-gold mb-1">
               <Skull size={18} />
               <span className="text-xs font-bold tracking-widest uppercase">智能棺材核心课程</span>
            </div>
            <h2 className="text-2xl font-bold text-white">{lesson.coffinTitle}</h2>
            <p className="text-gray-400 text-sm mt-1 font-mono">原课题：{lesson.originalTitle}</p>
          </div>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-white transition-colors p-1 bg-gray-800 rounded-full"
          >
            <X size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          
          <div className="bg-[#111] p-4 rounded-lg border border-gray-800">
            <h3 className="text-jade-green font-bold mb-2 flex items-center gap-2">
              <BookOpen size={18} />
              <span>课程场景描述</span>
            </h3>
            <p className="text-gray-300 leading-relaxed">
              {lesson.description}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-[#222] p-4 rounded-lg border-l-4 border-blue-500">
              <h4 className="text-white font-bold text-sm mb-2">教学目标 (阳间)</h4>
              <ul className="list-disc list-inside text-gray-400 text-sm space-y-1">
                <li>掌握该章节核心技术原理</li>
                <li>培养计算思维与逻辑能力</li>
                <li>理解信息系统的输入输出</li>
              </ul>
            </div>
            <div className="bg-[#222] p-4 rounded-lg border-l-4 border-emperor-gold">
              <h4 className="text-white font-bold text-sm mb-2">实战目标 (阴间)</h4>
              <ul className="list-disc list-inside text-gray-400 text-sm space-y-1">
                <li>确保陵墓系统千年不宕机</li>
                <li>防止赛博摸金校尉入侵</li>
                <li>实现跨界（阴阳）即时通讯</li>
              </ul>
            </div>
          </div>

          <div className="bg-red-900/20 border border-red-900/50 p-4 rounded-lg flex gap-3 items-start">
             <AlertTriangle className="text-red-500 shrink-0 mt-1" size={20} />
             <div>
               <h4 className="text-red-400 font-bold text-sm">安全警示</h4>
               <p className="text-red-200/70 text-sm mt-1">
                 在调试本课程涉及的硬件（如继电器、电机）时，请务必断电操作。
                 若涉及生物识别（人脸/指纹），请确保使用的是活体样本，勿使用先人遗体进行测试，以免引发伦理争议或灵异现象。
               </p>
             </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-6 border-t border-gray-700 bg-[#1a1a1a] flex justify-end gap-3">
          <button onClick={onClose} className="px-4 py-2 text-sm text-gray-400 hover:text-white transition-colors">
            关闭卷宗
          </button>
          <button className="px-6 py-2 bg-emperor-gold text-black font-bold rounded hover:bg-yellow-500 transition-colors shadow-lg">
            开始备课
          </button>
        </div>
      </div>
    </div>
  );
};

export default LessonModal;
