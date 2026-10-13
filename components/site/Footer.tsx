import Image from "next/image";

import { navigation } from "@/lib/navigation";
import { site } from "@/lib/site";
import { Container } from "@/components/ui/Container";
import { Icon } from "@/components/ui/Icon";

const jamOperasional = [
  { hari: "Senin - Jumat", waktu: "07.00 - 15.00 WIB" },
  { hari: "Sabtu", waktu: "07.00 - 12.00 WIB" },
  { hari: "Ahad", waktu: "Tutup" },
];

/**
 * Tahun berjalan dihitung satu kali lalu di-cache.
 * `new Date()` tidak boleh dipanggil langsung saat render karena nilai ini
 * bisa berubah antar render dan membuat halaman gagal di-prerender.
 */
async function CurrentYear() {
  "use cache";
  return <>{new Date().getFullYear()}</>;
}

/** Footer situs: identitas, navigasi cepat, kontak, dan jam operasional. */
export function Footer() {
  return (
    <footer className="mt-auto border-t border-brand-900 bg-brand-950 text-brand-100">
      <Container className="py-14">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          {/* Identitas */}
          <div className="lg:pr-6">
            <div className="flex items-center gap-3">
              <Image
                src="/logo.svg"
                alt={`Logo ${site.name}`}
                width={48}
                height={48}
                className="h-12 w-12"
              />
              <span className="font-display text-lg font-semibold text-white">
                {site.shortName}
              </span>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-brand-100/70">
              Berdiri sejak {site.established}. {site.tagline}.
            </p>
            <p className="mt-4 inline-flex items-center gap-2 rounded-full border border-gold-500/40 px-3 py-1 text-xs font-medium text-gold-300">
              <Icon name="shield" className="h-3.5 w-3.5" />
              {site.accreditation}
            </p>
          </div>

          {/* Navigasi */}
          <nav aria-label="Navigasi footer">
            <h3 className="font-display text-base font-semibold text-white">
              Tautan
            </h3>
            <ul className="mt-4 space-y-2.5">
              {navigation.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="text-sm text-brand-100/70 transition-colors hover:text-gold-300"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Kontak */}
          <div>
            <h3 className="font-display text-base font-semibold text-white">
              Kontak
            </h3>
            <ul className="mt-4 space-y-3 text-sm text-brand-100/70">
              <li className="flex gap-3">
                <Icon name="pin" className="mt-0.5 h-4 w-4 shrink-0 text-gold-300" />
                <span>{site.address}</span>
              </li>
              <li className="flex gap-3">
                <Icon name="phone" className="mt-0.5 h-4 w-4 shrink-0 text-gold-300" />
                <a href={`tel:${site.phone.replace(/[^\d+]/g, "")}`} className="hover:text-gold-300">
                  {site.phone}
                </a>
              </li>
              <li className="flex gap-3">
                <Icon name="mail" className="mt-0.5 h-4 w-4 shrink-0 text-gold-300" />
                <a href={`mailto:${site.email}`} className="hover:text-gold-300">
                  {site.email}
                </a>
              </li>
            </ul>
          </div>

          {/* Jam operasional */}
          <div>
            <h3 className="font-display text-base font-semibold text-white">
              Jam Operasional
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm text-brand-100/70">
              {jamOperasional.map((row) => (
                <li
                  key={row.hari}
                  className="flex items-center justify-between gap-4 border-b border-brand-800/60 pb-2.5 last:border-0"
                >
                  <span className="flex items-center gap-2">
                    <Icon name="clock" className="h-4 w-4 text-gold-300" />
                    {row.hari}
                  </span>
                  <span className="whitespace-nowrap text-brand-100/90">
                    {row.waktu}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>

      <div className="border-t border-brand-900">
        <Container className="flex flex-col items-center justify-between gap-3 py-5 text-xs text-brand-100/60 sm:flex-row">
          <p>
            <CurrentYear /> {site.name}. Seluruh hak cipta dilindungi.
          </p>
          <p>Berbasis nilai Adab dan Ilmu</p>
        </Container>
      </div>
    </footer>
  );
}