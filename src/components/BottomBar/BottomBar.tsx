"use client";

import React from "react";

// Store
import useStore from "@/store/slices";
import { BasicIcons, NestedBasicIcons } from "@/assets/BasicIcons";

type BottomBarProps = {};

const BottomBar: React.FC<BottomBarProps> = () => {
  const isSidebarOpen = useStore((state) => state.isSidebarOpen);

  const setIsSidebarOpen = useStore((state) => state.setIsSidebarOpen);

  return (
    <div className="absolute bottom-6 w-full flex items-center px-10">
      <button
        type="button"
        className="mr-auto flex items-center justify-between gap-3 border border-custom-4 rounded-lg py-2 px-3 w-44"
      >
        <div className="flex items-center gap-2">
          {BasicIcons.record}
          <div>Record</div>
        </div>
        <div>{BasicIcons.moreOptions}</div>
      </button>

      <div className="mx-auto flex items-center gap-4">
        <button>{NestedBasicIcons.active.mic}</button>
        <button>{BasicIcons.avatar}</button>
        <button>{BasicIcons.leave}</button>
      </div>

      <button
        type="button"
        className="ml-auto flex items-center gap-3 border border-custom-4 rounded-lg py-2 px-3"
        onClick={() => setIsSidebarOpen(isSidebarOpen ? false : true)}
      >
        {BasicIcons.peers}
        <span>count</span>
      </button>
    </div>
  );
};
export default React.memo(BottomBar);
