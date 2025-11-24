import { GoogleGenAI } from "@google/genai";

export default async function handler(req, res) {
  // CORS handling
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const { prompt } = req.body;
    
    if (!prompt) {
        return res.status(400).json({ error: 'Prompt is required' });
    }

    const apiKey = process.env.GEMINI_API_KEY || process.env.VITE_GEMINI_API_KEY;
    
    if (!apiKey) {
        console.error("API Key missing on server");
        return res.status(500).json({ error: 'Server configuration error: API Key missing' });
    }

    const ai = new GoogleGenAI({ apiKey });
    const model = 'gemini-2.5-flash';
    
    const result = await ai.models.generateContent({
      model: model,
      contents: prompt,
    });

    const text = result.text();
    return res.status(200).json({ text });

  } catch (error) {
    console.error('Gemini API Error:', error);
    return res.status(500).json({ error: error.message || 'Internal Server Error' });
  }
}

