import Link from "next/link";
import { ChevronRight } from "@/components/ui/Icons";

export default function Breadcrumbs({
  items,
}: {
  items: { label: string; href?: string }[];
}) {
  return (
    <nav aria-label="Breadcrumb" className="mb-6">
      <ol className="flex flex-wrap items-center gap-1.5 text-sm text-ink-500">
        <li>
          <Link href="/" className="hover:text-gold-600 transition-colors">
            Home
          </Link>
        </li>
        {items.map((item, i) => (
          <li key={i} className="flex items-center gap-1.5">
            <ChevronRight size={13} className="text-ink-400" />
            {item.href ? (
              <Link href={item.href} className="hover:text-gold-600 transition-colors">
                {item.label}
              </Link>
            ) : (
              <span className="line-clamp-1 max-w-64 text-ink-900">{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
