import React from "react";

// Store
import useStore from "@/store/slices";

type SidebarProps = {};

const Sidebar: React.FC<SidebarProps> = () => {
  const isSidebarOpen = useStore((state) => state.isSidebarOpen);
  return (
    <aside
      className={`w-96 bg-custom-3 h-[40rem] mr-1 rounded-md ${
        isSidebarOpen ? "flex" : "hidden"
      }`}
    >
      Sidebar
    </aside>
  );
};
export default React.memo(Sidebar);
