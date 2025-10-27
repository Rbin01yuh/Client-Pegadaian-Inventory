import { useForm } from 'react-hook-form';
import type { SubmitHandler } from 'react-hook-form';
import { useEffect } from 'react';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import api from '../../lib/api';
import { toast } from 'sonner';
import { useAuthStore } from '../../store/auth';
import { normalizeTransactionPayload } from '../../lib/payload';

const schema = z.object({
  sku: z.string().min(1, 'SKU wajib diisi'),
  quantity: z.number().min(1, 'Minimal 1'),
  type: z.enum(['in', 'out']),
  note: z.string().optional(),
});

type FormValues = z.infer<typeof schema>;

export default function Transactions() {
  const role = useAuthStore((s) => s.user?.role);
  const defaultType: 'in' | 'out' = role === 'staff' ? 'out' : 'in';

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({ resolver: zodResolver(schema), defaultValues: { type: defaultType } });

  // Paksa type menjadi 'out' jika role staff (ketika role dimuat atau berubah)
  useEffect(() => {
    if (role === 'staff') {
      setValue('type', 'out', { shouldDirty: true });
    }
  }, [role, setValue]);

  const onSubmit: SubmitHandler<FormValues> = async (values) => {
    try {
      const effectiveType: 'in' | 'out' = role === 'staff' ? 'out' : values.type;
      const payload = normalizeTransactionPayload({ ...values, type: effectiveType });
      const { data } = await api.post('/api/transactions', payload);
      const msg = (data && typeof data === 'object' && 'message' in (data as any) ? (data as any).message : null) ?? 'Transaksi tersimpan';
      toast.success(msg);
      reset({ type: effectiveType });
    } catch (err: any) {
      const msg = err?.response?.data?.message ?? err?.message ?? 'Gagal menyimpan transaksi';
      toast.error(msg);
    }
  };

  const currentType = watch('type');

  return (
    <div className="mx-auto max-w-lg space-y-4">
      <h1 className="text-xl font-semibold">Transaksi Barang Masuk/Keluar</h1>
      {role === 'staff' && (
        <div className="rounded-lg border border-amber-200 bg-amber-50 px-3 py-2 text-xs text-amber-800 dark:border-amber-900 dark:bg-amber-950/30 dark:text-amber-300">
          Staff hanya dapat mencatat barang keluar. Barang masuk dihandle oleh admin.
        </div>
      )}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 rounded-xl border border-slate-200 dark:border-slate-800 p-6 shadow-soft">
        <div>
          <label className="mb-1 block text-sm">SKU</label>
          <input {...register('sku')} className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-transparent px-3 py-2 text-sm" />
          {errors.sku && <p className="mt-1 text-xs text-red-500">{errors.sku.message}</p>}
        </div>
        <div>
          <label className="mb-1 block text-sm">Jumlah</label>
          <input type="number" {...register('quantity', { valueAsNumber: true })} className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-transparent px-3 py-2 text-sm" />
          {errors.quantity && <p className="mt-1 text-xs text-red-500">{errors.quantity.message}</p>}
        </div>
        <div>
          <label className="mb-1 block text-sm">Tipe</label>
          <select {...register('type')} className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-transparent px-3 py-2 text-sm">
            <option value="in" disabled={role === 'staff'}>Barang Masuk</option>
            <option value="out">Barang Keluar{role === 'staff' && currentType !== 'out' ? ' (dipaksa keluar)' : ''}</option>
          </select>
          {errors.type && <p className="mt-1 text-xs text-red-500">{errors.type.message}</p>}
        </div>
        <div>
          <label className="mb-1 block text-sm">Catatan</label>
          <textarea {...register('note')} className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-transparent px-3 py-2 text-sm" rows={3} />
        </div>
        <button type="submit" disabled={isSubmitting} className="w-full rounded-lg bg-primary-500 px-3 py-2 text-sm text-white hover:bg-primary-600 disabled:opacity-50">
          {isSubmitting ? 'Memproses...' : 'Simpan Transaksi'}
        </button>
      </form>
    </div>
  );
}