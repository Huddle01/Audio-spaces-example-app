import React from "react";
import Image from "next/image";

// Assets
import { BasicIcons } from "@/assets/BasicIcons";

type GridCardProps = {};

const GridCard: React.FC<GridCardProps> = () => {
  return (
    <div className="relative flex items-center justify-center flex-col">
      <Image
        src="/images/default.png"
        alt="default-avatar"
        width={100}
        height={100}
        quality={100}
        priority
      />
      <div className="mt-1 text-center">
        <div className="text-custom-5 text-xl font-medium">name</div>
        <div className="text-custom-6 text-base font-normal">Host</div>
      </div>

      <div className="absolute right-0">{BasicIcons.audio}</div>
    </div>
  );
};
export default React.memo(GridCard);
