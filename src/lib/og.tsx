import { ImageResponse } from "next/og";
import type { Post } from "./posts";

export const ogSize = { width: 1200, height: 630 };
export const ogContentType = "image/png";

export function postOgImage(post: Post) {
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
              fontSize: 20,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "#5d594c",
            }}
          >
            BARREL
          </span>
          <span style={{ fontSize: 18, color: "#5d594c" }}>
            {post.publishedAt} · {post.readMinutes}분
          </span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <span
            style={{
              fontSize: 76,
              lineHeight: 1.08,
              color: "#0e0d0a",
              letterSpacing: "-0.02em",
              maxWidth: 1040,
            }}
          >
            {post.title}
          </span>
          <span
            style={{
              fontSize: 30,
              lineHeight: 1.3,
              color: "#6e2a1f",
              fontStyle: "italic",
              letterSpacing: "-0.01em",
              maxWidth: 1040,
            }}
          >
            {post.dek}
          </span>
        </div>

        <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
          {post.tags.slice(0, 4).map((t) => (
            <span
              key={t}
              style={{
                fontSize: 16,
                color: "#3a382f",
                border: "1px solid #b6ad93",
                borderRadius: 999,
                padding: "6px 14px",
                display: "flex",
              }}
            >
              {t}
            </span>
          ))}
          <span style={{ marginLeft: "auto", fontSize: 18, color: "#5d594c", display: "flex" }}>
            barrel-alpha.vercel.app
          </span>
        </div>
      </div>
    ),
    ogSize,
  );
}
