"use client";

import React, { useState } from "react";
import useStore from "@/store/slices";

// Assets
import { BasicIcons, NestedBasicIcons } from "@/assets/BasicIcons";
import { cn } from "@/utils/helpers";
import Dropdown from "../common/Dropdown";
import EmojiTray from "../EmojiTray/EmojiTray";
import { useRouter } from "next/navigation";
import { useAudio, useHuddle01 } from "@huddle01/react/hooks";
import { useEventListener } from "@huddle01/react/hooks";

type BottomBarProps = {};

const BottomBar: React.FC<BottomBarProps> = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const { roomState } = useHuddle01();

  const { push } = useRouter();
  // const { state } = useMeetingMachine();
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

  const setPromptView = useStore((state) => state.setPromptView);

  // Todo: Will come from Acl Events
  const isHost = false;

  return (
    <div className="absolute bottom-6 w-full flex items-center px-10">
      {/* Bottom Bar Left */}
      {isHost ? (
        <OutlineButton className="mr-auto flex items-center justify-between gap-3 w-44">
          <div className="flex items-center gap-2">
            {BasicIcons.record}
            <div>Record</div>
          </div>
          <div>{BasicIcons.moreOptions}</div>
        </OutlineButton>
      ) : (
        <OutlineButton
          className="mr-auto flex items-center justify-between gap-3"
          onClick={() => setPromptView("request-to-speak")}
        >
          {BasicIcons.requestToSpeak}
          <div>Request to speak</div>
        </OutlineButton>
      )}

      {/* Bottom Bar Center */}
      <div className="mx-auto flex items-center gap-4">
        {roomState === "ROOM" ? (
          <button
            onClick={() => {
              if (!micStream) return;
              return produceAudio(micStream);
            }}
          >
            {NestedBasicIcons.active.mic}
          </button>
        ) : (
          <button
            onClick={() => {
              stopAudioStream();
            }}
          >
            {NestedBasicIcons.inactive.mic}
          </button>
        )}
        <Dropdown
          triggerChild={BasicIcons.avatar}
          open={isOpen}
          onOpenChange={() => setIsOpen((prev) => !prev)}
        >
          <EmojiTray
            onClick={() => alert("todo")}
            onClose={() => setIsOpen(false)}
          />
        </Dropdown>
        <button
          type="button"
          onClick={() => push("https://huddle01.com/docs/sdk/usecase")}
        >
          {BasicIcons.leave}
        </button>
      </div>

      {/* Bottom Bar Right */}
      <OutlineButton
        className="ml-auto flex items-center gap-3"
        onClick={() =>
          setSidebarView(sidebarView === "peers" ? "close" : "peers")
        }
      >
        {BasicIcons.peers}
        <span>count</span>
      </OutlineButton>
    </div>
  );
};
export default React.memo(BottomBar);

interface OutlineButtonProps {
  onClick?: () => void;
  className?: string;
  children: React.ReactNode;
}

const OutlineButton: React.FC<OutlineButtonProps> = ({
  className,
  onClick,
  children,
}) => (
  <button
    onClick={onClick}
    type="button"
    className={cn("border border-custom-4 rounded-lg py-2 px-3", className)}
  >
    {children}
  </button>
);
