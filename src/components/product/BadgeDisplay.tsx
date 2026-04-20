import { cn } from '@/lib/utils';

interface BadgeDisplayProps {
  badge: string | null;
  className?: string;
}

const badgeStyles: Record<string, string> = {
  'FLASH DEAL': 'bg-orange-500 text-white',
  'TOP PICK': 'bg-navy text-white',
  'HOT DEAL': 'bg-red-600 text-white',
  'BEST SELLER': 'bg-navy text-white',
  'NEW ARRIVAL': 'bg-accent text-white',
};

export default function BadgeDisplay({ badge, className }: BadgeDisplayProps) {
  if (!badge) return null;

  const style = badgeStyles[badge] || 'bg-gray-500 text-white';

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wide',
        style,
        className
      )}
    >
      {badge === 'FLASH DEAL' && (
        <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
          <path d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" />
        </svg>
      )}
      {badge}
    </span>
  );
}
