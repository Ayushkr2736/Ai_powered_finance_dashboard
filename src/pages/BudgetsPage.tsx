import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
  LineChart,
  Line,
} from 'recharts';
import {
  Card,
  Badge,
  Button,
  FinancialStatCard,
  ProgressBar,
  CategoryBudgetCard,
  BillsTimeline,
  AlertCard,
  AIStrategyHero,
} from '@/components/ui';
import { 
  ShoppingCart, 
  Utensils, 
  Car, 
  Film, 
  Home, 
  TrendingDown, 
  ArrowRight,
  Sparkles,
  Target
} from 'lucide-react';
import { formatCurrency, cn } from '@/utils';

// Mock data for daily spending
const dailySpendData = [
  { day: 'Mon', amount: 120, avg: 145 },
  { day: 'Tue', amount: 85, avg: 145 },
  { day: 'Wed', amount: 210, avg: 145 },
  { day: 'Thu', amount: 150, avg: 145 },
  { day: 'Fri', amount: 280, avg: 145 },
  { day: 'Sat', amount: 340, avg: 145 },
  { day: 'Sun', amount: 95, avg: 145 },
];

// Mock budget categories
const budgetCategories = [
  { category: 'Housing', spent: 3200, limit: 3200, icon: Home, color: 'blue' as const },
  { category: 'Shopping', spent: 850, limit: 1200, icon: ShoppingCart, color: 'gold' as const },
  { category: 'Dining', spent: 920, limit: 800, icon: Utensils, color: 'danger' as const },
  { category: 'Transport', spent: 450, limit: 600, icon: Car, color: 'success' as const },
];

export default function BudgetsPage() {
  return (
    <>
      <Helmet>
        <title>Budget Analytics – Wealth Curator</title>
      </Helmet>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-10"
      >
        {/* 1. Header & Overview Cards */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-1">
            <h1 className="text-display-md text-text-primary tracking-tight">Budget Analytics</h1>
            <p className="text-body-md text-text-muted max-w-md">
              Real-time utilization tracking and AI-driven spending optimization.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="secondary" size="md">Monthly Report</Button>
            <Button variant="primary" size="md">Set New Budget</Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <FinancialStatCard
            label="Total Monthly Budget"
            value="$8,500"
            changePercent={0}
            trend="flat"
            icon="Wallet"
            accent="blue"
            subtitle="Plan for December"
          />
          <FinancialStatCard
            label="Total Spent"
            value="$5,420"
            changePercent={12.4}
            trend="up"
            icon="BarChart3"
            accent="gold"
            subtitle="64% of budget utilized"
          />
          <FinancialStatCard
            label="Avg. Daily Burn"
            value="$186"
            changePercent={-4.2}
            trend="down"
            icon="TrendingUp"
            accent="success"
            subtitle="vs $194 last month"
          />
        </div>

        {/* 2. AI Budget Strategy Hero */}
        <AIStrategyHero />

        {/* 3. Daily Analysis & Category Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 items-start">
          {/* Daily Spending Chart */}
          <Card className="xl:col-span-8 p-8 space-y-8">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-headline-sm text-text-primary tracking-tight">Daily Spending Analysis</h3>
                <p className="text-label-sm text-text-muted mt-1">Comparing current week vs average</p>
              </div>
              <div className="flex items-center gap-4 text-label-sm">
                <div className="flex items-center gap-1.5">
                  <div className="w-2 h-2 rounded-full bg-blue-500" />
                  <span className="text-text-muted">Current</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-2 h-2 rounded-full bg-surface-high border border-edge-subtle" />
                  <span className="text-text-muted">Average</span>
                </div>
              </div>
            </div>

            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={dailySpendData} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="4 4" stroke="rgba(255,255,255,0.03)" vertical={false} />
                  <XAxis 
                    dataKey="day" 
                    tick={{ fill: '#64748b', fontSize: 11, fontWeight: 500 }}
                    tickLine={false}
                    axisLine={false}
                  />
                  <YAxis 
                    tick={{ fill: '#64748b', fontSize: 11, fontWeight: 500 }}
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={(v) => `$${v}`}
                  />
                  <Tooltip
                    contentStyle={{
                      background: '#101114',
                      border: '1px solid rgba(255,255,255,0.08)',
                      borderRadius: '16px',
                      padding: '12px 16px',
                      boxShadow: '0 12px 48px rgba(0,0,0,0.5)',
                    }}
                    cursor={{ fill: 'rgba(255,255,255,0.02)' }}
                  />
                  <Bar dataKey="amount" radius={[6, 6, 0, 0]}>
                    {dailySpendData.map((entry, index) => (
                      <Cell 
                        key={`cell-${index}`} 
                        fill={entry.amount > entry.avg ? '#c5943a' : '#3b82f6'} 
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>

          {/* Potential Savings */}
          <div className="xl:col-span-4 space-y-6">
            <h3 className="text-headline-sm text-text-primary">Budget Insights</h3>
            <AlertCard
              variant="warning"
              title="Dining Alert"
              message="You've exceeded your Dining budget by $120. Recommended reduction in Leisure for next week."
            />
            <Card className="bg-gradient-to-br from-success/10 to-transparent border-success/10">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-success/20 text-success">
                  <Target className="h-6 w-6" />
                </div>
                <div className="space-y-1">
                  <h4 className="text-title-md font-bold text-text-primary">Potential Savings</h4>
                  <p className="text-label-sm text-text-muted leading-relaxed">
                    By switching to annual billing for your 3 active SaaS subscriptions, you could save 
                    <span className="text-success font-bold"> $210/year</span>.
                  </p>
                  <Button variant="ghost" size="xs" className="text-success p-0 h-auto mt-2">
                    Optimize Now <ArrowRight className="h-3 w-3 ml-1" />
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        </div>

        {/* 4. Category Grid & Timeline Row */}
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
          <div className="xl:col-span-8">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-headline-sm text-text-primary">Category Allocation</h3>
              <Badge variant="neutral">Active Limits: 12</Badge>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {budgetCategories.map((item) => (
                <CategoryBudgetCard key={item.category} {...item} />
              ))}
            </div>
          </div>
          
          <div className="xl:col-span-4">
            <BillsTimeline />
          </div>
        </div>
      </motion.div>
    </>
  );
}
