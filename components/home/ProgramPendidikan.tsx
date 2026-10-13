import { programs } from "@/lib/content/program";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Icon, type IconName } from "@/components/ui/Icon";

/** Daftar program pendidikan dari TK hingga SMA, plus dayah dan beasiswa. */
export function ProgramPendidikan() {
  return (
    <section
      id="program"
      className="scroll-mt-24 bg-sand-50 py-16 sm:py-20"
    >
      <Container>
        <SectionHeading
          eyebrow="Program Pendidikan"
          title="Jenjang yang Kami Sediakan"
          description="Setiap jenjang memiliki kurikulum, pembiasaan, dan pendampingan yang khas."
        />

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {programs.map((program) => (
            <article
              key={program.title}
              className="group rounded-2xl border border-sand-200 bg-white p-7 shadow-soft transition-all hover:-translate-y-1 hover:border-brand-200 hover:shadow-lift"
            >
              <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-50 text-brand-700 transition-colors group-hover:bg-brand-800 group-hover:text-white">
                <Icon name={program.icon as IconName} className="h-6 w-6" />
              </span>
              <h3 className="mt-5 font-display text-xl font-semibold text-brand-950">
                {program.title}
              </h3>
              <p className="mt-2.5 text-sm leading-relaxed text-brand-900/70">
                {program.body}
              </p>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}