import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import api from '../../lib/api';
import { useAuthStore } from '../../store/auth';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'sonner';
import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import logo from '../../pictures/smart Inventory.png';

const schema = z.object({
  email: z.string().email('Email tidak valid'),
  password: z.string().min(6, 'Password minimal 6 karakter'),
});

type FormValues = z.infer<typeof schema>;

export default function Login() {
  const navigate = useNavigate();
  const login = useAuthStore((s) => s.login);
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({ resolver: zodResolver(schema) });

  const onSubmit = async (values: FormValues) => {
    try {
      const { data } = await api.post('/api/auth/login', {
        email: values.email,
        password: values.password,
      });
      const payload = (data && (data as any).data) ? (data as any).data : data;
      login({ token: payload.token, user: { id: payload.user.id, name: payload.user.name ?? payload.user.username ?? payload.user.email, role: payload.user.role } });
      toast.success('Login berhasil');
      navigate('/dashboard');
    } catch (err: any) {
      const details = err?.response?.data?.details?.join?.(', ');
      toast.error(details ?? err?.response?.data?.message ?? 'Login gagal');
    }
  };

  return (
    <div className="min-h-screen bg-green-50 dark:bg-slate-950 flex items-center justify-center p-4">
      <div className="relative flex w-full max-w-4xl overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-soft">
        {/* Left: Form */}
        <div className="w-full md:w-1/2 p-8">
          <div className="mb-6">
            <div className="flex items-center gap-2">
              <img src={logo} alt="Smart Inventory" className="h-8 w-8 rounded-sm" />
              <h2 className="text-2xl font-semibold text-green-600">Smart Inventory</h2>
            </div>
            <p className="text-sm text-slate-500">Login ke akun Anda</p>
          </div>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label className="block text-sm mb-1">Email</label>
              <input
                type="email"
                {...register('email')}
                className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-transparent px-3 py-2 text-sm"
                placeholder="you@example.com"
              />
              {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email.message}</p>}
            </div>
            <div>
              <label className="block text-sm mb-1">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  {...register('password')}
                  className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-transparent px-3 py-2 pr-10 text-sm"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"
                  aria-label={showPassword ? 'Sembunyikan password' : 'Tampilkan password'}
                  title={showPassword ? 'Sembunyikan password' : 'Tampilkan password'}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
              {errors.password && <p className="mt-1 text-xs text-red-500">{errors.password.message}</p>}
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full rounded-lg bg-green-600 px-3 py-2 text-sm text-white hover:bg-green-700 disabled:opacity-50"
            >
              {isSubmitting ? 'Memproses...' : 'Login'}
            </button>
            <div className="flex items-center justify-between text-xs text-slate-500">
              <a href="#" className="hover:text-green-600">Lupa password?</a>
              <Link to="/register" className="hover:text-green-600">Daftar akun</Link>
            </div>
          </form>
        </div>
        {/* Right: Solid color panel (no photo) */}
        <div className="hidden md:block md:w-1/2 bg-green-600">
          <div className="h-full w-full flex items-center">
            <div className="px-10 text-white">
              <h3 className="text-lg font-semibold">Sistem informasi inventory & pembelian</h3>
              <p className="mt-1 text-sm opacity-90">by Kelompok 1</p>
            </div>
          </div>
        </div>
      </div>
      <div className="fixed bottom-6 right-6 text-slate-400 text-xs">StokCoding.com</div>
    </div>
  );
}