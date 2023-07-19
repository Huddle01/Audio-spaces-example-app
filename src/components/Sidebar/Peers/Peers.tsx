import React, { use, useState } from "react";

// Assets
import { BasicIcons } from "@/assets/BasicIcons";

// Components
import PeerList from "./PeerList";
import PeerMetaData from "./PeerMetaData";

// Hooks
import {
  useAcl,
  useHuddle01,
  usePeers,
  useEventListener,
} from "@huddle01/react/hooks";

import useStore from "@/store/slices";

type PeersProps = {};

const Peers: React.FC<PeersProps> = () => {
  const BlackList = ["peer", "listener"];

  const { me } = useHuddle01();
  const { peers } = usePeers();
  const { changeRoomControls, changePeerRole } = useAcl();

  const requestedPeers = useStore((state) => state.requestedPeers);
  const removeRequestedPeers = useStore((state) => state.removeRequestedPeers);

  return (
    <div>
      <MuteMicDiv onClick={() => changeRoomControls("muteEveryone", true)} />

      {requestedPeers.length > 0 && (
        <PeerList className="mt-5" title="Requested to Speak">
          {Object.values(peers)
            .filter(({ peerId }) => requestedPeers.includes(peerId))
            .map(({ peerId, displayName, avatarUrl, mic }) => (
              <PeerMetaData
                key={peerId}
                isRequested
                className="mt-5"
                name={displayName}
                isMicActive={mic ? true : false}
                src={avatarUrl}
                role="host"
                onAccept={() => {
                  if (me.role == "host" || me.role == "coHost") {
                    changePeerRole(peerId, "speaker");
                    removeRequestedPeers(peerId);
                  }
                }}
                onDeny={() => {
                  removeRequestedPeers(peerId);
                }}
                peerId={peerId}
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
            src={me.avatarUrl}
            role={me.role}
            peerId={me.meId}
          />
        )}
        {Object.values(peers)
          .filter((peer) => peer.role === "host")
          .map(({ displayName, mic, peerId, role, avatarUrl }) => (
            <PeerMetaData
              key={peerId}
              className="mt-5"
              name={displayName}
              isMicActive={mic ? true : false}
              src={avatarUrl}
              role={role}
              peerId={peerId}
            />
          ))}
      </PeerList>

      {/* Co-Hosts */}
      {(Object.values(peers).filter((peer) => peer.role === "coHost").length >
        0 ||
        me.role == "coHost") && (
        <PeerList title="Co-Hosts">
          {me.role === "coHost" && (
            <PeerMetaData
              className="mt-5"
              name={me.displayName}
              src={me.avatarUrl}
              role={me.role}
              peerId={me.meId}
            />
          )}

          {Object.values(peers)
            .filter((peer) => peer.role === "coHost")
            .map(({ displayName, mic, peerId, role, avatarUrl }) => (
              <PeerMetaData
                key={peerId}
                className="mt-5"
                name={displayName}
                isMicActive={mic ? true : false}
                src={avatarUrl}
                role={role}
                peerId={peerId}
              />
            ))}
        </PeerList>
      )}

      {/* Speakers */}
      {(Object.values(peers).filter((peer) => peer.role === "speaker").length >
        0 ||
        me.role == "speaker") && (
        <PeerList
          title="Speakers"
          count={
            Object.values(peers).filter((peer) => peer.role === "speaker")
              .length + (me.role == "speaker" ? 1 : 0)
          }
        >
          {me.role === "speaker" && (
            <PeerMetaData
              className="mt-5"
              name={me.displayName}
              src={me.avatarUrl}
              role={me.role}
              peerId={me.meId}
            />
          )}

          {Object.values(peers)
            .filter((peer) => peer.role === "speaker")
            .map(({ displayName, peerId, role, avatarUrl, mic }) => (
              <PeerMetaData
                key={peerId}
                className="mt-5"
                name={displayName}
                src={avatarUrl}
                isMicActive={mic ? true : false}
                role={role}
                peerId={peerId}
              />
            ))}
        </PeerList>
      )}

      {/* listeners */}
      {(Object.values(peers).filter(({ role }) => role == "listener").length >
        0 ||
        me.role == "listener") && (
        <PeerList
          title="Listeners"
          count={
            Object.values(peers).filter(({ role }) => role == "listener").length + (me.role == "listener" ? 1 : 0)
          }
        >
          {BlackList.includes(me.role) && (
            <PeerMetaData
              key={me.meId}
              name={me.displayName}
              role={me.role}
              className="mt-5"
              src={me.avatarUrl}
              peerId={me.meId}
            />
          )}

          {Object.values(peers)
            .filter((peer) => BlackList.includes(peer.role))
            .map(({ cam, displayName, mic, peerId, role, avatarUrl }) => (
              <PeerMetaData
                key={peerId}
                className="mt-5"
                name={displayName}
                src={avatarUrl}
                role={role}
                peerId={peerId}
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
