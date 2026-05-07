import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui';
import { TransactionsTable } from '@/components/tables';
import { useTransactions } from '@/hooks';
import { ChartSkeleton } from '@/components/ui';
import { Button } from '@/components/ui';
import { Filter, Download } from 'lucide-react';

// ─────────────────────────────────────────────────
// TRANSACTIONS PAGE – Full transaction history
// ─────────────────────────────────────────────────

export default function TransactionsPage() {
  const { data, isLoading } = useTransactions();

  return (
    <>
      <Helmet>
        <title>Transactions – Proton Finance</title>
        <meta name="description" content="Complete transaction history for your portfolio." />
      </Helmet>

      <motion.div
        className="space-y-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
      >
        <div className="flex items-end justify-between">
          <div>
            <h1 className="text-2xl font-bold text-proton-50 tracking-tight">Transactions</h1>
            <p className="text-sm text-proton-500 mt-1">
              Complete history of all portfolio activity.
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="secondary" size="sm">
              <Filter className="h-3.5 w-3.5" />
              Filter
            </Button>
            <Button variant="secondary" size="sm">
              <Download className="h-3.5 w-3.5" />
              Export
            </Button>
          </div>
        </div>

        <Card padding="none" className="overflow-hidden">
          <CardHeader className="px-5 pt-5">
            <CardTitle>All Transactions</CardTitle>
            <span className="text-xs text-proton-500">
              {data?.length ?? 0} total transactions
            </span>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <ChartSkeleton height={300} />
            ) : (
              <TransactionsTable transactions={data ?? []} />
            )}
          </CardContent>
        </Card>
      </motion.div>
    </>
  );
}
