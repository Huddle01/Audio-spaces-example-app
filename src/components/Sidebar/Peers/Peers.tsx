import React, { useEffect } from "react";

// Assets
import { BasicIcons } from "@/assets/BasicIcons";
import { toast } from "react-hot-toast";
import CustomInput from "@/components/common/CustomInput";
import PeerList from "./PeerList";
import PeerMetaData from "./PeerMetaData";
import { useAcl, usePeers } from "@huddle01/react/hooks";

type PeersProps = {};

const Peers: React.FC<PeersProps> = () => {
  const { changeRoomControls } = useAcl();

  const { peers } = usePeers();

  const isRequested = false;

  useEffect(() => {
    console.log({ peers });
  }, [peers]);

  return (
    <div>
      <MuteMicDiv onClick={() => changeRoomControls("muteEveryone", true)} />

      {/* <CustomInput
        placeholder="Search for peers"
        type="search"
        onChange={() => ""}
        value=""
        className="mt-3"
      /> */}

      {isRequested && (
        <PeerList className="mt-5" title="Requested to Speak">
          {Array.from({ length: 5 }).map((_, i) => (
            <PeerMetaData
              key={i}
              isRequested
              className="mt-5"
              name="name"
              src="/images/user-avatar.png"
              role="host"
              onAccept={() => ""}
              onDeny={() => ""}
            />
          ))}
        </PeerList>
      )}

      <PeerList className="mt-5" title="Host">
        {Object.values(peers).map(({ cam, displayName, mic, peerId, role }) => {
          console.log({ role, displayName });
          return (
            <PeerMetaData
              key={peerId}
              className="mt-5"
              name={displayName}
              src="/images/user-avatar.png"
              role={role}
            />
          );
        })}
      </PeerList>
      {/* 
      <PeerList title="Co-Hosts">
        <PeerMetaData
          className="mt-5"
          name="name"
          src="/images/user-avatar.png"
          role="co-host"
        />
      </PeerList> */}

      {/* <PeerList title="Speakers" count={1}>
        <PeerMetaData
          className="mt-5"
          name="name"
          src="/images/user-avatar.png"
          role="speaker"
        />
      </PeerList> */}

      <PeerList title="Listeners" count={Object.keys(peers).length}>
        {Object.values(peers).map(({ cam, displayName, mic, peerId, role }) => {
          console.log({ displayName, role });
          return (
            <PeerMetaData
              key={peerId}
              className="mt-3.5"
              name={displayName}
              src="/images/user-avatar.png"
              role={role}
            />
          );
        })}
      </PeerList>
    </div>
  );
};
export default Peers;

interface Props {
  onClick: () => void;
}

const MuteMicDiv: React.FC<Props> = ({ onClick }) => (
  <button
    type="button"
    onClick={onClick}
    className="flex items-center justify-center border border-custom-4 rounded-lg p-2 gap-2 w-full"
  >
    <span>{BasicIcons.muteMic}</span>
    <span className="text-custom-6 text-sm font-semibold">Mute Everyone</span>
  </button>
);
