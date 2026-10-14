import { timeline } from "@/lib/content/timeline";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";

/** Sejarah singkat sekolah dalam bentuk linimasa. */
export function Sejarah() {
  return (
    <section id="sejarah" className="bg-white py-16 sm:py-20">
      <Container>
        <SectionHeading
          eyebrow="Sejarah"
          title="Perjalanan Kami"
          description="Bertumbuh bersama warga, dari ruang kelas sederhana menjadi sekolah Islam terpadu yang dikenal."
        />

        <ol className="relative mt-14 grid gap-8 md:grid-cols-2 lg:grid-cols-5">
          {/* Garis penghubung */}
          <span
            aria-hidden="true"
            className="absolute left-0 top-3 hidden h-px w-full bg-gradient-to-r from-brand-200 via-gold-300 to-brand-200 lg:block"
          />

          {timeline.map((item, index) => (
            <li key={item.year} className="relative pl-8 lg:pl-0">
              <span
                aria-hidden="true"
                className="absolute left-0 top-1.5 flex h-4 w-4 items-center justify-center rounded-full border-2 border-gold-400 bg-white lg:static"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-brand-700" />
              </span>

              {/* Garis penghubung vertikal, disejajarkan dengan titik. */}
              {index < timeline.length - 1 ? (
                <span
                  aria-hidden="true"
                  className="absolute left-[7.5px] top-[22px] h-[calc(100%-1.25rem)] w-px bg-brand-100 lg:hidden"
                />
              ) : null}

              <p className="mt-0 font-display text-2xl font-semibold text-brand-800">
                {item.year}
              </p>
              <h3 className="mt-2 font-display text-lg font-semibold text-brand-950">
                {item.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-brand-900/85">
                {item.body}
              </p>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}