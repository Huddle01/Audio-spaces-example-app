import React from "react";

// Utils
import { cn } from "@/utils/helpers";

// Assets
import { PeerListIcons } from "@/assets/PeerListIcons";

type PeerListProps = {
  count?: number | string;
  className?: string;
  title: string;
  children: React.ReactNode;
};

const PeerList: React.FC<PeerListProps> = ({
  className,
  children,
  title,
  count,
}) => {
  const TitleArr = ["Speakers", "Listeners", "Requested to Speak"];

  return (
    <div className={cn(className)}>
      <div className="h-full overflow-y-auto flex gap-4 items-center">
        <div className="bg-slate-800 h-[1px] flex-1 translate-y-2" />
        <div className="relative mt-4 flex items-center justify-center text-slate-300 text-xs font-medium gap-1">
          {title}
          {TitleArr.includes(title) && <span>- {count}</span>}
          <span>{PeerListIcons.info}</span>
        </div>
        <div className="bg-slate-800 h-[1px] flex-1 translate-y-2" />
      </div>
      {children}
    </div>
  );
};
export default React.memo(PeerList);
