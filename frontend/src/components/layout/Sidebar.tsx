import { useState } from 'react';
import { sidebarItems, sidebarSecondary } from '../../data/mockData';
import './Sidebar.css';

interface SidebarProps {
  onToggleDrift: () => void;
}

const Sidebar = ({ onToggleDrift }: SidebarProps) => {
  const [activeId, setActiveId] = useState('graph');

  return (
    <nav className="sidebar" aria-label="Main navigation">
      {sidebarItems.map((item) => (
        <button
          key={item.id}
          className={`sbBtn ${activeId === item.id ? 'active' : ''}`}
          title={item.title}
          onClick={() => setActiveId(item.id)}
        >
          {item.icon}
        </button>
      ))}
      <div className="sbDivider" />
      {sidebarSecondary.map((item) => (
        <button
          key={item.id}
          className={`sbBtn ${activeId === item.id ? 'active' : ''}`}
          title={item.title}
          onClick={() => setActiveId(item.id)}
        >
          {item.icon}
        </button>
      ))}
      <div className="sbDivider" />
      <button className="sbAlert" title="Drift Alerts" onClick={onToggleDrift}>
        ⚠
        <span className="alertBadge">3</span>
      </button>
    </nav>
  );
};

export default Sidebar;
