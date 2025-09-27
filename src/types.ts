type Base = null | undefined;

export interface Keybind {
  key: string;
  name: string;
  action: string;
}

export interface MessageContent {
  type: string;
  [key: string]: any;
}

export interface Device {
  id: string;
  name: string;
  isActive: boolean;
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
