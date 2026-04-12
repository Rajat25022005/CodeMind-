import { useState, useEffect } from 'react';
import { fetchTimeline } from '../../lib/api';
import './TimelineStrip.css';

const typeColors: Record<string, { color: string; bgColor: string }> = {
  commit:  { color: 'var(--green)',  bgColor: 'var(--green-dim)' },
  pr:      { color: 'var(--purple)', bgColor: 'rgba(155,122,255,0.2)' },
  drift:   { color: 'var(--amber)',  bgColor: 'var(--amber-dim)' },
  release: { color: 'var(--cyan)',   bgColor: 'var(--cyan-dim)' },
};

const TimelineStrip = () => {
  const [items, setItems] = useState<{ title: string; description: string; color: string; bgColor: string }[]>([]);

  useEffect(() => {
    fetchTimeline(5)
      .then((res) => {
        if (res.events) {
          setItems(res.events.map((e: any) => ({
            title: e.title || e.hash || '',
            description: e.description || '',
            ...(typeColors[e.type] || typeColors.commit),
          })));
        }
      })
      .catch(() => {/* silent — strip just stays empty */});
  }, []);

  if (items.length === 0) return null;

  return (
    <div className="timelineStrip">
      <div className="tlTitle">Recent Activity</div>
      {items.map((item, idx) => (
        <div key={idx} className="tlItem">
          <div
            className="tlDot"
            style={{ background: item.bgColor, borderColor: item.color }}
          />
          <div className="tlText">
            <strong>{item.title}</strong>
            {item.description}
          </div>
        </div>
      ))}
    </div>
  );
};

export default TimelineStrip;
