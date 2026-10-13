/** Menu navigasi utama. Saat ini menuju section di halaman utama. */
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
