# 📝 Text Summarization API

Transform your long texts into concise, meaningful summaries using state-of-the-art AI models (Azure OpenAI, OpenAI, Gemini). This microservice is designed for easy integration into any project, with a simple REST API and multi-language support.

---

## 🚀 Quick Start

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/summarize_api.git
   cd summarize_api
   ```
2. **Install dependencies**
   ```bash
   npm install
   ```
3. **Create a `.env` file** at the project root with your API keys:
   ```env
   AZURE_OPENAI_KEY=your_azure_key
   AZURE_OPENAI_ENDPOINT=your_azure_endpoint
   AZURE_OPENAI_DEPLOYMENT_NAME=your_deployment_name
   AZURE_OPENAI_API_VERSION=your_api_version
   # For future engines
   OPENAI_API_KEY=your_openai_key
   GEMINI_API_KEY=your_gemini_key
   ```
4. **Run locally**
   ```bash
   npm run dev
   ```
5. **Open the demo**
   - Go to [http://localhost:3000/demo.html](http://localhost:3000/demo.html)

---

## 🌐 API Endpoint

**POST** `/api/summarize`

**Request Body:**
```json
{
  "text": "Text to summarize",
  "engine": "azure" // or "openai", "gemini" (coming soon)
}
```

**Response:**
```json
{
  "success": true,
  "summary": "Generated summary"
}
```

---

## 🛠️ Usage Example (JavaScript)
```js
async function getSummary(text) {
  const response = await fetch('https://your-deployment-url/api/summarize', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text, engine: 'azure' })
  });
  const data = await response.json();
  return data.summary;
}
```

## 🛠️ Usage Example (Python)
```python
import requests

def get_summary(text):
    url = "https://your-deployment-url/api/summarize"
    payload = {"text": text, "engine": "azure"}
    response = requests.post(url, json=payload)
    return response.json()["summary"]
```

---

## ⚙️ Environment Variables
- `AZURE_OPENAI_KEY`, `AZURE_OPENAI_ENDPOINT`, `AZURE_OPENAI_DEPLOYMENT_NAME`, `AZURE_OPENAI_API_VERSION`
- (Optional) `OPENAI_API_KEY`, `GEMINI_API_KEY`

---

## 📄 Documentation & Demo
- **API Docs:** [doc.html](./public/doc.html)
- **Live Demo:** [demo.html](./public/demo.html)

---

## ☁️ Deploy on Vercel
1. Push your code to GitHub
2. Import the repo on [vercel.com](https://vercel.com/)
3. Add your environment variables in the Vercel dashboard
4. Deploy and get your live API URL!

---

## ✨ Features
- Multi-language support (keeps original language)
- Ultra-concise, faithful summaries
- No hallucinations or invented info
- Easy integration in any app
- Modern, beautiful demo & docs

---

© 2025 AiCrafters Text Summarization API. All rights reserved. 