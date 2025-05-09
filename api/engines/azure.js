const { OpenAIClient, AzureKeyCredential } = require('@azure/openai');
const { SUMMARIZATION_PROMPT } = require('../prompts');

class AzureEngine {
    constructor() {
        console.log('Initialisation du client Azure OpenAI avec:', {
            endpoint: process.env.AZURE_OPENAI_ENDPOINT,
            deploymentName: process.env.AZURE_OPENAI_DEPLOYMENT_NAME,
            apiVersion: process.env.AZURE_OPENAI_API_VERSION
        });

        this.client = new OpenAIClient(
            process.env.AZURE_OPENAI_ENDPOINT,
            new AzureKeyCredential(process.env.AZURE_OPENAI_KEY)
        );
        this.deploymentName = process.env.AZURE_OPENAI_DEPLOYMENT_NAME;
        this.apiVersion = process.env.AZURE_OPENAI_API_VERSION;
    }

    async summarize(text) {
        try {
            console.log('Préparation de la requête Azure OpenAI...');
            const messages = [
                {
                    role: "system",
                    content: SUMMARIZATION_PROMPT.system
                },
                {
                    role: "user",
                    content: SUMMARIZATION_PROMPT.user(text)
                }
            ];

            console.log('Envoi de la requête à Azure OpenAI...');
            const response = await this.client.getChatCompletions(
                this.deploymentName,
                messages,
                {
                    temperature: 0.7,
                    maxTokens: 350,
                    apiVersion: this.apiVersion
                }
            );

            console.log('Réponse reçue de Azure OpenAI:', {
                hasChoices: !!response.choices,
                choicesLength: response.choices?.length
            });

            if (!response.choices || response.choices.length === 0) {
                throw new Error("Aucune réponse reçue de l'API");
            }

            return {
                success: true,
                summary: response.choices[0].message.content
            };
        } catch (error) {
            console.error("Erreur détaillée Azure OpenAI:", {
                message: error.message,
                name: error.name,
                stack: error.stack
            });
            return {
                success: false,
                error: error.message || "Une erreur est survenue lors de la communication avec Azure OpenAI"
            };
        }
    }
}

module.exports = AzureEngine; 