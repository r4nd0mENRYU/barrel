"use client";

import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ReferenceDot,
} from "recharts";

// IEA monthly Oil Market Report — 2026 demand growth forecast revisions (kb/d)
const data = [
  { month: "1월", growth: 930 },
  { month: "2월", growth: 850 },
  { month: "3월", growth: 640 },
  { month: "4월", growth: -80 },
];

type TooltipProps = {
  active?: boolean;
  payload?: Array<{ value?: number }>;
  label?: string;
};

function Tip({ active, payload, label }: TooltipProps) {
  if (!active || !payload || payload.length === 0) return null;
  const v = payload[0]?.value ?? 0;
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
        IEA · 2026년 {label} 보고서
      </div>
      <div
        style={{
          fontVariantNumeric: "tabular-nums",
          fontWeight: 600,
          color: v < 0 ? "#6e2a1f" : "#0e0d0a",
        }}
      >
        2026 수요 증가 전망 {v > 0 ? "+" : ""}
        {v} kb/d
      </div>
    </div>
  );
}

export function IeaDemandChart() {
  return (
    <div className="h-64 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 14, right: 14, left: 0, bottom: 0 }}>
          <CartesianGrid stroke="#ebe5d2" strokeDasharray="2 4" vertical={false} />
          <XAxis
            dataKey="month"
            tick={{ fontSize: 12, fill: "#5d594c" }}
            stroke="#b6ad93"
            tickLine={false}
            axisLine={{ stroke: "#d8d2bf" }}
          />
          <YAxis
            domain={[-200, 1000]}
            tick={{ fontSize: 11, fill: "#5d594c" }}
            stroke="#b6ad93"
            tickLine={false}
            axisLine={false}
            unit="k"
            width={50}
          />
          <Tooltip content={<Tip />} cursor={{ stroke: "#b6ad93" }} />
          <Line
            type="monotone"
            dataKey="growth"
            stroke="#6e2a1f"
            strokeWidth={1.6}
            dot={{ r: 4, fill: "#6e2a1f" }}
            activeDot={{ r: 6 }}
            isAnimationActive={false}
          />
          <ReferenceDot x="4월" y={-80} r={6} fill="#6e2a1f" stroke="#fafaf6" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
