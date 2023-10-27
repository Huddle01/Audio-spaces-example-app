'use client';
import React from 'react';
import useChatScroll from './ChatScroll';
import { useAppUtils } from '@huddle01/react/app-utils';
import { nanoid } from 'nanoid';
import useStore from '@/store/slices';
import { useState, useRef } from 'react';
import { BasicIcons } from '@/assets/BasicIcons';

const Chat = () => {
  const userDisplayName = useStore((state) => state.userDisplayName);
  const [message, setMessage] = useState<string>('');
  const addChatMessage = useStore((state) => state.addChatMessage);
  const chatMessages = useStore((state) => state.chatMessages);
  const ref = useChatScroll(chatMessages);
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const { sendData } = useAppUtils();

  async function handleSend() {
    sendDataToAllPeers();
    const newChatMessage = {
      name: userDisplayName,
      text: message,
      is_user: true,
    };
    addChatMessage(newChatMessage);
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

  const displayChats = chatMessages.map((chat) => {
    return (
      <div
        key={nanoid()}
        className={`${
          chat.is_user
            ? 'ml-auto text-md break-words max-w-xs w-fit py-1 px-4 mb-2 bg-[#216CFC] rounded-2xl items-center flex'
            : 'w-fit py-1 px-4 break-words max-w-xs text-md mb-2 rounded-2xl bg-[#343744]'
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
    <div className="text-white w-1/4 h-4/5 p-2 mr-3 bg-[#191B1F] rounded-xl ">
      <div className="flex flex-col h-full">
        <div className="mb-3 font-mono text-left text-lg p-2">
          <div className="flex items-center gap-2">{BasicIcons.chat}Chat</div>
          <div className="border-t mt-3 border-[#94A3B8]"></div>
        </div>
        <div ref={ref} className="overflow-auto flex-col h-full">
          <div className="font-sans">{displayChats}</div>
        </div>
        <div className="flex py-1 pl-1">
          <input
            type="text"
            placeholder="Type a message"
            className="p-1.5 rounded-xl w-full bg-[#343744] text-sm"
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
