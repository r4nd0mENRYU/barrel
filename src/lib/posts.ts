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
    slug: "diplomacy-returns-may-week-1",
    title: "외교가 돌아왔다",
    dek: "Iran 14-포인트, 첫 post-UAE OPEC+, 그리고 6일 박스권",
    publishedAt: "2026-05-04",
    readMinutes: 8,
    tags: ["원유", "Iran", "OPEC+", "UAE", "외교", "호르무즈"],
    excerpt:
      "5월 첫 주, 시장은 정치 헤드라인에 따라 6일 만에 박스권 6%를 그렸다. 5/1 UAE의 OPEC 탈퇴 발효, 5/3 Iran의 14-포인트 협상안 — 호르무즈 개방과 핵을 분리한 카드 — 5/4 첫 post-UAE OPEC+ 회의. 외교 트랙이 다시 켜진 한 주를 정리한다.",
  },
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
