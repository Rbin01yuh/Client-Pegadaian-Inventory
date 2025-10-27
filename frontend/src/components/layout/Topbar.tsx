import { useState } from 'react';
import { Search, User, LogOut } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';
import { useAuthStore } from '../../store/auth';
import { useNavigate } from 'react-router-dom';

export function Topbar() {
  const [query, setQuery] = useState('');
  const [openMenu, setOpenMenu] = useState(false);
  const user = useAuthStore((s) => s.user);
  const logout = useAuthStore((s) => s.logout);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="sticky top-0 z-10 flex h-14 items-center justify-between border-b border-slate-200 bg-white/80 backdrop-blur dark:border-slate-800 dark:bg-slate-900/80 px-4">
      <div className="flex items-center gap-2">
        <Search size={18} className="text-slate-500 dark:text-slate-400" />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Cari produk, supplier, transaksi..."
          className="w-64 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 px-2 py-1 text-sm outline-none focus:ring-2 focus:ring-green-500"
        />
      </div>
      <div className="flex items-center gap-2">
        <ThemeToggle />
        <div className="relative">
          <button onClick={() => setOpenMenu((v) => !v)} className="flex items-center gap-2 rounded-lg border border-slate-200 dark:border-slate-700 px-3 py-1 text-sm hover:bg-slate-100 dark:hover:bg-slate-800">
            <User size={18} />
            <span>{user?.name ?? 'Profil'}</span>
          </button>
          {openMenu && (
            <div className="absolute right-0 mt-2 w-44 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 shadow-soft">
              <div className="px-3 py-2 text-xs text-slate-500">Role: {user?.role ?? '-'}</div>
              <button onClick={() => { setOpenMenu(false); navigate('/profile'); }} className="block w-full text-left px-3 py-2 text-sm hover:bg-slate-100 dark:hover:bg-slate-800">Profil</button>
              <button onClick={() => { setOpenMenu(false); handleLogout(); }} className="flex w-full items-center gap-2 text-left px-3 py-2 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20">
                <LogOut size={16} /> Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}