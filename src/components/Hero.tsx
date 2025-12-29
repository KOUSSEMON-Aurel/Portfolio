import { motion } from 'motion/react';
import { Github, Linkedin, Mail, ChevronDown, Terminal as TerminalIcon } from 'lucide-react';
import { GlitchText } from './GlitchText';
import { TypingEffect } from './TypingEffect';
import { TerminalAnimation } from './TerminalAnimation';

export function Hero() {
  const scrollToAbout = () => {
    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative px-4">
      <div className="max-w-6xl w-full grid md:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-6"
        >
          <div className="font-mono text-theme-accent text-sm flex items-center gap-2">
            <TerminalIcon className="w-4 h-4" />
            <TypingEffect text="$ whoami" />
          </div>
          
          <GlitchText text="Alex Dubois" className="text-5xl sm:text-6xl lg:text-7xl font-bold text-theme-text" />
          
          <div className="font-mono text-lg sm:text-xl text-theme-secondary flex items-center gap-2">
            <span className="text-theme-accent-secondary">&gt;</span>
            <TypingEffect 
              text="Étudiant Cybersécurité | Full-Stack Django/JS | Arch Linux" 
              delay={1000}
            />
          </div>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
            className="text-theme-secondary max-w-2xl"
          >
            Licence informatique spécialité cybersécurité.
            Je construis des systèmes web sécurisés et automatisés avec Django/PostgreSQL/JS.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2 }}
            className="flex gap-4 pt-4"
          >
            <motion.a 
              href="https://github.com" 
              target="_blank" 
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1, rotate: 5 }}
              whileTap={{ scale: 0.9 }}
              className="p-3 border border-theme-accent/30 hover:border-theme-accent hover:bg-theme-accent/10 rounded-lg transition-all group"
            >
              <Github className="w-6 h-6 text-theme-accent" />
            </motion.a>
            <motion.a 
              href="https://linkedin.com" 
              target="_blank" 
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1, rotate: 5 }}
              whileTap={{ scale: 0.9 }}
              className="p-3 border border-theme-accent/30 hover:border-theme-accent hover:bg-theme-accent/10 rounded-lg transition-all group"
            >
              <Linkedin className="w-6 h-6 text-theme-accent" />
            </motion.a>
            <motion.a 
              href="mailto:contact@example.com"
              whileHover={{ scale: 1.1, rotate: 5 }}
              whileTap={{ scale: 0.9 }}
              className="p-3 border border-theme-accent/30 hover:border-theme-accent hover:bg-theme-accent/10 rounded-lg transition-all group"
            >
              <Mail className="w-6 h-6 text-theme-accent" />
            </motion.a>
          </motion.div>
        </motion.div>
        
        {/* Terminal Animation */}
        <div className="hidden md:block">
          <TerminalAnimation />
        </div>
      </div>
      
      <motion.button
        onClick={scrollToAbout}
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-theme-accent hover:text-theme-accent-secondary"
      >
        <ChevronDown className="w-8 h-8" />
      </motion.button>
    </div>
  );
}