import { StateCreator } from "zustand";
import { ISidebarState } from "../slices/createHandlerSlice";
import { IRoomSlice } from "../slices/createRoomSlice";

export type IState = ISidebarState & IRoomSlice;

export type StoreSlice<T> = StateCreator<
  IState,
  [["zustand/devtools", never]],
  [],
  T
>;

export type ValueOf<T> = T[keyof T];
