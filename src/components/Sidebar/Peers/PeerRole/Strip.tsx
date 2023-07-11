import { PeerListIcons } from "@/assets/PeerListIcons";
import { cn } from "@/utils/helpers";
import React from "react";

type StripProps = {
  type: string;
  title: string;
  className?: string;
  variant: "normal" | "danger";
  onClick?: () => void;
};

const Strip: React.FC<StripProps> = ({ type, title, variant, onClick }) => {
  return (
    <div
      className={cn(
        "flex items-center gap-3 text-sm font-normal mb-1 last:mb-0 transition-all duration-300 ease-in-out p-1 cursor-pointer rounded-md",
        variant === "normal"
          ? "text-rgbColors-3"
          : " text-red-400 hover:bg-rgbColors-4 "
      )}
      onClick={onClick}
    >
      <div>{PeerListIcons[type]}</div>
      <div>{title}</div>
    </div>
  );
};
export default React.memo(Strip);
