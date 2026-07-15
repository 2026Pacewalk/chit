import type { Metadata } from "next";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import ContactForm from "@/components/ui/ContactForm";
import { site } from "@/data/site";
import { MailIcon, PhoneIcon, PinIcon, WhatsAppIcon } from "@/components/ui/Icons";

export const metadata: Metadata = {
  title: "Contact",
  description: `Get in touch with ${site.name} — ${site.phone}, ${site.email}, ${site.address}.`,
};

const cards = [
  {
    icon: MailIcon,
    title: "Email Address",
    lines: [site.email, site.orderEmail],
    href: `mailto:${site.email}`,
  },
  {
    icon: PhoneIcon,
    title: "Phone Number",
    lines: [site.phone, "Mon–Sat, 11 AM – 6 PM"],
    href: `tel:${site.phoneHref}`,
  },
  {
    icon: PinIcon,
    title: "Office Address",
    lines: [site.address],
  },
];

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12">
      <Breadcrumbs items={[{ label: "Contact" }]} />

      <header className="max-w-2xl">
        <h1 className="font-display text-3xl font-semibold text-ink-950 sm:text-4xl">
          Get in Touch
        </h1>
        <p className="mt-3 text-ink-500">
          Questions about a product or a custom idea in mind? We&apos;re happy to share real-time
          product photos and videos via WhatsApp or email.
        </p>
        <div className="gold-rule mt-5 w-24" />
      </header>

      <div className="mt-10 grid gap-5 md:grid-cols-3">
        {cards.map((c) => (
          <div
            key={c.title}
            className="rounded-2xl border border-cream-300 bg-cream-100 p-7 text-center"
          >
            <span className="inline-flex h-13 w-13 items-center justify-center rounded-full bg-gold-500/10 p-3.5 text-gold-600 ring-1 ring-gold-500/30">
              <c.icon size={24} />
            </span>
            <h2 className="mt-4 font-display text-lg font-semibold text-ink-950">{c.title}</h2>
            {c.lines.map((l) =>
              c.href ? (
                <a key={l} href={c.href} className="mt-1 block text-sm text-ink-600 hover:text-gold-600">
                  {l}
                </a>
              ) : (
                <p key={l} className="mt-1 text-sm text-ink-600">
                  {l}
                </p>
              )
            )}
          </div>
        ))}
      </div>

      <div className="mt-14 grid gap-10 lg:grid-cols-2 lg:gap-16">
        <div>
          <h2 className="font-display text-2xl font-semibold text-ink-950">Send Message</h2>
          <p className="mt-2 text-sm text-ink-500">
            Fill in the form and our team will get back to you within one working day.
          </p>
          <ContactForm />
          <a
            href={`https://wa.me/${site.whatsapp}?text=${encodeURIComponent("Hi Chitrangi! I have a question.")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[#1da851] hover:underline"
          >
            <WhatsAppIcon size={18} /> Prefer WhatsApp? Chat with us directly
          </a>
        </div>
        <div className="overflow-hidden rounded-2xl border border-cream-300">
          <iframe
            title="Chitrangi office location — Green Lotus Avenue, Zirakpur"
            src="https://www.google.com/maps?q=Green%20Lotus%20Avenue%2C%20Zirakpur%2C%20Punjab&output=embed"
            className="h-full min-h-96 w-full"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </div>
  );
}
