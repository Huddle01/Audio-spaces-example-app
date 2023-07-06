import { Peer } from "@/utils/types";
import GridCard from "./GridCard/GridCard";
import { usePeers } from "@huddle01/react/hooks";

type GridLayoutProps = {};

const GridLayout: React.FC<GridLayoutProps> = () => {
  const { peers } = usePeers();

  return (
    <div className="w-full h-full ml-10 flex items-center justify-center flex-col py-20">
      <div className="flex-wrap flex items-center justify-center gap-4 w-full">
        {/* {Object.values(peers).length == 0 && (
          <GridCard
            key={Object.values(peers)[0]?.peerId}
            peer={Object.values(peers)[0]!}
          />
        )} */}
        {/* {Object.values(peers)
          .filter((peer) => peer.role == "host")
          .map((peer) => (
            <GridCard key={peer.peerId} peer={peer} />
          ))} */}

        {/* Todo: Need To Remove when ACL is merged */}
        <GridCard
          peer={{
            displayName: "harsh",
            peerId: "123",
          }}
        />
      </div>
      <div className="mt-10">
        <div className="text-custom-6 text-base font-normal text-center mb-5">
          Listeners - count
        </div>
        <div className="flex-wrap flex items-center justify-center gap-4 w-full">
          {Object.values(peers)
            .filter((peer) => peer.role == "peer")
            .map((peer) => (
              <GridCard key={peer.peerId} peer={peer} />
            ))}
        </div>
      </div>
    </div>
  );
};
export default GridLayout;
