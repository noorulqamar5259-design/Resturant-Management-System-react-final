import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../../components/Navbar/page';
import Footer from '../../components/Footer/page';

interface StockItem { id: number; name: string; category: string; qty: number; unit: string; price: number; }

const initialStock: StockItem[] = [
  { id: 1, name: 'Wagyu Beef', category: 'Proteins', qty: 25, unit: 'kg', price: 85.00 },
  { id: 2, name: 'Atlantic Salmon', category: 'Proteins', qty: 18, unit: 'kg', price: 42.00 },
  { id: 3, name: 'Black Truffle', category: 'Produce', qty: 3, unit: 'kg', price: 320.00 },
  { id: 4, name: 'Tagliatelle Pasta', category: 'Dry Goods', qty: 7, unit: 'kg', price: 8.50 },
  { id: 5, name: 'Pecorino Romano', category: 'Dairy', qty: 12, unit: 'kg', price: 28.00 },
  { id: 6, name: 'Truffle Oil', category: 'Spices', qty: 5, unit: 'L', price: 65.00 },
  { id: 7, name: 'Prosecco (Case)', category: 'Beverages', qty: 30, unit: 'btl', price: 22.00 },
  { id: 8, name: 'Aged Cheddar', category: 'Dairy', qty: 9, unit: 'kg', price: 18.50 },
  { id: 9, name: 'Brioche Buns', category: 'Dry Goods', qty: 60, unit: 'pcs', price: 1.20 },
  { id: 10, name: 'Crème Brûlée Mix', category: 'Desserts', qty: 4, unit: 'kg', price: 14.00 },
];

type ModalType = 'view' | 'insert' | 'update' | 'delete' | null;

function getStatus(qty: number) {
  if (qty <= 5) return <span className="px-3 py-1 rounded-full text-xs font-bold bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400 uppercase tracking-wider">Low Stock</span>;
  if (qty <= 10) return <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400 uppercase tracking-wider">Medium</span>;
  return <span className="px-3 py-1 rounded-full text-xs font-bold bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 uppercase tracking-wider">In Stock</span>;
}

export default function Dashboard() {
  const [stock, setStock] = useState<StockItem[]>(initialStock);
  const [modal, setModal] = useState<ModalType>(null);
  const [search, setSearch] = useState('');
  const [catFilter, setCatFilter] = useState('all');
  const [clock, setClock] = useState('');
  const [dateStr, setDateStr] = useState('');
  const [toast, setToast] = useState('');
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [insertForm, setInsertForm] = useState({ name: '', category: '', qty: '', unit: '', price: '' });
  const [updateForm, setUpdateForm] = useState({ qty: '', price: '' });
  const chartsInitRef = useRef(false);

  useEffect(() => {
    const tick = () => {
      const now = new Date();
      setClock(now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true }));
      setDateStr(now.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }));
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    if (chartsInitRef.current) return;
    chartsInitRef.current = true;
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/chart.js@4.4.0/dist/chart.umd.min.js';
    script.onload = () => initCharts(stock);
    document.head.appendChild(script);
  }, [stock]);

  function initCharts(data: StockItem[]) {
    const W = window as any;
    if (!W.Chart) return;
    const colors = ['#d97706', '#ea580c', '#991b1b', '#f5e6c8', '#d4a853', '#9a8060', '#2563eb', '#16a34a'];
    const opts = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { labels: { color: '#9a8060', font: { family: 'Inter', size: 12 } } },
        tooltip: { backgroundColor: '#1c1917', borderColor: '#d97706', borderWidth: 1, titleColor: '#f5e6c8', bodyColor: '#a8a29e' }
      }
    };
    const catMap: Record<string, number> = {};
    const valMap: Record<string, number> = {};
    data.forEach(s => { catMap[s.category] = (catMap[s.category] || 0) + s.qty; valMap[s.category] = (valMap[s.category] || 0) + s.qty * s.price; });

    ['chartBar', 'chartDoughnut', 'chartLine'].forEach(id => {
      const chartInstance = W.Chart.getChart(id);
      if (chartInstance) chartInstance.destroy();
    });

    const barEl = document.getElementById('chartBar') as HTMLCanvasElement;
    if (barEl) new W.Chart(barEl, { type: 'bar', data: { labels: Object.keys(catMap), datasets: [{ label: 'Units in Stock', data: Object.values(catMap), backgroundColor: colors.map(c => c + 'CC'), borderColor: colors, borderWidth: 1.5, borderRadius: 6 }] }, options: { ...opts, scales: { x: { ticks: { color: '#9a8060' }, grid: { color: 'rgba(0,0,0,0.05)' } }, y: { ticks: { color: '#9a8060' }, grid: { color: 'rgba(0,0,0,0.05)' }, beginAtZero: true } } } });
    const donutEl = document.getElementById('chartDoughnut') as HTMLCanvasElement;
    if (donutEl) new W.Chart(donutEl, { type: 'doughnut', data: { labels: Object.keys(valMap), datasets: [{ data: Object.values(valMap), backgroundColor: colors.map(c => c + 'BB'), borderColor: colors, borderWidth: 2, hoverOffset: 10 }] }, options: { ...opts, cutout: '62%', plugins: { ...opts.plugins, legend: { ...opts.plugins.legend, position: 'bottom' } } } });
    const lineEl = document.getElementById('chartLine') as HTMLCanvasElement;
    if (lineEl) new W.Chart(lineEl, { type: 'line', data: { labels: ['Dec', 'Jan', 'Feb', 'Mar', 'Apr', 'May'], datasets: [{ label: 'Added', data: [18, 25, 14, 30, 22, 27], borderColor: '#d97706', backgroundColor: 'rgba(217,119,6,0.1)', pointBackgroundColor: '#d97706', fill: true, tension: 0.4 }, { label: 'Removed', data: [8, 12, 6, 15, 9, 11], borderColor: '#ea580c', backgroundColor: 'rgba(234,88,12,0.05)', pointBackgroundColor: '#ea580c', fill: true, tension: 0.4 }] }, options: { ...opts, scales: { x: { ticks: { color: '#9a8060' }, grid: { color: 'rgba(0,0,0,0.05)' } }, y: { ticks: { color: '#9a8060' }, grid: { color: 'rgba(0,0,0,0.05)' }, beginAtZero: true } } } });
  }

  function showToast(msg: string) { setToast(msg); setTimeout(() => setToast(''), 3500); }

  const filtered = stock.filter(s => {
    const q = search.toLowerCase();
    return (s.name.toLowerCase().includes(q) || s.category.toLowerCase().includes(q)) && (catFilter === 'all' || s.category === catFilter);
  });

  const totalVal = stock.reduce((sum, s) => sum + s.qty * s.price, 0);

  function handleInsert() {
    const { name, category, qty, unit, price } = insertForm;
    if (!name || !category || !qty || !unit || !price) { showToast('Please fill in all fields.'); return; }
    const newItem: StockItem = { id: Date.now(), name, category, qty: parseFloat(qty), unit, price: parseFloat(price) };
    setStock(prev => [...prev, newItem]);
    setModal(null); showToast(`✅ "${name}" added to inventory!`);
    setInsertForm({ name: '', category: '', qty: '', unit: '', price: '' });
  }

  function handleUpdate() {
    if (!selectedId) { showToast('Please select an item.'); return; }
    const qty = parseFloat(updateForm.qty), price = parseFloat(updateForm.price);
    if (isNaN(qty) || isNaN(price)) { showToast('Please enter valid values.'); return; }
    setStock(prev => prev.map(s => s.id === selectedId ? { ...s, qty, price } : s));
    const name = stock.find(s => s.id === selectedId)?.name;
    setModal(null); showToast(`✅ "${name}" updated successfully!`);
  }

  function handleDelete() {
    if (!selectedId) { showToast('Please select an item to delete.'); return; }
    const name = stock.find(s => s.id === selectedId)?.name;
    setStock(prev => prev.filter(s => s.id !== selectedId));
    setModal(null); showToast(`🗑️ "${name}" removed from inventory.`);
  }

  function prefillUpdate(id: number) {
    setSelectedId(id);
    const item = stock.find(s => s.id === id);
    if (item) setUpdateForm({ qty: String(item.qty), price: String(item.price) });
  }

  return (
    <div className="min-h-screen bg-stone-50 transition-colors duration-500">
      <Navbar />

      <header className="py-16 px-4 bg-white border-b border-stone-200">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8 text-center md:text-left">
          <div>
            <span className="text-amber-600 font-bold tracking-widest uppercase text-xs">Admin Panel</span>
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-stone-900 mt-2">Stock Dashboard</h1>
            <p className="text-stone-500 mt-2">Monitor inventory, manage stock levels, and optimize operations.</p>
          </div>
          <div className="flex flex-col items-center md:items-end gap-3">
            <span className="text-3xl font-mono font-bold text-stone-800">{clock}</span>
            <span className="text-sm text-stone-500 font-medium">{dateStr}</span>
            <span className="flex items-center gap-2 px-3 py-1 rounded-full bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 text-xs font-bold uppercase tracking-wider">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span> System Online
            </span>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-12 px-4 space-y-12">
        {/* KPI Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { label: 'Total Items', value: stock.length, icon: '📦', color: 'blue', bg: 'bg-blue-100 dark:bg-blue-900/30', text: 'text-blue-600 dark:text-blue-400' },
            { label: 'Low Stock', value: stock.filter(s => s.qty <= 5).length, icon: '⚠️', color: 'red', bg: 'bg-red-100 dark:bg-red-900/30', text: 'text-red-600 dark:text-red-400' },
            { label: 'Categories', value: new Set(stock.map(s => s.category)).size, icon: '🗂️', color: 'amber', bg: 'bg-amber-100 dark:bg-amber-900/30', text: 'text-amber-600 dark:text-amber-400' },
            { label: 'Stock Value', value: `$${totalVal.toLocaleString()}`, icon: '💰', color: 'green', bg: 'bg-green-100 dark:bg-green-900/30', text: 'text-green-600 dark:text-green-400' },
          ].map((kpi, i) => (
            <div key={i} className="bg-white p-8 rounded-[2rem] shadow-xl border border-stone-100 flex items-center gap-6 hover:scale-105 transition-transform">
              <div className={`w-16 h-16 rounded-2xl ${kpi.bg} flex items-center justify-center text-3xl shadow-lg shadow-black/5`}>{kpi.icon}</div>
              <div>
                <p className="text-sm font-bold text-stone-500 uppercase tracking-wider">{kpi.label}</p>
                <h3 className="text-2xl font-serif font-bold text-stone-900">{kpi.value}</h3>
              </div>
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { title: 'View All Stock', desc: 'Browse full inventory list.', icon: '👁️', color: 'blue', action: () => setModal('view') },
            { title: 'Insert New', desc: 'Add fresh inventory items.', icon: '➕', color: 'green', action: () => setModal('insert') },
            { title: 'Update Stock', desc: 'Modify existing records.', icon: '✏️', color: 'amber', action: () => setModal('update') },
            { title: 'Delete Item', desc: 'Remove entries safely.', icon: '🗑️', color: 'red', action: () => setModal('delete') },
          ].map((act, i) => (
            <button
              key={i}
              onClick={act.action}
              className="bg-white p-8 rounded-[2rem] border border-stone-100 shadow-lg text-left group hover:border-amber-500 transition-all"
            >
              <div className="text-3xl mb-4 grayscale group-hover:grayscale-0 transition-all">{act.icon}</div>
              <h4 className="text-lg font-bold text-stone-900 mb-2">{act.title}</h4>
              <p className="text-sm text-stone-500">{act.desc}</p>
            </button>
          ))}
        </div>

        {/* Analytics Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 bg-white p-8 rounded-[2.5rem] shadow-xl border border-stone-100 h-[450px]">
            <h3 className="text-xl font-bold text-stone-900 mb-6 flex justify-between items-center">
              Monthly Stock Movement <span className="text-xs font-normal text-stone-400">Items added vs removed</span>
            </h3>
            <div className="h-[320px]"><canvas id="chartLine"></canvas></div>
          </div>
          <div className="bg-white p-8 rounded-[2.5rem] shadow-xl border border-stone-100 h-[450px]">
            <h3 className="text-xl font-bold text-stone-900 mb-6">Value Distribution</h3>
            <div className="h-[320px]"><canvas id="chartDoughnut"></canvas></div>
          </div>
        </div>

        {/* Stock Table Section */}
        <div className="bg-white rounded-[2.5rem] shadow-2xl border border-stone-100 overflow-hidden">
          <div className="p-8 border-b border-stone-100 flex flex-col md:flex-row justify-between items-center gap-6">
            <h2 className="text-2xl font-serif font-bold text-stone-900">Inventory Records</h2>
            <div className="flex flex-wrap gap-4 w-full md:w-auto">
              <input
                type="text"
                placeholder="Search inventory..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="flex-1 md:w-64 px-6 py-3 rounded-xl bg-stone-50 border-none focus:ring-2 focus:ring-amber-500"
              />
              <select
                value={catFilter}
                onChange={e => setCatFilter(e.target.value)}
                className="px-6 py-3 rounded-xl bg-stone-50 border-none focus:ring-2 focus:ring-amber-500 appearance-none cursor-pointer"
              >
                <option value="all">All Categories</option>
                {Array.from(new Set(stock.map(s => s.category))).map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-stone-50">
                  <th className="px-8 py-4 text-xs font-bold text-stone-500 uppercase tracking-widest">Item</th>
                  <th className="px-8 py-4 text-xs font-bold text-stone-500 uppercase tracking-widest">Category</th>
                  <th className="px-8 py-4 text-xs font-bold text-stone-500 uppercase tracking-widest">Quantity</th>
                  <th className="px-8 py-4 text-xs font-bold text-stone-500 uppercase tracking-widest">Price</th>
                  <th className="px-8 py-4 text-xs font-bold text-stone-500 uppercase tracking-widest">Value</th>
                  <th className="px-8 py-4 text-xs font-bold text-stone-500 uppercase tracking-widest">Status</th>
                  <th className="px-8 py-4 text-xs font-bold text-stone-500 uppercase tracking-widest">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {filtered.map(s => (
                  <tr key={s.id} className="hover:bg-stone-50 transition-colors">
                    <td className="px-8 py-4 font-bold text-stone-900">{s.name}</td>
                    <td className="px-8 py-4 text-stone-500">{s.category}</td>
                    <td className="px-8 py-4 font-mono text-stone-900">{s.qty} {s.unit}</td>
                    <td className="px-8 py-4 font-mono text-stone-600">${s.price.toFixed(2)}</td>
                    <td className="px-8 py-4 font-mono font-bold text-stone-900">${(s.qty * s.price).toFixed(2)}</td>
                    <td className="px-8 py-4">{getStatus(s.qty)}</td>
                    <td className="px-8 py-4 flex gap-2">
                      <button onClick={() => { prefillUpdate(s.id); setModal('update'); }} className="p-2 text-amber-600 hover:bg-amber-50 rounded-lg transition-colors">✏️</button>
                      <button onClick={() => { setSelectedId(s.id); setModal('delete'); }} className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors">🗑️</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Bottom Activity & Panels */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-[2rem] shadow-xl border border-stone-100">
            <h3 className="text-xl font-bold text-stone-900 mb-6">⚡ Quick Links</h3>
            <ul className="space-y-4">
              <li><Link to="/booking" className="flex items-center gap-3 text-stone-600 hover:text-amber-600 transition-colors"><span>📅</span> Reservations</Link></li>
              <li><Link to="/menu" className="flex items-center gap-3 text-stone-600 hover:text-amber-600 transition-colors"><span>🍽️</span> Menu Manager</Link></li>
              <li><Link to="/reviews" className="flex items-center gap-3 text-stone-600 hover:text-amber-600 transition-colors"><span>⭐</span> Reviews</Link></li>
              <li><Link to="/gallery" className="flex items-center gap-3 text-stone-600 hover:text-amber-600 transition-colors"><span>🖼️</span> Gallery</Link></li>
            </ul>
          </div>
          <div className="bg-white p-8 rounded-[2rem] shadow-xl border border-stone-100 md:col-span-2">
            <h3 className="text-xl font-bold text-stone-900 mb-6">🕐 Recent Activity</h3>
            <div className="space-y-4">
              {[
                { label: 'Salmon Fillet restocked', type: 'green', time: '2h ago', bg: 'bg-green-500 dark:bg-green-400' },
                { label: 'Truffle Oil updated', type: 'amber', time: '4h ago', bg: 'bg-amber-500 dark:bg-amber-400' },
                { label: 'Expired Cream removed', type: 'red', time: 'Yesterday', bg: 'bg-red-500 dark:bg-red-400' },
              ].map((act, i) => (
                <div key={i} className="flex items-center justify-between p-4 bg-stone-50 rounded-2xl">
                  <div className="flex items-center gap-3">
                    <span className={`w-2 h-2 rounded-full ${act.bg}`}></span>
                    <span className="text-sm font-medium text-stone-800">{act.label}</span>
                  </div>
                  <span className="text-xs text-stone-400 font-mono">{act.time}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      {/* Modals */}
      {modal && (
        <div className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4" onClick={() => setModal(null)}>
          <div className="bg-white w-full max-w-lg rounded-[2.5rem] shadow-2xl p-10 md:p-12 relative overflow-hidden animate-zoom-in" onClick={e => e.stopPropagation()}>
            <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/5 rounded-bl-full"></div>
            <button onClick={() => setModal(null)} className="absolute top-8 right-8 text-stone-400 hover:text-stone-600 p-2">✕</button>

            {modal === 'insert' && (
              <div className="space-y-6 relative z-10">
                <h3 className="text-2xl font-serif font-bold text-stone-900">Add New Item</h3>
                <div className="space-y-4">
                  <input type="text" placeholder="Item Name" value={insertForm.name} onChange={e => setInsertForm({ ...insertForm, name: e.target.value })} className="w-full px-6 py-4 rounded-2xl bg-stone-50 border-none focus:ring-2 focus:ring-amber-500" />
                  <select value={insertForm.category} onChange={e => setInsertForm({ ...insertForm, category: e.target.value })} className="w-full px-6 py-4 rounded-2xl bg-stone-50 border-none focus:ring-2 focus:ring-amber-500">
                    <option value="">Select Category</option>
                    <option>Beverages</option><option>Proteins</option><option>Produce</option><option>Dairy</option><option>Dry Goods</option><option>Spices</option><option>Desserts</option>
                  </select>
                  <div className="grid grid-cols-2 gap-4">
                    <input type="number" placeholder="Qty" value={insertForm.qty} onChange={e => setInsertForm({ ...insertForm, qty: e.target.value })} className="px-6 py-4 rounded-2xl bg-stone-50 border-none focus:ring-2 focus:ring-amber-500" />
                    <input type="text" placeholder="Unit (kg, L)" value={insertForm.unit} onChange={e => setInsertForm({ ...insertForm, unit: e.target.value })} className="px-6 py-4 rounded-2xl bg-stone-50 border-none focus:ring-2 focus:ring-amber-500" />
                  </div>
                  <input type="number" placeholder="Price ($)" value={insertForm.price} onChange={e => setInsertForm({ ...insertForm, price: e.target.value })} className="w-full px-6 py-4 rounded-2xl bg-stone-50 border-none focus:ring-2 focus:ring-amber-500" />
                </div>
                <button onClick={handleInsert} className="w-full py-5 bg-green-600 hover:bg-green-700 text-white rounded-2xl font-bold text-lg shadow-xl shadow-green-900/20 transition-all">Add to Stock ✓</button>
              </div>
            )}

            {modal === 'update' && (
              <div className="space-y-6 relative z-10">
                <h3 className="text-2xl font-serif font-bold text-stone-900">Update Record</h3>
                <div className="space-y-4">
                  <select value={selectedId || ''} onChange={e => prefillUpdate(Number(e.target.value))} className="w-full px-6 py-4 rounded-2xl bg-stone-50 border-none focus:ring-2 focus:ring-amber-500">
                    <option value="">Choose item...</option>
                    {stock.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
                  </select>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-stone-400 ml-2">New Quantity</label>
                    <input type="number" value={updateForm.qty} onChange={e => setUpdateForm({ ...updateForm, qty: e.target.value })} className="w-full px-6 py-4 rounded-2xl bg-stone-50 border-none focus:ring-2 focus:ring-amber-500" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-stone-400 ml-2">New Price ($)</label>
                    <input type="number" value={updateForm.price} onChange={e => setUpdateForm({ ...updateForm, price: e.target.value })} className="w-full px-6 py-4 rounded-2xl bg-stone-50 border-none focus:ring-2 focus:ring-amber-500" />
                  </div>
                </div>
                <button onClick={handleUpdate} className="w-full py-5 bg-amber-600 hover:bg-amber-700 text-white rounded-2xl font-bold text-lg shadow-xl shadow-amber-900/20 transition-all">Save Changes ✓</button>
              </div>
            )}

            {modal === 'delete' && (
              <div className="space-y-6 relative z-10">
                <h3 className="text-2xl font-serif font-bold text-stone-900">Delete Item</h3>
                <p className="text-red-500 font-bold">⚠️ Permanent Action</p>
                <select value={selectedId || ''} onChange={e => setSelectedId(Number(e.target.value))} className="w-full px-6 py-4 rounded-2xl bg-stone-50 border-none focus:ring-2 focus:ring-amber-500">
                  <option value="">Choose item...</option>
                  {stock.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
                </select>
                <button onClick={handleDelete} className="w-full py-5 bg-red-600 hover:bg-red-700 text-white rounded-2xl font-bold text-lg shadow-xl shadow-red-900/20 transition-all">Confirm Deletion 🗑️</button>
              </div>
            )}

            {modal === 'view' && (
              <div className="space-y-6 relative z-10 text-center">
                <h3 className="text-2xl font-serif font-bold text-stone-900">Inventory Overview</h3>
                <p className="text-stone-500 leading-relaxed">
                  Total of {stock.length} records are currently loaded in the system. Use the dashboard table to search and filter specific items.
                </p>
                <button onClick={() => setModal(null)} className="w-full py-5 bg-stone-900 text-white rounded-2xl font-bold text-lg transition-all">Dismiss</button>
              </div>
            )}
          </div>
        </div>
      )}

      {toast && (
        <div className="fixed bottom-10 right-10 z-[100] animate-bounce-in">
          <div className="bg-stone-900 text-white px-8 py-4 rounded-2xl shadow-2xl flex items-center gap-3 border border-stone-800">
            <span className="text-xl">✨</span>
            <span className="font-bold">{toast}</span>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
