import { prisma } from "@/lib/db";

export const dynamic = "force-dynamic";

export default async function AdminSubscribersPage() {
  const subscribers = await prisma.subscriber.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="font-display text-3xl font-semibold text-ink-950">Subscribers</h1>
          <p className="mt-1 text-sm text-ink-500">
            {subscribers.length} newsletter {subscribers.length === 1 ? "subscriber" : "subscribers"}.
          </p>
        </div>
        {subscribers.length > 0 && (
          <a
            href={`mailto:?bcc=${subscribers.map((s) => s.email).join(",")}`}
            className="rounded-full bg-ink-950 px-5 py-2.5 text-sm font-semibold text-cream-50 hover:bg-gold-600 transition-colors"
          >
            Email All (BCC)
          </a>
        )}
      </div>

      {subscribers.length === 0 ? (
        <p className="mt-6 rounded-2xl border border-dashed border-cream-300 py-16 text-center text-ink-500">
          No subscribers yet.
        </p>
      ) : (
        <div className="mt-6 overflow-hidden rounded-2xl border border-cream-300">
          <table className="w-full text-left text-sm">
            <thead className="bg-cream-200 text-xs uppercase tracking-wider text-ink-600">
              <tr>
                <th className="px-4 py-3">Email</th>
                <th className="px-4 py-3">Subscribed</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-cream-200 bg-cream-50">
              {subscribers.map((s) => (
                <tr key={s.id} className="hover:bg-cream-100">
                  <td className="px-4 py-3 font-medium text-ink-900">{s.email}</td>
                  <td className="px-4 py-3 text-ink-500">
                    {s.createdAt.toLocaleDateString("en-IN", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
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
