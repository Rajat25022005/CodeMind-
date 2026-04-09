/**
 * Mock data for the CodeMind UI demo.
 * This will be replaced with real API data later.
 */
import type {
  GraphNode,
  GraphEdge,
  Message,
  DriftItem,
  TimelineItem,
  StatusStats,
  SidebarItem,
  Tab,
} from '../types';

/* ── Graph Nodes ── */
export const graphNodes: GraphNode[] = [
  { id: 'auth_mid',  label: 'auth/middleware.py', type: 'module', x: 0.50, y: 0.38 },
  { id: 'jwt',       label: 'auth/jwt.py',       type: 'drift',  x: 0.38, y: 0.24 },
  { id: 'session',   label: 'auth/session.py',    type: 'module', x: 0.63, y: 0.22 },
  { id: 'user_svc',  label: 'UserService',        type: 'func',   x: 0.72, y: 0.40 },
  { id: 'db_conn',   label: 'db/connection.py',   type: 'module', x: 0.75, y: 0.58 },
  { id: 'rate_lim',  label: 'RateLimiter',        type: 'func',   x: 0.55, y: 0.57 },
  { id: 'token_ref', label: 'token_refresh()',     type: 'func',   x: 0.33, y: 0.46 },
  { id: 'pr47',      label: 'PR #47',             type: 'pr',     x: 0.25, y: 0.34 },
  { id: 'pr52',      label: 'PR #52',             type: 'pr',     x: 0.28, y: 0.60 },
  { id: 'c4f3',      label: '4f3a9c2',            type: 'commit', x: 0.18, y: 0.47 },
  { id: 'payment',   label: 'payments/core.py',   type: 'module', x: 0.82, y: 0.30 },
  { id: 'notif',     label: 'notifications/',     type: 'module', x: 0.85, y: 0.50 },
];

/* ── Graph Edges ── */
export const graphEdges: GraphEdge[] = [
  { from: 'pr47',      to: 'auth_mid',  type: 'refactored' },
  { from: 'auth_mid',  to: 'jwt',       type: 'depends' },
  { from: 'auth_mid',  to: 'session',   type: 'depends' },
  { from: 'auth_mid',  to: 'rate_lim',  type: 'introduced' },
  { from: 'auth_mid',  to: 'token_ref', type: 'depends' },
  { from: 'token_ref', to: 'jwt',       type: 'depends' },
  { from: 'c4f3',      to: 'token_ref', type: 'introduced' },
  { from: 'pr52',      to: 'rate_lim',  type: 'introduced' },
  { from: 'user_svc',  to: 'auth_mid',  type: 'depends' },
  { from: 'user_svc',  to: 'db_conn',   type: 'depends' },
  { from: 'db_conn',   to: 'payment',   type: 'depends' },
  { from: 'user_svc',  to: 'notif',     type: 'depends' },
  { from: 'pr47',      to: 'c4f3',      type: 'refactored' },
];

/* ── Color Maps ── */
export const nodeColors: Record<string, string> = {
  module: '#00d4ff',
  func:   '#2dda93',
  commit: '#f5a623',
  pr:     '#9b7aff',
  drift:  '#ff4e6a',
};

export const edgeColors: Record<string, string> = {
  depends:    'rgba(0, 212, 255, 0.3)',
  introduced: 'rgba(45, 218, 147, 0.35)',
  refactored: 'rgba(245, 166, 35, 0.35)',
};

/* ── Chat Messages ── */
export const mockMessages: Message[] = [
  {
    id: 'msg-1',
    role: 'user',
    content: 'Why was auth middleware completely rewritten in v2?',
    timestamp: '10:42 AM',
  },
  {
    id: 'msg-2',
    role: 'ai',
    content:
      'The v2 rewrite was triggered by a <strong style="color:var(--cyan)">JWT expiry race condition</strong> discovered in production. Here\'s the evidence trail:',
    timestamp: '10:42 AM',
    hops: 3,
    citations: [
      { badge: 'PR #47', text: '"Refactor JWT flow to eliminate race on concurrent token refresh"' },
      { badge: 'Commit 4f3a9c2', text: 'Fix: validate expiry atomically under lock' },
      { badge: 'Comment', text: '@sarah: "seen this in prod twice, needs a full rethink"' },
    ],
    traceSteps: [
      { label: 'Graph walk', done: true },
      { label: 'PR lookup', done: true },
      { label: 'Synthesize', done: true },
    ],
  },
  {
    id: 'msg-3',
    role: 'user',
    content: 'What edge cases does the token refresh logic handle?',
    timestamp: '10:44 AM',
  },
  {
    id: 'msg-4',
    role: 'ai',
    content:
      'Based on commit history and inline comments, the refresh logic handles:<br/><br/>' +
      '<strong style="color:var(--green)">1.</strong> Simultaneous refresh from multiple tabs (mutex added in <span style="color:var(--purple);font-family:var(--font-mono);font-size:10px">commit 7c2e1f0</span>)<br/>' +
      '<strong style="color:var(--green)">2.</strong> Clock skew between services (<span style="color:var(--purple);font-family:var(--font-mono);font-size:10px">5s leeway</span> introduced PR #49)<br/>' +
      '<strong style="color:var(--green)">3.</strong> Revoked tokens mid-session via Redis blocklist',
    timestamp: 'streaming...',
    isStreaming: true,
  },
];

/* ── Drift Items ── */
export const mockDriftItems: DriftItem[] = [
  {
    file: 'auth/jwt.py',
    timeAgo: '6h ago',
    message:
      'Token expiry validation no longer matches PR #47\'s documented atomic behavior. Concurrent refresh path is unguarded.',
    severity: 'BEHAVIOR_DRIFT',
  },
  {
    file: 'payments/webhook.py',
    timeAgo: '1d ago',
    message:
      'Idempotency key logic removed in commit <span style="color:var(--purple);font-family:var(--font-mono)">c91d3ae</span> without closing the original issue.',
    severity: 'MISSING_INTENT',
  },
  {
    file: 'db/connection.py',
    timeAgo: '3d ago',
    message:
      'Connection pool size hardcoded to 5; PR #38 comment specified it should always be configurable.',
    severity: 'CONSTRAINT_VIOLATION',
  },
];

/* ── Timeline Items ── */
export const mockTimelineItems: TimelineItem[] = [
  {
    title: 'PR #52 merged',
    description: 'Add rate-limit middleware · 2h ago',
    color: 'var(--cyan)',
    bgColor: 'var(--cyan-dim)',
  },
  {
    title: 'Drift flagged',
    description: 'auth/jwt.py diverged · 6h ago',
    color: 'var(--amber)',
    bgColor: 'var(--amber-dim)',
  },
  {
    title: 'Commit 4f3a9c2',
    description: 'Fix token expiry race · 1d ago',
    color: 'var(--green)',
    bgColor: 'var(--green-dim)',
  },
  {
    title: 'PR #47 merged',
    description: 'Auth v2 rewrite · 4d ago',
    color: 'var(--purple)',
    bgColor: 'rgba(155, 122, 255, 0.2)',
  },
];

/* ── Status Bar Stats ── */
export const mockStats: StatusStats = {
  nodes: 1247,
  edges: 3891,
  commits: 2847,
  model: 'llama3:8b',
  avgQuery: '127ms',
  driftCount: 3,
};

/* ── Sidebar Items ── */
export const sidebarItems: SidebarItem[] = [
  { icon: '⬡', title: 'Graph', id: 'graph' },
  { icon: '💬', title: 'Query', id: 'query' },
  { icon: '📅', title: 'Timeline', id: 'timeline' },
];

export const sidebarSecondary: SidebarItem[] = [
  { icon: '📁', title: 'Files', id: 'files' },
  { icon: '🔀', title: 'Commits', id: 'commits' },
];

/* ── Tab Definitions ── */
export const graphTabs: Tab[] = [
  { label: 'Knowledge Graph', color: 'var(--cyan)',   id: 'knowledge-graph' },
  { label: 'Decision Trail',  color: 'var(--amber)',  id: 'decision-trail' },
  { label: 'Diff Viewer',     color: 'var(--green)',  id: 'diff-viewer' },
  { label: 'Onboarding',      color: 'var(--purple)', id: 'onboarding' },
];

/* ── Node Tooltip Demo Data ── */
export const activeNodeTooltip = {
  icon: '⬡',
  title: 'auth/middleware.py',
  subtitle: 'Module · 847 lines · Python',
  rows: [
    { label: 'Last modified', value: '2 days ago' },
    { label: 'Commits touching', value: '23' },
    { label: 'Dependents', value: '7 modules' },
    { label: 'Key event', value: 'v2 rewrite', highlight: true },
  ],
  driftTag: '⚠ Intent drift detected',
};
