import React from "react";
import Strip from "./Strip";
import { useRoom, useHuddle01 } from "@huddle01/react/hooks";

type HostDataProps = {
  peerId: string;
};

const HostData: React.FC<HostDataProps> = ({ peerId }) => {
  const { leaveRoom } = useRoom();

  const { me } = useHuddle01();

  return (
    <>
      {me.role === "host" && (
        <div>
          <Strip
            type="leave"
            title="Leave the spaces"
            variant="danger"
            onClick={() => {
              leaveRoom();
            }}
          />
        </div>
      )}
    </>
  );
};
export default React.memo(HostData);
