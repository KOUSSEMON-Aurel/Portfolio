import { motion } from 'motion/react';
import { Trophy, Flag, Target, Zap } from 'lucide-react';

export function CTFBadges() {
  const badges = [
    { 
      icon: Trophy, 
      label: 'CTF Master', 
      description: '50+ challenges résolus',
      color: 'from-yellow-500 to-orange-500'
    },
    { 
      icon: Flag, 
      label: 'Web Pwner', 
      description: 'OWASP Top 10 maîtrisé',
      color: 'from-cyan-500 to-blue-500'
    },
    { 
      icon: Target, 
      label: 'Bug Hunter', 
      description: '100+ vulns trouvées',
      color: 'from-red-500 to-pink-500'
    },
    { 
      icon: Zap, 
      label: 'Speed Hacker', 
      description: 'Top 10% TryHackMe',
      color: 'from-purple-500 to-indigo-500'
    }
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {badges.map((badge, index) => (
        <motion.div
          key={badge.label}
          initial={{ opacity: 0, scale: 0.8, rotateY: -180 }}
          whileInView={{ opacity: 1, scale: 1, rotateY: 0 }}
          viewport={{ once: true }}
          transition={{ 
            delay: index * 0.1,
            type: 'spring',
            stiffness: 200,
            damping: 15
          }}
          whileHover={{ 
            scale: 1.05, 
            rotateZ: [0, -5, 5, 0],
            transition: { duration: 0.3 }
          }}
          className="relative group"
        >
          <div className={`absolute inset-0 bg-gradient-to-br ${badge.color} opacity-20 blur-xl group-hover:opacity-40 transition-opacity rounded-lg`} />
          
          <div className="relative bg-theme-nav/90 border border-theme-accent/30 rounded-lg p-4 text-center group-hover:border-theme-accent transition-all">
            <badge.icon className="w-10 h-10 mx-auto mb-2 text-theme-accent group-hover:scale-110 transition-transform" />
            <div className="text-sm text-theme-accent mb-1">{badge.label}</div>
            <div className="text-xs text-theme-secondary">{badge.description}</div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
