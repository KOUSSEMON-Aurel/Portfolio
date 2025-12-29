import { useState, useEffect } from 'react';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Skills } from './components/Skills';
import { Writeups } from './components/Writeups';
import { Projects } from './components/Projects';
import { Contact } from './components/Contact';
import { Navigation } from './components/Navigation';
import { MatrixRain } from './components/MatrixRain';
import { HackerBackground } from './components/HackerBackground';
import { ThemeProvider } from './contexts/ThemeContext';

export default function App() {
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'skills', 'writeups', 'projects', 'contact'];
      const current = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      if (current) setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <ThemeProvider>
      <div className="bg-theme-bg min-h-screen text-theme-text relative overflow-hidden transition-colors duration-300">
        {/* Matrix rain effect */}
        <MatrixRain />
        
        {/* Hacker terms background */}
        <HackerBackground />
        
        {/* Background grid effect */}
        <div className="fixed inset-0 bg-theme-grid pointer-events-none" style={{ zIndex: 2 }} />
        
        {/* Gradient orbs */}
        <div className="fixed top-0 left-0 w-96 h-96 bg-gradient-orb-1 rounded-full blur-[120px] pointer-events-none opacity-30" />
        <div className="fixed bottom-0 right-0 w-96 h-96 bg-gradient-orb-2 rounded-full blur-[120px] pointer-events-none opacity-30" />
        <div className="fixed top-1/2 left-1/2 w-96 h-96 bg-gradient-orb-3 rounded-full blur-[150px] pointer-events-none opacity-20" />
        
        <Navigation activeSection={activeSection} />
        
        <main className="relative z-10">
          <section id="home">
            <Hero />
          </section>
          <section id="about">
            <About />
          </section>
          <section id="skills">
            <Skills />
          </section>
          <section id="writeups">
            <Writeups />
          </section>
          <section id="projects">
            <Projects />
          </section>
          <section id="contact">
            <Contact />
          </section>
        </main>
      </div>
    </ThemeProvider>
  );
}