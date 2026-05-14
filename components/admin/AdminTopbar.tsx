"use client";

import { signOut } from "next-auth/react";
import { LogOut, Menu } from "lucide-react";

interface AdminTopbarProps {
  onMenuClick: () => void;
}

export default function AdminTopbar({ onMenuClick }: AdminTopbarProps) {
  return (
    <header className="h-14 bg-white border-b border-[#F0EDE8] flex items-center justify-between px-4 sm:px-6 lg:px-8 shrink-0">
      <button
        onClick={onMenuClick}
        className="lg:hidden p-2 -ml-1 rounded-lg text-[#1A1A1A]/60 hover:text-[#1A1A1A] hover:bg-[#F0EDE8] transition-colors"
        aria-label="Open menu"
      >
        <Menu size={20} />
      </button>

      <div className="hidden lg:block" />

      <button
        onClick={() => signOut({ callbackUrl: "/admin/login" })}
        className="flex items-center gap-2 text-sm text-[#1A1A1A]/60 hover:text-[#1A1A1A] transition-colors"
      >
        <LogOut size={15} />
        <span className="hidden sm:inline">Sign out</span>
      </button>
    </header>
  );
}