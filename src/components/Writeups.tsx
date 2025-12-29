import { motion } from 'motion/react';
import { FileText, ExternalLink } from 'lucide-react';

export function Writeups() {
  const writeups = [
    {
      title: 'XSS Stocké sur Application Django',
      description: 'Exploitation d\'une absence d\'échappement dans les templates Django. Payload, impact et correction avec escape() + CSP.',
      date: 'Déc 2024',
      tags: ['XSS', 'Django', 'Templates'],
      link: '#'
    },
    {
      title: 'SQL Injection Manuelle - Exploitation & Mitigation',
      description: 'Exploitation pas à pas d\'une SQLi classique, extraction de données, et correction avec ORM Django et requêtes paramétrées.',
      date: 'Nov 2024',
      tags: ['SQLi', 'Database', 'OWASP'],
      link: '#'
    },
    {
      title: 'CSRF sur API Django - Mauvaise Config',
      description: 'Analyse d\'une faille CSRF due à CSRF_TRUSTED_ORIGINS mal configuré. Exploitation et bonnes pratiques Django.',
      date: 'Nov 2024',
      tags: ['CSRF', 'Django', 'API'],
      link: '#'
    },
    {
      title: 'JWT Mal Implémenté - Failles Courantes',
      description: 'Tour d\'horizon des erreurs courantes : none algorithm, secret faible, pas de refresh token. Solutions et best practices.',
      date: 'Oct 2024',
      tags: ['JWT', 'Auth', 'API'],
      link: '#'
    },
    {
      title: 'DEBUG=True en Production - Audit Django',
      description: 'Risques d\'avoir DEBUG activé en prod : exposition de secrets, stack traces. Checklist de sécurité Django complète.',
      date: 'Oct 2024',
      tags: ['Django', 'Config', 'Hardening'],
      link: '#'
    },
    {
      title: 'Rate Limiting - Absence et Exploitation',
      description: 'Démonstration de brute force sur login sans rate limit. Implémentation de solutions avec django-ratelimit.',
      date: 'Sep 2024',
      tags: ['Brute Force', 'Rate Limit', 'Auth'],
      link: '#'
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
            <span className="text-theme-accent-secondary">03.</span> Write-ups
          </div>
          <h2 className="text-4xl sm:text-5xl mb-6">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-theme-accent to-theme-accent-secondary">
              Documentation sécurité
            </span>
          </h2>
          <p className="text-theme-secondary mb-12 max-w-3xl">
            Write-ups détaillés sur les vulnérabilités web courantes. Chaque article couvre 
            le contexte, l'exploitation technique et les méthodes de correction.
          </p>
          
          <div className="grid md:grid-cols-2 gap-6">
            {writeups.map((writeup, index) => (
              <motion.a
                key={writeup.title}
                href={writeup.link}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ 
                  scale: 1.03,
                  boxShadow: '0 0 30px rgba(34, 211, 238, 0.4)',
                  transition: { duration: 0.2 }
                }}
                className="bg-gradient-to-br from-theme-accent/5 to-theme-accent-secondary/5 border border-theme-accent/30 rounded-lg p-6 hover:border-theme-accent transition-all group block"
              >
                <div className="flex items-start justify-between mb-3">
                  <FileText className="w-6 h-6 text-theme-accent group-hover:scale-110 transition-transform" />
                  <span className="text-xs text-theme-secondary font-mono">{writeup.date}</span>
                </div>
                
                <h3 className="text-lg mb-2 text-theme-accent group-hover:text-theme-accent-secondary transition-colors">
                  {writeup.title}
                </h3>
                
                <p className="text-theme-secondary text-sm mb-4">
                  {writeup.description}
                </p>
                
                <div className="flex flex-wrap gap-2 mb-3">
                  {writeup.tags.map((tag) => (
                    <span 
                      key={tag}
                      className="px-2 py-1 bg-theme-accent/10 border border-theme-accent/30 rounded text-xs text-theme-accent font-mono"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                
                <div className="flex items-center gap-2 text-theme-accent text-sm">
                  <span>Lire le write-up</span>
                  <ExternalLink className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </motion.a>
            ))}
          </div>
          
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="mt-8 p-6 bg-gradient-to-r from-theme-accent/10 to-theme-accent-secondary/10 border border-theme-accent/30 rounded-lg"
          >
            <div className="flex items-start gap-4">
              <div className="text-theme-accent text-4xl">📚</div>
              <div>
                <h3 className="text-theme-accent mb-2">Ressources & Formation</h3>
                <p className="text-theme-secondary text-sm mb-2">
                  Mes ressources préférées pour apprendre la sécurité web :
                </p>
                <ul className="text-theme-secondary text-sm space-y-1 font-mono">
                  <li className="flex items-center gap-2">
                    <span className="text-theme-accent-secondary">&gt;</span>
                    PortSwigger Web Security Academy (gratuit)
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-theme-accent-secondary">&gt;</span>
                    OWASP Top 10 - Documentation officielle
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-theme-accent-secondary">&gt;</span>
                    TryHackMe - CTF Web Security
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-theme-accent-secondary">&gt;</span>
                    Django Security Checklist
                  </li>
                </ul>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}