"use client";

import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ReferenceLine,
  Legend,
} from "recharts";

// April 2026 daily Brent / WTI front-month settlements (rounded to nearest dollar
// from public Fortune / CNBC / Bloomberg snapshots cited in body sources).
// 4/29 close: Brent $118.03, WTI $106.88 — exact from CNBC.
const data = [
  { d: "4/14", brent: 103, wti: 96 },
  { d: "4/15", brent: 105, wti: 97 },
  { d: "4/16", brent: 107, wti: 98 },
  { d: "4/17", brent: 108, wti: 98 },
  { d: "4/21", brent: 108, wti: 98 },
  { d: "4/22", brent: 109, wti: 99 },
  { d: "4/23", brent: 110, wti: 100 },
  { d: "4/24", brent: 110, wti: 100 },
  { d: "4/27", brent: 110, wti: 100 },
  { d: "4/28", brent: 111, wti: 100 },
  { d: "4/29", brent: 118, wti: 107 },
];

type TooltipProps = {
  active?: boolean;
  payload?: Array<{ value?: number; dataKey?: string; color?: string; name?: string }>;
  label?: string;
};

function Tip({ active, payload, label }: TooltipProps) {
  if (!active || !payload || payload.length === 0) return null;
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
        minWidth: 130,
      }}
    >
      <div style={{ color: "#5d594c", fontSize: 11, marginBottom: 6 }}>{label}</div>
      {payload.map((p) => (
        <div
          key={p.dataKey}
          style={{
            display: "flex",
            justifyContent: "space-between",
            gap: 12,
            paddingTop: 2,
            paddingBottom: 2,
          }}
        >
          <span style={{ color: "#3a382f" }}>
            <span
              style={{
                width: 8,
                height: 8,
                borderRadius: 99,
                background: p.color,
                display: "inline-block",
                marginRight: 6,
              }}
            />
            {p.name}
          </span>
          <span style={{ fontVariantNumeric: "tabular-nums", fontWeight: 600 }}>${p.value}</span>
        </div>
      ))}
    </div>
  );
}

export function OilAprilChart() {
  return (
    <div className="h-72 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 14, right: 16, left: 0, bottom: 0 }}>
          <CartesianGrid stroke="#ebe5d2" strokeDasharray="2 4" vertical={false} />
          <XAxis
            dataKey="d"
            tick={{ fontSize: 11, fill: "#5d594c" }}
            stroke="#b6ad93"
            tickLine={false}
            axisLine={{ stroke: "#d8d2bf" }}
            interval={0}
          />
          <YAxis
            domain={[90, 125]}
            ticks={[95, 105, 115, 125]}
            tick={{ fontSize: 11, fill: "#5d594c" }}
            stroke="#b6ad93"
            tickLine={false}
            axisLine={false}
            unit="$"
            width={50}
          />
          <Tooltip content={<Tip />} cursor={{ stroke: "#b6ad93", strokeWidth: 1 }} />
          <Legend
            iconType="circle"
            iconSize={8}
            wrapperStyle={{ fontSize: 12, paddingTop: 6 }}
          />
          <ReferenceLine
            x="4/29"
            stroke="#b78b1f"
            strokeDasharray="3 3"
            label={{
              value: "Trump 봉쇄 발언",
              position: "top",
              fill: "#5d594c",
              fontSize: 10,
              offset: 6,
            }}
          />
          <Line
            type="monotone"
            dataKey="brent"
            name="Brent"
            stroke="#6e2a1f"
            strokeWidth={1.8}
            dot={{ r: 3, fill: "#6e2a1f" }}
            activeDot={{ r: 5 }}
            isAnimationActive={false}
          />
          <Line
            type="monotone"
            dataKey="wti"
            name="WTI"
            stroke="#0e0d0a"
            strokeWidth={1.4}
            strokeDasharray="4 3"
            dot={{ r: 3, fill: "#0e0d0a" }}
            activeDot={{ r: 5 }}
            isAnimationActive={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
