import React from "react";
import Strip from "./Strip";

type SpeakerDataProps = {};

const Speaker: React.FC<SpeakerDataProps> = () => {
  return (
    <div>
      <Strip type="speaker" title="Remove as Speaker" variant="danger" />
      <Strip type="leave" title="Remove from spaces" variant="danger" />
    </div>
  );
};
export default Speaker;
