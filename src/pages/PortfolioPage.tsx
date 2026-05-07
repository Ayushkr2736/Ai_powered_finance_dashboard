import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui';
import { HoldingCard } from '@/components/cards';
import { HoldingsTable } from '@/components/tables';
import { useHoldings, usePortfolio } from '@/hooks';
import { formatCurrency, formatPercentage } from '@/utils';
import { StatCardSkeleton, ChartSkeleton } from '@/components/ui';
import { TrendingUp, ArrowUpRight } from 'lucide-react';
import { Button } from '@/components/ui';

// ─────────────────────────────────────────────────
// PORTFOLIO PAGE – Holdings grid + table view
// ─────────────────────────────────────────────────

export default function PortfolioPage() {
  const { data: holdings, isLoading: holdingsLoading } = useHoldings();
  const { data: portfolio, isLoading: portfolioLoading } = usePortfolio();

  return (
    <>
      <Helmet>
        <title>Portfolio – Proton Finance</title>
        <meta name="description" content="View and manage your complete portfolio holdings." />
      </Helmet>

      <motion.div
        className="space-y-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
      >
        {/* Header */}
        <div className="flex items-end justify-between">
          <div>
            <h1 className="text-2xl font-bold text-proton-50 tracking-tight">Portfolio</h1>
            <p className="text-sm text-proton-500 mt-1">
              Manage your asset positions and track performance.
            </p>
          </div>
          <Button variant="premium" size="md">
            <TrendingUp className="h-4 w-4" />
            New Trade
          </Button>
        </div>

        {/* Portfolio summary cards */}
        {portfolioLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {Array.from({ length: 3 }).map((_, i) => (
              <StatCardSkeleton key={i} />
            ))}
          </div>
        ) : portfolio ? (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Card padding="md" hover>
              <div className="text-xs text-proton-500 uppercase tracking-wider mb-1">Total Value</div>
              <div className="text-xl font-bold text-proton-50 font-mono">
                {formatCurrency(portfolio.totalValue)}
              </div>
              <div className="flex items-center gap-1 mt-1 text-accent-emerald text-xs font-medium">
                <ArrowUpRight className="h-3 w-3" />
                {formatPercentage(portfolio.dayChangePercent)} today
              </div>
            </Card>
            <Card padding="md" hover>
              <div className="text-xs text-proton-500 uppercase tracking-wider mb-1">Total Return</div>
              <div className="text-xl font-bold text-accent-emerald font-mono">
                {formatCurrency(portfolio.totalGain)}
              </div>
              <div className="text-xs text-proton-400 mt-1">
                {formatPercentage(portfolio.totalGainPercent)} all time
              </div>
            </Card>
            <Card padding="md" hover>
              <div className="text-xs text-proton-500 uppercase tracking-wider mb-1">Cash Balance</div>
              <div className="text-xl font-bold text-proton-50 font-mono">
                {formatCurrency(portfolio.cashBalance)}
              </div>
              <div className="text-xs text-proton-400 mt-1">Available for trading</div>
            </Card>
          </div>
        ) : null}

        {/* Holdings cards grid */}
        <div>
          <h2 className="text-lg font-semibold text-proton-100 mb-4">Positions</h2>
          {holdingsLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
              {Array.from({ length: 8 }).map((_, i) => (
                <StatCardSkeleton key={i} />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
              {holdings?.map((h, i) => (
                <HoldingCard key={h.id} holding={h} index={i} />
              ))}
            </div>
          )}
        </div>

        {/* Holdings table */}
        <Card padding="none" className="overflow-hidden">
          <CardHeader className="px-5 pt-5">
            <CardTitle>All Holdings</CardTitle>
            <span className="text-xs text-proton-500">{holdings?.length ?? 0} positions</span>
          </CardHeader>
          <CardContent>
            {holdingsLoading ? (
              <ChartSkeleton height={200} />
            ) : (
              <HoldingsTable holdings={holdings ?? []} />
            )}
          </CardContent>
        </Card>
      </motion.div>
    </>
  );
}
