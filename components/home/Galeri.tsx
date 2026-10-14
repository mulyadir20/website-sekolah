import Image from "next/image";

import { galeri } from "@/lib/content/galeri";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";

/** Galeri kegiatan sekolah dengan tata letak bergaya mosaik. */
export function Galeri() {
  return (
    <section id="galeri" className="bg-brand-950 py-16 text-white sm:py-20">
      <Container>
        <SectionHeading
          eyebrow="Galeri"
          title="Dokumentasi Kegiatan"
          description="Potongan keseharian belajar, ibadah, dan berkarya di sekolah."
          tone="dark"
        />

        <div className="mt-14 grid auto-rows-[160px] grid-cols-2 gap-4 sm:auto-rows-[190px] lg:grid-cols-4">
          {galeri.map((item, index) => (
            <figure
              key={item.src}
              className={`group relative overflow-hidden rounded-2xl border border-white/10 ${
                index === 0 ? "col-span-2 row-span-2" : ""
              }`}
            >
              <Image
                src={item.src}
                alt={item.judul}
                width={800}
                height={600}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-brand-950/90 to-transparent p-4 pt-10">
                <p className="text-sm font-medium text-white">{item.judul}</p>
              </figcaption>
            </figure>
          ))}
        </div>
      </Container>
    </section>
  );
}