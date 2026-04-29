# Barrel

원유와 에너지 시장의 짧은 노트.

`Barrel` 은 매주 한두 편씩 짧게 시장 흐름을 정리하는 한국어 에너지 분석 블로그입니다.
Next.js 16 + Tailwind v4 + recharts.

## 로컬 실행

```bash
pnpm install
pnpm dev   # http://localhost:3000
```

## 광고 차단 트래픽 측정

페이지 `<head>` 에 [AdRecover Korea](https://adrecover-korea.vercel.app) SDK 임베드. `data-site-id` 토큰은 `src/app/layout.tsx` 의 `<script>` 태그에서 관리.
