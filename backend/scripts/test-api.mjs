import 'dotenv/config';

const baseURL = `http://localhost:${process.env.PORT || 4000}`;

async function request(path, { method = 'GET', token, body } = {}) {
  const headers = { 'Content-Type': 'application/json' };
  if (token) headers['Authorization'] = `Bearer ${token}`;
  const res = await fetch(`${baseURL}${path}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  });
  const text = await res.text();
  let json;
  try { json = JSON.parse(text); } catch { json = { raw: text }; }
  return { status: res.status, data: json };
}

function logResult(name, result) {
  console.log(`\n=== ${name} [${result.status}] ===`);
  console.log(JSON.stringify(result.data, null, 2));
}

async function run() {
  const summary = [];

  // Health
  const health = await request('/health');
  logResult('Health', health);
  summary.push({ name: 'Health', pass: health.status === 200 });

  // Login admin
  const login = await request('/api/auth/login', {
    method: 'POST',
    body: { username: 'admin', password: 'admin123' },
  });
  logResult('Login Admin', login);
  const token = login?.data?.data?.token;
  summary.push({ name: 'Login', pass: !!token });

  // Products
  const products = await request('/api/products', { token });
  logResult('List Products', products);
  summary.push({ name: 'List Products', pass: products.status === 200 });

  const sku = `AUTO-${Date.now()}`;
  const createProduct = await request('/api/products', {
    method: 'POST',
    token,
    body: {
      name: 'Auto Test Product',
      sku,
      category: 'Auto',
      stock: 0,
      buy_price: 10000,
      sell_price: 15000,
      supplier_id: 1,
      image_url: '',
    },
  });
  logResult('Create Product', createProduct);
  const productId = createProduct?.data?.data?.id || createProduct?.data?.data?.product?.id;
  summary.push({ name: 'Create Product', pass: [200,201].includes(createProduct.status) && !!productId });

  // Suppliers
  const suppliers = await request('/api/suppliers', { token });
  logResult('List Suppliers', suppliers);
  summary.push({ name: 'List Suppliers', pass: suppliers.status === 200 });

  // Transactions (if productId exists)
  let trxCreate = { status: 0, data: {} };
  if (productId) {
    const today = new Date().toISOString().slice(0, 10);
    trxCreate = await request('/api/transactions', {
      method: 'POST',
      token,
      body: { product_id: productId, type: 'in', quantity: 2, date: today },
    });
    logResult('Create Transaction', trxCreate);
    summary.push({ name: 'Create Transaction', pass: [200,201].includes(trxCreate.status) });
  } else {
    console.log('\nSkipping transaction create: productId not available');
    summary.push({ name: 'Create Transaction', pass: false });
  }

  const transactions = await request('/api/transactions', { token });
  logResult('List Transactions', transactions);
  summary.push({ name: 'List Transactions', pass: transactions.status === 200 });

  // Dashboard & Reports (admin)
  const dashboard = await request('/api/dashboard/overview', { token });
  logResult('Dashboard Overview', dashboard);
  summary.push({ name: 'Dashboard Overview', pass: dashboard.status === 200 });

  const reports = await request('/api/reports', { token });
  logResult('Reports', reports);
  summary.push({ name: 'Reports', pass: reports.status === 200 });

  console.log('\n===== SUMMARY =====');
  for (const s of summary) {
    console.log(`${s.name}: ${s.pass ? 'PASS' : 'FAIL'}`);
  }
}

run().catch(err => {
  console.error('Test runner error:', err);
  process.exit(1);
});