import { motion } from 'motion/react';
import { Shield, Code, Network, Database, Lock, Terminal } from 'lucide-react';
import { DevSecOpsTimeline } from './DevSecOpsTimeline';

export function Skills() {
  const skillCategories = [
    {
      title: 'Sécurité Web',
      icon: Shield,
      skills: ['OWASP Top 10', 'XSS / CSRF / SQLi', 'Auth sécurisée', 'CTF / Write-ups', 'Audit Django']
    },
    {
      title: 'Backend',
      icon: Code,
      skills: ['Django / DRF', 'PostgreSQL', 'API REST', 'Python', 'JWT / Sessions']
    },
    {
      title: 'Frontend',
      icon: Network,
      skills: ['JavaScript ES6+', 'HTML/CSS', 'Fetch API', 'DOM Manipulation', 'Responsive Design']
    },
    {
      title: 'DevOps / Outils',
      icon: Terminal,
      skills: ['Arch Linux', 'Git / GitHub', 'Docker', 'Nginx', 'SSH / Bash']
    },
    {
      title: 'Automatisation',
      icon: Database,
      skills: ['Scripts Python', 'Web Scraping', 'Bots', 'CI/CD', 'Task Automation']
    },
    {
      title: 'Méthodologie',
      icon: Lock,
      skills: ['Documentation', 'Tests', 'Security First', 'Clean Code', 'Agile']
    }
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
            <span className="text-theme-accent-secondary">02.</span> Compétences
          </div>
          <h2 className="text-4xl sm:text-5xl mb-12">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-theme-accent to-theme-accent-secondary">
              Mon arsenal technique
            </span>
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {skillCategories.map((category, index) => (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ 
                  scale: 1.05,
                  rotate: [0, 1, -1, 0],
                  transition: { duration: 0.3 }
                }}
                className="bg-gradient-to-br from-theme-accent/5 to-theme-accent-secondary/5 border border-theme-accent/30 rounded-lg p-6 hover:border-theme-accent hover:shadow-[0_0_20px_rgba(8,145,178,0.3)] transition-all group"
              >
                <motion.div
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                >
                  <category.icon className="w-10 h-10 text-theme-accent mb-4" />
                </motion.div>
                <h3 className="text-xl mb-4 text-theme-accent">{category.title}</h3>
                <ul className="space-y-2">
                  {category.skills.map((skill, skillIndex) => (
                    <motion.li 
                      key={skill} 
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 + skillIndex * 0.05 }}
                      className="text-theme-secondary font-mono text-sm flex items-center gap-2"
                    >
                      <motion.span 
                        animate={{ opacity: [0.5, 1, 0.5] }}
                        transition={{ duration: 2, repeat: Infinity, delay: skillIndex * 0.2 }}
                        className="text-theme-accent-secondary"
                      >
                        &gt;
                      </motion.span>
                      {skill}
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>

          {/* DevSecOps Timeline */}
          <div className="mt-20">
            <h3 className="text-3xl mb-8 text-center">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">
                Pipeline DevSecOps
              </span>
            </h3>
            <DevSecOpsTimeline />
          </div>
        </motion.div>
      </div>
    </div>
  );
}