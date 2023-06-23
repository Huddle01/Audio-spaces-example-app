import React from "react";

// Store
import useStore from "@/store/slices";

type SidebarProps = {};

const Sidebar: React.FC<SidebarProps> = () => {
  const isSidebarOpen = useStore((state) => state.sidebar.isSidebarOpen);

  const sidebarView = useStore((state) => state.sidebar.sidebarView);

  if (sidebarView === "close") return null;

  return (
    <aside
      className={`w-[28rem] bg-custom-3 h-[40rem] mr-1 rounded-md  transition-all duration-300 ease-out ${
        isSidebarOpen ? "flex" : "hidden"
      }`}
    >
      <div className="px-6 py-3">Header</div>
    </aside>
  );
};
export default React.memo(Sidebar);
