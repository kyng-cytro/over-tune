import supabase from "@/utils/supabase";

const mount = (id: string) => {
  const channel = supabase
    .channel(`ext:${id}`)
    .on("broadcast", { event: "*" }, (payload) => {
      console.log("New payload", payload);
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
