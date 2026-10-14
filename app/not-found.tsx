import type { Metadata } from "next";

import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { Container } from "@/components/ui/Container";
import { AnchorButton, LinkButton } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { site, whatsappLink } from "@/lib/site";

export const metadata: Metadata = {
  title: "Halaman tidak ditemukan",
  description: `Halaman yang Anda cari tidak tersedia di situs ${site.name}.`,
};

const langkahSingkat = [
  { title: "Kembali ke beranda", body: "Mulai lagi dari halaman utama sekolah." },
  { title: "Telusuri bagian", body: "Gunakan menu di atas untuk profil, program, dan berita." },
  { title: "Hubungi kami", body: "Tim kami siap membantu menjawab pertanyaan Anda." },
];

/** Halaman 404 untuk URL yang tidak cocok dengan route mana pun. */
export default function NotFound() {
  return (
    <>
      <Header />
      <main id="konten" className="flex-1">
        <section className="relative overflow-hidden bg-brand-950 py-20 text-white sm:py-28">
          <div
            aria-hidden="true"
            className="pattern-islamic absolute inset-0 opacity-[0.07]"
          />
          <div
            aria-hidden="true"
            className="absolute -right-24 -top-24 h-80 w-80 rounded-full bg-gold-500/20 blur-3xl"
          />

          <Container className="relative">
            <div className="mx-auto max-w-2xl text-center">
              <p className="font-display text-7xl font-semibold text-gold-300 sm:text-8xl">
                404
              </p>
              <h1 className="mt-4 font-display text-3xl font-semibold leading-tight text-balance sm:text-4xl">
                Halaman tidak ditemukan
              </h1>
              <p className="mt-4 text-base leading-relaxed text-pretty text-brand-100/85 sm:text-lg">
                Maaf, halaman yang Anda cari sudah dipindahkan atau tidak pernah
                ada. Silakan kembali ke beranda atau hubungi tim {site.shortName}{" "}
                untuk bantuan lebih lanjut.
              </p>

              <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
                <LinkButton href="/" size="lg" variant="gold">
                  Kembali ke Beranda
                  <Icon name="arrow-right" className="h-5 w-5" />
                </LinkButton>
                <AnchorButton
                  href={whatsappLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  size="lg"
                  variant="outline"
                  className="border-white/25 bg-white/5 text-white hover:border-white/50 hover:bg-white/10"
                >
                  <Icon name="whatsapp" className="h-5 w-5" />
                  Hubungi Kami
                </AnchorButton>
              </div>
            </div>
          </Container>
        </section>

        <section className="bg-white py-16 sm:py-20">
          <Container>
            <div className="grid gap-5 sm:grid-cols-3">
              {langkahSingkat.map((item) => (
                <div
                  key={item.title}
                  className="rounded-2xl border border-sand-200 bg-sand-50 p-6"
                >
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-white text-brand-700 shadow-soft">
                    <Icon name="check" className="h-5 w-5" />
                  </span>
                  <h2 className="mt-4 font-display text-lg font-semibold text-brand-950">
                    {item.title}
                  </h2>
                  <p className="mt-2 text-sm leading-relaxed text-brand-900/80">
                    {item.body}
                  </p>
                </div>
              ))}
            </div>
          </Container>
        </section>
      </main>
      <Footer />
    </>
  );
}