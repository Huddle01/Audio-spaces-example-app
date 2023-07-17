import React from "react";
import Strip from "./Strip";
import { useAcl, useHuddle01 } from "@huddle01/react/hooks";

type ListenersDataProps = {
  peerId: string;
};

const ListenersData: React.FC<ListenersDataProps> = ({ peerId }) => {
  const { changePeerRole, kickPeer } = useAcl();

  const { me } = useHuddle01();

  return (
    <div>
      <Strip
        type="personNormal"
        title="Invite as Co-Host"
        variant="normal"
        onClick={() => {
          if (me.role === "host" || me.role === "coHost") {
            changePeerRole(peerId, "coHost");
          }
        }}
      />
      <Strip
        type="personSpeaker"
        title="Invite as Speaker"
        variant="normal"
        onClick={() => {
          if (
            me.role === "host" ||
            me.role === "coHost" ||
            me.role === "speaker"
          ) {
            changePeerRole(peerId, "speaker");
          }
        }}
      />
      <Strip
        type="leave"
        title="Remove from spaces"
        variant="danger"
        onClick={() => {
          if (me.role === "host" || me.role === "coHost") {
            kickPeer(peerId);
          }
        }}
      />
    </div>
  );
};
export default ListenersData;
