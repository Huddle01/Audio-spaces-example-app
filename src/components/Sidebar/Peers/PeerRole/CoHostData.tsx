import React from "react";
import Strip from "./Strip";

type CoHostDataProps = {};

const CoHostData: React.FC<CoHostDataProps> = () => {
  return (
    <div>
      <Strip type="remove" title="Remove as Co-Host" variant="danger" />
      <Strip type="leave" title="Remove from spaces" variant="danger" />
    </div>
  );
};
export default CoHostData;
