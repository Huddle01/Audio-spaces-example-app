import { Peer } from "@/utils/types";
import Image from "next/image";
import { usePeers } from "@huddle01/react/hooks";

type AcceptRequestProps = {
  peerId: string;
  onAccept: () => void;
  onDeny: () => void;
};

const AcceptRequest: React.FC<AcceptRequestProps> = ({
  peerId,
  onAccept,
  onDeny,
}) => {
  const { peers } = usePeers();

  const peer = Object.values(peers).find(
    (peer: Peer) => peer.peerId === peerId
  );

  return (
    <div className="inline-flex p-4 flex-col justify-center items-center rounded-lg bg-custom-2">
      <div className="flex flex-col justify-center items-start gap-2">
        <Image
          src={peer?.avatarUrl ?? "/avatar/avatars/0.png"}
          alt="avatar"
          width={50}
          height={50}
          className="rounded-full"
        />
        <div className="font-inter text-sm font-semibold text-slate-100">
          {peer?.displayName} requested to be a speaker
        </div>
        <div className="font-inter text-xs text-slate-100">
          You can view all the requests in the sidebar
        </div>
        <div className="flex items-start gap-2">
          <button
            className="flex w-20 px-1 py-2 items-center justify-center bg-custom-8 font-medium rounded-lg text-sm"
            onClick={onAccept}
          >
            Accept
          </button>
          <button
            className="flex w-20 px-1 py-2 items-center justify-center rounded-lg text-red-400 text-sm font-medium border border-red-400"
            onClick={onDeny}
          >
            Deny
          </button>
        </div>
      </div>
    </div>
  );
};

export default AcceptRequest;
