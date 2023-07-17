import React, {use, useState} from "react";

// Assets
import { BasicIcons } from "@/assets/BasicIcons";

// Components
import PeerList from "./PeerList";
import PeerMetaData from "./PeerMetaData";

// Hooks
import { useAcl, useHuddle01, usePeers, useEventListener } from "@huddle01/react/hooks";

import { useAppUtils } from "@huddle01/react/app-utils";

type PeersProps = {};

const Peers: React.FC<PeersProps> = () => {
  const BlackList = ["peer", "listener"];

  const { me } = useHuddle01();
  const { peers } = usePeers();
  const { changeRoomControls } = useAcl();

  const [ isRequested, setIsRequested ] = useState<boolean>(false);

  useEventListener("room:data-received", (data) => {
    console.log("room:data-received", { data });
  });

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
              peerId={me.meId}
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
            peerId={me.meId}
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
              peerId={peerId}
            />
          ))}
      </PeerList>

      {/* CO-Hosts */}
      {(Object.values(peers).filter((peer) => peer.role === "coHost").length >
        0 || me.role == "coHost") && (
        <PeerList title="Co-Hosts">
          {me.role === "coHost" && (
            <PeerMetaData
              className="mt-5"
              name={me.displayName}
              src="/images/user-avatar.png"
              role={me.role}
              peerId={me.meId}
            />
          )}

          {Object.values(peers)
            .filter((peer) => peer.role === "coHost")
            .map(({ cam, displayName, mic, peerId, role }) => (
              <PeerMetaData
                key={peerId}
                className="mt-5"
                name={displayName}
                src="/images/user-avatar.png"
                role={role}
                peerId={peerId}
              />
            ))}
        </PeerList>
      )}

      {/* Speakers */}
      {(Object.values(peers).filter((peer) => peer.role === "speaker").length >
        0 || me.role == 'speaker') && (
        <PeerList
          title="Speakers"
          count={
            Object.values(peers).filter((peer) => peer.role === "speaker")
              .length
          }
        >
          {me.role === "speaker" && (
            <PeerMetaData
              className="mt-5"
              name={me.displayName}
              src="/images/user-avatar.png"
              role={me.role}
              peerId={me.meId}
            />
          )}

          {Object.values(peers)
            .filter((peer) => peer.role === "speaker")
            .map(({ displayName, peerId, role }) => (
              <PeerMetaData
                key={peerId}
                className="mt-5"
                name={displayName}
                src="/images/user-avatar.png"
                role={role}
                peerId={peerId}
              />
            ))}
        </PeerList>
      )}

      {(Object.values(peers).filter(({role}) => role == "listener").length > 0 || me.role == "listener") && (
        <PeerList
          title="Listeners"
          count={
            Object.values(peers).filter(({ role }) => role == "listener")
              .length 
          }
        >
          {BlackList.includes(me.role) && (
            <PeerMetaData
              key={me.meId}
              name={me.displayName}
              role={me.role}
              className="mt-5"
              src="/images/user-avatar.png"
              peerId={me.meId}
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
