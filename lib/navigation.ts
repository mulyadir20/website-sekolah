/** Menu navigasi utama. Menuju section di halaman beranda. */
export type NavItem = { label: string; href: string };

export const navigation: NavItem[] = [
  { label: "Beranda", href: "#beranda" },
  { label: "Profil", href: "#profil" },
  { label: "Sejarah", href: "#sejarah" },
  { label: "Visi & Misi", href: "#visi-misi" },
  { label: "Program", href: "#program" },
  { label: "Berita", href: "#berita" },
  { label: "Galeri", href: "#galeri" },
  { label: "Kontak", href: "#kontak" },
];

/**
 * Ubah anchor section menjadi tautan yang benar dari halaman mana pun.
 * Di beranda tetap `#section` agar tidak memicu pemuatan ulang,
 * di halaman lain menjadi `/#section` agar kembali ke beranda lalu scroll.
 */
export function navigasiHref(href: string, pathname: string): string {
  if (!href.startsWith("#")) return href;
  return pathname === "/" ? href : `/${href}`;
}