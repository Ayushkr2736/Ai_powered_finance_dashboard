// ═══════════════════════════════════════════════════════
// UTILS BARREL EXPORTS
// ═══════════════════════════════════════════════════════

export * from './formatters';
export * from './ui';

// Internal Math Utilities
export function calculatePercentageChange(current: number, previous: number): number {
  if (previous === 0) return 0;
  return ((current - previous) / previous) * 100;
}
