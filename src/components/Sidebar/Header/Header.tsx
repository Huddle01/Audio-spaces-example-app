import { BasicIcons } from "@/assets/BasicIcons";
import useStore from "@/store/slices";
import React from "react";
import ViewComponent from "../ViewController";

type HeaderProps = {};

const Header: React.FC<HeaderProps> = () => {
  const sidebarView = useStore((state) => state.sidebar.sidebarView);

  const setSidebarView = useStore((state) => state.setSidebarView);

  return (
    <div className="px-6 py-3 border-b border-slate-800 flex items-start justify-between w-full">
      <div className="flex items-center gap-4">
        <div>{ViewComponent[sidebarView].icon}</div>
        <div className="text-slate-300 text-base font-inter">
          {ViewComponent[sidebarView].headerData}
        </div>
      </div>

      <button type="button" onClick={() => setSidebarView("close")}>
        {BasicIcons.close}
      </button>
    </div>
  );
};
export default React.memo(Header);
