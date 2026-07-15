import { site } from "@/data/site";

export const dynamic = "force-dynamic";

export default function AdminSettingsPage() {
  const razorpayConfigured = Boolean(
    process.env.RAZORPAY_KEY_ID && process.env.RAZORPAY_KEY_SECRET
  );
  const keyIdPreview = process.env.RAZORPAY_KEY_ID
    ? process.env.RAZORPAY_KEY_ID.slice(0, 8) + "••••••"
    : null;

  return (
    <div>
      <h1 className="font-display text-3xl font-semibold text-ink-950">Settings</h1>
      <p className="mt-1 text-sm text-ink-500">
        Store configuration status. Values are read from the <code className="rounded bg-cream-200 px-1.5 py-0.5 text-xs">.env</code> file on the server.
      </p>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        {/* Payments */}
        <section className="rounded-2xl border border-cream-300 bg-cream-50 p-6">
          <div className="flex items-center justify-between gap-3">
            <h2 className="font-display text-xl font-semibold text-ink-950">
              Online Payments — Razorpay
            </h2>
            <span
              className={`rounded-full px-3.5 py-1.5 text-xs font-bold uppercase tracking-wide ${
                razorpayConfigured
                  ? "bg-green-100 text-green-800"
                  : "bg-amber-100 text-amber-800"
              }`}
            >
              {razorpayConfigured ? "Active" : "Not Configured"}
            </span>
          </div>

          {razorpayConfigured ? (
            <div className="mt-4 space-y-2 text-sm text-ink-700">
              <p>
                Online payment (UPI / Cards / Netbanking) is <strong>live on checkout</strong>.
              </p>
              <p className="text-ink-500">
                Key ID: <code className="rounded bg-cream-200 px-1.5 py-0.5 text-xs">{keyIdPreview}</code>
              </p>
              <p className="text-ink-500">
                To disable, clear <code className="rounded bg-cream-200 px-1.5 py-0.5 text-xs">RAZORPAY_KEY_ID</code> in
                .env and restart the server.
              </p>
            </div>
          ) : (
            <div className="mt-4 text-sm leading-relaxed text-ink-700">
              <p>
                Customers currently see online payment as <strong>&ldquo;Coming Soon&rdquo;</strong> and
                can order via <strong>Cash on Delivery</strong>. To activate Razorpay later:
              </p>
              <ol className="mt-3 list-decimal space-y-2 pl-5">
                <li>
                  Create an account at{" "}
                  <a
                    href="https://dashboard.razorpay.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gold-700 underline underline-offset-2"
                  >
                    dashboard.razorpay.com
                  </a>{" "}
                  and complete KYC.
                </li>
                <li>
                  Go to <strong>Settings → API Keys → Generate Key</strong>.
                </li>
                <li>
                  Open the <code className="rounded bg-cream-200 px-1.5 py-0.5 text-xs">.env</code> file
                  in the project root and fill in{" "}
                  <code className="rounded bg-cream-200 px-1.5 py-0.5 text-xs">RAZORPAY_KEY_ID</code> and{" "}
                  <code className="rounded bg-cream-200 px-1.5 py-0.5 text-xs">RAZORPAY_KEY_SECRET</code>.
                </li>
                <li>Restart the server — checkout starts offering online payment automatically.</li>
              </ol>
              <p className="mt-3 text-ink-500">
                No code changes needed: order creation, the Razorpay popup, and payment signature
                verification are already built in.
              </p>
            </div>
          )}
        </section>

        {/* Store info */}
        <section className="rounded-2xl border border-cream-300 bg-cream-50 p-6">
          <h2 className="font-display text-xl font-semibold text-ink-950">Store Details</h2>
          <dl className="mt-4 space-y-3 text-sm">
            <SettingRow label="Store Name" value={site.name} />
            <SettingRow label="Sales Email" value={site.email} />
            <SettingRow label="Orders Email" value={site.orderEmail} />
            <SettingRow label="Phone / WhatsApp" value={site.phone} />
            <SettingRow label="Address" value={site.address} />
            <SettingRow label="Shipping" value="Free on all prepaid orders across India" />
            <SettingRow label="COD Orders" value="Confirmed by phone call before dispatch" />
          </dl>
          <p className="mt-4 text-xs text-ink-500">
            Edit these in <code className="rounded bg-cream-200 px-1.5 py-0.5 text-xs">src/data/site.ts</code>.
          </p>
        </section>
      </div>
    </div>
  );
}

function SettingRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-wrap justify-between gap-x-6 gap-y-1 border-b border-cream-200 pb-2.5 last:border-0">
      <dt className="font-medium text-ink-500">{label}</dt>
      <dd className="text-ink-900">{value}</dd>
    </div>
  );
}
