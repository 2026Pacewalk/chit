import type { Metadata } from "next";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import WishlistContent from "@/components/store/WishlistContent";

export const metadata: Metadata = {
  title: "Wishlist",
  description: "Your saved Chitrangi favourites.",
};

export default function WishlistPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12">
      <Breadcrumbs items={[{ label: "Wishlist" }]} />
      <WishlistContent />
    </div>
  );
}
