import Link from "next/link";
import { categoryMenu } from "@/data/site";
import { ChevronDown, MenuIcon } from "@/components/ui/Icons";

export default function CategorySidebar() {
  return (
    <aside className="hidden self-start rounded-md border border-cream-200 bg-cream-50 lg:block">
      <div className="flex items-center justify-between gap-3 border-b border-cream-200 px-5 py-4">
        <span className="flex items-center gap-3 font-semibold text-ink-950">
          <MenuIcon size={19} />
          All Categories
        </span>
        <ChevronDown size={15} className="text-ink-500" />
      </div>
      <nav>
        <ul>
          {categoryMenu.map((c, i) => (
            <li key={c.href} className={i > 0 ? "border-t border-cream-200" : ""}>
              <Link
                href={c.href}
                className="block px-5 py-3.5 text-[15px] text-ink-800 transition-colors hover:bg-cream-100 hover:text-gold-600"
              >
                {c.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}
