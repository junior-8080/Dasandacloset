import type { Metadata } from "next";
import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminTopbar from "@/components/admin/AdminTopbar";
import QueryProvider from "@/components/admin/QueryProvider";

export const metadata: Metadata = { title: "Dasanda Admin" };

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <QueryProvider>
      <div className="min-h-screen bg-[#FAF7F2] flex">
        <AdminSidebar />
        <div className="flex-1 flex flex-col ml-52">
          <AdminTopbar />
          <main className="flex-1 p-8">{children}</main>
        </div>
      </div>
    </QueryProvider>
  );
}