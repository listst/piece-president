import { cn } from '@/lib/utils';
import { ConflictStatus, TrophyType, SITE_CONFIG } from '@/data';

interface StatusBadgeProps {
  status: ConflictStatus;
  size?: 'sm' | 'md';
  className?: string;
}

const statusColors: Record<ConflictStatus, string> = {
  'holding': 'bg-green-100 text-green-800 border-green-300',
  'shaky': 'bg-yellow-100 text-yellow-800 border-yellow-300',
  'collapsed': 'bg-red-100 text-red-800 border-red-300',
  'disputed': 'bg-orange-100 text-orange-800 border-orange-300',
  'no-conflict': 'bg-gray-100 text-gray-800 border-gray-300',
  'ongoing': 'bg-blue-100 text-blue-800 border-blue-300',
  'too-early': 'bg-purple-100 text-purple-800 border-purple-300',
};

export function StatusBadge({ status, size = 'md', className }: StatusBadgeProps) {
  const label = SITE_CONFIG.statusLabels[status];
  
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full border font-medium',
        statusColors[status],
        size === 'sm' ? 'px-2 py-0.5 text-xs' : 'px-3 py-1 text-sm',
        className
      )}
    >
      {label}
    </span>
  );
}

// Trophy type badge
interface TrophyBadgeProps {
  type: TrophyType;
  size?: 'sm' | 'md';
  className?: string;
}

const trophyColors: Record<TrophyType, string> = {
  'gold': 'bg-yellow-100 text-yellow-800 border-yellow-400',
  'silver': 'bg-gray-100 text-gray-700 border-gray-400',
  'participation': 'bg-pink-100 text-pink-800 border-pink-300',
  'tombstone': 'bg-stone-200 text-stone-800 border-stone-400',
  'phantom': 'bg-slate-100 text-slate-500 border-slate-300 opacity-70',
};

export function TrophyBadge({ type, size = 'md', className }: TrophyBadgeProps) {
  const label = SITE_CONFIG.trophyLabels[type];
  
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full border font-medium',
        trophyColors[type],
        size === 'sm' ? 'px-2 py-0.5 text-xs' : 'px-3 py-1 text-sm',
        className
      )}
    >
      {label}
    </span>
  );
}
