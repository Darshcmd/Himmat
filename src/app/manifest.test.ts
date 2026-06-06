import { describe, expect, it } from "vitest";
import manifest from "./manifest";

describe("app manifest", () => {
  it("describes Himmat as an installable student wellness app", () => {
    const appManifest = manifest();

    expect(appManifest.name).toBe("Himmat: By Darsh");
    expect(appManifest.short_name).toBe("Himmat");
    expect(appManifest.theme_color).toBe("#07111f");
    expect(appManifest.icons?.[0]).toMatchObject({
      src: "/icon.svg",
      type: "image/svg+xml",
    });
  });
});
