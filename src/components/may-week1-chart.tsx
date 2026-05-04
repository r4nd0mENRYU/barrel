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

// April 29 → May 4 daily front-month settles. 5/2 intraday low $101 noted in body.
// Sources: Fortune (4/29 $118.03 / 5/1 $116.10), CNBC (5/2 Trump blockade reaffirm,
// WTI back above $105), Bloomberg energy (5/2 close), Reuters / Trading Economics.
const data = [
  { d: "4/29 수", brent: 118.0, wti: 106.9 },
  { d: "4/30 목", brent: 115.7, wti: 105.4 },
  { d: "5/1 금", brent: 116.1, wti: 106.0 },
  // weekend — markets closed; show flat line break by repeating last value
  { d: "5/2 금후", brent: 110.5, wti: 101.5 },
  { d: "5/3 일", brent: 110.5, wti: 101.5 },
  { d: "5/4 월", brent: 112.0, wti: 103.0 },
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
          <span style={{ fontVariantNumeric: "tabular-nums", fontWeight: 600 }}>
            ${p.value?.toFixed(1)}
          </span>
        </div>
      ))}
    </div>
  );
}

export function MayWeek1Chart() {
  return (
    <div className="h-80 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 30, right: 16, left: 0, bottom: 0 }}>
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
            domain={[95, 125]}
            ticks={[100, 110, 120]}
            tick={{ fontSize: 11, fill: "#5d594c" }}
            stroke="#b6ad93"
            tickLine={false}
            axisLine={false}
            unit="$"
            width={50}
          />
          <Tooltip content={<Tip />} cursor={{ stroke: "#b6ad93", strokeWidth: 1 }} />
          <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: 12, paddingTop: 6 }} />
          <ReferenceLine
            x="4/29 수"
            stroke="#b78b1f"
            strokeDasharray="3 3"
            label={{ value: "Trump 봉쇄 발언", position: "top", fill: "#5d594c", fontSize: 10, offset: 6 }}
          />
          <ReferenceLine
            x="5/1 금"
            stroke="#295e3a"
            strokeDasharray="3 3"
            label={{ value: "UAE OPEC 탈퇴 발효", position: "top", fill: "#5d594c", fontSize: 10, offset: 6 }}
          />
          <ReferenceLine
            x="5/3 일"
            stroke="#0f3a5f"
            strokeDasharray="3 3"
            label={{ value: "Iran 14-포인트", position: "top", fill: "#5d594c", fontSize: 10, offset: 6 }}
          />
          <ReferenceLine
            x="5/4 월"
            stroke="#6e2a1f"
            strokeDasharray="3 3"
            label={{ value: "OPEC+ 회의", position: "top", fill: "#5d594c", fontSize: 10, offset: 6 }}
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
