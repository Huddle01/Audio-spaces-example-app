"use client";

import React, { useEffect } from "react";

// Components
import BottomBar from "@/components/BottomBar/BottomBar";
import Sidebar from "@/components/Sidebar/Sidebar";
import GridLayout from "@/components/GridLayout/GridLayout";
import Prompts from "@/components/common/Prompts";
import { useEventListener, useHuddle01 } from "@huddle01/react/hooks";
import { useLobby, useRoom, useAudio } from "@huddle01/react/hooks";
// import { Peer } from "@/utils/types";

const Audio = ({ params }: { params: { roomId: string } }) => {
  const { initialize, roomState } = useHuddle01();
  const { joinLobby } = useLobby();
  const { joinRoom } = useRoom();

  const { fetchAudioStream, produceAudio, stream: micStream } = useAudio();

  useEffect(() => {
    initialize("TxG-OolMwGeCoZPzX660e65wwuU2MP83");
  }, []);

  useEffect(() => {
    if (roomState === "INIT") {
      joinLobby(params.roomId);
    }
  }, [roomState]);

  useEventListener("lobby:joined", () => {
    fetchAudioStream();
  });

  useEventListener("app:mic-on", () => {
    joinRoom();
  });

  useEventListener("room:joined", () => {
    if (!micStream) return null;
    return produceAudio(micStream);
  });

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
