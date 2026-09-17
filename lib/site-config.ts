export const VOZO_SITE_URL = "https://vozo-voice-lab.base44.app/";

export function isSupportedSiteUrl(value: string): boolean {
  try {
    const url = new URL(value);
    return (url.protocol === "https:" || url.protocol === "http:") && url.hostname === "vozo-voice-lab.base44.app";
  } catch {
    return false;
  }
}
