import { NestedPeerListIcons, PeerListIcons } from "@/assets/PeerListIcons";
import Dropdown from "@/components/common/Dropdown";
import { cn } from "@/utils/helpers";
import Image from "next/image";
import React from "react";
import HostData from "./PeerRole/HostData";
import CoHostData from "./PeerRole/CoHostData";
import SpeakerData from "./PeerRole/SpeakerData";
import ListenersData from "./PeerRole/ListenersData";

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
  isHandRaised,
  className,
  isMicActive,
  name,
  src,
  isRequested,
  role,
  onAccept,
  onDeny,
  peerId
}) => {
  const RoleData = {
    host: <HostData peerId={peerId}/>,
    coHost: <CoHostData peerId={peerId}/>,
    speaker: <SpeakerData peerId={peerId}/>,
    listener: <ListenersData peerId={peerId}/>,
  } as const;

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
          className="object-contain"
        />
        <div className="text-slate-400 tex-sm font-normal">{name}</div>
      </div>
      {isRequested ? (
        <AcceptDenyGroup onDeny={onDeny} onAccept={onAccept} />
      ) : (
        <div className="flex items-center gap-3">
          <div>{NestedPeerListIcons.inactive.hand}</div>
          <div>{NestedPeerListIcons.inactive.mic}</div>

          <Dropdown
            triggerChild={<div>{NestedPeerListIcons.inactive.more}</div>}
            align="end"
          >
            {RoleData[role]}
          </Dropdown>
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
