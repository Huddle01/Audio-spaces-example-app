import { StoreSlice } from '../types';

export type TSidebarView = 'close' | 'peers';
export type TChatView = 'close' | 'chat';
export type TPromptView = 'close' | 'request-to-speak';

export interface ISidebarState {
  sidebar: {
    isSidebarOpen: boolean;
    sidebarView: TSidebarView;
  };
  chatbar: {
    isChatOpen: boolean;
    chatView: TChatView;
  };
  chatView: TChatView;
  promptView: TPromptView;
  avatarUrl: string;
  isChatOpen: boolean;
  isMyHandRaised: boolean;
  myReaction: string;
  requestedPeers: string[];
  userDisplayName: string;
  setPromptView: (val: TPromptView) => void;
  setSidebarView: (val: TSidebarView) => void;
  setAvatarUrl: (va: string) => void;
  setMyHandRaised: (val: boolean) => void;
  setMyReaction: (val: string) => void;
  addRequestedPeers: (val: string) => void;
  removeRequestedPeers: (val: string) => void;
  setUserDisplayName: (val: string) => void;
  setChatView: (val: TChatView) => void;
  // setIsChatOpen: (val: boolean) => void;
}

const createHandlerSlice: StoreSlice<ISidebarState> = (set, get) => ({
  sidebar: {
    isSidebarOpen: false,
    sidebarView: 'close',
  },
  chatbar: {
    isChatOpen: false,
    chatView: 'close',
  },
  avatarUrl: '/avatars/avatars/0.png',
  chatView: 'close',
  isChatOpen: false,
  promptView: 'close',
  isMyHandRaised: false,
  myReaction: '',
  requestedPeers: [],
  userDisplayName: '',

  setChatView(chatView: TChatView) {
    const prevView = get().chatbar.chatView;

    if (chatView === 'close' || chatView === prevView) {
      set(() => ({
        chatbar: {
          isChatOpen: false,
          chatView: 'close',
        },
      }));
    }

    set(() => ({
      chatbar: {
        isChatOpen: true,
        chatView,
      },
    }));
  },

  setSidebarView(sidebarView: TSidebarView) {
    const prevView = get().sidebar.sidebarView;

    if (sidebarView === 'close' || sidebarView === prevView) {
      set(() => ({
        sidebar: {
          isSidebarOpen: false,
          sidebarView: 'close',
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

    if (val === 'close' || val === prevPromptView) {
      set(() => ({
        promptView: 'close',
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

  setMyHandRaised: (val: boolean) => {
    set(() => ({
      isMyHandRaised: val,
    }));
  },

  setMyReaction: (val: string) => {
    set(() => ({
      myReaction: val,
    }));
  },

  addRequestedPeers: (val: string) => {
    set((state) => ({
      requestedPeers: [...state.requestedPeers, val],
    }));
  },

  removeRequestedPeers: (val: string) => {
    set((state) => ({
      requestedPeers: state.requestedPeers.filter((peer) => peer !== val),
    }));
  },

  setUserDisplayName: (val: string) => {
    set(() => ({
      userDisplayName: val,
    }));
  },
});

export default createHandlerSlice;
