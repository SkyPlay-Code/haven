import React, { useState, useEffect, useRef } from 'react';
import { GitBranch, Code, Star } from 'lucide-react';

interface TerminalLine {
    text: string;
    type: 'comment' | 'output' | 'string' | 'command' | 'success' | 'spacer';
}

export const TerminalLove: React.FC = () => {
  const [lines, setLines] = useState<TerminalLine[]>([]);
  const terminalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && lines.length === 0) {
           runSequence();
        }
      },
      { threshold: 0.3 }
    );

    if (terminalRef.current) {
        observer.observe(terminalRef.current);
    }

    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lines]);

  const runSequence = async () => {
    const sequence = [
        { text: "// Initializing Connection...", delay: 500, type: 'comment' },
        { text: "Status: Soul-Tied.", delay: 1500, type: 'output' },
        { text: "Privacy: Locked.", delay: 2500, type: 'output' },
        { text: "", delay: 3000, type: 'spacer' },
        { text: `"Saby, they say code is cold, but mine is written in the temperature of your hand.`, delay: 4000, type: 'string' },
        { text: `I’ve written a while loop that only checks for one condition: Your Happiness.`, delay: 7000, type: 'string' },
        { text: `And because you are infinite, the loop will never end."`, delay: 10000, type: 'string' },
        { text: "", delay: 11500, type: 'spacer' },
        { text: "git commit -m \"Everything I am, for everything you are.\"", delay: 12500, type: 'command' },
        { text: "git push origin Heaven", delay: 14500, type: 'command' },
        { text: "Everything up to date.", delay: 16500, type: 'success' },
    ];

    let cumulativeDelay = 0;
    for (const step of sequence) {
        cumulativeDelay = step.delay;
        setTimeout(() => {
            setLines(prev => [...prev, step as TerminalLine]);
        }, cumulativeDelay);
    }
  };

  return (
    <div className="py-24 px-4 flex justify-center bg-[#020510] relative overflow-hidden">
        {/* Star Map Background Effect */}
        <div className="absolute inset-0 opacity-20 pointer-events-none">
            <div className="absolute top-10 left-10 text-emerald-500/40 animate-pulse"><Star size={8} /></div>
            <div className="absolute top-1/2 right-20 text-emerald-500/30 animate-pulse delay-700"><Star size={12} /></div>
            <div className="absolute bottom-20 left-1/3 text-sapphire-500/40 animate-pulse delay-300"><Star size={10} /></div>
             {/* Constellation Lines */}
            <svg className="absolute inset-0 w-full h-full opacity-10">
                <path d="M100,100 L300,300 L500,100" fill="none" stroke="#50C878" strokeWidth="1" strokeDasharray="5,5" />
            </svg>
        </div>

        <div ref={terminalRef} className="w-full max-w-3xl glass-panel border border-emerald-500/20 rounded-xl p-6 md:p-10 shadow-[0_0_40px_rgba(80,200,120,0.05)] relative z-10 bg-black/80 backdrop-blur-xl transition-all duration-500 hover:shadow-[0_0_60px_rgba(80,200,120,0.1)]">
             {/* Header */}
             <div className="flex items-center justify-between mb-6 border-b border-white/5 pb-4">
                <div className="flex items-center gap-3">
                    <Code size={18} className="text-emerald-400" />
                    <span className="text-emerald-500/80 font-mono text-[10px] md:text-xs tracking-[0.2em] uppercase">
                        Destiny.ts — Encapsulation Protocol
                    </span>
                </div>
                <div className="flex gap-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-500/40"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/40"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/40"></div>
                </div>
            </div>

            {/* Content */}
            <div className="font-mono text-xs md:text-sm lg:text-base space-y-3 min-h-[300px]">
                {lines.map((line, i) => (
                    <div key={i} className={`leading-relaxed break-words
                        ${line.type === 'comment' ? 'text-gray-500 italic' : ''}
                        ${line.type === 'output' ? 'text-emerald-400 font-bold' : ''}
                        ${line.type === 'string' ? 'text-emerald-100/90' : ''}
                        ${line.type === 'command' ? 'text-blue-400' : ''}
                        ${line.type === 'success' ? 'text-green-400' : ''}
                        ${line.type === 'spacer' ? 'h-2' : ''}
                    `}>
                        {line.text}
                    </div>
                ))}
                 <div className="animate-pulse text-emerald-500 inline-block w-2 h-4 bg-emerald-500 ml-1 align-middle shadow-[0_0_10px_#50C878]"></div>
            </div>
            
            {/* Footer */}
            <div className="mt-8 pt-4 border-t border-white/5 flex justify-between items-center opacity-60 hover:opacity-100 transition-opacity">
                <div className="text-[10px] text-gray-500 font-mono">
                    Ln {lines.length + 1}, Col 1
                </div>
                <div className="flex items-center gap-2 text-[10px] md:text-xs text-emerald-500/70 font-mono">
                    <GitBranch size={12} />
                    <span>origin/heaven</span>
                </div>
            </div>
        </div>
    </div>
  );
};
