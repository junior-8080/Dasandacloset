"use client";

import { ReactNode } from "react";
import { CartProvider } from "@/lib/cart-context";
import CartDrawer from "@/components/CartDrawer";

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <CartProvider>
      {children}
      <CartDrawer />
    </CartProvider>
  );
}