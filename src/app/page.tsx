"use client";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useEffect, useState } from "react";
import FeatCommon from "../components/common/FeatCommon";
import { useHuddle01 } from "@huddle01/react";

export default function Home() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [displayName, setDisplayName] = useState<string>("");
  const router = useRouter();
  const { initialize } = useHuddle01();

  const createRoom = async () => {
    const res = await fetch("https://api.huddle01.com/api/v1/create-room", {
      method: "POST",
      body: JSON.stringify({
        title: "Test Room",
      }),
      headers: {
        "Content-Type": "application/json",
        "x-api-key": process.env.NEXT_PUBLIC_API_KEY ?? "",
      },
    });
    const data = await res.json();
    const { roomId } = data.data;
    return roomId;
  };

  return (
    <main className="flex h-screen flex-colitems-center justify-center bg-lobby text-slate-100">
      <div className="flex flex-col items-center justify-center gap-4 w-[26.25rem]">
        <div className="relative text-center flex items-center justify-center w-fit mx-auto">
          <Image
            src="/images/avatar.png"
            alt="audio-spaces-img"
            width={125}
            height={125}
            className="maskAvatar object-contain"
            quality={100}
            priority
          />
          <video
            src="/images/avatar.png"
            muted
            className="maskAvatar absolute left-1/2 top-1/2 z-10 h-full w-full -translate-x-1/2 -translate-y-1/2"
            autoPlay
            loop
          />
          <button
            onClick={() => setIsOpen((prev) => !prev)}
            type="button"
            className="text-white absolute bottom-0 right-0 z-10"
          >
            <svg
              width="32"
              height="32"
              viewBox="0 0 32 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle
                cx="15.9077"
                cy="16"
                r="14.75"
                fill="#23262F"
                stroke="#050505"
                strokeWidth="1.5"
              />
              <path
                d="M19.2381 9.30225C19.0614 9.30225 18.8841 9.36492 18.7587 9.48958C18.3881 9.86025 17.0541 11.1943 16.7581 11.4909L10.7547 17.4943L10.0874 18.1609C9.99472 18.2543 9.94672 18.3863 9.92072 18.5156L9.25406 21.8509C9.16072 22.3176 9.55806 22.7149 10.0247 22.6223C10.4421 22.5383 12.9434 22.0383 13.3601 21.9549C13.4894 21.9289 13.6214 21.8809 13.7147 21.7883L14.3814 21.121L20.3847 15.1176C20.6814 14.8216 22.0154 13.4869 22.3861 13.1169C22.5107 12.9916 22.5734 12.8142 22.5734 12.6376C22.5734 11.5462 22.2954 10.7662 21.7187 10.1776C21.1367 9.58357 20.3594 9.30225 19.2381 9.30225ZM19.5007 10.6482C20.1027 10.6836 20.4927 10.8216 20.7601 11.0949C21.0334 11.3736 21.2061 11.7603 21.2434 12.3503C20.8781 12.7149 20.3434 13.2416 19.9054 13.6796C19.3767 13.1509 18.7247 12.4989 18.1961 11.9703C18.6347 11.5323 19.1361 11.0129 19.5007 10.6482ZM17.2374 12.9289L18.9467 14.6383L13.9021 19.6829L12.1927 17.9736L17.2374 12.9289ZM11.2341 18.9323L12.9434 20.6416L12.8807 20.7043C12.4407 20.7923 11.5521 20.9783 10.7334 21.1423L11.1714 18.9949L11.2341 18.9323Z"
                fill="#94A3B8"
              />
            </svg>
          </button>
          <FeatCommon
            onClose={() => setIsOpen(false)}
            className={
              isOpen
                ? "absolute top-1/2 -translate-y-1/2 block"
                : "absolute top-1/2 -translate-y-1/2 hidden"
            }
          >
          </FeatCommon>
        </div>
        <div className="flex items-center w-full">
          <div className="flex flex-col justify-center w-full gap-1">
            Set a display name
            <div className="flex w-full items-center rounded-[10px] border px-3 text-slate-300 outline-none border-zinc-800 backdrop-blur-[400px] focus-within:border-slate-600 gap-">
              <div className="mr-2">
                <img src="/images/user-icon.svg" className="w-5 h-5" />
              </div>
              <input
                type="text"
                placeholder="Enter your name"
                className="flex-1 bg-transparent py-3 outline-none"
              />
            </div>
          </div>
        </div>
        <div className="flex items-center w-full">
          <button
            className="flex items-center justify-center bg-[#246BFD] text-slate-100 rounded-md p-2 mt-2 w-full"
            onClick={async () => {
              const roomId = await createRoom();
              window.location.href = `/${roomId}`;
            }}
          >
            Start Spaces
            <img
              src="/images/arrow-narrow-right.svg"
              className="w-6 h-6 ml-1"
            />
          </button>
        </div>
      </div>
    </main>
  );
}
