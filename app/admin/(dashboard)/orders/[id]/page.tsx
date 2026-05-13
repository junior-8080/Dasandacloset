export const dynamic = "force-dynamic";
import { connectDB } from "@/lib/mongodb";
import { Order } from "@/lib/models/Order";
import { notFound } from "next/navigation";
import Image from "next/image";
import OrderActions from "@/components/admin/OrderActions";

async function getOrder(id: string) {
  await connectDB();
  return Order.findById(id).lean();
}

export default async function OrderDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const order = await getOrder(id);
  if (!order) notFound();

  return (
    <div className="max-w-2xl">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-serif text-2xl font-bold text-[#1A1A1A]">{order.orderNumber}</h1>
          <p className="text-sm text-[#1A1A1A]/50 mt-1">
            {new Date(order.createdAt).toLocaleDateString("en-GH", {
              year: "numeric", month: "long", day: "numeric",
            })}
          </p>
        </div>
      </div>

      {/* Customer */}
      <div className="bg-white rounded-xl border border-[#F0EDE8] p-5 mb-4">
        <h2 className="font-semibold text-[#1A1A1A] mb-3">Customer</h2>
        <div className="grid grid-cols-2 gap-3 text-sm">
          <div><p className="text-[#1A1A1A]/50 text-xs mb-0.5">Name</p><p>{order.customer.name}</p></div>
          <div><p className="text-[#1A1A1A]/50 text-xs mb-0.5">Email</p><p>{order.customer.email}</p></div>
          <div><p className="text-[#1A1A1A]/50 text-xs mb-0.5">Phone</p><p>{order.customer.phone}</p></div>
          <div><p className="text-[#1A1A1A]/50 text-xs mb-0.5">Address</p><p>{order.customer.address}</p></div>
        </div>
      </div>

      {/* Items */}
      <div className="bg-white rounded-xl border border-[#F0EDE8] p-5 mb-4">
        <h2 className="font-semibold text-[#1A1A1A] mb-3">Items</h2>
        <div className="space-y-3">
          {(order.items as Array<{ image: string; name: string; qty: number; price: number }>).map((item, i) => (
            <div key={i} className="flex items-center gap-3">
              {item.image ? (
                <div className="w-12 h-12 rounded-lg overflow-hidden relative flex-shrink-0 bg-[#F0EDE8]">
                  <Image src={item.image} alt={item.name} fill className="object-cover" />
                </div>
              ) : (
                <div className="w-12 h-12 rounded-lg bg-[#F0EDE8] flex-shrink-0" />
              )}
              <div className="flex-1">
                <p className="text-sm font-medium text-[#1A1A1A]">{item.name}</p>
                <p className="text-xs text-[#1A1A1A]/50">Qty: {item.qty}</p>
              </div>
              <p className="text-sm font-semibold text-[#1A1A1A]">
                ₵{(item.price * item.qty).toLocaleString()}
              </p>
            </div>
          ))}
        </div>
        <div className="border-t border-[#F0EDE8] mt-4 pt-4 flex justify-between font-semibold text-[#1A1A1A]">
          <span>Total</span>
          <span>₵{order.total.toLocaleString()} {order.currency}</span>
        </div>
      </div>

      {/* Status + notes — client component */}
      <OrderActions
        orderId={String(order._id)}
        currentStatus={order.status}
        currentNotes={order.notes ?? ""}
      />
    </div>
  );
}