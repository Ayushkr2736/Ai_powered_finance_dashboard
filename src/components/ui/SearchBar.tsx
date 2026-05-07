import { Search, Command } from 'lucide-react';
import { cn } from '@/utils';

// ═══════════════════════════════════════════════════════
// SEARCH BAR – Spotlight-style search with keyboard hint
// ═══════════════════════════════════════════════════════

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  showShortcut?: boolean;
  onFocus?: () => void;
}

export function SearchBar({
  value,
  onChange,
  placeholder = 'Search assets, transactions...',
  className,
  showShortcut = true,
  onFocus,
}: SearchBarProps) {
  return (
    <div className={cn('relative', className)}>
      <Search
        className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-text-faint pointer-events-none"
        aria-hidden="true"
      />
      <input
        type="search"
        role="searchbox"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={onFocus}
        placeholder={placeholder}
        aria-label={placeholder}
        className={cn(
          'w-full h-9 pl-10 pr-16 bg-surface-low border border-edge-default rounded-xl',
          'text-body-md text-text-primary placeholder:text-text-faint',
          'focus:outline-none focus:border-blue-600/30 focus:ring-2 focus:ring-blue-600/8',
          'transition-all duration-200',
        )}
      />
      {showShortcut && (
        <div
          className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1 px-1.5 py-0.5 rounded-md bg-surface-mid border border-edge-subtle text-text-faint"
          aria-hidden="true"
        >
          <Command className="h-3 w-3" />
          <span className="text-[10px] font-mono">K</span>
        </div>
      )}
    </div>
  );
}
