import Link from "next/link";
import { prisma } from "@/lib/db";
import { formatINR } from "@/lib/catalog";
import StatusBadge from "@/components/admin/StatusBadge";

export const dynamic = "force-dynamic";

export default async function AdminDashboard() {
  const [orderCount, pendingCount, revenue, messageCount, subscriberCount, recentOrders] =
    await Promise.all([
      prisma.order.count(),
      prisma.order.count({ where: { status: "PENDING" } }),
      prisma.order.aggregate({
        _sum: { total: true },
        where: { status: { not: "CANCELLED" } },
      }),
      prisma.contactMessage.count({ where: { read: false } }),
      prisma.subscriber.count(),
      prisma.order.findMany({
        orderBy: { createdAt: "desc" },
        take: 8,
        include: { items: true },
      }),
    ]);

  const stats = [
    { label: "Total Orders", value: String(orderCount), href: "/admin/orders" },
    { label: "Pending Orders", value: String(pendingCount), href: "/admin/orders?status=PENDING" },
    { label: "Revenue", value: formatINR(revenue._sum.total ?? 0), href: "/admin/orders" },
    { label: "Unread Messages", value: String(messageCount), href: "/admin/messages" },
    { label: "Subscribers", value: String(subscriberCount), href: "/admin/subscribers" },
  ];

  return (
    <div>
      <h1 className="font-display text-3xl font-semibold text-ink-950">Dashboard</h1>

      <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-5">
        {stats.map((s) => (
          <Link
            key={s.label}
            href={s.href}
            className="rounded-2xl border border-cream-300 bg-cream-100 p-5 transition-shadow hover:shadow-md"
          >
            <p className="text-xs font-semibold uppercase tracking-wider text-ink-500">{s.label}</p>
            <p className="mt-2 font-display text-2xl font-semibold text-ink-950">{s.value}</p>
          </Link>
        ))}
      </div>

      <h2 className="mt-10 font-display text-xl font-semibold text-ink-950">Recent Orders</h2>
      {recentOrders.length === 0 ? (
        <p className="mt-4 rounded-2xl border border-dashed border-cream-300 py-14 text-center text-ink-500">
          No orders yet. They&apos;ll appear here as soon as customers check out.
        </p>
      ) : (
        <div className="mt-4 overflow-x-auto rounded-2xl border border-cream-300">
          <table className="w-full min-w-[720px] text-left text-sm">
            <thead className="bg-cream-200 text-xs uppercase tracking-wider text-ink-600">
              <tr>
                <th className="px-4 py-3">Order</th>
                <th className="px-4 py-3">Customer</th>
                <th className="px-4 py-3">Items</th>
                <th className="px-4 py-3">Total</th>
                <th className="px-4 py-3">Payment</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-cream-200 bg-cream-50">
              {recentOrders.map((o) => (
                <tr key={o.id} className="hover:bg-cream-100">
                  <td className="px-4 py-3">
                    <Link href={`/admin/orders/${o.id}`} className="font-medium text-gold-700 hover:underline">
                      {o.orderNumber}
                    </Link>
                  </td>
                  <td className="px-4 py-3">{o.customerName}</td>
                  <td className="px-4 py-3">{o.items.reduce((s, i) => s + i.qty, 0)}</td>
                  <td className="px-4 py-3 font-medium">{formatINR(o.total)}</td>
                  <td className="px-4 py-3">
                    {o.paymentMethod} · {o.paymentStatus}
                  </td>
                  <td className="px-4 py-3">
                    <StatusBadge status={o.status} />
                  </td>
                  <td className="px-4 py-3 text-ink-500">
                    {o.createdAt.toLocaleDateString("en-IN", { day: "numeric", month: "short" })}
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
