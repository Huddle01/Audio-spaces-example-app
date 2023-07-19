import { Peer } from "@/utils/types";
import GridCard from "./GridCard/GridCard";
import { useHuddle01, usePeers } from "@huddle01/react/hooks";
import { useEffect } from "react";
import Audio from "../common/Audio";

type GridLayoutProps = {};

const GridLayout: React.FC<GridLayoutProps> = () => {
  const Blacklist = ["peer", "listener"];

  const { peers } = usePeers();
  const { me } = useHuddle01();

  return (
    <div className="w-full h-full ml-10 flex items-center justify-center flex-col py-20">
      <div className="flex-wrap flex items-center justify-center gap-4 w-full">
        {!Blacklist.includes(me.role) && (
          <GridCard
            displayName={me.displayName}
            peerId={me.meId}
            role={me.role}
            avatarUrl={me.avatarUrl}
          />
        )}
        {Object.values(peers)
          .filter((peer) => ["host", "coHost", "speaker"].includes(peer.role))
          .map(({ displayName, peerId, role, avatarUrl, mic }) => (
            <GridCard
              key={peerId}
              displayName={displayName}
              peerId={peerId}
              role={role}
              avatarUrl={avatarUrl}
              mic={mic}
            />
          ))}
      </div>
      <div className="mt-10">
        <div className="text-custom-6 text-base font-normal text-center mb-5">
          Listeners - {Object.values(peers).filter(({role}) => role === "listener").length + (me.role == "listener" ? 1 : 0)}
        </div>
        <div className="flex-wrap flex items-center justify-center gap-4 w-full">
          {Blacklist.includes(me.role) && (
            <GridCard
              displayName={me.displayName}
              peerId={me.meId}
              role={me.role}
              avatarUrl={me.avatarUrl}
            />
          )}
          {Object.values(peers)
            .filter((peer) => Blacklist.includes(peer.role))
            .map(({ displayName, peerId, role, avatarUrl }, i) => (
              <GridCard
                key={peerId}
                displayName={displayName}
                peerId={peerId}
                role={role}
                avatarUrl={avatarUrl}
              />
            ))}
        </div>
      </div>
    </div>
  );
};
export default GridLayout;
