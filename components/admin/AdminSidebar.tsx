"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Package, Tag, ShoppingCart } from "lucide-react";

const links = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/products", label: "Products", icon: Package },
  { href: "/admin/collections", label: "Collections", icon: Tag },
  { href: "/admin/orders", label: "Orders", icon: ShoppingCart },
];

export default function AdminSidebar() {
  const path = usePathname();

  return (
    <aside className="fixed left-0 top-0 h-full w-52 bg-[#1A1A1A] flex flex-col z-30">
      <div className="px-6 py-7 border-b border-white/10">
        <p className="font-serif text-[#C9A96E] text-lg font-semibold">Dasanda</p>
        <p className="text-white/40 text-xs mt-0.5">Admin Panel</p>
      </div>

      <nav className="flex-1 px-3 py-5 space-y-1">
        {links.map(({ href, label, icon: Icon }) => {
          const active = href === "/admin" ? path === "/admin" : path.startsWith(href);
          return (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                active
                  ? "bg-[#C9A96E] text-[#1A1A1A]"
                  : "text-white/60 hover:text-white hover:bg-white/8"
              }`}
            >
              <Icon size={16} />
              {label}
            </Link>
          );
        })}
      </nav>

      <div className="px-6 py-5 border-t border-white/10">
        <Link href="/" className="text-white/40 text-xs hover:text-white/70 transition-colors">
          ← View Shop
        </Link>
      </div>
    </aside>
  );
}