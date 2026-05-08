// Hijri calendar utility
export interface HijriDate {
  day: number;
  month: number;
  monthName: string;
  year: number;
}

const HIJRI_MONTHS = [
  'Muharram', 'Safar', 'Rabi\'ul Awwal', 'Rabi\'ul Akhir',
  'Jumadil Awwal', 'Jumadil Akhir', 'Rajab', 'Sya\'ban',
  'Ramadhan', 'Syawal', 'Dzulqa\'idah', 'Dzulhijjah'
];

// Simple Hijri conversion algorithm
export function toHijri(date: Date): HijriDate {
  const jd = Math.floor((date.getTime() / 86400000) + 2440587.5);
  const z = jd - 1948438.5;
  const hjYear = Math.floor((z * 30 + 10646) / 10631);
  const aa = z - Math.floor((10631 * hjYear - 10617) / 30);
  const hjMonth = Math.min(12, Math.ceil((aa - 29.5001) / 29.5) + 1);
  const hjDay = z - Math.floor((hjMonth - 1) * 29.5) - Math.floor((10631 * hjYear - 10617) / 30) + 1;
  return {
    day: hjDay,
    month: hjMonth,
    monthName: HIJRI_MONTHS[hjMonth - 1],
    year: hjYear,
  };
}

export function formatHijriDate(d: HijriDate): string {
  return `${d.day} ${d.monthName} ${d.year} H`;
}

export function getMonthName(month: number): string {
  return HIJRI_MONTHS[month - 1] || '';
}

export function getDaysInHijriMonth(month: number, year: number): number {
  // Odd months have 30 days, even months have 29, last month depends on year
  if (month % 2 === 1) return 30;
  if (month === 12 && (((11 * year) + 14) % 30) < 11) return 30;
  return 29;
}

// Pasaran Jawa
const PASARAN = ['Legi', 'Pahing', 'Pon', 'Wage', 'Kliwon'];
export function getPasaran(date: Date): string {
  const ref = new Date(1900, 0, 1); // Legi reference
  const diff = Math.floor((date.getTime() - ref.getTime()) / 86400000);
  return PASARAN[((diff % 5) + 5) % 5];
}

// Islamic events
export const islamicEvents: Record<string, string> = {
  '1-1': 'Tahun Baru Hijriah',
  '10-1': 'Hari Asyura',
  '12-3': 'Maulid Nabi Muhammad SAW',
  '27-7': 'Isra Mi\'raj',
  '15-8': 'Nisfu Sya\'ban',
  '1-9': 'Awal Ramadhan',
  '27-9': 'Nuzulul Qur\'an',
  '1-10': 'Idul Fitri',
  '10-12': 'Idul Adha',
};
