/**
 * Identitas utama sekolah.
 * Ubah nilai di sini untuk menyesuaikan seluruh situs.
 *
 * PERINGATAN: proyek ini adalah DEMO fiktif, bukan situs sekolah sungguhan.
 * Semua identitas, statistik, dan kontak di bawah adalah data contoh.
 * Jangan memakai nilai ini untuk situs yang benar-benar tayang.
 */

/**
 * Komponen alamat sekolah.
 *
 * Ini adalah sumber kanonis **tunggal** untuk alamat. JSON-LD di
 * `app/layout.tsx`, serta tampilan di header, footer, hero, dan section
 * kontak, semuanya diturunkan dari objek ini. Jangan menyalin nilai
 * alamat ke file lain.
 *
 * DATA DEMO: ganti seluruh nilai bila situs dijadikan sekolah sungguhan.
 */
export const schoolAddress = {
  street: "Jl. Pendidikan Islam No. 27",
  district: "Sukamaju",
  city: "Bandung",
  postalCode: "40286",
  province: "Jawa Barat",
  /** Kode negara ISO 3166-1 alpha-2, dipakai oleh JSON-LD. */
  countryCode: "ID",
} as const;

/**
 * Alamat satu baris untuk ditampilkan di halaman.
 * Disusun dari `schoolAddress` supaya mustahil berbeda dari JSON-LD.
 */
export const schoolAddressLine = [
  `${schoolAddress.street}, ${schoolAddress.district}`,
  `${schoolAddress.city} ${schoolAddress.postalCode}`,
  schoolAddress.province,
].join(", ");

export const site = {
  // --- DATA DEMO: identitas institusi ---
  name: "Sekolah Islam Terpadu Al-Istiqamah",
  shortName: "SIT Al-Istiqamah",
  tagline: "Berakhlak Mulia, Berprestasi, Berbudaya Islami",
  established: "1998",
  accreditation: "Akreditasi A",
  academicYear: "2026/2027",

  // --- DATA DEMO: kontak ---
  /**
   * URL kanonis produksi, **tanpa garis miring di akhir**.
   *
   * Dipakai untuk `metadataBase`, canonical, sitemap.xml, dan robots.txt.
   * Trailing slash tidak boleh ditambahkan: `robots.ts` dan `sitemap.ts`
   * menyusun URL dengan konkatenasi string, sehingga garis miring di akhir
   * akan menghasilkan `//sitemap.xml`.
   *
   * Skema `https://` wajib disertakan karena `new URL(site.url)` dipakai
   * sebagai `metadataBase` di `app/layout.tsx`.
   */
  url: "https://website-sekolah-steel.vercel.app",
  /**
   * Nomor contoh yang tidak akan sampai ke nomor sungguhan.
   * `0000-0000` tidak pernah dialokasikan operator, sehingga aman untuk demo.
   */
  phone: "(022) 0000-0000",
  /** Format internasional tanpa tanda `+`. Angka nol menandakan data contoh. */
  whatsapp: "6281100000000",
  /** `example.com` juga domain cadangan RFC 2606 - tidak pernah bisa delivering. */
  email: "info@example.com",
  /** Diturunkan dari `schoolAddress`; jangan ditulis ulang. */
  address: schoolAddressLine,
  /**
   * Tampilkan penanda "demo" di footer.
   * Setel `false` (atau hapus blok penandanya di `Footer.tsx`) ketika situs
   * diubah menjadi situs sekolah sungguhan.
   */
  isDemo: true,
} as const;

/** DATA DEMO: ringkasan untuk metadata SEO dan kartu media sosial. */
export const siteDescription =
  "Sekolah Islam Terpadu yang memadukan kokurikuler Al-Qur'an dan pendidikan karakter Islami dengan standar akademik nasional untuk membentuk generasi Rabbani.";

/** Nomor telepon tanpa spasi dan tanda baca, siap dipakai untuk `tel:`. */
export const sitePhoneNumber = site.phone.replace(/[^\d+]/g, "");

/** Tautan WhatsApp dengan pesan pembuka agar mudah ditindaklanjuti. */
export function whatsappLink(pesan?: string): string {
  const base = `https://wa.me/${site.whatsapp}`;
  return pesan ? `${base}?text=${encodeURIComponent(pesan)}` : base;
}