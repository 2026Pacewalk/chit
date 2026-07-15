import { site } from "@/data/site";
import { WhatsAppIcon } from "@/components/ui/Icons";

export default function WhatsAppFloat() {
  return (
    <a
      href={`https://wa.me/${site.whatsapp}?text=${encodeURIComponent("Hi Chitrangi! I have a question about your products.")}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-5 right-5 z-40 flex h-13 w-13 items-center justify-center rounded-full bg-[#25D366] p-3 text-white shadow-lg shadow-ink-950/25 transition-transform hover:scale-110"
    >
      <WhatsAppIcon size={26} />
    </a>
  );
}
