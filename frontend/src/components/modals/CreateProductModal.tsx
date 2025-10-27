import { useForm } from 'react-hook-form';
import type { SubmitHandler } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import api from '../../lib/api';
import { toast } from 'sonner';
import { normalizeProductPayload } from '../../lib/payload';

const schema = z.object({
  sku: z.string().min(1, 'SKU wajib diisi'),
  name: z.string().min(1, 'Nama wajib diisi'),
  stock: z.number().min(0, 'Minimal 0'),
});

export type ProductFormValues = z.infer<typeof schema>;

interface Props {
  open: boolean;
  onClose: () => void;
  onCreated: (p: { id: string; name: string; sku: string; stock: number }) => void;
}

export default function CreateProductModal({ open, onClose, onCreated }: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ProductFormValues>({ resolver: zodResolver(schema), defaultValues: { stock: 0 } });

  const onSubmit: SubmitHandler<ProductFormValues> = async (values) => {
    try {
      const payload = normalizeProductPayload(values);
      const { data } = await api.post('/api/products', payload);
      const resp = (data && typeof data === 'object' && 'data' in (data as any) ? (data as any).data : data) ?? null;
      if (resp) {
        onCreated(resp);
      }
      toast.success('Produk ditambahkan');
      reset();
      onClose();
    } catch (err: any) {
      const msg = err?.response?.data?.message ?? err?.message ?? 'Gagal menambahkan produk';
      toast.error(msg);
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="w-full max-w-md rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-soft">
        <h2 className="mb-4 text-lg font-semibold text-slate-900 dark:text-slate-100">Tambah Produk</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="mb-1 block text-sm">SKU</label>
            <input {...register('sku')} className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-transparent px-3 py-2 text-sm" />
            {errors.sku && <p className="mt-1 text-xs text-red-500">{errors.sku.message}</p>}
          </div>
          <div>
            <label className="mb-1 block text-sm">Nama</label>
            <input {...register('name')} className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-transparent px-3 py-2 text-sm" />
            {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name.message}</p>}
          </div>
          <div>
            <label className="mb-1 block text-sm">Stok</label>
            <input type="number" {...register('stock', { valueAsNumber: true })} className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-transparent px-3 py-2 text-sm" />
            {errors.stock && <p className="mt-1 text-xs text-red-500">{errors.stock.message}</p>}
          </div>
          <div className="mt-2 flex items-center justify-end gap-2">
            <button type="button" onClick={onClose} className="rounded-lg border border-slate-200 dark:border-slate-700 px-3 py-2 text-sm">Batal</button>
            <button type="submit" disabled={isSubmitting} className="rounded-lg bg-primary-600 px-3 py-2 text-sm text-white hover:bg-primary-700 disabled:opacity-50">
              {isSubmitting ? 'Menyimpan...' : 'Simpan'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}