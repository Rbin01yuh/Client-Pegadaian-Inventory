import { useMemo, useState } from 'react';

export interface Column<T> {
  key: keyof T;
  header: string;
  render?: (row: T) => React.ReactNode;
}

interface Props<T> {
  columns: Column<T>[];
  data: T[];
  pageSize?: number;
  filterKey?: keyof T;
}

export function DataTable<T extends Record<string, any>>({ columns, data, pageSize = 10, filterKey }: Props<T>) {
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState('');

  const filtered = useMemo(() => {
    if (!query || !filterKey) return data;
    return data.filter((row) => String(row[filterKey]).toLowerCase().includes(query.toLowerCase()));
  }, [data, query, filterKey]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const start = (page - 1) * pageSize;
  const rows = filtered.slice(start, start + pageSize);

  return (
    <div className="rounded-xl border border-slate-200 dark:border-slate-800 p-4">
      <div className="mb-3 flex items-center justify-between gap-2">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Filter..."
          className="w-64 rounded-lg border border-slate-300 dark:border-slate-700 bg-transparent px-2 py-1 text-sm outline-none"
        />
        <div className="text-xs text-slate-500">{filtered.length} item</div>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="text-left">
              {columns.map((c) => (
                <th key={String(c.key)} className="border-b border-slate-200 dark:border-slate-800 px-3 py-2 font-medium">
                  {c.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => (
              <tr key={i} className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                {columns.map((c) => (
                  <td key={String(c.key)} className="px-3 py-2">
                    {c.render ? c.render(row) : String(row[c.key])}
                  </td>
                ))}
              </tr>
            ))}
            {rows.length === 0 && (
              <tr>
                <td colSpan={columns.length} className="px-3 py-10 text-center text-slate-500">
                  Tidak ada data
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <div className="mt-3 flex items-center justify-end gap-2">
        <button
          className="rounded-lg border border-slate-200 dark:border-slate-700 px-3 py-1 text-sm disabled:opacity-50"
          onClick={() => setPage((p) => Math.max(1, p - 1))}
          disabled={page <= 1}
        >
          Prev
        </button>
        <div className="text-xs">
          Page {page} / {totalPages}
        </div>
        <button
          className="rounded-lg border border-slate-200 dark:border-slate-700 px-3 py-1 text-sm disabled:opacity-50"
          onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
          disabled={page >= totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
}