import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { Topbar } from './Topbar';
import { useAuthGuard } from '../../hooks/useAuth';

export function AppLayout() {
  useAuthGuard();
  return (
    <div className="flex h-screen w-full bg-gradient-to-b from-green-50 to-white dark:bg-gradient-to-b dark:from-slate-900 dark:to-slate-950 text-slate-900 dark:text-slate-100">
      <aside className="hidden md:block">
        <Sidebar />
      </aside>
      <div className="flex grow flex-col">
        <Topbar />
        <main className="flex-1 overflow-y-auto p-4">
          <Outlet />
        </main>
      </div>
    </div>
  );
}