import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { IState } from "../types";
import createSidebarSlice from "./createSidebarSlice";

const useStore = create<IState>()(
  devtools(
    (...a) => ({
      ...createSidebarSlice(...a),
    }),
    { name: "store" }
  )
);

const { getState, setState } = useStore;

export { getState, setState };

export default useStore;
