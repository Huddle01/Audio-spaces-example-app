"use client";

import React, { useEffect, useRef } from "react";

// Components
import BottomBar from "@/components/BottomBar/BottomBar";
import Sidebar from "@/components/Sidebar/Sidebar";
import GridLayout from "@/components/GridLayout/GridLayout";
import { useEventListener, useHuddle01 } from "@huddle01/react";
import {
  useLobby,
  useRoom,
  useAudio,
  usePeers,
  useMeetingMachine,
} from "@huddle01/react/hooks";

const Audio = ({ params }: { params: { roomId: string } }) => {
  const { initialize } = useHuddle01();
  const { joinLobby } = useLobby();
  const { joinRoom } = useRoom();
  const { state } = useMeetingMachine();

  const {fetchAudioStream, produceAudio, stream: micStream} = useAudio();
  

  useEffect(() => {
    initialize("L-UtmOW84pscUfMWmRGCk2-dwngKPaoK");
  }, []);

  useEffect(() => {
    if(state.matches("Initialized")) {
      joinLobby(params.roomId);
    }
  }, [state]);

  useEventListener("lobby:joined", () => {
    fetchAudioStream();
  });

  useEventListener("lobby:mic-on", () => {
    joinRoom();
  })

  useEventListener("room:joined", () => {
    produceAudio(micStream);
  })

  return (
    <section className="bg-audio flex h-screen items-center justify-center w-full relative  text-slate-100">
      <div className="flex items-center justify-center w-full">
        <GridLayout />
        <Sidebar />
      </div>

      <BottomBar />
    </section>
  );
};
export default Audio;
