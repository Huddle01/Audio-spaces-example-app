import React from "react";
import Strip from "./Strip";
import { useAcl, useHuddle01 } from "@huddle01/react/hooks";

type CoHostDataProps = {
  peerId: string;
};

const CoHostData: React.FC<CoHostDataProps> = ({peerId}) => {

  const { changePeerRole, kickPeer } = useAcl();
  const { me } = useHuddle01();

  return (
    <div>
      <Strip type="remove" title="Remove as Co-Host" variant="danger" onClick={() => {
        if (me.role === "host" || me.role === "coHost") {
          changePeerRole(peerId, "listener");
        }
      }}/>
      <Strip type="leave" title="Remove from spaces" variant="danger" onClick={() => {
        if (me.role === "host") {
          kickPeer(peerId);
        }
      }} />
    </div>
  );
};
export default CoHostData;
