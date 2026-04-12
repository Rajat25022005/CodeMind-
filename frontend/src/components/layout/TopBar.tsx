import { useNavigate } from 'react-router-dom';
import { useUIStore } from '../../stores/uiStore';
import { useRepoStore } from '../../stores/repoStore';
import './TopBar.css';

const TopBar = () => {
  const navigate = useNavigate();
  const toggleDrift = useUIStore((s) => s.toggleDrift);
  const activeRepo = useRepoStore((s) => s.activeRepo);
  const driftCount = useRepoStore((s) => s.driftCount);

  return (
    <header className="topbar">
      <div className="logo" onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>
        <div className="logoIcon">🧠</div>
        CodeMind
      </div>
      {activeRepo ? (
        <div className="repoBadge" title={activeRepo.path}>
          {activeRepo.name} / {activeRepo.branch}
        </div>
      ) : (
        <div className="repoBadge">No Repository Indexed</div>
      )}
      <span className="separator">|</span>
      <span className="pill pillCyan">⚡ Indexed</span>
      <div className="topbarRight">
        <span className="pill pillAmber" onClick={toggleDrift} style={{ cursor: 'pointer' }}>
          ⚠ {driftCount} Drifts
        </span>
        <div className="navIcon" title="Settings" onClick={() => navigate('/setup')} style={{ cursor: 'pointer' }}>⚙</div>
        <div className="navIcon" title="User">👤</div>
      </div>
    </header>
  );
};

export default TopBar;
