import { misi, visi } from "@/lib/content/visiMisi";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Icon } from "@/components/ui/Icon";

/** Visi dan misi sekolah, ditampilkan berdampingan. */
export function VisiMisi() {
  return (
    <section
      id="visi-misi"
      className="relative overflow-hidden bg-brand-900 py-16 text-white sm:py-20"
    >
      <div
        aria-hidden="true"
        className="pattern-islamic absolute inset-0 opacity-[0.07]"
      />

      <Container className="relative">
        <SectionHeading
          eyebrow="Visi &amp; Misi"
          title="Arah Pendidikan Kami"
          description="Visi menjadi kompas, misi menjadi langkah harian."
          tone="dark"
        />

        <div className="mt-12 grid gap-6 lg:grid-cols-5">
          {/* Visi */}
          <article className="relative overflow-hidden rounded-3xl border border-gold-500/30 bg-brand-950/60 p-8 lg:col-span-2">
            <div
              aria-hidden="true"
              className="absolute -right-6 -top-6 h-28 w-28 rounded-full bg-gold-500/10 blur-2xl"
            />
            <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gold-500/15 text-gold-300">
              <Icon name="compass" className="h-6 w-6" />
            </span>
            <h3 className="mt-6 font-display text-xl font-semibold text-gold-300">
              Visi
            </h3>
            <p className="mt-4 font-display text-lg leading-relaxed text-pretty text-white">
              {visi}
            </p>
          </article>

          {/* Misi */}
          <div className="grid gap-4 sm:grid-cols-2 lg:col-span-3">
            {misi.map((item, index) => (
              <article
                key={item.title}
                className="rounded-2xl border border-white/12 bg-white/5 p-6 backdrop-blur-sm"
              >
                <div className="flex items-center gap-3">
                  <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand-500/20 text-sm font-semibold text-gold-300">
                    {index + 1}
                  </span>
                  <h3 className="font-display text-lg font-semibold text-white">
                    {item.title}
                  </h3>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-brand-100/75">
                  {item.body}
                </p>
              </article>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}