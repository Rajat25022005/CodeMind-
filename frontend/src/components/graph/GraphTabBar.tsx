import { useState } from 'react';
import { graphTabs } from '../../data/mockData';
import './GraphTabBar.css';

const GraphTabBar = () => {
  const [activeTabId, setActiveTabId] = useState('knowledge-graph');

  return (
    <div className="tabbar" role="tablist">
      {graphTabs.map((tab) => (
        <button
          key={tab.id}
          className={`tab ${activeTabId === tab.id ? 'active' : ''}`}
          role="tab"
          aria-selected={activeTabId === tab.id}
          onClick={() => setActiveTabId(tab.id)}
        >
          <span className="tabDot" style={{ background: tab.color }} />
          {tab.label}
        </button>
      ))}
    </div>
  );
};

export default GraphTabBar;
