"use client";

import {
  ResponsiveContainer,
  ComposedChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ReferenceLine,
} from "recharts";

// EIA April 2026 STEO — Brent quarterly forecast
const data = [
  { q: "1Q26", brent: 81, type: "actual" },
  { q: "2Q26", brent: 114.6, type: "forecast" },
  { q: "3Q26", brent: 99.8, type: "forecast" },
  { q: "4Q26", brent: 88, type: "forecast" },
  { q: "1Q27", brent: 78, type: "forecast" },
  { q: "2Q27", brent: 76, type: "forecast" },
];

type TooltipProps = {
  active?: boolean;
  payload?: Array<{ value?: number; payload?: { type?: string } }>;
  label?: string;
};

function Tip({ active, payload, label }: TooltipProps) {
  if (!active || !payload || payload.length === 0) return null;
  const v = payload[0]?.value;
  const t = payload[0]?.payload?.type;
  return (
    <div
      style={{
        background: "#fff",
        border: "1px solid #d8d2bf",
        borderRadius: 6,
        padding: "8px 10px",
        fontSize: 12,
        color: "#0e0d0a",
        fontFamily: "Pretendard Variable, system-ui, sans-serif",
      }}
    >
      <div style={{ color: "#5d594c", fontSize: 11, marginBottom: 4 }}>
        {label} · {t === "actual" ? "실측" : "EIA 전망"}
      </div>
      <div style={{ fontVariantNumeric: "tabular-nums", fontWeight: 600 }}>
        Brent ${v}/b
      </div>
    </div>
  );
}

export function BrentForecastChart() {
  return (
    <div className="h-72 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <ComposedChart data={data} margin={{ top: 14, right: 14, left: 0, bottom: 0 }}>
          <CartesianGrid stroke="#ebe5d2" strokeDasharray="2 4" vertical={false} />
          <XAxis
            dataKey="q"
            tick={{ fontSize: 12, fill: "#5d594c" }}
            stroke="#b6ad93"
            tickLine={false}
            axisLine={{ stroke: "#d8d2bf" }}
          />
          <YAxis
            domain={[60, 130]}
            tick={{ fontSize: 11, fill: "#5d594c" }}
            stroke="#b6ad93"
            tickLine={false}
            axisLine={false}
            unit="$"
            width={50}
          />
          <Tooltip content={<Tip />} cursor={{ fill: "rgba(110, 42, 31, 0.06)" }} />
          <ReferenceLine y={96} stroke="#b78b1f" strokeDasharray="3 3" />
          <Bar
            dataKey="brent"
            fill="#6e2a1f"
            radius={[3, 3, 0, 0]}
            barSize={36}
            isAnimationActive={false}
          />
          <Line
            type="monotone"
            dataKey="brent"
            stroke="#0e0d0a"
            strokeWidth={1.4}
            dot={{ r: 3, fill: "#0e0d0a" }}
            isAnimationActive={false}
          />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
}
