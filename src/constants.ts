import type { MediaInfo } from "./types.ts";

export const STORAGE_KEYS = {
  PREFERRED_SINK_ID: "preferredSinkId",
};

export const URLS = {
  CONTENT_SCRIPT: "*://music.youtube.com/*",
  SHORTCUTS: "chrome://extensions/shortcuts",
  PLAY_MUSIC: "https://music.youtube.com/watch?list=RDMM&start_radio=1",
};

export const COMMANDS = {
  PLAY_PAUSE: "play-pause",
  NEXT_TRACK: "next-track",
  PREV_TRACK: "prev-track",
  VOLUME_UP: "volume-up",
  VOLUME_DOWN: "volume-down",
  CUSTOM_ACTION: "custom-action",
};

export const KEYS = {
  GET_MEDIA: "GET_MEDIA",
  SET_DEVICE: "SET_DEVICE",
  GET_DEVICES: "GET_DEVICES",
  MEDIA_UPDATE: "MEDIA_UPDATE",
  COMMAND_TRIGGERED: "COMMAND_TRIGGERED",
} as const;

export const makeMsg = {
  GET_MEDIA: () => ({ type: KEYS.GET_MEDIA }),
  GET_DEVICES: () => ({ type: KEYS.GET_DEVICES }),
  MEDIA_UPDATE: (data: MediaInfo) => ({ type: KEYS.MEDIA_UPDATE, data }),
  SET_DEVICE: (deviceId: string) => ({
    deviceId,
    type: KEYS.SET_DEVICE,
  }),
  COMMAND_TRIGGERED: (command: string) => ({
    command,
    type: KEYS.COMMAND_TRIGGERED,
  }),
};
