
import React, { forwardRef } from 'react';
import { Server, Wifi, Smartphone, Database, Lock } from 'lucide-react';
import { techStackData } from '../data';

const ArchitectureDiagram = forwardRef<HTMLDivElement>((props, ref) => {
  return (
    <div ref={ref} className="py-12 bg-[#151515]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-2xl font-bold text-white mb-2">地下宫殿拓扑图 (Tomb Blueprint)</h2>
          <p className="text-gray-500 text-sm">基于OpenWrt与Home Assistant的本地化私有云架构</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Perception Layer */}
          <div className="border border-gray-700 rounded-xl p-6 relative bg-[#1a1a1a]">
            <div className="absolute -top-3 left-4 bg-blue-900 text-blue-200 text-xs px-2 py-1 rounded">感知层 (Perception)</div>
            <div className="space-y-4 mt-2">
              <div className="flex items-center gap-3 text-gray-300 p-3 bg-gray-800 rounded-lg border border-gray-700">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                <span>Zigbee 温湿度传感器 (尸身保鲜)</span>
              </div>
              <div className="flex items-center gap-3 text-gray-300 p-3 bg-gray-800 rounded-lg border border-gray-700">
                <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></div>
                <span>红外人体传感器 (防盗墓入侵)</span>
              </div>
              <div className="flex items-center gap-3 text-gray-300 p-3 bg-gray-800 rounded-lg border border-gray-700">
                <div className="w-2 h-2 rounded-full bg-yellow-500 animate-pulse"></div>
                <span>继电器执行器 (控制棺盖/空调)</span>
              </div>
            </div>
          </div>

          {/* Network/Processing Layer */}
          <div className="border border-emperor-gold rounded-xl p-6 relative bg-[#252010]">
            <div className="absolute -top-3 left-4 bg-emperor-gold text-black font-bold text-xs px-2 py-1 rounded">核心层 (Core)</div>
            <div className="flex flex-col gap-4 mt-2">
               <div className="flex items-center justify-between p-4 bg-gray-800 rounded-lg border border-gray-600">
                  <div className="flex items-center gap-3">
                    <Server className="text-emperor-gold" />
                    <div>
                      <div className="text-white font-bold">OpenWrt Gateway</div>
                      <div className="text-xs text-gray-400">软路由网关</div>
                    </div>
                  </div>
                  <div className="text-xs bg-black text-emperor-gold px-2 py-1 rounded">主脑</div>
               </div>

               <div className="flex justify-center">
                  <div className="h-8 w-0.5 bg-gray-600"></div>
               </div>

               <div className="flex items-center justify-between p-4 bg-blue-900/20 rounded-lg border border-blue-800">
                  <div className="flex items-center gap-3">
                    <Database className="text-blue-400" />
                    <div>
                      <div className="text-white font-bold">Home Assistant</div>
                      <div className="text-xs text-gray-400">MQTT Broker + 自动化逻辑</div>
                    </div>
                  </div>
                  <div className="text-xs bg-blue-900 text-blue-200 px-2 py-1 rounded">中枢</div>
               </div>
            </div>
          </div>

          {/* Application Layer */}
          <div className="border border-gray-700 rounded-xl p-6 relative bg-[#1a1a1a]">
            <div className="absolute -top-3 left-4 bg-green-900 text-green-200 text-xs px-2 py-1 rounded">应用层 (Application)</div>
            <div className="space-y-4 mt-2">
               <div className="flex items-center gap-3 p-3 bg-gray-800 rounded-lg border border-gray-700">
                  <Smartphone className="text-white" />
                  <div className="text-gray-300">
                    <div className="font-bold">Apple HomeKit</div>
                    <div className="text-xs text-gray-500">后代语音控制 ("Hey Siri")</div>
                  </div>
               </div>
               <div className="flex items-center gap-3 p-3 bg-gray-800 rounded-lg border border-gray-700">
                  <Lock className="text-red-400" />
                  <div className="text-gray-300">
                    <div className="font-bold">米家 (Mi Home)</div>
                    <div className="text-xs text-gray-500">远程报警与监控</div>
                  </div>
               </div>
            </div>
          </div>
        </div>

        {/* Protocols Legend */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {techStackData.map((tech, idx) => (
            <div key={idx} className="bg-[#222] p-4 rounded-lg border border-gray-800">
              <h4 className="text-emperor-gold font-bold text-sm mb-1">{tech.name}</h4>
              <p className="text-gray-400 text-xs">{tech.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
});

ArchitectureDiagram.displayName = 'ArchitectureDiagram';

export default ArchitectureDiagram;
