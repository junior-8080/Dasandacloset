"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, Minus, Plus, ShoppingBag, Check } from "lucide-react";
import { useCart } from "@/lib/cart-context";
import type { Product } from "@/lib/data";

const SIZES = ["XS", "S", "M", "L", "XL", "XXL", "Custom"];

const BADGE_STYLES: Record<string, string> = {
  "Best Seller": "bg-brand-red text-white",
  "New": "bg-brand-charcoal text-white",
  "Eid Special": "bg-brand-gold text-white",
};

interface ProductDrawerProps {
  product: Product | null;
  onClose: () => void;
}

export default function ProductDrawer({ product, onClose }: ProductDrawerProps) {
  const { add, setCartOpen } = useCart();
  const [selectedSize, setSelectedSize] = useState("M");
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  function handleAdd() {
    if (!product) return;
    for (let i = 0; i < qty; i++) {
      add(product, selectedSize);
    }
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  }

  function handleViewCart() {
    onClose();
    setCartOpen(true);
  }

  return (
    <AnimatePresence>
      {product && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/40 z-40"
          />

          {/* Drawer */}
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 340, damping: 34 }}
            className="fixed right-0 top-0 h-full w-full max-w-lg bg-white z-50 flex flex-col shadow-2xl overflow-y-auto"
          >
            {/* Close */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/80 backdrop-blur-sm hover:bg-brand-cream transition-colors text-brand-charcoal-light"
            >
              <X size={18} />
            </button>

            {/* Image */}
            <div className="relative w-full aspect-[4/5] bg-brand-cream-dark shrink-0">
              <Image
                src={product.images[0] ?? "/landingPage/bestSeller.jpeg"}
                alt={product.name}
                fill
                sizes="(max-width: 768px) 100vw, 512px"
                className="object-cover"
              />
              {product.badge && (
                <span
                  className={`absolute top-4 left-4 text-xs font-semibold px-2.5 py-1 rounded-full ${
                    BADGE_STYLES[product.badge] ?? "bg-brand-charcoal text-white"
                  }`}
                >
                  {product.badge}
                </span>
              )}
            </div>

            {/* Details */}
            <div className="px-6 py-6 flex flex-col gap-5">
              {/* Name + price */}
              <div>
                <h2 className="font-serif text-2xl font-bold text-brand-charcoal leading-snug mb-2">
                  {product.name}
                </h2>
                <div className="flex items-baseline gap-3">
                  <span className="text-xl font-semibold text-brand-red">
                    GHS {product.price.toLocaleString()}
                  </span>
                  {product.originalPrice && (
                    <span className="text-sm text-brand-charcoal-light line-through">
                      GHS {product.originalPrice.toLocaleString()}
                    </span>
                  )}
                </div>
              </div>

              {/* Description */}
              <p className="text-sm text-brand-charcoal-light leading-relaxed">
                {product.description}
              </p>

              {/* Size selector */}
              <div>
                <p className="text-xs font-semibold text-brand-charcoal uppercase tracking-widest mb-3">
                  Size
                </p>
                <div className="flex flex-wrap gap-2">
                  {SIZES.map((s) => (
                    <button
                      key={s}
                      onClick={() => setSelectedSize(s)}
                      className={`px-4 py-2 rounded-full text-sm font-medium border transition-all duration-150 ${
                        selectedSize === s
                          ? "bg-brand-charcoal text-white border-brand-charcoal"
                          : "border-brand-cream-dark text-brand-charcoal hover:border-brand-red hover:text-brand-red"
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity + live total */}
              <div>
                <p className="text-xs font-semibold text-brand-charcoal uppercase tracking-widest mb-3">
                  Quantity
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <button
                      onClick={() => setQty((q) => Math.max(1, q - 1))}
                      className="w-9 h-9 rounded-full border border-brand-cream-dark flex items-center justify-center hover:bg-brand-cream transition-colors"
                    >
                      <Minus size={14} />
                    </button>
                    <span className="text-base font-semibold w-6 text-center">{qty}</span>
                    <button
                      onClick={() => setQty((q) => q + 1)}
                      className="w-9 h-9 rounded-full border border-brand-cream-dark flex items-center justify-center hover:bg-brand-cream transition-colors"
                    >
                      <Plus size={14} />
                    </button>
                  </div>

                  {/* Live total */}
                  <div className="text-right">
                    <p className="text-xs text-brand-charcoal-light mb-0.5">Total</p>
                    <motion.p
                      key={qty}
                      initial={{ opacity: 0, y: -6 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.18 }}
                      className="font-serif text-xl font-bold text-brand-red"
                    >
                      GHS {(product.price * qty).toLocaleString()}
                    </motion.p>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-col gap-3 pt-2">
                <button
                  onClick={handleAdd}
                  className={`w-full flex items-center justify-center gap-2 py-3.5 rounded-full font-semibold text-sm transition-all duration-200 ${
                    added
                      ? "bg-green-600 text-white"
                      : "bg-brand-gradient text-white shadow-brand-glow hover:shadow-lg hover:-translate-y-0.5"
                  }`}
                >
                  {added ? (
                    <>
                      <Check size={16} />
                      Added to Cart
                    </>
                  ) : (
                    <>
                      <ShoppingBag size={16} />
                      Add to Cart
                    </>
                  )}
                </button>

                {added && (
                  <button
                    onClick={handleViewCart}
                    className="w-full py-3 rounded-full border border-brand-charcoal text-brand-charcoal text-sm font-semibold hover:bg-brand-cream transition-colors"
                  >
                    View Cart
                  </button>
                )}
              </div>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}