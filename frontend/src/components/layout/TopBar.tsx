import './TopBar.css';

const TopBar = () => {
  return (
    <header className="topbar">
      <div className="logo">
        <div className="logoIcon">🧠</div>
        CodeMind
      </div>
      <div className="repoBadge">nexus-workplace / main · 2,847 commits</div>
      <span className="separator">|</span>
      <span className="pill pillCyan">⚡ Indexed</span>
      <div className="topbarRight">
        <span className="pill pillAmber">⚠ 3 Drifts</span>
        <div className="navIcon" title="Settings">⚙</div>
        <div className="navIcon" title="User">👤</div>
      </div>
    </header>
  );
};

export default TopBar;
