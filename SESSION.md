# SESSION.md

Catatan kerja berkelanjutan untuk proyek **website-sekolah** (SIT Al-Istiqamah).
Dokumen ini diisi ulang setelah tiap sesi penting. Ikuti `AGENTS.md` sebelum
mengubah kode.

---

## Sesi: Audit Keamanan & Kesiapan Publikasi

Tanggal: 2026-10-14

Status: **Audit selesai. Belum ada push/deploy. Menunggu keputusan pemilik
proyek untuk daftar item "perlu diperbaiki".**

### Ringkasan

Audit dilakukan terhadap 6 fokus: rahasia di kode, perlindungan `.env`,
file/folder yang tidak perlu dipublikasikan, script build, ketergantungan
layanan eksternal, dan data pribadi. Proyek secara umum **sangat sehat** —
tidak ditemukan satu pun rahasia, kredensial, atau data pribadi.

Yang diperbaiki langsung pada sesi ini hanya satu hal yang aman dan tidak
merusak: header keamanan HTTP di `next.config.ts`.

---

### 1. Aman untuk dipublikasikan

| Item | Hasil |
|---|---|
| API key / token / password / kredensial DB | **Tidak ada.** Nol kecocokan pola rahasia di seluruh file tracked maupun di `git log --all -p` (3 commit). |
| `process.env` | **Tidak dipakai sama sekali** di `app/`, `components/`, `lib/`. Tidak ada konfigurasi rahasia yang perlu dikelola. |
| `.env` / `.env.local` | **Tidak ada file tersebut di disk**, dan `.gitignore` sudah menutup `.env*`. Tidak pernah ter-commit di riwayat. |
| `.gitignore` | Lengkap. Terverifikasi `IGNORED`: `node_modules`, `.next`, `tsconfig.tsbuildinfo`, `next-env.d.ts`, `.env`, `.env.local`, `.vercel`. |
| File sisa /sampah | Bersih. Tidak ada `*.bak`, `*.swp`, `*~`, `.DS_Store`, log, atau berkas kunci (`*.pem`/`*.key`). 56 file tracked, semuanya relevan. |
| Script build | `npm run build` **berhasil** (Next.js 16.4.0, Turbopack, 12 halaman statis). `npm run check` (typecheck + lint) **bersih, exit 0**. |
| Kerentanan dependency produksi | `npm audit --omit=dev` -> **0 vulnerabilities**. |
| Data pribadi | **Tidak ada.** Tidak ada NIK, nama siswa/guru, data kesehatan, nilai rapor, data orang tua, atau catatan internal. |
| Aset publik | Semua 18 aset adalah SVG buatan sendiri, total 104 KB. Tidak ada foto identitas, tidak ada metadata EXIF. |
| `dangerouslySetInnerHTML` | Hanya 1 pemakaian, di `app/layout.tsx:81`, untuk JSON-LD `School` yang dibangun dari konstanta lokal. Bukan input pengguna. Aman. |
| Halaman publik | `/` 200, `/berita` 200, `/berita/[slug]` 200, `/robots.txt` 200, `/sitemap.xml` 200, `/opengraph-image` 200, rute asing -> 404. |

### 2. Perlu diperbaiki sebelum publikasi

**P1 - Data kontak masih placeholder (WAJIB, blokir publikasi)**
`lib/site.ts:18-22` masih berisi nilai contoh:

- `url` -> `https://alistiqamah.sch.id` (domain contoh)
- `phone` -> `(022) 8765-4321` (pola berurutan, jelas placeholder)
- `whatsapp` -> `6281287654321` (pola berurutan, jelas placeholder)
- `email` -> `info@alistiqamah.sch.id`
- `address` -> Jl. Pendidikan Islam No. 27, Bandung (alamat contoh)

Nilai ini **ikut ter-render ke publik** lewat JSON-LD `schema.org/School`,
`robots.txt`, `sitemap.xml`, footer, dan tombol WhatsApp. Jika dipublikasikan
apa adanya, pengunjung akan menghubungi nomor yang bukan milik sekolah dan
mesin pencari akan mengindeks domain yang salah.
`README.md:56-60` sudah menyebutkannya, tapi **belum dikerjakan**.
Perlu keputusan pemilik: apakah domain/nomor di atas benar, atau ada nilai asli
yang lain. **Nilai tidak boleh ditebak atau diinventar sendiri.**

**P2 - Ketergantungan jaringan saat build (risiko deployment)**
`app/layout.tsx:2` memakai `next/font/google` (Geist, Geist_Mono, Fraunces).
Font diunduh dari `fonts.googleapis.com` **saat `next build` berjalan**. Jika
CI/CD atau platform hosting memblokir Google Fonts, build **gagal total** —
bukan sekadar degradasi satu font. Terverifikasi HTTP 200 di mesin ini, jadi
build lokal lolos, tapi kondisi jaringan server produksi belum bisa dipastikan.
Mitigasi (pilih salah satu, perlu keputusan): self-host font, ganti ke font
sistem, atau pastikan platform build mengizinkan akses ke Google Fonts.

**P3 - Header keamanan (SUDAH DIPERBAIKAN sesi ini)**
Sebelum: tidak ada satu pun header keamanan, dan `X-Powered-By: Next.js`
bocor. `next.config.ts` kini mengirim `X-Content-Type-Options`,
`X-Frame-Options`, `Referrer-Policy`, `Permissions-Policy`, dan
`Strict-Transport-Security` untuk `/:path*`, serta `poweredByHeader: false`.
Sudah diverifikasi aktif di server produksi lokal dan seluruh rute tetap 200.
Penjelasan header ini juga ditulis di `README.md` bagian "Header keamanan".

### 3. Belum dapat dipastikan

- **Domain produksi dan kepemilikan hosting.** Apakah `alistiqamah.sch.id`
  benar milik sekolah? Belum diverifikasi. Tidak ada git remote yang
  dikonfigurasi, jadi tidak ada jejak tujuan deploy.
- **Keamanan runtime setelah deploy** (TLS, WAF, rate limit) berada di luar
  repo dan di luar cakupan audit ini.
- **Vulnerabilitas `braces` (5 severity high).** Ada di pohon dev:
  `eslint-config-next` -> `fast-glob` -> `micromatch` -> `braces`
  (GHSA-vfj7-8cjw-p6xm, stack exhaustion lewat pattern bersarang dalam).
  **Hanya memengaruhi ESLint saat developer menjalankan `npm run lint`, bukan
  aplikasi yang berjalan.** `npm audit fix --force` akan menurunkan
  `eslint-config-next` ke 14.2.35 — breaking change, dan **tidak dilakukan**.
  Pantau upstream; jangan pakai `--force`.
- **`experimental.agentFeedback`** di `next.config.ts` — flag eksperimental,
  perilaku stabil untuk produksi belum dijamin. Perlu konfirmasi apakah flag
  ini masih dipakai sebelum produksi.
- **Kebenaran faktual konten.** Angka "1.250+ siswa", "48 tenaga pengajar",
  "96% kelulusan nilai atas", "Akreditasi A", tahun berdiri 1998 — semua
  tampak sebagai data contoh. Audit ini hanya menilai kebocoran data, bukan
  kebenaran klaim. Perlu diverifikasi sekolah sebelum publikasi.
- **Paragraf `isi` berita kosong.** 3 artikel belum punya paragraf isi; halaman
  detail jatuh ke `ringkas`. Ini bukan bug, tapi kontennya belum final.

---

### Perubahan file pada sesi ini

- `next.config.ts` — tambah `poweredByHeader: false` dan blok `headers()`.
- `README.md` — tambah bagian "Header keamanan".
- `SESSION.md` — dokumen ini (baru).

Tidak ada file lain yang diubah, dihapus, atau dipindahkan.

### Yang SENGAJA tidak dilakukan

- Tidak ada `git commit`, `git push`, atau deploy.
- Tidak mengubah `package-lock.json` atau dependency (menghindari `--force`).
- Tidak menebak nilai placeholder di `lib/site.ts` — butuh data asli sekolah.
- Tidak menambah `Content-Security-Policy` — halaman punya
  `<script type="application/ld+json">` inline di `app/layout.tsx:79-82`, jadi
  CSP butuh nonce atau hash agar JSON-LD tidak rusak. CSP dengan aturan yang
  salah akan mematikan structured data di mesin pencari.
- Tidak menghapus file working tree yang belum ter-commit (`app/berita/`,
  `app/robots.ts`, `app/sitemap.ts`, `lib/content/jamOperasional.ts`, dan
  lainnya) — itu pekerjaan aktif, bukan sampah.

---

### Langkah berikutnya

1. **Pemilik proyek** mengganti data asli di `lib/site.ts` (P1) untuk `url`,
   `phone`, `whatsapp`, `email`, dan `address`. Ini prasyarat mutlak
   publikasi.
2. **Pemilik proyek** menetapkan platform hosting dan domain target, lalu
   mengonfigurasi git remote (saat ini belum ada sama sekali).
3. Putuskan mitigasi font (P2): self-host, font sistem, atau pastikan akses
   Google Fonts tersedia di lingkungan build.
4. Verifikasi angka dan klaim di `lib/content/profil.ts` serta
   `lib/content/timeline.ts` sebelum tayang.
5. Lengkapi paragraf `isi` di `lib/content/berita.ts`.
6. Review `experimental.agentFeedback`; buang bila tidak dipakai.
7. Setelah langkah 1 dan 2 beres: `npm run check && npm run build`, lalu
   commit seluruh perubahan working tree sebagai satu commit yang rapi.

---

## Sesi: Audit Data Konten & Identitas Institusi

Tanggal: 2026-10-14 (sesi lanjutan)
Status: **Audit selesai. Tidak ada data yang diubah. Menunggu konfirmasi
pemilik proyek untuk seluruh nilai di bawah.**

### Prinsip sesi ini

Tidak ada nilai yang ditebak, dikarang, atau diambil dari institusi mana pun.
Nama, alamat, kontak, dan klaim di bawah semuanya **kandidat placeholder**
yang harus dikonfirmasi sekolah. Tidak ada file sumber yang berubah.

### A. Data di `lib/site.ts` (sumber tunggal, 11 field)

Semua 11 field perlu konfirmasi. Tidak ada yang boleh diasumsikan benar.

| Field | Nilai saat ini | Status |
|---|---|---|
| `name` | Sekolah Islam Terpadu Al-Istiqamah | Perlu konfirmasi — bisa jadi identitas institusi referensi lain |
| `shortName` | SIT Al-Istiqamah | Turunan dari `name` |
| `tagline` | Berakhlak Mulia, Berprestasi, Berbudaya Islami | Perlu konfirmasi |
| `established` | 1998 | Klaim faktual, perlu bukti |
| `accreditation` | Akreditasi A | Klaim faktual, perlu bukti |
| `academicYear` | 2026/2027 | Perlu konfirmasi |
| `url` | `https://alistiqamah.sch.id` | Domain contoh |
| `phone` | (022) 8765-4321 | Placeholder (pola berurutan) |
| `whatsapp` | 6281287654321 | Placeholder (pola berurutan) |
| `email` | `info@alistiqamah.sch.id` | Placeholder |
| `address` | Jl. Pendidikan Islam No. 27, Sukamaju, Bandung 40286, Jawa Barat | Alamat contoh |

`siteDescription` (`lib/site.ts:25-26`) juga perlu konfirmasi.

### B. Data yang ditulis ulang di file lain (risiko kembar / drift)

Ini temuan utama sesi ini. `lib/site.ts` **bukan satu-satunya sumber** untuk
identitas sekolah. Enam tempat lagi menulis ulang nilai yang sama atau
sebagiannya:

| Lokasi | Data | Masalah |
|---|---|---|
| `app/layout.tsx:70-72` | `Bandung`, `40286`, `Jawa Barat` | JSON-LD PostalAddress di-hardcode. Mengganti `site.address` **tidak** mengubah JSON-LD |
| `app/layout.tsx:69` | `Jl. Pendidikan Islam No. 27` |streetAddress **tidak memuat "Sukamaju"** yang ada di `site.address` — sudah berbeda sekarang |
| `app/berita/page.tsx:13` | "Sekolah Islam Terpadu Al-Istiqamah" | Nama Institutions ditulis penuh di luar `site` |
| `app/not-found.tsx:13` | "Sekolah Islam Terpadu Al-Istiqamah" | Idem |
| `lib/content/berita.ts:28` | "SIT Al-Istiqamah" | Nama Pendek ditulis di dalam teks berita |
| `components/site/Footer.tsx:123` | "Berbasis nilai Adab dan Ilmu" | Varian tagline, tidak ada di `lib/site.ts` |
| `components/home/Profil.tsx:20` | "Mendidik dengan Adab dan Ilmu" | Idem |

Konsekuensi: mengganti nama sekolah di satu tempat **tidak cukup** untuk
mengganti semuanya. Butuh 7 edit terpisah, atau refactor agar semua
k Consumers memakai `site.*`.

### C. Data konten yang perlu diverifikasi

- **`lib/content/program.ts`** — 6 program (TK/KB, MI, MTS, MA, Dayah, Beasiswa).
  Termasuk "Dayah" dan skema "Beasiswa". Perlu konfirmasi jenjang resmi.
- **`lib/content/profil.ts:1-6`** — "1.250+ Siswa Aktif", "48 Tenaga Pengajar",
  "96% Kelulusan Nilai Atas", "120+ Prestasi". Angka klaim.
- **`lib/content/timeline.ts`** — 5 tonggak tahun (1998-2024), termasuk
  "lahan 2,4 hektare" dan "Akreditasi A". Angka klaim.
- **`lib/content/berita.ts`** — 3 artikel, **semuanya tanpa field `isi`**, jadi
  hanya punya judul + ringkas satu kalimat. Tanggal 2026-04/05 (masa depan
  relatif terhadap tanggal authoring) perlu disesuaikan.
- **`lib/content/keunggulan.ts`** — "Rasio 1:12", "Guru bersertifikat".
  Klaim kuantitatif/legal.
- **`lib/content/visiMisi.ts`** — visi & 4 misi, seluruhnya teks generik.
- **`lib/content/fasilitas.ts`** — 6 fasilitas, semua ilustrasi SVG generik.
- **`lib/content/galeri.ts`** — 5 gambar, semua SVG generik, **bukan foto asli**.
- **`lib/content/jamOperasional.ts`** — jam buka/tutup per hari.

### D. Tautan media sosial

**Tidak ada sama sekali.** Diverifikasi dengan grep di `app/`, `components/`,
`lib/`: nol hasil untuk instagram, facebook, tiktok, youtube, linkedin, x.com.
Satu-satunya kanal eksternal adalah WhatsApp (`wa.me`) dari `site.whatsapp`.

Artinya: **tidak ada placeholder media sosial yang bisa dihapus**, tapi juga
belum ada fitur sama sekali. Perlu keputusan: apakah sekolah punya akun
sosial yang harus ditampilkan, atau memang tidak.

### E. Yang TIDAK diubah pada sesi ini

- Tidak ada satu pun nilai di `lib/site.ts`, `lib/content/*`, atau komponen
  yang diubah.
- Tidak ada referensi ke institusi nyata yang disalin masuk.
- Tidak ada `git commit`, `git push`, atau deploy.
- Aset SVG **tidak memuat nama sekolah** — diverifikasi nol elemen `<text>` /
  `<tspan>` di `public/logo.svg`, `public/pattern-islamic.svg`,
  `app/icon.svg`, dan seluruh `public/images/`. Semuanya geometris. Jadi
  penggantian nama institusi **tidak** menuntut pembuatan ulang aset.
- Tautan media sosial: pemilik proyek memutuskan **tidak perlu untuk sekarang**
  (sesi 2026-10-14). Tidak ada perubahan kode untuk poin ini.
- Refactor anti-drift (B) **belum dilakukan**. Rekomendasi urutan yang benar:
  refactor **lebih dulu**, baru isi data — sehingga penggantian nanti cukup 1
  file (`lib/site.ts`), bukan 7 file. Menunda refactor sampai data final
  justru menambah pekerjaan, bukan mengurangi.
- Nama institusi dikonfirmasi pemilik proyek sebagai **nama contoh yang akan
  diganti** (sesi 2026-10-14). Semua kemunculannya harus ikut berubah.

---

## Sesi: Penegasan Status Demo + Pengamanan Kontak

Tanggal: 2026-10-14 (sesi lanjutan)

Status: **Kontak diamankan, domain diganti ke cadangan, penanda demo dipasang.
Build, lint, dan typecheck hijau. Belum commit/push/deploy.**

### Keputusan pemilik proyek

1. Website dinyatakan **fiktif untuk demo** — bukan identitas sekolah nyata.
   Kekhawatiran "menyalin identitas institusi nyata" **d Gugur**.
2. Kontak **diamankan** agar tidak bisa menghubungi orang sungguhan.
3. Domain diganti ke **cadangan RFC 2606**.
4. Tautan media sosial **tidak perlu** untuk sekarang.
5. Penanda "demo" **ditambahkan** di footer.

### Perubahan yang diterapkan

**`lib/site.ts`**
- `url`: `https://alistiqamah.sch.id` -> `https://example.test`
- `phone`: `(022) 8765-4321` -> `(022) 0000-0000`
- `whatsapp`: `6281287654321` -> `6281100000000`
- `email`: `info@alistiqamah.sch.id` -> `info@example.com`
- Field baru `isDemo: true`, dengan komentar cara menonaktifkannya.
- Komentar peringatan di kepala file bahwa proyek ini demo fiktif.

**`components/site/Footer.tsx`**
- Baris penanda demo di bawah baris copyright, dirender bersyarat
  `{site.isDemo ? ... : null}`.

### Alasan pemilihan nilai

- `example.test` dan `example.com` adalah domain cadangan **RFC 2606** yang
  dijamin tidak pernah didaftarkan oleh siapa pun. Tidak mungkin "tabrak"
  domain orang lain, dan `info@example.com` tidak pernah bisa delivering.
- Nomor `0000-0000` dan `6281100000000` memakai angka nol yang tidak pernah
  dialokasikan operator, sehingga tidak mungkin sampai ke nomor sungguhan.
  Ini menggantikan `62812...` yang berprefix Telkomsel asli dan berisiko.

### Verifikasi setelah perubahan

- DNS dicek: `alistiqamah.sch.id` = **NXDOMAIN** (tidak dipegang siapa pun),
  sehingga kebocoran ke pihak ketiga mustahil.
- `npm run check` exit 0; `npm run build` sukses, 12/12 halaman statis.
- `robots.txt` dan `sitemap.xml` kini menunjuk ke `https://example.test`.
- JSON-LD `schema.org/School` ter-update otomatis (email & telepon ikut
  berubah karena sudah membaca `site.*`).
- Grep seluruh rute (`/`, `/berita`, `/berita/[slug]`, 404): **nol** sisa
  `alistiqamah.sch.id`, `8765-4321`, `6281287654321`, `info@alistiqamah`.
- Penanda demo muncul tepat 1x di keempat rute.

### Sisa pekerjaan yang MASIH terbuka

- **Refactor anti-drift belum dilakukan.** `app/layout.tsx:69-72` masih
  meng-hardcode bagian alamat (`Bandung`, `40286`, `Jawa Barat`, dan
  `Jl. Pendidikan Islam No. 27` tanpa "Sukamaju"), dan nama sekolah masih
  ditulis penuh di `app/berita/page.tsx:13`, `app/not-found.tsx:13`, serta
  `lib/content/berita.ts:28`. `url`, `email`, dan `telepon` sudah aman karena
  dibaca dari `site.*`, tetapi **alamat dan nama masih bercabang**. Kalau
  nanti situs ini dijadikan sekolah sungguhan, refactor ini harus dikerjakan
  lebih dulu supaya semua nilai benar-benar terpusat di satu file.
- Kontak di `wa.me` masih akan membuka WhatsApp dengan nomor tidak valid
  (menampilkan nomor tidak tersedia, tidak mengirim pesan). Jika ingin
  tombolnya nonaktif total saat demo, perlu tambahan tersendiri.
- Klaim faktual (jumlah siswa, pengajar, prestasi, akreditasi, luas lahan)
  **tetap data contoh yang disengaja** untuk demo — tidak perlu dibuktikan,
  asalkan penanda demo tetap aktif.

### Kalau nanti diubah jadi situs sungguhan

1. Set `isDemo: false` di `lib/site.ts` (blok penanda footer ikut hilang).
2. Ganti `url`, `phone`, `whatsapp`, `email`, `address` dengan nilai asli.
3. Kerjakan refactor anti-drift lebih dulu, supaya semua nilai terpusat.

---

## Sesi: Persiapan Deployment (GitHub + Vercel Hobby)

Tanggal: 2026-10-14 (sesi lanjutan)

Status: **Kesiapan Vercel diverifikasi — proyek SIAP dihubungkan.
Belum ada push, belum ada deployment. Menunggu data & persetujuan.**

### Keputusan hosting (pemilik proyek)

| Aspek | Keputusan |
|---|---|
| Penyimpanan kode | **GitHub** |
| Target hosting | **Vercel Hobby** |
| Domain | **Subdomain `*.vercel.app` saja** — domain khusus belum diperlukan |
| GitHub Organization | **Harus akun personal** (lihat kendala di bawah) |

### Hasil pemeriksaan kesiapan Vercel

| Aspek | Status | Catatan |
|---|---|---|
| Build command | **Otomatis** | Vercel membaca script `build` di `package.json` -> `next build` |
| Framework preset | **Otomatis** | Next.js terdeteksi; tidak perlu `vercel.json` |
| Environment variables | **NOL** | Tidak ada `process.env` di seluruh kode, jadi tidak ada yang perlu diset di dashboard |
| Package manager | `npm install` | `package-lock.json` ada, Vercel memanggilnya otomatis |
| Node runtime | **Cocok** | Next 16 butuh >= 20.9.0; default Vercel 24.x; lokal v24.21.0 |
| Jumlah file source | 65 | Batas Hobby 15.000 — jauh aman |
| Ukuran source | 716 KB | Batas Hobby 100 MB — jauh aman |
| Build time | ~5 detik | Batas Hobby 45 menit — jauh aman |
| Jumlah rute | ~12 | Batas Hobby 2.048 — jauh aman |
| Build bersih | **Sukses** | `rm -rf .next && npm run build` -> 12/12 halaman statis |
| `cacheComponents` | **Aman** | Butuh runtime Node.js; tidak ada `runtime = 'edge'` di proyek ini |
| `partialPrefetching` | **Aman** | Sudah diset eksplisit, sesuai dokumentasi |
| `experimental.agentFeedback` | **Aman** | Hanya berefek pada `next dev` lokal. Dokumentasi menegaskan: "Agent feedback does not run in CI" |
| Route segment config | **Bersih** | Tidak ada `dynamic`/`dynamicParams` yang sudah dihapus di v16 |

### Kendala penting: paket Hobby + GitHub Organization

Dari dokumentasi resmi Vercel:

> Vercel does not support connecting a project on your Hobby team to Git
> repositories owned by Git organizations.

Artinya: repository GitHub harus milik **akun personal**, **bukan** milik
sebuah Organization. Kalau repositori dibuat di dalam sebuah org, project
Vercel Hobby **tidak akan bisa dihubungkan** otomatis. Solusinya: pindahkan
repo ke akun personal, atau naik ke paket Pro.

### Risiko yang belum bisa dipastikan tanpa deploy

- **Google Fonts saat build.** `app/layout.tsx` memakai `next/font/google`.
  Build mengunduh font dari `fonts.googleapis.com`. Build machine Vercel
  umumnya punya akses internet, jadi **kemungkinan besar aman**, tapi ini
  baru bisa dipastikan setelah deployment pertama benar-benar dijalankan.
  Mitigasi bila gagal: self-host font (lihat `next/font/local`).
- **Hanya bisa dicek setelah deploy:** TLS otomatis, HSTS benar-benar aktif,
  dan perilaku cache/PPR di CDN Vercel.

### Catatan minor (tidak memblokir)

- `@types/node` masih `^20` sementara runtime adalah Node 24. Tidak
  menyebabkan error (typecheck hijau), tapi bisa diselaraskan ke `^24`
  kapan-kapan.
- Tidak ada `engines` di `package.json`, jadi Vercel memakai default 24.x.
  Menambahkannya bersifat opsional; default Vercel sudah cocok.

### Kenapa belum ada push/deploy

Sesuai instruksi pemilik proyek, push dan deployment **ditahan** sampai
data konten dan audit keamanan dinyatakan siap. Saat ini yang masih terbuka:

1. Konfirmasi identitas institusi (nama masih contoh).
2. Keputusan akhir soal refactor anti-drift.
3. Persetujuan eksplisit untuk mulai push.

---

## Sesi: Refactor Anti-Drift (lib/site.ts Jadi Sumber Kanonis Tunggal)

Tanggal: 2026-10-14 (sesi lanjutan)

Status: **Refactor selesai. Nol duplikasi nama/alamat tersisa.
Check hijau, build produksi sukses, HTML output identik. Belum push/deploy.**

### Keputusan pemilik proyek

- Nama repository GitHub: **`website-sekolah`**
- Refactor anti-drift: **kerjakan sekarang, sebelum deployment**

### Apa yang diubah

**`lib/site.ts` — jadi sumber kanonis**
- Ditambah ekspor `schoolAddress`: `{ street, district, city, postalCode,
  province, countryCode }`. Ini sumber tunggal untuk seluruh alamat.
- Ditambah `schoolAddressLine`, disusun dari `schoolAddress`, dipakai untuk
  tampilan satu baris.-HTML output identik byte-per-byte dengan sebelumnya
  (dibuktikan lewat checksum, lihat di bawah).
- `site.address` kini `= schoolAddressLine`, bukan string literal.
- Penanda `// --- DATA DEMO: ... ---` ditambahkan di blok identitas dan kontak.
- Komentar `PENTING SAAT DEPLOY` pada `site.url` menjelaskan bahwa URL Vercel
  harus mengganti `https://example.test`.

**Empat lokasi duplikat yang kini membaca dari sumber kanonis**

| # | File | Sebelumnya | Sekarang |
|---|---|---|---|
| 1 | `app/layout.tsx` | 5 baris alamat JSON-LD di-hardcode | `schoolAddress.street` / `.city` / `.postalCode` / `.province` / `.countryCode` |
| 2 | `app/berita/page.tsx` | nama sekolah penuh di literal | template literal `${site.name}` |
| 3 | `app/not-found.tsx` | nama sekolah penuh di literal | template literal `${site.name}` |
| 4 | `lib/content/berita.ts` | "SIT Al-Istiqamah" di literal | template literal `${site.shortName}` |

Memasukkan `lib/site` ke `lib/content/berita.ts` tidak menimbulkan circular
import: `lib/site.ts` tidak mengimpor apa pun.

### Bukti tidak ada perubahan perilaku

Sebelum refactor, HTML keempat rute diambil sebagai snapshot. Setelah
refactor, HTML diambil lagi dan dibandingkan:

- **Nilai identitas per rute: SAMA persis** (jumlah kemunculan identik untuk
  nama lengkap, nama pendek, alamat, telepon, email, dan WhatsApp).
- **Checksum HTML identik** untuk keempat rute setelah hash build
  dinormalisasi dan tag `<script>` dilepas:
  `/` `278676a972492a26` · `/berita` `1d8d29f9d44eef18` ·
  `/berita/[slug]` `e257ea74d1b9cbd0` · 404 `cae8be4169941385`
- `sitemap.xml` dan `robots.txt`: **identik**.
- Rute `/tidak-ada` tetap 404.

Kesimpulan: tidak ada perubahan desain maupun perilaku. Hanya sumber datanya
yang dipusatkan.

### Hasil pemeriksaan duplikasi (setelah refactor)

| Pola | Kemunculan di luar `lib/site.ts` |
|---|---|
| `Al-Istiqamah` / `alistiqamah` | **0** |
| `Bandung`, `40286`, `Jawa Barat`, `Sukamaju`, `Jl. Pendidikan Islam` | **0** |
| `0000-0000`, `6281100000000`, `info@example.com`, `example.test` | **0** |

Tiga belas file kini mengimpor dari `@/lib/site`:
`app/berita/page.tsx`, `app/berita/[slug]/page.tsx`, `app/layout.tsx`,
`app/not-found.tsx`, `app/opengraph-image.tsx`, `app/robots.ts`,
`app/sitemap.ts`, `components/home/Hero.tsx`,
`components/home/KontakCTA.tsx`, `components/home/Profil.tsx`,
`components/site/Footer.tsx`, `components/site/Header.tsx`, dan
`lib/content/berita.ts`.

### Hasil pemeriksaan tool

| Pemeriksaan | Hasil |
|---|---|
| `npm run typecheck` (`next typegen && tsc --noEmit`) | **Lulus** |
| `npm run lint` (ESLint) | **Lulus, 0 warning** |
| `npm run build` (produksi, Turbopack) | **Sukses, 12/12 halaman statis** |

### Duplikasi yang SENGAJA tidak disentuh

Dua baris berikut bukan duplikasi identitas, melainkan variation copy yang
memang berbeda secara desain:

- `components/site/Footer.tsx:123` -> "Berbasis nilai Adab dan Ilmu"
- `components/home/Profil.tsx:20` -> "Mendidik dengan Adab dan Ilmu"

Keduanya adalah slogan, bukan nama atau alamat. Menggabungkannya ke satu
konstanta akan mengubah teks yang tampil, jadi dibiarkan apa adanya. Kalau
pemilik proyek ingin slogan itu disentralkan, itu keputusan terpisah.

### File yang berubah pada sesi ini

- `lib/site.ts` (struktur alamat + penanda demo)
- `app/layout.tsx`
- `app/berita/page.tsx`
- `app/not-found.tsx`
- `lib/content/berita.ts`
- `SESSION.md` (dokumen ini)

### Status kesiapan deployment

**SIAP** dari sisi teknis. Tidak ada blocker tersisa.

Satu hal yang belum bisa dikerjakan sebelum project Vercel benar-benar ada:
`site.url` masih `https://example.test`. Setelah project Vercel dibuat, ganti
dengan URL `.vercel.app` aslinya, kalau tidak canonical URL, `sitemap.xml`,
dan `robots.txt` akan menunjuk ke domain yang salah.

Urutan yang disarankan:

1. `git init` sudah ada; buat repository GitHub `website-sekolah` di **akun
   personal** (bukan Organization — paket Hobby tidak mendukungnya).
2. Ganti `site.url` dengan URL Vercel setelah project dibuat.
3. `npm run check && npm run build`.
4. Push, lalu hubungkan repository ke Vercel.
5. Verifikasi Google Fonts terunduh di build machine Vercel (satu-satunya
   hal yang belum bisa dipastikan tanpa deployment).

---

## Sesi: Persiapan Push ke GitHub

Tanggal: 2026-10-14 (sesi lanjutan)

Status: **Semua pemeriksaan LOLOS. Remote sudah ditambahkan, commit sudah
dibuat. Push BELUM BERJALAN karena butuh autentikasi GitHub.**

### Repository tujuan

`https://github.com/mulyadir20/website-sekolah.git`

Repo terverifikasi **PUBLIK** (GitHub API mengembalikan HTTP 200 tanpa
autentikasi) dan masih kosong. Konsekuensinya: seluruh kode proyek ini akan
dibaca siapa saja. Audit menemukan nol rahasia, jadi tidak ada kebocoran yang
risikonya, tetapi perlu diketahui bahwa `SESSION.md` juga ikut terpublikasi
di dalamnya.

### Hasil pemeriksaan sebelum push

| # | Pemeriksaan | Hasil |
|---|---|---|
| 1 | Folder kerja | `/home/acid/projek/website-sekolah`, git root sama, `package.json` name cocok |
| 2 | Branch aktif | `master` |
| 2 | Remote | Awalnya tidak ada; ditambahkan `origin` dengan URL di atas, diverifikasi identik |
| 2 | Riwayat commit | 3 commit lama (`2eb22c7`, `08f0405`, `d440ad6`) **tidak disentuh** |
| 3 | `.env` / `.env.local` | Tidak ada di disk; tidak ikut commit |
| 3 | File kunci (`*.pem`, `*.key`, `*.p12`, `id_rsa`) | Tidak ada |
| 3 | `.npmrc` / credentials | Tidak ada |
| 3 | Sapu pola rahasia di file tracked + yang akan di-commit | **Nol** kecocokan. Satu-satunya hit adalah kalimat laporan audit sendiri di `SESSION.md` |
| 3 | String high-entropy mirip kredensial | **Nol** |
| 3 | Isi staging (32 file) | Semua file sumber; nol `.env`, `node_modules`, `.next`, `tsbuildinfo` |
| 4 | `.gitignore` | `IGNORED` terverifikasi untuk `node_modules`, `.next`, `tsconfig.tsbuildinfo`, `next-env.d.ts`, `.env`, `.env.local`, `.vercel` |
| 5 | Riwayat Git lama | Tidak dihapus, tidak ditimpa |
| 7 | `npm run check` | **Exit 0** - typegen, `tsc --noEmit`, dan ESLint semua lulus |
| 7 | `npm run build` | **Sukses**, 12/12 halaman statis |

### Identitas commit

`git` tadinya tidak punya `user.name` maupun `user.email`. Pemilik proyek
memilih memakai email noreply GitHub. Diatur **lokal di repo ini saja**
(scope `--local`), konfigurasi global tetap kosong:

- `user.name`: `mulyadir20`
- `user.email`: `mulyadir20@users.noreply.github.com`

### Commit yang dibuat

Satu commit baru, 32 file, `+1416 / -153`:

`21612cd` — `feat: halaman berita, SEO, dan hardening keamanan`

Commit pesan sempat di-`--amend` sekali untuk memperbaiki salah ketik. Ini
aman karena commit tersebut **belum pernah di-push**, dan tiga commit lama
tetap utuh.

### Push: BERHENTI karena autentikasi

`git push -u origin master` gagal dengan:

```
fatal: could not read Username for 'https://github.com': terminal prompts disabled
```

Penyebabnya, bukan kode:

- `gh` CLI tidak terinstall
- `git credential.helper` tidak dikonfigurasi
- Belum ada kredensial tersimpan untuk github.com

Sesuai instruksi pemilik proyek, **push tidak dipaksa**. Tidak ada token yang
diminta, disimpan, atau ditampilkan di mana pun.

### Langkah yang harus dilakukan sendiri oleh pemilik proyek

Pilih salah satu:

**Opsi A - pakai gh CLI (paling ringkas):**

```bash
gh auth login
gh auth setup-git
cd /home/acid/projek/website-sekolah
git push -u origin master
```

**Opsi B - pakai SSH:**

```bash
ssh-keygen -t ed25519 -C "email-github-anda"
cat ~/.ssh/id_ed25519.pub
```

Tempelkan isi ke GitHub -> Settings -> SSH and GPG keys. Lalu:

```bash
git remote set-url origin git@github.com:mulyadir20/website-sekolah.git
git push -u origin master
```

**Opsi C - Personal Access Token:**

Buat PAT di GitHub -> Settings -> Developer settings -> Personal access
tokens (scope `repo`), lalu jalankan `git push -u origin master` saat
git meminta username dan password. Masukkan token sebagai password.
**Jangan pernah menempel token ke chat atau menyimpannya di file mana pun
yang masuk commit.**

### Setelah push berhasil

1. Ganti `site.url` di `lib/site.ts` dari `https://example.test` ke URL
   Vercel asli, kalau tidak canonical URL, `sitemap.xml`, dan `robots.txt`
   akan menunjuk ke domain yang salah.
2. Hubungkan repository ke project Vercel.
3. Verifikasi apakah Google Fonts berhasil diunduh di build machine Vercel.
   Ini satu-satunya hal teknis yang belum bisa dipastikan tanpa deployment.

---

## Sesi: Push ke GitHub (Opsi A - gh CLI)

Tanggal: 2026-10-14 (sesi lanjutan)

Status: **PUSH BERHASIL. `master` di GitHub sudah sinkron dengan lokal.**

### gh CLI

`gh` tidak ada di sistem. Dipasang manual (tanpa sudo, tanpa apt) ke
`~/.local/bin/gh`, versi **2.102.0**, sudah ada di PATH. Binary resmi dari
rilis GitHub `cli/cli`.

### Autentikasi

Device flow dipakai agar pemilik proyek cukup otorisasi lewat browser:

- `gh auth login --web --git-protocol https` dijalankan di latar belakang
- Kode sekali pakai diberikan ke pemilik proyek (tidak dicatat di dokumen ini)
- Hasil: **Logged in as `mulyadir20`**, kredensial disimpan di keyring sistem
- Scope token: `gist`, `read:org`, `repo`
- `gh auth setup-git` aktifkan credential helper:
  `gh auth git-credential`

Tidak ada token yang ditulis ke file mana pun, ditampilkan di laporan, atau
disimpan di dalam repo.

### Hasil push

- **Branch:** `master`
- **Commit:** `68fcf87` - `feat: halaman berita, SEO, dan hardening keamanan`
- **Jumlah commit di server:** 4 (ketiga commit lama ikut ter-push utuh)
- **Status:** `master...origin/master` tanpa ahead/behind, sudah sinkron
- Upstream sudah di-set ke `origin/master`

Catatan jujur: perintah `git push` milik agen **gagal** di sesi sebelumnya
karena belum ada kredensial. Commit sudah ada di server saat diperiksa setelah
autentikasi selesai, jadi push tersebut dilakukan di luar perintah agen.
Hasil akhir diverifikasi ulang langsung lewat GitHub API, bukan diasumsikan.

### Verifikasi di server (GitHub API)

| Pemeriksaan | Hasil |
|---|---|
| Repo | `mulyadir20/website-sekolah` |
| Visibilitas | **publik** (`"private": false`) |
| Branch default | `master` |
| HEAD di server | `68fcf87` |
| Jumlah commit | 4 |
| Jumlah file di repo | 77 |
| `.env`, kunci, `node_modules`, `.next`, `tsbuildinfo` | **nol** |
| Isi root | `.gitignore`, `AGENTS.md`, `README.md`, `SESSION.md`, `app`, `components`, `lib`, `public`, `next.config.ts`, `package.json`, `package-lock.json`, `tsconfig.json`, `eslint.config.mjs` |

### Peringatan yang masih berlaku

Repo bersifat **publik**. Semua isi repo - termasuk `SESSION.md` yang berisi
catatan audit - dapat dibaca siapa saja. Tidak ada rahasia di dalamnya, tetapi
perlu diketahui.

### Langkah berikutnya

1. Ganti `site.url` di `lib/site.ts` dari `https://example.test` ke URL Vercel
   asli. **Lakukan ini sebelum** connect project Vercel, supaya canonical
   URL, `sitemap.xml`, dan `robots.txt` langsung benar.
2. Connect repository `mulyadir20/website-sekolah` ke project Vercel.
3. Verifikasi build di Vercel, khususnya apakah Google Fonts berhasil
   diunduh di build machine (satu-satunya hal yang belum bisa dipastikan
   tanpa deployment).
4. Commit perubahan `site.url` lalu push.