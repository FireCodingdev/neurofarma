import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import { createServerClient } from '@supabase/ssr';
import { AdminSidebar } from '@/components/layout/AdminSidebar';

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const cookieStore = cookies();

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll: () => cookieStore.getAll(),
        setAll: () => {},
      },
    }
  );

  const { data: { session } } = await supabase.auth.getSession();

  if (!session) {
    redirect('/login?next=/admin');
  }

  // app_metadata só pode ser definido via service role — o usuário não consegue forjar
  const isAdmin = session.user.app_metadata?.role === 'admin';

  if (!isAdmin) {
    redirect('/dashboard');
  }

  return (
    <div className="flex min-h-[calc(100vh-5rem)]">
      <AdminSidebar />
      <main className="flex-1 bg-neutral-50 overflow-auto">
        {children}
      </main>
    </div>
  );
}
