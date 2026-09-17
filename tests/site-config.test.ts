import { describe, expect, it } from "vitest";

import { isSupportedSiteUrl, VOZO_SITE_URL } from "../lib/site-config";

describe("Vozo site configuration", () => {
  it("uses the official Vozo Magpie Studio URL", () => {
    expect(VOZO_SITE_URL).toBe("https://vozo-voice-lab.base44.app/");
    expect(isSupportedSiteUrl(VOZO_SITE_URL)).toBe(true);
  });

  it("rejects unrelated or malformed destinations", () => {
    expect(isSupportedSiteUrl("https://example.com")).toBe(false);
    expect(isSupportedSiteUrl("not-a-url")).toBe(false);
  });
});
