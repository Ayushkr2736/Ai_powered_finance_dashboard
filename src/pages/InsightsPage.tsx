import { motion } from 'framer-motion';
import { SEO } from '@/components/common/SEO';
import { PerformanceChart, AllocationChart } from '@/components/charts';
import {
  Card,
  Badge,
  Button,
  MarketSentimentWidget,
  AICashFlowIntelligence,
  TaxLossHarvestingCard,
  SpendingIntelligenceCard,
} from '@/components/ui';
import { Sparkles, RefreshCcw, ArrowRight, TrendingUp, ShieldCheck, Zap } from 'lucide-react';
import { cn } from '@/utils';

export default function InsightsPage() {
  return (
    <>
      <SEO 
        title="AI Strategy & Insights" 
        description="Deep portfolio analytics, market sentiment, and AI-powered capital rotation strategy."
      />

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-10"
      >
        {/* 1. Portfolio Insights Hero */}
        <div className="relative overflow-hidden rounded-3xl p-8 lg:p-10 bg-gradient-to-br from-surface-mid to-bg border border-edge-subtle">
          <div className="absolute top-0 right-0 p-10 opacity-5">
            <Sparkles className="h-32 w-32" />
          </div>
          
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-8 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-600/10 border border-blue-600/20 text-[10px] font-bold text-blue-400 uppercase tracking-widest">
                <Sparkles className="h-3 w-3" />
                AI Rebalance Protocol
              </div>
              <h1 className="text-display-md text-text-primary tracking-tight leading-[1.1]">
                Strategy identified to capture <span className="text-gold-500">2.4% Alpha</span> through rebalancing.
              </h1>
              <p className="text-body-md text-text-muted max-w-2xl leading-relaxed">
                Your portfolio drift has exceeded 5% in the Technology sector. Our engine recommends 
                rotating capital into undervalued Healthcare and Defensive assets to maintain your 
                target risk profile while capturing the current market rotation.
              </p>
              <div className="flex flex-wrap items-center gap-4">
                <Button variant="primary" size="lg">
                  Preview Rebalance
                  <RefreshCcw className="h-4 w-4 ml-1.5" />
                </Button>
                <Button variant="ghost" size="lg">
                  Detailed Strategy
                  <ArrowRight className="h-4 w-4 ml-1.5" />
                </Button>
              </div>
            </div>

            <div className="lg:col-span-4 flex flex-col items-center justify-center p-8 bg-surface-low rounded-2xl border border-edge-subtle text-center space-y-4">
              <div className="relative w-32 h-32 flex items-center justify-center">
                <svg className="w-full h-full transform -rotate-90">
                  <circle
                    cx="64"
                    cy="64"
                    r="58"
                    stroke="currentColor"
                    strokeWidth="8"
                    fill="transparent"
                    className="text-surface-mid"
                  />
                  <circle
                    cx="64"
                    cy="64"
                    r="58"
                    stroke="currentColor"
                    strokeWidth="8"
                    fill="transparent"
                    strokeDasharray={364}
                    strokeDashoffset={364 - (364 * 94) / 100}
                    className="text-gold-500"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-3xl font-bold text-text-primary">94%</span>
                </div>
              </div>
              <div>
                <div className="text-title-md font-bold text-text-primary">Confidence Score</div>
                <p className="text-[11px] text-text-faint uppercase font-bold tracking-wider mt-1">High Accuracy Engine</p>
              </div>
            </div>
          </div>
        </div>

        {/* 2. Market Sentiment & Performance Row */}
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
          <div className="xl:col-span-3">
            <MarketSentimentWidget />
          </div>
          <div className="xl:col-span-9">
            <PerformanceChart />
          </div>
        </div>

        {/* 3. Sector Allocation & Cash Flow Intelligence */}
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
          <div className="xl:col-span-8">
            <AICashFlowIntelligence />
          </div>
          <div className="xl:col-span-4">
            <AllocationChart />
          </div>
        </div>

        {/* 4. Tax & Spending Intelligence Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <TaxLossHarvestingCard />
          <SpendingIntelligenceCard />
        </div>
      </motion.div>
    </>
  );
}
