import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getPost } from "@/lib/posts";
import { MayWeek1Chart } from "@/components/may-week1-chart";

const POST_SLUG = "diplomacy-returns-may-week-1";

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
          지난주 글의 결론은 “호르무즈 한 변수에 가격이 모여 있다”였다. 그 결론은 6일 만에 두
          개의 변수로 갈라졌다 — 외교 채널이 다시 켜졌고, OPEC+ 가 UAE 없이 처음 회의를 했다.
          5월 첫 주 시장은 정치 헤드라인에 따라 박스권 6% 를 그리며 새 균형을 찾는 중이다. 네
          개의 굵직한 사건과, 그 사이에 가격이 보낸 신호를 정리한다.
        </p>

        <h2>1. 5/1 — UAE 의 OPEC/OPEC+ 탈퇴 발효</h2>
        <p>
          4월 28일 발표된 결정이 금요일에 정식으로 발효됐다. UAE 는 1971년 가입 이후 약 59년
          만에 카르텔을 떠났다. 단순한 기관 변경이 아니다 — UAE 는 OPEC+ 4번째 큰 생산국이고,{" "}
          <strong>spare capacity 가 그룹 평균 대비 두드러지게 높다.</strong> 즉 가격 조정 기구
          입장에서 “쿼터를 이행할 수 있는 회원” 보다 “필요할 때 펌프를 더 열 수 있는 lever” 였다.
          그 lever 가 그룹 외부로 나갔다.
        </p>
        <p>
          UAE 는 2027년 5 mb/d 생산 capacity 를 목표로 한다고 공개적으로 밝혔다. 이는 현재
          그룹 쿼터(약 3.2 mb/d 추정) 의 1.5배 수준이고, OPEC 안에서는 이행 불가능한 야망이다.
          탈퇴는 이 야망을 위한 정상화 절차다.
        </p>
        <p>
          시장의 첫 반응 — Brent 가 그날 $115 → $116 으로 1% 상승. <em>크지 않다.</em> 시장은
          UAE 탈퇴 자체를 4월 28일에 이미 가격에 흡수했고, 5/1 의 “발효” 는 형식적 이벤트로
          처리했다. 다만 이 이벤트의 진짜 영향은 다음 주 토요일 OPEC+ 회의에서 비로소 본격적으로
          가격에 들어왔다 (아래 4번 항목).
        </p>

        <h2>2. 5/3 — Iran 의 14-포인트 제안</h2>
        <p>
          Al Jazeera 가 5월 3일 가장 먼저 정리해 보도한 이란 측 협상안의 골자는 다음과 같다.
        </p>
        <ul>
          <li>
            <strong>호르무즈 즉시 개방.</strong> 이란이 봉쇄 해제, 미국이 해상 봉쇄 종료. 외국
            VLCC 통항 정상화.
          </li>
          <li>
            <strong>이스라엘·미국의 재공격 금지 보장.</strong> 휴전이 “일시적” 이 아니라 구속력
            있는 합의가 되도록 안전 보장 요구.
          </li>
          <li>
            <strong>핵 협상은 별도 트랙으로 분리.</strong> 호르무즈·봉쇄 합의가 먼저, 핵 농축
            한도 협상은 그 다음에 본격화. 제재 일부 해제와 패키지 가능.
          </li>
        </ul>
        <p className="pull">
          호르무즈와 핵을 분리한다 — 이게 14-포인트 제안의 한 줄 요약이고, 동시에 트럼프가
          거부한 정확히 그 한 줄이다.
        </p>
        <p>
          이란이 이 카드를 꺼낸 시점도 의미가 있다. UAE 탈퇴(5/1)와 OPEC+ 회의(5/4) 사이에
          제안을 띄움으로써, OPEC+ 의 증산 결정이 “이미 외교 트랙이 진행 중” 이라는 무드 위에서
          내려지도록 만들었다. 협상 카드의 타이밍 자체가 협상이다.
        </p>

        <h2>3. 트럼프의 응답 — 분리 거부, 봉쇄가 leverage</h2>
        <p>
          5/2 트럼프는 새 제안을 “검토 중” 이라고 말했지만, 5/3 “핵 무기 절대 안 됨에 동의하지
          않으면 deal 은 없다” 며 분리 전략을 거부했다. 봉쇄에 대한 인터뷰 발언도 명료했다 —{" "}
          <em>“봉쇄가 폭격보다 효과적이다.”</em> 즉 봉쇄 자체가 협상 leverage 이고, 그 카드를
          포기하면서 별도 트랙으로 가는 건 미국 측 입장에서는 우위를 버리는 것이다.
        </p>
        <p>
          한편 US CENTCOM 은 “short and powerful” 공습 시나리오를 준비해 두었다는 보도(Reuters
          5/3)가 나왔다. 인프라 타격 위주의 단발 공습이라는 것. 이란 측 군 고위 관계자도 “충돌
          재개 likely” 라고 말했다. 즉 외교 트랙과 군사 트랙이 동시에 움직이고 있다 — 시장은 두
          트랙 중 어느 쪽이 먼저 임계에 도달할지 매일 다시 가격을 매긴다.
        </p>

        <h2>4. 5/4 — 첫 post-UAE OPEC+ 회의</h2>
        <p>
          UAE 가 빠진 후 처음 열린 OPEC+ 회의는 화려하지 않았다. 7개국 (사우디, 러시아, 이라크,
          쿠웨이트, 오만, 알제리, 카자흐) 이 일요일 온라인으로 모였고, 시장 컨센서스는{" "}
          <strong>+188 kb/d 증산</strong> 이었다 (Global Risk Management, Arne Lohmann
          Rasmussen 분석 인용). 이 숫자의 의미는 두 가지다.
        </p>
        <ul>
          <li>
            <strong>UAE 가 빠진 quota 공백을 메꾸지 않는다.</strong> UAE 의 직전 쿼터는 약 3.2
            mb/d. 188 kb/d 는 그 6% 수준에 불과하다. 즉 그룹은 UAE 의 빈자리를 인정하고, 자신들의
            점진적 증산 스케줄을 그대로 가져간다는 신호다.
          </li>
          <li>
            <strong>가격 안정 의지의 표명.</strong> Brent $110대에서 더 큰 증산은 가격 추가
            하방을 만들었을 텐데, 188 kb/d 는 “충격을 주지 않으면서 그룹의 지속 의지를 보이는”
            정도의 수치다. 표면적으로는 UAE 탈퇴 이후의 결속 신호.
          </li>
        </ul>
        <p>
          그러나 그 결속의 진짜 시험은 호르무즈가 정상화된 이후에 온다. 봉쇄가 풀리고 글로벌 공급이
          빠르게 회복되는 시점, OPEC+ 가 추가 감산을 못 하면 가격은 펀더멘털 기준 $80–85 로
          빠르게 미끄러진다. JPMorgan 의 1Q 경고 시나리오가 그것이다 — UAE 가 spare capacity 를
          자유롭게 풀고, 그룹은 점진 증산만 하고, 호르무즈가 열리면, 결과는 oversupply.
        </p>

        <h2>가격이 보낸 신호 — 6일 박스권 6%</h2>

        <figure>
          <MayWeek1Chart />
          <figcaption>
            4/29~5/4 일별 Brent / WTI 6 월물 settle. 4 가지 이벤트 (Trump 봉쇄 발언 / UAE 탈퇴
            발효 / Iran 14-포인트 / OPEC+ 회의) 를 ReferenceLine 으로 마킹. 출처: Fortune, CNBC,
            Bloomberg energy, Reuters 일별 보도. 5/2 intraday low $101 은 차트 일별 close 에는
            반영되지 않음.
          </figcaption>
        </figure>

        <p>
          박스권의 폭은 약 6% — Brent 기준 $118 (4/29) → $110.5 (5/2 close) → $112 (5/4 흐름).
          한 달 IV 51% 환경에서 6일 변동성으로 환산하면 약 8% 가 1-σ 무브이고, 우리가 본 6% 는
          그 안이다. <em>4/29 점프가 4-σ 의 단발 무브였다면, 5월 첫 주는 평균 회귀의 한 주였다.</em>
        </p>
        <p>
          그러나 평균 회귀가 곧 안정은 아니다. 박스권 안에서도 시장은 매일 정치 헤드라인에 따라
          ±2~3% 를 움직였고, 옵션 데스크가 본 IV-RV 스프레드는 14 → 11 까지 더 좁혀졌다 (Saxo
          5/3 코멘터리). vol risk premium 은 여전히 음수권. 시장이 이 상태를 어떻게 해석하는지는
          하나로 정리된다 — <strong>“호르무즈가 어떻게 끝나는지 한 번 확인하고 다시 가격을 매기겠다”</strong>.
        </p>

        <h2>다음 봐야 할 셋</h2>
        <ol>
          <li>
            <strong>Trump 의 5/4 ~ 5/7 발언</strong> — 14-포인트 거부 직후의 톤이 바뀌는지. 군사
            트랙으로의 escalation 시그널이 들어오면 vol re-pricing.
          </li>
          <li>
            <strong>EIA Weekly Petroleum Status (5/6 발표)</strong> — 미국 수출 6 mb/d 가
            유지되는지, Cushing 빌드/드로우. 글로벌 짧음을 미국 수출이 얼마나 더 메꿀 수 있는지의
            가장 명확한 지표.
          </li>
          <li>
            <strong>OPEC+ 7개국 합의문 세부</strong> — 188 kb/d 증산 이외에 “자발적 추가 감산
            (voluntary cuts)” 이 어떤 형태로 명시되는지. 단순 quota 수치보다 합의문의 결속 언어가
            그룹 지속력을 결정.
          </li>
        </ol>

        <hr className="my-12 border-rule" />

        <p className="text-sm text-ink-3">
          출처: Axios (Trump 14-포인트 거부, 2026-04-29), CNBC (Trump 새 Iran 제안 검토, 2026-05-02 /
          이란 미국 응답, 2026-05-03), Al Jazeera (Iran 14-포인트 제안 분석, 2026-05-03 / 호르무즈
          ‘안전’ 시점, 2026-04-28), Free Malaysia Today / BSS News (post-UAE OPEC+ 회의 보도,
          2026-05-03), CNBC (UAE OPEC 탈퇴, 2026-04-28), NPR (UAE OPEC 탈퇴, 2026-04-28),
          Fortune (4월 30일 / 5월 1일 가격), FX Leaders (5/1 WTI Hormuz supply shock), Reuters /
          Saxo / Trading Economics (옵션 vol, IV-RV 스프레드 코멘터리). 본문의 188 kb/d 증산
          예측은 Global Risk Management 분석가 코멘트 인용이며, 실제 합의 결과와 다를 수 있다.
        </p>
      </div>
    </article>
  );
}
