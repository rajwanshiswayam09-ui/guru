export interface InstagramEmbedItem {
  id: string;
  label: string;
  url: string;
  type: "profile" | "post" | "reel";
}

export const instagramProfile = {
  username: "gurukripaholiday79",
  displayName: "Guru Kripa Holidays",
  subtitle: "Himachal Destination Experts",
  url: "https://www.instagram.com/gurukripaholiday79/",
  reelsUrl: "https://www.instagram.com/gurukripaholiday79/reels/",
};

const rawConfiguredUrls = String(import.meta.env.VITE_INSTAGRAM_EMBED_URLS || "");

const configuredUrls: string[] = rawConfiguredUrls
  .split(",")
  .map((url: string) => url.trim())
  .filter(Boolean);

const classifyInstagramUrl = (url: string): InstagramEmbedItem["type"] => {
  if (url.includes("/reel/")) {
    return "reel";
  }

  if (url.includes("/p/")) {
    return "post";
  }

  return "profile";
};

export const instagramEmbeds: InstagramEmbedItem[] = configuredUrls.map((url: string, index: number) => ({
  id: `instagram-${index + 1}`,
  label: classifyInstagramUrl(url) === "reel" ? "Official Reel" : "Official Post",
  type: classifyInstagramUrl(url),
  url,
}));
