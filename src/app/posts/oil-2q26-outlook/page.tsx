import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getPost } from "@/lib/posts";
import { BrentForecastChart } from "@/components/brent-forecast-chart";
import { IeaDemandChart } from "@/components/iea-demand-chart";

const POST_SLUG = "oil-2q26-outlook";

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
    publisher: {
      "@type": "Organization",
      name: "Barrel",
    },
    keywords: post.tags.join(", "),
    inLanguage: "ko-KR",
  };

  return (
    <article className="mx-auto max-w-3xl px-6 py-16">
      {/* JSON-LD for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />

      <header className="mb-10 border-b border-rule pb-10">
        <Link
          href="/"
          className="eyebrow inline-flex items-center gap-2 text-ink-3 hover:text-ink"
        >
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
          Brent가 다시 $110 선을 두드리고 있다. 한 달 전만 해도 IEA가 “2026년 1분기에 일평균 5백만
          배럴 가까운 공급 과잉이 가능하다” 고 경고했던 시장이다. 그 사이 호르무즈 해협이 사실상
          멈췄고, IEA의 4월 보고서는 2026년 글로벌 수요 전망을 한 달 만에 +640 kb/d 에서 −80 kb/d
          로 뒤집었다. UAE는 OPEC을 떠나기로 했다. 짧게 정리한다 — 2분기 유가를 결정할 다섯 가지
          변수.
        </p>

        <h2>1. 호르무즈는 여전히 닫혀 있다</h2>
        <p>
          글로벌 에너지 소비의 약 20%가 통과하는 길목이다. 4월 22일 CNBC 보도 이후 “휴전 연장
          가능성” 이라는 말이 시장에 흘러나오긴 했지만, 실제 통과량은 사실상 0에 머물러 있다.
          Brent가 $103/b 평균이었던 3월에서 4월 말 $110선까지 올라온 가장 큰 단일 변수다.
        </p>
        <p>
          IEA가 집계한 3월 글로벌 공급은 −10.1 mb/d, 총 97 mb/d 까지 떨어졌다.{" "}
          <em>역사상 최대 규모의 단발 공급 차질</em> 이다. 휴전이 실제로 발효되고 통항이 단계적으로
          재개된다면 시장은 빠르게 되돌아갈 수 있다. 그게 EIA의 STEO 가 가정한 “2분기 피크 → 3분기
          이후 완만한 하락” 시나리오의 출발점이다.
        </p>

        <h2>2. EIA: 2Q 피크 $115 → 4Q $88</h2>
        <p>
          미국 EIA의 4월 STEO 는 분기별 Brent 평균을 다음과 같이 본다.
        </p>

        <figure>
          <BrentForecastChart />
          <figcaption>
            출처: U.S. EIA, Short-Term Energy Outlook (April 2026). 점선은 2026년 연평균 $96 가정.
            막대는 EIA 분기 평균, 라인은 추세.
          </figcaption>
        </figure>

        <p>
          핵심은 “리스크 프리미엄” 이다. EIA 자체적으로 “Mid-East 분쟁의 지속 기간과 그로 인한
          공급 차질의 폭이 가격 경로를 결정” 한다고 명시했다. 즉 위 곡선은 <strong>분쟁이
          단계적으로 해소된다는 가정</strong> 위에 그려진 그림이다. 휴전이 깨지거나 호르무즈가
          더 길게 막히면 2Q 피크는 $115 가 아니라 그 위가 된다.
        </p>

        <h2>3. 골드만은 위를 올려잡았다</h2>
        <p>
          시장 측에서는 이미 가격을 더 올려 잡고 있다. Goldman Sachs 는 2026년 4분기 Brent 전망을
          $80에서 $90으로, WTI 를 $75에서 $83으로 상향했다.
        </p>
        <p className="pull">
          정유사들은 “리스크 프리미엄을 빼고 진짜 펀더멘털을 보면 $80 대” 라고 말한다.
          하지만 그 프리미엄은 시장이 사라졌다고 인정해 줘야 사라진다.
        </p>

        <h2>4. UAE 가 OPEC 을 떠난다</h2>
        <p>
          NPR 보도에 따르면 UAE 는 5월 1일자로 OPEC 탈퇴를 발표했다. 공식 사유는{" "}
          <em>“UAE 의 장기적인 전략·경제적 비전과 변화하는 에너지 프로파일” </em> 이다. 행간을
          읽으면 — UAE는 한동안 자기 쿼터에 불만이었고, 회원 국가 중 spare capacity 가
          비정상적으로 큰 편이었다. 카르텔에서 빠져나오면 그만큼 더 펌프할 수 있다.
        </p>
        <p>
          단기적으로 UAE 의 추가 생산은 호르무즈 차질을 일부 상쇄한다. 다만 OPEC+ 라는 가격 조정
          기구의 결속력이 약해진다는 신호이기도 하다. JPMorgan 은 이미 “2026년 안에 OPEC+가 추가
          감산을 못 하면 가격이 $40 까지 미끄러질 위험” 을 경고한 바 있다 — 휴전이 실제로 와서
          공급이 회복될 때 따라붙는 시나리오다.
        </p>

        <h2>5. 그런데 IEA 는 수요를 깎고 있다</h2>
        <p>
          공급만 보면 “피크 후 하락” 이지만, 수요 쪽은 한 달마다 그림이 바뀌고 있다. IEA 의 월간
          Oil Market Report 가 본 2026년 글로벌 수요 증가:
        </p>

        <figure>
          <IeaDemandChart />
          <figcaption>
            출처: IEA Oil Market Report (각 월호). 1월 +930 → 4월 −80 kb/d. 한 분기 만에
            1,000 kb/d 가까이 깎였다.
          </figcaption>
        </figure>

        <p>
          IEA 가 4월에 수요를 마이너스로 돌린 이유는 단순하다 — 가격이 $110 으로 가면 OECD 산업
          수요가 다시 줄고, 운임·연료유가 비싸지면 글로벌 무역 자체가 둔화한다. 1Q 의 “oversupply
          5 mb/d” 시나리오와, 4Q 의 “수요까지 마이너스” 시나리오는 같은 해의 양 끝이다.
        </p>

        <h2>그래서, 어디로 가는가</h2>
        <p>
          단기 (2분기) — 호르무즈가 핵심. 휴전이 발효되고 통항이 재개되면 $90 후반대로 빠르게
          내려간다. 휴전이 깨지면 EIA STEO 의 $115 천장은 의미가 없어지고, 시나리오는 $130~$150
          시뮬레이션 영역으로 들어간다.
        </p>
        <p>
          중기 (4분기) — 시장의 컨센서스는 “리스크 프리미엄이 빠지면서 $85~$95.” 골드만 $90,
          EIA $88, 시장 선물 곡선도 비슷하다. 이 컨센서스가 깨지는 변수는 두 개다 — UAE 발 OPEC+
          결속 약화로 추가 감산이 못 나오거나 (→ 더 낮게), 새로운 지정학 사건이 발생하거나 (→
          더 높게).
        </p>
        <p>
          장기 (2027) — IEA·EIA·OPEC 모두 “전기차·재생에너지 침투로 수요 증가율 둔화” 라는
          기본 가정은 유지한다. EIA STEO 의 2027 평균 $76 가 그 그림이다. 다만 이건 평시
          가정이다.
        </p>

        <p>
          요약 — <strong>2분기 가격은 호르무즈 한 변수에 모여 있고, 4분기 컨센서스는 $85~$95,
          그 사이의 길은 OPEC+ 결속과 IEA 수요 수정 폭이 결정한다.</strong> 매주 들여다볼 가치가
          있는 숫자는 셋이다 — 호르무즈 통항량, EIA STEO 월간 업데이트, IEA OMR.
        </p>

        <hr className="my-12 border-rule" />

        <p className="text-sm text-ink-3">
          이 글은 매주 한두 편 정리되는 <Link href="/" className="underline">Barrel</Link>{" "}
          의 시장 노트입니다. 출처는 EIA Short-Term Energy Outlook (2026-04), IEA Oil Market
          Report (2026-04), OPEC.org 보도자료, NPR/CNBC/Fortune 의 4월 마지막 주 보도.
        </p>
      </div>
    </article>
  );
}
