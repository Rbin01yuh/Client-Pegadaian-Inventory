import { useEffect, useState } from 'react';
import api from '../../lib/api';
import { DataTable } from '../../components/tables/DataTable';
import type { Column } from '../../components/tables/DataTable';
import { toast } from 'sonner';
import CreateSupplierModal from '../../components/modals/CreateSupplierModal';
import { useAuthStore } from '../../store/auth';

interface Supplier {
  id: string;
  name: string;
  email?: string | null;
  phone?: string | null;
}

export default function Suppliers() {
  const [data, setData] = useState<Supplier[]>([]);
  const [loading, setLoading] = useState(true);
  const [openCreate, setOpenCreate] = useState(false);
  const role = useAuthStore((s) => s.user?.role);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await api.get('/api/suppliers');
        const payload = (data && typeof data === 'object' && 'data' in (data as any) ? (data as any).data : data) ?? [];
        setData(Array.isArray(payload) ? payload : []);
      } catch (err: any) {
        toast.error(err?.response?.data?.message ?? 'Gagal memuat supplier');
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const columns: Column<Supplier>[] = [
    { key: 'name', header: 'Nama' },
    { key: 'email', header: 'Email', render: (row) => row.email && row.email.length > 0 ? row.email : '—' },
    { key: 'phone', header: 'Telepon', render: (row) => row.phone && row.phone.length > 0 ? row.phone : '—' },
  ];

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">Supplier</h1>
        {role === 'admin' ? (
          <button onClick={() => setOpenCreate(true)} className="rounded-lg bg-green-600 px-3 py-2 text-sm text-white hover:bg-green-700">Tambah Supplier</button>
        ) : (
          <div className="text-xs text-slate-500">Hanya admin yang dapat menambah supplier</div>
        )}
      </div>
      {loading ? (
        <div className="rounded-xl border border-slate-200 dark:border-slate-800 p-4">
          <div className="animate-pulse h-6 w-40 rounded bg-slate-200 dark:bg-slate-800" />
          <div className="mt-2 animate-pulse h-40 w-full rounded bg-slate-100 dark:bg-slate-800/50" />
        </div>
      ) : (
        <DataTable columns={columns} data={data} pageSize={10} filterKey={'name'} />
      )}
      {/* Modal Create */}
      <CreateSupplierModal
        open={openCreate}
        onClose={() => setOpenCreate(false)}
        onCreated={(s) => {
          setData((prev) => [s, ...prev]);
          toast.success('Supplier ditambahkan');
          setOpenCreate(false);
        }}
      />
    </div>
  );
}