import { useEffect, useState } from 'react';

export default function Dashboard({ username, onNewAnalysis, onViewAdvice }) {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    if (username) {
      const stored = localStorage.getItem(`fin_advices_${username}`);
      if (stored) {
        setHistory(JSON.parse(stored));
      }
    }
  }, [username]);

  const getScoreColor = (score) => {
    if (score >= 80) return 'var(--score-green)';
    if (score >= 60) return 'var(--score-yellow)';
    if (score >= 40) return 'var(--score-orange)';
    return 'var(--score-red)';
  };

  return (
    <div className="dashboard-container">
      <div className="flex-between mb-2">
        <h2>Dashboard</h2>
        <button onClick={onNewAnalysis} style={{ width: 'auto', padding: '0.8rem 1.5rem', marginTop: 0 }}>
          + New Analysis
        </button>
      </div>

      <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>
        Welcome back, <strong style={{ color: 'white' }}>{username}</strong>! Here is your AI financial advice history.
      </p>

      {history.length === 0 ? (
        <div className="glass-card" style={{ textAlign: 'center', padding: '3rem 1rem' }}>
          <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🌱</div>
          <h3>No History Yet</h3>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
            You haven't generated any financial plans yet. Start a new analysis to get personalized AI tips.
          </p>
          <button onClick={onNewAnalysis} style={{ width: 'auto', padding: '0.8rem 2rem' }}>
            Start First Analysis
          </button>
        </div>
      ) : (
        <div className="history-grid">
          {history.map((item, index) => {
            const scoreColor = getScoreColor(item.results.score);
            return (
              <div key={index} className="glass-card history-card" onClick={() => onViewAdvice(item)}>
                <div className="history-header">
                  <div className="history-score" style={{ color: scoreColor, borderColor: scoreColor }}>
                    {item.results.score}
                  </div>
                  <div className="history-date">
                    {new Date(item.timestamp).toLocaleDateString(undefined, { 
                      year: 'numeric', month: 'short', day: 'numeric',
                      hour: '2-digit', minute:'2-digit'
                    })}
                  </div>
                </div>
                <h3 style={{ marginTop: '1rem', marginBottom: '0.5rem', fontSize: '1.1rem' }}>
                  {item.results.category}
                </h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '1rem' }} className="history-preview">
                  {item.aiAdvice ? item.aiAdvice.substring(0, 80) + '...' : 'Locked / No advice'}
                </p>
                <div style={{ color: 'var(--accent-blue)', fontSize: '0.9rem', fontWeight: '600' }}>
                  View Full Report →
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
