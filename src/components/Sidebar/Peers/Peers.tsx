import React from "react";

// Assets
import { BasicIcons } from "@/assets/BasicIcons";

// Components
import PeerList from "./PeerList";
import PeerMetaData from "./PeerMetaData";

// Hooks
import { useAcl, useHuddle01, usePeers } from "@huddle01/react/hooks";

type PeersProps = {};

const Peers: React.FC<PeersProps> = () => {
  const BlackList = ["peer", "listener"];

  const { me } = useHuddle01();
  const { peers } = usePeers();
  const { changeRoomControls } = useAcl();

  const isRequested = false;

  const MetaDataObj = {
    host: {
      meCond: me.role === "host",
    },
    "co-host": {
      meCond: me.role === "co-host",
    },
    speakers: {
      meCond: me.role === "speakers",
    },
    listeners: {
      meCond: me.role === BlackList.includes("peer"),
    },
  } as const;

  return (
    <div>
      <MuteMicDiv onClick={() => changeRoomControls("muteEveryone", true)} />

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

      {/* Host */}
      <PeerList className="mt-5" title="Host">
        {me.role === "host" && (
          <PeerMetaData
            key={me.meId}
            className="mt-5"
            name={me.displayName}
            src="/images/user-avatar.png"
            role={me.role}
          />
        )}
        {Object.values(peers)
          .filter((peer) => peer.role === "host")
          .map(({ cam, displayName, mic, peerId, role }) => (
            <PeerMetaData
              key={peerId}
              className="mt-5"
              name={displayName}
              src="/images/user-avatar.png"
              role={role}
            />
          ))}
      </PeerList>

      {/* CO-Hosts */}
      {Object.values(peers).filter((peer) => peer.role === "co-host").length >
        0 && (
        <PeerList title="Co-Hosts">
          {me.role === "co-host" && (
            <PeerMetaData
              className="mt-5"
              name={me.displayName}
              src="/images/user-avatar.png"
              role={me.role}
            />
          )}

          {Object.values(peers)
            .filter((peer) => peer.role === "co-host")
            .map(({ cam, displayName, mic, peerId, role }) => (
              <PeerMetaData
                key={peerId}
                className="mt-5"
                name={displayName}
                src="/images/user-avatar.png"
                role={role}
              />
            ))}
        </PeerList>
      )}

      {/* Speakers */}
      {Object.values(peers).filter((peer) => peer.role === "speakers").length >
        0 && (
        <PeerList
          title="Speakers"
          count={
            Object.values(peers).filter((peer) => peer.role === "speakers")
              .length
          }
        >
          {me.role === "speakers" && (
            <PeerMetaData
              className="mt-5"
              name={me.displayName}
              src="/images/user-avatar.png"
              role={me.role}
            />
          )}

          {Object.values(peers)
            .filter((peer) => peer.role === "speakers")
            .map(({ displayName, peerId, role }) => (
              <PeerMetaData
                key={peerId}
                className="mt-5"
                name={displayName}
                src="/images/user-avatar.png"
                role={role}
              />
            ))}
        </PeerList>
      )}

      {Object.keys(peers).length > 0 && (
        <PeerList title="Listeners" count={Object.keys(peers).length}>
          {BlackList.includes(me.role) && (
            <PeerMetaData
              key={me.meId}
              name={me.displayName}
              role={me.role}
              className="mt-5"
              src="/images/user-avatar.png"
            />
          )}

          {Object.values(peers)
            .filter((peer) => BlackList.includes(peer.role))
            .map(({ cam, displayName, mic, peerId, role }) => (
              <PeerMetaData
                key={peerId}
                className="mt-5"
                name={displayName}
                src="/images/user-avatar.png"
                role={role}
              />
            ))}
        </PeerList>
      )}
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
