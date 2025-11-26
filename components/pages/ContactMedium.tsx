import React from 'react';
import { ArrowLeft, Mail, MessageSquare, Skull } from 'lucide-react';

interface Props {
  onBack: () => void;
}

const ContactMedium: React.FC<Props> = ({ onBack }) => {
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
                <Skull className="text-emperor-gold" size={36} />
                联系灵媒 (Contact Medium)
            </h1>
            <p className="text-gray-500 font-mono text-sm uppercase tracking-widest">
                CHANNEL: OPEN
            </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Contact Form */}
            <div className="bg-[#0a0a0a] border border-white/10 rounded-xl p-8">
                <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                    <Mail className="text-jade-green" size={20} />
                    发送通灵讯息
                </h2>
                <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); alert('讯息已烧录！'); }}>
                    <div>
                        <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">
                            您的称呼 (Name)
                        </label>
                        <input 
                            type="text" 
                            className="w-full bg-[#151515] border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-emperor-gold transition-colors"
                            placeholder="无名氏"
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">
                            联系方式 (Email/WeChat)
                        </label>
                        <input 
                            type="text" 
                            className="w-full bg-[#151515] border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-emperor-gold transition-colors"
                            placeholder="name@example.com"
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">
                            讯息内容 (Message)
                        </label>
                        <textarea 
                            className="w-full bg-[#151515] border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-emperor-gold transition-colors min-h-[150px]"
                            placeholder="请在此写下您的遗愿或Bug反馈..."
                        />
                    </div>
                    <button 
                        type="submit"
                        className="w-full bg-white/5 hover:bg-white/10 text-white font-bold py-3 rounded-lg border border-white/10 hover:border-emperor-gold transition-colors"
                    >
                        发送讯息
                    </button>
                </form>
            </div>

            {/* Info Card */}
            <div className="space-y-6">
                <div className="bg-gradient-to-br from-emperor-gold/10 to-transparent border border-emperor-gold/20 rounded-xl p-8">
                    <h3 className="text-lg font-bold text-emperor-gold mb-4">灵媒在线时间</h3>
                    <p className="text-gray-400 mb-2">周一至周五：子时 - 丑时 (23:00 - 03:00)</p>
                    <p className="text-gray-400">周末：全天闭关修炼</p>
                </div>

                <div className="bg-[#0a0a0a] border border-white/10 rounded-xl p-8">
                    <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                        <MessageSquare className="text-blue-400" size={20} />
                        常见问题 (FAQ)
                    </h3>
                    <div className="space-y-4 text-sm text-gray-400">
                        <details className="cursor-pointer group">
                            <summary className="font-bold text-gray-300 group-hover:text-white transition-colors">
                                如何加入开发团队？
                            </summary>
                            <p className="mt-2 pl-4 border-l border-white/10">
                                请发送您的 GitHub 链接至我们的邮箱。如果在通过面试前不幸去世，请托梦联系。
                            </p>
                        </details>
                        <details className="cursor-pointer group">
                            <summary className="font-bold text-gray-300 group-hover:text-white transition-colors">
                                固件是否支持 Raspberry Pi？
                            </summary>
                            <p className="mt-2 pl-4 border-l border-white/10">
                                目前主要支持 x86 和 ARM 架构的软路由设备。树莓派支持正在开发中（进度：0%）。
                            </p>
                        </details>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default ContactMedium;
