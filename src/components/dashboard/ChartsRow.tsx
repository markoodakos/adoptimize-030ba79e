import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const spendData = [
  { day: "Jan 1", facebook: 2100, instagram: 1400 },
  { day: "Jan 2", facebook: 2400, instagram: 1600 },
  { day: "Jan 3", facebook: 1900, instagram: 1300 },
  { day: "Jan 4", facebook: 2800, instagram: 1750 },
  { day: "Jan 5", facebook: 3100, instagram: 1900 },
  { day: "Jan 6", facebook: 2600, instagram: 1550 },
  { day: "Jan 7", facebook: 2200, instagram: 1450 },
  { day: "Jan 8", facebook: 2500, instagram: 1600 },
  { day: "Jan 9", facebook: 2900, instagram: 1800 },
  { day: "Jan 10", facebook: 3200, instagram: 2100 },
  { day: "Jan 11", facebook: 2700, instagram: 1700 },
  { day: "Jan 12", facebook: 2300, instagram: 1500 },
  { day: "Jan 13", facebook: 1900, instagram: 1250 },
  { day: "Jan 14", facebook: 2100, instagram: 1400 },
  { day: "Jan 15", facebook: 2600, instagram: 1650 },
  { day: "Jan 16", facebook: 2800, instagram: 1750 },
  { day: "Jan 17", facebook: 3000, instagram: 1950 },
  { day: "Jan 18", facebook: 2500, instagram: 1600 },
  { day: "Jan 19", facebook: 2200, instagram: 1450 },
  { day: "Jan 20", facebook: 1800, instagram: 1200 },
  { day: "Jan 21", facebook: 2000, instagram: 1350 },
  { day: "Jan 22", facebook: 2400, instagram: 1550 },
  { day: "Jan 23", facebook: 2700, instagram: 1700 },
  { day: "Jan 24", facebook: 3100, instagram: 2000 },
  { day: "Jan 25", facebook: 2900, instagram: 1850 },
  { day: "Jan 26", facebook: 2600, instagram: 1650 },
  { day: "Jan 27", facebook: 2300, instagram: 1500 },
  { day: "Jan 28", facebook: 2000, instagram: 1350 },
  { day: "Jan 29", facebook: 2400, instagram: 1600 },
  { day: "Jan 30", facebook: 2800, instagram: 1800 },
];

const ctrData = [
  { week: "Week 1", facebook: 4.2, instagram: 3.8, youtube: 2.1 },
  { week: "Week 2", facebook: 4.8, instagram: 4.1, youtube: 2.4 },
  { week: "Week 3", facebook: 5.2, instagram: 4.6, youtube: 2.8 },
  { week: "Week 4", facebook: 5.8, instagram: 5.1, youtube: 3.2 },
];

const SpendTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-lg border border-border bg-card px-3 py-2 shadow-md">
      <p className="text-xs font-medium text-foreground mb-1">{label}</p>
      {payload.map((p: any) => (
        <p key={p.name} className="text-xs text-muted-foreground">
          {p.name}: ${p.value.toLocaleString()}
        </p>
      ))}
    </div>
  );
};

const CTRTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-lg border border-border bg-card px-3 py-2 shadow-md">
      <p className="text-xs font-medium text-foreground mb-1">{label}</p>
      {payload.map((p: any) => (
        <p key={p.name} className="text-xs text-muted-foreground">
          {p.name}: {p.value}%
        </p>
      ))}
    </div>
  );
};

const ChartsRow = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full">
      {/* Ad Spend Over Time */}
      <div className="bg-card dark:bg-card rounded-xl p-6 border border-border">
        <div className="mb-4">
          <h3 className="text-sm font-semibold text-foreground">Ad Spend Over Time</h3>
          <p className="text-xs text-muted-foreground mt-0.5">Last 30 days</p>
        </div>
        <ResponsiveContainer width="100%" height={220}>
          <AreaChart data={spendData}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
            <XAxis
              dataKey="day"
              tickFormatter={(value, index) => (index % 5 === 0 ? value : "")}
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }}
            />
            <YAxis
              tickFormatter={(v) => `$${v}`}
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }}
            />
            <Tooltip content={<SpendTooltip />} />
            <Area
              type="monotone"
              dataKey="facebook"
              stroke="hsl(var(--color-teal))"
              fill="hsl(var(--color-teal))"
              fillOpacity={0.12}
              strokeWidth={2}
            />
            <Area
              type="monotone"
              dataKey="instagram"
              stroke="hsl(74, 60%, 55%)"
              fill="hsl(var(--color-lime))"
              fillOpacity={0.12}
              strokeWidth={2}
            />
            <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: 12, marginTop: 12 }} />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* CTR by Platform */}
      <div className="bg-card dark:bg-card rounded-xl p-6 border border-border">
        <div className="mb-4">
          <h3 className="text-sm font-semibold text-foreground">CTR by Platform</h3>
          <p className="text-xs text-muted-foreground mt-0.5">This month</p>
        </div>
        <ResponsiveContainer width="100%" height={220}>
          <BarChart data={ctrData} barCategoryGap="28%" barGap={3}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
            <XAxis
              dataKey="week"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }}
            />
            <YAxis
              tickFormatter={(v) => `${v}%`}
              domain={[0, 6]}
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }}
            />
            <Tooltip content={<CTRTooltip />} />
            <Bar dataKey="facebook" fill="hsl(var(--color-teal))" radius={[4, 4, 0, 0]} />
            <Bar dataKey="instagram" fill="hsl(74, 60%, 55%)" radius={[4, 4, 0, 0]} />
            <Bar dataKey="youtube" fill="#94a3b8" radius={[4, 4, 0, 0]} />
            <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: 12, marginTop: 12 }} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ChartsRow;
