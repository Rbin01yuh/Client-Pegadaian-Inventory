import { NavLink } from 'react-router-dom';
import { FileText, Home, Package, Truck, Workflow } from 'lucide-react';
import { cn } from '../../lib/utils';
import logo from '../../pictures/smart Inventory.png';

const navItems = [
  { to: '/dashboard', label: 'Dashboard', icon: Home },
  { to: '/products', label: 'Produk', icon: Package },
  { to: '/suppliers', label: 'Supplier', icon: Truck },
  { to: '/transactions', label: 'Transaksi', icon: Workflow },
  { to: '/reports', label: 'Laporan', icon: FileText },
];

export function Sidebar() {
  return (
    <aside className="flex h-full w-64 shrink-0 flex-col border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
      <div className="p-4">
        <div className="flex items-center gap-2">
          <img src={logo} alt="Smart Inventory" className="h-7 w-7 rounded-sm" />
          <div className="text-xl font-semibold text-green-600 dark:text-green-400">Smart Inventory</div>
        </div>
      </div>
      <nav className="mt-2 flex-1 space-y-1 p-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                cn(
                  'flex items-center gap-2 rounded-lg px-3 py-2 text-sm hover:bg-slate-100 dark:hover:bg-slate-800',
                  isActive && 'bg-slate-100 dark:bg-slate-800 text-green-600 dark:text-green-400'
                )
              }
            >
              <Icon size={18} />
              <span>{item.label}</span>
            </NavLink>
          );
        })}
      </nav>
    </aside>
  );
}