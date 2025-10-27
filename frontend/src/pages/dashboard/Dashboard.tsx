import { StockChart } from '../../components/charts/StockChart';
import { TransactionChart } from '../../components/charts/TransactionChart';

const mockStock = [
  { name: 'A', stock: 120 },
  { name: 'B', stock: 85 },
  { name: 'C', stock: 30 },
  { name: 'D', stock: 60 },
];

const mockTx = [
  { date: '2025-10-20', in: 30, out: 12 },
  { date: '2025-10-21', in: 24, out: 19 },
  { date: '2025-10-22', in: 18, out: 22 },
  { date: '2025-10-23', in: 34, out: 17 },
];

export default function Dashboard() {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="rounded-xl border border-slate-200 dark:border-slate-800 p-4 shadow-soft">
          <div className="text-xs text-slate-500">Stok Total</div>
          <div className="mt-1 text-2xl font-semibold">295</div>
        </div>
        <div className="rounded-xl border border-slate-200 dark:border-slate-800 p-4 shadow-soft">
          <div className="text-xs text-slate-500">Transaksi Hari Ini</div>
          <div className="mt-1 text-2xl font-semibold">17</div>
        </div>
        <div className="rounded-xl border border-slate-200 dark:border-slate-800 p-4 shadow-soft">
          <div className="text-xs text-slate-500">Produk Menipis</div>
          <div className="mt-1 text-2xl font-semibold">5</div>
        </div>
        <div className="rounded-xl border border-green-200 bg-green-50 p-4 shadow-soft dark:border-green-900 dark:bg-green-950/30">
          <div className="text-xs text-green-700 dark:text-green-300">Stok Total</div>
          <div className="mt-1 text-2xl font-semibold text-green-800 dark:text-green-200">295</div>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <StockChart data={mockStock} />
        <TransactionChart data={mockTx} />
      </div>
    </div>
  );
}