import { useEffect, useState } from 'react';
import api from '../../lib/api';
import { DataTable } from '../../components/tables/DataTable';
import type { Column } from '../../components/tables/DataTable';
import { toast } from 'sonner';
import CreateProductModal from '../../components/modals/CreateProductModal';
import { useAuthStore } from '../../store/auth';

interface Product {
  id: string;
  name: string;
  sku: string;
  stock: number;
}

export default function Products() {
  const [data, setData] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [openCreate, setOpenCreate] = useState(false);
  const role = useAuthStore((s) => s.user?.role);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await api.get('/api/products');
        const payload = (data && typeof data === 'object' && 'data' in (data as any) ? (data as any).data : data) ?? [];
        setData(Array.isArray(payload) ? payload : []);
      } catch (err: any) {
        toast.error(err?.response?.data?.message ?? 'Gagal memuat produk');
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const columns: Column<Product>[] = [
    { key: 'sku', header: 'SKU' },
    { key: 'name', header: 'Nama' },
    { key: 'stock', header: 'Stok' },
  ];

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">Produk</h1>
        {role === 'admin' ? (
          <button onClick={() => setOpenCreate(true)} className="rounded-lg bg-green-600 px-3 py-2 text-sm text-white hover:bg-green-700">Tambah Produk</button>
        ) : (
          <div className="text-xs text-slate-500">Hanya admin yang dapat menambah produk</div>
        )}
      </div>
      {loading ? (
        <div className="rounded-xl border border-slate-200 dark:border-slate-800 p-4">
          <div className="animate-pulse h-6 w-32 rounded bg-slate-200 dark:bg-slate-800" />
          <div className="mt-2 animate-pulse h-40 w-full rounded bg-slate-100 dark:bg-slate-800/50" />
        </div>
      ) : (
        <DataTable columns={columns} data={data} pageSize={10} filterKey={'name'} />
      )}
      {/* Modal Create */}
      <CreateProductModal
        open={openCreate}
        onClose={() => setOpenCreate(false)}
        onCreated={(p) => {
          setData((prev) => [p, ...prev]);
          toast.success('Produk ditambahkan');
          setOpenCreate(false);
        }}
      />
    </div>
  );
}