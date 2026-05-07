import type { Metadata } from "next";
import { Newsreader } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const newsreader = Newsreader({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-newsreader",
  axes: ["opsz"],
  style: ["normal", "italic"],
});

const SITE = {
  name: "Barrel",
  tagline: "원유와 에너지 시장의 짧은 노트",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://barrel-alpha.vercel.app",
  // AdRecover Korea SDK — site_id_token issued by /dashboard/sites/new.
  adrecoverSiteId: process.env.NEXT_PUBLIC_ADRECOVER_SITE_ID || "",
  // First-party proxy directory (matches ADRECOVER_PROXY_PATH on the server route).
  // When set, the SDK script is served from a publisher-local path that adblock
  // filter lists cannot generically match.
  adrecoverProxyPath: process.env.NEXT_PUBLIC_ADRECOVER_PROXY_PATH || "",
  // Search engine ownership verification — paste codes from each console.
  googleVerification: process.env.GOOGLE_SITE_VERIFICATION || "",
  naverVerification: process.env.NAVER_SITE_VERIFICATION || "",
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `Barrel — ${SITE.tagline}`,
    template: "%s — Barrel",
  },
  description:
    "글로벌 원유 시장과 에너지 가격 동향을 짧은 노트로 정리합니다. WTI·Brent·OPEC·EIA·IEA 데이터 기반 한국어 분석.",
  alternates: {
    canonical: SITE.url,
    types: { "application/rss+xml": [{ url: `${SITE.url}/feed.xml`, title: "Barrel RSS" }] },
  },
  openGraph: {
    type: "website",
    locale: "ko_KR",
    url: SITE.url,
    siteName: "Barrel",
    title: "Barrel — 원유와 에너지 시장의 짧은 노트",
    description: "글로벌 원유 시장과 에너지 가격 동향을 짧은 노트로 정리합니다.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Barrel — 원유와 에너지 시장의 짧은 노트",
    description: "글로벌 원유 시장과 에너지 가격 동향을 짧은 노트로 정리합니다.",
  },
  robots: { index: true, follow: true },
  ...(SITE.googleVerification || SITE.naverVerification
    ? {
        verification: {
          ...(SITE.googleVerification ? { google: SITE.googleVerification } : {}),
          ...(SITE.naverVerification ? { other: { "naver-site-verification": SITE.naverVerification } } : {}),
        },
      }
    : {}),
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Barrel",
  url: SITE.url,
  description: SITE.tagline,
  inLanguage: "ko-KR",
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Barrel",
  url: SITE.url,
  description: SITE.tagline,
  inLanguage: "ko-KR",
  publisher: { "@type": "Organization", name: "Barrel" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko" className={newsreader.variable}>
      <head>
        {SITE.adrecoverSiteId ? (
          // First-party path when proxy is configured — survives adblock filter
          // lists that target the AdRecover origin. Falls back to direct embed
          // if proxy path env is missing.
          // eslint-disable-next-line @next/next/no-sync-scripts
          <script
            async
            src={
              SITE.adrecoverProxyPath
                ? `/${SITE.adrecoverProxyPath}/s.js`
                : "https://adrecover-korea.vercel.app/v1/shield.js"
            }
            data-site-id={SITE.adrecoverSiteId}
          />
        ) : null}
        <link rel="alternate" type="application/rss+xml" title="Barrel RSS" href="/feed.xml" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
      </head>
      <body className="min-h-screen antialiased">
        <SiteHeader />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}

function SiteHeader() {
  return (
    <header className="border-b border-rule">
      <div className="mx-auto flex max-w-3xl items-center justify-between px-6 py-5">
        <Link href="/" className="serif text-xl text-ink">
          Barrel
        </Link>
        <nav className="flex items-center gap-5 text-sm text-ink-3">
          <Link href="/" className="hover:text-ink">최신 글</Link>
          <Link href="/about" className="hover:text-ink">소개</Link>
        </nav>
      </div>
    </header>
  );
}

function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-rule">
      <div className="mx-auto flex max-w-3xl flex-col gap-3 px-6 py-10 text-xs text-ink-3 sm:flex-row sm:items-center sm:justify-between">
        <span>
          <span className="serif text-base text-ink">Barrel</span> · {SITE.tagline}
        </span>
        <span>© {new Date().getFullYear()} Barrel</span>
      </div>
    </footer>
  );
}
