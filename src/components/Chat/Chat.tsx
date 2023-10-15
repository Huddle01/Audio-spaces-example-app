'use client';
import React from 'react';
import useChatScroll from './ChatScroll';
import { useAppUtils } from '@huddle01/react/app-utils';
import { nanoid } from 'nanoid';
import { useState, useRef } from 'react';
import { useEventListener } from '@huddle01/react/hooks';
import { usePeers } from '@huddle01/react/hooks';

const Chat = () => {
  const [message, setMessage] = useState('');
  const [chats, setChats] = useState<{ text: string; is_user: boolean }[]>([]);
  const ref = useChatScroll(chats);
  const buttonRef = useRef(null);
  const [peerId, setPeerId] = useState('');
  const { sendData } = useAppUtils();

  async function handleSend() {
    sendDataToAllPeers();
    setChats((chats) => {
      return [
        ...chats,
        {
          text: message,
          is_user: true,
        },
      ];
    });
    setMessage('');
  }

  const handleKeyDown = (event: any) => {
    if (event.key === 'Enter') {
      buttonRef.current?.click();
    }
  };

  function handleChange(event: any) {
    setMessage(event.target.value);
  }

  const sendDataToAllPeers = () => {
    sendData('*', { message: message });
  };

  useEventListener('room:data-received', (data) => {
    setPeerId(data.fromPeerId);
    setChats((chats) => {
      return [
        ...chats,
        {
          text: data.payload.message,
          is_user: false,
        },
      ];
    });
  });

  const peer = usePeers(peerId);
  const name = peer?.peers[peerId]?.displayName;

  const displayChats = chats.map((chat) => {
    return (
      <div
        key={nanoid()}
        className={`${
          chat.is_user
            ? 'ml-auto mr-2 text-md break-words shadow-md max-w-md w-fit py-2 px-2 mb-2 bg-blue-600 rounded-xl'
            : 'w-fit py-2 px-2 break-words max-w-md shadow-md text-md mb-2 ml-2 rounded-xl bg-slate-700'
        }`}
      >
        <div className="text-xs text-blue-300">
          {chat.is_user ? null : name}
        </div>

        {chat.text}
      </div>
    );
  });

  return (
    <div className="text-white w-1/3 h-3/4 p-2">
      <div className="flex flex-col h-full">
        <div className="mb-6 pl-2 font-mono text-left text-3xl ">
          Huddle Chat
        </div>
        <div ref={ref} className="overflow-auto flex-col h-full">
          <div className="font-sans">{displayChats}</div>
        </div>
        <div className="flex py-2 pl-2">
          <input
            type="text"
            placeholder="What do you want to say?"
            className="p-2 rounded-xl w-full bg-slate-600"
            value={message}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
          />
          <button
            ref={buttonRef}
            className="text-xl p-2 text-white hover:text-blue-500"
            onClick={handleSend}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
