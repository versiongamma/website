import { create } from "zustand";

type PageLoadTypeStore = {
  playPageFullLoad: boolean;
  setPageToFullLoad: () => void;
  setPageToContentLoad: () => void;
};

export const usePageLoadTypeStore = create<PageLoadTypeStore>((set) => ({
  playPageFullLoad: true,
  setPageToFullLoad: () => set(() => ({ playPageFullLoad: true })),
  setPageToContentLoad: () => set(() => ({ playPageFullLoad: false })),
}));
