import React, { useState, useEffect } from 'react';
import { Eye } from 'lucide-react';

export const SeenCounter: React.FC = () => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    // Simulate checking a database
    const saved = localStorage.getItem('saby_seen_count');
    const newCount = saved ? parseInt(saved) + 1 : 1;
    localStorage.setItem('saby_seen_count', newCount.toString());
    setCount(newCount);
  }, []);

  return (
    <div className="fixed top-4 right-4 z-50 group">
        <div className="bg-black/80 backdrop-blur-md border border-sapphire-900/50 rounded-full px-3 py-1 flex items-center gap-2 text-xs font-mono text-sapphire-400 cursor-help transition-all w-8 hover:w-auto overflow-hidden">
            <Eye size={12} className="shrink-0" />
            <span className="whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                Seen: {count} times (But I never left)
            </span>
        </div>
    </div>
  );
};
