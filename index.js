// Charger les variables d'environnement en premier
require('dotenv').config();

// Vérifier les variables d'environnement requises
const requiredEnvVars = [
    'AZURE_OPENAI_KEY',
    'AZURE_OPENAI_ENDPOINT',
    'AZURE_OPENAI_DEPLOYMENT_NAME',
    'AZURE_OPENAI_API_VERSION'
];

const missingVars = requiredEnvVars.filter(varName => !process.env[varName]);
if (missingVars.length > 0) {
    console.error('Variables d\'environnement manquantes:', missingVars);
    process.exit(1);
}

const express = require('express');
const path = require('path');
const app = express();

// Middleware pour parser le JSON
app.use(express.json());

// Servir les fichiers statiques du dossier public
app.use(express.static('public'));

// Rediriger la racine vers demo.html
app.get('/', (req, res) => {
    res.redirect('/demo.html');
});

// Route pour l'API de résumé
app.post('/api/summarize', require('./api/summarize'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Serveur démarré sur le port ${PORT}`);
    console.log('Variables d\'environnement chargées:', {
        AZURE_OPENAI_ENDPOINT: process.env.AZURE_OPENAI_ENDPOINT,
        AZURE_OPENAI_DEPLOYMENT_NAME: process.env.AZURE_OPENAI_DEPLOYMENT_NAME,
        AZURE_OPENAI_API_VERSION: process.env.AZURE_OPENAI_API_VERSION,
        AZURE_OPENAI_KEY: process.env.AZURE_OPENAI_KEY ? 'présent' : 'manquant'
    });
}); 