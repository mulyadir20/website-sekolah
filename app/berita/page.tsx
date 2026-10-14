import type { Metadata } from "next";

import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { BeritaCard } from "@/components/berita/BeritaCard";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { semuaBerita } from "@/lib/content/berita";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Berita",
  description: `Kabar terbaru, prestasi, dan kegiatan ${site.name}.`,
};

/** Daftar seluruh berita sekolah, diurutkan dari yang terbaru. */
export default function BeritaPage() {
  const daftarBerita = semuaBerita();

  return (
    <>
      <Header />
      <main id="konten" className="flex-1">
        <section className="bg-sand-50 py-16 sm:py-20">
          <Container>
            <SectionHeading
              level="h1"
              eyebrow="Berita"
              title="Kabar Terbaru"
              description="Prestasi dan kegiatan terkini di sekolah."
            />
          </Container>
        </section>

        <section className="bg-white pb-16 sm:pb-20">
          <Container>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {daftarBerita.map((item) => (
                <BeritaCard key={item.slug} item={item} judulTag="h2" />
              ))}
            </div>
          </Container>
        </section>
      </main>
      <Footer />
    </>
  );
}