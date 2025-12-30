import { motion } from 'motion/react';
import { Mail, MessageSquare, Send } from 'lucide-react';
import { useState } from 'react';
import emailjs from '@emailjs/browser';

export function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      // Configuration EmailJS avec variables d'environnement
      const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
      const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
      const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

      if (!serviceId || !templateId || !publicKey) {
        throw new Error('EmailJS configuration missing. Please check your environment variables.');
      }

      const templateParams = {
        from_name: formData.name,
        from_email: formData.email,
        message: formData.message,
        to_email: import.meta.env.VITE_CONTACT_EMAIL || 'contact@alexdubois.dev',
        reply_to: formData.email
      };

      // Envoi avec EmailJS
      await emailjs.send(
        serviceId,
        templateId,
        templateParams,
        publicKey
      );

      setSubmitStatus('success');
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      console.error('Error sending email:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

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
            <span className="text-theme-accent-secondary">05.</span> Contact
          </div>
          <h2 className="text-4xl sm:text-5xl mb-12">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-theme-accent to-theme-accent-secondary">
              Travaillons ensemble
            </span>
          </h2>
          
          <div className="grid md:grid-cols-2 gap-12">
            <div className="space-y-6">
              <p className="text-theme-secondary text-lg">
                Vous avez un projet de sécurité ? Besoin d'un audit ? 
                Ou simplement envie de discuter de cybersécurité ?
              </p>
              <p className="text-theme-secondary">
                Je suis toujours ouvert aux nouvelles opportunités et collaborations 
                intéressantes. N'hésitez pas à me contacter !
              </p>
              
              <div className="space-y-4 pt-6">
                <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-theme-accent/10 to-theme-accent-secondary/10 border border-theme-accent/30 rounded-lg">
                  <Mail className="w-6 h-6 text-theme-accent" />
                  <div>
                    <div className="text-sm text-theme-secondary font-mono">Email</div>
                    <div className="text-theme-accent">contact@alexdubois.dev</div>
                  </div>
                </div>
                
                <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-theme-accent/10 to-theme-accent-secondary/10 border border-theme-accent/30 rounded-lg">
                  <MessageSquare className="w-6 h-6 text-theme-accent" />
                  <div>
                    <div className="text-sm text-theme-secondary font-mono">Réponse</div>
                    <div className="text-theme-accent">Sous 24-48h</div>
                  </div>
                </div>
              </div>
            </div>
            
            <motion.form
              onSubmit={handleSubmit}
              className="space-y-4"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <div>
                <label htmlFor="name" className="block text-theme-accent font-mono text-sm mb-2">
                  $ echo $NAME
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full bg-theme-nav border border-theme-accent/30 rounded-lg px-4 py-3 text-theme-text focus:outline-none focus:border-theme-accent transition-colors font-mono"
                  placeholder="Votre nom"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-theme-accent font-mono text-sm mb-2">
                  $ echo $EMAIL
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full bg-theme-nav border border-theme-accent/30 rounded-lg px-4 py-3 text-theme-text focus:outline-none focus:border-theme-accent transition-colors font-mono"
                  placeholder="votre@email.com"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="message" className="block text-theme-accent font-mono text-sm mb-2">
                  $ cat message.txt
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={6}
                  className="w-full bg-theme-nav border border-theme-accent/30 rounded-lg px-4 py-3 text-theme-text focus:outline-none focus:border-theme-accent transition-colors font-mono resize-none"
                  placeholder="Votre message..."
                  required
                />
              </div>
              
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-theme-accent to-theme-accent-secondary hover:from-theme-accent-secondary hover:to-theme-accent text-theme-nav py-3 rounded-lg flex items-center justify-center gap-2 transition-all hover:shadow-[0_0_20px_rgba(8,145,178,0.5)] font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-theme-nav border-t-transparent rounded-full animate-spin" />
                    <span className="font-mono">Envoi en cours...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    <span className="font-mono">Envoyer le message</span>
                  </>
                )}
              </button>

              {submitStatus === 'success' && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-green-400 text-center font-mono text-sm"
                >
                  ✅ Message envoyé avec succès !
                </motion.div>
              )}

              {submitStatus === 'error' && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-red-400 text-center font-mono text-sm"
                >
                  ❌ Erreur lors de l'envoi. Réessayez ou contactez-moi directement.
                </motion.div>
              )}
            </motion.form>
          </div>
          
          <div className="mt-20 pt-10 border-t border-theme-accent/20 text-center">
            <p className="text-theme-secondary font-mono text-sm">
              © 2025 Alex Dubois. Construit avec React & Tailwind CSS
            </p>
            <p className="text-theme-accent/50 font-mono text-xs mt-2">
              root@portfolio:~$ exit
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}