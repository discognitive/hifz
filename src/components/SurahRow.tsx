import { Check } from 'lucide-react';
import { type Surah, getDifficultyColor } from '@/data/surahs';
import { useRef, useState, useCallback } from 'react';

interface SurahRowProps {
  surah: Surah;
  completionPercent: number;
  isComplete: boolean;
  onTap: () => void;
  onLongPress: () => void;
}

export function SurahRow({ surah, completionPercent, isComplete, onTap, onLongPress }: SurahRowProps) {
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [pressing, setPressing] = useState(false);
  const didLongPress = useRef(false);

  const handlePointerDown = useCallback(() => {
    didLongPress.current = false;
    setPressing(true);
    timerRef.current = setTimeout(() => {
      didLongPress.current = true;
      setPressing(false);
      onLongPress();
    }, 500);
  }, [onLongPress]);

  const handlePointerUp = useCallback(() => {
    setPressing(false);
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
    if (!didLongPress.current) {
      onTap();
    }
  }, [onTap]);

  const handlePointerLeave = useCallback(() => {
    setPressing(false);
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  const diffColor = getDifficultyColor(surah.difficulty);
  const hasStarted = completionPercent > 0;

  return (
    <div
      className={`surah-row-tap cursor-pointer select-none border-b border-border px-4 transition-colors ${pressing ? 'bg-accent' : ''}`}
      style={{ paddingTop: '14px', paddingBottom: hasStarted ? '10px' : '14px' }}
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      onPointerLeave={handlePointerLeave}
      onContextMenu={e => e.preventDefault()}
    >
      <div className="flex items-baseline" style={{ gap: '12px' }}>
        {/* Surah number — fixed width, muted */}
        <span className="text-muted-foreground tabular-nums text-sm" style={{ width: '28px', textAlign: 'right', flexShrink: 0 }}>
          {surah.id}
        </span>

        <span className="text-foreground" style={{ fontSize: '15px', fontWeight: 500, letterSpacing: '-0.01em' }}>
          —
        </span>

        {/* Name — visual anchor */}
        <span className="text-foreground flex-1" style={{ fontSize: '15px', fontWeight: 500, letterSpacing: '-0.01em' }}>
          {surah.name}
        </span>

        {/* Complete badge */}
        {isComplete && (
          <span className="flex items-center justify-center rounded-full bg-progress-fill/15" style={{ width: '20px', height: '20px' }}>
            <Check className="text-progress-fill" style={{ width: '12px', height: '12px' }} />
          </span>
        )}
      </div>

      {/* Metadata line */}
      <div className="flex items-center" style={{ marginLeft: '40px', marginTop: '4px', gap: '6px' }}>
        <span className="text-muted-foreground" style={{ fontSize: '12px' }}>
          {surah.ayahCount} ayahs
        </span>
        <span className={`text-${diffColor}`} style={{ fontSize: '10px', lineHeight: 1 }}>●</span>
        <span className="text-muted-foreground" style={{ fontSize: '12px' }}>
          {surah.difficulty} / 11
        </span>
      </div>

      {/* Progress bar — only shown when started */}
      {hasStarted && (
        <div className="rounded-full bg-progress-track overflow-hidden" style={{ marginLeft: '40px', marginTop: '6px', height: '2px' }}>
          <div
            className="progress-fill-animate rounded-full bg-progress-fill h-full"
            style={{ width: `${completionPercent}%` }}
          />
        </div>
      )}
    </div>
  );
}
