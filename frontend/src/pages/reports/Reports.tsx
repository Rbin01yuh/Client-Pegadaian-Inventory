import { useEffect, useState } from 'react';
import api from '../../lib/api';
import { utils, writeFile } from 'xlsx';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

interface Tx {
  id: string;
  date: string;
  sku: string;
  type: 'in' | 'out';
  quantity: number;
}

export default function Reports() {
  const [data, setData] = useState<Tx[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await api.get('/api/reports/transactions');
        setData(data);
      } catch (err) {
        // fallback mock
        setData([
          { id: '1', date: '2025-10-20', sku: 'SKU-1', type: 'in', quantity: 10 },
          { id: '2', date: '2025-10-20', sku: 'SKU-2', type: 'out', quantity: 4 },
        ]);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const exportExcel = () => {
    const sheet = utils.json_to_sheet(data);
    const book = utils.book_new();
    utils.book_append_sheet(book, sheet, 'Transaksi');
    writeFile(book, 'laporan-transaksi.xlsx');
  };

  const exportPDF = () => {
    const doc = new jsPDF();
    autoTable(doc, {
      head: [['Tanggal', 'SKU', 'Tipe', 'Jumlah']],
      body: data.map((d) => [d.date, d.sku, d.type.toUpperCase(), String(d.quantity)]),
    });
    doc.save('laporan-transaksi.pdf');
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">Laporan</h1>
        <div className="flex gap-2">
          <button onClick={exportExcel} className="rounded-lg border border-slate-200 dark:border-slate-700 px-3 py-2 text-sm">Export Excel</button>
          <button onClick={exportPDF} className="rounded-lg border border-slate-200 dark:border-slate-700 px-3 py-2 text-sm">Export PDF</button>
        </div>
      </div>
      <div className="rounded-xl border border-slate-200 dark:border-slate-800 p-4">
        {loading ? (
          <div className="animate-pulse h-40 w-full rounded bg-slate-100 dark:bg-slate-800/50" />
        ) : (
          <ul className="space-y-2 text-sm">
            {data.map((d) => (
              <li key={d.id} className="flex items-center justify-between">
                <span>{d.date}</span>
                <span>{d.sku}</span>
                <span className={d.type === 'in' ? 'text-emerald-600' : 'text-red-600'}>{d.type.toUpperCase()}</span>
                <span>{d.quantity}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}