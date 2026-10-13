"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

import { navigation } from "@/lib/navigation";
import { site } from "@/lib/site";
import { Container } from "@/components/ui/Container";
import { AnchorButton } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";

/**
 * Header sticky dengan navigasi desktop dan menu hamburger untuk mobile.
 * Menu mobile mengunci scroll body saat terbuka dan menutup otomatis
 * setiap kali pengguna memilih tautan.
 */
export function Header() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [open]);

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 1024) setOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-brand-100 bg-white/90 backdrop-blur-md">
      {/* Baris informasi kontak - disembunyikan di layar kecil */}
      <div className="hidden border-b border-brand-800/40 bg-brand-900 text-brand-100 lg:block">
        <Container className="flex h-9 items-center justify-between text-xs">
          <p className="flex items-center gap-2">
            <Icon name="pin" className="h-3.5 w-3.5 text-gold-300" />
            {site.address}
          </p>
          <div className="flex items-center gap-5">
            <a
              href={`tel:${site.phone.replace(/[^\d+]/g, "")}`}
              className="flex items-center gap-1.5 transition-colors hover:text-gold-300"
            >
              <Icon name="phone" className="h-3.5 w-3.5 text-gold-300" />
              {site.phone}
            </a>
            <a
              href={`mailto:${site.email}`}
              className="flex items-center gap-1.5 transition-colors hover:text-gold-300"
            >
              <Icon name="mail" className="h-3.5 w-3.5 text-gold-300" />
              {site.email}
            </a>
          </div>
        </Container>
      </div>

      <Container className="flex h-16 items-center justify-between gap-4 lg:h-20">
        <a href="#beranda" className="flex items-center gap-3">
          <Image
            src="/logo.svg"
            alt={`Logo ${site.name}`}
            width={44}
            height={44}
            priority
            className="h-11 w-11 shrink-0"
          />
          <span className="flex flex-col leading-tight">
            <span className="font-display text-base font-semibold text-brand-950 sm:text-lg">
              {site.shortName}
            </span>
            <span className="hidden text-[11px] text-brand-800/70 sm:block">
              {site.tagline}
            </span>
          </span>
        </a>

        {/* Navigasi desktop */}
        <nav aria-label="Navigasi utama" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {navigation.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="rounded-full px-3 py-2 text-sm font-medium text-brand-900 transition-colors hover:bg-brand-50 hover:text-brand-700"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="hidden lg:block">
          <AnchorButton
            href={`https://wa.me/${site.whatsapp}`}
            target="_blank"
            rel="noopener noreferrer"
            size="sm"
            variant="primary"
          >
            <Icon name="whatsapp" className="h-4 w-4" />
            Pendaftaran
          </AnchorButton>
        </div>

        {/* Tombol menu mobile */}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="menu-mobile"
          aria-label={open ? "Tutup menu" : "Buka menu"}
          className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-brand-200 text-brand-900 transition-colors hover:bg-brand-50 lg:hidden"
        >
          <Icon name={open ? "close" : "menu"} className="h-6 w-6" />
        </button>
      </Container>

      {/* Panel menu mobile */}
      <div
        id="menu-mobile"
        hidden={!open}
        className="border-t border-brand-100 bg-white lg:hidden"
      >
        <Container className="max-h-[calc(100dvh-4rem)] overflow-y-auto py-4">
          <nav aria-label="Navigasi mobile">
            <ul className="flex flex-col gap-1">
              {navigation.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="flex items-center justify-between rounded-xl px-4 py-3 text-base font-medium text-brand-900 transition-colors hover:bg-brand-50"
                  >
                    {item.label}
                    <Icon name="arrow-right" className="h-4 w-4 text-brand-400" />
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="mt-4 flex flex-col gap-2 border-t border-brand-100 pt-4">
            <AnchorButton
              href={`https://wa.me/${site.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              variant="primary"
              full
            >
              <Icon name="whatsapp" className="h-4 w-4" />
              Pendaftaran
            </AnchorButton>
            <AnchorButton
              href={`tel:${site.phone.replace(/[^\d+]/g, "")}`}
              variant="outline"
              full
            >
              <Icon name="phone" className="h-4 w-4" />
              {site.phone}
            </AnchorButton>
          </div>
        </Container>
      </div>
    </header>
  );
}