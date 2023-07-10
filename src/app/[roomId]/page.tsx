"use client";

import React, { useEffect } from "react";

// Components
import BottomBar from "@/components/BottomBar/BottomBar";
import Sidebar from "@/components/Sidebar/Sidebar";
import GridLayout from "@/components/GridLayout/GridLayout";
import Prompts from "@/components/common/Prompts";
import { useEventListener, useHuddle01 } from "@huddle01/react/hooks";
import {
  useRoom,
  useAcl,
} from "@huddle01/react/hooks";
import { useRouter } from "next/navigation";
// import { Peer } from "@/utils/types";
import { useSearchParams } from "next/navigation";
import { useDisplayName } from "@huddle01/react/app-utils";

const Audio = ({ params }: { params: { roomId: string } }) => {
  const { isRoomJoined } = useRoom();
  const { push } = useRouter();
  const searchParams = useSearchParams();
  const { setDisplayName } = useDisplayName();
  const { changePeerRole } = useAcl();

  const username = searchParams.get("username");

  useEventListener("room:peer-joined", ({ peerId, role }) => {
    if (role === "peer") {
      changePeerRole(peerId, "listener");
    }
  });

  useEffect(() => {
    if (!isRoomJoined) {
      push(`/${params.roomId}/lobby`);
      return;
    }
    if (username) setDisplayName(username);
  }, []);

  return (
    <section className="bg-audio flex h-screen items-center justify-center w-full relative  text-slate-100">
      <div className="flex items-center justify-center w-full">
        <GridLayout />
        <Sidebar />
      </div>

      <BottomBar />
      <Prompts />
    </section>
  );
};
export default Audio;
