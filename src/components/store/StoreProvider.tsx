"use client";

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

export type CartItem = {
  handle: string;
  variantId: number;
  title: string;
  variantTitle: string | null;
  price: number;
  compareAtPrice: number | null;
  image: string;
  qty: number;
};

type StoreState = {
  cart: CartItem[];
  wishlist: string[];
  cartOpen: boolean;
  addToCart: (item: Omit<CartItem, "qty">, qty?: number) => void;
  removeFromCart: (variantId: number) => void;
  setQty: (variantId: number, qty: number) => void;
  clearCart: () => void;
  toggleWishlist: (handle: string) => void;
  setCartOpen: (open: boolean) => void;
  cartCount: number;
  cartTotal: number;
};

const StoreContext = createContext<StoreState | null>(null);

export function useStore(): StoreState {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error("useStore must be used within StoreProvider");
  return ctx;
}

export default function StoreProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const c = localStorage.getItem("chitrangi:cart");
      const w = localStorage.getItem("chitrangi:wishlist");
      if (c) setCart(JSON.parse(c));
      if (w) setWishlist(JSON.parse(w));
    } catch {}
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (hydrated) localStorage.setItem("chitrangi:cart", JSON.stringify(cart));
  }, [cart, hydrated]);

  useEffect(() => {
    if (hydrated) localStorage.setItem("chitrangi:wishlist", JSON.stringify(wishlist));
  }, [wishlist, hydrated]);

  const addToCart = useCallback((item: Omit<CartItem, "qty">, qty = 1) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.variantId === item.variantId);
      if (existing) {
        return prev.map((i) =>
          i.variantId === item.variantId ? { ...i, qty: i.qty + qty } : i
        );
      }
      return [...prev, { ...item, qty }];
    });
    setCartOpen(true);
  }, []);

  const removeFromCart = useCallback((variantId: number) => {
    setCart((prev) => prev.filter((i) => i.variantId !== variantId));
  }, []);

  const setQty = useCallback((variantId: number, qty: number) => {
    setCart((prev) =>
      qty <= 0
        ? prev.filter((i) => i.variantId !== variantId)
        : prev.map((i) => (i.variantId === variantId ? { ...i, qty } : i))
    );
  }, []);

  const clearCart = useCallback(() => setCart([]), []);

  const toggleWishlist = useCallback((handle: string) => {
    setWishlist((prev) =>
      prev.includes(handle) ? prev.filter((h) => h !== handle) : [...prev, handle]
    );
  }, []);

  const cartCount = useMemo(() => cart.reduce((s, i) => s + i.qty, 0), [cart]);
  const cartTotal = useMemo(() => cart.reduce((s, i) => s + i.price * i.qty, 0), [cart]);

  const value = useMemo(
    () => ({
      cart,
      wishlist,
      cartOpen,
      addToCart,
      removeFromCart,
      setQty,
      clearCart,
      toggleWishlist,
      setCartOpen,
      cartCount,
      cartTotal,
    }),
    [cart, wishlist, cartOpen, addToCart, removeFromCart, setQty, clearCart, toggleWishlist, cartCount, cartTotal]
  );

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}
