import { StateCreator } from "zustand";
import { ISidebarState } from "../slices/createHandlerSlice";

export type IState = ISidebarState;

export type StoreSlice<T> = StateCreator<
  IState,
  [["zustand/devtools", never]],
  [],
  T
>;

export type ValueOf<T> = T[keyof T];
