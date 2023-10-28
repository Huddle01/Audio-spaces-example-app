import { create } from "zustand";

interface AudioPersistState {
  audioInputDevice: MediaDeviceInfo;
  setAudioInputDevice: (audioInputDevice: MediaDeviceInfo) => void;
  audioOutputDevice: MediaDeviceInfo;
  setAudioOutputDevice: (audioOutputDevice: MediaDeviceInfo) => void;
}

export const useAudioPersistStore = create<AudioPersistState>((set) => ({
  audioInputDevice: {} as MediaDeviceInfo,
  setAudioInputDevice: (audioInputDevice) => set(() => ({ audioInputDevice })),
  audioOutputDevice: {} as MediaDeviceInfo,
  setAudioOutputDevice: (audioOutputDevice) =>
    set(() => ({ audioOutputDevice })),
}));
