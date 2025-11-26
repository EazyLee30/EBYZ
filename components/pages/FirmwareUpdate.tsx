import React from 'react';
import { ArrowLeft, Download, Cpu, Wifi, RefreshCw } from 'lucide-react';

interface Props {
  onBack: () => void;
}

const FirmwareUpdate: React.FC<Props> = ({ onBack }) => {
  return (
    <div className="fixed inset-0 z-[6000] overflow-y-auto bg-[#050505] text-white p-4 md:p-8">
       {/* Background Pattern */}
       <div className="fixed inset-0 pointer-events-none opacity-20" 
           style={{
             backgroundImage: 'radial-gradient(#333 1px, transparent 1px)', 
             backgroundSize: '40px 40px'
           }}>
      </div>

      <div className="max-w-4xl mx-auto relative z-10 pt-12">
        <div className="mb-12">
            <button 
                onClick={onBack}
                className="p-2 rounded-full bg-white/5 hover:bg-white/10 hover:text-emperor-gold transition-colors flex items-center gap-2 px-4 mb-6"
            >
                <ArrowLeft size={18} />
                <span className="text-sm font-bold">返回</span>
            </button>
            <h1 className="text-4xl font-serif font-bold text-white mb-4 flex items-center gap-3">
                <RefreshCw className="text-emperor-gold" size={36} />
                固件更新 (Firmware Update)
            </h1>
            <p className="text-gray-500 font-mono text-sm uppercase tracking-widest">
                SYSTEM STATUS: STABLE
            </p>
        </div>

        <div className="space-y-8">
            {/* Latest Version */}
            <div className="bg-[#0a0a0a] border border-emperor-gold/30 rounded-xl p-8 relative overflow-hidden">
                <div className="absolute top-0 right-0 bg-emperor-gold text-black text-xs font-bold px-3 py-1 rounded-bl-xl">
                    LATEST RELEASE
                </div>
                
                <div className="flex items-start gap-6">
                    <div className="p-4 bg-emperor-gold/10 rounded-full text-emperor-gold">
                        <Cpu size={32} />
                    </div>
                    <div>
                        <h2 className="text-2xl font-bold text-white mb-2">QinOS v2.2.1 (Terra Cotta Edition)</h2>
                        <p className="text-gray-400 text-sm mb-6">发布日期: 2025-11-26</p>
                        
                        <div className="space-y-2 mb-8">
                            <h3 className="text-sm font-bold text-gray-300 uppercase">更新日志 (Changelog):</h3>
                            <ul className="list-disc ml-5 text-gray-400 text-sm space-y-1">
                                <li>[Feature] 新增“赛博守灵”模式，支持 Home Assistant 自动调节墓室氛围灯。</li>
                                <li>[Fix] 修复了 Zigbee 传感器在阴雨天误报“有人闯入”的 Bug。</li>
                                <li>[Optimization] 优化了 MQTT 协议在跨界传输时的延迟问题。</li>
                                <li>[Security] 增强了防盗墓防火墙 (Anti-Tomb-Raider Firewall)。</li>
                            </ul>
                        </div>

                        <button 
                            onClick={() => alert('下载请求已发送至冥府服务器，请耐心等待（预计耗时：3000年）。')}
                            className="px-6 py-3 bg-emperor-gold hover:bg-yellow-500 text-black font-bold rounded-lg transition-all flex items-center gap-2 shadow-lg shadow-emperor-gold/20"
                        >
                            <Download size={18} />
                            下载固件 (Bin)
                        </button>
                    </div>
                </div>
            </div>

            {/* Historical Versions */}
            <div className="space-y-4">
                <h3 className="text-xl font-bold text-white mb-4">历史版本 (History)</h3>
                
                <div className="bg-[#0f0f0f] border border-white/5 rounded-xl p-4 flex items-center justify-between opacity-60 hover:opacity-100 transition-opacity">
                    <div className="flex items-center gap-4">
                        <Wifi className="text-gray-500" size={20} />
                        <div>
                            <div className="font-bold text-gray-300">QinOS v1.0.0 (Initial Burial)</div>
                            <div className="text-xs text-gray-600">2024-01-01</div>
                        </div>
                    </div>
                    <button className="text-xs text-gray-500 hover:text-white underline">查看详情</button>
                </div>

                <div className="bg-[#0f0f0f] border border-white/5 rounded-xl p-4 flex items-center justify-between opacity-60 hover:opacity-100 transition-opacity">
                    <div className="flex items-center gap-4">
                        <Wifi className="text-gray-500" size={20} />
                        <div>
                            <div className="font-bold text-gray-300">QinOS Beta 0.9 (Clay Model)</div>
                            <div className="text-xs text-gray-600">2023-10-15</div>
                        </div>
                    </div>
                    <button className="text-xs text-gray-500 hover:text-white underline">查看详情</button>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default FirmwareUpdate;
