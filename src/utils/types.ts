enum IRoleEnum {
  host = "host",
  coHost = "coHost",
  moderator = "moderator",
  speaker = "speaker",
  listener = "listener",
  peer = "peer",
}

export type Peer = {
  peerId: string;
  role?: IRoleEnum;
  mic?: MediaStreamTrack | null;
  cam?: MediaStreamTrack | null;
  displayName: string;
};
