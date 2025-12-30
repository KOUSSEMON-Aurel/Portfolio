import { Terminal } from 'lucide-react';
import { motion } from 'motion/react';
import { useState } from 'react';
import { Menu, X, Sun, Moon } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

interface NavigationProps {
  activeSection: string;
}

export function Navigation({ activeSection }: NavigationProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  const links = [
    { id: 'home', label: 'Accueil' },
    { id: 'about', label: 'À propos' },
    { id: 'skills', label: 'Compétences' },
    { id: 'writeups', label: 'Write-ups' },
    { id: 'projects', label: 'Projets' },
    { id: 'contact', label: 'Contact' }
  ];

  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const navHeight = 64; // h-16 = 4rem = 64px
      const elementPosition = element.offsetTop - navHeight;
      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth'
      });
    }
    setIsMenuOpen(false);
  };

  return (
    <>
      <motion.nav 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="fixed top-0 left-0 right-0 z-50 bg-theme-nav backdrop-blur-xl border-b border-theme-border shadow-lg"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <motion.div 
              className="flex items-center gap-2 cursor-pointer"
              whileHover={{ scale: 1.05 }}
              onClick={() => scrollTo('home')}
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
              >
                <Terminal className="w-6 h-6 text-gradient-primary" />
              </motion.div>
              <span className="font-mono text-theme-accent font-bold text-sm sm:text-base">
                root@portfolio<span className="text-theme-primary">:~$</span>
              </span>
            </motion.div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-1">
              {links.map((link, index) => (
                <motion.button
                  key={link.id}
                  onClick={() => scrollTo(link.id)}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`relative px-4 py-2 font-mono text-sm rounded-lg transition-all ${
                    activeSection === link.id 
                      ? 'text-theme-accent bg-theme-accent-bg' 
                      : 'text-theme-secondary hover:text-theme-accent hover:bg-theme-hover'
                  }`}
                >
                  {link.label}
                  {activeSection === link.id && (
                    <motion.div
                      layoutId="activeSection"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </motion.button>
              ))}
            </div>

            {/* Theme Toggle & Hamburger */}
            <div className="flex items-center gap-2">
              <motion.button
                onClick={toggleTheme}
                whileHover={{ scale: 1.1, rotate: 180 }}
                whileTap={{ scale: 0.9 }}
                className="p-2 rounded-lg bg-theme-accent-bg border border-theme-border hover:border-theme-accent transition-all"
                aria-label="Toggle theme"
              >
                {theme === 'dark' ? (
                  <Sun className="w-5 h-5 text-theme-accent" />
                ) : (
                  <Moon className="w-5 h-5 text-theme-accent-secondary" />
                )}
              </motion.button>

              {/* Hamburger Menu Button */}
              <motion.button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="md:hidden p-2 rounded-lg bg-theme-accent-bg border border-theme-border hover:border-theme-accent transition-all"
                aria-label="Toggle menu"
              >
                {isMenuOpen ? (
                  <X className="w-6 h-6 text-theme-accent" />
                ) : (
                  <Menu className="w-6 h-6 text-theme-accent" />
                )}
              </motion.button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <motion.div
          initial={false}
          animate={{ 
            maxHeight: isMenuOpen ? 500 : 0,
            opacity: isMenuOpen ? 1 : 0
          }}
          transition={{ duration: 0.3 }}
          className="md:hidden overflow-hidden border-t border-theme-border"
        >
          <div className="px-4 py-4 space-y-2 bg-theme-nav-mobile">
            {links.map((link, index) => (
              <motion.button
                key={link.id}
                onClick={() => scrollTo(link.id)}
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: isMenuOpen ? index * 0.05 : 0 }}
                whileHover={{ x: 10 }}
                className={`w-full text-left px-4 py-3 rounded-lg font-mono transition-all ${
                  activeSection === link.id
                    ? 'text-theme-accent bg-theme-accent-bg border-l-4 border-theme-accent'
                    : 'text-theme-secondary hover:text-theme-accent hover:bg-theme-hover border-l-4 border-transparent'
                }`}
              >
                <span className="text-theme-primary mr-2">&gt;</span>
                {link.label}
              </motion.button>
            ))}
          </div>
        </motion.div>
      </motion.nav>

      {/* Overlay when menu is open */}
      {isMenuOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsMenuOpen(false)}
          className="fixed inset-0 bg-theme-bg/80 backdrop-blur-sm z-40 md:hidden"
        />
      )}
    </>
  );
}
