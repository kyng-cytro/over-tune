import { makeMsg } from "@/constants";
import { sendToContent } from "@/utils/chrome";

export const isDefined = <T>(value: T | null): value is T => value !== null;

export const triggerCommand = (action: string) => {
  sendToContent(makeMsg.COMMAND_TRIGGERED(action));
};

export const setDevice = (deviceId: string) => {
  sendToContent(makeMsg.SET_DEVICE(deviceId));
};

export const isSame = (a: Object | null, b: Object | null) =>
  JSON.stringify(a) === JSON.stringify(b);

export const updateSink = (media: HTMLMediaElement, sinkId: string) => {
  if (typeof media.setSinkId === "function") {
    media.setSinkId(sinkId).catch(() => {
      chrome.storage.local.remove("preferredSinkId");
    });
  }
};
