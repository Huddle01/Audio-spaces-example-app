"use client";

import React from "react";

// Components
import BottomBar from "@/components/BottomBar/BottomBar";
import useStore from "@/store/slices";

const Audio = ({ params }: { params: { roomId: string } }) => {
  const isSidebarOpen = useStore((state) => state.isSidebarOpen);

  return (
    <section className="bg-audio flex h-screen items-center justify-center w-full relative  text-slate-100">
      <div className="h-[80%] flex items-center justify-center w-full">
        <div className="w-full h-full ml-10 flex items-start justify-center">
          grid
        </div>
        <aside
          className={`w-96 bg-custom-3 h-full mr-1 ${
            isSidebarOpen ? "flex" : "hidden"
          }`}
        >
          Sidebar
        </aside>
      </div>

      <BottomBar />
    </section>
  );
};
export default Audio;
