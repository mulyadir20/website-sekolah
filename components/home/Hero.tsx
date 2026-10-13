import Image from "next/image";

import { heroStats } from "@/lib/content/profil";
import { site } from "@/lib/site";
import { Container } from "@/components/ui/Container";
import { AnchorButton, LinkButton } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";

/** Bagian pembuka: identitas sekolah, ringkasan, tombol aksi, dan statistik. */
export function Hero() {
  return (
    <section
      id="beranda"
      className="relative overflow-hidden bg-brand-950 text-white"
    >
      <div
        aria-hidden="true"
        className="pattern-islamic absolute inset-0 opacity-[0.07]"
      />
      <div
        aria-hidden="true"
        className="absolute -right-24 -top-24 h-80 w-80 rounded-full bg-gold-500/20 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="absolute -bottom-32 -left-24 h-80 w-80 rounded-full bg-brand-500/20 blur-3xl"
      />

      <Container className="relative py-14 sm:py-20 lg:py-24">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Teks */}
          <div>
            <p className="inline-flex items-center gap-2 rounded-full border border-gold-500/40 bg-gold-500/10 px-4 py-1.5 text-xs font-semibold tracking-wide text-gold-300">
              <Icon name="star" className="h-3.5 w-3.5" />
              Pendaftaran {site.academicYear} telah dibuka
            </p>

            <h1 className="mt-6 font-display text-4xl font-semibold leading-[1.1] tracking-tight text-balance sm:text-5xl lg:text-6xl">
              {site.name}
            </h1>

            <p className="mt-4 font-display text-xl text-gold-300 sm:text-2xl">
              {site.tagline}
            </p>

            <p className="mt-6 max-w-xl text-base leading-relaxed text-pretty text-brand-100/80 sm:text-lg">
              Pendidikan Islam terpadu yang memadukan kokurikuler Al-Qur&apos;an
              dengan standar akademik nasional. Kami membentuk generasi yang
              berakhlak mulia, berdaya saing, dan berpegang teguh pada nilai
              Al-Qur&apos;an serta Sunnah.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <LinkButton href="#program" size="lg" variant="gold">
                Informasi Program
                <Icon name="arrow-right" className="h-5 w-5" />
              </LinkButton>
              <AnchorButton
                href={`https://wa.me/${site.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                size="lg"
                variant="outline"
                className="border-white/25 bg-white/5 text-white hover:border-white/50 hover:bg-white/10"
              >
                <Icon name="whatsapp" className="h-5 w-5" />
                Hubungi Kami
              </AnchorButton>
            </div>

            <p className="mt-6 flex items-center gap-2 text-sm text-brand-100/70">
              <Icon name="pin" className="h-4 w-4 text-gold-300" />
              {site.address}
            </p>
          </div>

          {/* Gambar */}
          <div className="relative">
            <div className="overflow-hidden rounded-3xl border border-white/15 bg-brand-900 shadow-lift">
              <Image
                src="/images/hero-campus.svg"
                alt="Ilustrasi gedung sekolah dengan masjid dan menara"
                width={1200}
                height={760}
                priority
                className="h-full w-full object-cover"
              />
            </div>

            {/* Kartu informasi akreditasi */}
            <div className="relative z-10 -mt-4 rounded-2xl border border-brand-100 bg-white p-4 text-brand-950 shadow-soft sm:absolute sm:-bottom-5 sm:left-8 sm:right-auto sm:top-auto sm:mt-0 sm:w-64">
              <p className="text-xs font-semibold uppercase tracking-wider text-gold-600">
                Akreditasi
              </p>
              <p className="mt-1 font-display text-2xl font-semibold">
                {site.accreditation}
              </p>
              <p className="mt-1 text-xs text-brand-800/70">
                Terdaftar dan terakreditasi resmi
              </p>
            </div>
          </div>
        </div>

        {/* Statistik */}
        <dl className="mt-16 grid grid-cols-2 gap-4 border-t border-white/10 pt-10 lg:grid-cols-4">
          {heroStats.map((stat) => (
            <div key={stat.label} className="text-center lg:text-left">
              <dt className="sr-only">{stat.label}</dt>
              <dd>
                <span className="block font-display text-3xl font-semibold text-gold-300 sm:text-4xl">
                  {stat.value}
                </span>
                <span className="mt-1 block text-sm text-brand-100/70">
                  {stat.label}
                </span>
              </dd>
            </div>
          ))}
        </dl>
      </Container>
    </section>
  );
}