"use client";

import React, { useEffect, useRef, useState } from "react";

// Components
import BottomBar from "@/components/BottomBar/BottomBar";
import Sidebar from "@/components/Sidebar/Sidebar";
import GridLayout from "@/components/GridLayout/GridLayout";
import Prompts from "@/components/common/Prompts";
import { useDisplayName } from "@huddle01/react/app-utils";
import {
  useLobby,
  useRoom,
  useAudio,
  usePeers,
  useEventListener,
  useHuddle01,
} from "@huddle01/react/hooks";
import { Peer } from "@/utils/types";

const Audio = ({ params }: { params: { roomId: string } }) => {
  const { initialize, isInitialized } = useHuddle01();
  const { joinLobby, isLobbyJoined } = useLobby();
  const { joinRoom } = useRoom();
  const { setDisplayName } = useDisplayName();

  const { fetchAudioStream, produceAudio, stream: micStream } = useAudio();

  useEffect(() => {
    if (!isInitialized) {
      initialize("TxG-OolMwGeCoZPzX660e65wwuU2MP83");
    }
  }, [isInitialized]);

  useEffect(() => {
    if (!isLobbyJoined) {
      joinLobby(params.roomId);
    }
  }, [isLobbyJoined]);

  useEffect(() => {
    if (micStream) {
      joinRoom(); 
    }
  }, [micStream]);

  useEventListener("room:joined", () => {
    if (micStream) {
      produceAudio(micStream);
    }
  });

  return (
    <section className="bg-audio flex h-screen items-center justify-center w-full relative text-slate-100">
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
