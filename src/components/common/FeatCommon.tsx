import { BasicIcons } from "@/assets/BasicIcons";
import { cn } from "@/utils/helpers";
import React, { useRef } from "react";

interface Props {
  children: React.ReactNode;
  onClose: () => void;
  className?: string;
}

const iconHeight = {
  bg: "h-52",
  vr: "h-[36rem]",
  avatar: "h-80",
};

const FeatCommon = ({ onClose, children, className }: Props) => {
  const menuRef = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={menuRef}
      className={
        "bg-custom-2  absolute top-1/2 -right-5  z-50 h-fit w-[16rem] lg:w-[28rem] -translate-y-[30%] translate-x-full rounded-3xl border  border-slate-700 py-4 text-center text-white shadow-xl " +
        className
      }
    >
      <div className="flex justify-between items-center border-b border-b-slate-700 px-8 pb-2.5">
        <div className="flex items-center">
          <div className="ml-2  font-medium text-slate-300">
            Select your Avatar
          </div>
        </div>
        <div className="cursor-pointer" onClick={onClose} role="presentation">
          {BasicIcons.close}
        </div>
      </div>

      {/* Check to set the height for custom-bg lobby box */}
      <div className={cn(" overflow-y-auto noScrollbar h-80")}>{children}</div>

      <div className="absolute inset-0 top-1/2 h-0 w-0 -translate-x-full rounded-xl border-[10px] border-l-0 border-transparent border-r-slate-700 ">
        <div className="absolute top-1/2 left-0 h-0 w-0 translate-x-[2px] -translate-y-1/2 rounded-xl border-[10px] border-l-0 border-transparent border-r-zinc-900 " />
      </div>
    </div>
  );
};

export default React.memo(FeatCommon);
