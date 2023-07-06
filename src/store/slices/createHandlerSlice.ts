import { StoreSlice } from "../types";

export type TSidebarView = "close" | "peers";
export type TPromptView = "close" | "request-to-speak";

export interface ISidebarState {
  sidebar: {
    isSidebarOpen: boolean;
    sidebarView: TSidebarView;
  };
  promptView: TPromptView;
  avatarUrl: string;
  setPromptView: (val: TPromptView) => void;
  setSidebarView: (val: TSidebarView) => void;
  setAvatarUrl: (va: string) => void;
}

const createHandlerSlice: StoreSlice<ISidebarState> = (set, get) => ({
  sidebar: {
    isSidebarOpen: false,
    sidebarView: "close",
  },
  avatarUrl: "/avatars/avatars/0.png",
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

  setAvatarUrl: (val: string) => {
    set(() => ({
      avatarUrl: val,
    }));
  },
});

export default createHandlerSlice;
