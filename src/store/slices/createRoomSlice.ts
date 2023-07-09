import { StoreSlice } from "../types";

export type TRoom = {
  roomId: string;
};

export interface IRoomSlice {
  roomData: TRoom;
  setRoomData<K extends keyof TRoom>(key: K, value: TRoom[K]): void;
}

const createRoomSlice: StoreSlice<IRoomSlice> = (set, get) => ({
  roomData: {
    roomId: "",
  },

  setRoomData(key, value) {
    set(() => ({
      roomData: {
        ...get().roomData,
        [key]: value,
      },
    }));
  },
});

export default createRoomSlice;
