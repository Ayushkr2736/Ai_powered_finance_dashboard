import { motion } from 'framer-motion';
import { Sparkles, ArrowRight, Zap, Target } from 'lucide-react';
import { Button } from './Button';
import { cn } from '@/utils';

export function AIStrategyHero() {
  return (
    <motion.div
      className={cn(
        'relative overflow-hidden rounded-3xl p-8 lg:p-10',
        'bg-gradient-to-br from-blue-900 via-blue-800 to-blue-950',
        'border border-blue-400/20 shadow-xl',
      )}
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Abstract Background Shapes */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-gold-500/5 rounded-full blur-3xl -ml-10 -mb-10 pointer-events-none" />

      <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-10">
        <div className="max-w-2xl space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-400/10 border border-blue-400/20 text-[10px] font-bold text-blue-300 uppercase tracking-widest">
            <Sparkles className="h-3 w-3" />
            Active Strategy Engine
          </div>
          
          <h2 className="text-display-md text-white leading-[1.1] tracking-tight">
            Optimize your <span className="text-gold-400">Net Worth</span> with AI-powered capital rotation.
          </h2>
          
          <p className="text-body-md text-blue-100/70 max-w-xl leading-relaxed">
            Our Wealth Curator engine has identified a 14% efficiency gap in your idle cash allocation. 
            By rotating into Treasury ETFs and optimized dividends, you could generate an additional 
            $1,240 in passive monthly yield.
          </p>
          
          <div className="flex flex-wrap items-center gap-4">
            <Button variant="gold" size="lg" className="rounded-full px-8">
              Execute Strategy
              <Zap className="h-4 w-4 ml-1 fill-current" />
            </Button>
            <Button variant="ghost" size="lg" className="text-blue-200 hover:text-white hover:bg-white/5 rounded-full px-8">
              Review Analytics
              <ArrowRight className="h-4 w-4 ml-1" />
            </Button>
          </div>
        </div>

        <div className="hidden lg:grid grid-cols-2 gap-4 shrink-0">
          {[
            { label: 'Efficiency Score', value: '94%', icon: Target, color: 'text-blue-400' },
            { label: 'Projected Alpha', value: '+4.2%', icon: Sparkles, color: 'text-gold-400' },
          ].map((stat) => (
            <div key={stat.label} className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-5 w-40">
              <stat.icon className={cn('h-5 w-5 mb-3', stat.color)} />
              <div className="text-2xl font-bold text-white font-mono">{stat.value}</div>
              <div className="text-[10px] text-blue-200/60 uppercase font-semibold tracking-wider mt-1">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export function EditorNoteCard() {
  return (
    <div className="bg-surface-high border border-edge-subtle rounded-2xl p-6 relative overflow-hidden">
      <div className="absolute top-0 right-0 p-4 opacity-5">
        <Sparkles className="h-12 w-12" />
      </div>
      <div className="flex items-center gap-2 mb-4">
        <div className="w-6 h-6 rounded-full bg-gold-500/10 flex items-center justify-center">
          <Sparkles className="h-3 w-3 text-gold-500" />
        </div>
        <span className="text-[10px] font-bold text-gold-500 uppercase tracking-widest">Editor's Note</span>
      </div>
      <p className="text-body-md text-text-secondary leading-relaxed italic">
        "The key to long-term wealth isn't just saving, it's the intelligent velocity of capital. 
        Focus on assets that produce while you sleep."
      </p>
    </div>
  );
}
