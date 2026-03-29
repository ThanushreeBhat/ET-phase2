import { useState } from 'react';

export default function Login({ onLogin }) {
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username.trim() && password.trim()) {
      // In a real app we'd verify or save credentials here. 
      // For this mock let's just accept the valid non-empty username.
      onLogin(true, username.trim());
    }
  };

  const handleGuest = () => {
    onLogin(false, null);
  };

  return (
    <div className="login-container">
      <div className="glass-card login-card" style={{ maxWidth: '400px', margin: '0 auto', textAlign: 'center' }}>
        <h2 style={{ marginBottom: '0.5rem' }}>{isLoginMode ? 'Welcome Back' : 'Create Account'}</h2>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem', fontSize: '0.9rem' }}>
          {isLoginMode 
            ? 'Login to view past advice or get new insights.' 
            : 'Sign up to build your financial history with AI.'}
        </p>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div className="form-group" style={{ textAlign: 'left' }}>
            <label>Username</label>
            <input 
              type="text" 
              value={username} 
              onChange={(e) => setUsername(e.target.value)} 
              placeholder="Enter your username" 
              required 
            />
          </div>
          <div className="form-group" style={{ textAlign: 'left' }}>
            <label>Password</label>
            <input 
              type="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              placeholder="Enter your password" 
              required 
            />
          </div>
          
          <button type="submit" style={{ marginTop: '1rem' }}>
            {isLoginMode ? 'Login Securely' : 'Sign Up Now'}
          </button>
        </form>

        <div style={{ marginTop: '1rem', fontSize: '0.9rem' }}>
          {isLoginMode ? "Don't have an account? " : "Already have an account? "}
          <span 
            onClick={() => setIsLoginMode(!isLoginMode)} 
            style={{ color: 'var(--accent-blue)', cursor: 'pointer', fontWeight: 'bold' }}
          >
            {isLoginMode ? 'Sign Up' : 'Login'}
          </span>
        </div>

        <div style={{ marginTop: '1.5rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <hr style={{ flex: 1, borderColor: 'rgba(255, 255, 255, 0.1)' }} />
          <span style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>OR</span>
          <hr style={{ flex: 1, borderColor: 'rgba(255, 255, 255, 0.1)' }} />
        </div>

        <button 
          className="reset-button" 
          onClick={handleGuest} 
          style={{ marginTop: '1.5rem', width: '100%' }}
        >
          Continue as Guest
        </button>
      </div>
    </div>
  );
}
