import { CurriculumModule, GradeLevel, TechComponent, LessonContent, Lesson } from './types';

// Helper to generate default content based on lesson metadata
const generateDefaultContent = (grade: GradeLevel, lessonTitle: string, description: string): LessonContent => {
  const isG6 = grade.includes('六年级');
  const isG7 = grade.includes('七年级');
  
  const objectives = [
    `掌握${lessonTitle}的核心概念与技术原理。`,
    `能够将"${description}"中的场景转化为技术实现方案。`,
    `培养在极端环境（陵墓/阴间）下的系统稳定性思维。`
  ];

  const materials = [
    '智能棺材开发板 (ESP32/Raspberry Pi)',
    '冥府通信模块 (LoRa/Zigbee)',
    '传感器套件 (红外/超声波/温湿度)',
    '虚拟仿真环境 (Home Assistant)'
  ];

  const procedure = [
    { step: '场景引入 (5 mins)', detail: `通过"${description}"引入课题，讨论为何在陵墓中需要此功能。` },
    { step: '技术解构 (10 mins)', detail: `分析${lessonTitle}背后的技术原理（如传感器读取、协议传输）。` },
    { step: '实战演练 (20 mins)', detail: '学生分组进行代码编写或设备连接，模拟实现该功能。' },
    { step: '系统测试 (10 mins)', detail: '模拟极端情况（如断电、断网、诈尸），测试系统的可靠性。' }
  ];

  let safetyWarning = '⚠️ 警告：实验过程中请勿随意念诵未知的咒语代码，以免触发系统自毁。';
  
  if (isG6) {
    objectives.push('理解输入-计算-输出的基本控制逻辑。');
    safetyWarning = '⚠️ 警告：调试机关时请保持安全距离，防止被误伤。';
  } else if (isG7) {
    materials.push('局域网服务器');
    objectives.push('理解网络协议在数据传输中的作用。');
    safetyWarning = '⚠️ 警告：请勿扫描不明来源的二维码冥币，防止中了勒索病毒。';
  } else {
    materials.push('Zigbee网关', 'MQTT服务器');
    objectives.push('掌握物联网系统的集成与联动。');
    safetyWarning = '⚠️ 警告：万物互联意味着万物皆可被黑，请确保防火墙已开启。';
  }

  return {
    objectives,
    materials,
    duration: '45 分钟',
    procedure,
    safetyWarning
  };
};

const rawCurriculumData: CurriculumModule[] = [
  {
    id: 'g6-control',
    grade: GradeLevel.Six,
    title: '过程与控制：帝陵防御机制',
    metaphor: '棺材板盖不住继续盖',
    techStack: ['继电器', '红外传感器', '温湿度传感器', '执行器'],
    objectives: [
      '理解输入-计算-输出模型',
      '掌握反馈控制机制（闭环控制）',
      '开关量与连续量（0/1生死状态 vs 温度变化）'
    ],
    scenario: '以“秦始皇陵”为原型，学习基础的过程控制。将原本的“智能生活”场景重构为“地宫防御”与“尸身维生”系统。',
    units: [
      {
        id: 'u1',
        title: '第一单元：初识过程与控制 (Tomb Mechanics 101)',
        // Mechanical gears
        imageUrl: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=1000&auto=format&fit=crop', 
        lessons: [
          { id: 'g6-l1', originalTitle: '设备控制处处在', coffinTitle: '机关陷阱处处有', description: '识别墓室中的长明灯、断龙石等控制设备。' },
          { id: 'g6-l2', originalTitle: '一分为二开与关', coffinTitle: '阴阳两隔开与关', description: '理解墓门的“开”与“关”状态切换。' },
          { id: 'g6-l3', originalTitle: '我是小小控制员', coffinTitle: '我是守陵控制员', description: '体验手动控制棺盖开合的过程。' },
          { id: 'g6-l4', originalTitle: '输入输出与计算', coffinTitle: '盗墓信号与机关触发', description: '输入：震动信号；计算：判断是否为盗墓贼；输出：发射毒箭。' }
        ]
      },
      {
        id: 'u2',
        title: '第二单元：数据运算有逻辑 (Logic of the Trap)',
        // Circuit board dark
        imageUrl: 'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1000&auto=format&fit=crop',
        lessons: [
          { id: 'g6-l5', originalTitle: '连续变化的数据', coffinTitle: '尸气浓度的连续监测', description: '理解连续量：墓室内汞蒸气浓度的变化。' },
          { id: 'g6-l6', originalTitle: '开关量的真与假', coffinTitle: '活人与死人的真假', description: '开关量：生命体征信号（0=死，1=活）。' },
          { id: 'g6-l7', originalTitle: '开关量的与运算', coffinTitle: '双重机关的与逻辑', description: '只有“震动”AND“红外”同时触发，才启动自毁程序。' },
          { id: 'g6-l8', originalTitle: '开关量的或运算', coffinTitle: '逃生通道的或逻辑', description: '按下“内部开关”OR“外部密钥”，墓门开启。' }
        ]
      },
      {
        id: 'u3',
        title: '第三单元：有了反馈更优化 (Feedback for Preservation)',
        // Thermometer / Gauge
        imageUrl: 'https://images.unsplash.com/photo-1555421689-491a97ff2040?q=80&w=1000&auto=format&fit=crop',
        lessons: [
          { id: 'g6-l9', originalTitle: '从人工到自动化', coffinTitle: '从守陵人到自动哨兵', description: '对比人工巡逻与自动红外巡逻的区别。' },
          { id: 'g6-l10', originalTitle: '开环控制应用广', coffinTitle: '定时祭祀系统', description: '开环控制：设定每逢初一十五自动播放哀乐，不检测是否有人听。' },
          { id: 'g6-l11', originalTitle: '通过反馈知效果', coffinTitle: '尸身腐败度检测', description: '引入反馈：检测到温度升高，自动启动制冷。' },
          { id: 'g6-l12', originalTitle: '闭环控制助稳定', coffinTitle: '恒温棺材助永生', description: '闭环系统：维持棺内温度在绝对零度附近的恒定。' }
        ]
      },
      {
        id: 'u4',
        title: '第四单元：控制系统的描述 (System Architecture)',
        // Blueprint / Architecture
        imageUrl: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1000&auto=format&fit=crop',
        lessons: [
          { id: 'g6-l13', originalTitle: '控制系统有特点', coffinTitle: '陵墓系统的整体性', description: '分析地宫水银循环系统的整体架构。' },
          { id: 'g6-l14', originalTitle: '复杂系统可分解', coffinTitle: '地宫分区的子系统', description: '将陵墓分解为：防御子系统、照明子系统、排水子系统。' },
          { id: 'g6-l15', originalTitle: '模块组装很灵活', coffinTitle: '机关模块化设计', description: '将毒气模块与陷坑模块组合使用。' }
        ]
      },
      {
        id: 'u5',
        title: '第五单元：智能种植有方法 (Smart Fungus Cultivation)',
        // Dark forest / Nature
        imageUrl: 'https://images.unsplash.com/photo-1473448912268-2022ce9509d8?q=80&w=1000&auto=format&fit=crop',
        lessons: [
          { id: 'g6-l16', originalTitle: '智能种植初探秘', coffinTitle: '尸香魔芋培育计划', description: '在墓室中种植防腐防盗的特殊植物。' },
          { id: 'g6-l17', originalTitle: '设计我的种植园', coffinTitle: '设计我的陪葬花园', description: '规划地下生态系统的布局。' },
          { id: 'g6-l18', originalTitle: '土壤湿度控制好', coffinTitle: '养尸地湿度控制', description: '保持土壤特定的湿度以维持“僵”的状态。' },
          { id: 'g6-l19', originalTitle: '光照温度要适宜', coffinTitle: '幽冥鬼火光照调节', description: '控制磷火的亮度与环境温度。' }
        ]
      },
      {
        id: 'u6',
        title: '第六单元：电梯运行的控制 (Sarcophagus Lift)',
        // Elevator shaft
        imageUrl: 'https://images.unsplash.com/photo-1535295972055-1c762f4483e5?q=80&w=1000&auto=format&fit=crop',
        lessons: [
          { id: 'g6-l20', originalTitle: '找找电梯子系统', coffinTitle: '升棺发财子系统', description: '分析将棺材从地底升至地面的升降机结构。' },
          { id: 'g6-l21', originalTitle: '到达指定的楼层', coffinTitle: '停在吉时的刻度', description: '控制升降机停在风水最好的高度。' },
          { id: 'g6-l22', originalTitle: '电梯门的开与关', coffinTitle: '棺盖的滑盖控制', description: '逻辑控制：棺盖的自动滑开与闭合。' },
          { id: 'g6-l23', originalTitle: '如果超载电梯停', coffinTitle: '陪葬品超重警报', description: '防止陪葬金银过多压塌升降台。' }
        ]
      },
      {
        id: 'u7',
        title: '第七单元：汽车里的小奥秘 (The Hearse Secrets)',
        // Car dashboard dark
        imageUrl: 'https://images.unsplash.com/photo-1494905998402-395d579af36f?q=80&w=1000&auto=format&fit=crop',
        lessons: [
          { id: 'g6-l24', originalTitle: '自动熄灭转向灯', coffinTitle: '灵车自动引路灯', description: '灵车转弯时引魂灯的自动控制。' },
          { id: 'g6-l25', originalTitle: '安全带未系提醒', coffinTitle: '尸体固定提醒', description: '检测尸体是否在运输中发生位移。' },
          { id: 'g6-l26', originalTitle: '倒车防撞请注意', coffinTitle: '入库防撞辅助', description: '棺材推入墓穴时的距离感应雷达。' },
          { id: 'g6-l27', originalTitle: '定速巡航的控制', coffinTitle: '黄泉路定速巡航', description: '保持灵车匀速行驶，不惊扰亡灵。' }
        ]
      },
      {
        id: 'u8',
        title: '第八单元：自主可控与安全 (Tomb Sovereignty)',
        // Lock / Security
        imageUrl: 'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?q=80&w=1000&auto=format&fit=crop',
        lessons: [
          { id: 'g6-l28', originalTitle: '使用系统讲安全', coffinTitle: '机关操作规范', description: '防止守陵人误触自毁机关。' },
          { id: 'g6-l29', originalTitle: '避免故障保安全', coffinTitle: '千年不腐的可靠性', description: '设计冗余系统，确保千年后机关仍能触发。' },
          { id: 'g6-l30', originalTitle: '自主可控变强大', coffinTitle: '防盗墓技术自主化', description: '拒绝使用容易被现代黑客破解的通用协议，研发私有防盗协议。' }
        ]
      }
    ]
  },
  {
    id: 'g7-internet',
    grade: GradeLevel.Seven,
    title: '互联网应用：数字墓志铭',
    metaphor: '通往极乐世界的网络协议',
    techStack: ['IP地址', 'DNS', 'HTML/CSS', 'HTTP/HTTPS'],
    objectives: [
      '理解IP地址（数字灵位）',
      '域名解析（风水寻龙点穴）',
      '网络安全与隐私（防止“赛博摸金校尉”）'
    ],
    scenario: '构建“云祭祀”平台。学习互联网原理，为每一位先人建立永恒的数字墓碑，并通过网络协议实现阴阳两界的“通信”。',
    units: [
      {
        id: 'u1',
        title: '第一单元：探寻互联网新世界 (The Digital Afterlife)',
        // Fiber optics / Network
        imageUrl: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1000&auto=format&fit=crop',
        lessons: [
          { id: 'g7-l1', originalTitle: '互联网发展靠创新', coffinTitle: '冥网发展靠烧纸', description: '了解从“托梦”到“数字孪生”的通信发展史。' },
          { id: 'g7-l2', originalTitle: '互联网应用新特征', coffinTitle: '云祭祀应用新特征', description: '体验在线烧香、VR扫墓等新应用。' },
          { id: 'g7-l3', originalTitle: '互联网影响新体验', coffinTitle: '赛博永生的新体验', description: '讨论意识上传对传统丧葬文化的冲击。' }
        ]
      },
      {
        id: 'u2',
        title: '第二单元：直播网络我来建 (Live from the Crypt)',
        // Server cables / Matrix
        imageUrl: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=1000&auto=format&fit=crop',
        lessons: [
          { id: 'g7-l4', originalTitle: '数据分包灵活传', coffinTitle: '纸钱分包灵活烧', description: '理解数据包：将大额冥币拆分传输的原理。' },
          { id: 'g7-l5', originalTitle: '网络协议分层设', coffinTitle: '阴阳通信分层仪', description: 'TCP/IP模型：物理层(火盆)->应用层(托梦)。' },
          { id: 'g7-l6', originalTitle: '数字身份辨设备', coffinTitle: '数字灵位辨真身', description: 'IP地址是黄泉的邮政编码（定位区域），MAC地址才是精准的祖宗（唯一真身）。' },
          { id: 'g7-l7', originalTitle: '域名解析换编码', coffinTitle: '族谱解析换生辰', description: 'DNS原理：将“太爷爷”解析为具体的墓地坐标。' },
          { id: 'g7-l8', originalTitle: '路由路径靠算法', coffinTitle: '黄泉引路靠算法', description: '路由器：数据包在阴间网络中的跳转路径。' },
          { id: 'g7-l9', originalTitle: '数据传输有新意', coffinTitle: '跨界传输有新意', description: 'TCP vs UDP：托梦（可靠）与烧纸（不可靠，可能烧了一半）。' },
          { id: 'g7-l10', originalTitle: '综合所学建网络', coffinTitle: '搭建祠堂局域网', description: '实战：在祠堂搭建供家族内部使用的祭祀网络。' }
        ]
      },
      {
        id: 'u3',
        title: '第三单元：便捷的互联网服务 (Services for Spirits)',
        // Cloud concept / Data
        imageUrl: 'https://images.unsplash.com/photo-1484557985045-edf25e08da73?q=80&w=1000&auto=format&fit=crop',
        lessons: [
          { id: 'g7-l11', originalTitle: '互联网服务应用广', coffinTitle: '阴间服务应用广', description: '介绍FTP（贡品传输）、SMTP（写信给先人）。' },
          { id: 'g7-l12', originalTitle: '万维网服务大揭秘', coffinTitle: '生死簿数据大揭秘', description: 'WWW原理：通过超链接遍历家族历史。' },
          { id: 'g7-l13', originalTitle: '万维网安全新协议', coffinTitle: '通灵安全新协议', description: 'HTTPS：防止祭祀心愿被恶鬼（中间人）窃听。' },
          { id: 'g7-l14', originalTitle: '互联网搜索新发展', coffinTitle: '寻祖搜索新发展', description: '搜索引擎原理：如何在茫茫鬼海中找到祖先。' },
          { id: 'g7-l15', originalTitle: '互联网实验齐发现', coffinTitle: '招魂实验齐发现', description: '使用Ping命令测试与祖先的连通性（Latency）。' }
        ]
      },
      {
        id: 'u4',
        title: '第四单元：校园活动线上展 (Online Memorial)',
        // Code screen
        imageUrl: 'https://images.unsplash.com/photo-1587620962725-abab7fe55159?q=80&w=1000&auto=format&fit=crop',
        lessons: [
          { id: 'g7-l16', originalTitle: '探秘网页与代码', coffinTitle: '探秘符咒与代码', description: 'HTML基础：编写第一张电子符咒。' },
          { id: 'g7-l17', originalTitle: '制作网页展活动', coffinTitle: '制作生平展活动', description: '为先人制作个人主页（生平事迹）。' },
          { id: 'g7-l18', originalTitle: '美化网页方法多', coffinTitle: '美化灵堂方法多', description: 'CSS样式：让电子灵堂庄严肃穆。' },
          { id: 'g7-l19', originalTitle: '多人协同效率高', coffinTitle: '家族修谱效率高', description: '使用Git进行家族族谱的协同编辑。' },
          { id: 'g7-l20', originalTitle: '组建网站跟我做', coffinTitle: '组建宗祠跟我做', description: '发布完整的家族纪念网站。' }
        ]
      },
      {
        id: 'u5',
        title: '第五单元：互联网创新应用 (Innovation in Afterlife)',
        // VR / Metaverse
        imageUrl: 'https://images.unsplash.com/photo-1617802690992-15d93263d3a9?q=80&w=1000&auto=format&fit=crop',
        lessons: [
          { id: 'g7-l21', originalTitle: '移动互联新发展', coffinTitle: '移动祭祀新发展', description: '手机端App的祭祀功能开发。' },
          { id: 'g7-l22', originalTitle: '在线学习新变革', coffinTitle: '祖训传承新变革', description: '通过网课形式传承家族规矩。' },
          { id: 'g7-l23', originalTitle: '在线生活创意多', coffinTitle: '阴间生活创意多', description: '元宇宙中的陵墓装修服务。' },
          { id: 'g7-l24', originalTitle: '在线交流新气象', coffinTitle: '跨界交流新气象', description: '即时通讯软件在“沟通”中的应用。' },
          { id: 'g7-l25', originalTitle: '网络创新云服务', coffinTitle: '记忆存储云服务', description: '云存储：将祖先的记忆永久备份在云端（数字永生）。' },
          { id: 'g7-l26', originalTitle: '创意展示我家乡', coffinTitle: '风水宝地我家乡', description: '利用短视频推广家乡的殡葬文化。' }
        ]
      },
      {
        id: 'u6',
        title: '第六单元：共同守护互联网 (Guarding the Net)',
        // Firewall / Shield
        imageUrl: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=1000&auto=format&fit=crop',
        lessons: [
          { id: 'g7-l27', originalTitle: '个人信息防泄露', coffinTitle: '生辰八字防泄露', description: '防止因生辰八字泄露被“借寿”。' },
          { id: 'g7-l28', originalTitle: '数字版权要保护', coffinTitle: '遗嘱版权要保护', description: '数字遗嘱的加密与版权认证。' },
          { id: 'g7-l29', originalTitle: '企业责任勇担当', coffinTitle: '殡葬企业勇担当', description: '互联网殡葬企业的社会责任。' },
          { id: 'g7-l30', originalTitle: '网络生态建设好', coffinTitle: '阴阳生态建设好', description: '打击网络封建迷信诈骗，维护清朗空间。' }
        ]
      }
    ]
  },
  {
    id: 'g8-iot',
    grade: GradeLevel.Eight,
    title: '物联网实践：万物互联的永生',
    metaphor: '人均嬴政的地下宫殿',
    techStack: ['Sensors', 'Zigbee', 'MQTT', 'OpenWrt', 'Home Assistant', 'HomeKit'],
    objectives: [
      '搭建简易物联系统',
      '数据采集与可视化',
      '自主可控技术（去云端化，本地私有云）'
    ],
    scenario: '终极部署：利用OpenWrt作为旁路由网关，Zigbee传感器采集棺内环境数据。最终接入Home Assistant，实现真正的“智能棺材”。',
    units: [
      {
        id: 'u1',
        title: '第一单元：从感知到物联 (Perceiving the Tomb)',
        // Sensor chip
        imageUrl: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=1000&auto=format&fit=crop',
        lessons: [
          { id: 'g8-l1', originalTitle: '开启物联网之门', coffinTitle: '开启地宫之门', description: '物联网概念引入：当棺材连上和互联网。' },
          { id: 'g8-l2', originalTitle: '传感之古今未来', coffinTitle: '听尸之古今未来', description: '了解传感器：从听尸人到高精度传感器。' },
          { id: 'g8-l3', originalTitle: '环境数据要感知', coffinTitle: '尸变环境要感知', description: '实战：使用温湿度传感器监测棺内环境。' },
          { id: 'g8-l4', originalTitle: '物物相连有价值', coffinTitle: '万棺相连有价值', description: '探讨大规模棺材联网的商业/数据价值。' },
          { id: 'g8-l5', originalTitle: '物联功能趣体验', coffinTitle: '诈尸预警趣体验', description: '体验远程查看棺材内部震动数据。' }
        ]
      },
      {
        id: 'u2',
        title: '第二单元：万物互联有协议 (Protocols of the Dead)',
        // Signal waves / Radio
        imageUrl: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=1000&auto=format&fit=crop',
        lessons: [
          { id: 'g8-l6', originalTitle: '数据传输方式多', coffinTitle: '通灵传输方式多', description: '比较有线（红绳）与无线（Zigbee）传输。' },
          { id: 'g8-l7', originalTitle: '电子标签我揭秘', coffinTitle: '符咒标签我揭秘', description: 'RFID实战：扫描电子符咒识别僵尸等级。' },
          { id: 'g8-l8', originalTitle: '巧用蓝牙做工具', coffinTitle: '巧用蓝牙连尸身', description: '蓝牙Mesh组网在大型陵墓中的应用。' },
          { id: 'g8-l9', originalTitle: '互联协议仍沿用', coffinTitle: 'HTTP协议仍沿用', description: 'REST API：向服务器发送“请求复活”指令。' },
          { id: 'g8-l10', originalTitle: '物物互通有新径', coffinTitle: 'MQTT互通有新径', description: 'MQTT协议：发布/订阅模式在棺材集群管理中的优势。' }
        ]
      },
      {
        id: 'u3',
        title: '第三单元：简单物联功能实践 (Basic Necromancy)',
        // Smart lock / Keypad
        imageUrl: 'https://images.unsplash.com/photo-1553341640-6b28ff92098a?q=80&w=1000&auto=format&fit=crop',
        lessons: [
          { id: 'g8-l11', originalTitle: '物联功能细分解', coffinTitle: '复活功能细分解', description: '系统架构：感知层、网络层、应用层。' },
          { id: 'g8-l12', originalTitle: '刷卡开锁易实现', coffinTitle: '令牌开棺易实现', description: 'NFC/RFID开锁实战。' },
          { id: 'g8-l13', originalTitle: '门铃通知即时到', coffinTitle: '招魂铃声即时到', description: '当检测到敲击棺盖时，手机推送通知。' },
          { id: 'g8-l14', originalTitle: '远程控制更便捷', coffinTitle: '远程揭棺更便捷', description: '通过手机App远程控制推杆电机推开棺盖。' },
          { id: 'g8-l15', originalTitle: '面容钥匙显智能', coffinTitle: '遗容识别显智能', description: '人脸识别开锁：只有后代子孙（或本人）能打开。' }
        ]
      },
      {
        id: 'u4',
        title: '第四单元：简易物联系统实践 (Building the System)',
        // Dashboard
        imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1000&auto=format&fit=crop',
        lessons: [
          { id: 'g8-l16', originalTitle: '模块功能先划分', coffinTitle: '陪葬模块先划分', description: '规划智能棺材的各个子系统（照明、通风、安防）。' },
          { id: 'g8-l17', originalTitle: '物联数据需采集', coffinTitle: '生命体征需采集', description: '集成心率、呼吸传感器（防假死）。' },
          { id: 'g8-l18', originalTitle: '数据分析与处理', coffinTitle: '尸变指数分析', description: '算法处理：判断数据是否异常（是否诈尸）。' },
          { id: 'g8-l19', originalTitle: '数据呈现可视化', coffinTitle: '阴德数据可视化', description: 'Dashboard设计：在墓碑屏幕上显示各项指标。' },
          { id: 'g8-l20', originalTitle: '反馈控制有算法', coffinTitle: '镇压反馈有算法', description: '自动化逻辑：检测到起尸自动播放大悲咒并锁死。' }
        ]
      },
      {
        id: 'u5',
        title: '第五单元：物联网应用探索 (Exploring Applications)',
        // Lab
        imageUrl: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?q=80&w=1000&auto=format&fit=crop',
        lessons: [
          { id: 'g8-l21', originalTitle: '文物保护新手段', coffinTitle: '肉身保护新手段', description: '恒温恒湿系统在遗体保存中的应用。' },
          { id: 'g8-l22', originalTitle: '健康生活新设备', coffinTitle: '死后生活新设备', description: '智能骨灰盒、智能祭祀台等产品探究。' },
          { id: 'g8-l23', originalTitle: '医疗设施新功能', coffinTitle: '法医设施新功能', description: '远程验尸系统的物联网实现。' },
          { id: 'g8-l24', originalTitle: '农业生产新模式', coffinTitle: '坟头种草新模式', description: '智能灌溉系统在陵园绿化中的应用。' },
          { id: 'g8-l25', originalTitle: '学习探究新工具', coffinTitle: '盗墓探究新工具', description: '使用传感器阵列探测地下空洞（洛阳铲2.0）。' }
        ]
      },
      {
        id: 'u6',
        title: '第六单元：物联网安全 (Security of the Tomb)',
        // Digital lock
        imageUrl: 'https://images.unsplash.com/photo-1614064641938-3bbee52942c7?q=80&w=1000&auto=format&fit=crop',
        lessons: [
          { id: 'g8-l26', originalTitle: '数字世界有身份', coffinTitle: '阴曹地府有身份', description: '设备指纹与身份认证。' },
          { id: 'g8-l27', originalTitle: '安全事件与风险', coffinTitle: '被盗事件与风险', description: '分析智能门锁被黑客破解的案例。' },
          { id: 'g8-l28', originalTitle: '安全防范讲策略', coffinTitle: '机关防范讲策略', description: '防火墙、物理隔离在陵墓网络中的应用。' },
          { id: 'g8-l29', originalTitle: '自主可控意义大', coffinTitle: '自主可控防摸金', description: '为什么核心防盗系统不能用外国芯片？' },
          { id: 'g8-l30', originalTitle: '系统安全需升级', coffinTitle: '墓室安全需升级', description: 'OTA空中升级：修复千年Bug。' }
        ]
      }
    ]
  }
];

// Enrich data with generated content
export const curriculumData: CurriculumModule[] = rawCurriculumData.map(module => ({
  ...module,
  units: module.units.map(unit => ({
    ...unit,
    lessons: unit.lessons.map(lesson => ({
      ...lesson,
      content: generateDefaultContent(module.grade, lesson.coffinTitle, lesson.description)
    }))
  }))
}));

export const techStackData: TechComponent[] = [
  { name: 'OpenWrt', description: '嵌入式软路由系统，作为地下宫殿的数字网关，确保断网（与阳间失联）情况下局域网依然存活。', role: 'Software' },
  { name: 'Home Assistant', description: '开源家庭自动化中心，统筹管理所有陪葬品（智能设备），实现跨品牌联动（米家接入HomeKit）。', role: 'Software' },
  { name: 'Zigbee', description: '低功耗近距离通信协议，用于棺内无线传感器组网，超长待机，守护千年。', role: 'Protocol' },
  { name: 'MQTT', description: '消息队列遥测传输，轻量级协议，即使在“阴阳两隔”的弱网环境下也能保证遗嘱（消息）送达。', role: 'Protocol' }
];
