import { useState, useCallback, useMemo } from 'react';
import { surahs, getAllJuz, getSurahsByJuz, SURAH_ALT_NAMES, type Surah } from '@/data/surahs';
import { useMemorization } from '@/hooks/useMemorization';
import { SurahRow } from '@/components/SurahRow';
import { RankDisplay } from '@/components/RankDisplay';
import { ConfirmSheet } from '@/components/ConfirmSheet';
import { XpPopup } from '@/components/XpPopup';
import { SurahReader } from '@/components/SurahReader';
import { Search, X } from 'lucide-react';

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
  const [selectedJuz, setSelectedJuz] = useState<number | null>(null);

  const handleConfirmMark = useCallback(() => {
    if (confirmSurah) {
      markAsMemorized(confirmSurah.id);
      setConfirmSurah(null);
    }
  }, [confirmSurah, markAsMemorized]);

  const filteredSurahs = useMemo(() => {
    if (selectedJuz === null) return surahs;
    return getSurahsByJuz(selectedJuz);
  }, [selectedJuz]);

  const juzList = useMemo(() => getAllJuz(), []);

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

      {/* Juz filter */}
      <div className="border-b border-border">
        <div className="flex items-center gap-1.5 px-4 py-2.5 overflow-x-auto no-scrollbar">
          <button
            onClick={() => setSelectedJuz(null)}
            className={`flex-shrink-0 px-2.5 py-1 rounded-md text-xs font-medium transition-colors ${
              selectedJuz === null
                ? 'bg-foreground text-background'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            All
          </button>
          {juzList.map(juz => (
            <button
              key={juz}
              onClick={() => setSelectedJuz(juz)}
              className={`flex-shrink-0 px-2.5 py-1 rounded-md text-xs font-medium transition-colors tabular-nums ${
                selectedJuz === juz
                  ? 'bg-foreground text-background'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              {juz}
            </button>
          ))}
        </div>
      </div>

      {/* Surah list */}
      <div>
        {filteredSurahs.map(surah => {
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
