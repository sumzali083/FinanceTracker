import { useState, useEffect, useCallback } from 'react';
import './App.css';

const API = 'http://localhost:5072';

// ─── Transaction Form ────────────────────────────────────────────────────────

function TransactionForm({ initial, onSubmit, onCancel }) {
  const empty = { amount: '', category: '', description: '', date: new Date().toISOString().slice(0, 10), type: 'Expense' };
  const [form, setForm] = useState(initial ? {
    ...initial,
    date: initial.date ? initial.date.slice(0, 10) : empty.date,
  } : empty);

  const set = (field) => (e) => setForm(f => ({ ...f, [field]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ ...form, amount: parseFloat(form.amount) });
  };

  return (
    <form className="form-card" onSubmit={handleSubmit}>
      <div className="form-row">
        <label>Type</label>
        <select value={form.type} onChange={set('type')}>
          <option>Income</option>
          <option>Expense</option>
        </select>
      </div>
      <div className="form-row">
        <label>Amount</label>
        <input type="number" step="0.01" min="0" required value={form.amount} onChange={set('amount')} placeholder="0.00" />
      </div>
      <div className="form-row">
        <label>Category</label>
        <input type="text" required value={form.category} onChange={set('category')} placeholder="e.g. Salary, Food..." />
      </div>
      <div className="form-row">
        <label>Description</label>
        <input type="text" value={form.description} onChange={set('description')} placeholder="Optional note" />
      </div>
      <div className="form-row">
        <label>Date</label>
        <input type="date" required value={form.date} onChange={set('date')} />
      </div>
      <div className="form-actions">
        <button type="submit" className="btn btn-primary">{initial ? 'Update' : 'Add'}</button>
        <button type="button" className="btn btn-ghost" onClick={onCancel}>Cancel</button>
      </div>
    </form>
  );
}

// ─── Dashboard ───────────────────────────────────────────────────────────────

function Dashboard({ transactions }) {
  const income = transactions.filter(t => t.type === 'Income').reduce((s, t) => s + t.amount, 0);
  const expenses = transactions.filter(t => t.type === 'Expense').reduce((s, t) => s + t.amount, 0);
  const balance = income - expenses;

  const fmt = (n) => n.toLocaleString('en-US', { style: 'currency', currency: 'USD' });

  const recent = [...transactions]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 5);

  return (
    <div className="dashboard">
      <h2 className="page-title">Dashboard</h2>
      <div className="summary-cards">
        <div className="card card-balance">
          <span className="card-label">Balance</span>
          <span className="card-value">{fmt(balance)}</span>
        </div>
        <div className="card card-income">
          <span className="card-label">Total Income</span>
          <span className="card-value">{fmt(income)}</span>
        </div>
        <div className="card card-expense">
          <span className="card-label">Total Expenses</span>
          <span className="card-value">{fmt(expenses)}</span>
        </div>
      </div>

      <div className="section">
        <h3 className="section-title">Recent Transactions</h3>
        {recent.length === 0 ? (
          <p className="empty-msg">No transactions yet.</p>
        ) : (
          <table className="table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Category</th>
                <th>Description</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              {recent.map(t => (
                <tr key={t.id}>
                  <td>{new Date(t.date).toLocaleDateString()}</td>
                  <td><span className="tag">{t.category}</span></td>
                  <td>{t.description}</td>
                  <td className={t.type === 'Income' ? 'amount-income' : 'amount-expense'}>
                    {t.type === 'Income' ? '+' : '-'}{fmt(t.amount)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

// ─── Transactions ─────────────────────────────────────────────────────────────

function Transactions({ transactions, onAdd, onEdit, onDelete }) {
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(null);

  const fmt = (n) => n.toLocaleString('en-US', { style: 'currency', currency: 'USD' });

  const handleAdd = (data) => {
    onAdd({ ...data, id: Date.now() });
    setShowForm(false);
  };

  const handleEdit = (data) => {
    onEdit(editing.id, { ...data, id: editing.id });
    setEditing(null);
  };

  const sorted = [...transactions].sort((a, b) => new Date(b.date) - new Date(a.date));

  return (
    <div className="transactions-page">
      <div className="page-header">
        <h2 className="page-title">Transactions</h2>
        {!showForm && !editing && (
          <button className="btn btn-primary" onClick={() => setShowForm(true)}>+ Add Transaction</button>
        )}
      </div>

      {showForm && (
        <TransactionForm onSubmit={handleAdd} onCancel={() => setShowForm(false)} />
      )}
      {editing && (
        <TransactionForm initial={editing} onSubmit={handleEdit} onCancel={() => setEditing(null)} />
      )}

      {transactions.length === 0 ? (
        <p className="empty-msg">No transactions yet. Add one above!</p>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Type</th>
              <th>Category</th>
              <th>Description</th>
              <th>Amount</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {sorted.map(t => (
              <tr key={t.id}>
                <td>{new Date(t.date).toLocaleDateString()}</td>
                <td>
                  <span className={`badge ${t.type === 'Income' ? 'badge-income' : 'badge-expense'}`}>
                    {t.type}
                  </span>
                </td>
                <td><span className="tag">{t.category}</span></td>
                <td>{t.description}</td>
                <td className={t.type === 'Income' ? 'amount-income' : 'amount-expense'}>
                  {t.type === 'Income' ? '+' : '-'}{fmt(t.amount)}
                </td>
                <td className="actions">
                  <button className="btn btn-sm btn-ghost" onClick={() => { setEditing(t); setShowForm(false); }}>Edit</button>
                  <button className="btn btn-sm btn-danger" onClick={() => onDelete(t.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

// ─── Stocks ───────────────────────────────────────────────────────────────────

function Stocks() {
  const [symbol, setSymbol] = useState('');
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const lookup = async (sym) => {
    if (!sym) return;
    setLoading(true);
    setError('');
    setData(null);
    try {
      const res = await fetch(`${API}/stocks/${sym.toUpperCase()}`);
      if (!res.ok) throw new Error('Stock not found');
      const json = await res.json();
      setData(json);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    lookup(symbol);
  };

  const fields = data ? Object.entries(data) : [];

  return (
    <div className="stocks-page">
      <h2 className="page-title">Stock Lookup</h2>
      <form className="search-form" onSubmit={handleSubmit}>
        <input
          className="search-input"
          type="text"
          placeholder="Enter symbol (e.g. AAPL, NVDA, PLTR)"
          value={symbol}
          onChange={e => setSymbol(e.target.value)}
        />
        <button className="btn btn-primary" type="submit" disabled={loading}>
          {loading ? 'Loading...' : 'Search'}
        </button>
      </form>

      <div className="quick-symbols">
        {['AAPL', 'NVDA', 'PLTR'].map(s => (
          <button key={s} className="btn btn-ghost btn-sm" onClick={() => { setSymbol(s); lookup(s); }}>
            {s}
          </button>
        ))}
      </div>

      {error && <p className="error-msg">{error}</p>}

      {data && (
        <div className="stock-card">
          <h3 className="stock-symbol">{data.symbol || symbol.toUpperCase()}</h3>
          <div className="stock-grid">
            {fields.filter(([k]) => k !== 'symbol').map(([key, value]) => (
              <div className="stock-field" key={key}>
                <span className="stock-label">{key}</span>
                <span className="stock-value">{value}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// ─── App ─────────────────────────────────────────────────────────────────────

function App() {
  const [page, setPage] = useState('dashboard');
  const [transactions, setTransactions] = useState([]);
  const [apiError, setApiError] = useState('');

  const fetchTransactions = useCallback(async () => {
    try {
      const res = await fetch(`${API}/transactions`);
      const data = await res.json();
      setTransactions(data);
    } catch {
      setApiError('Cannot connect to API. Make sure the backend is running on port 5072.');
    }
  }, []);

  useEffect(() => { fetchTransactions(); }, [fetchTransactions]);

  const addTransaction = async (t) => {
    await fetch(`${API}/transactions`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(t),
    });
    fetchTransactions();
  };

  const updateTransaction = async (id, t) => {
    await fetch(`${API}/transactions/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(t),
    });
    fetchTransactions();
  };

  const deleteTransaction = async (id) => {
    await fetch(`${API}/transactions/${id}`, { method: 'DELETE' });
    fetchTransactions();
  };

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: '◈' },
    { id: 'transactions', label: 'Transactions', icon: '⇌' },
    { id: 'stocks', label: 'Stocks', icon: '▲' },
  ];

  return (
    <div className="app">
      <aside className="sidebar">
        <div className="sidebar-brand">
          <span className="brand-icon">$</span>
          <span className="brand-name">FinanceTracker</span>
        </div>
        <nav className="sidebar-nav">
          {navItems.map(item => (
            <button
              key={item.id}
              className={`nav-item ${page === item.id ? 'active' : ''}`}
              onClick={() => setPage(item.id)}
            >
              <span className="nav-icon">{item.icon}</span>
              <span>{item.label}</span>
            </button>
          ))}
        </nav>
      </aside>

      <main className="content">
        {apiError && <div className="api-error">{apiError}</div>}
        {page === 'dashboard' && <Dashboard transactions={transactions} />}
        {page === 'transactions' && (
          <Transactions
            transactions={transactions}
            onAdd={addTransaction}
            onEdit={updateTransaction}
            onDelete={deleteTransaction}
          />
        )}
        {page === 'stocks' && <Stocks />}
      </main>
    </div>
  );
}

export default App;
