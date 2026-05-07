import type { Transaction, Holding, BudgetAnalytics, AIInsight } from '@/types';

// --- AI STRATEGY ENGINE – Pattern Detection & Generation ---

/**
 * Generates dynamic AI insights by analyzing current portfolio and spending patterns.
 */
export function generateAIInsights(
  transactions: Transaction[],
  holdings: Holding[],
  budgets: BudgetAnalytics
): AIInsight[] {
  const insights: AIInsight[] = [];

  // 1. PORTFOLIO ANALYSIS
  
  // Detect Technology Concentration
  const techAllocation = holdings
    .filter(h => h.sector === 'Technology')
    .reduce((sum, h) => sum + h.allocation, 0);

  if (techAllocation > 30) {
    insights.push({
      id: 'insight-tech-drift',
      category: 'Strategy',
      title: 'Portfolio Concentration Alert',
      insight: `Your Technology exposure has reached ${techAllocation.toFixed(1)}%. This is 14% above your target baseline. Consider rotating capital into Healthcare or defensive ETFs.`,
      confidence: 94,
      impact: 'Risk Reduction',
      actionable: true,
    });
  }

  // Detect Tax Loss Harvesting (Simulated)
  const lossHoldings = holdings.filter(h => h.gain < -1000);
  if (lossHoldings.length > 0) {
    const totalPotentialLoss = Math.abs(lossHoldings.reduce((sum, h) => sum + h.gain, 0));
    insights.push({
      id: 'insight-tax-harvest',
      category: 'Tax',
      title: 'Tax Loss Harvesting Opportunity',
      insight: `We've identified ${formatCurrency(totalPotentialLoss)} in harvestable losses. Executing this strategy could offset future capital gains and reduce your tax liability by an estimated ${formatCurrency(totalPotentialLoss * 0.25)}.`,
      confidence: 88,
      impact: 'Tax Alpha',
      actionable: true,
    });
  }

  // 2. SPENDING ANALYSIS
  
  // Detect Budget Overage (Dining/Leisure)
  const diningBudget = budgets.categories.find(c => c.name === 'Dining');
  if (diningBudget && diningBudget.spent > diningBudget.limit) {
    const overage = diningBudget.spent - diningBudget.limit;
    const overagePercent = ((overage / diningBudget.limit) * 100).toFixed(0);
    insights.push({
      id: 'insight-dining-overage',
      category: 'Risk',
      title: 'Spending Velocity Alert',
      insight: `Dining expenses are ${overagePercent}% above your monthly average. At this burn rate, you'll exceed your total discretionary budget 4 days earlier than projected.`,
      confidence: 96,
      impact: 'Cash Flow',
      actionable: true,
    });
  }

  // Detect Subscription Anomalies (Simulated pattern matching)
  const subscriptions = transactions.filter(t => t.category === 'Subscription' || t.category === 'Recurring');
  if (subscriptions.length > 5) {
    insights.push({
      id: 'insight-sub-overlap',
      category: 'Opportunity',
      title: 'Subscription Intelligence',
      insight: `Potential duplicate utility found between your AWS and Google Cloud billing cycles. Consolidating could yield an estimated annual saving of $180.`,
      confidence: 82,
      impact: 'Cost Efficiency',
      actionable: true,
    });
  }

  return insights;
}

/**
 * Formats a currency value for insights.
 */
function formatCurrency(value: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(value);
}
