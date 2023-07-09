"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";

type LobbyPageProps = {
  roomId: string;
};

const LobbyPage: React.FC<LobbyPageProps> = ({ roomId }) => {
  const { push } = useRouter();

  useEffect(() => {
    push(`/${roomId}/lobby`);
  }, []);

  return null;
};
export default LobbyPage;
