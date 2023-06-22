import { StoreSlice } from "../types";

export interface ISidebarState {
  isSidebarOpen: boolean;
  setIsSidebarOpen: (val: boolean) => void;
}

const createSidebarSlice: StoreSlice<ISidebarState> = (set) => ({
  isSidebarOpen: false,

  setIsSidebarOpen(val: boolean) {
    set(() => ({
      isSidebarOpen: val,
    }));
  },
});

export default createSidebarSlice;
