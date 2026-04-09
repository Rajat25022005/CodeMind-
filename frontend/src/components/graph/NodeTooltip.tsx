import { activeNodeTooltip } from '../../data/mockData';
import './NodeTooltip.css';

const NodeTooltip = () => {
  const data = activeNodeTooltip;

  return (
    <div className="nodeTooltip">
      <div className="ntHeader">
        <div className="ntIcon">{data.icon}</div>
        <div>
          <div className="ntTitle">{data.title}</div>
          <div className="ntSub">{data.subtitle}</div>
        </div>
      </div>
      {data.rows.map((row) => (
        <div key={row.label} className="ntRow">
          <span>{row.label}</span>
          <span className={row.highlight ? 'ntValHighlight' : 'ntVal'}>{row.value}</span>
        </div>
      ))}
      <span className="ntTag">{data.driftTag}</span>
    </div>
  );
};

export default NodeTooltip;
