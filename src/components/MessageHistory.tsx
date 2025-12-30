import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { MessageSquare, Calendar, User, Mail } from 'lucide-react';

interface Message {
  id?: string;
  name: string;
  email: string;
  message: string;
  date: string;
}

export function MessageHistory() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showHistory, setShowHistory] = useState(false);

  useEffect(() => {
    if (showHistory) {
      fetchMessages();
    }
  }, [showHistory]);

  const fetchMessages = async () => {
    try {
      setLoading(true);
      const response = await fetch('https://sheetdb.io/api/v1/elidbjd3mdw5m');
      if (!response.ok) {
        throw new Error('Failed to fetch messages');
      }
      const data = await response.json();
      // Trier par date décroissante (plus récent en premier)
      const sortedMessages = data.sort((a: Message, b: Message) =>
        new Date(b.date).getTime() - new Date(a.date).getTime()
      );
      setMessages(sortedMessages);
    } catch (err) {
      setError('Erreur lors du chargement des messages');
      console.error('Error fetching messages:', err);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (!showHistory) {
    return (
      <motion.button
        onClick={() => setShowHistory(true)}
        className="mt-8 px-4 py-2 bg-theme-accent/10 border border-theme-accent/30 rounded-lg text-theme-accent hover:bg-theme-accent/20 transition-colors font-mono text-sm"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        📬 Voir l'historique des messages
      </motion.button>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: 'auto' }}
      exit={{ opacity: 0, height: 0 }}
      className="mt-8 space-y-4"
    >
      <div className="flex items-center justify-between">
        <h3 className="text-theme-accent font-mono text-lg">📬 Historique des messages</h3>
        <button
          onClick={() => setShowHistory(false)}
          className="text-theme-secondary hover:text-theme-accent transition-colors"
        >
          ✕
        </button>
      </div>

      {loading && (
        <div className="text-center py-8">
          <div className="inline-block w-6 h-6 border-2 border-theme-accent border-t-transparent rounded-full animate-spin mb-2"></div>
          <p className="text-theme-secondary font-mono">Chargement...</p>
        </div>
      )}

      {error && (
        <div className="text-center py-8">
          <p className="text-red-400 font-mono">{error}</p>
        </div>
      )}

      {!loading && !error && messages.length === 0 && (
        <div className="text-center py-8">
          <p className="text-theme-secondary font-mono">Aucun message reçu pour le moment.</p>
        </div>
      )}

      <div className="space-y-3 max-h-96 overflow-y-auto">
        {messages.map((msg, index) => (
          <motion.div
            key={msg.id || index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-theme-nav/50 border border-theme-accent/20 rounded-lg p-4 space-y-2"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <User className="w-4 h-4 text-theme-accent" />
                <span className="text-theme-accent font-mono font-semibold">{msg.name}</span>
              </div>
              <div className="flex items-center gap-1 text-theme-secondary text-xs font-mono">
                <Calendar className="w-3 h-3" />
                {formatDate(msg.date)}
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-theme-accent-secondary" />
              <span className="text-theme-secondary font-mono text-sm">{msg.email}</span>
            </div>

            <div className="flex items-start gap-2">
              <MessageSquare className="w-4 h-4 text-theme-accent mt-0.5 flex-shrink-0" />
              <p className="text-theme-text font-mono text-sm leading-relaxed">{msg.message}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {messages.length > 0 && (
        <div className="text-center pt-4 border-t border-theme-accent/20">
          <p className="text-theme-secondary font-mono text-xs">
            {messages.length} message{messages.length > 1 ? 's' : ''} reçu{messages.length > 1 ? 's' : ''}
          </p>
        </div>
      )}
    </motion.div>
  );
}