import { useForm } from 'react-hook-form';
import type { SubmitHandler } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import api from '../../lib/api';
import { toast } from 'sonner';
import { normalizeSupplierPayload } from '../../lib/payload';

const schema = z
  .object({
    name: z.string().min(1, 'Nama wajib diisi'),
    email: z.string().trim().optional(),
    phone: z.string().trim().optional(),
  })
  .superRefine((val, ctx) => {
    if (val.email && val.email.length > 0) {
      const ok = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val.email);
      if (!ok) ctx.addIssue({ code: z.ZodIssueCode.custom, path: ['email'], message: 'Email tidak valid' });
    }
  });

export type SupplierFormValues = z.infer<typeof schema>;

interface Props {
  open: boolean;
  onClose: () => void;
  onCreated: (s: { id: string; name: string; email?: string | null; phone?: string | null }) => void;
}

export default function CreateSupplierModal({ open, onClose, onCreated }: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<SupplierFormValues>({ resolver: zodResolver(schema) });

  const onSubmit: SubmitHandler<SupplierFormValues> = async (values) => {
    try {
      const payloadToSend = normalizeSupplierPayload(values);
      const { data } = await api.post('/api/suppliers', payloadToSend);
      const payload = (data && typeof data === 'object' && 'data' in (data as any) ? (data as any).data : data) ?? null;
      if (payload) {
        onCreated(payload);
      }
      toast.success('Supplier ditambahkan');
      reset();
      onClose();
    } catch (err: any) {
      const msg = err?.response?.data?.message ?? err?.message ?? 'Gagal menambahkan supplier';
      toast.error(msg);
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="w-full max-w-md rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-soft">
        <h2 className="mb-4 text-lg font-semibold text-slate-900 dark:text-slate-100">Tambah Supplier</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="mb-1 block text-sm">Nama</label>
            <input {...register('name')} className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-transparent px-3 py-2 text-sm" />
            {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name.message}</p>}
          </div>
          <div>
            <label className="mb-1 block text-sm">Email (opsional)</label>
            <input {...register('email')} className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-transparent px-3 py-2 text-sm" />
            {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email.message}</p>}
          </div>
          <div>
            <label className="mb-1 block text-sm">Telepon (opsional)</label>
            <input {...register('phone')} className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-transparent px-3 py-2 text-sm" />
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