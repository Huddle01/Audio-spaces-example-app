import { StoreSlice } from "../types";

export type TSidebarView = "close" | "peers";
export type TPromptView = "close" | "request-to-speak";

export interface ISidebarState {
  sidebar: {
    isSidebarOpen: boolean;
    sidebarView: TSidebarView;
  };
  promptView: TPromptView;
  setPromptView: (val: TPromptView) => void;
  setSidebarView: (val: TSidebarView) => void;
}

const createHandlerSlice: StoreSlice<ISidebarState> = (set, get) => ({
  sidebar: {
    isSidebarOpen: false,
    sidebarView: "close",
  },

  promptView: "close",

  setSidebarView(sidebarView: TSidebarView) {
    const prevView = get().sidebar.sidebarView;

    if (sidebarView === "close" || sidebarView === prevView) {
      set(() => ({
        sidebar: {
          isSidebarOpen: false,
          sidebarView: "close",
        },
      }));
    }

    set(() => ({
      sidebar: {
        isSidebarOpen: true,
        sidebarView,
      },
    }));
  },

  setPromptView: (val: TPromptView) => {
    const prevPromptView = get().promptView;

    if (val === "close" || val === prevPromptView) {
      set(() => ({
        promptView: "close",
      }));
    }

    set(() => ({
      promptView: val,
    }));
  },
});

export default createHandlerSlice;
