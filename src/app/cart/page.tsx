import type { Metadata } from "next";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import CartPageContent from "@/components/store/CartPageContent";

export const metadata: Metadata = {
  title: "Your Cart",
  description: "Review your Chitrangi cart and checkout via WhatsApp.",
};

export default function CartPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 sm:py-12">
      <Breadcrumbs items={[{ label: "Cart" }]} />
      <CartPageContent />
    </div>
  );
}
