export interface Surah {
  id: number;
  name: string;
  nameArabic: string;
  ayahCount: number;
  difficulty: number; // 1–11
  xpReward: number;
  revelationType: 'meccan' | 'medinan';
}

function calcXp(ayahCount: number, difficulty: number): number {
  return Math.round(ayahCount * (0.8 + difficulty * 0.4));
}

export const surahs: Surah[] = [
  { id: 1, name: "Al-Fatihah", nameArabic: "الفاتحة", ayahCount: 7, difficulty: 1, xpReward: 10, revelationType: "meccan" },
  { id: 2, name: "Al-Baqarah", nameArabic: "البقرة", ayahCount: 286, difficulty: 11, xpReward: calcXp(286, 11), revelationType: "medinan" },
  { id: 3, name: "Aal-E-Imran", nameArabic: "آل عمران", ayahCount: 200, difficulty: 10, xpReward: calcXp(200, 10), revelationType: "medinan" },
  { id: 4, name: "An-Nisa", nameArabic: "النساء", ayahCount: 176, difficulty: 10, xpReward: calcXp(176, 10), revelationType: "medinan" },
  { id: 5, name: "Al-Ma'idah", nameArabic: "المائدة", ayahCount: 120, difficulty: 9, xpReward: calcXp(120, 9), revelationType: "medinan" },
  { id: 6, name: "Al-An'am", nameArabic: "الأنعام", ayahCount: 165, difficulty: 9, xpReward: calcXp(165, 9), revelationType: "meccan" },
  { id: 7, name: "Al-A'raf", nameArabic: "الأعراف", ayahCount: 206, difficulty: 10, xpReward: calcXp(206, 10), revelationType: "meccan" },
  { id: 8, name: "Al-Anfal", nameArabic: "الأنفال", ayahCount: 75, difficulty: 7, xpReward: calcXp(75, 7), revelationType: "medinan" },
  { id: 9, name: "At-Tawbah", nameArabic: "التوبة", ayahCount: 129, difficulty: 9, xpReward: calcXp(129, 9), revelationType: "medinan" },
  { id: 10, name: "Yunus", nameArabic: "يونس", ayahCount: 109, difficulty: 8, xpReward: calcXp(109, 8), revelationType: "meccan" },
  { id: 11, name: "Hud", nameArabic: "هود", ayahCount: 123, difficulty: 8, xpReward: calcXp(123, 8), revelationType: "meccan" },
  { id: 12, name: "Yusuf", nameArabic: "يوسف", ayahCount: 111, difficulty: 8, xpReward: calcXp(111, 8), revelationType: "meccan" },
  { id: 13, name: "Ar-Ra'd", nameArabic: "الرعد", ayahCount: 43, difficulty: 5, xpReward: calcXp(43, 5), revelationType: "medinan" },
  { id: 14, name: "Ibrahim", nameArabic: "إبراهيم", ayahCount: 52, difficulty: 6, xpReward: calcXp(52, 6), revelationType: "meccan" },
  { id: 15, name: "Al-Hijr", nameArabic: "الحجر", ayahCount: 99, difficulty: 7, xpReward: calcXp(99, 7), revelationType: "meccan" },
  { id: 16, name: "An-Nahl", nameArabic: "النحل", ayahCount: 128, difficulty: 8, xpReward: calcXp(128, 8), revelationType: "meccan" },
  { id: 17, name: "Al-Isra", nameArabic: "الإسراء", ayahCount: 111, difficulty: 8, xpReward: calcXp(111, 8), revelationType: "meccan" },
  { id: 18, name: "Al-Kahf", nameArabic: "الكهف", ayahCount: 110, difficulty: 8, xpReward: calcXp(110, 8), revelationType: "meccan" },
  { id: 19, name: "Maryam", nameArabic: "مريم", ayahCount: 98, difficulty: 7, xpReward: calcXp(98, 7), revelationType: "meccan" },
  { id: 20, name: "Ta-Ha", nameArabic: "طه", ayahCount: 135, difficulty: 9, xpReward: calcXp(135, 9), revelationType: "meccan" },
  { id: 21, name: "Al-Anbiya", nameArabic: "الأنبياء", ayahCount: 112, difficulty: 8, xpReward: calcXp(112, 8), revelationType: "meccan" },
  { id: 22, name: "Al-Hajj", nameArabic: "الحج", ayahCount: 78, difficulty: 7, xpReward: calcXp(78, 7), revelationType: "medinan" },
  { id: 23, name: "Al-Mu'minun", nameArabic: "المؤمنون", ayahCount: 118, difficulty: 8, xpReward: calcXp(118, 8), revelationType: "meccan" },
  { id: 24, name: "An-Nur", nameArabic: "النور", ayahCount: 64, difficulty: 7, xpReward: calcXp(64, 7), revelationType: "medinan" },
  { id: 25, name: "Al-Furqan", nameArabic: "الفرقان", ayahCount: 77, difficulty: 7, xpReward: calcXp(77, 7), revelationType: "meccan" },
  { id: 26, name: "Ash-Shu'ara", nameArabic: "الشعراء", ayahCount: 227, difficulty: 10, xpReward: calcXp(227, 10), revelationType: "meccan" },
  { id: 27, name: "An-Naml", nameArabic: "النمل", ayahCount: 93, difficulty: 7, xpReward: calcXp(93, 7), revelationType: "meccan" },
  { id: 28, name: "Al-Qasas", nameArabic: "القصص", ayahCount: 88, difficulty: 7, xpReward: calcXp(88, 7), revelationType: "meccan" },
  { id: 29, name: "Al-Ankabut", nameArabic: "العنكبوت", ayahCount: 69, difficulty: 6, xpReward: calcXp(69, 6), revelationType: "meccan" },
  { id: 30, name: "Ar-Rum", nameArabic: "الروم", ayahCount: 60, difficulty: 6, xpReward: calcXp(60, 6), revelationType: "meccan" },
  { id: 31, name: "Luqman", nameArabic: "لقمان", ayahCount: 34, difficulty: 4, xpReward: calcXp(34, 4), revelationType: "meccan" },
  { id: 32, name: "As-Sajdah", nameArabic: "السجدة", ayahCount: 30, difficulty: 4, xpReward: calcXp(30, 4), revelationType: "meccan" },
  { id: 33, name: "Al-Ahzab", nameArabic: "الأحزاب", ayahCount: 73, difficulty: 7, xpReward: calcXp(73, 7), revelationType: "medinan" },
  { id: 34, name: "Saba", nameArabic: "سبأ", ayahCount: 54, difficulty: 6, xpReward: calcXp(54, 6), revelationType: "meccan" },
  { id: 35, name: "Fatir", nameArabic: "فاطر", ayahCount: 45, difficulty: 5, xpReward: calcXp(45, 5), revelationType: "meccan" },
  { id: 36, name: "Ya-Sin", nameArabic: "يس", ayahCount: 83, difficulty: 7, xpReward: calcXp(83, 7), revelationType: "meccan" },
  { id: 37, name: "As-Saffat", nameArabic: "الصافات", ayahCount: 182, difficulty: 9, xpReward: calcXp(182, 9), revelationType: "meccan" },
  { id: 38, name: "Sad", nameArabic: "ص", ayahCount: 88, difficulty: 7, xpReward: calcXp(88, 7), revelationType: "meccan" },
  { id: 39, name: "Az-Zumar", nameArabic: "الزمر", ayahCount: 75, difficulty: 7, xpReward: calcXp(75, 7), revelationType: "meccan" },
  { id: 40, name: "Ghafir", nameArabic: "غافر", ayahCount: 85, difficulty: 7, xpReward: calcXp(85, 7), revelationType: "meccan" },
  { id: 41, name: "Fussilat", nameArabic: "فصلت", ayahCount: 54, difficulty: 6, xpReward: calcXp(54, 6), revelationType: "meccan" },
  { id: 42, name: "Ash-Shura", nameArabic: "الشورى", ayahCount: 53, difficulty: 6, xpReward: calcXp(53, 6), revelationType: "meccan" },
  { id: 43, name: "Az-Zukhruf", nameArabic: "الزخرف", ayahCount: 89, difficulty: 7, xpReward: calcXp(89, 7), revelationType: "meccan" },
  { id: 44, name: "Ad-Dukhan", nameArabic: "الدخان", ayahCount: 59, difficulty: 5, xpReward: calcXp(59, 5), revelationType: "meccan" },
  { id: 45, name: "Al-Jathiyah", nameArabic: "الجاثية", ayahCount: 37, difficulty: 5, xpReward: calcXp(37, 5), revelationType: "meccan" },
  { id: 46, name: "Al-Ahqaf", nameArabic: "الأحقاف", ayahCount: 35, difficulty: 5, xpReward: calcXp(35, 5), revelationType: "meccan" },
  { id: 47, name: "Muhammad", nameArabic: "محمد", ayahCount: 38, difficulty: 5, xpReward: calcXp(38, 5), revelationType: "medinan" },
  { id: 48, name: "Al-Fath", nameArabic: "الفتح", ayahCount: 29, difficulty: 4, xpReward: calcXp(29, 4), revelationType: "medinan" },
  { id: 49, name: "Al-Hujurat", nameArabic: "الحجرات", ayahCount: 18, difficulty: 3, xpReward: calcXp(18, 3), revelationType: "medinan" },
  { id: 50, name: "Qaf", nameArabic: "ق", ayahCount: 45, difficulty: 5, xpReward: calcXp(45, 5), revelationType: "meccan" },
  { id: 51, name: "Adh-Dhariyat", nameArabic: "الذاريات", ayahCount: 60, difficulty: 6, xpReward: calcXp(60, 6), revelationType: "meccan" },
  { id: 52, name: "At-Tur", nameArabic: "الطور", ayahCount: 49, difficulty: 5, xpReward: calcXp(49, 5), revelationType: "meccan" },
  { id: 53, name: "An-Najm", nameArabic: "النجم", ayahCount: 62, difficulty: 6, xpReward: calcXp(62, 6), revelationType: "meccan" },
  { id: 54, name: "Al-Qamar", nameArabic: "القمر", ayahCount: 55, difficulty: 5, xpReward: calcXp(55, 5), revelationType: "meccan" },
  { id: 55, name: "Ar-Rahman", nameArabic: "الرحمن", ayahCount: 78, difficulty: 5, xpReward: calcXp(78, 5), revelationType: "medinan" },
  { id: 56, name: "Al-Waqi'ah", nameArabic: "الواقعة", ayahCount: 96, difficulty: 7, xpReward: calcXp(96, 7), revelationType: "meccan" },
  { id: 57, name: "Al-Hadid", nameArabic: "الحديد", ayahCount: 29, difficulty: 4, xpReward: calcXp(29, 4), revelationType: "medinan" },
  { id: 58, name: "Al-Mujadila", nameArabic: "المجادلة", ayahCount: 22, difficulty: 4, xpReward: calcXp(22, 4), revelationType: "medinan" },
  { id: 59, name: "Al-Hashr", nameArabic: "الحشر", ayahCount: 24, difficulty: 4, xpReward: calcXp(24, 4), revelationType: "medinan" },
  { id: 60, name: "Al-Mumtahanah", nameArabic: "الممتحنة", ayahCount: 13, difficulty: 3, xpReward: calcXp(13, 3), revelationType: "medinan" },
  { id: 61, name: "As-Saff", nameArabic: "الصف", ayahCount: 14, difficulty: 3, xpReward: calcXp(14, 3), revelationType: "medinan" },
  { id: 62, name: "Al-Jumu'ah", nameArabic: "الجمعة", ayahCount: 11, difficulty: 2, xpReward: calcXp(11, 2), revelationType: "medinan" },
  { id: 63, name: "Al-Munafiqun", nameArabic: "المنافقون", ayahCount: 11, difficulty: 2, xpReward: calcXp(11, 2), revelationType: "medinan" },
  { id: 64, name: "At-Taghabun", nameArabic: "التغابن", ayahCount: 18, difficulty: 3, xpReward: calcXp(18, 3), revelationType: "medinan" },
  { id: 65, name: "At-Talaq", nameArabic: "الطلاق", ayahCount: 12, difficulty: 2, xpReward: calcXp(12, 2), revelationType: "medinan" },
  { id: 66, name: "At-Tahrim", nameArabic: "التحريم", ayahCount: 12, difficulty: 2, xpReward: calcXp(12, 2), revelationType: "medinan" },
  { id: 67, name: "Al-Mulk", nameArabic: "الملك", ayahCount: 30, difficulty: 5, xpReward: calcXp(30, 5), revelationType: "meccan" },
  { id: 68, name: "Al-Qalam", nameArabic: "القلم", ayahCount: 52, difficulty: 6, xpReward: calcXp(52, 6), revelationType: "meccan" },
  { id: 69, name: "Al-Haqqah", nameArabic: "الحاقة", ayahCount: 52, difficulty: 6, xpReward: calcXp(52, 6), revelationType: "meccan" },
  { id: 70, name: "Al-Ma'arij", nameArabic: "المعارج", ayahCount: 44, difficulty: 5, xpReward: calcXp(44, 5), revelationType: "meccan" },
  { id: 71, name: "Nuh", nameArabic: "نوح", ayahCount: 28, difficulty: 4, xpReward: calcXp(28, 4), revelationType: "meccan" },
  { id: 72, name: "Al-Jinn", nameArabic: "الجن", ayahCount: 28, difficulty: 4, xpReward: calcXp(28, 4), revelationType: "meccan" },
  { id: 73, name: "Al-Muzzammil", nameArabic: "المزمل", ayahCount: 20, difficulty: 3, xpReward: calcXp(20, 3), revelationType: "meccan" },
  { id: 74, name: "Al-Muddaththir", nameArabic: "المدثر", ayahCount: 56, difficulty: 6, xpReward: calcXp(56, 6), revelationType: "meccan" },
  { id: 75, name: "Al-Qiyamah", nameArabic: "القيامة", ayahCount: 40, difficulty: 5, xpReward: calcXp(40, 5), revelationType: "meccan" },
  { id: 76, name: "Al-Insan", nameArabic: "الإنسان", ayahCount: 31, difficulty: 4, xpReward: calcXp(31, 4), revelationType: "medinan" },
  { id: 77, name: "Al-Mursalat", nameArabic: "المرسلات", ayahCount: 50, difficulty: 5, xpReward: calcXp(50, 5), revelationType: "meccan" },
  { id: 78, name: "An-Naba", nameArabic: "النبأ", ayahCount: 40, difficulty: 4, xpReward: calcXp(40, 4), revelationType: "meccan" },
  { id: 79, name: "An-Nazi'at", nameArabic: "النازعات", ayahCount: 46, difficulty: 5, xpReward: calcXp(46, 5), revelationType: "meccan" },
  { id: 80, name: "Abasa", nameArabic: "عبس", ayahCount: 42, difficulty: 5, xpReward: calcXp(42, 5), revelationType: "meccan" },
  { id: 81, name: "At-Takwir", nameArabic: "التكوير", ayahCount: 29, difficulty: 4, xpReward: calcXp(29, 4), revelationType: "meccan" },
  { id: 82, name: "Al-Infitar", nameArabic: "الانفطار", ayahCount: 19, difficulty: 3, xpReward: calcXp(19, 3), revelationType: "meccan" },
  { id: 83, name: "Al-Mutaffifin", nameArabic: "المطففين", ayahCount: 36, difficulty: 4, xpReward: calcXp(36, 4), revelationType: "meccan" },
  { id: 84, name: "Al-Inshiqaq", nameArabic: "الانشقاق", ayahCount: 25, difficulty: 3, xpReward: calcXp(25, 3), revelationType: "meccan" },
  { id: 85, name: "Al-Buruj", nameArabic: "البروج", ayahCount: 22, difficulty: 3, xpReward: calcXp(22, 3), revelationType: "meccan" },
  { id: 86, name: "At-Tariq", nameArabic: "الطارق", ayahCount: 17, difficulty: 2, xpReward: calcXp(17, 2), revelationType: "meccan" },
  { id: 87, name: "Al-A'la", nameArabic: "الأعلى", ayahCount: 19, difficulty: 2, xpReward: calcXp(19, 2), revelationType: "meccan" },
  { id: 88, name: "Al-Ghashiyah", nameArabic: "الغاشية", ayahCount: 26, difficulty: 3, xpReward: calcXp(26, 3), revelationType: "meccan" },
  { id: 89, name: "Al-Fajr", nameArabic: "الفجر", ayahCount: 30, difficulty: 4, xpReward: calcXp(30, 4), revelationType: "meccan" },
  { id: 90, name: "Al-Balad", nameArabic: "البلد", ayahCount: 20, difficulty: 3, xpReward: calcXp(20, 3), revelationType: "meccan" },
  { id: 91, name: "Ash-Shams", nameArabic: "الشمس", ayahCount: 15, difficulty: 2, xpReward: calcXp(15, 2), revelationType: "meccan" },
  { id: 92, name: "Al-Layl", nameArabic: "الليل", ayahCount: 21, difficulty: 2, xpReward: calcXp(21, 2), revelationType: "meccan" },
  { id: 93, name: "Ad-Duha", nameArabic: "الضحى", ayahCount: 11, difficulty: 1, xpReward: 20, revelationType: "meccan" },
  { id: 94, name: "Ash-Sharh", nameArabic: "الشرح", ayahCount: 8, difficulty: 1, xpReward: 15, revelationType: "meccan" },
  { id: 95, name: "At-Tin", nameArabic: "التين", ayahCount: 8, difficulty: 1, xpReward: 15, revelationType: "meccan" },
  { id: 96, name: "Al-Alaq", nameArabic: "العلق", ayahCount: 19, difficulty: 2, xpReward: calcXp(19, 2), revelationType: "meccan" },
  { id: 97, name: "Al-Qadr", nameArabic: "القدر", ayahCount: 5, difficulty: 1, xpReward: 10, revelationType: "meccan" },
  { id: 98, name: "Al-Bayyinah", nameArabic: "البينة", ayahCount: 8, difficulty: 1, xpReward: 15, revelationType: "medinan" },
  { id: 99, name: "Az-Zalzalah", nameArabic: "الزلزلة", ayahCount: 8, difficulty: 1, xpReward: 15, revelationType: "medinan" },
  { id: 100, name: "Al-Adiyat", nameArabic: "العاديات", ayahCount: 11, difficulty: 2, xpReward: calcXp(11, 2), revelationType: "meccan" },
  { id: 101, name: "Al-Qari'ah", nameArabic: "القارعة", ayahCount: 11, difficulty: 2, xpReward: calcXp(11, 2), revelationType: "meccan" },
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

export type Rank = (typeof RANKS)[number];

export function getRank(xp: number): { current: Rank; next: Rank } {
  let current: Rank = RANKS[0];
  let next: Rank = RANKS[1] ?? RANKS[0];
  for (let i = RANKS.length - 1; i >= 0; i--) {
    if (xp >= RANKS[i].minXp) {
      current = RANKS[i];
      next = RANKS[i + 1] ?? RANKS[i];
      break;
    }
  }
  return { current, next };
}

export function getDifficultyColor(difficulty: number): string {
  return `diff-${difficulty}` as const;
}
