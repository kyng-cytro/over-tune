import { storageHelper } from "@/utils/chrome";
import supabase from "@/utils/supabase";
import type { Settings } from "@/types";

export const getExtensionId = async () => {
  const { networking } = JSON.parse(
    await storageHelper.get("SETTINGS"),
  ) as Settings;
  if (!networking.enable) return;
  const { data } = await supabase
    .from("extensions")
    .select("id")
    .eq("fingerprint", networking.fingerprint)
    .single();
  return data?.id;
};

export const setupNetworking = async () => {
  try {
    const { networking, ...rest } = JSON.parse(
      await storageHelper.get("SETTINGS"),
    ) as Settings;
    if (!networking.enable) return;
    let stored = networking.fingerprint;
    if (!stored) {
      stored = crypto.randomUUID();
      await storageHelper.set(
        "SETTINGS",
        JSON.stringify({
          ...rest,
          networking: { ...networking, fingerprint: stored },
        }),
      );
    }
    const fingerprint = stored;
    const { data } = await supabase
      .from("extensions")
      .select("id")
      .eq("fingerprint", fingerprint)
      .single();
    if (data) return data.id;
    const { data: created } = await supabase
      .from("extensions")
      .insert({ fingerprint })
      .select("id")
      .single();

    return created!.id;
  } catch (e: any) {
    console.error("[networking] failed to setup networking", e);
  }
};
