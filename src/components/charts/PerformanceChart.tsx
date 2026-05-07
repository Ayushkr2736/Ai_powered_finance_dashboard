import { useMemo } from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import { Card, CardHeader, CardTitle, Button, ChartSkeleton } from '@/components/ui';
import { useAppStore } from '@/store';
import { usePerformance } from '@/hooks';
import { TIME_RANGES, CHART_COLORS, ANIMATION } from '@/constants';
import type { TimeRange } from '@/types';

const timeRangeSlice: Record<TimeRange, number> = {
  '1D': 1,
  '1W': 7,
  '1M': 30,
  '3M': 90,
  '6M': 180,
  '1Y': 365,
  '5Y': 365,
  ALL: 365,
};

export function PerformanceChart() {
  const { data, isLoading } = usePerformance();
  const { selectedTimeRange, setTimeRange } = useAppStore();

  const filteredData = useMemo(() => {
    if (!data) return [];
    const sliceCount = timeRangeSlice[selectedTimeRange] ?? 365;
    return data.slice(-sliceCount);
  }, [data, selectedTimeRange]);

  if (isLoading) return <ChartSkeleton height={320} />;

  return (
    <Card padding="lg" className="col-span-full xl:col-span-8 overflow-visible">
      <CardHeader>
        <div>
          <CardTitle className="text-headline-sm">Portfolio Analytics</CardTitle>
          <p className="text-label-sm text-text-muted mt-1">Growth vs Benchmark Performance</p>
        </div>
        <div className="flex gap-1 bg-surface-low rounded-xl p-1 border border-edge-subtle">
          {TIME_RANGES.slice(0, 6).map((range) => (
            <Button
              key={range.value}
              variant={selectedTimeRange === range.value ? 'primary' : 'ghost'}
              size="xs"
              onClick={() => setTimeRange(range.value)}
              className={selectedTimeRange === range.value ? 'shadow-sm' : 'text-text-muted'}
            >
              {range.label}
            </Button>
          ))}
        </div>
      </CardHeader>

      <div className="h-[340px] w-full mt-4">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={filteredData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="portfolioGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={CHART_COLORS.primary} stopOpacity={0.2} />
                <stop offset="95%" stopColor={CHART_COLORS.primary} stopOpacity={0} />
              </linearGradient>
              <linearGradient id="benchmarkGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={CHART_COLORS.gold} stopOpacity={0.12} />
                <stop offset="95%" stopColor={CHART_COLORS.gold} stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="4 4" stroke="rgba(255,255,255,0.03)" vertical={false} />
            <XAxis
              dataKey="date"
              tick={{ fill: '#64748b', fontSize: 11, fontWeight: 500 }}
              tickLine={false}
              axisLine={false}
              tickFormatter={(v: string) => {
                const d = new Date(v);
                return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
              }}
              minTickGap={60}
            />
            <YAxis
              tick={{ fill: '#64748b', fontSize: 11, fontWeight: 500 }}
              tickLine={false}
              axisLine={false}
              tickFormatter={(v: number) => `$${(v/1000).toFixed(0)}k`}
            />
            <Tooltip
              contentStyle={{
                background: '#101114',
                border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: '16px',
                padding: '12px 16px',
                boxShadow: '0 12px 48px rgba(0,0,0,0.5)',
              }}
              labelStyle={{ color: '#f1f5f9', fontWeight: 600, marginBottom: 8, fontSize: 12 }}
              itemStyle={{ fontSize: 12, padding: '2px 0' }}
              labelFormatter={(label: string) => {
                const d = new Date(label);
                return d.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
              }}
              cursor={{ stroke: 'rgba(59, 130, 246, 0.2)', strokeWidth: 2 }}
            />
            <Legend
              verticalAlign="top"
              align="right"
              iconType="circle"
              wrapperStyle={{ paddingTop: 0, paddingBottom: 24, fontSize: 11, fontWeight: 600, color: '#94a3b8' }}
            />
            <Area
              type="monotone"
              dataKey="portfolio"
              name="My Portfolio"
              stroke={CHART_COLORS.primary}
              strokeWidth={3}
              fill="url(#portfolioGrad)"
              dot={false}
              activeDot={{ r: 6, fill: CHART_COLORS.primary, stroke: '#07080a', strokeWidth: 3 }}
              animationDuration={1500}
            />
            <Area
              type="monotone"
              dataKey="benchmark"
              name="S&P 500 Index"
              stroke={CHART_COLORS.gold}
              strokeWidth={2}
              fill="url(#benchmarkGrad)"
              dot={false}
              strokeDasharray="6 6"
              activeDot={{ r: 4, fill: CHART_COLORS.gold, stroke: '#07080a', strokeWidth: 2 }}
              animationDuration={1500}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}
