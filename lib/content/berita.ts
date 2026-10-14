import { site } from "@/lib/site";

export type BeritaItem = {
  /** Slug URL, stabil dan tanpa spasi. */
  slug: string;
  kategori: string;
  /** Tanggal tampil ke pengguna, contoh: "12 Mei 2026". */
  tanggal: string;
  /** Tanggal format ISO 8601 untuk atribut `<time datetime>`. */
  tanggalIso: string;
  judul: string;
  ringkas: string;
  image: string;
  /** Estimasi waktu baca dalam menit. */
  bacaMenit: number;
  /**
   * Paragraf isi artikel, kosongkan bila artikel belum dipublikasikan.
   * Halaman detail memakai `ringkas` sebagai paragraf pembuka bila kosong.
   */
  isi?: string[];
};

/**
 * DATA DEMO: seluruh berita di bawah adalah contoh.
 * Ganti isi dan tanggalnya bila situs dipakai untuk sekolah sungguhan.
 */
export const berita: BeritaItem[] = [
  {
    slug: "juara-olimpiade-matematika",
    kategori: "Prestasi",
    tanggal: "12 Mei 2026",
    tanggalIso: "2026-05-12",
    judul: "Juara Olimpiade Matematika",
    ringkas: `Murid ${site.shortName} meraih medali olimpiade.`,
    image: "/images/berita-1.svg",
    bacaMenit: 3,
  },
  {
    slug: "peringatan-hari-pendidikan",
    kategori: "Kegiatan",
    tanggal: "28 April 2026",
    tanggalIso: "2026-04-28",
    judul: "Peringatan Hari Pendidikan",
    ringkas: "Seluruh murid mengikuti upacara bendera.",
    image: "/images/berita-2.svg",
    bacaMenit: 2,
  },
  {
    slug: "juara-lomba-tahfidz",
    kategori: "Prestasi",
    tanggal: "10 April 2026",
    tanggalIso: "2026-04-10",
    judul: "Juara Lomba Tahfidz",
    ringkas: "Delegasi sekolah menorehkan hafalan 30 juz.",
    image: "/images/berita-3.svg",
    bacaMenit: 3,
  },
];

/** Semua berita, dari yang terbaru. */
export function semuaBerita(): BeritaItem[] {
  return [...berita].sort((a, b) => b.tanggalIso.localeCompare(a.tanggalIso));
}

/** Cari satu berita berdasarkan slug, atau `undefined` bila tidak ada. */
export function cariBerita(slug: string): BeritaItem | undefined {
  return berita.find((item) => item.slug === slug);
}