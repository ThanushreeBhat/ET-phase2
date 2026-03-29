export async function getAIAdvice(data) {
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
    const response = await fetch("/api/gemini", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }]
      })
    });

    if (!response.ok) {
      console.error("Backend Proxy Error:", response.statusText);
      throw new Error(`Proxy error: ${response.status}`);
    }

    const json = await response.json();

    return (
      json?.candidates?.[0]?.content?.parts?.[0]?.text ||
      "No AI response available."
    );

  } catch (error) {
    console.error("Failed to fetch AI advice", error);

    return `💡 AI Personalized Advice:
- Save consistently mapped around your core targets.
- Avoid leveraging unnecessary high-interest debt loops.
- Lock away 6 months of expenses dynamically into safe liquid reserves.
- Execute systematic investments targeting your baseline FI corpus.`;
  }
}