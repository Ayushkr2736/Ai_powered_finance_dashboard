import { motion } from 'framer-motion';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { Card, CardHeader, CardTitle, Badge, Button, ProgressBar } from './index';
import { Sparkles, TrendingUp, ArrowDownRight, ArrowUpRight, ShieldCheck, Landmark } from 'lucide-react';
import { cn } from '@/utils';

// ═══════════════════════════════════════════════════════
// MARKET SENTIMENT WIDGET
// ═══════════════════════════════════════════════════════

const sentimentData = [
  { name: 'Bullish', value: 68, color: '#22c55e' },
  { name: 'Neutral', value: 22, color: '#c5943a' },
  { name: 'Bearish', value: 10, color: '#ef4444' },
];

export function MarketSentimentWidget() {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="text-headline-sm">Market Sentiment</CardTitle>
        <Badge variant="success" size="sm">Greed: 68</Badge>
      </CardHeader>
      <div className="h-48 relative">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={sentimentData}
              innerRadius={60}
              outerRadius={80}
              paddingAngle={8}
              dataKey="value"
              stroke="none"
              startAngle={180}
              endAngle={0}
              cy="100%"
            >
              {sentimentData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-center">
          <div className="text-2xl font-bold text-success">Bullish</div>
          <div className="text-[10px] text-text-faint uppercase font-bold tracking-widest">Global Index</div>
        </div>
      </div>
      <div className="mt-4 space-y-3">
        <div className="flex items-center justify-between text-label-sm">
          <span className="text-text-muted">Retail Flow</span>
          <span className="text-success font-bold">+12.4%</span>
        </div>
        <div className="flex items-center justify-between text-label-sm">
          <span className="text-text-muted">Institutional Bids</span>
          <span className="text-gold-400 font-bold">Stable</span>
        </div>
      </div>
    </Card>
  );
}

// ═══════════════════════════════════════════════════════
// AI CASH FLOW INTELLIGENCE
// ═══════════════════════════════════════════════════════

export function AICashFlowIntelligence() {
  return (
    <Card className="bg-gradient-to-br from-surface-mid to-surface-low border-blue-500/10">
      <CardHeader>
        <div className="flex items-center gap-2">
          <Sparkles className="h-4 w-4 text-blue-400" />
          <CardTitle className="text-headline-sm">Cash Flow Intelligence</CardTitle>
        </div>
      </CardHeader>
      <div className="space-y-6">
        <div className="p-4 rounded-xl bg-blue-500/5 border border-blue-500/10 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-label-sm font-bold text-blue-300 uppercase tracking-wider">Surplus Opportunity</span>
            <Badge variant="blue">+$2,450</Badge>
          </div>
          <p className="text-body-md text-text-secondary leading-relaxed">
            Your recurring expenses have decreased by 18% this month. We recommend moving the surplus to your 
            <span className="text-blue-400 font-semibold"> High-Yield Sweep</span> to capture an extra 5.2% APY.
          </p>
        </div>
        
        <div className="space-y-4">
          <ProgressBar label="Savings Velocity" value={82} variant="blue" showValue />
          <ProgressBar label="Expense Ratio" value={34} variant="gold" showValue />
        </div>
      </div>
    </Card>
  );
}

// ═══════════════════════════════════════════════════════
// TAX & SPENDING INTELLIGENCE CARDS
// ═══════════════════════════════════════════════════════

export function TaxLossHarvestingCard() {
  return (
    <Card className="hover:border-success/30 transition-colors cursor-pointer group">
      <div className="flex items-start gap-4">
        <div className="p-3 rounded-xl bg-success/10 text-success group-hover:scale-110 transition-transform">
          <ShieldCheck className="h-6 w-6" />
        </div>
        <div className="space-y-1">
          <h4 className="text-title-md font-bold text-text-primary">Tax Loss Harvesting</h4>
          <p className="text-label-sm text-text-muted">
            Identified $4,200 in harvestable losses from underperforming ETF positions.
          </p>
          <div className="pt-2 text-[10px] font-bold text-success uppercase tracking-widest">
            Estimated Savings: $1,150
          </div>
        </div>
      </div>
    </Card>
  );
}

export function SpendingIntelligenceCard() {
  return (
    <Card className="hover:border-gold-500/30 transition-colors cursor-pointer group">
      <div className="flex items-start gap-4">
        <div className="p-3 rounded-xl bg-gold-500/10 text-gold-400 group-hover:scale-110 transition-transform">
          <Landmark className="h-6 w-6" />
        </div>
        <div className="space-y-1">
          <h4 className="text-title-md font-bold text-text-primary">Spending Intelligence</h4>
          <p className="text-label-sm text-text-muted">
            Recurring software subscriptions are 12% higher than your peer group average.
          </p>
          <div className="pt-2 text-[10px] font-bold text-gold-500 uppercase tracking-widest">
            Optimization Potential: $85/mo
          </div>
        </div>
      </div>
    </Card>
  );
}
