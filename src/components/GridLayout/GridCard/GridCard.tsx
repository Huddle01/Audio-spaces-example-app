import React from "react";
import Image from "next/image";

// Assets
import { BasicIcons } from "@/assets/BasicIcons";
import { Peer } from "@/utils/types";
import useStore from "@/store/slices";
import Audio from "@/components/clientComponents/Audio";

type GridCardProps = {
  peer: Peer;
};

const GridCard: React.FC<GridCardProps> = ({ peer }) => {
  const avatarUrl = useStore((state) => state.avatarUrl);

  return (
    <div className="relative flex items-center justify-center flex-col">
      {peer.mic && <Audio track={peer?.mic} />}
      <Image
        src={avatarUrl}
        alt="default-avatar"
        width={100}
        height={100}
        quality={100}
        priority
        className="maskAvatar"
      />
      <div className="mt-1 text-center">
        <div className="text-custom-5 text-xl font-medium">
          {peer?.displayName}
        </div>
        <div className="text-custom-6 text-base font-normal">{peer?.role}</div>
      </div>

      <div className="absolute right-0">{BasicIcons.audio}</div>
    </div>
  );
};
export default React.memo(GridCard);
