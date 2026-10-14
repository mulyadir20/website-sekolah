/** Jam operasional sekolah, dipakai bersama oleh halaman kontak dan footer. */
export type JamOperasional = { hari: string; waktu: string };

export const jamOperasional: JamOperasional[] = [
  { hari: "Senin - Jumat", waktu: "07.00 - 15.00 WIB" },
  { hari: "Sabtu", waktu: "07.00 - 12.00 WIB" },
  { hari: "Ahad", waktu: "Tutup" },
];