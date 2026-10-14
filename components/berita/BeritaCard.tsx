import Image from "next/image";
import Link from "next/link";

import type { BeritaItem } from "@/lib/content/berita";
import { Icon } from "@/components/ui/Icon";

type BeritaCardProps = {
  item: BeritaItem;
  /** Judul memakai `h2` di halaman daftar, `h3` di beranda. */
  judulTag?: "h2" | "h3";
};

/** Kartu berita, dipakai bersama oleh section beranda dan halaman daftar berita. */
export function BeritaCard({ item, judulTag: Tag = "h3" }: BeritaCardProps) {
  const href = `/berita/${item.slug}`;

  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-sand-200 bg-white shadow-soft transition-all hover:-translate-y-1 hover:shadow-lift">
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={item.image}
          alt={item.judul}
          width={800}
          height={600}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <span className="absolute left-4 top-4 rounded-full bg-brand-900/90 px-3 py-1 text-xs font-semibold text-gold-300">
          {item.kategori}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-6">
        <p className="flex items-center gap-2 text-xs text-brand-900/85">
          <Icon name="clock" className="h-3.5 w-3.5" />
          <time dateTime={item.tanggalIso}>{item.tanggal}</time>
        </p>

        <Tag className="mt-3 font-display text-lg font-semibold leading-snug text-brand-950">
          <Link
            href={href}
            className="transition-colors hover:text-brand-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-700"
          >
            {item.judul}
          </Link>
        </Tag>

        <p className="mt-2.5 flex-1 text-sm leading-relaxed text-brand-900/85">
          {item.ringkas}
        </p>

        <Link
          href={href}
          className="mt-5 inline-flex items-center gap-1.5 self-start text-sm font-semibold text-brand-700 transition-colors hover:text-gold-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-700"
        >
          Baca selengkapnya
          <Icon
            name="arrow-right"
            className="h-4 w-4 transition-transform group-hover:translate-x-1"
          />
        </Link>
      </div>
    </article>
  );
}