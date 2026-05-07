import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { Card, CardHeader, CardTitle, ChartSkeleton } from '@/components/ui';
import { useAllocation } from '@/hooks';

export function AllocationChart() {
  const { data, isLoading } = useAllocation();

  if (isLoading) return <ChartSkeleton height={320} />;

  return (
    <Card padding="lg" className="xl:col-span-4">
      <CardHeader>
        <CardTitle className="text-headline-sm">Asset Allocation</CardTitle>
      </CardHeader>

      <div className="h-[340px] w-full mt-2">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={75}
              outerRadius={105}
              paddingAngle={6}
              dataKey="value"
              stroke="none"
              animationDuration={1500}
            >
              {data?.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={entry.color} 
                  className="hover:opacity-80 transition-opacity cursor-pointer"
                />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                background: '#101114',
                border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: '16px',
                padding: '10px 14px',
                boxShadow: '0 12px 48px rgba(0,0,0,0.5)',
              }}
              itemStyle={{ fontSize: 12, fontWeight: 500 }}
              formatter={(value: number) => [`$${value.toLocaleString()}`, 'Value']}
            />
            <Legend
              verticalAlign="bottom"
              align="center"
              iconType="circle"
              iconSize={8}
              wrapperStyle={{ paddingTop: 24, fontSize: 11, fontWeight: 500, color: '#94a3b8' }}
            />
          </PieChart>
        </ResponsiveContainer>
        <div className="grid grid-cols-2 gap-x-6 gap-y-2 mt-2 w-full px-2">
          {(data || []).map((slice) => (
            <div key={slice.name} className="flex items-center gap-2">
              <div
                className="w-2.5 h-2.5 rounded-full shrink-0"
                style={{ backgroundColor: slice.color }}
              />
              <div className="flex items-center justify-between flex-1 min-w-0">
                <span className="text-xs text-proton-400 truncate">{slice.name}</span>
                <span className="text-xs font-medium text-proton-200 ml-2">{slice.percentage}%</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}
