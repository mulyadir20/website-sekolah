import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

type Variant = "primary" | "outline" | "ghost" | "gold";
type Size = "sm" | "md" | "lg";

type StyleProps = {
  variant?: Variant;
  size?: Size;
  full?: boolean;
  className?: string;
  children: ReactNode;
};

const base =
  "inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-700 disabled:pointer-events-none disabled:opacity-60";

const variants: Record<Variant, string> = {
  primary: "bg-brand-800 text-white hover:bg-brand-900",
  gold: "bg-gold-500 text-brand-950 hover:bg-gold-400",
  outline:
    "border border-brand-200 bg-white text-brand-900 hover:border-brand-400 hover:bg-brand-50",
  ghost: "text-brand-800 hover:bg-brand-50",
};

const sizes: Record<Size, string> = {
  sm: "h-9 px-4 text-sm",
  md: "h-11 px-6 text-sm",
  lg: "h-13 px-8 text-base",
};

function classes({ variant = "primary", size = "md", full, className }: StyleProps) {
  return [
    base,
    variants[variant],
    sizes[size],
    full ? "w-full" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");
}

type LinkButtonProps = StyleProps &
  Pick<ComponentProps<typeof Link>, "href" | "onClick" | "target" | "rel">;

/** Tombol yang menavigasi ke halaman atau anchor lain. */
export function LinkButton({
  variant,
  size,
  full,
  className,
  children,
  ...rest
}: LinkButtonProps) {
  return (
    <Link className={classes({ variant, size, full, className, children })} {...rest}>
      {children}
    </Link>
  );
}

type AnchorButtonProps = StyleProps &
  Pick<ComponentProps<"a">, "href" | "onClick" | "target" | "rel">;

/** Tombol untuk tautan eksternal (telepon, email, WhatsApp). */
export function AnchorButton({
  variant,
  size,
  full,
  className,
  children,
  ...rest
}: AnchorButtonProps) {
  return (
    <a className={classes({ variant, size, full, className, children })} {...rest}>
      {children}
    </a>
  );
}