import React, { useState } from 'react';
import { Starfield } from './components/Starfield';
import { LightTrails } from './components/LightTrails';
import { Landing } from './components/Landing';
import { KintsugiGallery } from './components/KintsugiGallery';
import { Library } from './components/Library';
import { Watchface } from './components/Watchface';
import { TerminalLove } from './components/TerminalLove';
import { SnakeSentinel } from './components/SnakeSentinel';
import { SeenCounter } from './components/SeenCounter';
import { MotionSection } from './components/MotionSection';

const App: React.FC = () => {
  const [unlocked, setUnlocked] = useState(false);

  return (
    <div className="text-gray-200 relative min-h-screen bg-[#050508]">
      {/* Background Layers */}
      <Starfield />
      <LightTrails />
      
      {!unlocked ? (
        <Landing onUnlock={() => setUnlocked(true)} />
      ) : (
        <div className="animate-in fade-in duration-1000">
          <SeenCounter />
          
          {/* Secret Button: The Steering Wheel */}
          <div className="fixed bottom-6 left-6 z-50 group">
             <div className="relative">
                <div className="absolute bottom-full left-0 mb-3 w-64 p-3 bg-black/90 border border-emerald/30 rounded-lg text-[10px] md:text-xs font-mono text-emerald-100 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none shadow-[0_0_20px_rgba(80,200,120,0.1)]">
                    "In the race of my life, you aren't the finish line. You are the destination."
                    <div className="absolute bottom-0 left-4 translate-y-1/2 rotate-45 w-2 h-2 bg-black border-r border-b border-emerald/30"></div>
                </div>
                
                <button className="p-3 bg-white/5 hover:bg-white/10 rounded-full border border-white/10 hover:border-emerald/50 transition-all duration-300 group-hover:rotate-180">
                     <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-emerald-400">
                        <circle cx="12" cy="12" r="10" />
                        <circle cx="12" cy="12" r="3" />
                        <path d="M12 15V22" />
                        <path d="M12 9V2" />
                        <path d="M2.5 9.5L9 12" />
                        <path d="M21.5 9.5L15 12" />
                     </svg>
                </button>
             </div>
          </div>

          {/* Content with Motion Blur Entry */}
          <main className="relative z-10">
            {/* The Kintsugi Gallery is its own scroll container, so we wrap it lightly or let it handle its own internal logic. 
                Wrapping it in MotionSection ensures the initial entry has the blur effect. */}
            <MotionSection>
                <KintsugiGallery />
            </MotionSection>

            <MotionSection>
                <Library />
            </MotionSection>

            <MotionSection>
                <Watchface />
            </MotionSection>

            <MotionSection>
                <TerminalLove />
            </MotionSection>
          </main>
          
          <SnakeSentinel />

          {/* Footer */}
          <footer className="py-12 text-center text-xs font-mono text-gray-600 relative z-10">
            <p>Built with &lt;3 code &amp; stardust.</p>
            <p className="mt-2 text-emerald-900">Project: SAFE_HAVEN_FINAL_BUILD</p>
          </footer>
        </div>
      )}
    </div>
  );
};

export default App;
