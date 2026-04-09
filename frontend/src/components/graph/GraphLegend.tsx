import './GraphLegend.css';

const nodeTypes = [
  { color: '#00d4ff', label: 'Module' },
  { color: '#2dda93', label: 'Function' },
  { color: '#f5a623', label: 'Commit' },
  { color: '#9b7aff', label: 'PR / Issue' },
  { color: '#ff4e6a', label: 'Drift' },
];

const edgeTypes = [
  { color: 'rgba(0, 212, 255, 0.5)', label: 'depends_on' },
  { color: 'rgba(45, 218, 147, 0.5)', label: 'introduced_by' },
  { color: 'rgba(245, 166, 35, 0.5)', label: 'refactored_because' },
];

const GraphLegend = () => {
  return (
    <div className="graphLegend">
      <div className="legendTitle">Node Types</div>
      {nodeTypes.map((nt) => (
        <div key={nt.label} className="legendRow">
          <div className="legendDot" style={{ background: nt.color }} />
          {nt.label}
        </div>
      ))}
      <div className="legendDivider">
        <div className="legendTitle">Edge Types</div>
        {edgeTypes.map((et) => (
          <div key={et.label} className="legendRow">
            <div className="legendLine" style={{ background: et.color }} />
            {et.label}
          </div>
        ))}
      </div>
    </div>
  );
};

export default GraphLegend;
