import React from "react";

// Assets
import { BasicIcons } from "@/assets/BasicIcons";
import { toast } from "react-hot-toast";
import CustomInput from "@/components/common/CustomInput";
import PeerList from "./PeerList";

type PeersProps = {};

const Peers: React.FC<PeersProps> = () => {
  return (
    <div>
      <MuteMicDiv onClick={() => toast.error("todo")} />

      <CustomInput
        placeholder="Search for peers"
        type="search"
        onChange={() => ""}
        value=""
        className="mt-3"
      />

      <PeerList className="mt-5" title="Host">
        <PeerMetaData />
      </PeerList>
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

const PeerMetaData = () => <div>Data</div>;
