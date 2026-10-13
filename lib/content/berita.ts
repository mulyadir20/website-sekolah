export type BeritaItem = { kategori: string; tanggal: string; judul: string; ringkas: string; image: string };

export const berita: BeritaItem[] = [
  {
    kategori: "Prestasi",
    tanggal: "12 Mei 2026",
    judul: "Juara Olimpiade Matematika",
    ringkas: "Murid SIT Al-Istiqamah meraih medali olimpiade.",
    image: "/images/berita-1.svg",
  },
  {
    kategori: "Kegiatan",
    tanggal: "28 April 2026",
    judul: "Peringatan Hari Pendidikan",
    ringkas: "Seluruh murid mengikuti upacara bendera.",
    image: "/images/berita-2.svg",
  },
  {
    kategori: "Prestasi",
    tanggal: "10 April 2026",
    judul: "Juara Lomba Tahfidz",
    ringkas: "Delegasi sekolah menorehkan hafalan 30 juz.",
    image: "/images/berita-3.svg",
  },
];
