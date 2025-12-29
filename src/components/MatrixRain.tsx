import { useEffect, useRef } from 'react';
import { useTheme } from '../contexts/ThemeContext';

export function MatrixRain() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { theme } = useTheme();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const chars = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン';
    const fontSize = 14;
    const columns = canvas.width / fontSize;
    const drops: number[] = [];

    for (let i = 0; i < columns; i++) {
      drops[i] = Math.random() * -100;
    }

    function draw() {
      if (!ctx || !canvas) return;
      
      // Adjust opacity based on theme
      ctx.fillStyle = theme === 'dark' ? 'rgba(0, 0, 0, 0.05)' : 'rgba(248, 250, 252, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        const text = chars[Math.floor(Math.random() * chars.length)];
        // Vary colors
        const colorIndex = i % 4;
        if (theme === 'dark') {
          ctx.fillStyle = colorIndex === 0 ? '#0ff' : colorIndex === 1 ? '#0f0' : colorIndex === 2 ? '#f0f' : '#ff0';
        } else {
          ctx.fillStyle = colorIndex === 0 ? '#0891b2' : colorIndex === 1 ? '#059669' : colorIndex === 2 ? '#7c3aed' : '#ea580c';
        }
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    }

    const interval = setInterval(draw, 50);

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    return () => {
      clearInterval(interval);
      window.removeEventListener('resize', handleResize);
    };
  }, [theme]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none opacity-10"
      style={{ zIndex: 1 }}
    />
  );
}