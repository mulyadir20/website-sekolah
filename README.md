# Website Sekolah Islam Terpadu Al-Istiqamah

Situs publik satu halaman (landing page) untuk sekolah Islam terpadu, dibangun
dengan Next.js App Router, React 19, TypeScript, dan Tailwind CSS v4.

## Menjalankan

```bash
npm install
npm run dev      # server pengembangan di http://localhost:3000
```

Perintah lain:

| Perintah | Kegunaan |
|---|---|
| `npm run build` | Build produksi ke `.next/` |
| `npm start` | Menjalankan hasil build produksi |
| `npm run lint` | ESLint (flat config, `eslint-config-next`) |
| `npm run typecheck` | Generate tipe route lalu jalankan `tsc --noEmit` |
| `npm run check` | `typecheck` + `lint` sekaligus |

> `typecheck` menjalankan `next typegen` lebih dulu karena tipe route
> (`PageProps`, `LayoutProps`) baru tersedia setelah typegen.

## Struktur

```
app/
  layout.tsx            metadata, font, JSON-LD schema.org/School
  page.tsx              halaman beranda (12 section)
  not-found.tsx         halaman 404
  opengraph-image.tsx   gambar pratinjau media sosial
  sitemap.ts robots.ts  berkas SEO
  berita/
    page.tsx            daftar berita
    [slug]/page.tsx     detail berita (prerender statis)
components/
  site/    Header.tsx (client), Footer.tsx (server)
  home/    satu komponen per section beranda
  berita/  BeritaCard.tsx (dipakai beranda + halaman berita)
  ui/      Button, Container, Icon, SectionHeading
lib/
  site.ts             identitas sekolah, helper telepon & WhatsApp
  navigation.ts       menu navigasi + resolver anchor
  content/            seluruh teks & data konten
public/
  images/             ilustrasi SVG
```

## Konten

Seluruh teks, nomor telepon, email, dan alamat ada di `lib/site.ts` dan
`lib/content/`. Ganti nilai di sana, bukan di dalam komponen.

Before publikasi, ganti data placeholder berikut:

- `site.whatsapp` dan `site.phone` di `lib/site.ts`
- `site.email` dan `site.address`
- `site.url` — domain produksi untuk `metadataBase`, sitemap, dan robots

Paragraf isi berita bersifat opsional (`isi`). Bila kosong, halaman detail
menampilkan `ringkas` sebagai paragraf pembuka.

## Mekanisme offset anchor

Offset navigasi section hanya diatur satu tempat, di `app/globals.css`
(`scroll-padding-top`). Nilai per section (`scroll-mt-*`) sengaja tidak
digunakan karena `scroll-padding` dan `scroll-margin` akan dijumlahkan.

Saat menambah section baru, cukup beri atribut `id`; jangan tambahkan
`scroll-mt-*`.

## Catatan Next.js

Proyek ini memakai Next.js 16 dengan `cacheComponents` aktif. Route segment
config seperti `dynamic` dan `dynamicParams` tidak tersedia.
Baca panduan di `node_modules/next/dist/docs/` sebelum mengubah routing.

## Header keamanan

`next.config.ts` mengirim header dasar untuk seluruh rute lewat `headers()`:
`X-Content-Type-Options`, `X-Frame-Options`, `Referrer-Policy`,
`Permissions-Policy`, dan `Strict-Transport-Security`. `poweredByHeader`
dimatikan agar versi framework tidak ikut terekspos.

`Content-Security-Policy` sengaja belum ditambahkan. Halaman memakai
`<script type="application/ld+json">` inline, jadi CSP memerlukan nonce atau
hash agar JSON-LD tetap valid. Terapkan setelah kebijakan CSP-nya ditetapkan.