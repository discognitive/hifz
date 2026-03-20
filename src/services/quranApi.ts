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

const BISMILLAH_API = '\u0628\u0650\u0633\u0652\u0645\u0650 \u0671\u0644\u0644\u0651\u064e\u0647\u0650 \u0671\u0644\u0631\u0651\u064e\u062d\u0652\u0645\u064e\u0670\u0646\u0650 \u0671\u0644\u0631\u0651\u064e\u062d\u0650\u064a\u0645\u0650';

function stripBismillah(text: string): string {
  if (text.startsWith(BISMILLAH_API)) {
    return text.slice(BISMILLAH_API.length).trim();
  }
  return text;
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
    //if (a.numberInSurah === 1 && surahId !== 1 && surahId !== 9) {
      text = stripBismillah(text);
    //}
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
