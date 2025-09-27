import { makeMsg } from "@/constants";
import { sendToContent } from "@/utils/chrome";

export const isDefined = <T>(value: T | null): value is T => value !== null;

export const triggerCommand = (action: string) => {
  sendToContent(makeMsg.COMMAND_TRIGGERED(action));
};

export const setDevice = (deviceId: string) => {
  sendToContent(makeMsg.SET_DEVICE(deviceId));
};
