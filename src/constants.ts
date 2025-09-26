import type { MediaInfo } from "@/types";

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
  MEDIA_UPDATE: "MEDIA_UPDATE",
  COMMAND_TRIGGERED: "COMMAND_TRIGGERED",
} as const;

export const makeMsg = {
  GET_MEDIA: () => ({ type: KEYS.GET_MEDIA }),
  MEDIA_UPDATE: (data: MediaInfo) => ({ type: KEYS.MEDIA_UPDATE, data }),
  COMMAND_TRIGGERED: (command: string) => ({
    command,
    type: KEYS.COMMAND_TRIGGERED,
  }),
};
