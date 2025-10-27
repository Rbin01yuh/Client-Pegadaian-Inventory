export function normalizeString(v: unknown): string {
  return String(v ?? '').trim();
}

export function normalizeOptionalString(v: unknown): string | undefined {
  const s = String(v ?? '').trim();
  return s.length > 0 ? s : undefined;
}

export function normalizeInt(v: unknown, fallback = 0): number {
  const n = typeof v === 'number' ? v : parseInt(String(v ?? ''), 10);
  if (!Number.isFinite(n)) return fallback;
  return Math.max(0, Math.floor(n));
}

export function normalizeMoney(v: unknown, fallback = 0): number {
  const n = typeof v === 'number' ? v : parseFloat(String(v ?? '').replace(/,/g, '.'));
  if (!Number.isFinite(n)) return fallback;
  const num = Math.max(0, n);
  return Math.round(num * 100) / 100; // precision 2
}

export function normalizeProductPayload(input: {
  sku: unknown;
  name: unknown;
  category: unknown;
  stock: unknown;
  supplier_id?: unknown;
  buy_price: unknown;
  sell_price: unknown;
  image_url?: unknown;
}) {
  const supplierId = normalizeInt(input.supplier_id, -1);
  return {
    name: normalizeString(input.name),
    sku: normalizeString(input.sku),
    category: normalizeString(input.category),
    stock: normalizeInt(input.stock, 0),
    supplier_id: supplierId >= 0 ? supplierId : undefined,
    buy_price: normalizeMoney(input.buy_price, 0),
    sell_price: normalizeMoney(input.sell_price, 0),
    image_url: normalizeOptionalString(input.image_url) ?? '',
  };
}

export function normalizeSupplierPayload(input: { name: unknown; contact: unknown; address: unknown }) {
  return {
    name: normalizeString(input.name),
    contact: normalizeString(input.contact),
    address: normalizeString(input.address),
  };
}

export function normalizeTransactionPayload(input: { product_id: unknown; quantity: unknown; type: 'in' | 'out'; date: unknown }) {
  const qty = normalizeInt(input.quantity, 0);
  const type = input.type === 'out' ? 'out' : 'in';
  const product_id = normalizeInt(input.product_id, 0);
  const date = normalizeString(input.date);
  return {
    product_id,
    type,
    quantity: qty,
    date,
  };
}