import { getPost } from "@/lib/posts";
import { ogContentType, ogSize, postOgImage } from "@/lib/og";

export const runtime = "nodejs";
export const alt = "Brent $118의 해부 — Barrel";
export const size = ogSize;
export const contentType = ogContentType;

export default async function Image() {
  const post = getPost("brent-118-anatomy")!;
  return postOgImage(post);
}
