"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useAdminOrders } from "@/lib/hooks/use-admin-orders";

const STATUS_COLORS: Record<string, string> = {
  pending: "bg-yellow-100 text-yellow-700",
  confirmed: "bg-blue-100 text-blue-700",
  shipped: "bg-purple-100 text-purple-700",
  delivered: "bg-green-100 text-green-700",
  cancelled: "bg-red-100 text-red-700",
};

const STATUSES = ["all", "pending", "confirmed", "shipped", "delivered", "cancelled"];

export default function OrdersPage() {
  const searchParams = useSearchParams();
  const status = searchParams.get("status") ?? undefined;

  const { data: orders = [], isLoading } = useAdminOrders(status);

  return (
    <div>
      <h1 className="font-serif text-2xl font-bold text-[#1A1A1A] mb-6">Orders</h1>

      <div className="flex gap-2 mb-6 flex-wrap">
        {STATUSES.map((s) => (
          <Link
            key={s}
            href={s === "all" ? "/admin/orders" : `/admin/orders?status=${s}`}
            className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-colors capitalize ${
              (s === "all" && !status) || status === s
                ? "bg-[#C9A96E] border-[#C9A96E] text-white"
                : "border-[#F0EDE8] text-[#1A1A1A]/60 bg-white hover:border-[#C9A96E]"
            }`}
          >
            {s}
          </Link>
        ))}
      </div>

      {isLoading ? (
        <div className="text-[#1A1A1A]/40 text-sm py-12 text-center">Loading…</div>
      ) : (
        <div className="bg-white rounded-xl border border-[#F0EDE8] overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[#F0EDE8]">
                {["Order #", "Customer", "Items", "Total", "Status", "Date", ""].map((h, i) => (
                  <th key={i} className="text-left px-5 py-3 text-xs font-medium text-[#1A1A1A]/50 uppercase tracking-wide">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {orders.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-5 py-12 text-center text-[#1A1A1A]/40">No orders found.</td>
                </tr>
              ) : (
                orders.map((order) => (
                  <tr key={order._id} className="border-b border-[#F0EDE8] last:border-0 hover:bg-[#FAF7F2]">
                    <td className="px-5 py-4 font-mono text-xs">{order.orderNumber}</td>
                    <td className="px-5 py-4 font-medium text-[#1A1A1A]">{order.customer.name}</td>
                    <td className="px-5 py-4 text-[#1A1A1A]/60">{order.items.length}</td>
                    <td className="px-5 py-4">₵{order.total.toLocaleString()}</td>
                    <td className="px-5 py-4">
                      <span className={`text-xs px-2 py-1 rounded-full font-medium capitalize ${STATUS_COLORS[order.status]}`}>{order.status}</span>
                    </td>
                    <td className="px-5 py-4 text-[#1A1A1A]/50 text-xs">{new Date(order.createdAt).toLocaleDateString()}</td>
                    <td className="px-5 py-4">
                      <Link href={`/admin/orders/${order._id}`} className="text-xs text-[#C9A96E] hover:underline">View →</Link>
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