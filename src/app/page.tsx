"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-hot-toast";

export default function Home() {
  // Local States
  const [displayName, setDisplayName] = useState<string>("");

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

  const router = useRouter();

  // Handler
  const handleStartSpaces = async () => {
    if (!displayName.length) {
      toast.error("Display name cannot be empty");
      return;
    }

    const roomId = await createRoom();
    router.push(`/${roomId}`);
  };

  return (
    <main className="flex h-screen relative items-center justify-center bg-lobby text-slate-100">
      <div className="flex columns-1 items-center gap-2">
        <Image
          src="/images/avatar.png"
          alt="avatar"
          width={100}
          height={100}
          className="object-contain"
          quality={100}
        />

        {/* Add */}
        <div className="flex items-center">
          <div className="flex flex-col items-center justify-center">
            Set a display name
            <input
              className="border-2 border-slate-100 rounded-md p-2 mt-2"
              type="text"
              autoComplete="off"
              placeholder="Display name"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
            />
            <button
              className="bg-slate-100 text-slate-900 rounded-md p-2 mt-2"
              onClick={handleStartSpaces}
            >
              Start Spaces
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
