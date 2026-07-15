import type { Metadata } from "next";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import SearchResults from "@/components/store/SearchResults";

export const metadata: Metadata = {
  title: "Search",
  description: "Search personalized gifts, NFC cards, sign boards and more at Chitrangi.",
};

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q = "" } = await searchParams;
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12">
      <Breadcrumbs items={[{ label: "Search" }]} />
      <SearchResults initialQuery={q} />
    </div>
  );
}
