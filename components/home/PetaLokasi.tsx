import {
  schoolAddressLine,
  schoolMap,
  schoolMapEmbedUrl,
  site,
} from "@/lib/site";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Icon } from "@/components/ui/Icon";

/**
 * Peta lokasi sekolah, diletakkan sebelum section kontak.
 *
 * Peta ditampilkan sebagai `<iframe>` ke URL embed resmi Google Maps,
 * bukan `<img>`, jadi tetap interaktif (bisa zoom dan geser). Tombol di
 * bawahnya membuka tautan berbagi resmi bila pengunjung mau rute.
 */
export function PetaLokasi() {
  return (
    <section id="lokasi" className="bg-white py-16 sm:py-20">
      <Container>
        <SectionHeading
          eyebrow="Lokasi"
          title={site.shortName}
          description={schoolAddressLine}
        />

        <div className="mt-12 overflow-hidden rounded-3xl border border-sand-200 bg-sand-50 shadow-soft">
          <iframe
            src={schoolMapEmbedUrl}
            title={`Peta lokasi ${site.name}`}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
            className="block h-[320px] w-full border-0 sm:h-[420px] lg:h-[480px]"
          />
        </div>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="flex items-start gap-3 text-sm leading-relaxed text-brand-900/85">
            <Icon name="pin" className="mt-0.5 h-5 w-5 shrink-0 text-gold-700" />
            <span>{schoolAddressLine}</span>
          </p>
          <a
            href={schoolMap.shareUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-11 shrink-0 items-center justify-center gap-2 rounded-full border border-brand-700 px-6 text-sm font-semibold text-brand-800 transition-colors hover:border-brand-500 hover:bg-brand-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-700"
          >
            <Icon name="pin" className="h-4 w-4" />
            Buka di Google Maps
          </a>
        </div>
      </Container>
    </section>
  );
}