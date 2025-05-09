# API de Résumé de Texte

Ce microservice permet de générer des résumés de texte en utilisant différents moteurs d'IA (Azure OpenAI, OpenAI, et bientôt Gemini).

## Configuration

1. Clonez ce dépôt
2. Installez les dépendances :
   ```bash
   npm install
   ```
3. Créez un fichier `.env` à la racine du projet avec les variables suivantes :
   ```
   AZURE_OPENAI_KEY=votre_clé_azure
   AZURE_OPENAI_ENDPOINT=votre_endpoint_azure
   AZURE_OPENAI_DEPLOYMENT_NAME=votre_nom_de_déploiement
   
   OPENAI_API_KEY=votre_clé_openai
   
   GEMINI_API_KEY=votre_clé_gemini
   ```

## Développement local

Pour lancer le serveur de développement :

```bash
npm run dev
```

## Déploiement

Le projet est configuré pour être déployé sur Vercel :

```bash
npm run deploy
```

## Utilisation de l'API

### Endpoint : POST /api/summarize

#### Paramètres de la requête :
- `text` (obligatoire) : Le texte à résumer
- `engine` (optionnel) : Le moteur à utiliser ('azure', 'openai', ou 'gemini'). Par défaut : 'azure'

#### Exemple de requête :
```bash
curl -X POST http://localhost:3000/api/summarize \
  -H "Content-Type: application/json" \
  -d '{"text": "Votre texte à résumer", "engine": "azure"}'
```

#### Réponse :
```json
{
  "success": true,
  "summary": "Le résumé généré",
  "engine": "azure"
}
```

## Interface de démonstration

Une interface de démonstration est disponible à l'URL `/demo.html` après le déploiement.

## Moteurs disponibles

- ✅ Azure OpenAI
- 🔜 OpenAI (bientôt disponible)
- 🔜 Gemini (bientôt disponible) 