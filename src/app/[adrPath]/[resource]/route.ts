// First-party proxy for AdRecover. Forwards a small set of paths under a
// publisher-specific obfuscated directory to the AdRecover backend, so that
// adblock filter lists (which can blanket-block adrecover-*.vercel.app) cannot
// reach our SDK or beacons. The directory token must match the env so that
// random walkers can't probe.

const ADRECOVER = process.env.ADRECOVER_BACKEND_URL || "https://adrecover-korea.vercel.app";
const PROXY_PATH = process.env.ADRECOVER_PROXY_PATH || "";

type ResourceSpec = {
  upstream: string;
  cacheSec: number;
  method: "GET" | "POST";
};

const RESOURCES: Record<string, ResourceSpec> = {
  "s.js": { upstream: "/v1/shield.js", cacheSec: 3600, method: "GET" },
  c: { upstream: "/api/v1/config", cacheSec: 300, method: "GET" },
  e: { upstream: "/api/v1/events", cacheSec: 0, method: "POST" },
  "b.js": { upstream: "/ads.js", cacheSec: 3600, method: "GET" },
};

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

async function proxy(
  req: Request,
  params: { adrPath: string; resource: string },
  method: "GET" | "POST",
): Promise<Response> {
  if (!PROXY_PATH || params.adrPath !== PROXY_PATH) {
    return new Response("not found", { status: 404 });
  }
  const r = RESOURCES[params.resource];
  if (!r || r.method !== method) {
    return new Response("not found", { status: 404 });
  }

  const url = new URL(ADRECOVER + r.upstream);
  if (method === "GET") {
    new URL(req.url).searchParams.forEach((v, k) => url.searchParams.set(k, v));
  }

  const init: RequestInit = { method, headers: {} };
  if (method === "POST") {
    init.body = await req.text();
    const ct = req.headers.get("content-type") || "text/plain";
    (init.headers as Record<string, string>)["Content-Type"] = ct;
  }

  let upstream: Response;
  try {
    upstream = await fetch(url.toString(), init);
  } catch {
    return new Response("upstream unreachable", { status: 502 });
  }

  const out = new Headers();
  const ct = upstream.headers.get("content-type");
  if (ct) out.set("Content-Type", ct);
  out.set(
    "Cache-Control",
    r.cacheSec > 0
      ? `public, max-age=${r.cacheSec}, s-maxage=${r.cacheSec}`
      : "no-store",
  );

  return new Response(upstream.body, {
    status: upstream.status,
    headers: out,
  });
}

export async function GET(
  req: Request,
  ctx: { params: Promise<{ adrPath: string; resource: string }> },
) {
  return proxy(req, await ctx.params, "GET");
}

export async function POST(
  req: Request,
  ctx: { params: Promise<{ adrPath: string; resource: string }> },
) {
  return proxy(req, await ctx.params, "POST");
}
