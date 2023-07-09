import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { IState } from "../types";

// Slices
import createHandlerSlice from "./createHandlerSlice";
import createRoomSlice from "./createRoomSlice";

const useStore = create<IState>()(
  devtools(
    (...a) => ({
      ...createHandlerSlice(...a),
      ...createRoomSlice(...a),
    }),
    { name: "store" }
  )
);

const { getState, setState } = useStore;

export { getState, setState };

export default useStore;
