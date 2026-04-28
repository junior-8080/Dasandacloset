"use client";

import { motion } from "framer-motion";
import { COLLECTIONS } from "@/lib/data";

interface CollectionTabsProps {
  active: string;
  onChange: (id: string) => void;
}

export default function CollectionTabs({ active, onChange }: CollectionTabsProps) {
  return (
    <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-hide">
      {COLLECTIONS.map((col) => (
        <button
          key={col.id}
          onClick={() => onChange(col.id)}
          className={`relative shrink-0 px-5 py-2 rounded-full text-sm font-medium transition-colors duration-200 ${
            active === col.id
              ? "text-white"
              : "text-brand-charcoal hover:text-brand-red bg-white border border-brand-cream-dark"
          }`}
        >
          {active === col.id && (
            <motion.span
              layoutId="collection-pill"
              className="absolute inset-0 rounded-full bg-brand-gradient"
              style={{ zIndex: -1 }}
              transition={{ type: "spring", stiffness: 380, damping: 32 }}
            />
          )}
          {col.label}
        </button>
      ))}
    </div>
  );
}