import { useState, useCallback } from 'react';
import { ArrowLeft, Play, Pause, Repeat, Eye, EyeOff, ChevronRight } from 'lucide-react';
import { type Surah } from '@/data/surahs';

interface SurahReaderProps {
  surah: Surah;
  memorizedAyahs: number;
  onBack: () => void;
  onAdvanceAyah: () => void;
}

// Sample ayah texts for demonstration (Bismillah + first few ayahs)
function getAyahTexts(surah: Surah): string[] {
  const bismillah = "بِسْمِ اللَّهِ الرَّحْمَـٰنِ الرَّحِيمِ";
  
  const sampleTexts: Record<number, string[]> = {
    1: [bismillah, "الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ", "الرَّحْمَـٰنِ الرَّحِيمِ", "مَالِكِ يَوْمِ الدِّينِ", "إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ", "اهْدِنَا الصِّرَاطَ الْمُسْتَقِيمَ", "صِرَاطَ الَّذِينَ أَنْعَمْتَ عَلَيْهِمْ غَيْرِ الْمَغْضُوبِ عَلَيْهِمْ وَلَا الضَّالِّينَ"],
    112: [bismillah, "قُلْ هُوَ اللَّهُ أَحَدٌ", "اللَّهُ الصَّمَدُ", "لَمْ يَلِدْ وَلَمْ يُولَدْ", "وَلَمْ يَكُن لَّهُ كُفُوًا أَحَدٌ"],
    113: [bismillah, "قُلْ أَعُوذُ بِرَبِّ الْفَلَقِ", "مِن شَرِّ مَا خَلَقَ", "وَمِن شَرِّ غَاسِقٍ إِذَا وَقَبَ", "وَمِن شَرِّ النَّفَّاثَاتِ فِي الْعُقَدِ", "وَمِن شَرِّ حَاسِدٍ إِذَا حَسَدَ"],
    114: [bismillah, "قُلْ أَعُوذُ بِرَبِّ النَّاسِ", "مَلِكِ النَّاسِ", "إِلَـٰهِ النَّاسِ", "مِن شَرِّ الْوَسْوَاسِ الْخَنَّاسِ", "الَّذِي يُوَسْوِسُ فِي صُدُورِ النَّاسِ", "مِنَ الْجِنَّةِ وَالنَّاسِ"],
  };

  if (sampleTexts[surah.id]) return sampleTexts[surah.id];

  // Generate placeholder ayahs for other surahs
  const texts = [bismillah];
  for (let i = 1; i < Math.min(surah.ayahCount, 10); i++) {
    texts.push(`﴿ آية ${i} — ${surah.nameArabic} ﴾`);
  }
  if (surah.ayahCount > 10) {
    texts.push(`... و ${surah.ayahCount - 10} آيات أخرى`);
  }
  return texts;
}

export function SurahReader({ surah, memorizedAyahs, onBack, onAdvanceAyah }: SurahReaderProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [focusMode, setFocusMode] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [currentAyah, setCurrentAyah] = useState(0);

  const ayahs = getAyahTexts(surah);

  const handleTapContent = useCallback(() => {
    if (focusMode) {
      setShowControls(prev => !prev);
    }
  }, [focusMode]);

  const toggleFocus = useCallback(() => {
    setFocusMode(prev => {
      if (!prev) setShowControls(false);
      else setShowControls(true);
      return !prev;
    });
  }, []);

  const handleNext = useCallback(() => {
    if (currentAyah < ayahs.length - 1) {
      setCurrentAyah(prev => prev + 1);
      onAdvanceAyah();
    }
  }, [currentAyah, ayahs.length, onAdvanceAyah]);

  return (
    <div className="fixed inset-0 bg-background z-30 flex flex-col">
      {/* Header */}
      {(!focusMode || showControls) && (
        <div className="fade-in flex items-center justify-between px-4 border-b border-border" style={{ height: '48px', flexShrink: 0 }}>
          <button onClick={onBack} className="flex items-center gap-1.5 text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft style={{ width: '16px', height: '16px' }} />
            <span style={{ fontSize: '13px' }}>Back</span>
          </button>
          <div className="text-center">
            <span className="text-foreground" style={{ fontSize: '14px', fontWeight: 500 }}>{surah.name}</span>
          </div>
          <button onClick={toggleFocus} className="text-muted-foreground hover:text-foreground transition-colors">
            {focusMode ? <EyeOff style={{ width: '16px', height: '16px' }} /> : <Eye style={{ width: '16px', height: '16px' }} />}
          </button>
        </div>
      )}

      {/* Quran text area */}
      <div
        className="flex-1 overflow-auto flex flex-col items-center justify-start px-6 py-8"
        onClick={handleTapContent}
        dir="rtl"
      >
        <div className="max-w-lg w-full space-y-6">
          {ayahs.map((text, i) => (
            <p
              key={i}
              className={`font-quran text-center leading-loose transition-opacity duration-300 ${
                i <= currentAyah ? 'text-foreground' : 'text-muted-foreground/40'
              }`}
              style={{
                fontSize: i === 0 ? '22px' : '26px',
                lineHeight: '2.2',
              }}
            >
              {text}
              {i > 0 && (
                <span className="text-muted-foreground/30 mx-1" style={{ fontSize: '14px' }}>
                  ﴿{i}﴾
                </span>
              )}
            </p>
          ))}
        </div>
      </div>

      {/* Bottom action layer */}
      {(!focusMode || showControls) && (
        <div className="fade-in border-t border-border bg-background" style={{ flexShrink: 0 }}>
          {/* Progress indicator */}
          <div className="px-4 py-2 flex items-center justify-between">
            <span className="text-muted-foreground" style={{ fontSize: '11px' }}>
              Ayah {currentAyah + 1} / {ayahs.length}
            </span>
            <span className="text-muted-foreground" style={{ fontSize: '11px' }}>
              {memorizedAyahs} memorized
            </span>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-center gap-6 pb-6 pt-1">
            <button className="text-muted-foreground hover:text-foreground transition-colors p-2">
              <Repeat style={{ width: '18px', height: '18px' }} />
            </button>
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="flex items-center justify-center rounded-full bg-primary text-primary-foreground transition-colors hover:bg-primary/90"
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
