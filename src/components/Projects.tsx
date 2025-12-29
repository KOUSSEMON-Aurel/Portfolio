import { motion } from 'motion/react';
import { ExternalLink, Github } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

export function Projects() {
  const projects = [
    {
      title: 'IFRI Covoiturage',
      description: 'Plateforme de covoiturage universitaire avec matching géographique (Leaflet), auth sécurisée, système de trajets et messagerie. Stack: Django, PostgreSQL, JS.',
      tags: ['Django', 'PostgreSQL', 'Leaflet', 'Auth'],
      image: 'car sharing map',
      link: '#',
      github: '#'
    },
    {
      title: 'Security Write-ups Collection',
      description: 'Collection de write-ups détaillés sur OWASP Top 10 : XSS, SQLi, CSRF, JWT, mauvaises configs Django. Chaque write-up inclut contexte, exploitation et mitigation.',
      tags: ['OWASP', 'Pentesting', 'Documentation'],
      image: 'security documentation',
      link: '#',
      github: '#'
    },
    {
      title: 'Django Security Audit Tool',
      description: 'Scanner Python pour auditer les projets Django : détection de DEBUG=True, CSRF désactivé, secrets exposés, permissions mal configurées. Rapport détaillé en sortie.',
      tags: ['Python', 'Security', 'Automation'],
      image: 'code security audit',
      link: '#',
      github: '#'
    },
    {
      title: 'API REST Sécurisée',
      description: 'API Django REST Framework avec JWT, rate limiting, permissions granulaires, validation stricte. Documentation OpenAPI et tests de sécurité inclus.',
      tags: ['DRF', 'JWT', 'API Security'],
      image: 'api technology secure',
      link: '#',
      github: '#'
    },
    {
      title: 'Système d\'Auth Multi-Facteurs',
      description: 'Système d\'authentification Django avec MFA (TOTP), rate limiting, verrouillage après échecs, reset sécurisé. Implémentation from scratch pour comprendre les mécanismes.',
      tags: ['Django', 'MFA', 'Security'],
      image: 'authentication security',
      link: '#',
      github: '#'
    },
    {
      title: 'Automation Scripts Collection',
      description: 'Suite de scripts Python pour automatisation quotidienne : backup automatique, monitoring, web scraping éthique, déploiement. Utilisés en production sur Arch Linux.',
      tags: ['Python', 'Automation', 'DevOps'],
      image: 'automation scripts code',
      link: '#',
      github: '#'
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
            <span className="text-theme-accent-secondary">04.</span> Projets
          </div>
          <h2 className="text-4xl sm:text-5xl mb-12">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-theme-accent to-theme-accent-secondary">
              Réalisations notables
            </span>
          </h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            {projects.map((project, index) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ 
                  y: -10,
                  transition: { duration: 0.3 }
                }}
                className="bg-gradient-to-br from-cyan-500/5 to-purple-500/5 border border-cyan-500/30 rounded-lg overflow-hidden hover:border-cyan-400 hover:shadow-[0_0_20px_rgba(34,211,238,0.3)] transition-all group"
              >
                <div className="relative h-48 overflow-hidden bg-theme-bg/60">
                  <ImageWithFallback
                    src={`https://source.unsplash.com/800x600/?${project.image}`}
                    alt={project.title}
                    className="w-full h-full object-cover opacity-60 group-hover:opacity-80 group-hover:scale-110 transition-all duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-theme-bg/80 to-transparent" />
                  
                  {/* Scanning line effect */}
                  <motion.div
                    initial={{ y: -100 }}
                    whileHover={{ y: 300 }}
                    transition={{ duration: 1, repeat: Infinity }}
                    className="absolute inset-x-0 h-20 bg-gradient-to-b from-transparent via-theme-accent/30 to-transparent"
                  />
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl mb-3 text-theme-accent">{project.title}</h3>
                  <p className="text-theme-secondary mb-4">{project.description}</p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.map((tag) => (
                      <span 
                        key={tag}
                        className="px-3 py-1 bg-theme-accent/10 border border-theme-accent/30 rounded text-xs text-theme-accent font-mono"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex gap-4">
                    <a 
                      href={project.link}
                      className="flex items-center gap-2 text-theme-accent hover:text-theme-accent-secondary transition-colors text-sm"
                    >
                      <ExternalLink className="w-4 h-4" />
                      <span>Voir le projet</span>
                    </a>
                    <a 
                      href={project.github}
                      className="flex items-center gap-2 text-theme-accent hover:text-theme-accent-secondary transition-colors text-sm"
                    >
                      <Github className="w-4 h-4" />
                      <span>Code source</span>
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}