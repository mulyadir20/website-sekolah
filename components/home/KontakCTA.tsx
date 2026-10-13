import { site } from "@/lib/site";
import { Container } from "@/components/ui/Container";
import { AnchorButton } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";

const jamOperasional = [
  { hari: "Senin - Jumat", waktu: "07.00 - 15.00 WIB" },
  { hari: "Sabtu", waktu: "07.00 - 12.00 WIB" },
  { hari: "Ahad", waktu: "Tutup" },
];

/** Ajakan mendaftar beserta informasi kontak dan lokasi sekolah. */
export function KontakCTA() {
  return (
    <section id="kontak" className="scroll-mt-24 bg-sand-50 py-16 sm:py-20">
      <Container>
        <div className="grid gap-6 lg:grid-cols-5">
          {/* Ajakan pendaftaran */}
          <div className="relative overflow-hidden rounded-3xl bg-brand-900 p-8 text-white sm:p-10 lg:col-span-3">
            <div
              aria-hidden="true"
              className="pattern-islamic absolute inset-0 opacity-[0.07]"
            />
            <div className="relative">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gold-300">
                Pendaftaran {site.academicYear}
              </p>
              <h2 className="mt-3 font-display text-3xl font-semibold leading-tight text-balance sm:text-4xl">
                Bergabunglah bersama{" "}
                <span className="text-gold-300">{site.shortName}</span>
              </h2>
              <p className="mt-4 max-w-lg text-base leading-relaxed text-brand-100/80">
                Jadwalkan kunjungan kampus, tanyakan program, dan periksa
                pendaftaran murid baru bersama tim penerimaan.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <AnchorButton
                  href={`https://wa.me/${site.whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  size="lg"
                  variant="gold"
                >
                  <Icon name="whatsapp" className="h-5 w-5" />
                  Hubungi via WhatsApp
                </AnchorButton>
                <AnchorButton
                  href={`mailto:${site.email}`}
                  size="lg"
                  variant="outline"
                  className="border-white/25 bg-white/5 text-white hover:border-white/50 hover:bg-white/10"
                >
                  <Icon name="mail" className="h-5 w-5" />
                  Kirim Email
                </AnchorButton>
              </div>
            </div>
          </div>

          {/* Detail kontak */}
          <div className="rounded-3xl border border-sand-200 bg-white p-8 shadow-soft lg:col-span-2">
            <h3 className="font-display text-xl font-semibold text-brand-950">
              Informasi Kontak
            </h3>

            <ul className="mt-6 space-y-5">
              <li className="flex gap-4">
                <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-700">
                  <Icon name="pin" className="h-5 w-5" />
                </span>
                <div>
                  <p className="text-sm font-semibold text-brand-950">Alamat</p>
                  <p className="mt-1 text-sm leading-relaxed text-brand-900/70">
                    {site.address}
                  </p>
                </div>
              </li>
              <li className="flex gap-4">
                <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-700">
                  <Icon name="phone" className="h-5 w-5" />
                </span>
                <div>
                  <p className="text-sm font-semibold text-brand-950">Telepon</p>
                  <a
                    href={`tel:${site.phone.replace(/[^\d+]/g, "")}`}
                    className="mt-1 block text-sm text-brand-900/70 hover:text-brand-700"
                  >
                    {site.phone}
                  </a>
                </div>
              </li>
              <li className="flex gap-4">
                <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-700">
                  <Icon name="mail" className="h-5 w-5" />
                </span>
                <div>
                  <p className="text-sm font-semibold text-brand-950">Email</p>
                  <a
                    href={`mailto:${site.email}`}
                    className="mt-1 block text-sm break-all text-brand-900/70 hover:text-brand-700"
                  >
                    {site.email}
                  </a>
                </div>
              </li>
            </ul>

            <h4 className="mt-8 text-sm font-semibold text-brand-950">
              Jam Operasional
            </h4>
            <ul className="mt-3 divide-y divide-sand-200 border-y border-sand-200">
              {jamOperasional.map((row) => (
                <li
                  key={row.hari}
                  className="flex items-center justify-between py-3 text-sm"
                >
                  <span className="text-brand-900/70">{row.hari}</span>
                  <span className="font-medium text-brand-950">{row.waktu}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </section>
  );
}