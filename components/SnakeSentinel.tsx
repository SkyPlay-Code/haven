import React, { useState } from 'react';

export const SnakeSentinel: React.FC = () => {
  const [clicked, setClicked] = useState(false);

  const handleClick = () => {
    setClicked(true);
    // Simple visual feedback instead of audio for stability
    const toast = document.createElement('div');
    toast.innerText = "🐍: *Hiss* I love you...";
    toast.className = "fixed bottom-10 right-10 bg-emerald-900 text-emerald-200 px-4 py-2 rounded-full border border-emerald-500 animate-float z-50 font-mono text-sm";
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 3000);
    setTimeout(() => setClicked(false), 2000);
  };

  return (
    <div 
        onClick={handleClick}
        className="fixed bottom-0 right-0 w-32 h-32 pointer-events-auto cursor-pointer z-40 group opacity-50 hover:opacity-100 transition-opacity"
        title="The Sentinel"
    >
        <svg viewBox="0 0 100 100" className="w-full h-full fill-none stroke-emerald-600 stroke-2">
            <path 
                d="M90,100 C90,80 80,80 80,60 C80,40 60,40 60,50" 
                className="transition-all duration-1000 group-hover:stroke-emerald-400"
            />
            {/* Head */}
            <circle cx="60" cy="50" r="3" className={`fill-emerald-500 ${clicked ? 'animate-ping' : ''}`} />
        </svg>
    </div>
  );
};
