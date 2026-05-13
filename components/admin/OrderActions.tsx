"use client";

import { useState } from "react";
import { useUpdateOrder } from "@/lib/hooks/use-admin-orders";

const STATUSES = ["pending", "confirmed", "shipped", "delivered", "cancelled"] as const;
type Status = typeof STATUSES[number];

export default function OrderActions({
  orderId,
  currentStatus,
  currentNotes,
}: {
  orderId: string;
  currentStatus: Status;
  currentNotes: string;
}) {
  const [status, setStatus] = useState<Status>(currentStatus);
  const [notes, setNotes] = useState(currentNotes);
  const { mutate: updateOrder, isPending } = useUpdateOrder();

  const inputCls =
    "w-full border border-[#F0EDE8] rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-[#C9A96E] bg-white";

  return (
    <div className="bg-white rounded-xl border border-[#F0EDE8] p-5">
      <h2 className="font-semibold text-[#1A1A1A] mb-4">Update Order</h2>
      <div className="space-y-4">
        <div>
          <label className="block text-xs font-medium text-[#1A1A1A]/70 mb-1.5">Status</label>
          <select value={status} onChange={(e) => setStatus(e.target.value as Status)} className={inputCls}>
            {STATUSES.map((s) => (
              <option key={s} value={s} className="capitalize">{s}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-xs font-medium text-[#1A1A1A]/70 mb-1.5">Notes</label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            rows={3}
            className={inputCls}
            placeholder="Internal notes…"
          />
        </div>
        <button
          onClick={() => updateOrder({ id: orderId, data: { status, notes } })}
          disabled={isPending}
          className="bg-[#C9A96E] hover:bg-[#b8924f] text-white font-semibold px-5 py-2.5 rounded-lg text-sm transition-colors disabled:opacity-60"
        >
          {isPending ? "Saving…" : "Save Changes"}
        </button>
      </div>
    </div>
  );
}