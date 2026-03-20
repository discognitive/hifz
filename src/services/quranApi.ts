export interface AyahData {
  number: number;        // ayah number within surah
  numberInSurah: number;
  text: string;          // Uthmani text
}

export interface AyahTiming {
  ayah: number;          // ayah number within surah (1-based)
  start_time: number;    // milliseconds
  end_time: number;      // milliseconds
}

interface ApiAyah {
  number: number;
  numberInSurah: number;
  text: string;
}

const textCache = new Map<number, AyahData[]>();
const timingCache = new Map<number, AyahTiming[]>();
const preloadQueue = new Set<number>();

// Mansour Al Salmi reciter ID on mp3quran.net
const RECITER_READ_ID = 245;
const AUDIO_SERVER = 'https://server14.mp3quran.net/mansor/';

// Build full surah audio URL for Mansour Al Salmi
export function getSurahAudioUrl(surahNumber: number): string {
  const s = String(surahNumber).padStart(3, '0');
  return `${AUDIO_SERVER}${s}.mp3`;
}

// Fetch ayah timing data for a surah (start/end times in ms)
export async function fetchAyahTimings(surahId: number): Promise<AyahTiming[]> {
  if (timingCache.has(surahId)) {
    return timingCache.get(surahId)!;
  }

  const res = await fetch(
    `https://mp3quran.net/api/v3/ayat_timing?surah=${surahId}&read=${RECITER_READ_ID}`
  );

  if (!res.ok) return [];

  const json: { ayah: number; start_time: number; end_time: number }[] = await res.json();
  const timings: AyahTiming[] = json.map(t => ({
    ayah: t.ayah,
    start_time: t.start_time,
    end_time: t.end_time,
  }));

  timingCache.set(surahId, timings);
  return timings;
}

// Normalize Arabic text by removing diacritics for comparison
function stripDiacritics(text: string): string {
  return text.replace(/[\u0610-\u061A\u064B-\u065F\u0670\u06D6-\u06DC\u06DF-\u06E4\u06E7\u06E8\u06EA-\u06ED\u0890\u0891\u08D3-\u08FF]/g, '');
}

const BISMILLAH_BASE = 'بسم الله الرحمن الرحيم';

function stripBismillah(text: string): string {
  const stripped = stripDiacritics(text).replace(/\s+/g, ' ').trim();
  const base = BISMILLAH_BASE.replace(/\s+/g, ' ').trim();

  if (!stripped.startsWith(base)) return text;

  // Walk the original text, skipping chars until we've matched
  // the full Bismillah (ignoring diacritics)
  let matched = 0;
  const target = base.replace(/\s/g, ''); // base without spaces for char counting
  let i = 0;

  for (; i < text.length && matched < target.length; i++) {
    const plain = stripDiacritics(text[i]);
    if (plain.trim().length > 0) matched++; // non-diacritic, non-space char
  }

  // Skip any trailing whitespace/diacritics after the match
  while (i < text.length && /[\s\u0610-\u061A\u064B-\u065F]/.test(text[i])) i++;

  return text.slice(i).trim();
}

export async function fetchSurahAyahs(surahId: number): Promise<AyahData[]> {
  if (textCache.has(surahId)) {
    return textCache.get(surahId)!;
  }

  const res = await fetch(
    `https://api.alquran.cloud/v1/surah/${surahId}/quran-uthmani`
  );

  if (!res.ok) throw new Error(`Failed to fetch surah ${surahId}`);

  const json = await res.json();
  const rawData = json.data;
  const rawAyahs: ApiAyah[] = Array.isArray(rawData)
    ? rawData
    : rawData.ayahs;

  const ayahs: AyahData[] = rawAyahs.map((a) => {
    let text = a.text;
    // Strip Bismillah from ayah 1 for all surahs except Al-Fatihah (1) and At-Tawbah (9, has no Bismillah)
    if (a.numberInSurah === 1 && surahId !== 1 && surahId !== 9) {
      text = stripBismillah(text);
    }
    return {
      number: a.number,
      numberInSurah: a.numberInSurah,
      text,
    };
  });

  textCache.set(surahId, ayahs);
  return ayahs;
}

// Preload adjacent surahs for faster navigation
export function preloadSurah(surahId: number) {
  if (textCache.has(surahId) || preloadQueue.has(surahId)) return;
  preloadQueue.add(surahId);
  fetchSurahAyahs(surahId).finally(() => preloadQueue.delete(surahId));
}
