import { NestedPeerListIcons, PeerListIcons } from "@/assets/PeerListIcons";
import Dropdown from "@/components/common/Dropdown";
import { cn } from "@/utils/helpers";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import HostData from "./PeerRole/HostData";
import CoHostData from "./PeerRole/CoHostData";
import SpeakerData from "./PeerRole/SpeakerData";
import ListenersData from "./PeerRole/ListenersData";
import { useHuddle01, useAudio, useEventListener } from "@huddle01/react/hooks";
import { useAppUtils } from "@huddle01/react/app-utils";
import useStore from "@/store/slices";

interface PeerMetaDatProps {
  isRequested?: boolean;
  role: "host" | "coHost" | "speaker" | "listener";
  className?: string;
  isHandRaised?: boolean;
  isMicActive?: boolean;
  name: string;
  src: string;
  onAccept?: () => void;
  onDeny?: () => void;
  peerId: string;
}

const PeerMetaData: React.FC<PeerMetaDatProps> = ({
  className,
  isMicActive,
  name,
  src,
  isRequested,
  role,
  onAccept,
  onDeny,
  peerId,
}) => {
  const RoleData = {
    host: <HostData peerId={peerId} />,
    coHost: <CoHostData peerId={peerId} />,
    speaker: <SpeakerData peerId={peerId} />,
    listener: <ListenersData peerId={peerId} />,
  } as const;

  const { me } = useHuddle01();
  const { sendData } = useAppUtils();
  const {
    fetchAudioStream,
    stopAudioStream,
    produceAudio,
    stopProducingAudio,
    stream: micStream,
  } = useAudio();
  const [isHandRaised, setIsHandRaised] = useState<boolean>(false);
  const setMyHandRaised = useStore((state) => state.setMyHandRaised);
  const isMyHandRaised = useStore((state) => state.isMyHandRaised);
  const [isAudioOn, setIsAudioOn] = useState<boolean>(false);

  useEffect(() => {
    sendData("*", {
      raiseHand: isHandRaised,
    });
    setMyHandRaised(isHandRaised);
  }, [isHandRaised]);

  useEffect(() => {
    if (me.meId == peerId) {
      setIsHandRaised(isMyHandRaised);
    }
  }, [isMyHandRaised]);

  useEventListener("app:mic-on", (stream) => {
    if (me.meId == peerId) {
      setIsAudioOn(true);
      if (stream) produceAudio(stream);
    }
  });

  useEventListener("app:mic-off", () => {
    if (me.meId == peerId) {
      setIsAudioOn(false);
      stopProducingAudio();
    }
  });

  return (
    <div className={cn(className, "flex items-center justify-between w-full")}>
      <div className="flex items-center gap-2">
        <Image
          src={src}
          alt="default"
          width={30}
          height={30}
          priority
          quality={100}
          className="object-contain rounded-full"
        />
        <div className="text-slate-400 tex-sm font-normal">{name}</div>
      </div>
      {isRequested ? (
        <AcceptDenyGroup onDeny={onDeny} onAccept={onAccept} />
      ) : (
        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              if (peerId === me?.meId) {
                setIsHandRaised((prev) => !prev);
              }
            }}
          >
            {isHandRaised
              ? NestedPeerListIcons.active.hand
              : NestedPeerListIcons.inactive.hand}
          </button>
          <button
            onClick={() => {
              if (
                ["host", "coHost", "speaker"].includes(role) &&
                peerId === me?.meId
              ) {
                isAudioOn ? stopAudioStream() : fetchAudioStream();
              }
            }}
          >
            {isAudioOn || isMicActive
              ? NestedPeerListIcons.active.mic
              : NestedPeerListIcons.inactive.mic}
          </button>

          {me.role === "host" ||
          (me.role === "coHost" && (me.meId === peerId || ["speaker", "listener"].includes(role))) ||
          ((me.role === "speaker" || me.role === "listener") &&
            me.meId === peerId) ? (
            <Dropdown
              triggerChild={<div>{NestedPeerListIcons.inactive.more}</div>}
              align="end"
            >
              {RoleData[role]}
            </Dropdown>
          ) : (
            <button> {NestedPeerListIcons.inactive.more}</button>
          )}
        </div>
      )}
    </div>
  );
};

export default React.memo(PeerMetaData);

interface IAcceptDenyProps {
  onAccept?: () => void;
  onDeny?: () => void;
}

const AcceptDenyGroup: React.FC<IAcceptDenyProps> = ({ onAccept, onDeny }) => (
  <div className="flex items-center gap-4">
    <div role="presentation" onClick={onAccept}>
      {PeerListIcons.accept}
    </div>
    <div role="presentation" onClick={onDeny}>
      {PeerListIcons.deny}
    </div>
  </div>
);
