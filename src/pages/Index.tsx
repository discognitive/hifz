import { useState, useCallback } from 'react';
import { surahs, type Surah } from '@/data/surahs';
import { useMemorization } from '@/hooks/useMemorization';
import { SurahRow } from '@/components/SurahRow';
import { RankDisplay } from '@/components/RankDisplay';
import { ConfirmSheet } from '@/components/ConfirmSheet';
import { XpPopup } from '@/components/XpPopup';
import { SurahReader } from '@/components/SurahReader';

const Index = () => {
  const {
    totalXp,
    lastXpGain,
    getProgress,
    getCompletionPercent,
    markAsMemorized,
    advanceAyah,
    clearLastXpGain,
  } = useMemorization();

  const [confirmSurah, setConfirmSurah] = useState<Surah | null>(null);
  const [activeSurah, setActiveSurah] = useState<Surah | null>(null);

  const handleConfirmMark = useCallback(() => {
    if (confirmSurah) {
      markAsMemorized(confirmSurah.id);
      setConfirmSurah(null);
    }
  }, [confirmSurah, markAsMemorized]);

  if (activeSurah) {
    const p = getProgress(activeSurah.id);
    return (
      <SurahReader
        surah={activeSurah}
        memorizedAyahs={p.memorizedAyahs}
        onBack={() => setActiveSurah(null)}
        onAdvanceAyah={() => advanceAyah(activeSurah.id)}
      />
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="px-4 border-b border-border" style={{ paddingTop: '16px', paddingBottom: '14px' }}>
        <h1 className="text-foreground" style={{ fontSize: '18px', fontWeight: 600, letterSpacing: '-0.02em' }}>
          Hifz
        </h1>
        <p className="text-muted-foreground mt-0.5" style={{ fontSize: '12px' }}>
          Memorization tracker
        </p>
      </header>

      {/* Rank bar */}
      <RankDisplay totalXp={totalXp} />

      {/* Surah list */}
      <div>
        {surahs.map(surah => {
          const progress = getProgress(surah.id);
          const percent = getCompletionPercent(surah.id);
          return (
            <SurahRow
              key={surah.id}
              surah={surah}
              completionPercent={percent}
              isComplete={progress.isComplete || progress.markedComplete}
              onTap={() => setActiveSurah(surah)}
              onLongPress={() => {
                if (!progress.isComplete && !progress.markedComplete) {
                  setConfirmSurah(surah);
                }
              }}
            />
          );
        })}
      </div>

      {/* Confirm sheet */}
      {confirmSurah && (
        <ConfirmSheet
          surah={confirmSurah}
          onConfirm={handleConfirmMark}
          onCancel={() => setConfirmSurah(null)}
        />
      )}

      {/* XP popup */}
      {lastXpGain && (
        <XpPopup amount={lastXpGain.amount} onDone={clearLastXpGain} />
      )}
    </div>
  );
};

export default Index;
