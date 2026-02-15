import React, { useState, useEffect } from 'react';

export const Watchface: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    // Set Target: Summer Break (e.g., June 1st of the current/next year)
    const now = new Date();
    let targetYear = now.getFullYear();
    const targetMonth = 1; // June (0-indexed)
    
    // If we are past June, aim for next year
    if (now.getMonth() > targetMonth) {
        targetYear++;
    }

    const targetDate = new Date(targetYear, targetMonth, 23);

    const interval = setInterval(() => {
        const current = new Date();
        const difference = targetDate.getTime() - current.getTime();

        if (difference > 0) {
            setTimeLeft({
                days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                minutes: Math.floor((difference / 1000 / 60) % 60),
                seconds: Math.floor((difference / 1000) % 60)
            });
        }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="py-24 flex flex-col items-center justify-center bg-gradient-to-b from-black to-[#020510]">
        <h2 className="text-xl md:text-2xl font-display text-gray-400 mb-10 tracking-widest text-center px-4">THE WATCHFACE OF ETERNITY</h2>
        
        <div className="glass-panel p-6 md:p-12 rounded-3xl border-2 border-emerald/50 shadow-[0_0_50px_rgba(80,200,120,0.1)] mx-4">
            <div className="flex gap-3 md:gap-8 font-digital text-emerald neon-text-emerald justify-center items-start">
                <div className="flex flex-col items-center w-14 md:w-auto">
                    <span className="text-3xl md:text-7xl font-black">{timeLeft.days.toString().padStart(2, '0')}</span>
                    <span className="text-[10px] md:text-sm text-emerald-800 uppercase mt-2">Days</span>
                </div>
                <div className="text-3xl md:text-7xl animate-pulse pt-1">:</div>
                <div className="flex flex-col items-center w-14 md:w-auto">
                    <span className="text-3xl md:text-7xl font-black">{timeLeft.hours.toString().padStart(2, '0')}</span>
                    <span className="text-[10px] md:text-sm text-emerald-800 uppercase mt-2">Hours</span>
                </div>
                <div className="text-3xl md:text-7xl animate-pulse pt-1">:</div>
                <div className="flex flex-col items-center w-14 md:w-auto">
                    <span className="text-3xl md:text-7xl font-black">{timeLeft.minutes.toString().padStart(2, '0')}</span>
                    <span className="text-[10px] md:text-sm text-emerald-800 uppercase mt-2">Mins</span>
                </div>
                 <div className="text-3xl md:text-7xl animate-pulse pt-1 hidden md:block">:</div>
                <div className="flex flex-col items-center w-14 md:w-auto hidden md:flex">
                    <span className="text-3xl md:text-7xl font-black">{timeLeft.seconds.toString().padStart(2, '0')}</span>
                    <span className="text-[10px] md:text-sm text-emerald-800 uppercase mt-2">Secs</span>
                </div>
            </div>
            {/* Mobile Seconds Display */}
            <div className="md:hidden flex justify-center mt-6 pt-4 border-t border-emerald/20">
                 <div className="flex items-center gap-2 font-digital text-emerald">
                    <span className="text-2xl font-black">{timeLeft.seconds.toString().padStart(2, '0')}</span>
                    <span className="text-[10px] uppercase opacity-70">Seconds</span>
                 </div>
            </div>
        </div>

        <p className="mt-8 font-mono text-emerald/60 text-xs md:text-sm text-center max-w-md px-6">
            "Tick-tock. The war ends in {timeLeft.days} days. Then, the silence is ours."
        </p>
    </div>
  );
};