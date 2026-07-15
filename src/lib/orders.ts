import { allProducts } from "@/lib/catalog";

export type CheckoutItemInput = { variantId: number; qty: number };

export type CheckoutCustomerInput = {
  customerName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  notes?: string;
};

export const ORDER_STATUSES = [
  "PENDING",
  "CONFIRMED",
  "PROCESSING",
  "SHIPPED",
  "DELIVERED",
  "CANCELLED",
] as const;

export const PAYMENT_STATUSES = ["PENDING", "PAID", "FAILED", "REFUNDED"] as const;

export function generateOrderNumber(): string {
  const ts = Date.now().toString(36).toUpperCase();
  const rand = Math.random().toString(36).slice(2, 6).toUpperCase();
  return `CH-${ts}${rand}`;
}

/** Resolve cart items against the server-side catalog so prices can't be tampered with. */
export function resolveItems(items: CheckoutItemInput[]) {
  const resolved: {
    handle: string;
    variantId: string;
    title: string;
    variantTitle: string | null;
    image: string | null;
    price: number;
    qty: number;
  }[] = [];

  for (const item of items) {
    if (!Number.isInteger(item.qty) || item.qty < 1 || item.qty > 100) {
      throw new Error("Invalid quantity");
    }
    let found = false;
    for (const p of allProducts) {
      const v = p.variants.find((x) => x.id === item.variantId);
      if (v) {
        if (!v.available) throw new Error(`"${p.title}" is sold out`);
        resolved.push({
          handle: p.handle,
          variantId: String(v.id),
          title: p.title,
          variantTitle: v.title === "Default Title" ? null : v.title,
          image: p.images[0] ?? null,
          price: v.price,
          qty: item.qty,
        });
        found = true;
        break;
      }
    }
    if (!found) throw new Error("Unknown product in cart");
  }
  if (resolved.length === 0) throw new Error("Cart is empty");
  return resolved;
}

export function validateCustomer(c: Partial<CheckoutCustomerInput>): CheckoutCustomerInput {
  const required: (keyof CheckoutCustomerInput)[] = [
    "customerName",
    "email",
    "phone",
    "address",
    "city",
    "state",
    "pincode",
  ];
  for (const key of required) {
    const v = c[key];
    if (typeof v !== "string" || !v.trim()) throw new Error(`Missing field: ${key}`);
    if (v.length > 500) throw new Error(`Field too long: ${key}`);
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(c.email!)) throw new Error("Invalid email address");
  if (!/^[\d\s+\-()]{8,16}$/.test(c.phone!)) throw new Error("Invalid phone number");
  if (!/^\d{6}$/.test(c.pincode!.trim())) throw new Error("Invalid pincode (6 digits)");
  return {
    customerName: c.customerName!.trim(),
    email: c.email!.trim().toLowerCase(),
    phone: c.phone!.replace(/[^\d+]/g, ""),
    address: c.address!.trim(),
    city: c.city!.trim(),
    state: c.state!.trim(),
    pincode: c.pincode!.trim(),
    notes: (c.notes || "").trim().slice(0, 1000) || undefined,
  };
}
