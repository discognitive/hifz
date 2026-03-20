import { useState, useCallback, useEffect, useRef } from 'react';
import { ArrowLeft, Play, Pause, Repeat, Eye, EyeOff, ChevronRight, Loader2 } from 'lucide-react';
import { type Surah } from '@/data/surahs';
import { fetchSurahAyahs, fetchAyahTimings, getSurahAudioUrl, type AyahData, type AyahTiming } from '@/services/quranApi';

interface SurahReaderProps {
  surah: Surah;
  memorizedAyahs: number;
  onBack: () => void;
  onAdvanceAyah: () => void;
}

export function SurahReader({ surah, memorizedAyahs, onBack, onAdvanceAyah }: SurahReaderProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLooping, setIsLooping] = useState(false);
  const [focusMode, setFocusMode] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [currentAyah, setCurrentAyah] = useState(0);
  const [ayahs, setAyahs] = useState<AyahData[]>([]);
  const [timings, setTimings] = useState<AyahTiming[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const ayahRefs = useRef<(HTMLParagraphElement | null)[]>([]);
  const isPlayingRef = useRef(false);
  const syncIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Fetch surah text + timings
  useEffect(() => {
    setLoading(true);
    setError(null);
    Promise.all([
      fetchSurahAyahs(surah.id),
      fetchAyahTimings(surah.id),
    ])
      .then(([ayahData, timingData]) => {
        setAyahs(ayahData);
        setTimings(timingData);
        setLoading(false);
      })
      .catch(() => {
        setError('Failed to load surah');
        setLoading(false);
      });
  }, [surah.id]);

  // Scroll to current ayah
  useEffect(() => {
    const el = ayahRefs.current[currentAyah];
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, [currentAyah]);

  // Start time-based sync to update currentAyah based on audio position
  const startSync = useCallback(() => {
    stopSync();
    syncIntervalRef.current = setInterval(() => {
      const audio = audioRef.current;
      if (!audio || !timings.length) return;
      const currentMs = audio.currentTime * 1000;
      for (let i = timings.length - 1; i >= 0; i--) {
        if (currentMs >= timings[i].start_time) {
          setCurrentAyah(prev => {
            if (prev !== i) {
              onAdvanceAyah();
              return i;
            }
            return prev;
          });
          break;
        }
      }
    }, 150);
  }, [timings, onAdvanceAyah]);

  const stopSync = useCallback(() => {
    if (syncIntervalRef.current) {
      clearInterval(syncIntervalRef.current);
      syncIntervalRef.current = null;
    }
  }, []);

  // Create or get audio element for the full surah
  const getAudio = useCallback(() => {
    if (!audioRef.current) {
      const audio = new Audio(getSurahAudioUrl(surah.id));
      audio.preload = 'auto';
      audioRef.current = audio;

      audio.onended = () => {
        if (isLooping && isPlayingRef.current) {
          audio.currentTime = 0;
          audio.play();
        } else {
          setIsPlaying(false);
          isPlayingRef.current = false;
          stopSync();
        }
      };
    }
    return audioRef.current;
  }, [surah.id, isLooping, stopSync]);

  const seekToAyah = useCallback((index: number) => {
    if (!timings[index]) return;
    const audio = getAudio();
    audio.currentTime = timings[index].start_time / 1000;
  }, [timings, getAudio]);

  const handleTapAyah = useCallback((index: number) => {
    setCurrentAyah(index);
    const audio = getAudio();
    seekToAyah(index);
    setIsPlaying(true);
    isPlayingRef.current = true;
    audio.play().catch(() => {
      setIsPlaying(false);
      isPlayingRef.current = false;
    });
    startSync();
  }, [getAudio, seekToAyah, startSync]);

  const togglePlayPause = useCallback(() => {
    const audio = getAudio();
    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
      isPlayingRef.current = false;
      stopSync();
    } else {
      if (timings[currentAyah] && audio.currentTime < timings[currentAyah].start_time / 1000) {
        seekToAyah(currentAyah);
      }
      setIsPlaying(true);
      isPlayingRef.current = true;
      audio.play().catch(() => {
        setIsPlaying(false);
        isPlayingRef.current = false;
      });
      startSync();
    }
  }, [isPlaying, currentAyah, getAudio, seekToAyah, startSync, stopSync, timings]);

  const handleNext = useCallback(() => {
    if (currentAyah < ayahs.length - 1) {
      const next = currentAyah + 1;
      setCurrentAyah(next);
      if (isPlaying) {
        seekToAyah(next);
      }
    }
  }, [currentAyah, ayahs.length, isPlaying, seekToAyah]);

  const handleTapContent = useCallback(() => {
    if (focusMode) setShowControls(prev => !prev);
  }, [focusMode]);

  const toggleFocus = useCallback(() => {
    setFocusMode(prev => {
      if (!prev) setShowControls(false);
      else setShowControls(true);
      return !prev;
    });
  }, []);

  // Cleanup audio on unmount
  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
      isPlayingRef.current = false;
      stopSync();
    };
  }, [stopSync]);

  return (
    <div className="fixed inset-0 bg-background z-30 flex flex-col">
      {/* Header */}
      {(!focusMode || showControls) && (
        <div className="fade-in flex items-center justify-between px-4 border-b border-border" style={{ height: '48px', flexShrink: 0 }}>
          <button
            onClick={onBack}
            className="flex items-center gap-1 text-muted-foreground hover:text-foreground transition-colors active:opacity-60"
            style={{ padding: '6px 2px' }}
          >
            <ArrowLeft style={{ width: '18px', height: '18px' }} />
          </button>
          <div className="text-center">
            <span className="text-foreground" style={{ fontSize: '14px', fontWeight: 500 }}>{surah.name}</span>
          </div>
          <button onClick={toggleFocus} className="text-muted-foreground hover:text-foreground transition-colors active:opacity-60" style={{ padding: '6px 2px' }}>
            {focusMode ? <EyeOff style={{ width: '16px', height: '16px' }} /> : <Eye style={{ width: '16px', height: '16px' }} />}
          </button>
        </div>
      )}

      {/* Content */}
      <div
        className="flex-1 overflow-auto flex flex-col items-center justify-start px-5 py-8"
        onClick={handleTapContent}
        dir="rtl"
      >
        {loading && (
          <div className="flex-1 flex items-center justify-center">
            <Loader2 className="text-muted-foreground animate-spin" style={{ width: '20px', height: '20px' }} />
          </div>
        )}

        {error && (
          <div className="flex-1 flex items-center justify-center">
            <p className="text-muted-foreground" style={{ fontSize: '13px' }}>{error}</p>
          </div>
        )}

        {!loading && !error && (
          <div className="max-w-lg w-full space-y-4">
            {/* Bismillah for surahs other than At-Tawbah */}
            {surah.id !== 9 && surah.id !== 1 && (
              <p className="font-quran text-center text-foreground" style={{ fontSize: '22px', lineHeight: '2', marginBottom: '12px' }}>
                بِسْمِ ٱللَّهِ ٱلرَّحْمَـٰنِ ٱلرَّحِيمِ
              </p>
            )}

            {ayahs.map((ayah, i) => (
              <p
                key={ayah.numberInSurah}
                ref={el => { ayahRefs.current[i] = el; }}
                onClick={(e) => { e.stopPropagation(); handleTapAyah(i); }}
                className={`font-quran text-center cursor-pointer transition-all duration-300 ${
                  i === currentAyah
                    ? 'text-foreground'
                    : 'text-foreground'
                }`}
                style={{
                  fontSize: '24px',
                  lineHeight: '2.4',
                  padding: '4px 10px',
                  borderRadius: '6px',
                  backgroundColor: i === currentAyah ? 'hsl(var(--accent) / 0.5)' : 'transparent',
                  opacity: i === currentAyah ? 1 : i < currentAyah ? 0.7 : 0.85,
                }}
              >
                {ayah.text}
                <span className="text-muted-foreground/50 mx-1" style={{ fontSize: '13px' }}>
                  ﴿{ayah.numberInSurah}﴾
                </span>
              </p>
            ))}
          </div>
        )}
      </div>

      {/* Bottom controls */}
      {(!focusMode || showControls) && !loading && (
        <div className="fade-in border-t border-border bg-background" style={{ flexShrink: 0 }}>
          <div className="px-4 py-2 flex items-center justify-between">
            <span className="text-muted-foreground" style={{ fontSize: '11px' }}>
              Ayah {currentAyah + 1} / {ayahs.length}
            </span>
            <span className="text-muted-foreground" style={{ fontSize: '11px' }}>
              {memorizedAyahs} memorized
            </span>
          </div>

          <div className="flex items-center justify-center gap-6 pb-6 pt-1">
            <button
              onClick={() => setIsLooping(!isLooping)}
              className={`transition-colors p-2 ${isLooping ? 'text-foreground' : 'text-muted-foreground hover:text-foreground'}`}
            >
              <Repeat style={{ width: '18px', height: '18px' }} />
            </button>
            <button
              onClick={togglePlayPause}
              className="flex items-center justify-center rounded-full bg-primary text-primary-foreground transition-colors hover:bg-primary/90 active:scale-95"
              style={{ width: '44px', height: '44px' }}
            >
              {isPlaying
                ? <Pause style={{ width: '18px', height: '18px' }} />
                : <Play style={{ width: '18px', height: '18px', marginLeft: '2px' }} />
              }
            </button>
            <button
              onClick={handleNext}
              className="text-muted-foreground hover:text-foreground transition-colors p-2"
            >
              <ChevronRight style={{ width: '18px', height: '18px' }} />
            </button>
          </div>

          <div className="text-center pb-3">
            <span className="text-muted-foreground" style={{ fontSize: '10px' }}>
              Mansour Al Salmi
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
