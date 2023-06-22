'use client'
import { useRouter } from "next/navigation";

export default function Home() {
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

  return (
    <main className="flex h-screen relative items-center justify-center bg-lobby text-slate-100">
      <div className="flex columns-1 items-center gap-2">
        <img src="/images/avatar.png" alt="avatar" />
        {/* Add */}
        <div className="flex items-center">
          <div className="flex flex-col items-center justify-center">
            Set a display name
            <input
              className="border-2 border-slate-100 rounded-md p-2 mt-2"
              type="text"
              placeholder="Display name"
            />
            <button
              className="bg-slate-100 text-slate-900 rounded-md p-2 mt-2"
              onClick={(async () => {
                const roomId = await createRoom();
                router.push(`/${roomId}`);
              })}
            >
              Start Spaces
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
