import { useEffect, useState } from 'react';
import api from '../../lib/api';

interface LowStock {
  id: string;
  name: string;
  stock: number;
}

export default function Notifications() {
  const [items, setItems] = useState<LowStock[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await api.get('/api/products?lowStock=true');
        setItems(data);
      } catch {
        setItems([
          { id: 'c1', name: 'Produk C', stock: 3 },
          { id: 'e1', name: 'Produk E', stock: 2 },
        ]);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <div className="space-y-3">
      <h1 className="text-xl font-semibold">Notifikasi Stok Menipis</h1>
      <div className="rounded-xl border border-slate-200 dark:border-slate-800 p-4">
        {loading ? (
          <div className="animate-pulse h-24 w-full rounded bg-slate-100 dark:bg-slate-800/50" />
        ) : items.length === 0 ? (
          <div className="text-sm text-slate-500">Tidak ada produk menipis</div>
        ) : (
          <ul className="space-y-2 text-sm">
            {items.map((i) => (
              <li key={i.id} className="flex items-center justify-between">
                <span>{i.name}</span>
                <span className="text-red-600">Stok: {i.stock}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}