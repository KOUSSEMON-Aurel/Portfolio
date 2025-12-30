#!/usr/bin/env node

/**
 * 🧪 Test rapide de FormSubmit
 * Lancez ce script pour tester l'intégration FormSubmit
 */

const https = require('https');

console.log('🧪 Test de FormSubmit...\n');

// Test data
const testData = {
  name: 'Test User',
  email: 'test@example.com',
  subject: 'Test FormSubmit Integration',
  message: 'Ceci est un test automatique de l\'intégration FormSubmit.',
  _captcha: 'false',
  _subject: 'Portfolio Test: Test FormSubmit Integration'
};

const formData = new URLSearchParams();
Object.entries(testData).forEach(([key, value]) => {
  formData.append(key, value);
});

const options = {
  hostname: 'formsubmit.co',
  path: '/ajax/koussemonaurel@gmail.com',
  method: 'POST',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
    'Content-Length': Buffer.byteLength(formData.toString())
  }
};

console.log('📤 Envoi des données de test...');
console.log('Données:', JSON.stringify(testData, null, 2));

const req = https.request(options, (res) => {
  let data = '';

  res.on('data', (chunk) => {
    data += chunk;
  });

  res.on('end', () => {
    try {
      const response = JSON.parse(data);
      console.log('\n📥 Réponse FormSubmit:');
      console.log(JSON.stringify(response, null, 2));

      if (response.success) {
        console.log('\n✅ Test réussi ! FormSubmit fonctionne correctement.');
        console.log('📧 Vérifiez votre boîte mail koussemonaurel@gmail.com pour le message de test.');
      } else {
        console.log('\n❌ Test échoué. Vérifiez la configuration.');
      }
    } catch (error) {
      console.log('\n❌ Erreur de parsing JSON:', error.message);
      console.log('Réponse brute:', data);
    }
  });
});

req.on('error', (error) => {
  console.error('\n❌ Erreur réseau:', error.message);
});

req.write(formData.toString());
req.end();