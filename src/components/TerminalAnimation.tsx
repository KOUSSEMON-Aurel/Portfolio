import { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';

interface FileSystem {
  [path: string]: {
    type: 'file' | 'directory';
    content?: string;
    permissions?: string;
  };
}

export function TerminalAnimation() {
  const [lines, setLines] = useState<string[]>([]);
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [isInteractive, setIsInteractive] = useState(false);
  const [currentCommand, setCurrentCommand] = useState('');
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [currentDir, setCurrentDir] = useState('/home/godwill');
  const inputRef = useRef<HTMLInputElement>(null);

  // Système de fichiers virtuel
  const [fileSystem] = useState<FileSystem>({
    '/': { type: 'directory' },
    '/home': { type: 'directory' },
    '/home/godwill': { type: 'directory' },
    '/home/godwill/.bashrc': { 
      type: 'file', 
      content: 'export PATH=/usr/bin:/bin\nexport HOME=/home/godwill\nalias ll="ls -la"',
      permissions: '-rw-r--r--'
    },
    '/home/godwill/projects': { type: 'directory' },
    '/home/godwill/projects/portfolio': { type: 'directory' },
    '/home/godwill/projects/portfolio/package.json': { 
      type: 'file', 
      content: '{"name": "portfolio", "version": "1.0.0"}',
      permissions: '-rw-r--r--'
    },
    '/etc': { type: 'directory' },
    '/etc/passwd': { 
      type: 'file', 
      content: 'root:x:0:0:root:/root:/bin/bash\ngodwill:x:1000:1000:godwill:/home/godwill:/bin/bash',
      permissions: '-rw-r--r--'
    },
    '/bin': { type: 'directory' },
    '/usr/bin': { type: 'directory' }
  });

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
    'Deployment successful! 🚀',
    '$ echo "Ready for interactive mode..."',
    'Type commands below or press Enter for interactive terminal 🚀'
  ];

  // Commandes disponibles
  const commands = {
    whoami: () => 'godwill',
    pwd: () => currentDir,
    ls: (args: string[]) => {
      const path = args[0] || '.';
      const fullPath = path.startsWith('/') ? path : `${currentDir}/${path}`.replace(/\/+/g, '/');
      
      // Simuler ls basique
      if (fullPath === '/home/godwill' || fullPath === currentDir) {
        return '.bashrc\nprojects/';
      }
      if (fullPath.includes('projects')) {
        return 'portfolio/';
      }
      return 'ls: cannot access \'' + path + '\': No such file or directory';
    },
    cd: (args: string[]) => {
      const path = args[0] || '/home/godwill';
      if (path === '..') {
        const newPath = currentDir.split('/').slice(0, -1).join('/') || '/';
        setCurrentDir(newPath);
        return '';
      }
      const fullPath = path.startsWith('/') ? path : `${currentDir}/${path}`.replace(/\/+/g, '/');
      if (fileSystem[fullPath]?.type === 'directory') {
        setCurrentDir(fullPath);
        return '';
      }
      return `cd: ${path}: No such file or directory`;
    },
    cat: (args: string[]) => {
      const path = args[0];
      if (!path) return 'cat: missing file operand';
      
      const fullPath = path.startsWith('/') ? path : `${currentDir}/${path}`.replace(/\/+/g, '/');
      const file = fileSystem[fullPath];
      
      if (file?.type === 'file') {
        return file.content || '';
      }
      return `cat: ${path}: No such file or directory`;
    },
    echo: (args: string[]) => args.join(' '),
    clear: () => {
      setLines([]);
      return '';
    },
    help: () => 'Available commands: whoami, pwd, ls, cd, cat, echo, clear, help, neofetch',
    neofetch: () => `godwill@archlinux
----------------
OS: Arch Linux x86_64
Kernel: 6.6.7-arch1-1
Uptime: ${Math.floor(Math.random() * 24)} hours, ${Math.floor(Math.random() * 60)} mins
Packages: 1200 (pacman)
Shell: bash 5.2.21
Terminal: xterm-256color
CPU: AMD Ryzen 5 3600 (12) @ 3.600GHz
Memory: ${4 + Math.floor(Math.random() * 12)}GB / 16GB`
  };

  useEffect(() => {
    if (currentLineIndex < terminalCommands.length) {
      const timeout = setTimeout(() => {
        setLines((prev) => [...prev, terminalCommands[currentLineIndex]]);
        setCurrentLineIndex((prev) => prev + 1);
      }, currentLineIndex === terminalCommands.length - 1 ? 2000 : 800);

      return () => clearTimeout(timeout);
    } else {
      setIsInteractive(true);
    }
  }, [currentLineIndex]);

  const executeCommand = (cmd: string) => {
    const trimmedCmd = cmd.trim();
    if (!trimmedCmd) return;

    setCommandHistory(prev => [...prev, trimmedCmd]);
    setHistoryIndex(-1);

    const [command, ...args] = trimmedCmd.split(' ');
    const output = commands[command as keyof typeof commands]?.(args) || `bash: ${command}: command not found`;

    setLines(prev => [
      ...prev,
      `godwill@archlinux: ${currentDir.replace('/home/godwill', '~')}$ ${trimmedCmd}`,
      ...(output ? output.split('\n') : [])
    ]);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      executeCommand(currentCommand);
      setCurrentCommand('');
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (commandHistory.length > 0) {
        const newIndex = historyIndex === -1 ? commandHistory.length - 1 : Math.max(0, historyIndex - 1);
        setHistoryIndex(newIndex);
        setCurrentCommand(commandHistory[newIndex]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex >= 0) {
        const newIndex = historyIndex + 1;
        if (newIndex >= commandHistory.length) {
          setHistoryIndex(-1);
          setCurrentCommand('');
        } else {
          setHistoryIndex(newIndex);
          setCurrentCommand(commandHistory[newIndex]);
        }
      }
    }
  };

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
            line.startsWith('godwill@archlinux:') 
              ? 'text-theme-accent' 
              : line.startsWith('$') 
              ? 'text-theme-accent' 
              : line.includes('✓') 
              ? 'text-theme-accent' 
              : line.startsWith('[+]')
              ? 'text-theme-accent-secondary'
              : line.startsWith('bash:')
              ? 'text-red-400'
              : 'text-theme-secondary'
          }
        >
          {line}
        </motion.div>
      ))}
      
      {isInteractive && (
        <div className="flex items-center mt-2">
          <span className="text-theme-accent mr-1">
            godwill@archlinux:{currentDir.replace('/home/godwill', '~')}$ 
          </span>
          <input
            ref={inputRef}
            type="text"
            value={currentCommand}
            onChange={(e) => setCurrentCommand(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 bg-transparent border-none outline-none text-theme-secondary font-mono text-sm"
            placeholder="Type a command..."
            autoFocus
          />
          <motion.span
            animate={{ opacity: [1, 0, 1] }}
            transition={{ repeat: Infinity, duration: 1 }}
            className="text-theme-accent ml-1"
          >
            █
          </motion.span>
        </div>
      )}
      
      {!isInteractive && currentLineIndex < terminalCommands.length && (
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
