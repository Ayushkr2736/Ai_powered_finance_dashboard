import { motion } from 'framer-motion';
import { Card, ProgressBar, Badge, Button } from './index';
import { 
  ArrowUpRight, 
  Calendar, 
  ChevronRight, 
  CreditCard, 
  AlertCircle,
  CheckCircle2,
  Clock
} from 'lucide-react';
import { cn, formatCurrency } from '@/utils';

// ═══════════════════════════════════════════════════════
// CATEGORY BUDGET CARD
// ═══════════════════════════════════════════════════════

interface CategoryBudgetCardProps {
  category: string;
  spent: number;
  limit: number;
  icon: React.ElementType;
  color: 'blue' | 'gold' | 'success' | 'danger';
}

export function CategoryBudgetCard({ category, spent, limit, icon: Icon, color }: CategoryBudgetCardProps) {
  const percent = Math.min((spent / limit) * 100, 100);
  const isOver = spent > limit;

  return (
    <Card className="hover:border-edge-default transition-all group">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className={cn(
            'p-2.5 rounded-xl border border-edge-subtle transition-colors',
            color === 'blue' && 'bg-blue-500/10 text-blue-400 group-hover:bg-blue-500/20',
            color === 'gold' && 'bg-gold-500/10 text-gold-400 group-hover:bg-gold-500/20',
            color === 'success' && 'bg-success/10 text-success group-hover:bg-success/20',
            color === 'danger' && 'bg-alert/10 text-alert group-hover:bg-alert/20',
          )}>
            <Icon className="h-4 w-4" />
          </div>
          <span className="text-body-md font-semibold text-text-primary">{category}</span>
        </div>
        <Badge variant={isOver ? 'danger' : 'neutral'} size="sm">
          {percent.toFixed(0)}%
        </Badge>
      </div>

      <div className="space-y-4">
        <div className="flex items-end justify-between">
          <div>
            <div className="text-[10px] text-text-faint uppercase font-bold tracking-widest mb-0.5">Spent</div>
            <div className="text-title-md font-mono font-bold text-text-primary">{formatCurrency(spent)}</div>
          </div>
          <div className="text-right">
            <div className="text-[10px] text-text-faint uppercase font-bold tracking-widest mb-0.5">Limit</div>
            <div className="text-body-md font-mono font-medium text-text-muted">{formatCurrency(limit)}</div>
          </div>
        </div>

        <ProgressBar 
          value={spent} 
          max={limit} 
          variant={isOver ? 'danger' : color === 'gold' ? 'gold' : 'blue'} 
          size="md" 
        />
      </div>
    </Card>
  );
}

// ═══════════════════════════════════════════════════════
// UPCOMING BILLS TIMELINE
// ═══════════════════════════════════════════════════════

const mockBills = [
  { id: '1', name: 'Adobe Creative Cloud', date: 'Dec 22', amount: 54.99, status: 'pending' },
  { id: '2', name: 'AWS Cloud Services', date: 'Dec 24', amount: 128.42, status: 'upcoming' },
  { id: '3', name: 'Equinox Membership', date: 'Dec 28', amount: 250.00, status: 'upcoming' },
];

export function BillsTimeline() {
  return (
    <Card className="h-full">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-headline-sm text-text-primary">Upcoming Bills</h3>
        <Button variant="ghost" size="xs">View Calendar</Button>
      </div>
      
      <div className="space-y-5">
        {mockBills.map((bill, i) => (
          <div key={bill.id} className="relative flex items-center justify-between group">
            {i !== mockBills.length - 1 && (
              <div className="absolute left-[18px] top-10 w-[1px] h-6 bg-edge-subtle" />
            )}
            <div className="flex items-center gap-4">
              <div className={cn(
                'w-9 h-9 rounded-full flex items-center justify-center border border-edge-subtle bg-surface-low transition-colors',
                bill.status === 'pending' ? 'text-gold-400 border-gold-500/20' : 'text-text-faint'
              )}>
                {bill.status === 'pending' ? <Clock className="h-4 w-4" /> : <Calendar className="h-4 w-4" />}
              </div>
              <div>
                <div className="text-body-md font-semibold text-text-primary group-hover:text-blue-400 transition-colors">
                  {bill.name}
                </div>
                <div className="text-[10px] text-text-faint font-bold uppercase tracking-wider">
                  Due {bill.date}
                </div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-body-md font-mono font-bold text-text-primary">{formatCurrency(bill.amount)}</div>
              <Badge variant={bill.status === 'pending' ? 'warning' : 'neutral'} size="xs" className="mt-1">
                {bill.status}
              </Badge>
            </div>
          </div>
        ))}
      </div>
      
      <Button variant="secondary" size="md" className="w-full mt-8">
        Add New Bill
        <CreditCard className="h-4 w-4 ml-2" />
      </Button>
    </Card>
  );
}
