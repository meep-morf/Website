import { ImageResponse } from "next/og";

export const alt = "NomadLabz — Software that moves business. Security that protects it.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#070809",
          color: "#f2f4f5",
          padding: "64px",
          fontFamily: "ui-sans-serif, system-ui, sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 28,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "#2db88a",
          }}
        >
          NomadLabz
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div
            style={{
              fontSize: 58,
              fontWeight: 700,
              lineHeight: 1.1,
              letterSpacing: "-0.03em",
              maxWidth: 920,
            }}
          >
            Software that moves business. Security that protects it.
          </div>
          <div style={{ fontSize: 26, color: "#9aa3ab", maxWidth: 760 }}>
            The invisible operating layer for ambitious teams.
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
