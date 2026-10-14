import { ImageResponse } from "next/og";

import { site, siteDescription } from "@/lib/site";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = `${site.name} - ${site.tagline}`;

/** Gambar pratinjau media sosial, dibuat saat build. */
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          background: "#022c22",
          padding: "80px",
          color: "#ffffff",
        }}
      >
        <div
          style={{
            display: "flex",
            alignSelf: "flex-start",
            border: "2px solid #d4a017",
            color: "#d4a017",
            borderRadius: "9999px",
            padding: "10px 28px",
            fontSize: 26,
            letterSpacing: 2,
          }}
        >
          SEKOLAH ISLAM TERPADU
        </div>

        <div
          style={{
            display: "flex",
            marginTop: 36,
            fontSize: 76,
            fontWeight: 700,
            lineHeight: 1.1,
            letterSpacing: -2,
          }}
        >
          {site.name}
        </div>

        <div style={{ display: "flex", marginTop: 20, fontSize: 40, color: "#eacb64" }}>
          {site.tagline}
        </div>

        <div
          style={{
            display: "flex",
            marginTop: 40,
            fontSize: 26,
            lineHeight: 1.5,
            color: "#a7f3d0",
            maxWidth: 900,
          }}
        >
          {siteDescription}
        </div>
      </div>
    ),
    size,
  );
}