// Single source of truth for posts. Add new posts here as the blog grows.

export type Post = {
  slug: string;
  title: string;
  dek: string; // sub-headline
  publishedAt: string; // YYYY-MM-DD
  readMinutes: number;
  tags: string[];
  excerpt: string;
};

export const posts: Post[] = [
  {
    slug: "oil-2q26-outlook",
    title: "오일 가격, 어디로 가는가",
    dek: "호르무즈와 OPEC 사이에서 — 2026년 2분기 시점 정리",
    publishedAt: "2026-04-29",
    readMinutes: 7,
    tags: ["원유", "Brent", "WTI", "OPEC", "EIA"],
    excerpt:
      "Brent가 다시 $110선을 두드리고 있다. 호르무즈 해협의 사실상 봉쇄, IEA의 수요 -80kb/d 하향, UAE의 OPEC 탈퇴까지 — 2분기 가격을 결정할 다섯 가지 변수를 정리했다.",
  },
];

export function getPost(slug: string): Post | undefined {
  return posts.find((p) => p.slug === slug);
}
