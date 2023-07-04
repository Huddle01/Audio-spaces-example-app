"use client";

import React from "react";
import useStore from "@/store/slices";
import { BasicIcons, NestedBasicIcons } from "@/assets/BasicIcons";
import { useRouter } from "next/navigation";
import { Audio } from "@huddle01/react/components";
import { useAudio } from "@huddle01/react/hooks";
import { useMeetingMachine } from "@huddle01/react/hooks";
import { useEventListener } from "@huddle01/react";

type BottomBarProps = {};

const BottomBar: React.FC<BottomBarProps> = () => {
  const { push } = useRouter();
  const { state } = useMeetingMachine();
  const {
    fetchAudioStream,
    produceAudio,
    isProducing: isAudioProducing,
    stopAudioStream,
    stopProducingAudio,
    stream: micStream,
  } = useAudio();

  const sidebarView = useStore((state) => state.sidebar.sidebarView);

  const setSidebarView = useStore((state) => state.setSidebarView);

  return (
    <div className="absolute bottom-6 w-full flex items-center px-10">
      <button
        type="button"
        className="mr-auto flex items-center justify-between gap-3 border border-custom-4 rounded-lg py-2 px-3 w-44"
      >
        <div className="flex items-center gap-2">
          {BasicIcons.record}
          <div>Record</div>
        </div>
        <div>{BasicIcons.moreOptions}</div>
      </button>

      <div className="mx-auto flex items-center gap-4">
        {state.matches("Initialized.JoinedLobby.Mic.Muted") ? (
          <button onClick={() => {
            produceAudio(micStream);
          }}>{NestedBasicIcons.active.mic}</button>
        ) : (
          <button onClick={() => {
            stopAudioStream();
          }}>{NestedBasicIcons.inactive.mic}</button>
        )}
        <button>{BasicIcons.avatar}</button>
        <button
          type="button"
          onClick={() => push("https://huddle01.com/docs/sdk/usecase")}
        >
          {BasicIcons.leave}
        </button>
      </div>

      <button
        type="button"
        className="ml-auto flex items-center gap-3 border border-custom-4 rounded-lg py-2 px-3"
        onClick={() =>
          setSidebarView(sidebarView === "peers" ? "close" : "peers")
        }
      >
        {BasicIcons.peers}
        <span>count</span>
      </button>
    </div>
  );
};
export default React.memo(BottomBar);
