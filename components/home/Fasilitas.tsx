import Image from "next/image";

import { fasilitas } from "@/lib/content/fasilitas";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";

/** Fasilitas pendukung kegiatan belajar dan kegiatan sekolah. */
export function Fasilitas() {
  return (
    <section id="fasilitas" className="bg-white py-16 sm:py-20">
      <Container>
        <SectionHeading
          eyebrow="Fasilitas"
          title="Sarana yang Mendukung Belajar"
          description="Lingkungan yang aman, nyaman, dan mendukung perkembangan murid."
        />

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {fasilitas.map((item) => (
            <article
              key={item.nama}
              className="group overflow-hidden rounded-2xl border border-sand-200 bg-white shadow-soft transition-all hover:-translate-y-1 hover:shadow-lift"
            >
              <div className="aspect-[4/3] overflow-hidden">
                <Image
                  src={item.image}
                  alt={`Ilustrasi ${item.nama}`}
                  width={800}
                  height={600}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="p-6">
                <h3 className="font-display text-lg font-semibold text-brand-950">
                  {item.nama}
                </h3>
                <p className="mt-1.5 text-sm leading-relaxed text-brand-900/85">
                  {item.body}
                </p>
              </div>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}