import React, { useEffect, useRef } from 'react';

export const LightTrails: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    interface Trail {
      x: number;
      y: number;
      length: number;
      speed: number;
      color: string;
      width: number;
    }

    const trails: Trail[] = [];
    const numTrails = 50;
    const colors = ['rgba(80, 200, 120, 0.2)', 'rgba(15, 82, 186, 0.2)', 'rgba(255, 255, 255, 0.1)'];

    for (let i = 0; i < numTrails; i++) {
      trails.push({
        x: Math.random() * width,
        y: Math.random() * height,
        length: Math.random() * 200 + 50,
        speed: Math.random() * 2 + 0.5,
        color: colors[Math.floor(Math.random() * colors.length)],
        width: Math.random() * 2 + 0.5,
      });
    }

    let scrollSpeed = 0;
    let lastScrollY = window.scrollY;
    let animationId: number;

    const render = () => {
      // Create trails effect by clearing with low opacity
      ctx.fillStyle = 'rgba(5, 5, 8, 0.3)'; // Slightly clear to leave trails
      ctx.fillRect(0, 0, width, height);

      // Decaying scroll influence
      scrollSpeed *= 0.95;

      const velocity = 1 + Math.abs(scrollSpeed) * 0.1;

      for (const trail of trails) {
        // Move trail
        trail.x += trail.speed * velocity;

        // Reset if off screen
        if (trail.x > width + trail.length) {
          trail.x = -trail.length;
          trail.y = Math.random() * height;
        }

        // Draw Trail
        const gradient = ctx.createLinearGradient(trail.x, trail.y, trail.x - trail.length * velocity, trail.y);
        gradient.addColorStop(0, trail.color);
        gradient.addColorStop(1, 'rgba(0,0,0,0)');

        ctx.beginPath();
        ctx.strokeStyle = gradient;
        ctx.lineWidth = trail.width;
        ctx.lineCap = 'round';
        ctx.moveTo(trail.x, trail.y);
        ctx.lineTo(trail.x - trail.length * velocity, trail.y);
        ctx.stroke();
      }

      animationId = requestAnimationFrame(render);
    };

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const delta = currentScrollY - lastScrollY;
      scrollSpeed = delta;
      lastScrollY = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    });

    render();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full z-0 pointer-events-none mix-blend-screen"
      style={{ opacity: 0.8 }}
    />
  );
};
