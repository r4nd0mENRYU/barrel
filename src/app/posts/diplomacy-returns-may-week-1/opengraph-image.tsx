import { getPost } from "@/lib/posts";
import { ogContentType, ogSize, postOgImage } from "@/lib/og";

export const runtime = "nodejs";
export const alt = "외교가 돌아왔다 — Barrel";
export const size = ogSize;
export const contentType = ogContentType;

export default async function Image() {
  const post = getPost("diplomacy-returns-may-week-1")!;
  return postOgImage(post);
}
