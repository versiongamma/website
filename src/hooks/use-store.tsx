import { create } from 'zustand';

type PageLoadTypeStore = {
  playPageFullLoad: boolean;
  homePageAtTop: boolean;
  setHomePageAtTop: (value: boolean) => void;
  setPageToFullLoad: () => void;
  setPageToContentLoad: () => void;
};

export const usePageLoadTypeStore = create<PageLoadTypeStore>((set) => ({
  playPageFullLoad: true,
  homePageAtTop: true,
  setHomePageAtTop: (value) => set(() => ({ homePageAtTop: value })),
  setPageToFullLoad: () => set(() => ({ playPageFullLoad: true })),
  setPageToContentLoad: () => set(() => ({ playPageFullLoad: false })),
}));
