export async function getAIAdvice(data) {
  // Read API key from Vite environment variables
  const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

  if (!API_KEY) {
    throw new Error('API Key missing. Please set VITE_GEMINI_API_KEY in the .env file.');
  }

  const prompt = `You are a smart and responsible financial advisor for Indian users.

User Profile:
- Profession: ${data.profession}
- Risk Appetite: ${data.risk}

Financial Summary:
- Score: ${data.score}/100
- Category: ${data.category}
- Emergency: ${data.emergency}/100
- Insurance: ${data.insurance_score}/100
- Investment: ${data.investment_score}/100
- Debt: ${data.debt_score}/100
- Tax: ${data.tax_score}/100
- Retirement: ${data.retirement_score}/100
- Required Corpus: ₹${data.corpus}
- Years to Achieve: ${data.years}
- Monthly Savings: ₹${data.monthly_savings}

Instructions:
- Do NOT calculate numbers
- Give exactly 4 personalized tips
- Keep it simple and practical
- Avoid risky advice

Output:
💡 AI Personalized Advice:
- Tip 1
- Tip 2
- Tip 3
- Tip 4`;

  try {
    const response = await fetch("https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=" + API_KEY, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }]
      })
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.statusText}`);
    }

    const json = await response.json();
    return json.candidates[0].content.parts[0].text;
  } catch (error) {
    console.error("Failed to fetch AI advice", error);
    return "💡 AI Personalized Advice:\n- Could not generate tips at the moment. Please check your API key.\n- Save regularly.\n- Stay out of unnecessary debt.\n- Plan ahead.";
  }
}
