import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useUIStore } from '../../stores/uiStore';
import { useRepoStore } from '../../stores/repoStore';
import { useAuthStore } from '../../stores/authStore';
import TopBar from './TopBar';
import Sidebar from './Sidebar';
import BottomStrip from './BottomStrip';
import DriftAlerts from '../DriftAlerts';
import ErrorBoundary from '../ErrorBoundary';
import './WorkspaceLayout.css';

const WorkspaceLayout = () => {
  const navigate = useNavigate();
  const driftOpen = useUIStore((s) => s.driftOpen);
  const setDriftOpen = useUIStore((s) => s.setDriftOpen);
  const token = useAuthStore((s) => s.token);
  
  const { activeRepo, hasLoadedStatus, setActiveRepo, setHasLoadedStatus } = useRepoStore();

  useEffect(() => {
    if (!hasLoadedStatus) {
      fetch('/api/status', {
        headers: { 'Authorization': `Bearer ${token || ''}` }
      })
      .then(res => res.json())
      .then(data => {
        if (data.active_repo) {
          setActiveRepo(data.active_repo);
        }
        setHasLoadedStatus(true);
      })
      .catch((e) => {
        console.error('Failed to fetch status:', e);
        setHasLoadedStatus(true);
      });
    }
  }, [hasLoadedStatus, setActiveRepo, setHasLoadedStatus]);

  useEffect(() => {
    if (hasLoadedStatus && !activeRepo) {
      navigate('/setup');
    }
  }, [hasLoadedStatus, activeRepo, navigate]);

  if (!hasLoadedStatus) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh', width: '100vw', fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--muted)' }}>
        Loading repository status...
      </div>
    );
  }

  if (!activeRepo) {
    return null; // Will redirect
  }

  return (
    <>
      <TopBar />
      <div className="workspace">
        <Sidebar />
        <ErrorBoundary>
          <Outlet />
        </ErrorBoundary>
        {driftOpen && <DriftAlerts onClose={() => setDriftOpen(false)} />}
      </div>
      <BottomStrip />
    </>
  );
};

export default WorkspaceLayout;
