import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center gap-5 px-4 py-28 text-center">
      <p className="font-display text-7xl font-semibold text-gold-500">404</p>
      <h1 className="font-display text-2xl font-semibold text-ink-950">Page Not Found</h1>
      <p className="max-w-sm text-sm text-ink-500">
        The page you&apos;re looking for doesn&apos;t exist or may have moved. Let&apos;s get you
        back to something beautiful.
      </p>
      <div className="flex flex-wrap justify-center gap-3">
        <Link
          href="/"
          className="rounded-full bg-ink-950 px-7 py-3.5 text-sm font-semibold text-cream-50 hover:bg-ink-800 transition-colors"
        >
          Back to Home
        </Link>
        <Link
          href="/collections"
          className="rounded-full border border-ink-950 px-7 py-3.5 text-sm font-semibold text-ink-950 hover:bg-ink-950 hover:text-cream-50 transition-colors"
        >
          Browse Collections
        </Link>
      </div>
    </div>
  );
}
