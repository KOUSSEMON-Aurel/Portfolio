import { motion } from 'motion/react';
import { Shield, Code, Award, Target } from 'lucide-react';
import { CTFBadges } from './CTFBadges';

export function About() {
  const stats = [
    { icon: Shield, label: 'Write-ups sécurité', value: '20+' },
    { icon: Code, label: 'Projets Django', value: '10+' },
    { icon: Award, label: 'CTF résolus', value: '50+' },
    { icon: Target, label: 'Vulnérabilités testées', value: 'OWASP 10' }
  ];

  return (
    <div className="min-h-screen flex items-center py-20 px-4">
      <div className="max-w-6xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="font-mono text-theme-accent mb-2">
            <span className="text-theme-accent-secondary">01.</span> À propos
          </div>
          <h2 className="text-4xl sm:text-5xl mb-12">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-theme-accent to-theme-accent-secondary">
              Qui suis-je ?
            </span>
          </h2>
          
          <div className="grid md:grid-cols-2 gap-12 mb-16">
            <div className="space-y-4 text-theme-secondary">
              <p>
                Étudiant en licence informatique avec spécialisation en cybersécurité,
                je me passionne pour le développement web sécurisé et l'automatisation.
                Mon approche combine sécurité offensive et développement pour créer
                des applications robustes.
              </p>
              <p>
                Stack principale : <span className="text-theme-accent">Django + PostgreSQL + JavaScript</span>.
                J'utilise Arch Linux au quotidien et je documente mes découvertes
                en sécurité à travers des write-ups détaillés.
              </p>
              <p>
                Mes projets vont de l'audit de sécurité OWASP à la création d'applications
                full-stack, en passant par l'automatisation et le scripting Python.
                Je privilégie toujours la sécurité dès la conception.
              </p>
            </div>
            
            <div className="relative">
              <motion.div 
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
                className="aspect-square bg-gradient-to-br from-cyan-500/20 to-purple-500/20 rounded-lg border border-cyan-500/30 overflow-hidden relative group"
              >
                <div className="absolute inset-0 bg-theme-bg/70 group-hover:bg-theme-bg/50 transition-colors" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <motion.div
                    animate={{ 
                      rotate: 360,
                      scale: [1, 1.1, 1]
                    }}
                    transition={{ 
                      rotate: { duration: 20, repeat: Infinity, ease: 'linear' },
                      scale: { duration: 2, repeat: Infinity }
                    }}
                  >
                    <Shield className="w-32 h-32 text-theme-accent/30 group-hover:text-theme-accent/50 transition-colors" />
                  </motion.div>
                </div>
                
                {/* Scanning effect */}
                <motion.div
                  animate={{ y: [0, 400, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
                  className="absolute inset-x-0 h-32 bg-gradient-to-b from-transparent via-theme-accent/20 to-transparent"
                />
              </motion.div>
              <div className="absolute -inset-2 border border-theme-accent/30 rounded-lg -z-10 translate-x-4 translate-y-4" />
            </div>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ 
                  y: -5,
                  boxShadow: '0 0 30px rgba(8, 145, 178, 0.3)'
                }}
                className="bg-gradient-to-br from-theme-accent/10 to-theme-accent-secondary/10 border border-theme-accent/30 rounded-lg p-6 transition-colors"
              >
                <motion.div
                  whileHover={{ rotate: 360, scale: 1.2 }}
                  transition={{ duration: 0.5 }}
                >
                  <stat.icon className="w-8 h-8 text-theme-accent mb-3" />
                </motion.div>
                <div className="text-3xl font-mono text-theme-accent mb-1">{stat.value}</div>
                <div className="text-sm text-theme-secondary">{stat.label}</div>
              </motion.div>
            ))}
          </div>

          {/* CTF Badges */}
          <div className="mb-8">
            <h3 className="text-2xl mb-6 text-theme-accent flex items-center gap-2">
              <span className="text-theme-accent-secondary">{'>'}</span> Achievements & CTF
            </h3>
            <CTFBadges />
          </div>
        </motion.div>
      </div>
    </div>
  );
}