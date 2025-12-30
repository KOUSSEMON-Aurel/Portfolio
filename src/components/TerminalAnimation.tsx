import { useState, useEffect } from 'react';
import { motion } from 'motion/react';

export function TerminalAnimation() {
  const [lines, setLines] = useState<string[]>([]);
  const [currentLineIndex, setCurrentLineIndex] = useState(0);

  const terminalCommands = [
    '$ whoami',
    'alex@archlinux ~ cybersecurity-student',
    '$ cat skills.txt',
    'Django | PostgreSQL | JavaScript | Python',
    'OWASP Top 10 | CTF | Pentesting',
    '$ ls projects/',
    'ifri-covoiturage/ django-audit/ api-rest/ mfa-auth/',
    '$ python3 scan_vulnerabilities.py',
    '[+] Scanning for OWASP Top 10...',
    '[+] XSS: SECURED ✓',
    '[+] SQLi: SECURED ✓',
    '[+] CSRF: SECURED ✓',
    '$ docker-compose up -d',
    '✓ Database container started',
    '✓ Web server running on :8000',
    '$ git push origin main',
    'Deployment successful! 🚀'
  ];

  useEffect(() => {
    if (currentLineIndex < terminalCommands.length) {
      const timeout = setTimeout(() => {
        setLines((prev) => [...prev, terminalCommands[currentLineIndex]]);
        setCurrentLineIndex((prev) => prev + 1);
      }, 800);

      return () => clearTimeout(timeout);
    }
  }, [currentLineIndex]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
      className="bg-theme-nav border border-theme-accent/50 rounded-lg p-3 md:p-4 font-mono text-sm max-h-72 md:max-h-96 overflow-y-auto backdrop-blur-sm"
    >
      <div className="flex items-center gap-2 mb-3 pb-2 border-b border-theme-accent/30">
        <div className="w-3 h-3 rounded-full bg-red-500"></div>
        <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
        <div className="w-3 h-3 rounded-full bg-green-500"></div>
        <span className="ml-2 text-theme-secondary">terminal</span>
      </div>
      
      {lines.map((line, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.2 }}
          className={
            line.startsWith('$') 
              ? 'text-theme-accent' 
              : line.includes('✓') 
              ? 'text-theme-accent' 
              : line.startsWith('[+]')
              ? 'text-theme-accent-secondary'
              : 'text-theme-secondary'
          }
        >
          {line}
        </motion.div>
      ))}
      
      {currentLineIndex < terminalCommands.length && (
        <motion.span
          animate={{ opacity: [1, 0, 1] }}
          transition={{ repeat: Infinity, duration: 1 }}
          className="text-theme-accent"
        >
          _
        </motion.span>
      )}
    </motion.div>
  );
}
