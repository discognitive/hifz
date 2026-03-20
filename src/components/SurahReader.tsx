import { useState, useCallback, useEffect, useRef } from 'react';
import { ArrowLeft, Play, Pause, Repeat, Eye, EyeOff, ChevronRight, Loader2 } from 'lucide-react';
import { type Surah } from '@/data/surahs';
import { fetchSurahAyahs, preloadAudio, type AyahData } from '@/services/quranApi';

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
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const ayahRefs = useRef<(HTMLParagraphElement | null)[]>([]);
  const isPlayingRef = useRef(false);

  // Fetch surah text
  useEffect(() => {
    setLoading(true);
    setError(null);
    fetchSurahAyahs(surah.id)
      .then(data => {
        setAyahs(data);
        setLoading(false);
        // Preload first few audio segments
        if (data.length > 0) {
          preloadAudio(data.slice(0, 3).map(a => a.audioUrl));
        }
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

  // Preload next audio segments
  useEffect(() => {
    if (ayahs.length > 0 && currentAyah < ayahs.length - 1) {
      const upcoming = ayahs.slice(currentAyah + 1, currentAyah + 3).map(a => a.audioUrl);
      preloadAudio(upcoming);
    }
  }, [currentAyah, ayahs]);

  const playAyah = useCallback((index: number) => {
    if (!ayahs[index]) return;

    // Stop current audio
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.removeAttribute('src');
    }

    const audio = new Audio(ayahs[index].audioUrl);
    audioRef.current = audio;

    audio.onended = () => {
      if (isPlayingRef.current) {
        if (isLooping) {
          // Replay same ayah
          audio.currentTime = 0;
          audio.play();
        } else if (index < ayahs.length - 1) {
          // Advance to next
          const nextIndex = index + 1;
          setCurrentAyah(nextIndex);
          onAdvanceAyah();
          playAyah(nextIndex);
        } else {
          // End of surah
          setIsPlaying(false);
          isPlayingRef.current = false;
        }
      }
    };

    audio.play().catch(() => {
      setIsPlaying(false);
      isPlayingRef.current = false;
    });
  }, [ayahs, isLooping, onAdvanceAyah]);

  const handleTapAyah = useCallback((index: number) => {
    setCurrentAyah(index);
    setIsPlaying(true);
    isPlayingRef.current = true;
    playAyah(index);
  }, [playAyah]);

  const togglePlayPause = useCallback(() => {
    if (isPlaying) {
      audioRef.current?.pause();
      setIsPlaying(false);
      isPlayingRef.current = false;
    } else {
      setIsPlaying(true);
      isPlayingRef.current = true;
      playAyah(currentAyah);
    }
  }, [isPlaying, currentAyah, playAyah]);

  const handleNext = useCallback(() => {
    if (currentAyah < ayahs.length - 1) {
      const next = currentAyah + 1;
      setCurrentAyah(next);
      if (isPlaying) {
        playAyah(next);
      }
    }
  }, [currentAyah, ayahs.length, isPlaying, playAyah]);

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
    };
  }, []);

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
              <p className="font-quran text-center text-muted-foreground" style={{ fontSize: '22px', lineHeight: '2', marginBottom: '12px' }}>
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
                    : i < currentAyah
                    ? 'text-foreground/70'
                    : 'text-muted-foreground/50'
                }`}
                style={{
                  fontSize: '24px',
                  lineHeight: '2.4',
                  padding: '4px 10px',
                  borderRadius: '6px',
                  backgroundColor: i === currentAyah ? 'hsl(var(--accent) / 0.5)' : 'transparent',
                }}
              >
                {ayah.text}
                <span className="text-muted-foreground/30 mx-1" style={{ fontSize: '13px' }}>
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
              Mishary Alafasy
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
