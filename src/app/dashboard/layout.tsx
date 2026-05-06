import { UserSidebar } from '@/components/layout/UserSidebar';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-[calc(100vh-5rem)]">
      <UserSidebar />
      <main className="flex-1 bg-neutral-50 overflow-auto">
        {children}
      </main>
    </div>
  );
}
