import { useState, useCallback, useEffect } from 'react';
import { surahs } from '@/data/surahs';

interface SurahProgress {
  memorizedAyahs: number;
  isComplete: boolean;
  markedComplete: boolean; // manually marked
}

interface MemorizationState {
  progress: Record<number, SurahProgress>;
  totalXp: number;
  lastXpGain: { amount: number; surahId: number; timestamp: number } | null;
}

const STORAGE_KEY = 'quran-memorization-state';

function loadState(): MemorizationState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch {}
  return { progress: {}, totalXp: 0, lastXpGain: null };
}

function saveState(state: MemorizationState) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

export function useMemorization() {
  const [state, setState] = useState<MemorizationState>(loadState);

  useEffect(() => {
    saveState(state);
  }, [state]);

  const getProgress = useCallback((surahId: number): SurahProgress => {
    return state.progress[surahId] || { memorizedAyahs: 0, isComplete: false, markedComplete: false };
  }, [state.progress]);

  const getCompletionPercent = useCallback((surahId: number): number => {
    const surah = surahs.find(s => s.id === surahId);
    if (!surah) return 0;
    const p = getProgress(surahId);
    if (p.isComplete || p.markedComplete) return 100;
    return Math.round((p.memorizedAyahs / surah.ayahCount) * 100);
  }, [getProgress]);

  const markAsMemorized = useCallback((surahId: number) => {
    const surah = surahs.find(s => s.id === surahId);
    if (!surah) return;
    const existing = state.progress[surahId];
    if (existing?.isComplete || existing?.markedComplete) return;

    setState(prev => ({
      ...prev,
      progress: {
        ...prev.progress,
        [surahId]: {
          memorizedAyahs: surah.ayahCount,
          isComplete: true,
          markedComplete: true,
        },
      },
      totalXp: prev.totalXp + surah.xpReward,
      lastXpGain: { amount: surah.xpReward, surahId, timestamp: Date.now() },
    }));
  }, [state.progress]);

  const advanceAyah = useCallback((surahId: number) => {
    const surah = surahs.find(s => s.id === surahId);
    if (!surah) return;
    const existing = getProgress(surahId);
    if (existing.isComplete) return;

    const newCount = Math.min(existing.memorizedAyahs + 1, surah.ayahCount);
    const isNowComplete = newCount >= surah.ayahCount;

    setState(prev => ({
      ...prev,
      progress: {
        ...prev.progress,
        [surahId]: {
          memorizedAyahs: newCount,
          isComplete: isNowComplete,
          markedComplete: false,
        },
      },
      totalXp: isNowComplete ? prev.totalXp + surah.xpReward : prev.totalXp,
      lastXpGain: isNowComplete ? { amount: surah.xpReward, surahId, timestamp: Date.now() } : prev.lastXpGain,
    }));
  }, [getProgress]);

  const clearLastXpGain = useCallback(() => {
    setState(prev => ({ ...prev, lastXpGain: null }));
  }, []);

  return {
    progress: state.progress,
    totalXp: state.totalXp,
    lastXpGain: state.lastXpGain,
    getProgress,
    getCompletionPercent,
    markAsMemorized,
    advanceAyah,
    clearLastXpGain,
  };
}
