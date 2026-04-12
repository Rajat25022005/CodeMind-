import { useGraphStore } from '../../stores/graphStore';
import './NodeTooltip.css';

interface NodeTooltipProps {
  nodeId: string | null;
}

const NodeTooltip = ({ nodeId }: NodeTooltipProps) => {
  const { graphData } = useGraphStore();

  if (!nodeId) return null;
  const node = graphData.nodes.find((n: any) => n.id === nodeId);
  if (!node) return null;

  const type = node.type || 'module';
  const label = node.label || 'Unknown';
  const props = node.properties || {};

  let icon = '⬡';
  let subtitle = `${type.charAt(0).toUpperCase() + type.slice(1)}`;
  if (type === 'commit') {
    icon = '●';
    subtitle = `Commit by ${props.author || 'Unknown'}`;
  } else if (type === 'feature' || type === 'pr') {
    icon = '⎇';
  } else if (type === 'function' || type === 'class') {
    icon = '⨍';
  }

  return (
    <div
      className="nodeTooltip"
      style={{ bottom: '24px', right: '320px', position: 'absolute' }}
    >
      <div className="ntHeader">
        <div className="ntIcon">{icon}</div>
        <div>
          <div className="ntTitle">{label}</div>
          <div className="ntSub">{subtitle}</div>
        </div>
      </div>
      
      {props.message && (
        <div className="ntRow">
          <span style={{color: '#fff'}}>{props.message}</span>
        </div>
      )}

      {props.language && (
        <div className="ntRow">
          <span>Language</span>
          <span className="ntVal">{props.language}</span>
        </div>
      )}

      {props.lines !== undefined && props.lines > 0 && (
        <div className="ntRow">
          <span>Lines</span>
          <span className="ntVal">{props.lines}</span>
        </div>
      )}

      {props.timestamp && (
        <div className="ntRow">
          <span>Date</span>
          <span className="ntVal">{new Date(props.timestamp).toLocaleDateString()}</span>
        </div>
      )}
    </div>
  );
};

export default NodeTooltip;
