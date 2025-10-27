import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

interface Props {
  data: { date: string; in: number; out: number }[];
}

export function TransactionChart({ data }: Props) {
  return (
    <div className="rounded-xl border border-slate-200 dark:border-slate-800 p-4 shadow-soft">
      <h3 className="mb-2 text-sm font-medium">Grafik Transaksi</h3>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
            <XAxis dataKey="date" tick={{ fontSize: 12 }} />
            <YAxis tick={{ fontSize: 12 }} />
            <Tooltip />
            <Line type="monotone" dataKey="in" stroke="#10b981" strokeWidth={2} dot={false} />
            <Line type="monotone" dataKey="out" stroke="#ef4444" strokeWidth={2} dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}