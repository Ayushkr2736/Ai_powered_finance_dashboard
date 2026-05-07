import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { SEO } from '@/components/common/SEO';
import { VARIANTS, TRANSITIONS } from '@/constants/animations';
import { cn } from '@/utils';
import {
  FinancialStatCard,
  AIStrategyHero,
  AlertCard,
  ProgressBar,
  DataTable,
  Badge,
  Button,
  EditorNoteCard,
} from '@/components/ui';
import { Download, Filter, ArrowUpRight, ShoppingCart, Coffee, Home, Zap } from 'lucide-react';
import { formatCurrency } from '@/utils';

// Mock data for spending composition
const spendingComposition = [
  { label: 'Housing & Utilities', value: 3200, max: 4000, variant: 'blue' as const },
  { label: 'Food & Dining', value: 850, max: 1200, variant: 'gold' as const },
  { label: 'Transportation', value: 450, max: 600, variant: 'success' as const },
  { label: 'Entertainment', value: 320, max: 500, variant: 'gradient' as const },
];

// Mock transactions for the table
const recentTransactions = [
  { id: '1', merchant: 'Amazon', category: 'Shopping', status: 'completed', amount: -124.5, date: '2024-12-18', icon: ShoppingCart },
  { id: '2', merchant: 'Starbucks', category: 'Food', status: 'completed', amount: -12.4, date: '2024-12-18', icon: Coffee },
  { id: '3', merchant: 'Apple Dividend', category: 'Income', status: 'completed', amount: 450.0, date: '2024-12-17', icon: Zap },
  { id: '4', merchant: 'Mortgage Payment', category: 'Housing', status: 'pending', amount: -2800.0, date: '2024-12-16', icon: Home },
];

const transactionColumns = [
  {
    key: 'merchant',
    label: 'Merchant',
    render: (row: any) => (
      <div className="flex items-center gap-3">
        <div className="p-2 rounded-lg bg-surface-low border border-edge-subtle">
          <row.icon className="h-4 w-4 text-text-muted" />
        </div>
        <div>
          <div className="text-body-md font-semibold text-text-primary">{row.merchant}</div>
          <div className="text-[10px] text-text-faint uppercase font-bold tracking-wider">{row.date}</div>
        </div>
      </div>
    ),
  },
  {
    key: 'category',
    label: 'Category',
    render: (row: any) => <Badge variant="neutral">{row.category}</Badge>,
  },
  {
    key: 'status',
    label: 'Status',
    render: (row: any) => (
      <Badge variant={row.status === 'completed' ? 'success' : 'warning'} dot>
        {row.status}
      </Badge>
    ),
  },
  {
    key: 'amount',
    label: 'Amount',
    align: 'right' as const,
    render: (row: any) => (
      <div className={cn('text-body-md font-mono font-bold', row.amount > 0 ? 'text-success' : 'text-text-primary')}>
        {row.amount > 0 ? '+' : ''}{formatCurrency(row.amount)}
      </div>
    ),
  },
];

export default function DashboardPage() {
  return (
    <>
      <SEO 
        title="Institutional Wealth Dashboard" 
        description="Real-time portfolio intelligence and AI strategy engine for private client wealth curation."
      />

      <motion.div
        variants={TRANSITIONS.stagger}
        initial="initial"
        animate="animate"
        className="space-y-10"
      >
        {/* 1. Summary Cards */}
        <motion.div variants={VARIANTS.fadeInUp} className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <FinancialStatCard
            label="Total Net Worth"
            value="$2,847,392"
            changePercent={0.45}
            trend="up"
            icon="Wallet"
            accent="blue"
          />
          <FinancialStatCard
            label="Monthly Spending"
            value="$4,822"
            changePercent={-12.4}
            trend="down"
            icon="BarChart3"
            accent="gold"
          />
          <FinancialStatCard
            label="Total Savings"
            value="$1,248,850"
            changePercent={2.1}
            trend="up"
            icon="PiggyBank"
            accent="success"
          />
        </motion.div>

        {/* 2. AI Strategy Hero */}
        <AIStrategyHero />

        {/* 3. Bento Grid: Alerts & Spending */}
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 items-start">
          {/* Left: Alerts & Note */}
          <div className="xl:col-span-4 space-y-6">
            <h3 className="text-headline-sm text-text-primary flex items-center gap-2">
              Critical Alerts
              <Badge variant="danger" size="sm">3</Badge>
            </h3>
            
            <div className="space-y-4">
              <AlertCard
                variant="danger"
                title="Subscription Spike"
                message="Your Netflix subscription increased by 15%. Consider reviewing plans."
              />
              <AlertCard
                variant="warning"
                title="Emergency Fund Cap"
                message="Your liquidity is 8% below your 6-month safety target."
              />
              <AlertCard
                variant="info"
                title="Dividend Reinvestment"
                message="AAPL dividends of $450.00 are ready for allocation."
              />
            </div>

            <EditorNoteCard />
          </div>

          {/* Right: Spending Composition */}
          <div className="xl:col-span-8 bento-card rounded-3xl p-8 space-y-8">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-headline-sm text-text-primary tracking-tight">Spending Composition</h3>
                <p className="text-label-sm text-text-muted mt-1">Analytics based on last 30 days</p>
              </div>
              <Button variant="secondary" size="sm">
                View Full Breakdown
                <ArrowUpRight className="h-3.5 w-3.5" />
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
              {spendingComposition.map((item) => (
                <ProgressBar
                  key={item.label}
                  label={item.label}
                  value={item.value}
                  max={item.max}
                  variant={item.variant}
                  showValue
                  size="lg"
                />
              ))}
            </div>
          </div>
        </div>

        {/* 4. Recent Activity Table */}
        <div className="bento-card rounded-3xl overflow-hidden border-edge-subtle">
          <div className="px-8 py-6 border-b border-edge-subtle flex items-center justify-between">
            <div>
              <h3 className="text-headline-sm text-text-primary tracking-tight">Recent Activity</h3>
              <p className="text-label-sm text-text-muted mt-1">Showing transactions from all accounts</p>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="secondary" size="sm">
                <Filter className="h-3.5 w-3.5 mr-1.5" />
                Filters
              </Button>
              <Button variant="secondary" size="sm">
                <Download className="h-3.5 w-3.5 mr-1.5" />
                Export CSV
              </Button>
            </div>
          </div>
          
          <DataTable
            columns={transactionColumns}
            data={recentTransactions}
            rowKey={(r) => r.id}
            className="px-3"
          />
        </div>
      </motion.div>
    </>
  );
}

function getGreeting(): string {
  const hour = new Date().getHours();
  if (hour < 12) return 'Morning';
  if (hour < 17) return 'Afternoon';
  return 'Evening';
}
