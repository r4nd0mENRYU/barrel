import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "소개",
  description: "Barrel은 글로벌 원유와 에너지 시장을 한국어로 정리하는 짧은 노트입니다.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-16">
      <header className="mb-10">
        <p className="eyebrow mb-3">about</p>
        <h1 className="serif text-4xl text-ink sm:text-5xl">
          긴 보고서 대신,
          <br />
          <em className="text-crude">다섯 줄.</em>
        </h1>
      </header>

      <div className="article-body">
        <p className="lead">
          Barrel 은 글로벌 원유와 에너지 시장의 흐름을 한국어로 짧게 정리하는 노트입니다. 매주
          한두 편, EIA · IEA · OPEC 의 1차 데이터를 직접 읽고 — 긴 분석 대신 가격을 결정하는
          “이번 주의 변수” 다섯 줄을 추립니다.
        </p>

        <h2>왜 만들었나</h2>
        <p>
          국내 에너지 시장 보도는 대부분 외신을 한 번 더 옮긴 형식이라 뉘앙스가 옅어집니다.
          반대로 영문 1차 자료는 분량이 너무 깁니다. <strong>EIA STEO 50쪽 PDF, IEA OMR 60쪽
          PDF, OPEC 보도자료 — 이걸 매달 다 읽고 핵심만 한국어로 옮기는</strong> 노트가 필요했고,
          마침 없어서 직접 시작합니다.
        </p>

        <h2>어떤 글을 쓰는가</h2>
        <ul>
          <li>분기별 가격 전망 정리 (EIA STEO 발간 직후)</li>
          <li>OPEC+ 결정·합의 직후의 시장 영향 분석</li>
          <li>주요 지정학 이벤트 (호르무즈, 베네수엘라, 러시아) 발생 시 즉시 노트</li>
          <li>한국 정유·석유화학 기업 실적과 글로벌 가격의 연결 고리</li>
        </ul>

        <h2>출처</h2>
        <p>
          모든 글은 1차 출처를 명기합니다. 본문 끝에 어느 보고서·보도자료의 어느 표를 참고했는지
          링크합니다. 추정·해석은 본문 안에 명시적으로 표시합니다.
        </p>

        <h2>연락</h2>
        <p>
          제안·반박·교정 환영합니다. 외부 기고나 협업은 별도로 연락 주세요.
        </p>
      </div>
    </main>
  );
}
