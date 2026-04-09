/* ── CodeMind Type Definitions ── */

export type NodeType = 'module' | 'func' | 'commit' | 'pr' | 'drift';

export type EdgeType = 'depends' | 'introduced' | 'refactored';

export interface GraphNode {
  id: string;
  label: string;
  type: NodeType;
  /** Relative position 0-1 within the canvas */
  x: number;
  y: number;
}

export interface GraphEdge {
  from: string;
  to: string;
  type: EdgeType;
}

export type MessageRole = 'user' | 'ai';

export interface Citation {
  badge: string;
  text: string;
}

export interface TraceStep {
  label: string;
  done: boolean;
}

export interface Message {
  id: string;
  role: MessageRole;
  content: string;
  timestamp: string;
  citations?: Citation[];
  traceSteps?: TraceStep[];
  /** Number of reasoning hops (AI messages only) */
  hops?: number;
  /** Whether message is still streaming */
  isStreaming?: boolean;
}

export type DriftSeverity = 'BEHAVIOR_DRIFT' | 'MISSING_INTENT' | 'CONSTRAINT_VIOLATION';

export interface DriftItem {
  file: string;
  timeAgo: string;
  message: string;
  severity: DriftSeverity;
}

export interface TimelineItem {
  title: string;
  description: string;
  color: string;
  bgColor: string;
}

export interface StatusStats {
  nodes: number;
  edges: number;
  commits: number;
  model: string;
  avgQuery: string;
  driftCount: number;
}

export interface SidebarItem {
  icon: string;
  title: string;
  id: string;
}

export interface Tab {
  label: string;
  color: string;
  id: string;
}
