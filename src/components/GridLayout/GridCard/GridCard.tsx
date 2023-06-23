import Image from "next/image";
import React from "react";

type GridCardProps = {};

const GridCard: React.FC<GridCardProps> = () => {
  return (
    <div className="relative flex items-center justify-center flex-col">
      <Image
        src="/images/default.png"
        alt="default-avatar"
        width={105}
        height={105}
        quality={100}
        priority
      />
      <div className="mt-1 text-center">
        <div className="text-custom-5 text-xl font-medium">name</div>
        <div className="text-custom-6 text-base font-normal">Host</div>
      </div>
    </div>
  );
};
export default GridCard;
