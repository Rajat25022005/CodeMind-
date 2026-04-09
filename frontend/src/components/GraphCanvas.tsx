import GraphTabBar from './graph/GraphTabBar';
import GraphToolbar from './graph/GraphToolbar';
import GraphSVG from './graph/GraphSVG';
import GraphLegend from './graph/GraphLegend';
import NodeTooltip from './graph/NodeTooltip';
import TimelineStrip from './graph/TimelineStrip';
import './GraphCanvas.css';

/**
 * GraphCanvas
 * Main graph visualization area composing the tab bar, SVG canvas,
 * toolbar, legend, tooltip, and timeline overlays.
 */
const GraphCanvas = () => {
  return (
    <>
      <GraphTabBar />
      <div className="graphArea" id="graph-canvas">
        <GraphToolbar />
        <GraphSVG />
        <GraphLegend />
        <NodeTooltip />
        <TimelineStrip />
      </div>
    </>
  );
};

export default GraphCanvas;
