"use client";

import Link from "next/link";
import { Package, ShoppingCart, TrendingUp, Clock } from "lucide-react";
import { useAdminStats } from "@/lib/hooks/use-admin-stats";

const STATUS_COLORS: Record<string, string> = {
  pending: "bg-yellow-100 text-yellow-700",
  confirmed: "bg-blue-100 text-blue-700",
  shipped: "bg-purple-100 text-purple-700",
  delivered: "bg-green-100 text-green-700",
  cancelled: "bg-red-100 text-red-700",
};

export default function AdminDashboard() {
  const { data: stats, isLoading } = useAdminStats();

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-serif text-2xl font-bold text-[#1A1A1A]">Dashboard</h1>
        <div className="flex gap-3">
          <Link
            href="/admin/products/new"
            className="bg-[#C9A96E] hover:bg-[#b8924f] text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors"
          >
            + Add Product
          </Link>
          <Link
            href="/admin/orders"
            className="border border-[#F0EDE8] bg-white text-[#1A1A1A] text-sm font-medium px-4 py-2 rounded-lg hover:bg-[#FAF7F2] transition-colors"
          >
            View Orders
          </Link>
        </div>
      </div>

      {isLoading ? (
        <div className="text-[#1A1A1A]/40 text-sm">Loading…</div>
      ) : (
        <>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {[
              { label: "Total Products", value: stats?.totalProducts ?? 0, icon: Package, color: "text-[#C9A96E]" },
              { label: "Total Orders", value: stats?.totalOrders ?? 0, icon: ShoppingCart, color: "text-blue-500" },
              { label: "Revenue (GHS)", value: `₵${(stats?.revenue ?? 0).toLocaleString()}`, icon: TrendingUp, color: "text-green-500" },
              { label: "Pending Orders", value: stats?.byStatus?.pending ?? 0, icon: Clock, color: "text-yellow-500" },
            ].map(({ label, value, icon: Icon, color }) => (
              <div key={label} className="bg-white rounded-xl border border-[#F0EDE8] p-5">
                <div className={`${color} mb-3`}><Icon size={20} /></div>
                <p className="text-2xl font-bold text-[#1A1A1A]">{value}</p>
                <p className="text-xs text-[#1A1A1A]/50 mt-1">{label}</p>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-3 mb-8">
            {["pending", "confirmed", "shipped", "delivered", "cancelled"].map((s) => (
              <div key={s} className="bg-white rounded-xl border border-[#F0EDE8] px-4 py-3 text-center">
                <p className="text-lg font-bold text-[#1A1A1A]">{stats?.byStatus?.[s] ?? 0}</p>
                <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${STATUS_COLORS[s]}`}>{s}</span>
              </div>
            ))}
          </div>

          <div className="bg-white rounded-xl border border-[#F0EDE8]">
            <div className="px-6 py-4 border-b border-[#F0EDE8]">
              <h2 className="font-semibold text-[#1A1A1A]">Recent Orders</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-[#F0EDE8]">
                    {["Order #", "Customer", "Items", "Total", "Status", "Date"].map((h) => (
                      <th key={h} className="text-left px-6 py-3 text-xs font-medium text-[#1A1A1A]/50 uppercase tracking-wide">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {!stats?.recentOrders?.length ? (
                    <tr>
                      <td colSpan={6} className="px-6 py-10 text-center text-[#1A1A1A]/40 text-sm">No orders yet</td>
                    </tr>
                  ) : (
                    stats.recentOrders.map((order) => (
                      <tr key={order._id} className="border-b border-[#F0EDE8] last:border-0 hover:bg-[#FAF7F2]">
                        <td className="px-6 py-4 font-mono text-xs">{order.orderNumber}</td>
                        <td className="px-6 py-4">{order.customer?.name}</td>
                        <td className="px-6 py-4">{order.items?.length}</td>
                        <td className="px-6 py-4">₵{order.total?.toLocaleString()}</td>
                        <td className="px-6 py-4">
                          <span className={`text-xs px-2 py-1 rounded-full font-medium ${STATUS_COLORS[order.status]}`}>{order.status}</span>
                        </td>
                        <td className="px-6 py-4 text-[#1A1A1A]/50">{new Date(order.createdAt).toLocaleDateString()}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
    </div>
  );
}