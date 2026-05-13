"use client";

import { signOut } from "next-auth/react";
import { LogOut } from "lucide-react";

export default function AdminTopbar() {
  return (
    <header className="h-14 bg-white border-b border-[#F0EDE8] flex items-center justify-end px-8">
      <button
        onClick={() => signOut({ callbackUrl: "/admin/login" })}
        className="flex items-center gap-2 text-sm text-[#1A1A1A]/60 hover:text-[#1A1A1A] transition-colors"
      >
        <LogOut size={15} />
        Sign out
      </button>
    </header>
  );
}