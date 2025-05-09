require('dotenv').config();
const cors = require('cors');
const AzureEngine = require('./engines/azure');

module.exports = async (req, res) => {
    console.log('Requête reçue:', {
        method: req.method,
        body: req.body,
        headers: req.headers
    });

    // Configuration CORS
    cors()(req, res, async () => {
        if (req.method !== 'POST') {
            return res.status(405).json({ error: 'Méthode non autorisée' });
        }

        try {
            const { text, engine = 'azure' } = req.body;
            console.log('Données reçues:', { text: text?.substring(0, 100) + '...', engine });

            if (!text) {
                return res.status(400).json({ error: 'Le texte à résumer est requis' });
            }

            // Vérification des variables d'environnement requises
            if (engine === 'azure') {
                const requiredEnvVars = [
                    'AZURE_OPENAI_KEY',
                    'AZURE_OPENAI_ENDPOINT',
                    'AZURE_OPENAI_DEPLOYMENT_NAME',
                    'AZURE_OPENAI_API_VERSION'
                ];

                const envVars = requiredEnvVars.reduce((acc, varName) => {
                    acc[varName] = process.env[varName] ? 'présent' : 'manquant';
                    return acc;
                }, {});

                console.log('Variables d\'environnement:', envVars);

                const missingVars = requiredEnvVars.filter(varName => !process.env[varName]);
                if (missingVars.length > 0) {
                    return res.status(500).json({
                        error: `Variables d'environnement manquantes : ${missingVars.join(', ')}`
                    });
                }
            }

            let result;
            switch (engine.toLowerCase()) {
                case 'azure':
                    console.log('Initialisation du moteur Azure...');
                    const azureEngine = new AzureEngine();
                    console.log('Appel de la méthode summarize...');
                    result = await azureEngine.summarize(text);
                    console.log('Résultat reçu:', result);
                    break;
                case 'openai':
                    return res.status(501).json({ error: 'Moteur OpenAI non encore implémenté' });
                case 'gemini':
                    return res.status(501).json({ error: 'Moteur Gemini non encore implémenté' });
                default:
                    return res.status(400).json({ error: 'Moteur non supporté' });
            }

            if (!result.success) {
                console.error('Erreur du moteur:', result.error);
                return res.status(500).json({ error: result.error });
            }

            return res.status(200).json({
                success: true,
                summary: result.summary,
                engine: engine
            });

        } catch (error) {
            console.error('Erreur serveur détaillée:', {
                message: error.message,
                stack: error.stack,
                name: error.name
            });
            return res.status(500).json({ 
                error: 'Erreur interne du serveur',
                details: error.message
            });
        }
    });
}; 