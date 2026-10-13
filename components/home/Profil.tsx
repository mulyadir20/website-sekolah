import Image from "next/image";

import { profilPoints } from "@/lib/content/profil";
import { site } from "@/lib/site";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { LinkButton } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";

/** Profil singkat sekolah beserta poin-poin kekuatannya. */

/** Profil singkat sekolah: narasi, poin-poin kekuatan, dan ajakanfurther reading. */
export function Profil() {
  return (
    <section id="profil" className="scroll-mt-24 bg-sand-50 py-16 sm:py-20">
      <Container>
        <div className="grid items-start gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Narasi */}
          <div>
            <SectionHeading
              eyebrow="Profil Sekolah"
              title="Mendidik dengan Adab dan Ilmu"
              align="left"
            />

            <div className="mt-6 space-y-4 text-base leading-relaxed text-pretty text-brand-900/75">
              <p>
                Berdiri sejak {site.established}, kami menjalankan
                pendidikan berbasis nilai Islam yang menyeimbangkan penguasaan
                ilmu, akhlak, dan keterampilan hidup.
              </p>
              <p>
                Setiap murid mengikuti program tahfidz berjenjang, pembelajaran
                berbasis proyek, serta pendampingan karakter oleh wali kelas.
                Seluruh kegiatan diarahkan agar murid tumbuh menjadi pribadi
                yang beriman, berakhlak, dan mandiri.
              </p>
            </div>

            <div className="mt-8">
              <LinkButton href="#visi-misi" variant="outline">
                Lihat Visi &amp; Misi
                <Icon name="arrow-right" className="h-4 w-4" />
              </LinkButton>
            </div>
          </div>

          {/* Poin-poin profil */}
          <div className="grid gap-4 sm:grid-cols-2">
            {profilPoints.map((point) => (
              <article
                key={point.title}
                className="rounded-2xl border border-sand-200 bg-white p-6 shadow-soft transition-shadow hover:shadow-lift"
              >
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-brand-50 text-brand-700">
                  <Icon name="check" className="h-5 w-5" />
                </span>
                <h3 className="mt-4 font-display text-lg font-semibold text-brand-950">
                  {point.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-brand-900/70">
                  {point.body}
                </p>
              </article>
            ))}

            <div className="overflow-hidden rounded-2xl border border-sand-200 shadow-soft sm:col-span-2">
              <Image
                src="/images/profil-guru.svg"
                alt="Ilustrasi kegiatan mengajar di kelas"
                width={800}
                height={600}
                className="h-56 w-full object-cover sm:h-64"
              />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}