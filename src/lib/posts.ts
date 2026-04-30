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
    slug: "brent-118-anatomy",
    title: "Brent $118의 해부",
    dek: "4월 29일 +6% 무브를 네 개 층위로 분해한다",
    publishedAt: "2026-04-30",
    readMinutes: 9,
    tags: ["원유", "Brent", "WTI", "호르무즈", "EIA", "옵션"],
    excerpt:
      "트럼프의 '핵 합의까지 봉쇄' 한 마디에 Brent가 6% 점프하며 $118.03으로 마감했다. 그러나 그 무브 아래에는 미국 재고 빌드인데도 가격이 오른다는 역설, vol risk premium의 음수 전환, managed money 다년 peak가 동시에 깔려 있다. 같은 날 시장이 보낸 네 개 신호를 분해한다.",
  },
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
