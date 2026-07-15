import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/db";
import { formatINR } from "@/lib/catalog";
import OrderStatusControls from "@/components/admin/OrderStatusControls";
import StatusBadge from "@/components/admin/StatusBadge";

export const dynamic = "force-dynamic";

export default async function AdminOrderDetail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const order = await prisma.order.findUnique({
    where: { id: Number(id) || 0 },
    include: { items: true },
  });
  if (!order) notFound();

  return (
    <div>
      <Link href="/admin/orders" className="text-sm text-gold-700 hover:underline">
        ← Back to orders
      </Link>

      <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
        <h1 className="font-display text-3xl font-semibold text-ink-950">{order.orderNumber}</h1>
        <div className="flex gap-2">
          <StatusBadge status={order.status} />
          <StatusBadge status={order.paymentStatus} />
        </div>
      </div>
      <p className="mt-1 text-sm text-ink-500">
        Placed{" "}
        {order.createdAt.toLocaleString("en-IN", {
          day: "numeric",
          month: "long",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        })}
      </p>

      <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_360px]">
        <div className="space-y-8">
          {/* Items */}
          <section className="rounded-2xl border border-cream-300 bg-cream-50">
            <h2 className="border-b border-cream-200 px-5 py-3.5 font-display text-lg font-semibold text-ink-950">
              Items
            </h2>
            <ul className="divide-y divide-cream-200 px-5">
              {order.items.map((i) => (
                <li key={i.id} className="flex items-center gap-4 py-4">
                  {i.image && (
                    <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-lg bg-cream-200">
                      <Image src={i.image} alt={i.title} fill sizes="64px" className="object-cover" />
                    </div>
                  )}
                  <div className="min-w-0 flex-1">
                    <Link
                      href={`/products/${i.handle}`}
                      className="line-clamp-1 font-medium text-ink-900 hover:text-gold-600"
                    >
                      {i.title}
                    </Link>
                    {i.variantTitle && <p className="text-sm text-ink-500">{i.variantTitle}</p>}
                  </div>
                  <span className="text-sm text-ink-600">
                    {formatINR(i.price)} × {i.qty}
                  </span>
                  <span className="w-24 text-right font-semibold text-ink-950">
                    {formatINR(i.price * i.qty)}
                  </span>
                </li>
              ))}
            </ul>
            <div className="flex justify-between border-t border-cream-200 px-5 py-4">
              <span className="font-semibold text-ink-950">
                Total ({order.paymentMethod === "COD" ? "Cash on Delivery" : "Online"})
              </span>
              <span className="font-display text-xl font-semibold text-ink-950">
                {formatINR(order.total)}
              </span>
            </div>
          </section>

          {/* Customer */}
          <section className="rounded-2xl border border-cream-300 bg-cream-50 p-5">
            <h2 className="font-display text-lg font-semibold text-ink-950">Customer</h2>
            <dl className="mt-3 grid gap-x-8 gap-y-2 text-sm sm:grid-cols-2">
              <Row label="Name" value={order.customerName} />
              <Row label="Phone" value={order.phone} link={`tel:${order.phone}`} />
              <Row label="Email" value={order.email} link={`mailto:${order.email}`} />
              <Row label="Pincode" value={order.pincode} />
              <div className="sm:col-span-2">
                <Row
                  label="Address"
                  value={`${order.address}, ${order.city}, ${order.state} — ${order.pincode}`}
                />
              </div>
              {order.notes && (
                <div className="sm:col-span-2">
                  <Row label="Personalization Notes" value={order.notes} />
                </div>
              )}
              {order.paymentRef && (
                <div className="sm:col-span-2">
                  <Row label="Payment Ref" value={order.paymentRef} />
                </div>
              )}
            </dl>
            <a
              href={`https://wa.me/${order.phone.replace(/[^\d]/g, "")}?text=${encodeURIComponent(
                `Hi ${order.customerName}! This is Chitrangi about your order ${order.orderNumber}.`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-block rounded-full bg-[#25D366] px-5 py-2.5 text-sm font-semibold text-white hover:brightness-105 transition"
            >
              WhatsApp Customer
            </a>
          </section>
        </div>

        <OrderStatusControls
          orderId={order.id}
          status={order.status}
          paymentStatus={order.paymentStatus}
        />
      </div>
    </div>
  );
}

function Row({ label, value, link }: { label: string; value: string; link?: string }) {
  return (
    <div>
      <dt className="text-xs font-semibold uppercase tracking-wider text-ink-500">{label}</dt>
      <dd className="mt-0.5 text-ink-900">
        {link ? (
          <a href={link} className="hover:text-gold-600">
            {value}
          </a>
        ) : (
          value
        )}
      </dd>
    </div>
  );
}
