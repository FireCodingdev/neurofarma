import { AdminSidebar } from '@/components/layout/AdminSidebar';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-[calc(100vh-5rem)]">
      <AdminSidebar />
      <main className="flex-1 bg-neutral-50 overflow-auto">
        {children}
      </main>
    </div>
  );
}
