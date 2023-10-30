"use client";

import React, { useEffect, useState } from "react";

// Components
import BottomBar from "@/components/BottomBar/BottomBar";
import Sidebar from "@/components/Sidebar/Sidebar";
import GridLayout from "@/components/GridLayout/GridLayout";
import Prompts from "@/components/common/Prompts";
import { useEventListener, useHuddle01, useAudio } from "@huddle01/react/hooks";
import { useRoom, useAcl } from "@huddle01/react/hooks";
import { useRouter } from "next/navigation";
import AcceptRequest from "@/components/Modals/AcceptRequest";
import useStore from "@/store/slices";
import { toast } from "react-hot-toast";
import { useAppUtils } from "@huddle01/react/app-utils";
import Chat from "@/components/Chat/Chat";
import { useAudioPersistStore } from "@/store/audio";

const Home = ({ params }: { params: { roomId: string } }) => {
  const { isRoomJoined } = useRoom();
  const { push } = useRouter();
  const { changePeerRole } = useAcl();
  const { me } = useHuddle01();
  const [requestedPeerId, setRequestedPeerId] = useState("");
  const [showAcceptRequest, setShowAcceptRequest] = useState(false);
  const addChatMessage = useStore((state) => state.addChatMessage);
  const addRequestedPeers = useStore((state) => state.addRequestedPeers);
  const removeRequestedPeers = useStore((state) => state.removeRequestedPeers);
  const requestedPeers = useStore((state) => state.requestedPeers);
  const avatarUrl = useStore((state) => state.avatarUrl);
  const userDisplayName = useStore((state) => state.userDisplayName);
  const { changeAvatarUrl, setDisplayName, sendData } = useAppUtils();
  const isChatOpen = useStore((state) => state.isChatOpen);
  const { audioInputDevice, isAudioOn } = useAudioPersistStore();
  const { stopAudioStream, fetchAudioStream } = useAudio();

  useEventListener("room:peer-joined", ({ peerId, role }) => {
    if (role === "peer") {
      changePeerRole(peerId, "listener");
    }
  });

  useEventListener("room:me-left", () => {
    push("https://huddle01.com/docs/usecase/audio-spaces");
  });

  useEffect(() => {
    if (!isRoomJoined) {
      push(`/${params.roomId}/lobby`);
      return;
    }
  }, []);

  useEffect(() => {
    if (changeAvatarUrl.isCallable) {
      changeAvatarUrl(avatarUrl);
    }
  }, [changeAvatarUrl.isCallable]);

  useEffect(() => {
    if (setDisplayName.isCallable) {
      setDisplayName(userDisplayName);
    }
  }, [setDisplayName.isCallable]);

  const sendDataToAllPeers = () => {
    sendData("*", { message: "Hello World" });
  };

  useEventListener("room:me-role-update", (role) => {
    toast.success(`You are now ${role}`);
  });

  useEventListener("room:data-received", (data) => {
    if (data.payload["request-to-speak"]) {
      setShowAcceptRequest(true);
      setRequestedPeerId(data.payload["request-to-speak"]);
      addRequestedPeers(data.payload["request-to-speak"]);
      setTimeout(() => {
        setShowAcceptRequest(false);
      }, 5000);
    }

    if (data.payload.message && data.fromPeerId !== me.meId) {
      const newChatMessage = {
        name: data.payload.name,
        text: data.payload.message,
        is_user: false,
      };
      addChatMessage(newChatMessage);
    }
  });

  const handleAccept = () => {
    if (me.role == "host" || me.role == "coHost") {
      changePeerRole(requestedPeerId, "speaker");
      setShowAcceptRequest(false);
      removeRequestedPeers(requestedPeerId);
    }
  };

  useEffect(() => {
    if (!requestedPeers.includes(requestedPeerId)) {
      setShowAcceptRequest(false);
    }
  }, [requestedPeers]);

  useEffect(() => {
    if (isAudioOn) {
      stopAudioStream();
      fetchAudioStream(audioInputDevice.deviceId);
    }
  },[audioInputDevice]);

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
                removeRequestedPeers(requestedPeerId);
              }}
            />
          )}
        </div>
      </div>
      {isChatOpen && <Chat />}
      <BottomBar />
      <Prompts />
    </section>
  );
};
export default Home;
