import { useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useUIStore } from '../../stores/uiStore';
import { sidebarItems, sidebarSecondary } from '../../lib/constants';
import { useRepoStore } from '../../stores/repoStore';
import { useAuthStore } from '../../stores/authStore';
import './Sidebar.css';

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const toggleDrift = useUIStore((s) => s.toggleDrift);
  const logout = useAuthStore((s) => s.logout);
  const driftCount = useRepoStore((s) => s.driftCount);

  const isActive = useCallback((path: string) => location.pathname === path, [location.pathname]);

  const handleLogout = useCallback(() => {
    logout();
    navigate('/login');
  }, [logout, navigate]);

  return (
    <nav className="sidebar" aria-label="Main navigation">
      {sidebarItems.map((item) => (
        <button
          key={item.id}
          className={`sbBtn ${isActive(item.path) ? 'active' : ''}`}
          title={item.title}
          onClick={() => navigate(item.path)}
        >
          {item.icon}
        </button>
      ))}
      <div className="sbDivider" />
      {sidebarSecondary.map((item) => (
        <button
          key={item.id}
          className={`sbBtn ${isActive(item.path) ? 'active' : ''}`}
          title={item.title}
          onClick={() => navigate(item.path)}
        >
          {item.icon}
        </button>
      ))}
      <div className="sbDivider" />
      <button className="sbAlert" title="Drift Alerts" onClick={toggleDrift}>
        ⚠
        {driftCount > 0 && <span className="alertBadge">{driftCount}</span>}
      </button>
      <div className="flex-1" />
      <button 
        className="sbBtn mt-auto mb-4 hover:text-red-400" 
        title="Logout" 
        onClick={handleLogout}
      >
        🚪
      </button>
    </nav>
  );
};

export default Sidebar;
