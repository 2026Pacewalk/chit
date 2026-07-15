import Link from "next/link";
import Image from "next/image";
import { site } from "@/data/site";
import {
  FacebookIcon,
  InstagramIcon,
  MailIcon,
  PhoneIcon,
  PinIcon,
  YoutubeIcon,
} from "@/components/ui/Icons";
import NewsletterForm from "@/components/ui/NewsletterForm";

const policyLinks = [
  { label: "Terms and Conditions", href: "/pages/terms-and-conditions" },
  { label: "Cancellation & Refund", href: "/pages/cancellation-refund" },
  { label: "Shipping & Delivery Policy", href: "/pages/shipping-delivery-policy" },
  { label: "Privacy Policy", href: "/pages/privacy-policy" },
];

const serviceLinks = [
  { label: "Home", href: "/" },
  { label: "Catalog", href: "/collections" },
  { label: "About Us", href: "/pages/about-us" },
  { label: "Blog", href: "/blogs/news" },
  { label: "Contact", href: "/pages/contact" },
  { label: "Track Order", href: "/track" },
];

export default function Footer() {
  return (
    <footer className="bg-ink-950 text-cream-200">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div>
            <Image
              src="/images/logo.png"
              alt="Chitrangi"
              width={150}
              height={52}
              className="h-11 w-auto brightness-0 invert"
            />
            <p className="mt-4 text-sm leading-relaxed text-cream-200/70">
              {site.description}
            </p>
            <ul className="mt-5 space-y-2.5 text-sm">
              <li className="flex items-start gap-2.5">
                <PinIcon size={17} className="mt-0.5 shrink-0 text-gold-400" />
                <span>{site.address}</span>
              </li>
              <li className="flex items-center gap-2.5">
                <PhoneIcon size={17} className="shrink-0 text-gold-400" />
                <a href={`tel:${site.phoneHref}`} className="hover:text-gold-300">{site.phone}</a>
              </li>
              <li className="flex items-center gap-2.5">
                <MailIcon size={17} className="shrink-0 text-gold-400" />
                <a href={`mailto:${site.orderEmail}`} className="hover:text-gold-300">{site.orderEmail}</a>
              </li>
            </ul>
          </div>

          {/* Policies */}
          <div className="lg:justify-self-center">
            <h3 className="font-display text-lg text-cream-50">Our Policies</h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              {policyLinks.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-cream-200/70 hover:text-gold-300 transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className="lg:justify-self-center">
            <h3 className="font-display text-lg text-cream-50">Services</h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              {serviceLinks.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-cream-200/70 hover:text-gold-300 transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="font-display text-lg text-cream-50">Newsletter</h3>
            <p className="mt-4 text-sm text-cream-200/70">
              Subscribe to our newsletter and receive updates via email.
            </p>
            <NewsletterForm />
            <div className="mt-6 flex gap-3">
              <a href={site.social.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook"
                 className="rounded-full border border-cream-200/20 p-2.5 text-cream-200/80 hover:border-gold-400 hover:text-gold-300 transition-colors">
                <FacebookIcon size={18} />
              </a>
              <a href={site.social.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram"
                 className="rounded-full border border-cream-200/20 p-2.5 text-cream-200/80 hover:border-gold-400 hover:text-gold-300 transition-colors">
                <InstagramIcon size={18} />
              </a>
              <a href={site.social.youtube} target="_blank" rel="noopener noreferrer" aria-label="YouTube"
                 className="rounded-full border border-cream-200/20 p-2.5 text-cream-200/80 hover:border-gold-400 hover:text-gold-300 transition-colors">
                <YoutubeIcon size={18} />
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-cream-200/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-4 py-5 text-xs text-cream-200/50 sm:flex-row sm:px-6">
          <p>
            Copyright © {new Date().getFullYear()} {site.copyright}. All Rights Reserved.
          </p>
          <div className="flex flex-wrap justify-center gap-x-5 gap-y-1">
            {policyLinks.map((l) => (
              <Link key={l.href} href={l.href} className="hover:text-gold-300 transition-colors">
                {l.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
