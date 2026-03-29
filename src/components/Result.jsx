export default function Result({ results, aiAdvice, isAiLoading, isLoggedIn, onReset }) {
  // Determine color for the circle based on score
  const getScoreColor = (score) => {
    if (score >= 80) return 'var(--score-green)';
    if (score >= 60) return 'var(--score-yellow)';
    if (score >= 40) return 'var(--score-orange)';
    return 'var(--score-red)';
  };

  const scoreColor = getScoreColor(results.score);

  // Helper to format currency
  const formatCurrency = (amount) => {
    if (amount === 'N/A') return amount;
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  // Format AI tips markdown-like list to array
  const renderAdvice = (adviceText) => {
    if (!adviceText) return null;
    
    // Simple parser: split by line, trim, ignore the title line
    const lines = adviceText.split('\n').map(line => line.trim()).filter(line => line.length > 0);
    // Find lines starting with '-', '*', or numbers
    const tips = lines.filter(line => /^[*\-•\d]/.test(line));
    
    if (tips.length === 0) {
      return <li>{adviceText}</li>; // Fallback if format was weird
    }
    
    return tips.map((tip, idx) => (
      <li key={idx}>{tip.replace(/^[*\-•\d]+\.?\s*/, '')}</li>
    ));
  };

  return (
    <div className="result-container">
      {/* 📊 Financial Health Report */}
      <div className="glass-card mb-3">
        <h2>📊 Financial Health Report</h2>
        <div className="score-display">
          <div className="score-circle" style={{ borderColor: scoreColor, color: scoreColor }}>
            {results.score}
          </div>
          <div className="category-badge" style={{ color: scoreColor, backgroundColor: `color-mix(in srgb, ${scoreColor} 20%, transparent)` }}>
            {results.category}
          </div>
        </div>
        
        <h3 style={{ textAlign: 'center', marginTop: '2rem' }}>Component Breakdown</h3>
        <div className="breakdown-grid">
          <div className="breakdown-item">
            <span className="breakdown-score" style={{ color: getScoreColor(results.emergency) }}>{results.emergency}</span>
            <span className="breakdown-label">Emergency Savings</span>
          </div>
          <div className="breakdown-item">
            <span className="breakdown-score" style={{ color: getScoreColor(results.insurance_score) }}>{results.insurance_score}</span>
            <span className="breakdown-label">Insurance</span>
          </div>
          <div className="breakdown-item">
            <span className="breakdown-score" style={{ color: getScoreColor(results.investment_score) }}>{results.investment_score}</span>
            <span className="breakdown-label">Investments</span>
          </div>
          <div className="breakdown-item">
            <span className="breakdown-score" style={{ color: getScoreColor(results.debt_score) }}>{results.debt_score}</span>
            <span className="breakdown-label">Debt Health</span>
          </div>
          <div className="breakdown-item">
            <span className="breakdown-score" style={{ color: getScoreColor(results.tax_score) }}>{results.tax_score}</span>
            <span className="breakdown-label">Tax Strategy</span>
          </div>
          <div className="breakdown-item">
            <span className="breakdown-score" style={{ color: getScoreColor(results.retirement_score) }}>{results.retirement_score}</span>
            <span className="breakdown-label">Retirement</span>
          </div>
        </div>
      </div>

      {/* 🚀 Financial Independence Plan */}
      <div className="glass-card mb-3">
        <h2>🚀 Financial Independence Plan</h2>
        <div className="form-grid" style={{ gap: '1rem', marginTop: '1.5rem' }}>
          <div className="form-group">
            <label>Required FI Corpus</label>
            <div style={{ fontSize: '1.5rem', fontWeight: '700', color: 'var(--text-primary)' }}>
              {formatCurrency(results.corpus)}
            </div>
          </div>
          <div className="form-group">
            <label>Years to Achieve</label>
            <div style={{ fontSize: '1.5rem', fontWeight: '700', color: 'var(--accent-blue)' }}>
              {results.years} <span style={{ fontSize: '1rem', fontWeight: '500' }}>years</span>
            </div>
          </div>
          <div className="form-group">
            <label>Suggested Monthly Investment</label>
            <div style={{ fontSize: '1.5rem', fontWeight: '700', color: 'var(--text-primary)' }}>
              {formatCurrency(results.suggested_investment)}
            </div>
          </div>
        </div>
      </div>

      {/* 💡 AI Advice */}
      <div className="glass-card">
        <h2>💡 AI Personalized Advice</h2>
        
        {!isLoggedIn ? (
          <div className="locked-container">
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🔒</div>
            <h3 style={{ color: 'var(--text-primary)', marginBottom: '0.5rem' }}>AI Insights Locked</h3>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem', maxWidth: '300px', margin: '0 auto 1.5rem auto' }}>
              We noticed you're exploring as a guest. Please log in to unlock personalized AI financial strategies.
            </p>
            <button onClick={() => window.location.reload()} style={{ width: 'auto', padding: '0.8rem 2rem' }}>
              Go to Login
            </button>
          </div>
        ) : isAiLoading ? (
          <div className="loading-container">
            <div className="spinner"></div>
            <span>Analyzing with AI...</span>
          </div>
        ) : (
          <ul className="ai-advice-list">
            {renderAdvice(aiAdvice)}
          </ul>
        )}
      </div>

      <button className="reset-button" onClick={onReset} style={{ marginTop: '3rem' }}>
        {isLoggedIn ? 'Back to Dashboard' : 'Start New Analysis'}
      </button>
    </div>
  );
}
