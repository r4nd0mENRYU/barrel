import { ImageResponse } from "next/og";

export const runtime = "nodejs";
export const alt = "Barrel — 원유와 에너지 시장의 짧은 노트";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#fafaf6",
          padding: "72px 80px",
          fontFamily: '"Newsreader", Georgia, serif',
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span
            style={{
              fontSize: 22,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "#5d594c",
            }}
          >
            BARREL · ISSUE 01
          </span>
          <span
            style={{
              fontSize: 18,
              color: "#5d594c",
              borderTop: "1px solid #b6ad93",
              paddingTop: 6,
            }}
          >
            오일 · 에너지 시장 분석
          </span>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <span style={{ fontSize: 96, lineHeight: 1.04, color: "#0e0d0a", letterSpacing: "-0.02em" }}>
            원유와 에너지 시장의
          </span>
          <span
            style={{
              fontSize: 96,
              lineHeight: 1.04,
              color: "#6e2a1f",
              fontStyle: "italic",
              letterSpacing: "-0.02em",
            }}
          >
            짧은 노트.
          </span>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
          <span style={{ fontSize: 24, color: "#3a382f", maxWidth: 720 }}>
            EIA · IEA · OPEC 1 차 데이터로 매주 한두 편, 한국어로 정리합니다.
          </span>
          <span style={{ fontSize: 18, color: "#5d594c", display: "flex" }}>barrel-alpha.vercel.app</span>
        </div>
      </div>
    ),
    { ...size },
  );
}
