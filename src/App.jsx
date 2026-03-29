import { useState, useEffect } from 'react';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import Form from './components/Form';
import Result from './components/Result';
import { calculateFinancialHealth } from './utils/calc';
import { getAIAdvice } from './utils/ai';

export default function App() {
  const [step, setStep] = useState(0);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  
  const [results, setResults] = useState(null);
  const [aiAdvice, setAiAdvice] = useState('');
  const [isAiLoading, setIsAiLoading] = useState(false);

  const [formData, setFormData] = useState({
    profession: 'Working Professional',
    risk: 'Medium',
    currentAge: 25,
    targetAge: 50,
    income: 50000,
    expenses: 25000,
    savings: 100000,
    insurance: 'Yes',
    investments: 'Yes',
    investmentType: 'Mutual Funds/Stocks',
    emi: 5000,
    taxSaving: 'Yes',
    retirementPlanning: 'Yes'
  });

  const handleLogin = (loggedInStatus, username) => {
    setIsLoggedIn(loggedInStatus);
    if (loggedInStatus) {
      setCurrentUser(username);
      setStep(1); // Go to Dashboard
    } else {
      setCurrentUser(null);
      setStep(2); // Skip Dashboard as Guest
    }
  };

  const handleAnalyze = async () => {
    // 1. Calculate Math Logic
    const calculatedResults = calculateFinancialHealth(formData);
    setResults(calculatedResults);
    
    // 2. Move to Results screen
    setStep(3);

    // 3. Trigger AI Fetch ONLY if logged in
    if (isLoggedIn) {
      setIsAiLoading(true);
      try {
        const payload = { ...formData, ...calculatedResults };
        const advice = await getAIAdvice(payload);
        setAiAdvice(advice);

        // Save History to LocalStorage
        const newRecord = {
          timestamp: new Date().toISOString(),
          results: calculatedResults,
          aiAdvice: advice,
          formData: formData
        };
        const existing = localStorage.getItem(`fin_advices_${currentUser}`);
        const parsedExisting = existing ? JSON.parse(existing) : [];
        parsedExisting.unshift(newRecord); // Place newest at the top
        localStorage.setItem(`fin_advices_${currentUser}`, JSON.stringify(parsedExisting));

      } catch (error) {
        console.error(error);
        setAiAdvice("💡 AI Personalized Advice:\n- Unable to fetch tips. Please verify your Gemini API key in the .env file.");
      } finally {
        setIsAiLoading(false);
      }
    }
  };

  const handleViewAdvice = (item) => {
    setResults(item.results);
    setAiAdvice(item.aiAdvice);
    setStep(3);
  };

  const handleReset = () => {
    setResults(null);
    setAiAdvice('');
    setStep(isLoggedIn ? 1 : 2); // Go to Dashboard if logged, else Form
  };

  return (
    <div className="glass-container">
      <h1 style={{ marginBottom: step === 0 ? '1rem' : '2rem' }}>AI Money Mentor</h1>
      
      {step === 0 && (
        <Login onLogin={handleLogin} />
      )}
      
      {step === 1 && isLoggedIn && (
        <Dashboard 
          username={currentUser} 
          onNewAnalysis={() => {
            setResults(null);
            setAiAdvice('');
            setStep(2);
          }} 
          onViewAdvice={handleViewAdvice} 
        />
      )}

      {step === 2 && (
        <Form formData={formData} setFormData={setFormData} onSubmit={handleAnalyze} />
      )}

      {step === 3 && (
        <Result
          results={results}
          aiAdvice={aiAdvice}
          isAiLoading={isAiLoading}
          isLoggedIn={isLoggedIn}
          onReset={handleReset}
        />
      )}
    </div>
  );
}
