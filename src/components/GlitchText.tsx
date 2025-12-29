import { useState, useEffect } from 'react';

interface GlitchTextProps {
  text: string;
  className?: string;
}

export function GlitchText({ text, className = '' }: GlitchTextProps) {
  const [glitch, setGlitch] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setGlitch(true);
      setTimeout(() => setGlitch(false), 100);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className={`relative ${className}`}>
      <h1 className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-400 to-cyan-400">
        {text}
      </h1>
      {glitch && (
        <>
          <h1 
            className="absolute top-0 left-0 text-cyan-400 opacity-70"
            style={{ 
              transform: 'translate(-2px, -2px)',
              clipPath: 'polygon(0 0, 100% 0, 100% 45%, 0 45%)'
            }}
          >
            {text}
          </h1>
          <h1 
            className="absolute top-0 left-0 text-purple-400 opacity-70"
            style={{ 
              transform: 'translate(2px, 2px)',
              clipPath: 'polygon(0 55%, 100% 55%, 100% 100%, 0 100%)'
            }}
          >
            {text}
          </h1>
        </>
      )}
    </div>
  );
}
