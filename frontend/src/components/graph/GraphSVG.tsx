import { useRef, useEffect, useCallback } from 'react';
import { graphNodes, graphEdges, nodeColors, edgeColors } from '../../data/mockData';
import './GraphSVG.css';

const ACTIVE_NODE_ID = 'auth_mid';

const GraphSVG = () => {
  const svgRef = useRef<SVGSVGElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const drawGraph = useCallback(() => {
    const svg = svgRef.current;
    const container = containerRef.current;
    if (!svg || !container) return;

    const W = container.clientWidth;
    const H = container.clientHeight;

    // Clear previous content
    svg.innerHTML = '';

    // Create defs for glow filters
    const defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
    graphNodes.forEach((n) => {
      const filter = document.createElementNS('http://www.w3.org/2000/svg', 'filter');
      filter.setAttribute('id', `glow_${n.id}`);
      filter.setAttribute('x', '-50%');
      filter.setAttribute('y', '-50%');
      filter.setAttribute('width', '200%');
      filter.setAttribute('height', '200%');

      const fe = document.createElementNS('http://www.w3.org/2000/svg', 'feDropShadow');
      fe.setAttribute('dx', '0');
      fe.setAttribute('dy', '0');
      fe.setAttribute('stdDeviation', '4');
      fe.setAttribute('flood-color', nodeColors[n.type] || '#fff');
      fe.setAttribute('flood-opacity', '0.7');

      filter.appendChild(fe);
      defs.appendChild(filter);
    });
    svg.appendChild(defs);

    // Draw edges
    graphEdges.forEach((e) => {
      const fromNode = graphNodes.find((n) => n.id === e.from);
      const toNode = graphNodes.find((n) => n.id === e.to);
      if (!fromNode || !toNode) return;

      const fx = fromNode.x * W;
      const fy = fromNode.y * H;
      const tx = toNode.x * W;
      const ty = toNode.y * H;
      const mx = (fx + tx) / 2;
      const my = (fy + ty) / 2 - 30;

      const color = edgeColors[e.type] || 'rgba(255,255,255,0.1)';

      // Curved edge path
      const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      path.setAttribute('d', `M${fx},${fy} Q${mx},${my} ${tx},${ty}`);
      path.setAttribute('fill', 'none');
      path.setAttribute('stroke', color);
      path.setAttribute('stroke-width', '1.5');
      path.setAttribute('class', 'animatedEdge');
      svg.appendChild(path);

      // Arrowhead
      const dx = tx - mx;
      const dy = ty - my;
      const len = Math.sqrt(dx * dx + dy * dy) || 1;
      const ax = tx - (dx / len) * 14;
      const ay = ty - (dy / len) * 14;
      const perp = { x: (-dy / len) * 5, y: (dx / len) * 5 };

      const arrow = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');
      arrow.setAttribute(
        'points',
        `${tx},${ty} ${ax + perp.x},${ay + perp.y} ${ax - perp.x},${ay - perp.y}`
      );
      arrow.setAttribute('fill', color);
      svg.appendChild(arrow);
    });

    // Draw nodes
    graphNodes.forEach((n) => {
      const px = n.x * W;
      const py = n.y * H;
      const col = nodeColors[n.type] || '#fff';
      const r = n.type === 'module' ? 12 : n.type === 'commit' ? 8 : 10;
      const isActive = n.id === ACTIVE_NODE_ID;

      // Outer glow ring for active node
      if (isActive) {
        const ring = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        ring.setAttribute('cx', String(px));
        ring.setAttribute('cy', String(py));
        ring.setAttribute('r', String(r + 8));
        ring.setAttribute('fill', 'none');
        ring.setAttribute('stroke', col);
        ring.setAttribute('stroke-width', '1');
        ring.setAttribute('opacity', '0.25');
        svg.appendChild(ring);
      }

      // Node circle
      const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
      circle.setAttribute('cx', String(px));
      circle.setAttribute('cy', String(py));
      circle.setAttribute('r', String(r));
      circle.style.fill = col + '22';
      circle.setAttribute('stroke', col);
      circle.setAttribute('stroke-width', isActive ? '2.5' : '1.5');
      if (isActive) {
        circle.setAttribute('filter', `url(#glow_${n.id})`);
      }
      circle.style.cursor = 'pointer';
      svg.appendChild(circle);

      // Label text
      const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
      text.setAttribute('x', String(px));
      text.setAttribute('y', String(py + r + 14));
      text.setAttribute('text-anchor', 'middle');
      text.setAttribute('font-family', 'IBM Plex Mono, monospace');
      text.setAttribute('font-size', '9');
      text.setAttribute('fill', isActive ? col : 'rgba(160,170,185,0.75)');
      text.textContent = n.label;
      svg.appendChild(text);
    });
  }, []);

  useEffect(() => {
    drawGraph();
    window.addEventListener('resize', drawGraph);
    return () => window.removeEventListener('resize', drawGraph);
  }, [drawGraph]);

  return (
    <div ref={containerRef} style={{ position: 'absolute', inset: 0 }}>
      <svg ref={svgRef} className="graphSvg" xmlns="http://www.w3.org/2000/svg" />
    </div>
  );
};

export default GraphSVG;
