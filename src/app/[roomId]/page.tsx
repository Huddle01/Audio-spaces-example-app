"use client";

import React, { useEffect, useState } from "react";

// Components
import BottomBar from "@/components/BottomBar/BottomBar";
import Sidebar from "@/components/Sidebar/Sidebar";
import GridLayout from "@/components/GridLayout/GridLayout";
import Prompts from "@/components/common/Prompts";
import { useEventListener, useHuddle01 } from "@huddle01/react/hooks";
import { useRoom, useAcl } from "@huddle01/react/hooks";
import { useRouter } from "next/navigation";
import AcceptRequest from "@/components/Modals/AcceptRequest";

const Audio = ({ params }: { params: { roomId: string } }) => {
  const { isRoomJoined } = useRoom();
  const { push } = useRouter();
  const { changePeerRole } = useAcl();
  const { me } = useHuddle01();
  const [requestedPeerId, setRequestedPeerId] = useState("");
  const [showAcceptRequest, setShowAcceptRequest] = useState(false);

  useEventListener("room:peer-joined", ({ peerId, role }) => {
    if (role === "peer") {
      changePeerRole(peerId, "listener");
    }
  });

  useEventListener("room:me-left", () => {
    push("https://huddle01.com/docs");
  });

  useEffect(() => {
    if (!isRoomJoined) {
      push(`/${params.roomId}/lobby`);
      return;
    }
  }, []);

  useEventListener("room:data-received", (data) => {
    if (
      data.payload["request-to-speak"] &&
      (me.role == "host" || me.role == "coHost")
    ) {
      setShowAcceptRequest(true);
      setRequestedPeerId(data.payload["request-to-speak"]);
    }
  });

  const handleAccept = () => {
    if (me.role == "host" || me.role == "coHost") {
      changePeerRole(requestedPeerId, "speaker");
      setShowAcceptRequest(false);
    }
  };

  return (
    <section className="bg-audio flex h-screen items-center justify-center w-full relative  text-slate-100">
      <div className="flex items-center justify-center w-full">
        <GridLayout />
        <Sidebar />
        <div className="absolute right-4 bottom-20">
          {showAcceptRequest && (
            <AcceptRequest
              peerId={requestedPeerId}
              onAccept={handleAccept}
              onDeny={() => {
                setShowAcceptRequest(false);
              }}
            />
          )}
        </div>
      </div>
      <BottomBar />
      <Prompts />
    </section>
  );
};
export default Audio;
