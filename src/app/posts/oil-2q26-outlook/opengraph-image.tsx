import { getPost } from "@/lib/posts";
import { ogContentType, ogSize, postOgImage } from "@/lib/og";

export const runtime = "nodejs";
export const alt = "오일 가격, 어디로 가는가 — Barrel";
export const size = ogSize;
export const contentType = ogContentType;

export default async function Image() {
  const post = getPost("oil-2q26-outlook")!;
  return postOgImage(post);
}
