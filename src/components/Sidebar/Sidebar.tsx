import React from "react";

// Store
import useStore from "@/store/slices";
import { cn } from "@/utils/helpers";
import Header from "./Header/Header";
import ViewComponent from "./ViewController";

type SidebarProps = {};

const Sidebar: React.FC<SidebarProps> = () => {
  const isSidebarOpen = useStore((state) => state.sidebar.isSidebarOpen);

  const sidebarView = useStore((state) => state.sidebar.sidebarView);

  if (sidebarView === "close") return null;

  return (
    <aside
      className={cn(
        "w-[29rem] bg-custom-3 h-[40rem] mr-1 rounded-md  transition-all duration-300 ease-out flex-col max-h-[80vh] my-16",
        isSidebarOpen ? "flex" : "hidden"
      )}
    >
      <Header />

      <div className="px-6 py-4 overflow-y-auto noScrollbar">
        {ViewComponent[sidebarView].component}
      </div>
    </aside>
  );
};
export default React.memo(Sidebar);
