import { type Surah } from '@/data/surahs';

interface ConfirmSheetProps {
  surah: Surah;
  onConfirm: () => void;
  onCancel: () => void;
}

export function ConfirmSheet({ surah, onConfirm, onCancel }: ConfirmSheetProps) {
  return (
    <div className="fixed inset-0 z-40" onClick={onCancel}>
      <div className="absolute inset-0 bg-foreground/20" />
      <div
        className="slide-up absolute bottom-0 left-0 right-0 bg-background border-t border-border rounded-t-lg p-4"
        onClick={e => e.stopPropagation()}
      >
        <div className="w-8 h-0.5 bg-muted rounded-full mx-auto mb-4" />
        <p className="text-foreground text-center" style={{ fontSize: '15px', fontWeight: 500 }}>
          Mark as memorized?
        </p>
        <p className="text-muted-foreground text-center mt-1" style={{ fontSize: '13px' }}>
          {surah.id} — {surah.name} · {surah.ayahCount} ayahs
        </p>
        <p className="text-muted-foreground text-center mt-0.5" style={{ fontSize: '12px' }}>
          +{surah.xpReward} XP will be awarded
        </p>
        <div className="flex gap-3 mt-4">
          <button
            onClick={onCancel}
            className="flex-1 py-2.5 rounded-md border border-border text-muted-foreground transition-colors hover:bg-accent"
            style={{ fontSize: '14px' }}
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 py-2.5 rounded-md bg-primary text-primary-foreground transition-colors hover:bg-primary/90"
            style={{ fontSize: '14px', fontWeight: 500 }}
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}
