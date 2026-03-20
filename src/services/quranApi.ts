export interface AyahData {
  number: number;        // ayah number within surah
  numberInSurah: number;
  text: string;          // Uthmani text
  audioUrl: string;      // per-ayah audio URL
}

interface ApiAyah {
  number: number;
  numberInSurah: number;
  text: string;
  audio?: string;
}

interface ApiResponse {
  code: number;
  data: ApiAyah[] | { ayahs: ApiAyah[] }[];
}

const textCache = new Map<number, AyahData[]>();
const preloadQueue = new Set<number>();

// Build audio URL from everyayah.com for Alafasy (most reliable per-ayah CDN)
function getAudioUrl(surahNumber: number, ayahNumber: number): string {
  const s = String(surahNumber).padStart(3, '0');
  const a = String(ayahNumber).padStart(3, '0');
  return `https://everyayah.com/data/Alafasy_128kbps/${s}${a}.mp3`;
}

export async function fetchSurahAyahs(surahId: number): Promise<AyahData[]> {
  if (textCache.has(surahId)) {
    return textCache.get(surahId)!;
  }

  const res = await fetch(
    `https://api.alquran.cloud/v1/surah/${surahId}/quran-uthmani`
  );

  if (!res.ok) throw new Error(`Failed to fetch surah ${surahId}`);

  const json: ApiResponse = await res.json();
  const rawAyahs = Array.isArray(json.data)
    ? json.data
    : (json.data as { ayahs: ApiAyah[] }).ayahs;

  const ayahs: AyahData[] = rawAyahs.map((a: ApiAyah) => ({
    number: a.number,
    numberInSurah: a.numberInSurah,
    text: a.text,
    audioUrl: getAudioUrl(surahId, a.numberInSurah),
  }));

  textCache.set(surahId, ayahs);
  return ayahs;
}

// Preload adjacent surahs for faster navigation
export function preloadSurah(surahId: number) {
  if (textCache.has(surahId) || preloadQueue.has(surahId)) return;
  preloadQueue.add(surahId);
  fetchSurahAyahs(surahId).finally(() => preloadQueue.delete(surahId));
}

// Preload audio for upcoming ayahs
export function preloadAudio(urls: string[]) {
  urls.forEach(url => {
    const audio = new Audio();
    audio.preload = 'auto';
    audio.src = url;
  });
}
