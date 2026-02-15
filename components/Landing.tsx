import React, { useState } from 'react';
import { Lock, Fingerprint, Key, Sparkles } from 'lucide-react';

interface LandingProps {
  onUnlock: () => void;
}

export const Landing: React.FC<LandingProps> = ({ onUnlock }) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const [isMerged, setIsMerged] = useState(false);

  const handleUnlock = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanPass = password.toLowerCase().trim();
    if (cleanPass === 'iniibig' || cleanPass === 'saby' || cleanPass === 'srabanee') {
      onUnlock();
    } else {
      setError(true);
      setTimeout(() => setError(false), 1000);
    }
  };

  return (
    <div className="min-h-[100dvh] w-full flex flex-col items-center justify-center relative overflow-hidden z-10 px-4 py-8">
      
      {/* Merging Orbs Interaction Zone */}
      <div 
        className="relative w-72 h-72 mb-8 md:mb-12 cursor-pointer group select-none tap-highlight-transparent"
        onClick={() => setIsMerged(!isMerged)}
      >
        {/* Hint Text */}
        <div className={`absolute -top-10 left-0 right-0 text-center transition-all duration-700 ${isMerged ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'}`}>
            <span className="text-emerald-400/80 text-[10px] md:text-xs font-mono tracking-[0.2em] animate-pulse flex items-center justify-center gap-2">
                <Sparkles size={12} className="text-sapphire" />
                TAP TO MERGE
                <Sparkles size={12} className="text-emerald" />
            </span>
        </div>

        {/* Emerald Orb (The Guardian) */}
        <div 
          className={`absolute w-36 h-36 md:w-40 md:h-40 rounded-full blur-[40px] transition-all duration-[1200ms] ease-[cubic-bezier(0.2,0.8,0.2,1)] mix-blend-screen
            ${isMerged 
              ? 'top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gradient-to-tr from-emerald via-emerald-400 to-white scale-125 opacity-100 shadow-[0_0_100px_rgba(80,200,120,0.6)]' 
              : 'top-0 left-4 bg-emerald animate-float opacity-60'
            }
          `}
        />
        
        {/* Sapphire Orb (The Muse) */}
        <div 
          className={`absolute w-36 h-36 md:w-40 md:h-40 rounded-full blur-[40px] transition-all duration-[1200ms] ease-[cubic-bezier(0.2,0.8,0.2,1)] mix-blend-screen
            ${isMerged 
              ? 'top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gradient-to-bl from-sapphire via-blue-500 to-white scale-125 opacity-100 shadow-[0_0_100px_rgba(15,82,186,0.6)]' 
              : 'bottom-0 right-4 bg-sapphire animate-pulse-slow opacity-60 delay-150'
            }
          `}
        />

        {/* Core Brightness when merged */}
        <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 bg-white rounded-full blur-xl transition-opacity duration-700 ${isMerged ? 'opacity-80' : 'opacity-0'}`} />
        
        {/* Text Overlay when merged */}
        <div className={`absolute inset-0 flex items-center justify-center pointer-events-none transition-all duration-1000 delay-200 ${isMerged ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}`}>
          <div className="text-center relative z-10">
            <span className="block text-white font-display text-3xl tracking-[0.2em] uppercase drop-shadow-[0_2px_10px_rgba(0,0,0,0.5)]">
              One Soul
            </span>
            <span className="block text-[10px] text-emerald-100 font-mono mt-2 tracking-widest uppercase opacity-80">
                Inseparable
            </span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-md text-center mb-10 space-y-4 px-4 relative z-20">
        <h1 className="text-2xl md:text-4xl font-display text-white/90 leading-tight">
          Luminous Darkness
        </h1>
        <p className="text-emerald-400/70 font-mono text-xs md:text-sm leading-relaxed">
          The distance is an illusion.<br/> 
          I am with you in the static.
        </p>
      </div>

      {/* Biometric Scan / Input */}
      <form onSubmit={handleUnlock} className="flex flex-col items-center gap-5 w-full max-w-[280px] z-20">
        <div className="relative w-full group">
            <div className={`absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none transition-colors duration-300 ${error ? 'text-red-500' : 'text-emerald group-focus-within:text-emerald-400'}`}>
                {error ? <Lock size={18} /> : <Key size={18} />}
            </div>
            <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Love (Tagalog but deep)"
                className={`w-full bg-black/40 border ${error ? 'border-red-500 animate-shake' : 'border-emerald/30 focus:border-emerald/80'} 
                rounded-full py-3.5 pl-11 pr-4 text-emerald-100 placeholder-emerald/40 outline-none backdrop-blur-md transition-all font-mono tracking-widest text-center text-sm shadow-lg focus:shadow-emerald/20`}
            />
        </div>

        <button 
            type="submit"
            className="group relative px-8 py-3.5 w-full bg-sapphire/10 overflow-hidden rounded-full border border-sapphire/30 active:scale-95 transition-all duration-200"
        >
            <div className="absolute inset-0 w-0 bg-gradient-to-r from-sapphire via-emerald to-sapphire transition-all duration-[400ms] ease-out group-hover:w-full opacity-30"></div>
            <span className="relative flex items-center justify-center gap-2 text-xs uppercase tracking-[0.2em] text-blue-200 group-hover:text-white font-bold">
                <Fingerprint size={14} /> Enter Sanctuary
            </span>
        </button>
      </form>
      
      <div className="absolute bottom-6 text-[10px] text-white/10 font-mono uppercase tracking-widest">
        System Status: Awaiting Connection
      </div>
    </div>
  );
};