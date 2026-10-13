type IconProps = {
  name: IconName;
  className?: string;
};

export type IconName =
  | "menu"
  | "close"
  | "phone"
  | "mail"
  | "pin"
  | "clock"
  | "whatsapp"
  | "arrow-right"
  | "check"
  | "quote"
  | "users"
  | "layout"
  | "book"
  | "shield"
  | "trophy"
  | "cpu"
  | "seedling"
  | "compass"
  | "star"
  | "moon"
  | "heart";

const paths: Record<IconName, React.ReactNode> = {
  menu: <path d="M4 7h16M4 12h16M4 17h16" />,
  close: <path d="M6 6l12 12M18 6L6 18" />,
  phone: (
    <path d="M5 4h3l2 5-2 1a11 11 0 005 5l1-2 5 2v3a2 2 0 01-2 2A16 16 0 013 6a2 2 0 012-2z" />
  ),
  mail: (
    <>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="M3.5 7l8.5 6 8.5-6" />
    </>
  ),
  pin: (
    <>
      <path d="M12 21s7-5.5 7-11a7 7 0 10-14 0c0 5.5 7 11 7 11z" />
      <circle cx="12" cy="10" r="2.5" />
    </>
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </>
  ),
  whatsapp: (
    <path d="M12 3a9 9 0 00-7.7 13.6L3 21l4.6-1.2A9 9 0 1012 3zm4.6 12.3c-.2.6-1.2 1.2-1.7 1.2-.5.1-1 .2-3.3-.7-2.7-1.1-4.5-3.9-4.6-4.1-.1-.2-1-1.5-1-2.8s.7-1.9 1-2.2c.2-.2.5-.3.7-.3h.5c.2 0 .4 0 .6.5l.8 2c.1.2.1.4 0 .6l-.4.5c-.1.2-.3.3-.1.6.2.3.7 1.2 1.5 1.9 1 .9 1.8 1.2 2.1 1.3.2.1.4.1.5-.1l.7-.8c.2-.2.3-.2.6-.1l1.9.9c.3.1.4.2.5.3.1.2.1.6-.1 1.1z" />
  ),
  "arrow-right": <path d="M5 12h14m-6-6l6 6-6 6" />,
  check: <path d="M5 12.5l4.5 4.5L19 7.5" />,
  quote: (
    <path d="M9 6C6 7.5 4.5 10 4.5 13v5h6v-6H8c0-2 .7-3.5 2.5-4.5L9 6zm10 0c-3 1.5-4.5 4-4.5 7v5h6v-6H18c0-2 .7-3.5 2.5-4.5L19 6z" />
  ),
  users: (
    <>
      <circle cx="9" cy="8" r="3" />
      <path d="M3 19a6 6 0 0112 0" />
      <path d="M16 11a3 3 0 100-6M17 19a6 6 0 00-2-4.5" />
    </>
  ),
  layout: (
    <>
      <rect x="3" y="4" width="18" height="16" rx="2" />
      <path d="M9 4v16" />
    </>
  ),
  book: (
    <>
      <path d="M4 5.5A2.5 2.5 0 016.5 3H19v15H6.5A2.5 2.5 0 004 20.5z" />
      <path d="M4 18.5A2.5 2.5 0 016.5 16H19v5H6.5A2.5 2.5 0 014 18.5z" />
    </>
  ),
  shield: <path d="M12 3l7 3v6c0 4.5-3 7.7-7 9-4-1.3-7-4.5-7-9V6z" />,
  trophy: (
    <>
      <path d="M7 4h10v5a5 5 0 01-10 0z" />
      <path d="M17 5h3v2a3 3 0 01-3 3M7 5H4v2a3 3 0 003 3" />
      <path d="M10 14h4v3h-4zM8 20h8" />
    </>
  ),
  cpu: (
    <>
      <rect x="7" y="7" width="10" height="10" rx="2" />
      <path d="M10 3v2M14 3v2M10 19v2M14 19v2M3 10h2M3 14h2M19 10h2M19 14h2" />
    </>
  ),
  seedling: (
    <>
      <path d="M12 21v-7" />
      <path d="M12 14c0-3.3 2.7-6 6-6 0 3.3-2.7 6-6 6z" />
      <path d="M12 14c0-2.8-2.2-5-5-5 0 2.8 2.2 5 5 5z" />
    </>
  ),
  compass: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M15.5 8.5l-2 5-5 2 2-5z" />
    </>
  ),
  star: <path d="M12 3l2.6 5.6 6 .8-4.4 4.2 1.1 6-5.3-3-5.3 3 1.1-6L3.4 9.4l6-.8z" />,
  moon: <path d="M20 14.5A8.5 8.5 0 019.5 4a8.5 8.5 0 1010.5 10.5z" />,
  heart: (
    <path d="M12 20s-7-4.5-7-9.5A4 4 0 0112 8a4 4 0 017 2.5C19 15.5 12 20 12 20z" />
  ),
};

/** Ikon SVG inline agar tidak perlu dependensi icon eksternal. */
export function Icon({ name, className = "h-5 w-5" }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.7}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      {paths[name]}
    </svg>
  );
}