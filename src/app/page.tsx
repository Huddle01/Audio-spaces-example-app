// Components
import IntroPage from '@/components/IntroPage/IntroPage';

interface RoomDetails {
  message: string;
  data: {
    roomId: string;
  };
}

const createRandomRoom = async () => {
  const res = await fetch('https://api.huddle01.com/api/v1/create-room', {
    method: 'POST',
    body: JSON.stringify({
      title: 'Test Room',
    }),
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': process.env.NEXT_PUBLIC_API_KEY ?? '',
    },
    cache: 'no-store',
  });
  const data: RoomDetails = await res.json();
  const { roomId } = data.data;
  return roomId;
};

export default async function Home() {
  const roomId = await createRandomRoom();
  return <IntroPage roomId={roomId} />;
}
