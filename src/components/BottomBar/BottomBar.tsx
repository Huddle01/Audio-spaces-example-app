"use client";

import React, { useState } from "react";
import useStore from "@/store/slices";
import Strip from "../Sidebar/Peers/PeerRole/Strip";

// Assets
import { BasicIcons, NestedBasicIcons } from "@/assets/BasicIcons";
import { cn } from "@/utils/helpers";
import Dropdown from "../common/Dropdown";
import EmojiTray from "../EmojiTray/EmojiTray";
import {
  useAudio,
  useHuddle01,
  usePeers,
  useRoom,
  useRecording,
} from "@huddle01/react/hooks";
import { useEventListener } from "@huddle01/react/hooks";
import SwitchDevice from "../SwitchDevice/SwitchDevice";
import { useAudioPersistStore } from "@/store/audio";

type BottomBarProps = {};

const BottomBar: React.FC<BottomBarProps> = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const { peers } = usePeers();

  const { leaveRoom, endRoom } = useRoom();

  const {
    fetchAudioStream,
    produceAudio,
    stopAudioStream,
    stopProducingAudio,
  } = useAudio();

  const { audioInputDevice, isAudioOn, setIsAudioOn } = useAudioPersistStore();

  const sidebarView = useStore((state) => state.sidebar.sidebarView);
  // const chatView = useStore((state) => state.chatView);
  // const setChatView = useStore((state) => state.setChatView);
  const isChatOpen = useStore((state) => state.isChatOpen);
  const setIsChatOpen = useStore((state) => state.setIsChatOpen);

  const setSidebarView = useStore((state) => state.setSidebarView);

  const setPromptView = useStore((state) => state.setPromptView); 

  const [showLeaveDropDown, setShowLeaveDropDown] = useState<boolean>(false);

  const { me } = useHuddle01();

  useEventListener("app:mic-on", (stream) => {
    setIsAudioOn(true);
    if (stream) produceAudio(stream);
  });

  useEventListener("app:mic-off", () => {
    setIsAudioOn(false);
    stopProducingAudio();
  });


  return (
    <div className="absolute bottom-6 w-full flex items-center px-10 justify-between">
      {/* Bottom Bar Left */}
      <div>
        {me.role == "host" || me.role == "coHost" || me.role == "speaker" ? (
          <div className="mr-auto flex items-center justify-between gap-3 w-44">
            {""}
          </div>
        ) : (
          <OutlineButton
            className="mr-auto flex items-center justify-between gap-3"
            onClick={() => setPromptView("request-to-speak")}
          >
            {BasicIcons.requestToSpeak}
            <div>Request to speak</div>
          </OutlineButton>
        )}
      </div>

      {/* Bottom Bar Center */}
      <div className="flex items-center gap-4">
        {me.role !== "listener" &&
          (!isAudioOn ? (
            <button
              onClick={() => {
                audioInputDevice
                  ? fetchAudioStream(audioInputDevice.deviceId)
                  : fetchAudioStream();
              }}
            >
              {NestedBasicIcons.inactive.mic}
            </button>
          ) : (
            <button
              onClick={() => {
                stopAudioStream();
              }}
            >
              {NestedBasicIcons.active.mic}
            </button>
          ))}
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
        <Dropdown
          triggerChild={BasicIcons.leave}
          open={showLeaveDropDown}
          onOpenChange={() => setShowLeaveDropDown((prev) => !prev)}
        >
          {me.role === "host" && (
            <Strip
              type="close"
              title="End spaces for all"
              variant="danger"
              onClick={() => {
                endRoom();
              }}
            />
          )}
          <Strip
            type="leave"
            title="Leave the spaces"
            variant="danger"
            onClick={() => {
              leaveRoom();
            }}
          />
        </Dropdown>
        <SwitchDevice />
      </div>
      <div className="flex items-center gap-4">
        {/* Bottom Bar Right */}

        <OutlineButton
          className="ml-auto flex items-center gap-3"
          onClick={() =>
            setSidebarView(sidebarView === "peers" ? "close" : "peers")
          }
        >
          {BasicIcons.peers}
          <span>
            {Object.keys(peers).filter((peerId) => peerId !== me.meId).length +
              1}
          </span>
        </OutlineButton>
        <OutlineButton
          className="ml-auto flex items-center gap-3"
          onClick={() => setIsChatOpen(!isChatOpen)}
        >
          {BasicIcons.chat}
        </OutlineButton>
      </div>
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
