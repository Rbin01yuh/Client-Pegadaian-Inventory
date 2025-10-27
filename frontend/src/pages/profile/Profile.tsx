import { useAuthStore } from '../../store/auth';

export default function Profile() {
  const { user, token, logout } = useAuthStore();
  return (
    <div className="space-y-3">
      <h1 className="text-xl font-semibold">Profil Akun</h1>
      <div className="rounded-xl border border-slate-200 dark:border-slate-800 p-4">
        {user ? (
          <div className="space-y-2 text-sm">
            <div><span className="font-medium">Nama:</span> {user.name}</div>
            <div><span className="font-medium">Role:</span> {user.role}</div>
            <div className="break-all"><span className="font-medium">Token:</span> {token}</div>
            <button onClick={logout} className="mt-3 rounded-lg bg-primary-500 px-3 py-2 text-sm text-white hover:bg-primary-600">Logout</button>
          </div>
        ) : (
          <div className="text-sm text-slate-500">Belum login</div>
        )}
      </div>
    </div>
  );
}