import { useState, useEffect } from 'react';

interface TypingEffectProps {
  text: string;
  delay?: number;
  speed?: number;
}

export function TypingEffect({ text, delay = 0, speed = 50 }: TypingEffectProps) {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const startTimeout = setTimeout(() => {
      setStarted(true);
    }, delay);

    return () => clearTimeout(startTimeout);
  }, [delay]);

  useEffect(() => {
    if (!started) return;

    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, speed);

      return () => clearTimeout(timeout);
    }
  }, [currentIndex, text, speed, started]);

  return (
    <span>
      {displayText}
      {currentIndex < text.length && (
        <span className="animate-pulse">_</span>
      )}
    </span>
  );
}
