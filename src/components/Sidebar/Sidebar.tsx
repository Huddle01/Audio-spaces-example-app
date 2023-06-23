import React from "react";

// Store
import useStore from "@/store/slices";
import { cn } from "@/utils/helpers";
import Header from "./Header/Header";

type SidebarProps = {};

const Sidebar: React.FC<SidebarProps> = () => {
  const isSidebarOpen = useStore((state) => state.sidebar.isSidebarOpen);

  const sidebarView = useStore((state) => state.sidebar.sidebarView);

  if (sidebarView === "close") return null;

  return (
    <aside
      className={cn(
        "w-[28rem] bg-custom-3 h-[40rem] mr-1 rounded-md  transition-all duration-300 ease-out",
        isSidebarOpen ? "flex" : "hidden"
      )}
    >
      <Header />
    </aside>
  );
};
export default React.memo(Sidebar);
