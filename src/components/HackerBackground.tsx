import { motion, AnimatePresence } from 'motion/react';
import { useEffect, useState } from 'react';

export function HackerBackground() {
  const [words, setWords] = useState<Array<{ id: number; text: string; x: number; y: number; color: string }>>([]);
  
  const hackerTerms = [
    // CTF
    'CTF{flag_captured}', 'pwn', 'crypto', 'forensics', 'web', 'reverse',
    // Hacking
    'XSS', 'SQLi', 'CSRF', 'RCE', 'LFI', 'SSRF', '0day', 'exploit',
    'payload', 'shell', 'reverse-shell', 'privilege-escalation',
    // DevSecOps
    'CI/CD', 'DevSecOps', 'pipeline', 'docker', 'kubernetes',
    'security-scan', 'SAST', 'DAST', 'vulnerability-scan',
    // Full Stack
    'Django', 'PostgreSQL', 'REST API', 'JWT', 'WebSocket',
    'React', 'Node.js', 'MongoDB', 'Redis', 'GraphQL',
    // Security Tools
    'Burp Suite', 'Metasploit', 'nmap', 'wireshark', 'hydra',
    'OWASP', 'ZAP', 'nikto', 'sqlmap', 'John',
    // Linux/DevOps
    'Arch Linux', 'bash', 'vim', 'grep', 'sed', 'awk',
    'ssh', 'nginx', 'apache', 'iptables',
    // Programming
    'Python', 'JavaScript', 'Go', 'Rust', 'C', 'assembly',
    // Concepts
    'buffer-overflow', 'heap-spray', 'rop-chain', 'format-string',
    'race-condition', 'injection', 'deserialization'
  ];

  const colors = [
    '#22d3ee', // cyan
    '#a855f7', // purple
    '#10b981', // green
    '#f59e0b', // amber
    '#ef4444', // red
    '#3b82f6', // blue
    '#ec4899', // pink
    '#14b8a6'  // teal
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      const newWord = {
        id: Date.now(),
        text: hackerTerms[Math.floor(Math.random() * hackerTerms.length)],
        x: Math.random() * 100,
        y: Math.random() * 100,
        color: colors[Math.floor(Math.random() * colors.length)]
      };

      setWords(prev => [...prev, newWord]);

      setTimeout(() => {
        setWords(prev => prev.filter(w => w.id !== newWord.id));
      }, 4000);
    }, 600);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 1 }}>
      <AnimatePresence>
        {words.map(word => (
          <motion.div
            key={word.id}
            initial={{ opacity: 0, scale: 0.5, rotateX: -90 }}
            animate={{ 
              opacity: [0, 0.3, 0.3, 0],
              scale: [0.5, 1, 1, 1.2],
              rotateX: [-90, 0, 0, 90]
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 4, ease: 'easeInOut' }}
            className="absolute font-mono text-xs md:text-sm select-none"
            style={{
              left: `${word.x}%`,
              top: `${word.y}%`,
              color: word.color,
              textShadow: `0 0 10px ${word.color}`
            }}
          >
            {word.text}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
