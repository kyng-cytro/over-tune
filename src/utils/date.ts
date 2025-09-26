export const formatTime = (seconds: number | undefined | null): string => {
  if (!seconds) return "00:00";
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, "0")}`;
};

export const isPlaying = (status: string | undefined | null): boolean => {
  return status === "playing";
};
