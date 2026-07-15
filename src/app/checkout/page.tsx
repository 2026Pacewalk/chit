import type { Metadata } from "next";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import CheckoutContent from "@/components/store/CheckoutContent";

export const metadata: Metadata = {
  title: "Checkout",
  description: "Complete your Chitrangi order — free shipping on prepaid orders across India.",
};

export default function CheckoutPage() {
  const onlineEnabled = Boolean(
    process.env.RAZORPAY_KEY_ID && process.env.RAZORPAY_KEY_SECRET
  );
  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-12">
      <Breadcrumbs items={[{ label: "Cart", href: "/cart" }, { label: "Checkout" }]} />
      <CheckoutContent onlineEnabled={onlineEnabled} />
    </div>
  );
}
