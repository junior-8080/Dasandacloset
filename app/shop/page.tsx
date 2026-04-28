"use client";

import { useState, useMemo } from "react";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CollectionTabs from "@/components/shop/CollectionTabs";
import ProductCard from "@/components/shop/ProductCard";
import ProductDrawer from "@/components/shop/ProductDrawer";
import { PRODUCTS, type Product } from "@/lib/data";

export default function ShopPage() {
  const [activeCollection, setActiveCollection] = useState("all");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const filtered = useMemo(
    () =>
      activeCollection === "all"
        ? PRODUCTS
        : PRODUCTS.filter((p) => p.collections.includes(activeCollection)),
    [activeCollection]
  );

  return (
    <>
      <Navbar />

      {/* Compact header + filters */}
      <section className="max-w-7xl mx-auto px-6 lg:px-8 pt-28 pb-4">
        <div className="flex items-center justify-between mb-5">
          <h1 className="font-serif text-2xl font-bold text-brand-charcoal">
            Shop
          </h1>
          <Link
            href="/"
            className="inline-flex items-center gap-1 text-xs text-brand-charcoal-light hover:text-brand-red transition-colors"
          >
            <ArrowLeft size={12} />
            Home
          </Link>
        </div>

        <CollectionTabs active={activeCollection} onChange={setActiveCollection} />
      </section>

      {/* Grid */}
      <section className="max-w-7xl mx-auto px-6 lg:px-8 py-5">
        <p className="text-xs text-brand-charcoal-light mb-4">
          {filtered.length} {filtered.length === 1 ? "item" : "items"}
        </p>

        {filtered.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {filtered.map((product, i) => (
              <ProductCard
                key={product.id}
                product={product}
                index={i}
                onViewDetails={setSelectedProduct}
              />
            ))}
          </div>
        ) : (
          <div className="py-24 text-center text-brand-charcoal-light">
            No items in this collection yet — check back soon.
          </div>
        )}
      </section>

      {/* Made-to-fit strip */}
      <section className="bg-brand-charcoal py-14 mt-10">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <p className="text-brand-cream/60 text-sm uppercase tracking-widest mb-3 font-medium">
            Made-to-Fit
          </p>
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-brand-cream mb-4">
            Don&apos;t see your size?
          </h2>
          <p className="text-brand-cream/70 mb-8 leading-relaxed">
            Every piece can be tailored to your exact measurements. Contact us and
            we&apos;ll craft something just for you.
          </p>
          <Link
            href="/checkout?custom=1"
            className="inline-flex items-center gap-2 bg-brand-gradient text-white font-semibold px-8 py-3.5 rounded-full shadow-brand-glow hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200"
          >
            Request Made-to-Fit
          </Link>
        </div>
      </section>

      <Footer />

      {/* Product detail drawer */}
      <ProductDrawer
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />
    </>
  );
}