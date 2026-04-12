import { useState, useEffect, useCallback } from 'react';
import { fetchStatus } from '../../lib/api';
import { useRepoStore } from '../../stores/repoStore';
import type { StatusStats } from '../../types';
import './BottomStrip.css';

const POLL_INTERVAL_MS = 60_000; // Refresh status every 60 seconds

const BottomStrip = () => {
  const [stats, setStats] = useState<StatusStats>({
    nodes: 0, edges: 0, commits: 0, model: '—', avgQuery: '—', driftCount: 0,
  });
  const setDriftCount = useRepoStore((s) => s.setDriftCount);

  const refreshStatus = useCallback(() => {
    fetchStatus()
      .then((res) => {
        const drift = res.drift_count ?? 0;
        setStats({
          nodes: res.nodes ?? 0,
          edges: res.edges ?? 0,
          commits: res.commits ?? 0,
          model: res.model || 'unknown',
          avgQuery: `${Math.round(res.avg_query_ms || 0)}ms`,
          driftCount: drift,
        });
        setDriftCount(drift);
      })
      .catch((err) => console.warn('Failed to fetch status:', err));
  }, [setDriftCount]);

  useEffect(() => {
    refreshStatus();
    const interval = setInterval(refreshStatus, POLL_INTERVAL_MS);
    return () => clearInterval(interval);
  }, [refreshStatus]);

  return (
    <footer className="bottomStrip">
      <div className="bsItem">
        🧠 <span className="bsHighlight">{stats.nodes.toLocaleString()}</span> nodes
      </div>
      <div className="bsItem">
        ⬡ <span className="bsHighlight">{stats.edges.toLocaleString()}</span> edges
      </div>
      <div className="bsItem">
        🔀 <span className="bsHighlight">{stats.commits.toLocaleString()}</span> commits indexed
      </div>
      <div className="bsItem">
        📦 Ollama <span className="bsHighlight">{stats.model}</span> · local
      </div>
      <div className="bsItem">
        ⚡ <span className="bsHighlight">{stats.avgQuery}</span> avg query
      </div>
      <div className="bsDrift">
        <div className="bsDriftDot" />
        {stats.driftCount} intent drifts active
      </div>
    </footer>
  );
};

export default BottomStrip;
