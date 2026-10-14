import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { BeritaCard } from "@/components/berita/BeritaCard";
import { Container } from "@/components/ui/Container";
import { AnchorButton } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { berita, cariBerita } from "@/lib/content/berita";
import { whatsappLink } from "@/lib/site";

type Props = PageProps<"/berita/[slug]">;

/** Prerender semua slug berita saat build. */
export function generateStaticParams() {
  return berita.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const item = cariBerita(slug);

  if (!item) return { title: "Berita tidak ditemukan" };

  return {
    title: item.judul,
    description: item.ringkas,
    openGraph: {
      type: "article",
      title: item.judul,
      description: item.ringkas,
      publishedTime: item.tanggalIso,
      images: [{ url: item.image, width: 800, height: 600, alt: item.judul }],
    },
  };
}

/** Detail satu berita, termasuk daftar berita lain. */
export default async function DetailBeritaPage({ params }: Props) {
  const { slug } = await params;
  const item = cariBerita(slug);

  if (!item) notFound();

  const lainnya = berita.filter((lain) => lain.slug !== item.slug);
  const paragraf = item.isi?.length ? item.isi : [item.ringkas];

  return (
    <>
      <Header />
      <main id="konten" className="flex-1">
        <article>
          <header className="bg-sand-50 py-14 sm:py-16">
            <Container>
              <nav aria-label="Remah roti" className="mb-6">
                <Link
                  href="/berita"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-brand-800 transition-colors hover:text-gold-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-700"
                >
                  <Icon name="arrow-right" className="h-4 w-4 rotate-180" />
                  Semua berita
                </Link>
              </nav>

              <p className="flex flex-wrap items-center gap-x-3 gap-y-2 text-xs font-semibold uppercase tracking-wider text-gold-700">
                <span className="rounded-full bg-brand-800 px-3 py-1 text-gold-300">
                  {item.kategori}
                </span>
                <time dateTime={item.tanggalIso} className="text-brand-900/85">
                  {item.tanggal}
                </time>
                <span className="text-brand-900/85">
                  {item.bacaMenit} menit baca
                </span>
              </p>

              <h1 className="mt-4 max-w-3xl font-display text-3xl font-semibold leading-tight tracking-tight text-balance text-brand-950 sm:text-4xl lg:text-5xl">
                {item.judul}
              </h1>

              <p className="mt-5 max-w-2xl text-base leading-relaxed text-pretty text-brand-900/85 sm:text-lg">
                {item.ringkas}
              </p>
            </Container>
          </header>

          <div className="bg-white py-14 sm:py-16">
            <Container>
              <div className="mx-auto max-w-3xl">
                <div className="overflow-hidden rounded-3xl border border-sand-200 shadow-soft">
                  <Image
                    src={item.image}
                    alt={item.judul}
                    width={800}
                    height={600}
                    priority
                    className="h-auto w-full object-cover"
                  />
                </div>

                <div className="mt-10 space-y-5">
                  {paragraf.map((paragraf, index) => (
                    <p
                      key={index}
                      className={`text-base leading-relaxed text-pretty text-brand-900 ${
                        index === 0 ? "font-medium text-brand-950" : ""
                      }`}
                    >
                      {paragraf}
                    </p>
                  ))}
                </div>

                <div className="mt-12 flex flex-col gap-3 border-t border-sand-200 pt-8 sm:flex-row">
                  <AnchorButton
                    href={whatsappLink()}
                    target="_blank"
                    rel="noopener noreferrer"
                    variant="primary"
                  >
                    <Icon name="whatsapp" className="h-4 w-4" />
                    Bagikan ke WhatsApp
                  </AnchorButton>
                  <Link
                    href="/berita"
                    className="inline-flex h-11 items-center justify-center rounded-full px-6 text-sm font-semibold text-brand-800 transition-colors hover:bg-brand-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-700"
                  >
                    Baca berita lainnya
                  </Link>
                </div>
              </div>
            </Container>
          </div>
        </article>

        {lainnya.length > 0 ? (
          <section className="bg-sand-50 py-16 sm:py-20">
            <Container>
              <h2 className="font-display text-2xl font-semibold text-brand-950 sm:text-3xl">
                Berita lainnya
              </h2>

              <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {lainnya.map((lain) => (
                  <BeritaCard key={lain.slug} item={lain} judulTag="h3" />
                ))}
              </div>
            </Container>
          </section>
        ) : null}
      </main>
      <Footer />
    </>
  );
}