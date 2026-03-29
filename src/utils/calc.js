export function calculateFinancialHealth(data) {
  // Parsing inputs to numbers just in case
  const income = Number(data.income) || 0;
  const expenses = Number(data.expenses) || 0;
  const savings = Number(data.savings) || 0;
  const emi = Number(data.emi) || 0;
  const currentAge = Number(data.currentAge) || 0;
  const targetAge = Number(data.targetAge) || 0;

  // 1. MONEY HEALTH SCORE
  // Emergency Score
  let emergencyScore = 40;
  const monthsOfSavings = expenses > 0 ? savings / expenses : 0;
  if (monthsOfSavings >= 6) {
    emergencyScore = 100;
  } else if (monthsOfSavings >= 3) {
    emergencyScore = 70;
  }

  // Insurance Score
  const insuranceScore = data.insurance === 'Yes' ? 100 : 0;

  // Investment Score
  let investmentScore = 0;
  if (data.investmentType === 'Mutual Funds/Stocks') {
    investmentScore = 100;
  } else if (data.investmentType === 'FD') {
    investmentScore = 50;
  }

  // Debt Score
  const debtScore = income > 0 && (emi / income) < 0.3 ? 100 : 40;

  // Tax Score
  const taxScore = data.taxSaving === 'Yes' ? 100 : 0;

  // Retirement Score
  const retirementScore = data.retirementPlanning === 'Yes' ? 100 : 0;

  // Overall Score = average
  const overallScore = Math.round(
    (emergencyScore + insuranceScore + investmentScore + debtScore + taxScore + retirementScore) / 6
  );

  let category = '';
  if (overallScore >= 80) category = 'Excellent 🟢';
  else if (overallScore >= 60) category = 'Good 🟡';
  else if (overallScore >= 40) category = 'Average 🟠';
  else category = 'Poor 🔴';

  // 2. FINANCIAL INDEPENDENCE
  const annualExpenses = expenses * 12;
  const requiredCorpus = 25 * annualExpenses;
  const monthlySavings = income - expenses;
  const yearsLeft = Math.max(0, targetAge - currentAge);

  let yearsToAchieve = 'N/A';
  if (monthlySavings > 0) {
    yearsToAchieve = (requiredCorpus / (monthlySavings * 12)).toFixed(1);
  }

  let suggestedMonthlyInvestment = 'N/A';
  if (yearsLeft > 0) {
    suggestedMonthlyInvestment = Math.round(requiredCorpus / (yearsLeft * 12));
  }

  return {
    score: overallScore,
    category,
    emergency: emergencyScore,
    insurance_score: insuranceScore,
    investment_score: investmentScore,
    debt_score: debtScore,
    tax_score: taxScore,
    retirement_score: retirementScore,
    corpus: requiredCorpus,
    years: yearsToAchieve,
    monthly_savings: monthlySavings,
    suggested_investment: suggestedMonthlyInvestment
  };
}
