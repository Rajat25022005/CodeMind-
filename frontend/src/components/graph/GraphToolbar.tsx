import { useState } from 'react';
import './GraphToolbar.css';

const tools = [
  { id: 'graph', icon: '⬡', label: 'Graph' },
  { id: 'cluster', icon: '◎', label: 'Cluster' },
  { id: 'timeline', icon: '⟲', label: 'Timeline' },
  { id: 'filter', icon: '⊞', label: 'Filter' },
];

const GraphToolbar = () => {
  const [activeId, setActiveId] = useState('graph');

  return (
    <div className="graphToolbar">
      {tools.map((tool) => (
        <button
          key={tool.id}
          className={`gtBtn ${activeId === tool.id ? 'active' : ''}`}
          onClick={() => setActiveId(tool.id)}
        >
          {tool.icon} {tool.label}
        </button>
      ))}
    </div>
  );
};

export default GraphToolbar;
