import React from "react";
import Image from "next/image";

// Assets
import { BasicIcons } from "@/assets/BasicIcons";
import { Audio } from "@huddle01/react/components";
import { IRoleEnum } from "@/utils/types";
import useStore from "@/store/slices";

type GridCardProps = {
  peerId: string;
  displayName: string;
  mic?: MediaStreamTrack | null;
  role: IRoleEnum;
  avatarUrl: string;
};

const GridCard: React.FC<GridCardProps> = ({
  peerId,
  role,
  displayName,
  mic,
  avatarUrl
}) => {

  return (
    <div className="relative flex items-center justify-center flex-col">
      {mic && <Audio peerId={peerId} track={mic} />}
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
        <div className="text-custom-5 text-xl font-medium">{displayName}</div>
        <div className="text-custom-6 text-base font-normal">{role}</div>
      </div>

      <div className="absolute right-0">{BasicIcons.audio}</div>
    </div>
  );
};
export default React.memo(GridCard);
