import React, { useEffect, useRef, useState } from 'react';
import { ChevronRight, ArrowDown, Store, ShieldCheck, Cpu, Sun, Moon, MapPin, Home, Sparkles, Users, MessageSquare, ArrowUp, Handshake } from 'lucide-react';

// 在本地开发和线上部署时，将图片放在 public 文件夹即可完美显示
const logoImg = "/logo.png";

// 安全地配置 Tailwind 的暗黑模式策略为 'class'
if (typeof window !== 'undefined') {
  window.tailwind = window.tailwind || {};
  window.tailwind.config = {
    darkMode: 'class',
  };
}

// --- 滚动视差与淡入动画组件 ---
const FadeInSection = ({ children, delay = 0, className = "" }) => {
  const [isVisible, setVisible] = useState(false);
  const domRef = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setVisible(true);
        }
      });
    }, { threshold: 0.1 });
    
    const currentRef = domRef.current;
    if (currentRef) observer.observe(currentRef);
    
    return () => {
      if (currentRef) observer.unobserve(currentRef);
    };
  }, []);

  return (
    <div
      ref={domRef}
      className={`transition-all duration-1000 ease-out ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
      } ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

// --- 高德地图组件 (沙盒安全版) ---
const MapComponent = ({ isDarkMode }) => {
  const mapUrl = "https://uri.amap.com/search?keyword=湄洲湾职业技术学院&city=莆田";

  return (
    <div className="w-full h-full relative group bg-gray-100 dark:bg-gray-800 flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 opacity-20 dark:opacity-10" style={{
        backgroundImage: `radial-gradient(circle at 2px 2px, ${isDarkMode ? '#ffffff' : '#000000'} 1px, transparent 0)`,
        backgroundSize: '24px 24px'
      }}></div>

      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-gray-200/50 dark:to-black/50 pointer-events-none"></div>

      <div className="relative z-10 flex flex-col items-center transform group-hover:scale-105 transition-transform duration-500">
        <div className="w-14 h-14 md:w-16 md:h-16 bg-blue-100 dark:bg-[#0b3261]/50 rounded-full flex items-center justify-center mb-4 md:mb-6 shadow-xl relative">
           <div className="absolute inset-0 rounded-full border-4 border-[#0b3261] dark:border-[#cda869] opacity-30 animate-ping duration-1000"></div>
           <MapPin className="w-7 h-7 md:w-8 md:h-8 text-[#0b3261] dark:text-[#cda869] relative z-10" />
        </div>

        <a
          href={mapUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-gray-900 text-white dark:bg-white dark:text-black px-5 py-2.5 md:px-6 md:py-3 rounded-full text-sm font-medium hover:opacity-80 transition-all shadow-lg flex items-center gap-2"
        >
          高德地图导航
          <ChevronRight className="w-4 h-4" />
        </a>
      </div>
    </div>
  );
};

export default function App() {
  const [scrolled, setScrolled] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [activeTab, setActiveTab] = useState('home');
  const [showContactModal, setShowContactModal] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [isNavBouncing, setIsNavBouncing] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      setShowBackToTop(window.scrollY > 300);
      
      const sections = ['home', 'philosophy', 'team', 'location'];
      let current = 'home';
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el && window.scrollY >= el.offsetTop - 200) {
          current = section;
        }
      }
      setActiveTab(current);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleBackToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setTimeout(() => {
      setIsNavBouncing(true);
      setTimeout(() => setIsNavBouncing(false), 800);
    }, 500); 
  };

  return (
    <div className={isDarkMode ? 'dark' : ''}>
      <div className="bg-gray-50 text-gray-900 dark:bg-black dark:text-white min-h-screen font-sans overflow-x-hidden selection:bg-[#cda869] selection:text-white dark:selection:text-black transition-colors duration-700 pb-20 md:pb-0">
        
        {/* --- 顶部导航栏 --- */}
        <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${
          scrolled 
            ? 'bg-white/90 dark:bg-black/80 backdrop-blur-lg border-b border-gray-200 dark:border-white/10 py-2 md:py-3' 
            : 'bg-transparent py-4 md:py-6'
        } ${isNavBouncing ? 'animate-nav-jelly origin-top' : ''}`}>
          <div className="max-w-7xl mx-auto px-5 md:px-12 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="relative h-6 md:h-8 flex items-center">
                <img 
                  src={logoImg} 
                  alt="莆鞋汇" 
                  className="h-full w-auto max-w-[150px] md:max-w-[200px] object-contain drop-shadow-none dark:drop-shadow-[0_0_10px_rgba(205,168,105,0.3)] transition-all"
                  onError={(e) => {
                    // 如果图片加载失败，显示文字 Logo 兜底，防止出现裂图图标
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'block';
                  }} 
                />
                <span className="hidden font-bold text-lg tracking-tight dark:text-white">莆鞋汇 PUTIAN SHOES HUB</span>
              </div>
            </div>
            
            <div className="hidden md:flex space-x-8 text-sm font-medium text-gray-600 dark:text-gray-300 items-center">
              <a href="#home" className="hover:text-black dark:hover:text-white transition-colors">品牌定位</a>
              <a href="#philosophy" className="hover:text-black dark:hover:text-white transition-colors">核心优势</a>
              <a href="#team" className="hover:text-black dark:hover:text-white transition-colors">专业团队</a>
              <a href="#location" className="hover:text-black dark:hover:text-white transition-colors">线下门店</a>
            </div>

            <div className="flex items-center space-x-3 md:space-x-4">
              <button 
                onClick={() => setIsDarkMode(!isDarkMode)} 
                className="p-2 rounded-full bg-gray-200/50 hover:bg-gray-300 dark:bg-white/10 dark:hover:bg-white/20 transition-colors"
                title="切换昼夜模式"
              >
                {isDarkMode ? <Sun className="w-4 h-4 md:w-5 md:h-5 text-gray-300" /> : <Moon className="w-4 h-4 md:w-5 md:h-5 text-gray-700" />}
              </button>
              <button 
                onClick={() => setShowContactModal(true)} 
                className="hidden md:block bg-gray-900 text-white dark:bg-white dark:text-black px-5 py-2 rounded-full text-sm font-medium shadow-md transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] hover:scale-110 active:scale-90"
              >
                联系我们
              </button>
            </div>
          </div>
        </nav>

        {/* --- 首屏 Hero Section --- */}
        <section id="home" className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden pt-20 md:pt-10 pb-10">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] md:w-[800px] md:h-[800px] bg-blue-100/50 dark:bg-[#0b3261]/20 rounded-full blur-[100px] pointer-events-none transition-colors duration-1000"></div>
          
          <div className="relative z-10 w-full max-w-7xl mx-auto px-5 md:px-6 flex flex-col items-center mt-10">
            <FadeInSection delay={100} className="text-center w-full">
              <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-b from-gray-900 via-gray-700 to-gray-400 dark:from-white dark:via-white dark:to-gray-500 transition-all duration-700 leading-tight">
                重塑步伐<br/>重构想象
              </h1>
              <p className="mt-4 md:mt-6 text-base sm:text-lg md:text-2xl text-gray-500 dark:text-gray-400 font-light tracking-wide transition-colors px-4">
                莆鞋汇 校园自主厂牌鞋类新零售体验中心
              </p>
              
              <div className="mt-8 md:mt-12">
                <button 
                  onClick={() => setShowContactModal(true)} 
                  className="inline-block bg-gray-900 text-white dark:bg-white dark:text-black px-8 py-3.5 md:px-12 md:py-4 rounded-full text-base md:text-xl font-bold transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] hover:scale-110 active:scale-[0.85] shadow-[0_10px_30px_rgba(0,0,0,0.15)] dark:shadow-[0_10px_30px_rgba(255,255,255,0.1)] w-[200px] md:w-auto relative group overflow-hidden"
                >
                  <span className="relative z-10">联系我们</span>
                  <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent group-hover:animate-shimmer z-0"></div>
                </button>
              </div>
            </FadeInSection>
          </div>

          <div className="absolute bottom-20 md:bottom-10 left-1/2 -translate-x-1/2 animate-bounce opacity-50">
            <ArrowDown className="w-5 h-5 md:w-6 md:h-6 text-gray-900 dark:text-white" />
          </div>
        </section>

        {/* --- 优势板块 --- */}
        <section id="philosophy" className="py-20 md:py-32 relative">
          <div className="max-w-5xl mx-auto px-5 md:px-6 text-center">
            <FadeInSection>
              <h2 className="text-3xl md:text-5xl font-bold mb-6 md:mb-8 tracking-tight">拒绝智商税，只为纯粹体验</h2>
            </FadeInSection>
            <FadeInSection delay={200}>
              <p className="text-lg md:text-2xl text-gray-600 dark:text-gray-400 leading-relaxed font-light transition-colors text-justify md:text-center">
                依托莆田鞋服主导产业带，我们严选合法注册的<span className="text-[#cda869] font-medium">自主厂牌</span>。
                摒弃高昂的品牌溢价与质量无保障的侵权灰产，用“<span className="text-[#0b3261] dark:text-white font-medium">大厂代工级品质</span>”普惠校园，让好鞋回归真实价值。
              </p>
            </FadeInSection>
          </div>
        </section>

        {/* --- 卡片服务板块 --- */}
        <section className="py-10 md:py-20 px-5 md:px-6 max-w-7xl mx-auto">
          <FadeInSection>
            <h3 className="text-2xl md:text-4xl font-bold mb-10 md:mb-16 text-center tracking-tight">新零售体验闭环</h3>
          </FadeInSection>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-10">
            <FadeInSection delay={100} className="group">
              <div className="h-full bg-white dark:bg-white/[0.03] border border-gray-100 dark:border-white/[0.05] shadow-md dark:shadow-none rounded-[2rem] p-8 md:p-10 transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] hover:scale-[1.03] md:hover:-translate-y-3 text-left">
                <div className="w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-blue-50 dark:bg-gradient-to-br dark:from-[#0b3261] dark:to-black flex items-center justify-center mb-6 md:mb-8 transition-colors">
                  <Store className="w-6 h-6 md:w-7 md:h-7 text-[#0b3261] dark:text-[#cda869]" />
                </div>
                <h4 className="text-xl md:text-2xl font-bold mb-3 md:mb-4 text-gray-900 dark:text-white">线下常码前置体验</h4>
                <p className="text-sm md:text-base text-gray-500 dark:text-gray-400 leading-relaxed font-light">
                  告别尺码不准与货不对板。店内专设男女核心常码矩阵供实地试穿、检验材质，体验满意后再极速下单。
                </p>
              </div>
            </FadeInSection>

            <FadeInSection delay={300} className="group">
              <div className="h-full bg-white dark:bg-white/[0.03] border border-gray-100 dark:border-white/[0.05] shadow-md dark:shadow-none rounded-[2rem] p-8 md:p-10 transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] hover:scale-[1.03] md:hover:-translate-y-3 text-left">
                <div className="w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-blue-50 dark:bg-gradient-to-br dark:from-[#0b3261] dark:to-black flex items-center justify-center mb-6 md:mb-8 transition-colors">
                  <ShieldCheck className="w-6 h-6 md:w-7 md:h-7 text-[#0b3261] dark:text-[#cda869]" />
                </div>
                <h4 className="text-xl md:text-2xl font-bold mb-3 md:mb-4 text-gray-900 dark:text-white">极速无忧售后保障</h4>
                <p className="text-sm md:text-base text-gray-500 dark:text-gray-400 leading-relaxed font-light">
                  彻底终结网购售后踢皮球。首创“不满意直接丢店里包退换”服务，0运费、免等待，安心无忧。
                </p>
              </div>
            </FadeInSection>

            <FadeInSection delay={500} className="group">
              <div className="h-full bg-white dark:bg-white/[0.03] border border-gray-100 dark:border-white/[0.05] shadow-md dark:shadow-none rounded-[2rem] p-8 md:p-10 transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] hover:scale-[1.03] md:hover:-translate-y-3 text-left">
                <div className="w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-blue-50 dark:bg-gradient-to-br dark:from-[#0b3261] dark:to-black flex items-center justify-center mb-6 md:mb-8 transition-colors">
                  <Cpu className="w-6 h-6 md:w-7 md:h-7 text-[#0b3261] dark:text-[#cda869]" />
                </div>
                <h4 className="text-xl md:text-2xl font-bold mb-3 md:mb-4 text-gray-900 dark:text-white">AI 智能门店中枢</h4>
                <p className="text-sm md:text-base text-gray-500 dark:text-gray-400 leading-relaxed font-light">
                  全团队自研辅助系统搭建核心技术壁垒。实现下拉秒级开单、全自动售后流转与多维爆款退货红灯预警。
                </p>
              </div>
            </FadeInSection>
          </div>
        </section>

        {/* --- 团队背书 --- */}
        <section id="team" className="py-20 md:py-32 relative overflow-hidden transition-colors duration-700">
          <div className="absolute inset-0 bg-gradient-to-b from-gray-100 via-white to-gray-50 dark:from-black dark:via-[#051121] dark:to-black z-0"></div>
          <div className="max-w-4xl mx-auto px-5 md:px-6 relative z-10 flex flex-col items-center text-center">
            <FadeInSection delay={200} className="w-full">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 md:mb-8">硬核科班底蕴<br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0b3261] to-[#1a4a85] dark:from-[#cda869] dark:to-[#ebd29f]">重构供应链</span></h2>
              <p className="text-base md:text-lg text-gray-600 dark:text-gray-400 mb-8 md:mb-10 leading-relaxed transition-colors text-justify md:text-center">
                核心团队全员来自湄洲湾职业技术学院智能制造工程系鞋类专业。我们将“商贸运营”与“鞋类鉴赏、楦型诊断”深度融合。从源头规上代工厂直发，砍掉所有中间环节，用最专业的眼眼为你严苛把关。
              </p>
              <button 
                onClick={() => setShowContactModal(true)} 
                className="inline-flex items-center space-x-2 bg-gray-900 text-white dark:bg-white dark:text-black px-6 py-3.5 md:py-3 rounded-full font-medium shadow-md transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] hover:scale-110 active:scale-90 group"
              >
                <span className="text-base md:text-lg">联系主理人团队</span>
                <ChevronRight className="w-5 h-5 transition-transform duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] group-hover:translate-x-2" />
              </button>
            </FadeInSection>
          </div>
        </section>

        {/* --- 地图板块 --- */}
        <section id="location" className="py-20 px-5 md:px-6 max-w-7xl mx-auto relative z-10">
          <FadeInSection>
            <div className="text-center mb-8 md:mb-10">
              <h3 className="text-2xl md:text-4xl font-bold mb-3 md:mb-4 tracking-tight flex items-center justify-center gap-2 md:gap-3">
                <MapPin className="w-6 h-6 md:w-8 md:h-8 text-[#0b3261] dark:text-[#cda869]" />
                我们的地址
              </h3>
              <p className="text-sm md:text-lg text-gray-500 dark:text-gray-400">
                福建省莆田市涵江区 湄洲湾职业技术学院<br className="md:hidden" /> (大学生创业街)
              </p>
            </div>
          </FadeInSection>
          
          <FadeInSection delay={200}>
            <div className="w-full h-[300px] md:h-[450px] rounded-3xl overflow-hidden shadow-xl dark:shadow-white/5 border border-gray-200 dark:border-white/10 relative bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
               <MapComponent isDarkMode={isDarkMode} />
               <div className="absolute top-4 left-4 md:top-6 md:left-6 bg-white/90 dark:bg-black/80 backdrop-blur-md px-4 py-3 md:px-5 md:py-4 rounded-2xl shadow-lg border border-gray-100 dark:border-white/10 z-20 pointer-events-none text-left">
                  <h4 className="font-bold text-gray-900 dark:text-white mb-1 flex items-center gap-2 text-sm md:text-base">
                     <Store className="w-3.5 h-3.5 md:w-4 md:h-4 text-[#0b3261] dark:text-[#cda869]" />
                     莆鞋汇 体验中心
                  </h4>
                  <p className="text-xs md:text-sm text-gray-500 dark:text-gray-400">欢迎同校师生线下打卡体验</p>
               </div>
            </div>
          </FadeInSection>
        </section>

        {/* --- 合作伙伴板块 (新增) --- */}
        <section className="py-20 px-5 max-w-7xl mx-auto border-t border-gray-100 dark:border-white/10">
          <FadeInSection className="text-center mb-12">
            <h3 className="text-2xl md:text-4xl font-bold mb-4 tracking-tight flex items-center justify-center gap-3">
              <Handshake className="w-8 h-8 text-[#0b3261] dark:text-[#cda869]" />
              合作伙伴
            </h3>
            <p className="text-gray-500 dark:text-gray-400">
              携手行业顶尖品牌，共创优质新零售体验
            </p>
            {/* 新增的说明文字 */}
            <p className="text-xs text-gray-400 dark:text-gray-500 mt-2">
              (此排名不分先后)
            </p>
          </FadeInSection>
          
          <FadeInSection delay={200}>
            {/* 使用 flex-wrap，无论后期增加多少个 Logo，都会自动换行并居中排布 */}
            <div className="flex flex-wrap justify-center items-start gap-6 md:gap-10">
              
              {/* 👇👇👇 修改这里：在这里添加、删除或修改合作伙伴的信息 👇👇👇 */}
              {/* 将 name 里的文字换成你的品牌名字，img 里的路径换成你的图片 */}
              {[
                { id: 1, name: "树标", img: "/partner-1.png" },
                { id: 2, name: "鲸动", img: "/partner-2.png" },
                { id: 3, name: "辉腾", img: "/partner-3.png" },
                { id: 4, name: "福恩娃", img: "/partner-4.png" },
                { id: 5, name: "石一童", img: "/partner-5.png" }
              ].map((partner) => (
                <div 
                  key={partner.id} 
                  className="flex flex-col items-center group cursor-pointer w-24 md:w-32 lg:w-36 transition-all hover:-translate-y-1"
                >
                  {/* Logo 图片框 */}
                  <div className="w-24 h-24 md:w-32 md:h-32 lg:w-36 lg:h-36 bg-white dark:bg-white/5 rounded-2xl shadow-sm border border-gray-100 dark:border-white/10 flex items-center justify-center p-4 group-hover:shadow-lg transition-all mb-3 md:mb-4 overflow-hidden">
                    <img 
                      src={partner.img} 
                      alt={`合作伙伴 ${partner.name}`} 
                      className="w-full h-full object-contain rounded-xl transition-transform duration-300 group-hover:scale-110"
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.nextSibling.style.display = 'block';
                      }} 
                    />
                    {/* 当图片没找到或加载失败时，显示占位文字 */}
                    <span className="hidden text-sm text-gray-400 font-medium text-center">品牌<br/>Logo</span>
                  </div>
                  
                  {/* 👇👇👇 这里负责显示品牌名称 👇👇👇 */}
                  <span className="text-sm md:text-base text-gray-600 dark:text-gray-400 font-medium group-hover:text-[#0b3261] dark:group-hover:text-[#cda869] transition-colors duration-300 text-center">
                    {partner.name}
                  </span>
                </div>
              ))}
              {/* 👆👆👆 修改结束 👆👆👆 */}

            </div>
          </FadeInSection>
        </section>

        {/* --- 页脚 --- */}
        <footer id="contact" className="border-t border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-black py-10 md:py-12 text-center text-xs md:text-sm text-gray-500 transition-colors">
          <div className="max-w-7xl mx-auto px-6 flex flex-col items-center">
             <div className="relative h-6 md:h-8 flex items-center mb-6">
                <img 
                  src={logoImg} 
                  alt="莆鞋汇" 
                  className="h-full w-auto max-w-[120px] md:max-w-[150px] object-contain grayscale opacity-60 transition-all"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'block';
                  }}
                />
                <span className="hidden font-bold dark:text-white">莆鞋汇 PUTIAN SHOES HUB</span>
             </div>
             <p className="mb-2">业务合作 / 校园代理 / 售后咨询</p>
             <p className="font-medium text-gray-700 dark:text-gray-300 mb-6 text-base md:text-lg">微信搜索关注：MZY莆鞋汇</p>
             <p>© 2026 湄光追影科技有限公司. All rights reserved.</p>
          </div>
        </footer>

      </div>

      {/* --- 手机端悬浮球 --- */}
      <button 
        onClick={() => setShowContactModal(true)} 
        className="md:hidden fixed right-5 bottom-24 bg-[#0b3261] dark:bg-[#cda869] text-white dark:text-black w-14 h-14 rounded-full flex items-center justify-center shadow-[0_4px_15px_rgba(11,50,97,0.4)] dark:shadow-[0_4px_15px_rgba(205,168,105,0.4)] z-40 transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] active:scale-75"
      >
        <MessageSquare className="w-6 h-6" />
      </button>

      {/* --- 返回顶部 --- */}
      <button 
        onClick={handleBackToTop} 
        className={`fixed right-5 md:right-10 z-40 w-12 h-12 md:w-14 md:h-14 bg-white dark:bg-[#1a1a1a] text-gray-900 dark:text-white rounded-full flex items-center justify-center shadow-[0_4px_15px_rgba(0,0,0,0.1)] dark:shadow-[0_4px_15px_rgba(255,255,255,0.05)] border border-gray-100 dark:border-white/10 transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] active:scale-75 active:duration-100 group ${
          showBackToTop ? 'bottom-40 md:bottom-10 opacity-100 translate-y-0' : 'bottom-40 md:bottom-10 opacity-0 translate-y-10 pointer-events-none'
        }`}
        title="回到顶部"
      >
        <ArrowUp className="w-5 h-5 md:w-6 md:h-6 group-hover:-translate-y-1 transition-transform duration-300" />
      </button>

      {/* --- 底部导航 --- */}
      <div className="md:hidden fixed bottom-0 left-0 w-full bg-white/90 dark:bg-black/90 backdrop-blur-xl border-t border-gray-200 dark:border-white/10 z-50 pb-safe">
        <div className="flex justify-around items-center h-16 px-2">
          <a href="#home" className={`flex flex-col items-center justify-center w-full h-full space-y-1 transition-colors ${activeTab === 'home' ? 'text-[#0b3261] dark:text-[#cda869]' : 'text-gray-400 dark:text-gray-500'}`}>
            <Home className="w-5 h-5" />
            <span className="text-[10px] font-medium">首页</span>
          </a>
          <a href="#philosophy" className={`flex flex-col items-center justify-center w-full h-full space-y-1 transition-colors ${activeTab === 'philosophy' ? 'text-[#0b3261] dark:text-[#cda869]' : 'text-gray-400 dark:text-gray-500'}`}>
            <Sparkles className="w-5 h-5" />
            <span className="text-[10px] font-medium">优势</span>
          </a>
          <a href="#team" className={`flex flex-col items-center justify-center w-full h-full space-y-1 transition-colors ${activeTab === 'team' ? 'text-[#0b3261] dark:text-[#cda869]' : 'text-gray-400 dark:text-gray-500'}`}>
            <Users className="w-5 h-5" />
            <span className="text-[10px] font-medium">团队</span>
          </a>
          <a href="#location" className={`flex flex-col items-center justify-center w-full h-full space-y-1 transition-colors ${activeTab === 'location' ? 'text-[#0b3261] dark:text-[#cda869]' : 'text-gray-400 dark:text-gray-500'}`}>
            <MapPin className="w-5 h-5" />
            <span className="text-[10px] font-medium">门店</span>
          </a>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        @keyframes shimmer {
          100% { transform: translateX(100%); }
        }
        @keyframes springBounce {
          0% { transform: scale(0.8); opacity: 0; }
          40% { transform: scale(1.05); opacity: 1; }
          70% { transform: scale(0.98); opacity: 1; }
          100% { transform: scale(1); opacity: 1; }
        }
        .animate-spring {
          animation: springBounce 0.5s cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
        }
        @keyframes navJellyBounce {
          0% { transform: scale3d(1, 1, 1) translateY(0); }
          30% { transform: scale3d(1.02, 0.9, 1) translateY(8px); }
          50% { transform: scale3d(0.98, 1.05, 1) translateY(-4px); }
          75% { transform: scale3d(1.01, 0.98, 1) translateY(2px); }
          100% { transform: scale3d(1, 1, 1) translateY(0); }
        }
        .animate-nav-jelly {
          animation: navJellyBounce 0.6s cubic-bezier(0.25, 1, 0.5, 1) forwards;
        }
      `}} />

      {showContactModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-300">
          <div className="bg-white dark:bg-[#051121] rounded-[2rem] p-8 max-w-sm w-full shadow-2xl text-center border border-gray-100 dark:border-white/10 animate-spring">
            <div className="w-16 h-16 bg-blue-50 dark:bg-[#0b3261]/30 rounded-full flex items-center justify-center mx-auto mb-4">
               <MessageSquare className="w-8 h-8 text-[#0b3261] dark:text-[#cda869]" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">联系主理人</h3>
            <p className="text-gray-500 dark:text-gray-400 mb-6 font-light">请添加微信或拨打电话</p>
            <div className="bg-gray-50 dark:bg-white/5 rounded-2xl py-5 mb-6">
              <span className="text-3xl tracking-wider text-[#0b3261] dark:text-[#cda869] font-bold">13178249948</span>
            </div>
            <button
              onClick={() => setShowContactModal(false)}
              className="w-full bg-gray-900 text-white dark:bg-white dark:text-black py-3.5 rounded-full font-medium hover:opacity-90 active:scale-95 transition-all shadow-md"
            >
              好的，知道了
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
