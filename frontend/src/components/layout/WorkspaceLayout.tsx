import { useState } from 'react';
import TopBar from './TopBar';
import Sidebar from './Sidebar';
import BottomStrip from './BottomStrip';
import GraphCanvas from '../GraphCanvas';
import QueryPanel from '../QueryPanel';
import DriftAlerts from '../DriftAlerts';
import './WorkspaceLayout.css';

const WorkspaceLayout = () => {
  const [driftOpen, setDriftOpen] = useState(false);

  return (
    <>
      <TopBar />
      <div className="workspace">
        <Sidebar onToggleDrift={() => setDriftOpen((prev) => !prev)} />
        <div className="mainArea">
          <GraphCanvas />
        </div>
        <QueryPanel />
        {driftOpen && <DriftAlerts onClose={() => setDriftOpen(false)} />}
      </div>
      <BottomStrip />
    </>
  );
};

export default WorkspaceLayout;
