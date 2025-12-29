import { motion } from 'motion/react';
import { GitBranch, Shield, Rocket, Server, Lock, CheckCircle } from 'lucide-react';

export function DevSecOpsTimeline() {
  const stages = [
    {
      icon: GitBranch,
      title: 'Dev',
      description: 'Code sécurisé',
      tools: ['Django', 'Git', 'VSCode'],
      color: 'cyan'
    },
    {
      icon: Shield,
      title: 'Sec',
      description: 'Tests sécurité',
      tools: ['OWASP ZAP', 'Bandit', 'SonarQube'],
      color: 'purple'
    },
    {
      icon: Server,
      title: 'Ops',
      description: 'Déploiement',
      tools: ['Docker', 'Nginx', 'PostgreSQL'],
      color: 'blue'
    },
    {
      icon: Lock,
      title: 'Monitor',
      description: 'Surveillance',
      tools: ['Logs', 'Alerts', 'Metrics'],
      color: 'green'
    }
  ];

  return (
    <div className="relative">
      {/* Line connecting all stages */}
      <div className="absolute top-12 left-0 right-0 h-0.5 bg-gradient-to-r from-cyan-500 via-purple-500 to-green-500 opacity-30" />
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {stages.map((stage, index) => (
          <motion.div
            key={stage.title}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.2 }}
            className="relative"
          >
            {/* Animated icon circle */}
            <motion.div
              whileHover={{ scale: 1.1, rotate: 360 }}
              transition={{ duration: 0.5 }}
              className={`w-24 h-24 mx-auto mb-4 rounded-full bg-gradient-to-br from-${stage.color}-500/20 to-${stage.color}-600/20 border-2 border-${stage.color}-500/50 flex items-center justify-center relative z-10`}
            >
              <stage.icon className={`w-10 h-10 text-${stage.color}-400`} />
              
              {/* Pulse effect */}
              <motion.div
                animate={{ 
                  scale: [1, 1.5, 1],
                  opacity: [0.5, 0, 0.5]
                }}
                transition={{ 
                  repeat: Infinity, 
                  duration: 2,
                  delay: index * 0.3
                }}
                className={`absolute inset-0 rounded-full border-2 border-${stage.color}-400`}
              />
            </motion.div>

            <div className="text-center">
              <h3 className={`text-xl mb-2 text-${stage.color}-400`}>{stage.title}</h3>
              <p className="text-theme-secondary text-sm mb-3">{stage.description}</p>
              
              <div className="space-y-1">
                {stage.tools.map((tool) => (
                  <motion.div
                    key={tool}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.2 + 0.3 }}
                    className="text-xs text-theme-secondary font-mono flex items-center justify-center gap-1"
                  >
                    <CheckCircle className="w-3 h-3 text-theme-accent" />
                    {tool}
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
