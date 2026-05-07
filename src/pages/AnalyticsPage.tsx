import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { PerformanceChart, AllocationChart } from '@/components/charts';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui';
import { Badge } from '@/components/ui';
import { mockSectorExposure } from '@/data/mock';
import { formatPercentage } from '@/utils';
import { cn } from '@/utils';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';

// ─────────────────────────────────────────────────
// ANALYTICS PAGE – Performance & sector analysis
// ─────────────────────────────────────────────────

export default function AnalyticsPage() {
  return (
    <>
      <Helmet>
        <title>Analytics – Proton Finance</title>
        <meta name="description" content="Deep dive into portfolio analytics, sector exposure, and performance metrics." />
      </Helmet>

      <motion.div
        className="space-y-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
      >
        <div>
          <h1 className="text-2xl font-bold text-proton-50 tracking-tight">Analytics</h1>
          <p className="text-sm text-proton-500 mt-1">
            Deep-dive into your portfolio performance and exposure.
          </p>
        </div>

        {/* Performance + Allocation */}
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-4">
          <PerformanceChart />
          <AllocationChart />
        </div>

        {/* Sector Exposure Table */}
        <Card padding="lg">
          <CardHeader>
            <CardTitle>Sector Exposure</CardTitle>
            <Badge variant="default" size="sm">
              {mockSectorExposure.length} sectors
            </Badge>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-border-secondary">
                    {['Sector', 'Allocation', 'Return', 'Holdings', 'Exposure Bar'].map((h) => (
                      <th key={h} className="px-4 py-3 text-[11px] font-semibold text-proton-500 uppercase tracking-wider">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {mockSectorExposure.map((sector, i) => (
                    <motion.tr
                      key={sector.sector}
                      className="border-b border-border-secondary/50 hover:bg-surface-tertiary/50 transition-colors"
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.05 }}
                    >
                      <td className="px-4 py-3">
                        <span className="text-sm font-medium text-proton-100">{sector.sector}</span>
                      </td>
                      <td className="px-4 py-3">
                        <span className="text-sm font-mono text-proton-200">{sector.allocation}%</span>
                      </td>
                      <td className="px-4 py-3">
                        <div className={cn(
                          'inline-flex items-center gap-1 text-sm font-mono font-semibold',
                          sector.gain >= 0 ? 'text-accent-emerald' : 'text-accent-rose',
                        )}>
                          {sector.gain >= 0 ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
                          {formatPercentage(sector.gain)}
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <Badge variant="neutral" size="sm">{sector.holdings} assets</Badge>
                      </td>
                      <td className="px-4 py-3">
                        <div className="w-full max-w-[200px] h-2 rounded-full bg-surface-tertiary overflow-hidden">
                          <motion.div
                            className="h-full rounded-full bg-gradient-to-r from-proton-600 to-proton-400"
                            initial={{ width: 0 }}
                            animate={{ width: `${sector.allocation * 2}%` }}
                            transition={{ duration: 0.8, delay: i * 0.1 }}
                          />
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </>
  );
}
