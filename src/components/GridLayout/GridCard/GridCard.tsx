import React, { useEffect, useState } from "react";
import Image from "next/image";

// Assets
import { BasicIcons } from "@/assets/BasicIcons";
import Audio from "@/components/common/Audio";
import { IRoleEnum } from "@/utils/types";
import useStore from "@/store/slices";
import { useEventListener, useHuddle01 } from "@huddle01/react/hooks";

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
  avatarUrl,
}) => {
  const [reaction, setReaction] = useState("");
  const [isHandRaised, setIsHandRaised] = useState(false);
  const isMyHandRaised = useStore((state) => state.isMyHandRaised);
  const myReaction = useStore((state) => state.myReaction);
  const { me } = useHuddle01();

  useEventListener("room:data-received", (data) => {
    if (data.fromPeerId === peerId && data.payload["reaction"]) {
      setReaction(data.payload["reaction"]);
      setTimeout(() => {
        setReaction("");
      }, 5000);
    }

    if (
      data.fromPeerId === peerId &&
      (data.payload["raiseHand"] == true || data.payload["raiseHand"] == false)
    ) {
      setIsHandRaised(data.payload["raiseHand"]);
    }
  });

  useEffect(() => {
    if (peerId === me.meId) {
      setIsHandRaised(isMyHandRaised);
    }
  }, [isMyHandRaised]);

  useEffect(() => {
    if (myReaction && peerId === me.meId) {
      setReaction(myReaction);
      setTimeout(() => {
        setReaction("");
      }, 5000);
    }
  }, [myReaction]);

  return (
    <div className="relative flex items-center justify-center flex-col">
      {mic && <Audio track={mic} />}
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
        <div className="text-custom-5 text-base font-medium">
          {me.meId === peerId ? `${displayName} (You)` : displayName}
        </div>
        <div className="text-custom-6 text-sm font-normal">{role}</div>
      </div>
      <div className="absolute left-1/2 bottom-1/2 -translate-x-1/2 mb-2 text-4xl">
        {reaction}
      </div>
      {["host, coHost, speaker"].includes(role) && (
        <div className="absolute right-0">{BasicIcons.audio}</div>
      )}
      {isHandRaised && (
        <div className="absolute flex right-2 w-8 h-8 -top-1 rounded-full justify-center items-center bg-custom-8 text-xl border-custom-1 border-2">
          ✋
        </div>
      )}
    </div>
  );
};
export default React.memo(GridCard);
