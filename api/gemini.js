export default async function handler(req, res) {
  // CORS Headers for safety (optional but good practice)
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*'); 
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

  // Handle OPTIONS request for CORS
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  // Read backend secure API key
  const API_KEY = process.env.GEMINI_API_KEY;

  if (!API_KEY) {
    console.error('SERVER ERROR: GEMINI_API_KEY environment variable is missing.');
    return res.status(500).json({ error: 'Server configuration error' });
  }

  try {
    // Forward the exact body to Gemini
    const response = await fetch(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=" + API_KEY,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(req.body) 
      }
    );

    if (!response.ok) {
      const errText = await response.text();
      console.error('Gemini API Error Downstream:', errText);
      return res.status(response.status).json({ error: 'Downstream AI Provider Error' });
    }

    const data = await response.json();
    return res.status(200).json(data);
    
  } catch (error) {
    console.error('Failed to communicate with Gemini API:', error);
    return res.status(500).json({ error: 'Internal Server Error fetching AI response' });
  }
}
