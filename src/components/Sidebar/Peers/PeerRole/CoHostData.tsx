import React from "react";
import Strip from "./Strip";
import { useAcl, useRoom, useHuddle01 } from "@huddle01/react/hooks";

type CoHostDataProps = {
  peerId: string;
};

const CoHostData: React.FC<CoHostDataProps> = ({ peerId }) => {
  const { changePeerRole, kickPeer } = useAcl();

  const { me } = useHuddle01();

  const { leaveRoom } = useRoom();

  return (
    <>
      {me.role === "host" && (
        <div>
          <Strip
            type="remove"
            title="Remove as Co-Host"
            variant="danger"
            onClick={() => {
              if (me.role === "host" || me.role === "coHost") {
                changePeerRole(peerId, "listener");
              }
            }}
          />
          <Strip
            type="leave"
            title="Remove from spaces"
            variant="danger"
            onClick={() => {
              if (me.role === "host") {
                kickPeer(peerId);
              }
            }}
          />
        </div>
      )}
      {me.role === "coHost" && (
        <div>
          <Strip
            type="leave"
            title="Leave the spaces"
            variant="danger"
            onClick={leaveRoom}
          />
          <Strip
            type="leave"
            title="Leave co-host role"
            variant="danger"
            onClick={() => {
              changePeerRole(peerId, "listener");
            }}
          />
        </div>
      )}
    </>
  );
};
export default CoHostData;
