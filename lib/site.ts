/**
 * Identitas utama sekolah.
 * Ubah nilai di sini untuk menyesuaikan seluruh situs.
 *
 * PERINGATAN: proyek ini **mulai dipakai untuk sekolah sungguhan**
 * (Al Wafi International Islamic Boarding School, Campus B, Depok), tetapi
 * baru sebagian. `name`, `shortName`, `schoolAddress`, dan `schoolMap`
 * sudah berisi data sebenarnya. Field lain - tagline, tahun berdiri,
 * akreditasi, dan seluruh kontak - **MASIH data contoh** dan masih perlu
 * diganti dengan data asli pemilik proyek sebelum tayang.
 */

/**
 * Komponen alamat sekolah.
 *
 * Ini adalah sumber kanonis **tunggal** untuk alamat. JSON-LD di
 * `app/layout.tsx`, serta tampilan di header, footer, hero, dan section
 * kontak, semuanya diturunkan dari objek ini. Jangan menyalin nilai
 * alamat ke file lain.
 *
 * Sumber: alamat Campus B yang tertera pada situs resmi Al Wafi
 * (`Jln. Raya Pengasinan, Pengasinan Village, Sawangan, Depok City, 16518`).
 * Koordinat peta di `schoolMap` menunjuk lokasi yang sama.
 */
export const schoolAddress = {
  street: "Jl. Raya Pengasinan",
  district: "Pengasinan, Sawangan",
  city: "Depok",
  postalCode: "16518",
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

/**
 * Lokasi peta sekolah.
 *
 * Sumber kanonis untuk section peta di beranda. `shareUrl` adalah tautan
 * berbagi resmi dari Google Maps (dipakai untuk tombol "Buka di Google
 * Maps"), sedangkan koordinat dipakai untuk peta yang tertanam di halaman.
 *
 * Keduanya harus menunjuk lokasi yang sama. Kalau alamat sekolah berubah,
 * perbarui nilai di sini juga.
 */
export const schoolMap = {
  /** Tautan berbagi lokasi, tanpa parameter pelacak. */
  shareUrl: "https://maps.app.goo.gl/9Nu7SVL1b1auXorU9",
  latitude: -6.4290864,
  longitude: 106.7510048,
  zoom: 16,
} as const;

/**
 * URL peta tertanam (embed).
 *
 * Disusun dari `schoolMap` supaya koordinat tidak bisa berbeda dari
 * tautan berbagi. `output=embed` adalah bentuk yang diizinkan Google untuk
 * menanam di dalam `<iframe>`; membuka `maps.google.com` langsung di
 * dalam iframe akan ditolak.
 */
export const schoolMapEmbedUrl = `https://www.google.com/maps?q=${schoolMap.latitude},${schoolMap.longitude}&z=${schoolMap.zoom}&hl=id&output=embed`;

export const site = {
  // --- DATA DEMO: identitas institusi ---
  // Nama dan alamat sudah diganti ke data sebenarnya (Al Wafi, Campus B,
  // Depok). Sisanya MASIH data contoh dan perlu diganti pemilik proyek.
  name: "Al Wafi International Islamic Boarding School",
  shortName: "Al Wafi IBS",
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