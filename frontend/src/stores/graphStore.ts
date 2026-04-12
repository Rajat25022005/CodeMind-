import { create } from 'zustand';

interface GraphState {
  selectedNodeId: string | null;
  setSelectedNodeId: (id: string | null) => void;
  toggleNodeSelection: (id: string) => void;
  graphData: { nodes: any[]; links: any[] };
  setGraphData: (data: { nodes: any[]; links: any[] }) => void;
}

export const useGraphStore = create<GraphState>((set, get) => ({
  selectedNodeId: null,
  graphData: { nodes: [], links: [] },

  setSelectedNodeId: (id) => set({ selectedNodeId: id }),

  toggleNodeSelection: (id) =>
    set({ selectedNodeId: get().selectedNodeId === id ? null : id }),

  setGraphData: (data) => set({ graphData: data }),
}));
