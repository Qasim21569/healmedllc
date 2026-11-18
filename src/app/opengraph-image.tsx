import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { site } from "@/content/site";

export const alt = `${site.brand}: ${site.brandLine}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** Default share image: violet ground, the logo, HEAL and the brand line. */
export default async function OpengraphImage() {
  const [font, logo] = await Promise.all([
    readFile(join(process.cwd(), "assets/HostGrotesk-Medium.ttf")),
    readFile(join(process.cwd(), "public/brand/heal-logo-white.png")),
  ]);
  const logoSrc = `data:image/png;base64,${logo.toString("base64")}`;

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: 72,
        background: "#6556B8",
        color: "#FFFFFF",
        fontFamily: "Host Grotesk",
      }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={logoSrc} width={286 * 0.8} height={109 * 0.8} alt="" />
      <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
        <div style={{ fontSize: 200, lineHeight: 0.8, letterSpacing: "-0.02em" }}>{site.brand}</div>
        <div style={{ fontSize: 44, letterSpacing: "-0.02em", color: "#EBECF8" }}>
          {site.brandLine}
        </div>
      </div>
    </div>,
    { ...size, fonts: [{ name: "Host Grotesk", data: font, style: "normal", weight: 500 }] },
  );
}
