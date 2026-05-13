"use client";

import Link from "next/link";
import Image from "next/image";
import { useSearchParams, useRouter } from "next/navigation";
import { useState } from "react";
import { useAdminProducts } from "@/lib/hooks/use-admin-products";
import DeleteProductButton from "@/components/admin/DeleteProductButton";

export default function ProductsPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const search = searchParams.get("search") ?? undefined;
  const collection = searchParams.get("collection") ?? undefined;
  const [searchInput, setSearchInput] = useState(search ?? "");

  const { data: products = [], isLoading } = useAdminProducts({ search, collection });

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    const params = new URLSearchParams();
    if (searchInput) params.set("search", searchInput);
    if (collection) params.set("collection", collection);
    router.push(`/admin/products?${params}`);
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-serif text-2xl font-bold text-[#1A1A1A]">Products</h1>
        <Link
          href="/admin/products/new"
          className="bg-[#C9A96E] hover:bg-[#b8924f] text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors"
        >
          + Add Product
        </Link>
      </div>

      <form onSubmit={handleSearch} className="flex gap-3 mb-6">
        <input
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          placeholder="Search products…"
          className="border border-[#F0EDE8] rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-[#C9A96E] bg-white w-64"
        />
        <button
          type="submit"
          className="border border-[#F0EDE8] bg-white px-4 py-2 text-sm rounded-lg hover:bg-[#FAF7F2] transition-colors"
        >
          Search
        </button>
      </form>

      {isLoading ? (
        <div className="text-[#1A1A1A]/40 text-sm py-12 text-center">Loading…</div>
      ) : (
        <div className="bg-white rounded-xl border border-[#F0EDE8] overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[#F0EDE8]">
                {["Image", "Name", "Price", "Collections", "Badge", "Stock", "Actions"].map((h) => (
                  <th key={h} className="text-left px-5 py-3 text-xs font-medium text-[#1A1A1A]/50 uppercase tracking-wide">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {products.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-5 py-12 text-center text-[#1A1A1A]/40">No products found.</td>
                </tr>
              ) : (
                products.map((p) => (
                  <tr key={p._id} className="border-b border-[#F0EDE8] last:border-0 hover:bg-[#FAF7F2]">
                    <td className="px-5 py-3">
                      {p.images[0] ? (
                        <div className="w-12 h-12 rounded-lg overflow-hidden relative bg-[#F0EDE8]">
                          <Image src={p.images[0]} alt={p.name} fill className="object-cover" />
                        </div>
                      ) : (
                        <div className="w-12 h-12 rounded-lg bg-[#F0EDE8]" />
                      )}
                    </td>
                    <td className="px-5 py-3 font-medium text-[#1A1A1A]">{p.name}</td>
                    <td className="px-5 py-3">
                      <span className="text-[#1A1A1A]">₵{p.price.toLocaleString()}</span>
                      {p.originalPrice && (
                        <span className="ml-1 text-[#1A1A1A]/40 line-through text-xs">₵{p.originalPrice}</span>
                      )}
                    </td>
                    <td className="px-5 py-3">
                      <div className="flex flex-wrap gap-1">
                        {p.collections.map((c) => (
                          <span key={c} className="bg-[#FAF7F2] text-[#1A1A1A]/60 text-[10px] px-2 py-0.5 rounded-full border border-[#F0EDE8]">{c}</span>
                        ))}
                      </div>
                    </td>
                    <td className="px-5 py-3">
                      {p.badge && (
                        <span className="bg-[#C9A96E]/10 text-[#C9A96E] text-[10px] px-2 py-0.5 rounded-full font-medium">{p.badge}</span>
                      )}
                    </td>
                    <td className="px-5 py-3">
                      <span className={`text-xs font-medium ${p.inStock ? "text-green-600" : "text-red-500"}`}>
                        {p.inStock ? "In Stock" : "Out"}
                      </span>
                    </td>
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-3">
                        <Link href={`/admin/products/${p._id}/edit`} className="text-xs text-[#C9A96E] hover:underline">Edit</Link>
                        <DeleteProductButton id={p._id} name={p.name} />
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}