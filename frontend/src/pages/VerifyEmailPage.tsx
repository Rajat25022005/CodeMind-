import { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { postVerify } from '../lib/api';
import './Auth.css';

export default function VerifyEmailPage() {
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email || '';

  useEffect(() => {
    if (!email) {
      navigate('/login');
    }
  }, [email, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (code.length !== 6) {
      setError('Code must be 6 digits');
      return;
    }
    
    setError('');
    setLoading(true);

    try {
      await postVerify(email, code);
      setSuccess(true);
      setTimeout(() => navigate('/login'), 2000);
    } catch (err: any) {
      setError(err.message || 'Verification failed');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="authPage">
        <div className="authCard">
          <div className="authSuccess">
            <span className="authSuccessIcon">✅</span>
            <h2 className="authSuccessTitle">Email Verified</h2>
            <p className="authSuccessDesc">Redirecting to login...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="authPage">
      <div className="authCard">
        <h1 className="authLogo">Verify Email</h1>
        <p className="authSubtitle">
          We've sent a 6-digit code to <strong>{email}</strong>
        </p>

        {error && <div className="authError">{error}</div>}

        <form onSubmit={handleSubmit} className="authForm">
          <div className="authField">
            <label>Verification Code</label>
            <input
              type="text"
              required
              minLength={6}
              maxLength={6}
              className="authCodeInput"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="••••••"
            />
          </div>
          <button
            type="submit"
            disabled={loading || code.length !== 6}
            className="authSubmit primary"
          >
            {loading ? 'Verifying...' : 'Verify'}
          </button>
        </form>

        <p className="authFooter">
          <Link to="/login">Back to Login</Link>
        </p>
      </div>
    </div>
  );
}
