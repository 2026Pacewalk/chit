import type { Metadata } from "next";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import TrackOrderContent from "@/components/store/TrackOrderContent";

export const metadata: Metadata = {
  title: "Track Order",
  description: "Check the status of your Chitrangi order.",
};

export default function TrackPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 sm:py-12">
      <Breadcrumbs items={[{ label: "Track Order" }]} />
      <TrackOrderContent />
    </div>
  );
}
