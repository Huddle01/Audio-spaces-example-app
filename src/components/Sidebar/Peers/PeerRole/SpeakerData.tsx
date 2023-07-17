import React from "react";
import Strip from "./Strip";
import { useAcl, useHuddle01 } from "@huddle01/react/hooks";

type SpeakerDataProps = {
  peerId: string;
};

const Speaker: React.FC<SpeakerDataProps> = ({peerId}) => {

  const { changePeerRole, kickPeer } = useAcl();
  const { me } = useHuddle01();

  return (
    <div>
      <Strip type="speaker" title="Remove as Speaker" variant="danger" onClick={() => {
        if (me.role === "host" || me.role === "coHost" || me.role === "speaker") {
          changePeerRole(peerId, "listener");
        }
      }}/>
      <Strip type="leave" title="Remove from spaces" variant="danger" onClick={() => {
        if (me.role === "host") {
          kickPeer(peerId);
        }
      }}/>
    </div>
  );
};
export default Speaker;
