import React, { useState, useEffect, useRef } from 'react';
import { CloudRain, BookOpen, Heart } from 'lucide-react';

export const Library: React.FC = () => {
  const [isRaining, setIsRaining] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Rain Effect
  useEffect(() => {
    if (!isRaining || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const drops: { x: number; y: number; speed: number; len: number }[] = [];
    const numDrops = 100;

    for (let i = 0; i < numDrops; i++) {
      drops.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        speed: Math.random() * 5 + 10,
        len: Math.random() * 20 + 10,
      });
    }

    let animationId: number;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.strokeStyle = '#0F52BA';
      ctx.lineWidth = 1;
      ctx.globalAlpha = 0.6;

      for (const drop of drops) {
        ctx.beginPath();
        ctx.moveTo(drop.x, drop.y);
        ctx.lineTo(drop.x, drop.y + drop.len);
        ctx.stroke();

        drop.y += drop.speed;

        if (drop.y > canvas.height) {
          drop.y = -drop.len;
          drop.x = Math.random() * canvas.width;
        }
      }
      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationId);
    };
  }, [isRaining]);

  const poem = {
    title: "The Constant Signal",
    body: `They see the Boss, the crown, the pride,
The mask you wear to run and hide,
But I saw the face that the silence keeps,
The ghost of the child that softly weeps.

I looked for you in a dream of old,
Before the world turned gray and cold,
A girl with short hair and a starlit gaze,
I found you again in this messy maze.

You’re 4-foot-ten, but you tower high,
The tallest soul beneath the sky,
And if you feel small or lost or thin,
I’ll wrap the universe around your skin.

I’ll kiss the palms of your tired hands,
And build the kingdom your heart demands,
No 'What If' ghosts or the unknown,
Just me and the truth that you’re meant for me.

So my Emerald, rest your brain,
I’ll be the umbrella in your rain,
Beyond the logic, the code, the art,
I’ve locked your soul inside my heart.`
  };

  return (
    <div className="min-h-screen relative py-20 px-4 md:px-20 border-t border-b border-white/5 bg-black/50">
      
      {/* Rain Canvas Overlay */}
      <canvas 
        ref={canvasRef} 
        className={`absolute inset-0 pointer-events-none transition-opacity duration-1000 ${isRaining ? 'opacity-100' : 'opacity-0'}`}
      />

      <div className="max-w-3xl mx-auto relative z-10">
        <div className="flex items-center justify-between mb-8 md:mb-12">
            <h2 className="text-xl md:text-3xl font-mono text-emerald-400 flex items-center gap-3">
                <BookOpen size={24} /> The Soul-Tied Verses
            </h2>
            <button 
                onClick={() => setIsRaining(!isRaining)}
                className={`flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 rounded-full border text-xs md:text-sm transition-all ${isRaining ? 'bg-sapphire-900/50 border-sapphire-400 text-sapphire-200' : 'border-white/20 text-gray-400 hover:text-white'}`}
            >
                <CloudRain size={16} /> {isRaining ? "Stop Rain" : "Let it Rain"}
            </button>
        </div>

        <div className="glass-panel p-6 md:p-12 relative overflow-hidden rounded-2xl">
            {/* Decorative Heart Watermark */}
             <div className="absolute top-0 right-0 p-6 opacity-10 pointer-events-none">
                <Heart size={120} className="text-emerald-500 fill-emerald-500" />
             </div>

            <div className="font-mono relative z-10">
                <div className="text-center md:text-left mb-8">
                    <h3 className="text-xl md:text-2xl text-emerald-300 mb-2 tracking-wider uppercase font-display inline-block border-b border-emerald-500/30 pb-2">
                        {poem.title}
                    </h3>
                </div>
                
                <div className="text-center md:text-left">
                    <pre className="whitespace-pre-wrap text-gray-200 font-display text-sm md:text-lg leading-relaxed md:leading-loose tracking-wide">
                        {poem.body}
                    </pre>
                </div>
                
                {isRaining && (
                    <div className="mt-8 text-center text-sapphire-300 text-xs md:text-sm animate-pulse italic">
                        (Listening to the digital rain...)
                    </div>
                )}
            </div>
        </div>
      </div>
    </div>
  );
};
