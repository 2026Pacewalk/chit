import React from "react";

type IconProps = React.SVGProps<SVGSVGElement> & { size?: number };

function Base({ size = 20, children, ...props }: IconProps & { children: React.ReactNode }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      {children}
    </svg>
  );
}

export const SearchIcon = (p: IconProps) => (
  <Base {...p}><circle cx="11" cy="11" r="7" /><path d="m21 21-4.3-4.3" /></Base>
);

export const BagIcon = (p: IconProps) => (
  <Base {...p}><path d="M6 7h12l1 14H5L6 7Z" /><path d="M9 10V6a3 3 0 0 1 6 0v4" /></Base>
);

export const HeartIcon = (p: IconProps & { filled?: boolean }) => {
  const { filled, ...rest } = p;
  return (
    <Base {...rest} fill={filled ? "currentColor" : "none"}>
      <path d="M19.5 12.6 12 20l-7.5-7.4A5 5 0 1 1 12 6.3a5 5 0 1 1 7.5 6.3Z" />
    </Base>
  );
};

export const MenuIcon = (p: IconProps) => (
  <Base {...p}><path d="M4 7h16M4 12h16M4 17h16" /></Base>
);

export const CloseIcon = (p: IconProps) => (
  <Base {...p}><path d="M6 6l12 12M18 6 6 18" /></Base>
);

export const ChevronDown = (p: IconProps) => (
  <Base {...p}><path d="m6 9 6 6 6-6" /></Base>
);

export const ChevronRight = (p: IconProps) => (
  <Base {...p}><path d="m9 6 6 6-6 6" /></Base>
);

export const ChevronLeft = (p: IconProps) => (
  <Base {...p}><path d="m15 6-6 6 6 6" /></Base>
);

export const ArrowRight = (p: IconProps) => (
  <Base {...p}><path d="M4 12h16m0 0-6-6m6 6-6 6" /></Base>
);

export const TruckIcon = (p: IconProps) => (
  <Base {...p}><path d="M3 6h11v10H3zM14 9h4l3 3v4h-7z" /><circle cx="7" cy="18" r="1.8" /><circle cx="17" cy="18" r="1.8" /></Base>
);

export const ShieldIcon = (p: IconProps) => (
  <Base {...p}><path d="M12 3l7 3v5c0 4.5-3 8.5-7 10-4-1.5-7-5.5-7-10V6l7-3Z" /><path d="m9 12 2 2 4-4" /></Base>
);

export const LockIcon = (p: IconProps) => (
  <Base {...p}><rect x="5" y="11" width="14" height="9" rx="2" /><path d="M8 11V8a4 4 0 0 1 8 0v3" /></Base>
);

export const ClockIcon = (p: IconProps) => (
  <Base {...p}><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></Base>
);

export const StarIcon = (p: IconProps) => (
  <Base {...p} fill="currentColor" stroke="none">
    <path d="M12 3.5l2.6 5.3 5.9.9-4.3 4.1 1 5.8L12 16.9l-5.2 2.7 1-5.8L3.5 9.7l5.9-.9L12 3.5Z" />
  </Base>
);

export const QuoteIcon = (p: IconProps) => (
  <Base {...p} fill="currentColor" stroke="none">
    <path d="M10 8c-3 1-5 3.5-5 7v1h5v-6H7.5C8 9 9 8.5 10 8.2V8Zm9 0c-3 1-5 3.5-5 7v1h5v-6h-2.5c.5-1 1.5-1.5 2.5-1.8V8Z" />
  </Base>
);

export const PhoneIcon = (p: IconProps) => (
  <Base {...p}><path d="M5 4h4l2 5-2.5 1.5a12 12 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2Z" /></Base>
);

export const MailIcon = (p: IconProps) => (
  <Base {...p}><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 7 9 6 9-6" /></Base>
);

export const PinIcon = (p: IconProps) => (
  <Base {...p}><path d="M12 21s-7-5.5-7-11a7 7 0 0 1 14 0c0 5.5-7 11-7 11Z" /><circle cx="12" cy="10" r="2.5" /></Base>
);

export const WhatsAppIcon = (p: IconProps) => (
  <Base {...p} fill="currentColor" stroke="none">
    <path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm5.2 14.2c-.2.6-1.3 1.2-1.8 1.2-.5.1-1 .2-3.3-.7-2.8-1.1-4.6-4-4.7-4.2-.1-.2-1.1-1.5-1.1-2.9s.7-2 1-2.3c.2-.3.5-.3.7-.3h.5c.2 0 .4 0 .6.5l.9 2.1c.1.2.1.4 0 .6l-.4.6-.5.5c-.2.2-.3.4-.1.7.2.3.9 1.4 1.9 2.3 1.3 1.2 2.4 1.5 2.7 1.7.3.1.5.1.7-.1l1-1.2c.2-.3.4-.2.7-.1l2 .9c.3.2.5.3.6.4 0 .1 0 .8-.4 1.3Z" />
  </Base>
);

export const InstagramIcon = (p: IconProps) => (
  <Base {...p}><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.2" cy="6.8" r="0.8" fill="currentColor" stroke="none" /></Base>
);

export const FacebookIcon = (p: IconProps) => (
  <Base {...p}><path d="M14 8h3V4.5h-3A3.5 3.5 0 0 0 10.5 8v2.5H8V14h2.5v6H14v-6h2.5l.5-3.5h-3V8.5a.5.5 0 0 1 .5-.5Z" /></Base>
);

export const YoutubeIcon = (p: IconProps) => (
  <Base {...p}><rect x="2.5" y="6" width="19" height="12" rx="3" /><path d="m10 9.5 5 2.5-5 2.5v-5Z" fill="currentColor" stroke="none" /></Base>
);

export const TrashIcon = (p: IconProps) => (
  <Base {...p}><path d="M4 7h16M9 7V5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2m3 0-1 13H7L6 7" /><path d="M10 11v6M14 11v6" /></Base>
);

export const MinusIcon = (p: IconProps) => <Base {...p}><path d="M5 12h14" /></Base>;
export const PlusIcon = (p: IconProps) => <Base {...p}><path d="M12 5v14M5 12h14" /></Base>;

export const GiftIcon = (p: IconProps) => (
  <Base {...p}><rect x="4" y="8" width="16" height="4" /><rect x="6" y="12" width="12" height="8" /><path d="M12 8v12M12 8s-4 0-4-2.5S12 4 12 8Zm0 0s4 0 4-2.5S12 4 12 8Z" /></Base>
);

export const GridIcon = (p: IconProps) => (
  <Base {...p}><rect x="4" y="4" width="7" height="7" rx="1" /><rect x="13" y="4" width="7" height="7" rx="1" /><rect x="4" y="13" width="7" height="7" rx="1" /><rect x="13" y="13" width="7" height="7" rx="1" /></Base>
);

export const ListIcon = (p: IconProps) => (
  <Base {...p}><rect x="4" y="4" width="6" height="6" rx="1" /><path d="M13 6h7M13 9h5" /><rect x="4" y="14" width="6" height="6" rx="1" /><path d="M13 16h7M13 19h5" /></Base>
);

export const SparkleIcon = (p: IconProps) => (
  <Base {...p}><path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8L12 3Z" /><path d="M19 15l.9 2.6L22.5 18l-2.6.9L19 21.5l-.9-2.6L15.5 18l2.6-.9L19 15Z" /></Base>
);
