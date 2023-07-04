import React from "react";
import Strip from "./Strip";

type ListenersDataProps = {};

const ListenersData: React.FC<ListenersDataProps> = () => {
  return (
    <div>
      <Strip type="personNormal" title="Invite as Co-Host" variant="normal" />
      <Strip type="personSpeaker" title="Invite as Speaker" variant="normal" />
      <Strip type="leave" title="Remove from spaces" variant="danger" />
    </div>
  );
};
export default ListenersData;
