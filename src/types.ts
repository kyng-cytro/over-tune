type Base = null | undefined;

export interface Shortcut {
  key: string;
  name: string;
  action: string;
}

export interface Connection {
  id: string;
  device_id: string;
  created_at: string;
  revoked_at: string | null;
  devices: {
    platform: string;
  };
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

export interface Settings {
  pin: boolean;
  openYTM: boolean;
  surprise: boolean;
  networking: {
    enable: boolean;
    fingerprint?: string;
  };
}
