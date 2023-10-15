'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useHuddle01 } from '@huddle01/react';
import { useLobby } from '@huddle01/react/hooks';

type LobbyPageProps = {
  roomId: string;
};

const IntroPage: React.FC<LobbyPageProps> = ({ roomId }) => {
  const { initialize } = useHuddle01();
  const { joinLobby } = useLobby();
  const { push } = useRouter();

  useEffect(() => {
    initialize(process.env.NEXT_PUBLIC_PROJECT_ID ?? '');
    joinLobby(roomId);
    push(`/${roomId}/lobby`);
  }, []);

  return null;
};
export default IntroPage;
