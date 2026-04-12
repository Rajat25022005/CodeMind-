import { create } from 'zustand';

export interface RepoInfo {
  name: string;
  branch: string;
  path: string;
}

interface RepoStore {
  activeRepo: RepoInfo | null;
  hasLoadedStatus: boolean;
  isIndexing: boolean;
  indexingProgress: number;
  driftCount: number;
  setActiveRepo: (repo: RepoInfo | null) => void;
  setHasLoadedStatus: (val: boolean) => void;
  setIsIndexing: (val: boolean) => void;
  setIndexingProgress: (val: number) => void;
  setDriftCount: (val: number) => void;
}

export const useRepoStore = create<RepoStore>((set) => ({
  activeRepo: null,
  hasLoadedStatus: false,
  isIndexing: false,
  indexingProgress: 0,
  driftCount: 0,
  setActiveRepo: (repo) => set({ activeRepo: repo }),
  setHasLoadedStatus: (val) => set({ hasLoadedStatus: val }),
  setIsIndexing: (val) => set({ isIndexing: val }),
  setIndexingProgress: (val) => set({ indexingProgress: val }),
  setDriftCount: (val) => set({ driftCount: val }),
}));
