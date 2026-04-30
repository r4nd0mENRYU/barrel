import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getPost } from "@/lib/posts";
import { OilAprilChart } from "@/components/oil-april-chart";
import { UsInventoryChart } from "@/components/us-inventory-chart";

const POST_SLUG = "brent-118-anatomy";

export async function generateMetadata(): Promise<Metadata> {
  const post = getPost(POST_SLUG);
  if (!post) return {};
  const url = `/posts/${POST_SLUG}`;
  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      url,
      title: `${post.title} — Barrel`,
      description: post.excerpt,
      publishedTime: post.publishedAt,
      tags: post.tags,
    },
    twitter: {
      card: "summary_large_image",
      title: `${post.title} — Barrel`,
      description: post.excerpt,
    },
  };
}

export default function Page() {
  const post = getPost(POST_SLUG);
  if (!post) notFound();

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.publishedAt,
    dateModified: post.publishedAt,
    author: { "@type": "Organization", name: "Barrel" },
    publisher: { "@type": "Organization", name: "Barrel" },
    keywords: post.tags.join(", "),
    inLanguage: "ko-KR",
  };

  return (
    <article className="mx-auto max-w-3xl px-6 py-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />

      <header className="mb-10 border-b border-rule pb-10">
        <Link href="/" className="eyebrow inline-flex items-center gap-2 text-ink-3 hover:text-ink">
          ← 모든 글
        </Link>
        <h1 className="serif mt-6 text-4xl text-ink sm:text-5xl">{post.title}</h1>
        <p className="serif mt-3 text-xl italic text-ink-3 sm:text-2xl">{post.dek}</p>
        <div className="mt-6 flex flex-wrap items-center gap-4 text-xs text-ink-3">
          <time dateTime={post.publishedAt} className="tnum">
            {post.publishedAt}
          </time>
          <span aria-hidden>·</span>
          <span>{post.readMinutes}분 분량</span>
          <span aria-hidden>·</span>
          <span className="flex flex-wrap gap-2">
            {post.tags.map((t) => (
              <span key={t} className="rounded-full border border-rule px-2 py-0.5">
                {t}
              </span>
            ))}
          </span>
        </div>
      </header>

      <div className="article-body">
        <p className="lead">
          어제(4월 29일) 글로벌 시장에서 가장 큰 단일 무브는 원유였다. Brent 6월물은 6.0% 상승해
          $118.03 으로 마감했고, WTI 6월물은 6.8% 올라 $106.88 으로 끝났다. 단일 트리거는
          명확하다 — 트럼프 대통령의 “Iran 이 핵 합의에 응할 때까지 해상 봉쇄를 유지한다” 발언.
          그러나 같은 시간 시장이 보낸 신호는 한 줄로 요약되지 않는다. 미국 재고는 빌드인데도
          가격이 올랐고, WTI 1개월 implied vol 은 오히려 빠지고 있었으며, vol risk premium 은
          음수 — 즉 옵션이 realized 보다 싸게 거래되는 — 로 전환됐다. 어제의 +6% 를 네 개 층위로
          분해한다.
        </p>

        <h2>층위 1 — 정치 이벤트와 호르무즈 3개월</h2>
        <p>
          가격 차트만 보면 4월의 흐름은 “완만한 우상향 + 4/29 점프” 다.
        </p>

        <figure>
          <OilAprilChart />
          <figcaption>
            4월 일별 Brent / WTI 6월물 settle. 4/29 트럼프 봉쇄 발언 직후 $111 → $118 단일
            세션 6.0%. WTI 도 같은 폭. 출처: Fortune, CNBC, Bloomberg 4월 일별 보도.
          </figcaption>
        </figure>

        <p>
          단일 세션 6% 는 Brent 기준 평시 vol band 를 한참 넘는 무브다. WTI 1개월 implied vol 이
          51% 인 환경에서 1-day annualized 무브 기대치는 약 3.2%(= 51% / √252) 인데, 어제 무브는
          그 두 배다. 트레이딩 데스크의 표현으로는 “4-sigma event” — 분포 이론대로면 1만 거래일에
          한 번 나올 사건이지만, 호르무즈가 3개월째 막혀 있는 시장에선 그 가정 자체가 무너졌다.
        </p>
        <p>
          호르무즈 통항량은 사실상 정상화의 반대 방향으로 가고 있다. 평시 대비 5% 수준에 머물러
          있고, 4월 13일 미국이 이란 항구를 봉쇄하면서 “dual blockade” 구도가 완성됐다. 4월 29일
          공교롭게도 Bloomberg 가 보도한 Idemitsu Maru — 일본행 사우디 원유 200만 배럴을 실은
          VLCC — 가 “Tehran 승인 항로(Qeshm·Larak Islands 인근)” 로 통과한 첫 비-이란 VLCC 였다.
          10일 만의 첫 외국 VLCC. 약 2,000 척이 여전히 Gulf 안에서 대기 중이다.
        </p>
        <p className="pull">
          공급 충격이 “비정상의 새로운 정상” 이 되면서 가격은 그 자체로 새 균형을 찾아간다 —
          그러나 시장이 그 균형에 안주한 순간, 상층 정치가 다시 한 번 흔든다.
        </p>

        <h2>층위 2 — 재고는 빌드, 가격은 상승</h2>
        <p>
          정통적인 펀더멘털 분석가라면 어제 EIA Weekly Petroleum Status 데이터를 보고 가격
          상승에 의문을 가질 만하다. 4월 한 달간 미국 상업용 원유 재고는 누적 +4.1Mb 빌드(주별
          +3.1 / −0.9 / +1.9), 4/17 마감 주 기준 465.7Mb 로 5년 평균 대비 약 +2.3%. 동시에
          Cushing 허브도 +806kb. 단순 수급 모델이라면 가격에 부정적이어야 한다.
        </p>

        <figure>
          <UsInventoryChart />
          <figcaption>
            EIA Weekly Petroleum Status Report — 미국 상업용 원유 재고 (M bbl). 검정 점선은
            5년 평균 약 455M. 4/17 마감 주 +1.9M, 5년 평균 대비 +2.3%. 출처: EIA.
          </figcaption>
        </figure>

        <p>
          그러나 같은 보고서의 옆 페이지에 답이 있다 — 미국 원유 수출이{" "}
          <strong>일평균 6mb/d 사상 최고</strong> 로 분출하고 있다. 즉 미국 안에 쌓이는 빌드의
          상당 부분은 “북미 production 회복” 이 아니라 “글로벌 짧음을 메우려고 마지막까지
          뽑아내는 cushion” 이고, 그 cushion 자체가 한계에 다다르고 있다는 신호다. 호르무즈가
          막힌 만큼 미국 셰일·Permian 으로 부족분을 갈아끼우고 있는데, 4월 데이터는 그 갈아
          끼움이 정상화의 신호가 아니라 한계 진입의 신호로 읽혀야 한다는 게 시장의 해석이다.
        </p>
        <p>
          여기에 Brent–WTI 격차도 함께 봐야 한다. 어제 마감 기준 격차는 $11.15 — 통상 $4–6 의
          평균 격차에서 두 배 가까이 벌어졌다. Brent (해상·국제 무역가격) 가 WTI (내륙·미국
          중심) 보다 훨씬 강하게 반응한다는 것은 시장이 어제 가격에 반영한 게{" "}
          <em>“미국 펀더멘털” 이 아니라 “해상 운송 차질”</em> 이라는 것을 직접 말해 주는 숫자다.
        </p>

        <h2>층위 3 — 옵션 시장의 두 신호</h2>
        <p>
          가격이 +6% 점프한 날, 옵션 트레이더들이 무엇을 했는지가 가장 흥미롭다.
        </p>
        <h3>WTI 1M implied volatility</h3>
        <p>
          WTI 1개월 ATM IV 는 4월 셋째 주에 한때 68% 까지 갔다가 51% 로 후퇴했다. 즉{" "}
          <strong>+6% 무브가 일어난 어제도 IV 는 절대 수치 기준으로는 이미 한 차례 식은
          상태</strong> 였다는 것이다. 단일 세션 가격 점프는 일시적으로 IV 를 끌어 올리지만, 시장의
          1개월 시계 기대 vol 은 “아 또 한 번 이런 무브가 가능” 이라는 정도지 “위기가 두 배로
          커졌다” 는 건 아니다.
        </p>
        <h3>Vol risk premium 음수 전환</h3>
        <p>
          더 의미심장한 건 IV–RV 스프레드다. 4월 중 30 포인트까지 벌어졌다가 14 포인트로
          반감됐고, 일부 데스크 데이터에서는 vol risk premium 자체가{" "}
          <strong>음수</strong> 로 돌아섰다. 즉 옵션이 realized 보다 싸게 거래된다는 뜻이고, 이는
          러시아-우크라이나, 이스라엘-이란 같은 과거 위기와 다른 그림이다. 그때는 IV 가 RV 를
          크게 넘었고 헷지가 비쌌다. 지금은 헷지가 오히려 매력적이다 — <em>시장이 “이미 다 알고
          있다”고 가정하고 옵션 프리미엄에서 보호 비용을 빼고 있다는 뜻</em>.
        </p>
        <h3>Skew 와 managed money</h3>
        <p>
          OTM call skew (XOM, OXY, SLB 같은 정유·서비스 메이저) 는 100$ 위로 확대됐다. 콜이
          비싸졌다는 뜻이고, 동시에 “colored call writing 으로 프리미엄을 거둘 수 있는 환경” 이라는
          게 데스크 코멘터리다. 한편 CFTC managed money net-long 은 다년 peak 약 4.71% 까지
          쌓였다. 즉 헤지펀드·CTA 들이 이미 올인 가까운 상태다. 추가 매수 여력은 줄었고,{" "}
          <strong>거꾸로 한 번 unwind 가 시작되면 가격이 펀더멘털 이상으로 빠질 위험</strong> 이
          그만큼 커졌다. 트럼프의 한 마디로 +6% 가 가능했던 이유 중 하나다 — 시장이 이미 단방향에
          가득 차 있을 때, 작은 정치 이벤트도 가격에 큰 swing 을 만든다.
        </p>

        <h2>층위 4 — 한국 산업으로 떨어지는 영향</h2>
        <p>
          마지막으로, 이 가격이 한국 경제의 어디를 누르는지 단순 정리한다.
        </p>
        <ul>
          <li>
            <strong>정유 4 사 (SK이노베이션·GS칼텍스·에쓰오일·HD현대오일뱅크):</strong> 입장
            원유는 Brent 계열·중동산 비중이 높다. 원가는 직접 상승. 단, 같은 시기 글로벌 정제 마진
            (Singapore / Mediterranean gasoline·distillate crack spread) 도 동반 상승 중이라
            마진 압축은 제한적. 1Q 결산 시즌과 겹쳐 단기 실적 sensitivity 가 높음.
          </li>
          <li>
            <strong>항공사 (대한항공·아시아나·진에어 등):</strong> 항공유 (Singapore Jet Kero
            crack) 는 어제 spike. Hedge ratio 가 60% 안팎인 회사들은 단기 P&L 노이즈 수용. 100%
            unhedged 인 LCC 는 surcharge 인상 압력 즉시.
          </li>
          <li>
            <strong>LNG·가스:</strong> 호르무즈 봉쇄는 카타르 LNG 도 직격. 한국 LNG 수입의
            카타르 비중은 약 20% 대. 직물·발전사 (한전 발전 자회사) 비용 급등 압력. 동절기로
            가기 전 인벤토리 빌드 의사결정이 더 비싸짐.
          </li>
          <li>
            <strong>환율 / 인플레:</strong> 유가 +1$ → 한국 경상수지 악화 ≈ 약 8억 달러 (월간
            기준 추정), KRW 약세 압력. CPI 에너지 항목은 유가에 6~8 주 시차로 반영, 국내
            휘발유 펌프 가격은 2 주 시차.
          </li>
        </ul>

        <h2>다음에 봐야 할 다섯 가지</h2>
        <ol>
          <li>다음 EIA Weekly Petroleum Status (다음 주 수요일 발표) — 수출 6mb/d 가 유지되는가.</li>
          <li>
            Brent prompt-deferred calendar spread — 1M-2M backwardation 이 더 깊어지면 spot 부족
            심화 신호.
          </li>
          <li>
            CFTC Commitments of Traders (매주 금) — managed money net-long 이 더 쌓이는가, 줄어
            드는가.
          </li>
          <li>
            VLCC TCE (Baltic Exchange, MEG–Asia 노선) — 운임이 떨어지면 통항 정상화의 leading
            indicator.
          </li>
          <li>
            트럼프 발언 빈도 — 단순 한 마디로 6% 가 가능한 시장에선 정치 텍스트가 곧 가격이다.
          </li>
        </ol>

        <hr className="my-12 border-rule" />

        <p className="text-sm text-ink-3">
          출처: CNBC (2026-04-29 Trump 봉쇄 발언, Brent $118.03 마감), Bloomberg (Hormuz tracker
          / Idemitsu Maru 통과, 2026-04-29), Fortune (4월 일별 가격 추이), CNN (Hormuz visual
          deep dive, 2026-04-29), Al Jazeera (When will Strait of Hormuz be ‘safe’?, 2026-04-28),
          EIA Weekly Petroleum Status Report (4월 3주차), EIA Short-Term Energy Outlook (April
          2026), Saxo / Dukascopy / CMRA (옵션·managed money 데이터, 2026-04 중순). 본문의
          한국 산업 영향 추정은 공시 데이터를 바탕으로 한 단순 sensitivity 추정이며, 개별 기업
          실적과 다를 수 있다.
        </p>
      </div>
    </article>
  );
}
