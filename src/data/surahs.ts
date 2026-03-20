export interface Surah {
  id: number;
  name: string;
  nameArabic: string;
  ayahCount: number;
  difficulty: number; // 1–11
  xpReward: number;
  revelationType: 'meccan' | 'medinan';
}

// Difficulty based on length, linguistic complexity, and memorization challenge
export const surahs: Surah[] = [
  { id: 1, name: "Al-Fatihah", nameArabic: "الفاتحة", ayahCount: 7, difficulty: 1, xpReward: 10, revelationType: "meccan" },
  { id: 2, name: "Al-Baqarah", nameArabic: "البقرة", ayahCount: 286, difficulty: 11, xpReward: 500, revelationType: "medinan" },
  { id: 3, name: "Aal-E-Imran", nameArabic: "آل عمران", ayahCount: 200, difficulty: 10, xpReward: 400, revelationType: "medinan" },
  { id: 4, name: "An-Nisa", nameArabic: "النساء", ayahCount: 176, difficulty: 10, xpReward: 380, revelationType: "medinan" },
  { id: 5, name: "Al-Ma'idah", nameArabic: "المائدة", ayahCount: 120, difficulty: 9, xpReward: 300, revelationType: "medinan" },
  { id: 6, name: "Al-An'am", nameArabic: "الأنعام", ayahCount: 165, difficulty: 9, xpReward: 350, revelationType: "meccan" },
  { id: 7, name: "Al-A'raf", nameArabic: "الأعراف", ayahCount: 206, difficulty: 10, xpReward: 410, revelationType: "meccan" },
  { id: 18, name: "Al-Kahf", nameArabic: "الكهف", ayahCount: 110, difficulty: 8, xpReward: 280, revelationType: "meccan" },
  { id: 19, name: "Maryam", nameArabic: "مريم", ayahCount: 98, difficulty: 7, xpReward: 220, revelationType: "meccan" },
  { id: 36, name: "Ya-Sin", nameArabic: "يس", ayahCount: 83, difficulty: 7, xpReward: 200, revelationType: "meccan" },
  { id: 55, name: "Ar-Rahman", nameArabic: "الرحمن", ayahCount: 78, difficulty: 5, xpReward: 150, revelationType: "medinan" },
  { id: 56, name: "Al-Waqi'ah", nameArabic: "الواقعة", ayahCount: 96, difficulty: 7, xpReward: 210, revelationType: "meccan" },
  { id: 67, name: "Al-Mulk", nameArabic: "الملك", ayahCount: 30, difficulty: 6, xpReward: 120, revelationType: "meccan" },
  { id: 72, name: "Al-Jinn", nameArabic: "الجن", ayahCount: 28, difficulty: 5, xpReward: 100, revelationType: "meccan" },
  { id: 73, name: "Al-Muzzammil", nameArabic: "المزمل", ayahCount: 20, difficulty: 4, xpReward: 80, revelationType: "meccan" },
  { id: 74, name: "Al-Muddaththir", nameArabic: "المدثر", ayahCount: 56, difficulty: 6, xpReward: 130, revelationType: "meccan" },
  { id: 78, name: "An-Naba", nameArabic: "النبأ", ayahCount: 40, difficulty: 5, xpReward: 100, revelationType: "meccan" },
  { id: 87, name: "Al-A'la", nameArabic: "الأعلى", ayahCount: 19, difficulty: 2, xpReward: 40, revelationType: "meccan" },
  { id: 88, name: "Al-Ghashiyah", nameArabic: "الغاشية", ayahCount: 26, difficulty: 3, xpReward: 60, revelationType: "meccan" },
  { id: 89, name: "Al-Fajr", nameArabic: "الفجر", ayahCount: 30, difficulty: 4, xpReward: 80, revelationType: "meccan" },
  { id: 90, name: "Al-Balad", nameArabic: "البلد", ayahCount: 20, difficulty: 3, xpReward: 50, revelationType: "meccan" },
  { id: 91, name: "Ash-Shams", nameArabic: "الشمس", ayahCount: 15, difficulty: 2, xpReward: 35, revelationType: "meccan" },
  { id: 92, name: "Al-Layl", nameArabic: "الليل", ayahCount: 21, difficulty: 2, xpReward: 40, revelationType: "meccan" },
  { id: 93, name: "Ad-Duha", nameArabic: "الضحى", ayahCount: 11, difficulty: 1, xpReward: 20, revelationType: "meccan" },
  { id: 94, name: "Ash-Sharh", nameArabic: "الشرح", ayahCount: 8, difficulty: 1, xpReward: 15, revelationType: "meccan" },
  { id: 95, name: "At-Tin", nameArabic: "التين", ayahCount: 8, difficulty: 1, xpReward: 15, revelationType: "meccan" },
  { id: 96, name: "Al-Alaq", nameArabic: "العلق", ayahCount: 19, difficulty: 3, xpReward: 50, revelationType: "meccan" },
  { id: 97, name: "Al-Qadr", nameArabic: "القدر", ayahCount: 5, difficulty: 1, xpReward: 10, revelationType: "meccan" },
  { id: 99, name: "Az-Zalzalah", nameArabic: "الزلزلة", ayahCount: 8, difficulty: 1, xpReward: 15, revelationType: "medinan" },
  { id: 100, name: "Al-Adiyat", nameArabic: "العاديات", ayahCount: 11, difficulty: 2, xpReward: 30, revelationType: "meccan" },
  { id: 101, name: "Al-Qari'ah", nameArabic: "القارعة", ayahCount: 11, difficulty: 2, xpReward: 25, revelationType: "meccan" },
  { id: 102, name: "At-Takathur", nameArabic: "التكاثر", ayahCount: 8, difficulty: 1, xpReward: 15, revelationType: "meccan" },
  { id: 103, name: "Al-Asr", nameArabic: "العصر", ayahCount: 3, difficulty: 1, xpReward: 10, revelationType: "meccan" },
  { id: 104, name: "Al-Humazah", nameArabic: "الهمزة", ayahCount: 9, difficulty: 1, xpReward: 15, revelationType: "meccan" },
  { id: 105, name: "Al-Fil", nameArabic: "الفيل", ayahCount: 5, difficulty: 1, xpReward: 10, revelationType: "meccan" },
  { id: 106, name: "Quraysh", nameArabic: "قريش", ayahCount: 4, difficulty: 1, xpReward: 10, revelationType: "meccan" },
  { id: 107, name: "Al-Ma'un", nameArabic: "الماعون", ayahCount: 7, difficulty: 1, xpReward: 10, revelationType: "meccan" },
  { id: 108, name: "Al-Kawthar", nameArabic: "الكوثر", ayahCount: 3, difficulty: 1, xpReward: 10, revelationType: "meccan" },
  { id: 109, name: "Al-Kafirun", nameArabic: "الكافرون", ayahCount: 6, difficulty: 1, xpReward: 10, revelationType: "meccan" },
  { id: 110, name: "An-Nasr", nameArabic: "النصر", ayahCount: 3, difficulty: 1, xpReward: 10, revelationType: "meccan" },
  { id: 111, name: "Al-Masad", nameArabic: "المسد", ayahCount: 5, difficulty: 1, xpReward: 10, revelationType: "meccan" },
  { id: 112, name: "Al-Ikhlas", nameArabic: "الإخلاص", ayahCount: 4, difficulty: 1, xpReward: 10, revelationType: "meccan" },
  { id: 113, name: "Al-Falaq", nameArabic: "الفلق", ayahCount: 5, difficulty: 1, xpReward: 10, revelationType: "meccan" },
  { id: 114, name: "An-Nas", nameArabic: "الناس", ayahCount: 6, difficulty: 1, xpReward: 10, revelationType: "meccan" },
];

export const RANKS = [
  { name: "Beginner", minXp: 0, color: "rank-bronze" },
  { name: "Reciter", minXp: 50, color: "rank-bronze" },
  { name: "Memorizer", minXp: 200, color: "rank-silver" },
  { name: "Hafiz Student", minXp: 500, color: "rank-silver" },
  { name: "Advanced", minXp: 1200, color: "rank-gold" },
  { name: "Scholar", minXp: 2500, color: "rank-gold" },
  { name: "Master", minXp: 4000, color: "rank-emerald" },
  { name: "Hafiz", minXp: 6000, color: "rank-diamond" },
] as const;

export function getRank(xp: number) {
  let current = RANKS[0];
  let next = RANKS[1];
  for (let i = RANKS.length - 1; i >= 0; i--) {
    if (xp >= RANKS[i].minXp) {
      current = RANKS[i];
      next = RANKS[i + 1] || RANKS[i];
      break;
    }
  }
  return { current, next };
}

export function getDifficultyColor(difficulty: number): string {
  return `diff-${difficulty}` as const;
}
