# Guide d'envoi d'emails pour le portfolio

## 🚀 Solutions pour envoyer des vrais emails

### 1. **EmailJS (Recommandé - Côté client uniquement)**

#### Installation :
```bash
npm install @emailjs/browser
```

#### Configuration dans Contact.tsx :
```typescript
import emailjs from '@emailjs/browser';

// Dans le composant Contact
const sendEmail = async (formData) => {
  try {
    await emailjs.send(
      'YOUR_SERVICE_ID',     // Remplacer par votre Service ID
      'YOUR_TEMPLATE_ID',    // Remplacer par votre Template ID
      {
        from_name: formData.name,
        from_email: formData.email,
        message: formData.message,
        to_email: 'contact@alexdubois.dev'
      },
      'YOUR_PUBLIC_KEY'      // Remplacer par votre Public Key
    );
    console.log('Email sent successfully!');
  } catch (error) {
    console.error('Failed to send email:', error);
  }
};
```

#### Étapes pour obtenir les clés EmailJS :
1. Allez sur https://www.emailjs.com/
2. Créez un compte gratuit
3. Ajoutez votre service email (Gmail, Outlook, etc.)
4. Créez un template d'email
5. Copiez les IDs dans votre code

---

### 2. **Formspree (Ultra-simple)**

#### Installation :
```bash
npm install @formspree/react
```

#### Configuration :
```typescript
import { useForm, ValidationError } from '@formspree/react';

function ContactForm() {
  const [state, handleSubmit] = useForm("YOUR_FORM_ID");

  if (state.succeeded) {
    return <p>Thanks for your message!</p>;
  }

  return (
    <form onSubmit={handleSubmit}>
      {/* Vos champs existants */}
      <ValidationError prefix="Email" field="email" errors={state.errors} />
      <button type="submit" disabled={state.submitting}>
        Envoyer
      </button>
    </form>
  );
}
```

#### Avantages :
- ✅ Gratuit pour 50 emails/mois
- ✅ Pas de backend nécessaire
- ✅ Anti-spam intégré

---

### 3. **Backend Node.js/Express (Solution complète)**

#### Créer un serveur backend :
```javascript
// server.js
const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const transporter = nodemailer.createTransporter({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

app.post('/api/contact', async (req, res) => {
  const { name, email, message } = req.body;

  try {
    await transporter.sendMail({
      from: email,
      to: 'contact@alexdubois.dev',
      subject: `Nouveau message de ${name}`,
      text: message
    });
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Failed to send email' });
  }
});

app.listen(3001, () => console.log('Server running on port 3001'));
```

#### Variables d'environnement :
```bash
# .env
EMAIL_USER=votre-email@gmail.com
EMAIL_PASS=votre-mot-de-passe-app
```

---

### 4. **Services Cloud (Pour production)**

#### **Vercel Functions** (si déployé sur Vercel) :
```javascript
// api/contact.js
import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).end();
  }

  const { name, email, message } = req.body;

  // Configuration nodemailer similaire
  // ...

  res.status(200).json({ success: true });
}
```

#### **Netlify Functions** (si déployé sur Netlify) :
```javascript
// netlify/functions/contact.js
exports.handler = async (event) => {
  // Même logique que Vercel
};
```

---

## 🔧 Configuration recommandée : EmailJS

Pour commencer rapidement, je recommande **EmailJS** :

1. **Installez EmailJS :**
   ```bash
   npm install @emailjs/browser
   ```

2. **Modifiez Contact.tsx** pour ajouter l'envoi d'email réel

3. **Configurez votre compte EmailJS** et obtenez les clés

4. **Testez** l'envoi d'email

Voulez-vous que je vous aide à implémenter l'une de ces solutions ?