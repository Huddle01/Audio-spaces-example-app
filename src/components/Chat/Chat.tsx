'use client';
import React from 'react';
import useChatScroll from './ChatScroll';
import { useAppUtils } from '@huddle01/react/app-utils';
import { nanoid } from 'nanoid';
import useStore from '@/store/slices';
import { useState, useRef } from 'react';
import { useEventListener, useHuddle01 } from '@huddle01/react/hooks';
import { BasicIcons } from '@/assets/BasicIcons';

const Chat = () => {
  const userDisplayName = useStore((state) => state.userDisplayName);
  const [message, setMessage] = useState<string>('');
  const [chats, setChats] = useState<
    { name: string; text: string; is_user: boolean }[]
  >([]);
  const ref = useChatScroll(chats);
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const { sendData } = useAppUtils();
  const { me } = useHuddle01();

  async function handleSend() {
    sendDataToAllPeers();
    setChats((chats) => {
      return [
        ...chats,
        {
          name: userDisplayName,
          text: message,
          is_user: true,
        },
      ];
    });
    setMessage('');
  }

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      buttonRef.current?.click();
    }
  };

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setMessage(event.target.value);
  }

  const sendDataToAllPeers = () => {
    sendData('*', { message: message, name: userDisplayName });
  };

  useEventListener('room:data-received', (data) => {
    if (data.payload.message && data.fromPeerId !== me.meId) {
      setChats((chats) => {
        return [
          ...chats,
          {
            name: data.payload.name,
            text: data.payload.message,
            is_user: false,
          },
        ];
      });
    }
  });

  // console.log(chats);

  const displayChats = chats.map((chat) => {
    return (
      <div
        key={nanoid()}
        className={`${
          chat.is_user
            ? 'ml-auto text-md break-words shadow-md max-w-xs w-fit py-1 px-4 mb-2 bg-[#216CFC] rounded-2xl'
            : 'w-fit py-1 px-4 break-words max-w-xs shadow-md text-md mb-2 rounded-2xl bg-[#242731]'
        }`}
      >
        <div className="text-xs text-blue-300">
          {chat.is_user ? null : chat.name}
        </div>
        {chat.text}
      </div>
    );
  });

  return (
    <div className="text-white w-1/4 h-4/5 p-2 mr-3">
      <div className="flex flex-col h-full">
        <div className="mb-6 font-mono text-left text-2xl ">Huddle Chat</div>
        <div ref={ref} className="overflow-auto flex-col h-full">
          <div className="font-sans">{displayChats}</div>
        </div>
        <div className="flex py-2">
          <input
            type="text"
            placeholder="Type a message"
            className="p-1.5 rounded-xl w-full bg-[#242731]"
            value={message}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
          />
          <button ref={buttonRef} className="p-1" onClick={handleSend}>
            {BasicIcons.send}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
