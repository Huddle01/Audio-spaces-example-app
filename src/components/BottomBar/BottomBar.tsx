"use client";

import useStore from "@/store/slices";
import React from "react";

type BottomBarProps = {};

const BottomBar: React.FC<BottomBarProps> = () => {
  const isSidebarOpen = useStore((state) => state.isSidebarOpen);

  const setIsSidebarOpen = useStore((state) => state.setIsSidebarOpen);

  return (
    <div className="absolute bottom-6 w-full flex items-center px-10">
      <div className="mr-auto">Recording/Leave Role</div>
      <div className="mx-auto">Mic/Cam/Leave</div>
      <div
        className="ml-auto"
        role="presentation"
        onClick={() => setIsSidebarOpen(isSidebarOpen ? false : true)}
      >
        Peers
      </div>
    </div>
  );
};
export default BottomBar;
