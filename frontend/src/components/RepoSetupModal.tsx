import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGraphUpdates } from '../hooks/useGraphUpdates';
import { useRepoStore } from '../stores/repoStore';
import { useAuthStore } from '../stores/authStore';

export const RepoSetupModal = () => {
  const [repoPath, setRepoPath] = useState('');
  const [branch, setBranch] = useState('main');
  const [maxCommits, setMaxCommits] = useState(500);
  const [errorMsg, setErrorMsg] = useState('');

  const navigate = useNavigate();
  const { ingestion } = useGraphUpdates();
  const setActiveRepo = useRepoStore((s) => s.setActiveRepo);
  const token = useAuthStore((s) => s.token);

  // When ingestion completes, fetch new status and go home
  useEffect(() => {
    if (ingestion.stage === 'complete' && !ingestion.active) {
      fetch('/api/status', {
        headers: {
          'Authorization': `Bearer ${token || ''}`
        }
      })
      .then(r => r.json())
      .then(data => {
        if (data.active_repo) {
          setActiveRepo(data.active_repo);
        }
        navigate('/');
      })
      .catch(e => console.error('Failed to fetch status:', e));
    }
    if (ingestion.error) {
      setErrorMsg(ingestion.error);
    }
  }, [ingestion, navigate, setActiveRepo, token]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    try {
      const res = await fetch('/api/ingest', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token || ''}`
        },
        body: JSON.stringify({
          repo_path: repoPath,
          branch,
          max_commits: maxCommits
        })
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.detail || 'Ingestion request failed');
      }
    } catch (err: any) {
      setErrorMsg(err.message);
    }
  };

  return (
    <div style={{
      background: 'var(--surface)',
      border: '1px solid var(--border)',
      borderRadius: '8px',
      padding: '2rem',
      maxWidth: '450px',
      width: '100%',
      boxShadow: '0 4px 20px rgba(0,0,0,0.5)',
      fontFamily: 'var(--font-sans)',
    }}>
      <div style={{ marginBottom: '1.5rem', textAlign: 'center' }}>
        <h2 style={{ fontSize: '1.5rem', margin: 0 }}>🧠 CodeMind</h2>
        <p style={{ color: 'var(--muted)', marginTop: '0.5rem' }}>Index a repository to get started</p>
      </div>

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {errorMsg && (
          <div style={{ color: '#ff6b6b', fontSize: '0.85rem', background: 'rgba(255, 107, 107, 0.1)', padding: '0.5rem', borderRadius: '4px' }}>
            ⚠ {errorMsg}
          </div>
        )}

        <div>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.85rem', color: 'var(--muted)' }}>
            Repository Path (absolute or ~)
          </label>
          <input 
            type="text" 
            required
            value={repoPath}
            onChange={(e) => setRepoPath(e.target.value)}
            placeholder="~/projects/my-repo"
            disabled={ingestion.active}
            style={{ width: '100%', padding: '0.75rem', background: 'var(--bg)', border: '1px solid var(--border)', color: 'var(--text)', borderRadius: '4px' }}
          />
        </div>

        <div style={{ display: 'flex', gap: '1rem' }}>
          <div style={{ flex: 1 }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.85rem', color: 'var(--muted)' }}>
              Branch
            </label>
            <input 
              type="text" 
              value={branch}
              onChange={(e) => setBranch(e.target.value)}
              disabled={ingestion.active}
              style={{ width: '100%', padding: '0.75rem', background: 'var(--bg)', border: '1px solid var(--border)', color: 'var(--text)', borderRadius: '4px' }}
            />
          </div>

          <div style={{ flex: 1 }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.85rem', color: 'var(--muted)' }}>
              Max Commits
            </label>
            <input 
              type="number" 
              value={maxCommits}
              onChange={(e) => setMaxCommits(Number(e.target.value))}
              disabled={ingestion.active}
              style={{ width: '100%', padding: '0.75rem', background: 'var(--bg)', border: '1px solid var(--border)', color: 'var(--text)', borderRadius: '4px' }}
            />
          </div>
        </div>

        {ingestion.active ? (
          <div style={{ marginTop: '1rem' }}>
            <div style={{ fontSize: '0.85rem', color: 'var(--muted)', display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
              <span>{ingestion.stage}</span>
              <span>{Math.round(ingestion.progress * 100)}%</span>
            </div>
            <div style={{ height: '6px', background: 'var(--bg)', borderRadius: '3px', overflow: 'hidden' }}>
              <div style={{ height: '100%', background: 'var(--cyan)', width: `${ingestion.progress * 100}%`, transition: 'width 0.3s' }} />
            </div>
          </div>
        ) : (
          <button 
            type="submit" 
            disabled={!repoPath}
            style={{ 
              marginTop: '1rem',
              padding: '0.75rem', 
              background: 'var(--cyan)', 
              color: '#000', 
              border: 'none', 
              borderRadius: '4px',
              fontWeight: 600,
              cursor: repoPath ? 'pointer' : 'not-allowed',
              opacity: repoPath ? 1 : 0.5
            }}
          >
            Index Repository
          </button>
        )}
      </form>
    </div>
  );
};
