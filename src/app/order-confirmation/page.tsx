import type { Metadata } from "next";
import { Suspense } from "react";
import OrderConfirmationContent from "@/components/store/OrderConfirmationContent";

export const metadata: Metadata = {
  title: "Order Confirmed",
  description: "Your Chitrangi order has been placed.",
};

export default function OrderConfirmationPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16">
      <Suspense>
        <OrderConfirmationContent />
      </Suspense>
    </div>
  );
}
