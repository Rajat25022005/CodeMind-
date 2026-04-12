import { useState, useEffect } from 'react';
import DOMPurify from 'dompurify';
import { fetchDrift } from '../lib/api';
import type { DriftItem } from '../types';
import './DriftAlerts.css';

interface DriftAlertsProps {
  onClose: () => void;
}

const DriftAlerts = ({ onClose }: DriftAlertsProps) => {
  const [driftItems, setDriftItems] = useState<DriftItem[]>([]);

  useEffect(() => {
    fetchDrift()
      .then((res) => {
        if (res.alerts) {
          const mapped = res.alerts.map((a: any) => ({
            file: a.file || '',
            timeAgo: a.time_ago || a.timeAgo || 'recently',
            message: a.message || '',
            severity: a.severity || '',
          }));
          setDriftItems(mapped);
        }
      })
      .catch((err) => console.warn('Failed to fetch drift alerts:', err));
  }, []);

  return (
    <div className="driftPanel" id="drift-alerts">
      <div className="dpHeader">
        <div className="dpTitle">
          ⚠ Intent Drift Alerts
          <span className="dpTitleCount">{driftItems.length} active</span>
        </div>
        <button className="dpClose" onClick={onClose} aria-label="Close drift panel">
          ✕
        </button>
      </div>

      {driftItems.map((item, idx) => (
        <div key={idx} className="driftItem">
          <div className="diTop">
            <div className="diFile">{item.file}</div>
            <div className="diTime">{item.timeAgo}</div>
          </div>
          <div className="diMsg" dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(item.message) }} />
          <span className="diBadge">{item.severity}</span>
        </div>
      ))}
    </div>
  );
};

export default DriftAlerts;
