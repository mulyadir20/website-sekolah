import Image from "next/image";

import { berita } from "@/lib/content/berita";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Icon } from "@/components/ui/Icon";

/** Tiga berita terbaru sekolah. */
export function Berita() {
  return (
    <section id="berita" className="scroll-mt-24 bg-sand-50 py-16 sm:py-20">
      <Container>
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeading
            eyebrow="Berita"
            title="Kabar Terbaru"
            description="Prestasi dan kegiatan terkini di sekolah."
            align="left"
          />
          <a
            href="#galeri"
            className="inline-flex shrink-0 items-center gap-2 text-sm font-semibold text-brand-800 transition-colors hover:text-gold-600"
          >
            Lihat dokumentasi
            <Icon name="arrow-right" className="h-4 w-4" />
          </a>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {berita.map((item) => (
            <article
              key={item.judul}
              className="group flex flex-col overflow-hidden rounded-2xl border border-sand-200 bg-white shadow-soft transition-all hover:-translate-y-1 hover:shadow-lift"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={item.image}
                  alt={item.judul}
                  width={800}
                  height={600}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <span className="absolute left-4 top-4 rounded-full bg-brand-900/90 px-3 py-1 text-xs font-semibold text-gold-300">
                  {item.kategori}
                </span>
              </div>

              <div className="flex flex-1 flex-col p-6">
                <p className="flex items-center gap-2 text-xs text-brand-900/55">
                  <Icon name="clock" className="h-3.5 w-3.5" />
                  {item.tanggal}
                </p>
                <h3 className="mt-3 font-display text-lg font-semibold leading-snug text-brand-950">
                  {item.judul}
                </h3>
                <p className="mt-2.5 flex-1 text-sm leading-relaxed text-brand-900/70">
                  {item.ringkas}
                </p>
                <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-700">
                  Baca selengkapnya
                  <Icon
                    name="arrow-right"
                    className="h-4 w-4 transition-transform group-hover:translate-x-1"
                  />
                </span>
              </div>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}