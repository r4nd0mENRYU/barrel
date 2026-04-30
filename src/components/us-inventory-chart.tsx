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
  Cell,
} from "recharts";

// EIA Weekly Petroleum Status Report — total commercial crude stocks (millions of barrels).
// 5-year avg approximated from "464.7 = 2% above 5-year average" wording (≈ 455.6M).
const data = [
  { week: "3/27", stocks: 461.6, avg: 455 },
  { week: "4/03", stocks: 464.7, avg: 455 },
  { week: "4/10", stocks: 463.8, avg: 455 },
  { week: "4/17", stocks: 465.7, avg: 455 },
];

type TooltipProps = {
  active?: boolean;
  payload?: Array<{ value?: number; dataKey?: string; name?: string }>;
  label?: string;
};

function Tip({ active, payload, label }: TooltipProps) {
  if (!active || !payload || payload.length === 0) return null;
  const stocks = payload.find((p) => p.dataKey === "stocks")?.value ?? 0;
  const avg = payload.find((p) => p.dataKey === "avg")?.value ?? 0;
  const diff = ((stocks - avg) / avg) * 100;
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
        minWidth: 170,
      }}
    >
      <div style={{ color: "#5d594c", fontSize: 11, marginBottom: 6 }}>
        {label} 마감 주
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", gap: 12 }}>
        <span style={{ color: "#3a382f" }}>총 재고</span>
        <span style={{ fontVariantNumeric: "tabular-nums", fontWeight: 600 }}>
          {stocks.toFixed(1)}M
        </span>
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", gap: 12, color: "#5d594c" }}>
        <span>5년 평균 대비</span>
        <span
          style={{
            fontVariantNumeric: "tabular-nums",
            fontWeight: 600,
            color: diff >= 0 ? "#6e2a1f" : "#295e3a",
          }}
        >
          {diff > 0 ? "+" : ""}
          {diff.toFixed(1)}%
        </span>
      </div>
    </div>
  );
}

export function UsInventoryChart() {
  return (
    <div className="h-64 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <ComposedChart data={data} margin={{ top: 14, right: 14, left: 0, bottom: 0 }}>
          <CartesianGrid stroke="#ebe5d2" strokeDasharray="2 4" vertical={false} />
          <XAxis
            dataKey="week"
            tick={{ fontSize: 12, fill: "#5d594c" }}
            stroke="#b6ad93"
            tickLine={false}
            axisLine={{ stroke: "#d8d2bf" }}
          />
          <YAxis
            domain={[450, 470]}
            ticks={[450, 455, 460, 465, 470]}
            tick={{ fontSize: 11, fill: "#5d594c" }}
            stroke="#b6ad93"
            tickLine={false}
            axisLine={false}
            unit="M"
            width={50}
          />
          <Tooltip content={<Tip />} cursor={{ fill: "rgba(110, 42, 31, 0.06)" }} />
          <Bar dataKey="stocks" radius={[3, 3, 0, 0]} barSize={42} isAnimationActive={false}>
            {data.map((d, i) => (
              <Cell key={i} fill={d.stocks > d.avg ? "#6e2a1f" : "#295e3a"} />
            ))}
          </Bar>
          <Line
            type="monotone"
            dataKey="avg"
            stroke="#0e0d0a"
            strokeDasharray="4 4"
            strokeWidth={1.2}
            dot={false}
            isAnimationActive={false}
          />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
}
