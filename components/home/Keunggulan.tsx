import { keunggulan } from "@/lib/content/keunggulan";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Icon } from "@/components/ui/Icon";

/** Keunggulan sekolah yang menjadi alasan memilih sekolah ini. */
export function Keunggulan() {
  return (
    <section id="keunggulan" className="bg-white py-16 sm:py-20">
      <Container>
        <SectionHeading
          eyebrow="Keunggulan"
          title="Mengapa Memilih Kami"
          description="Hal yang kami jaga setiap hari agar murid tumbuh optimal."
        />

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {keunggulan.map((item) => (
            <div
              key={item.title}
              className="flex gap-4 rounded-2xl border border-sand-200 bg-sand-50 p-6"
            >
              <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white text-gold-700 shadow-soft">
                <Icon name={item.icon} className="h-5 w-5" />
              </span>
              <div>
                <h3 className="font-display text-lg font-semibold text-brand-950">
                  {item.title}
                </h3>
                <p className="mt-1.5 text-sm leading-relaxed text-brand-900/85">
                  {item.body}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}