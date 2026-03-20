import { getRank, RANKS } from '@/data/surahs';

interface RankDisplayProps {
  totalXp: number;
}

export function RankDisplay({ totalXp }: RankDisplayProps) {
  const { current, next } = getRank(totalXp);
  const isMax = current === next;
  const progressToNext = isMax
    ? 100
    : Math.round(((totalXp - current.minXp) / (next.minXp - current.minXp)) * 100);

  return (
    <div className="px-4 py-3 border-b border-border">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className={`text-${current.color} font-medium`} style={{ fontSize: '13px' }}>
            {current.name}
          </span>
          {!isMax && (
            <span className="text-muted-foreground" style={{ fontSize: '11px' }}>
              → {next.name}
            </span>
          )}
        </div>
        <span className="text-muted-foreground tabular-nums" style={{ fontSize: '11px' }}>
          {totalXp} XP
        </span>
      </div>
      <div className="rounded-full bg-progress-track overflow-hidden mt-1.5" style={{ height: '3px' }}>
        <div
          className={`progress-fill-animate rounded-full h-full bg-${current.color}`}
          style={{ width: `${progressToNext}%` }}
        />
      </div>
    </div>
  );
}
