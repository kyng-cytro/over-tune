import { COMMANDS, makeMsg } from "@/constants";
import supabase from "@/utils/supabase";

const allowedCommands: (typeof COMMANDS)[keyof typeof COMMANDS][] = [
  COMMANDS.PLAY_PAUSE,
  COMMANDS.NEXT_TRACK,
  COMMANDS.PREV_TRACK,
  COMMANDS.VOLUME_UP,
  COMMANDS.VOLUME_DOWN,
];

const mount = (id: string) => {
  const channel = supabase
    .channel(`ext:${id}`)
    .on("broadcast", { event: "*" }, (event) => {
      const { type } = event;
      if (type !== "broadcast") return;
      const { payload } = event;
      if (!allowedCommands.includes(payload?.command)) return;
      console.log("[offscreen] received", payload);
      chrome.runtime.sendMessage(
        makeMsg.PROXY_TO_CONTENT(makeMsg.COMMAND_TRIGGERED(payload.command)),
      );
    })
    .subscribe();
  if (!channel) return;
  chrome.runtime.onMessage.addListener((msg) => {
    if (msg.type === "MEDIA_UPDATE") {
      channel.send({
        type: "broadcast",
        payload: msg.data,
        event: "MEDIA_UPDATE",
      });
    }
  });
  console.log("Offscreen loaded", id);
};

const params = new URLSearchParams(window.location.search);
const id = params.get("id");
if (id) mount(id);
