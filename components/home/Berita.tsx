import Link from "next/link";

import { berita } from "@/lib/content/berita";
import { BeritaCard } from "@/components/berita/BeritaCard";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Icon } from "@/components/ui/Icon";

/** Tiga berita terbaru sekolah. */
export function Berita() {
  return (
    <section id="berita" className="bg-sand-50 py-16 sm:py-20">
      <Container>
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeading
            eyebrow="Berita"
            title="Kabar Terbaru"
            description="Prestasi dan kegiatan terkini di sekolah."
            align="left"
          />
          <Link
            href="/berita"
            className="inline-flex shrink-0 items-center gap-2 text-sm font-semibold text-brand-800 transition-colors hover:text-gold-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-700"
          >
            Semua berita
            <Icon name="arrow-right" className="h-4 w-4" />
          </Link>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {berita.map((item) => (
            <BeritaCard key={item.slug} item={item} />
          ))}
        </div>
      </Container>
    </section>
  );
}