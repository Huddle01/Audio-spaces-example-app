import { create } from 'zustand';

interface AvatarState {
    avatarUrl: string;
    setAvatarUrl: (url: string) => void;
}

export const useAvatarStore = create<AvatarState>((set) => ({
    avatarUrl: '/avatars/avatars/0.png',
    setAvatarUrl: (url: string) => set({ avatarUrl: url }),
}));