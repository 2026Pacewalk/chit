import { prisma } from "@/lib/db";
import MessageCard from "@/components/admin/MessageCard";

export const dynamic = "force-dynamic";

export default async function AdminMessagesPage() {
  const messages = await prisma.contactMessage.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div>
      <h1 className="font-display text-3xl font-semibold text-ink-950">Messages</h1>
      <p className="mt-1 text-sm text-ink-500">
        Enquiries submitted through the contact form.
      </p>

      {messages.length === 0 ? (
        <p className="mt-6 rounded-2xl border border-dashed border-cream-300 py-16 text-center text-ink-500">
          No messages yet.
        </p>
      ) : (
        <div className="mt-6 space-y-4">
          {messages.map((m) => (
            <MessageCard
              key={m.id}
              id={m.id}
              name={m.name}
              email={m.email}
              phone={m.phone}
              message={m.message}
              read={m.read}
              createdAt={m.createdAt.toISOString()}
            />
          ))}
        </div>
      )}
    </div>
  );
}
