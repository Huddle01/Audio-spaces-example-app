"use  server";

import LobbyPage from "@/components/LobbyPage/LobbyPage";

const createRandomRoom = async () => {
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

export default async function Home() {
  const roomId = await createRandomRoom();

  return <LobbyPage roomId={roomId} />;
}
