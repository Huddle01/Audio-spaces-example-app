import React from "react";
import Strip from "./Strip";

type HostDataProps = {};

const HostData: React.FC<HostDataProps> = () => {
  return (
    <div>
      <Strip type="edit" title="Edit Display Name" variant="normal" />
      <Strip type="leave" title="Leave the spaces" variant="danger" />
    </div>
  );
};
export default React.memo(HostData);
