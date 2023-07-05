import React from "react";
import Image from "next/image";

// Assets
import { BasicIcons } from "@/assets/BasicIcons";
import { Audio } from "@huddle01/react/components";
import { Peer } from "@/utils/types";


type GridCardProps = {
  peer: Peer;
};

const GridCard: React.FC<GridCardProps> = ({ peer }) => {
  return (
    <div className="relative flex items-center justify-center flex-col">
      {peer.mic && <Audio peerId={peer?.peerId} track={peer?.mic} />}
      <Image
        src="/images/user-avatar.png"
        alt="default-avatar"
        width={100}
        height={100}
        quality={100}
        priority
      />
      <div className="mt-1 text-center">
        <div className="text-custom-5 text-xl font-medium">{peer?.displayName}</div>
        <div className="text-custom-6 text-base font-normal">{peer?.role}</div>
      </div>

      <div className="absolute right-0">{BasicIcons.audio}</div>
    </div>
  );
};
export default React.memo(GridCard);
