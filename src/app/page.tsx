import Link from "next/link";
import { posts } from "@/lib/posts";

export default function HomePage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-16">
      <section className="mb-14">
        <p className="eyebrow mb-3">Issue 01 · 2026년 봄</p>
        <h1 className="serif text-5xl leading-[1.04] text-ink sm:text-6xl">
          원유와 에너지 시장의<br />
          <em className="text-crude">짧은 노트.</em>
        </h1>
        <p className="mt-6 max-w-xl text-base leading-relaxed text-ink-2 sm:text-lg">
          매주 한두 편, EIA · IEA · OPEC 데이터로 글로벌 에너지 시장의 가격 흐름을 정리합니다.
          긴 보고서 대신, 이번 주에 정말 중요한 다섯 줄.
        </p>
      </section>

      <section className="space-y-8 border-t border-rule pt-10">
        <p className="eyebrow">최신 글</p>
        <ul className="space-y-10">
          {posts.map((p) => (
            <li key={p.slug} className="group">
              <Link href={`/posts/${p.slug}`} className="block">
                <div className="mb-2 flex items-center gap-3 text-xs text-ink-3">
                  <time dateTime={p.publishedAt} className="tnum">
                    {p.publishedAt}
                  </time>
                  <span aria-hidden>·</span>
                  <span>{p.readMinutes}분</span>
                </div>
                <h2 className="serif text-3xl leading-tight text-ink transition group-hover:text-crude sm:text-4xl">
                  {p.title}
                </h2>
                <p className="serif mt-2 text-lg italic text-ink-3">{p.dek}</p>
                <p className="mt-4 max-w-xl text-base leading-relaxed text-ink-2">{p.excerpt}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {p.tags.map((t) => (
                    <span
                      key={t}
                      className="rounded-full border border-rule px-2 py-0.5 text-[11px] text-ink-3"
                    >
                      {t}
                    </span>
                  ))}
                </div>
                <span className="mt-5 inline-flex items-center gap-2 text-sm text-ink underline decoration-rule-strong underline-offset-4 transition group-hover:decoration-crude">
                  읽기 →
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-20 rounded-xl border border-rule bg-paper-elevated p-8 text-center">
        <p className="eyebrow mb-3">about</p>
        <h3 className="serif text-2xl text-ink">
          긴 보고서 대신, 다섯 줄.
        </h3>
        <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-ink-2">
          Barrel 은 한 시장 분석가의 개인 노트입니다. EIA STEO, IEA OMR, OPEC 보도자료를
          매주 읽고 한국어로 정리합니다.
        </p>
        <Link
          href="/about"
          className="mt-5 inline-block text-sm text-ink underline decoration-rule-strong underline-offset-4 hover:decoration-crude"
        >
          더 알아보기
        </Link>
      </section>
    </main>
  );
}
