export default function Form({ formData, setFormData, onSubmit }) {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <form onSubmit={handleSubmit} className="form-grid">
      <div className="form-group mb-2" style={{ gridColumn: '1 / -1' }}>
        <h2>User Profile</h2>
      </div>

      <div className="form-group">
        <label>Profession</label>
        <select name="profession" value={formData.profession} onChange={handleChange} required>
          <option value="Student">Student</option>
          <option value="Working Professional">Working Professional</option>
        </select>
      </div>

      <div className="form-group">
        <label>Risk Appetite</label>
        <select name="risk" value={formData.risk} onChange={handleChange} required>
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
      </div>

      <div className="form-group mb-2" style={{ gridColumn: '1 / -1', marginTop: '1rem' }}>
        <h2>Financial Data</h2>
      </div>

      <div className="form-group">
        <label>Current Age</label>
        <input type="number" name="currentAge" value={formData.currentAge} onChange={handleChange} required min="0" />
      </div>

      <div className="form-group">
        <label>Target Retirement Age</label>
        <input type="number" name="targetAge" value={formData.targetAge} onChange={handleChange} required min={formData.currentAge} />
      </div>

      <div className="form-group">
        <label>Monthly Income (₹)</label>
        <input type="number" name="income" value={formData.income} onChange={handleChange} required min="0" />
      </div>

      <div className="form-group">
        <label>Monthly Expenses (₹)</label>
        <input type="number" name="expenses" value={formData.expenses} onChange={handleChange} required min="0" />
      </div>

      <div className="form-group">
        <label>Total Savings Buffer (₹)</label>
        <input type="number" name="savings" value={formData.savings} onChange={handleChange} required min="0" />
      </div>

      <div className="form-group">
        <label>Monthly EMI (Debt) (₹)</label>
        <input type="number" name="emi" value={formData.emi} onChange={handleChange} required min="0" />
      </div>

      <div className="form-group mb-2" style={{ gridColumn: '1 / -1', marginTop: '1rem' }}>
        <h2>Financial Habits</h2>
      </div>

      <div className="form-group">
        <label>Have Insurance?</label>
        <select name="insurance" value={formData.insurance} onChange={handleChange} required>
          <option value="No">No</option>
          <option value="Yes">Yes</option>
        </select>
      </div>

      <div className="form-group">
        <label>Have Investments?</label>
        <select name="investments" value={formData.investments} onChange={handleChange} required>
          <option value="No">No</option>
          <option value="Yes">Yes</option>
        </select>
      </div>

      {formData.investments === 'Yes' && (
        <div className="form-group">
          <label>Primary Investment Type</label>
          <select name="investmentType" value={formData.investmentType} onChange={handleChange} required>
            <option value="None">None</option>
            <option value="FD">Fixed Deposit (FD)</option>
            <option value="Mutual Funds/Stocks">Mutual Funds/Stocks</option>
          </select>
        </div>
      )}

      <div className="form-group">
        <label>Tax Saving Strategy?</label>
        <select name="taxSaving" value={formData.taxSaving} onChange={handleChange} required>
          <option value="No">No</option>
          <option value="Yes">Yes</option>
        </select>
      </div>

      <div className="form-group">
        <label>Active Retirement Planning?</label>
        <select name="retirementPlanning" value={formData.retirementPlanning} onChange={handleChange} required>
          <option value="No">No</option>
          <option value="Yes">Yes</option>
        </select>
      </div>

      <div style={{ gridColumn: '1 / -1' }}>
        <button type="submit">Analyze Financial Health</button>
      </div>
    </form>
  );
}
