"use client";

import { useState } from "react";
import { Trash2, Plus } from "lucide-react";
import {
  useAdminCollections,
  useCreateCollection,
  useUpdateCollection,
  useDeleteCollection,
} from "@/lib/hooks/use-admin-collections";

const inputCls =
  "border border-[#F0EDE8] rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-[#C9A96E] bg-white";

export default function CollectionsManager() {
  const { data: collections = [], isLoading } = useAdminCollections();
  const createCollection = useCreateCollection();
  const updateCollection = useUpdateCollection();
  const deleteCollection = useDeleteCollection();

  const [newId, setNewId] = useState("");
  const [newLabel, setNewLabel] = useState("");

  async function handleAdd(e: React.FormEvent) {
    e.preventDefault();
    await createCollection.mutateAsync({
      id: newId,
      label: newLabel,
      order: collections.length,
      active: true,
    });
    setNewId("");
    setNewLabel("");
  }

  if (isLoading) return <div className="text-[#1A1A1A]/40 text-sm">Loading…</div>;

  return (
    <div className="max-w-2xl">
      <form onSubmit={handleAdd} className="bg-white rounded-xl border border-[#F0EDE8] p-5 mb-6">
        <h2 className="font-semibold text-[#1A1A1A] mb-4">Add Collection</h2>
        <div className="flex gap-3">
          <div className="flex-1">
            <label className="block text-xs text-[#1A1A1A]/50 mb-1">ID (slug, e.g. "kaftans")</label>
            <input
              value={newId}
              onChange={(e) => setNewId(e.target.value.toLowerCase().replace(/\s+/g, "-"))}
              required
              placeholder="kaftans"
              className={inputCls + " w-full"}
            />
          </div>
          <div className="flex-1">
            <label className="block text-xs text-[#1A1A1A]/50 mb-1">Label</label>
            <input
              value={newLabel}
              onChange={(e) => setNewLabel(e.target.value)}
              required
              placeholder="Kaftans"
              className={inputCls + " w-full"}
            />
          </div>
          <div className="flex items-end">
            <button
              type="submit"
              disabled={createCollection.isPending}
              className="bg-[#C9A96E] hover:bg-[#b8924f] text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors disabled:opacity-60 flex items-center gap-1"
            >
              <Plus size={14} /> Add
            </button>
          </div>
        </div>
        {createCollection.error && (
          <p className="text-xs text-red-600 mt-2">
            {(createCollection.error as { error?: string })?.error ?? "Error"}
          </p>
        )}
      </form>

      <div className="bg-white rounded-xl border border-[#F0EDE8] overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-[#F0EDE8]">
              {["ID", "Label", "Order", "Active", "Actions"].map((h) => (
                <th key={h} className="text-left px-5 py-3 text-xs font-medium text-[#1A1A1A]/50 uppercase tracking-wide">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {collections.map((col) => (
              <tr key={col._id} className="border-b border-[#F0EDE8] last:border-0 hover:bg-[#FAF7F2]">
                <td className="px-5 py-3 font-mono text-xs text-[#1A1A1A]/60">{col.id}</td>
                <td className="px-5 py-3 font-medium text-[#1A1A1A]">{col.label}</td>
                <td className="px-5 py-3 text-[#1A1A1A]/50">{col.order}</td>
                <td className="px-5 py-3">
                  <button
                    onClick={() => updateCollection.mutate({ id: col._id, data: { active: !col.active } })}
                    className={`relative w-9 h-5 rounded-full transition-colors ${col.active ? "bg-[#C9A96E]" : "bg-[#F0EDE8]"}`}
                  >
                    <span className={`absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform ${col.active ? "translate-x-4" : "translate-x-0"}`} />
                  </button>
                </td>
                <td className="px-5 py-3">
                  <button
                    onClick={() => deleteCollection.mutate(col._id)}
                    className="text-[#1A1A1A]/30 hover:text-red-500 transition-colors"
                  >
                    <Trash2 size={14} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}