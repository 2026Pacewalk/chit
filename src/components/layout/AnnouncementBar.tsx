const messages = [
  "Free shipping on all prepaid orders across India",
  "Next working day dispatch on paid orders",
  "Personalized gifts crafted with care in Punjab",
  "15-day money back guarantee",
  "Tap or scan — NFC smart cards from ₹499",
];

export default function AnnouncementBar() {
  const row = [...messages, ...messages];
  return (
    <div className="bg-ink-950 text-cream-100 text-[13px] tracking-wide overflow-hidden">
      <div className="flex w-max animate-marquee py-2" aria-hidden="true">
        {row.map((m, i) => (
          <span key={i} className="flex items-center whitespace-nowrap">
            <span className="px-6">{m}</span>
            <span className="text-gold-400">✦</span>
          </span>
        ))}
      </div>
      <span className="sr-only">{messages.join(". ")}</span>
    </div>
  );
}
