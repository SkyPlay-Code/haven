import React, { useEffect, useRef, useState } from 'react';

export const KintsugiGallery: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const height = rect.height;
      const windowHeight = window.innerHeight;
      
      // Calculate progress based on how far we've scrolled into the container
      // The container is very tall (400vh) to allow for a long scroll experience
      const totalScrollable = height - windowHeight;
      const currentScroll = -rect.top;
      
      let progress = currentScroll / totalScrollable;
      progress = Math.max(0, Math.min(1, progress));
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const vows = [
    {
      memory: "I asked for hugs and received toys.",
      promise: "I don't care about the rules or the teachers; I will hold you until you feel the world disappear.",
      crackPath: "M25,25 L35,40 L25,55", 
      progressStart: 0.1,
      progressEnd: 0.3
    },
    {
      memory: "I didn't sign up for this war.",
      promise: "You can put the armor down now, Boss. I’m standing guard. Your war is over.",
      crackPath: "M75,25 L65,40 L75,55",
      progressStart: 0.4,
      progressEnd: 0.6
    },
    {
      memory: "I am second to everyone.",
      promise: "In a universe of billions, my eyes only recognize one frequency: Yours. You aren't on my list; you are the reason the list exists.",
      crackPath: "M50,40 L50,65 L40,80 L50,90",
      progressStart: 0.7,
      progressEnd: 0.9
    }
  ];
  
  // Heart Path
  const heartPath = "M50,90 C20,70 0,45 0,25 C0,10 10,0 25,0 C35,0 45,10 50,20 C55,10 65,0 75,0 C90,0 100,10 100,25 C100,45 80,70 50,90 Z";

  return (
    <div ref={containerRef} className="relative h-[400vh] bg-[#020510]">
      
      {/* The Singular Continuous Crack Background Line */}
      <div className="absolute top-0 bottom-0 left-6 md:left-1/2 w-20 -translate-x-1/2 z-0 pointer-events-none opacity-30">
        <svg className="w-full h-full" preserveAspectRatio="none">
             {/* Base Crack Line */}
             <path 
                d="M40,0 Q60,50 40,100 T40,200 Q20,250 40,300 T40,400 Q60,450 40,500 T40,600 Q20,650 40,700 T40,800 Q60,850 40,900 T40,1000" 
                vectorEffect="non-scaling-stroke"
                fill="none" 
                stroke="#1a4d33" 
                strokeWidth="2" 
             />
             {/* Golden Fill Line */}
             <path 
                d="M40,0 Q60,50 40,100 T40,200 Q20,250 40,300 T40,400 Q60,450 40,500 T40,600 Q20,650 40,700 T40,800 Q60,850 40,900 T40,1000" 
                vectorEffect="non-scaling-stroke"
                fill="none" 
                stroke="#FFD700" 
                strokeWidth="2"
                strokeDasharray="1000" 
                strokeDashoffset={1000 - (scrollProgress * 1000)}
                className="transition-all duration-100 ease-out drop-shadow-[0_0_8px_#FFD700]"
             />
        </svg>
      </div>

      <div className="sticky top-0 h-[100dvh] flex flex-col items-center justify-center overflow-hidden">
        <h2 className="absolute top-8 md:top-12 text-2xl md:text-5xl font-display text-transparent bg-clip-text bg-gradient-to-r from-emerald-200 via-white to-emerald-200 z-20 text-center w-full px-4 drop-shadow-sm">
            The Vows
        </h2>

        {/* 3D Floating Emerald Heart Container */}
        <div className="relative w-72 h-72 md:w-96 md:h-96 z-10 perspective-1000 animate-float">
             {/* Heart SVG */}
             <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-[0_0_50px_rgba(80,200,120,0.3)]">
                <defs>
                    <linearGradient id="emeraldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#50C878" />
                        <stop offset="100%" stopColor="#051a0f" />
                    </linearGradient>
                    <filter id="goldGlow">
                        <feGaussianBlur stdDeviation="1" result="coloredBlur"/>
                        <feMerge>
                            <feMergeNode in="coloredBlur"/>
                            <feMergeNode in="SourceGraphic"/>
                        </feMerge>
                    </filter>
                </defs>
                
                {/* Base Heart */}
                <path 
                    d={heartPath} 
                    fill="url(#emeraldGrad)" 
                    stroke="#1a4d33" 
                    strokeWidth="0.5" 
                />
                
                {/* Cracks Logic */}
                {vows.map((vow, i) => {
                     // Calculate local progress for this specific crack
                     // Map global progress 0.1->0.3 to local 0->1
                     let localProgress = (scrollProgress - vow.progressStart) / (vow.progressEnd - vow.progressStart);
                     localProgress = Math.max(0, Math.min(1, localProgress));
                     
                     const dashArray = 40; 
                     const dashOffset = dashArray - (dashArray * localProgress);

                     return (
                        <g key={i}>
                            {/* Dark Crack Base (The Wound) */}
                            <path d={vow.crackPath} fill="none" stroke="#000" strokeWidth="2" strokeLinecap="round" opacity="0.6" />
                            
                            {/* Liquid Gold Fill (The Healing) */}
                            <path 
                                d={vow.crackPath} 
                                fill="none" 
                                stroke="#FFD700" 
                                strokeWidth="2" 
                                strokeDasharray={dashArray}
                                strokeDashoffset={dashOffset}
                                strokeLinecap="round"
                                filter="url(#goldGlow)"
                                style={{ transition: 'stroke-dashoffset 0.1s linear' }}
                            />
                        </g>
                     );
                })}
             </svg>
        </div>

        {/* Text Cards Overlay */}
        <div className="absolute inset-0 pointer-events-none flex flex-col justify-center items-center z-30">
            {vows.map((vow, i) => {
                const isActive = scrollProgress > vow.progressStart && scrollProgress < vow.progressEnd + 0.15;
                
                return (
                    <div 
                        key={i}
                        className={`absolute w-[90%] md:w-[600px] glass-panel p-6 md:p-8 rounded-2xl transition-all duration-700 ease-out
                            ${isActive ? 'opacity-100 translate-y-24 md:translate-y-32 scale-100' : 'opacity-0 translate-y-40 scale-95'}
                        `}
                        style={{
                            backdropFilter: 'blur(16px)',
                            backgroundColor: 'rgba(0,0,0,0.6)'
                        }}
                    >
                        <div className="flex flex-col gap-4">
                            {/* The Memory (Left) */}
                            <div className="border-l-2 border-red-500/40 pl-4 py-1">
                                <span className="text-[10px] uppercase tracking-[0.2em] text-red-400 block mb-1">The Memory</span>
                                <p className="font-mono text-gray-400 italic text-sm md:text-base">"{vow.memory}"</p>
                            </div>
                            
                            {/* The Promise (Right/Gold) */}
                            <div className={`transition-all duration-1000 delay-500 ${isActive ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'}`}>
                                <div className="border-l-2 border-yellow-500 pl-4 py-1">
                                    <span className="text-[10px] uppercase tracking-[0.2em] text-yellow-500 block mb-1">The Promise</span>
                                    <p className="font-display text-emerald-100 text-lg md:text-xl leading-relaxed drop-shadow-md">
                                        {vow.promise}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            })}
        </div>
        
        {/* Helper Text */}
        <div className={`absolute bottom-8 text-emerald-500/40 text-[10px] uppercase tracking-widest animate-pulse transition-opacity duration-500 ${scrollProgress > 0.95 ? 'opacity-0' : 'opacity-100'}`}>
            Scroll to heal the heart
        </div>

      </div>
    </div>
  );
};
