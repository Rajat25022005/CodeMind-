import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { postRegister } from '../lib/api';
import './Auth.css';

export default function RegisterPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await postRegister(email, password);
      // Automatically route to verify page
      navigate('/verify', { state: { email } });
    } catch (err: any) {
      setError(err.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="authPage">
      <div className="authCard">
        <h1 className="authLogo">Code<span>Mind</span></h1>
        <h2 className="authSubtitle">Create an account</h2>
        
        {error && <div className="authError">{error}</div>}

        <form onSubmit={handleSubmit} className="authForm">
          <div className="authField">
            <label>Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="you@example.com"
            />
          </div>
          <div className="authField">
            <label>Password</label>
            <input
              type="password"
              required
              minLength={8}
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="Min 8 chars, 1 uppercase, 1 digit"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="authSubmit success"
          >
            {loading ? 'Creating...' : 'Sign Up'}
          </button>
        </form>

        <p className="authFooter">
          Already have an account?{' '}
          <Link to="/login">Sign in</Link>
        </p>
      </div>
    </div>
  );
}
