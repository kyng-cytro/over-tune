type Base = null | undefined;

export interface MessageContent {
  type: string;
  [key: string]: any;
}

export interface Keybind {
  key: string;
  name: string;
  action: string;
}

export interface MediaInfo {
  track: {
    title: string | Base;
    album: string | Base;
    artist: string | Base;
    artwork: string | Base;
  };
  progress: number | Base;
  duration: number | Base;
  status: "none" | "playing" | "paused" | Base;
}
