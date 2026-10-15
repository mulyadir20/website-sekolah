import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { Hero } from "@/components/home/Hero";
import { Profil } from "@/components/home/Profil";
import { Sejarah } from "@/components/home/Sejarah";
import { VisiMisi } from "@/components/home/VisiMisi";
import { ProgramPendidikan } from "@/components/home/ProgramPendidikan";
import { Keunggulan } from "@/components/home/Keunggulan";
import { Berita } from "@/components/home/Berita";
import { Fasilitas } from "@/components/home/Fasilitas";
import { Galeri } from "@/components/home/Galeri";
import { PetaLokasi } from "@/components/home/PetaLokasi";
import { KontakCTA } from "@/components/home/KontakCTA";

export default function Home() {
  return (
    <>
      <Header />
      <main id="konten" className="flex-1">
        <Hero />
        <Profil />
        <Sejarah />
        <VisiMisi />
        <ProgramPendidikan />
        <Keunggulan />
        <Berita />
        <Fasilitas />
        <Galeri />
        <PetaLokasi />
        <KontakCTA />
      </main>
      <Footer />
    </>
  );
}