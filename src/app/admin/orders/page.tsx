import Link from "next/link";
import { prisma } from "@/lib/db";
import { formatINR } from "@/lib/catalog";
import { ORDER_STATUSES } from "@/lib/orders";
import StatusBadge from "@/components/admin/StatusBadge";

export const dynamic = "force-dynamic";

export default async function AdminOrdersPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string }>;
}) {
  const { status } = await searchParams;
  const filter = status && (ORDER_STATUSES as readonly string[]).includes(status) ? status : undefined;

  const orders = await prisma.order.findMany({
    where: filter ? { status: filter } : undefined,
    orderBy: { createdAt: "desc" },
    include: { items: true },
  });

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="font-display text-3xl font-semibold text-ink-950">Orders</h1>
        <div className="flex flex-wrap gap-1.5">
          <FilterChip label="All" href="/admin/orders" active={!filter} />
          {ORDER_STATUSES.map((s) => (
            <FilterChip
              key={s}
              label={s.charAt(0) + s.slice(1).toLowerCase()}
              href={`/admin/orders?status=${s}`}
              active={filter === s}
            />
          ))}
        </div>
      </div>

      {orders.length === 0 ? (
        <p className="mt-6 rounded-2xl border border-dashed border-cream-300 py-16 text-center text-ink-500">
          No orders{filter ? ` with status ${filter}` : " yet"}.
        </p>
      ) : (
        <div className="mt-6 overflow-x-auto rounded-2xl border border-cream-300">
          <table className="w-full min-w-[820px] text-left text-sm">
            <thead className="bg-cream-200 text-xs uppercase tracking-wider text-ink-600">
              <tr>
                <th className="px-4 py-3">Order</th>
                <th className="px-4 py-3">Customer</th>
                <th className="px-4 py-3">Contact</th>
                <th className="px-4 py-3">Items</th>
                <th className="px-4 py-3">Total</th>
                <th className="px-4 py-3">Payment</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-cream-200 bg-cream-50">
              {orders.map((o) => (
                <tr key={o.id} className="hover:bg-cream-100">
                  <td className="px-4 py-3">
                    <Link
                      href={`/admin/orders/${o.id}`}
                      className="font-medium text-gold-700 hover:underline"
                    >
                      {o.orderNumber}
                    </Link>
                  </td>
                  <td className="px-4 py-3">{o.customerName}</td>
                  <td className="px-4 py-3 text-ink-500">
                    {o.phone}
                    <br />
                    {o.email}
                  </td>
                  <td className="px-4 py-3">{o.items.reduce((s, i) => s + i.qty, 0)}</td>
                  <td className="px-4 py-3 font-medium">{formatINR(o.total)}</td>
                  <td className="px-4 py-3">
                    {o.paymentMethod}
                    <br />
                    <StatusBadge status={o.paymentStatus} />
                  </td>
                  <td className="px-4 py-3">
                    <StatusBadge status={o.status} />
                  </td>
                  <td className="px-4 py-3 text-ink-500">
                    {o.createdAt.toLocaleDateString("en-IN", {
                      day: "numeric",
                      month: "short",
                      year: "2-digit",
                    })}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

function FilterChip({ label, href, active }: { label: string; href: string; active: boolean }) {
  return (
    <Link
      href={href}
      className={`rounded-full px-3.5 py-1.5 text-xs font-semibold transition-colors ${
        active
          ? "bg-ink-950 text-cream-50"
          : "border border-cream-300 text-ink-600 hover:border-gold-500 hover:text-gold-600"
      }`}
    >
      {label}
    </Link>
  );
}
