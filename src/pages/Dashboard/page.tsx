import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../../components/Navbar/page';
import Footer from '../../components/Footer/page';

interface StockItem { id: number; name: string; category: string; qty: number; unit: string; price: number; }

const initialStock: StockItem[] = [
  { id:1, name:'Wagyu Beef',       category:'Proteins',  qty:25, unit:'kg',  price:85.00 },
  { id:2, name:'Atlantic Salmon',  category:'Proteins',  qty:18, unit:'kg',  price:42.00 },
  { id:3, name:'Black Truffle',    category:'Produce',   qty:3,  unit:'kg',  price:320.00 },
  { id:4, name:'Tagliatelle Pasta',category:'Dry Goods', qty:7,  unit:'kg',  price:8.50 },
  { id:5, name:'Pecorino Romano',  category:'Dairy',     qty:12, unit:'kg',  price:28.00 },
  { id:6, name:'Truffle Oil',      category:'Spices',    qty:5,  unit:'L',   price:65.00 },
  { id:7, name:'Prosecco (Case)',  category:'Beverages', qty:30, unit:'btl', price:22.00 },
  { id:8, name:'Aged Cheddar',     category:'Dairy',     qty:9,  unit:'kg',  price:18.50 },
  { id:9, name:'Brioche Buns',     category:'Dry Goods', qty:60, unit:'pcs', price:1.20 },
  { id:10,name:'Crème Brûlée Mix', category:'Desserts',  qty:4,  unit:'kg',  price:14.00 },
];

type ModalType = 'view'|'insert'|'update'|'delete'|null;

function getStatus(qty: number) {
  if (qty <= 5)  return <span className="badge badge-red">Low Stock</span>;
  if (qty <= 10) return <span className="badge badge-yellow">Medium</span>;
  return <span className="badge badge-green">In Stock</span>;
}

export default function Dashboard() {
  const [stock, setStock]         = useState<StockItem[]>(initialStock);
  const [modal, setModal]         = useState<ModalType>(null);
  const [search, setSearch]       = useState('');
  const [catFilter, setCatFilter] = useState('all');
  const [clock, setClock]         = useState('');
  const [dateStr, setDateStr]     = useState('');
  const [toast, setToast]         = useState('');
  const [selectedId, setSelectedId] = useState<number|null>(null);
  const [insertForm, setInsertForm] = useState({ name:'', category:'', qty:'', unit:'', price:'' });
  const [updateForm, setUpdateForm] = useState({ qty:'', price:'' });
  const chartsInitRef = useRef(false);

  useEffect(() => {
    const tick = () => {
      const now = new Date();
      setClock(now.toLocaleTimeString('en-US', { hour:'2-digit', minute:'2-digit', second:'2-digit', hour12:true }));
      setDateStr(now.toLocaleDateString('en-US', { weekday:'long', year:'numeric', month:'long', day:'numeric' }));
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
  }, []);

  function initCharts(data: StockItem[]) {
    const W = window as any;
    if (!W.Chart) return;
    const colors = ['#C8860A','#FF6B35','#8B1A1A','#F5E6C8','#D4A853','#9A8060','#4a90d9','#22c55e'];
    const opts = { responsive:true, maintainAspectRatio:false, plugins:{ legend:{ labels:{ color:'#D4A853', font:{ family:'Inter', size:12 } } }, tooltip:{ backgroundColor:'#1C1008', borderColor:'#C8860A', borderWidth:1, titleColor:'#F5E6C8', bodyColor:'#9A8060' } } };
    const catMap: Record<string,number> = {};
    const valMap: Record<string,number> = {};
    data.forEach(s => { catMap[s.category]=(catMap[s.category]||0)+s.qty; valMap[s.category]=(valMap[s.category]||0)+s.qty*s.price; });
    const barEl = document.getElementById('chartBar') as HTMLCanvasElement;
    if (barEl) new W.Chart(barEl, { type:'bar', data:{ labels:Object.keys(catMap), datasets:[{ label:'Units in Stock', data:Object.values(catMap), backgroundColor:colors.map(c=>c+'CC'), borderColor:colors, borderWidth:1.5, borderRadius:6 }] }, options:{ ...opts, scales:{ x:{ ticks:{color:'#9A8060'}, grid:{color:'rgba(255,255,255,0.04)'} }, y:{ ticks:{color:'#9A8060'}, grid:{color:'rgba(255,255,255,0.04)'}, beginAtZero:true } } } });
    const donutEl = document.getElementById('chartDoughnut') as HTMLCanvasElement;
    if (donutEl) new W.Chart(donutEl, { type:'doughnut', data:{ labels:Object.keys(valMap), datasets:[{ data:Object.values(valMap), backgroundColor:colors.map(c=>c+'BB'), borderColor:colors, borderWidth:2, hoverOffset:10 }] }, options:{ ...opts, cutout:'62%', plugins:{...opts.plugins, legend:{...opts.plugins.legend, position:'bottom'}} } });
    const lineEl = document.getElementById('chartLine') as HTMLCanvasElement;
    if (lineEl) new W.Chart(lineEl, { type:'line', data:{ labels:['December','January','February','March','April','May'], datasets:[{ label:'Items Added', data:[18,25,14,30,22,27], borderColor:'#C8860A', backgroundColor:'rgba(200,134,10,0.12)', pointBackgroundColor:'#C8860A', pointRadius:5, fill:true, tension:0.4 },{ label:'Items Removed', data:[8,12,6,15,9,11], borderColor:'#FF6B35', backgroundColor:'rgba(255,107,53,0.08)', pointBackgroundColor:'#FF6B35', pointRadius:5, fill:true, tension:0.4 }] }, options:{ ...opts, scales:{ x:{ticks:{color:'#9A8060'},grid:{color:'rgba(255,255,255,0.04)'}}, y:{ticks:{color:'#9A8060'},grid:{color:'rgba(255,255,255,0.04)'},beginAtZero:true} } } });
  }

  function showToast(msg: string) { setToast(msg); setTimeout(()=>setToast(''), 3500); }

  const filtered = stock.filter(s => {
    const q = search.toLowerCase();
    return (s.name.toLowerCase().includes(q) || s.category.toLowerCase().includes(q)) && (catFilter==='all'||s.category===catFilter);
  });

  const lowItems = stock.filter(s=>s.qty<=10).sort((a,b)=>a.qty-b.qty);
  const totalVal = stock.reduce((sum,s)=>sum+s.qty*s.price,0);

  function handleInsert() {
    const { name, category, qty, unit, price } = insertForm;
    if (!name||!category||!qty||!unit||!price) { showToast('Please fill in all fields.'); return; }
    const newItem: StockItem = { id: Date.now(), name, category, qty:parseFloat(qty), unit, price:parseFloat(price) };
    setStock(prev=>[...prev, newItem]);
    setModal(null); showToast(`✅ "${name}" added to inventory!`);
    setInsertForm({ name:'', category:'', qty:'', unit:'', price:'' });
  }

  function handleUpdate() {
    if (!selectedId) { showToast('Please select an item.'); return; }
    const qty=parseFloat(updateForm.qty), price=parseFloat(updateForm.price);
    if (isNaN(qty)||isNaN(price)) { showToast('Please enter valid values.'); return; }
    setStock(prev=>prev.map(s=>s.id===selectedId?{...s,qty,price}:s));
    const name = stock.find(s=>s.id===selectedId)?.name;
    setModal(null); showToast(`✅ "${name}" updated successfully!`);
  }

  function handleDelete() {
    if (!selectedId) { showToast('Please select an item to delete.'); return; }
    const name = stock.find(s=>s.id===selectedId)?.name;
    setStock(prev=>prev.filter(s=>s.id!==selectedId));
    setModal(null); showToast(`🗑️ "${name}" removed from inventory.`);
  }

  function prefillUpdate(id: number) {
    setSelectedId(id);
    const item = stock.find(s=>s.id===id);
    if (item) setUpdateForm({ qty:String(item.qty), price:String(item.price) });
  }

  function exportCSV() {
    const rows = ['#,Name,Category,Quantity,Unit Price,Total Value,Status'];
    stock.forEach((s,i)=>rows.push(`${i+1},"${s.name}","${s.category}",${s.qty} ${s.unit},$${s.price.toFixed(2)},$${(s.qty*s.price).toFixed(2)},${s.qty<=5?'Low Stock':s.qty<=10?'Medium':'In Stock'}`));
    const blob = new Blob([rows.join('\n')],{type:'text/csv'});
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a'); a.href=url; a.download='stock_report.csv'; a.click();
    URL.revokeObjectURL(url); showToast('📥 CSV exported successfully!');
  }

  return (
    <>
      <Navbar />

      <div className="dash-header">
        <div className="dash-header-inner">
          <div>
            <span className="section-label">Admin Panel</span>
            <h1>Stock Dashboard</h1>
            <p className="dash-subtitle">Monitor inventory, manage stock levels, and keep operations running smoothly.</p>
          </div>
          <div className="dash-header-meta">
            <span className="dash-time" id="dashClock">{clock}</span>
            <span className="dash-date" id="dashDate">{dateStr}</span>
            <span className="badge badge-green" id="dashStatusBadge">● System Online</span>
          </div>
        </div>
      </div>

      {/* KPI STATS */}
      <section className="dash-section">
        <div className="kpi-grid">
          <div className="kpi-card" id="kpiTotalItems">
            <div className="kpi-icon">📦</div>
            <div className="kpi-info"><span className="kpi-value">{stock.length}</span><span className="kpi-label">Total Stock Items</span></div>
            <div className="kpi-trend kpi-up">↑ Updated live</div>
          </div>
          <div className="kpi-card" id="kpiLowStock">
            <div className="kpi-icon">⚠️</div>
            <div className="kpi-info"><span className="kpi-value kpi-warn">{stock.filter(s=>s.qty<=5).length}</span><span className="kpi-label">Low Stock Alerts</span></div>
            <div className="kpi-trend kpi-down">↓ Needs reorder</div>
          </div>
          <div className="kpi-card" id="kpiCategories">
            <div className="kpi-icon">🗂️</div>
            <div className="kpi-info"><span className="kpi-value">{new Set(stock.map(s=>s.category)).size}</span><span className="kpi-label">Categories</span></div>
            <div className="kpi-trend kpi-up">↑ Well organised</div>
          </div>
          <div className="kpi-card" id="kpiStockValue">
            <div className="kpi-icon">💰</div>
            <div className="kpi-info"><span className="kpi-value">${totalVal.toLocaleString('en-US',{maximumFractionDigits:0})}</span><span className="kpi-label">Total Stock Value</span></div>
            <div className="kpi-trend kpi-up">↑ Updated live</div>
          </div>
        </div>
      </section>

      {/* ACTION CARDS */}
      <section className="dash-section">
        <div className="text-center dash-section-title">
          <span className="section-label">Stock Operations</span>
          <h2>Quick Actions</h2>
          <div className="divider"></div>
        </div>
        <div className="action-grid">
          <div className="action-card" id="actionViewStock">
            <div className="action-card-icon action-icon-blue">👁️</div>
            <h3>View All Stock</h3>
            <p>Browse the complete inventory list, filter by category, and inspect individual item details.</p>
            <div className="action-card-footer">
              <button id="btnViewStock" onClick={()=>setModal('view')}>View Inventory →</button>
              <span className="action-badge">{stock.length} items</span>
            </div>
          </div>
          <div className="action-card" id="actionInsertStock">
            <div className="action-card-icon action-icon-green">➕</div>
            <h3>Insert New Stock</h3>
            <p>Add fresh inventory items to the database with name, quantity, category, and unit price.</p>
            <div className="action-card-footer">
              <button id="btnInsertStock" className="btn-green" onClick={()=>setModal('insert')}>Add Item →</button>
              <span className="action-badge">Last added: 2h ago</span>
            </div>
          </div>
          <div className="action-card" id="actionUpdateStock">
            <div className="action-card-icon action-icon-yellow">✏️</div>
            <h3>Update Stock</h3>
            <p>Modify existing stock records — update quantities, prices, or supplier information instantly.</p>
            <div className="action-card-footer">
              <button id="btnUpdateStock" className="btn-yellow" onClick={()=>{ setSelectedId(null); setUpdateForm({qty:'',price:''}); setModal('update'); }}>Edit Records →</button>
              <span className="action-badge">3 pending</span>
            </div>
          </div>
          <div className="action-card" id="actionDeleteStock">
            <div className="action-card-icon action-icon-red">🗑️</div>
            <h3>Delete Stock</h3>
            <p>Remove discontinued or expired inventory entries safely with a confirmation step.</p>
            <div className="action-card-footer">
              <button id="btnDeleteStock" className="btn-red" onClick={()=>{ setSelectedId(null); setModal('delete'); }}>Remove Item →</button>
              <span className="action-badge badge-red">⚠ Irreversible</span>
            </div>
          </div>
        </div>
      </section>

      {/* CHARTS */}
      <section className="dash-section">
        <div className="text-center dash-section-title">
          <span className="section-label">Analytics</span>
          <h2>Graphical Stock Overview</h2>
          <div className="divider"></div>
        </div>
        <div className="charts-grid">
          <div className="chart-card" id="chartBarCard">
            <div className="chart-card-header"><h3>Stock by Category</h3><span className="section-label">Units in inventory</span></div>
            <div className="chart-wrapper"><canvas id="chartBar"></canvas></div>
          </div>
          <div className="chart-card" id="chartDoughnutCard">
            <div className="chart-card-header"><h3>Stock Value Distribution</h3><span className="section-label">By category %</span></div>
            <div className="chart-wrapper"><canvas id="chartDoughnut"></canvas></div>
          </div>
          <div className="chart-card chart-card-wide" id="chartLineCard">
            <div className="chart-card-header"><h3>Monthly Stock Movement</h3><span className="section-label">Items added vs removed — last 6 months</span></div>
            <div className="chart-wrapper chart-wrapper-tall"><canvas id="chartLine"></canvas></div>
          </div>
        </div>
      </section>

      {/* STOCK TABLE */}
      <section className="dash-section">
        <div className="text-center dash-section-title">
          <span className="section-label">Inventory Records</span>
          <h2>Current Stock Table</h2>
          <div className="divider"></div>
        </div>
        <div className="table-controls">
          <input type="text" id="stockSearch" placeholder="🔍  Search by name or category…" value={search} onChange={e=>setSearch(e.target.value)} />
          <div className="select-container">
            <select id="stockCategoryFilter" value={catFilter} onChange={e=>setCatFilter(e.target.value)}>
              <option value="all">All Categories</option>
              <option value="Beverages">Beverages</option><option value="Proteins">Proteins</option>
              <option value="Produce">Produce</option><option value="Dairy">Dairy</option>
              <option value="Dry Goods">Dry Goods</option><option value="Spices">Spices</option>
              <option value="Desserts">Desserts</option>
            </select>
          </div>
          <button id="stockExportBtn" className="btn-outline" onClick={exportCSV}>⬇ Export CSV</button>
        </div>
        <div className="table-container">
          <table id="stockTable">
            <thead><tr><th>#</th><th>Item Name</th><th>Category</th><th>Quantity</th><th>Unit Price</th><th>Total Value</th><th>Status</th><th>Actions</th></tr></thead>
            <tbody>
              {filtered.map((s,i)=>(
                <tr key={s.id}>
                  <td>{i+1}</td><td>{s.name}</td><td>{s.category}</td>
                  <td>{s.qty} {s.unit}</td><td>${s.price.toFixed(2)}</td>
                  <td>${(s.qty*s.price).toFixed(2)}</td><td>{getStatus(s.qty)}</td>
                  <td>
                    <button className="tbl-btn tbl-btn-edit" onClick={()=>{ prefillUpdate(s.id); setModal('update'); }}>✏ Edit</button>
                    <button className="tbl-btn tbl-btn-del" onClick={()=>{ setSelectedId(s.id); setModal('delete'); }}>🗑</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="table-footer-info"><span id="tableRowCount">Showing {filtered.length} of {stock.length} items</span></div>
      </section>

      {/* BOTTOM PANELS */}
      <section className="dash-section">
        <div className="dash-bottom-grid">
          <div className="dash-panel" id="dashQuickLinks">
            <h3>⚡ Quick Links</h3>
            <ul className="quick-links-list">
              <li><Link to="/booking" id="qlBooking">📅 View Today's Reservations</Link></li>
              <li><Link to="/menu" id="qlMenu">🍽 Manage Menu Items</Link></li>
              <li><Link to="/reviews" id="qlReviews">⭐ Moderate Customer Reviews</Link></li>
              <li><Link to="/gallery" id="qlGallery">🖼 Update Photo Gallery</Link></li>
              <li><Link to="/" id="qlHome">🏠 Go to Main Website</Link></li>
              <li><a href="#" id="qlPrintReport" onClick={e=>{e.preventDefault();window.print();}}>🖨 Print Stock Report</a></li>
            </ul>
          </div>
          <div className="dash-panel" id="dashActivityFeed">
            <h3>🕐 Recent Activity</h3>
            <ul className="activity-list" id="activityList">
              {[
                { dot:'dot-green', text:<><strong>Salmon Fillet</strong> restocked (+20 kg)</>, time:'2 hours ago' },
                { dot:'dot-yellow', text:<><strong>Truffle Oil</strong> quantity updated</>, time:'4 hours ago' },
                { dot:'dot-red', text:<><strong>Expired Cream</strong> removed from stock</>, time:'Yesterday' },
                { dot:'dot-green', text:<><strong>Wagyu Beef</strong> new batch added (+15 kg)</>, time:'Yesterday' },
                { dot:'dot-yellow', text:<><strong>Pasta (Tagliatelle)</strong> low stock alert triggered</>, time:'2 days ago' },
                { dot:'dot-green', text:<><strong>Pecorino Romano</strong> added to inventory</>, time:'3 days ago' },
              ].map((a,i)=>(
                <li key={i} className="activity-item">
                  <span className={`activity-dot ${a.dot}`}></span>
                  <div>{a.text}<span className="activity-time">{a.time}</span></div>
                </li>
              ))}
            </ul>
          </div>
          <div className="dash-panel dash-panel-alert" id="dashAlerts">
            <h3>🚨 Low Stock Alerts</h3>
            <ul className="alert-list" id="alertList">
              {lowItems.length ? lowItems.map(s=>(
                <li key={s.id} className="alert-item">
                  <span className="alert-item-name">{s.name}</span>
                  <span className="alert-item-qty">{s.qty} {s.unit} left</span>
                </li>
              )) : <li style={{color:'var(--text-muted-color)',fontSize:'0.85rem'}}>✅ All stock levels are healthy.</li>}
            </ul>
          </div>
        </div>
      </section>

      {/* MODAL */}
      {modal && (
        <div className="modal-overlay open" id="stockModal" onClick={e=>{ if(e.target===e.currentTarget) setModal(null); }}>
          <div className="modal-box" id="stockModalBox">
            <button className="modal-close" id="modalClose" onClick={()=>setModal(null)}>✕</button>
            {modal==='view' && (
              <div id="modalContent">
                <p className="modal-title">👁️ View All Stock</p>
                <p className="modal-sub">Browse current inventory below or use the table search on the dashboard.</p>
                <div><p>Total Items: <strong style={{color:'var(--text-secondary-color)'}}>{stock.length} records loaded</strong></p><p>Use the <strong>Stock Table</strong> section on the dashboard to filter, search, and select individual rows.</p></div>
                <div className="modal-actions"><button style={{background:'transparent',borderColor:'var(--border-primary-color)',color:'var(--brand-primary-color)'}} onClick={()=>setModal(null)}>Close</button><button onClick={()=>setModal(null)}>Go to Table →</button></div>
              </div>
            )}
            {modal==='insert' && (
              <div id="modalContent">
                <p className="modal-title">➕ Insert New Stock Item</p>
                <p className="modal-sub">Fill in the details to add a new inventory record.</p>
                <div className="modal-body">
                  <label htmlFor="mi-name">Item Name</label><input type="text" id="mi-name" value={insertForm.name} onChange={e=>setInsertForm({...insertForm,name:e.target.value})} placeholder="e.g. Pancetta" />
                  <label htmlFor="mi-cat">Category</label>
                  <div className="select-container"><select id="mi-cat" value={insertForm.category} onChange={e=>setInsertForm({...insertForm,category:e.target.value})}>
                    <option value="">Select category</option>
                    <option>Beverages</option><option>Proteins</option><option>Produce</option>
                    <option>Dairy</option><option>Dry Goods</option><option>Spices</option><option>Desserts</option>
                  </select></div>
                  <label htmlFor="mi-qty">Quantity</label><input type="number" id="mi-qty" value={insertForm.qty} onChange={e=>setInsertForm({...insertForm,qty:e.target.value})} placeholder="e.g. 20" min="0" />
                  <label htmlFor="mi-unit">Unit</label><input type="text" id="mi-unit" value={insertForm.unit} onChange={e=>setInsertForm({...insertForm,unit:e.target.value})} placeholder="e.g. kg, L, pcs" />
                  <label htmlFor="mi-price">Unit Price ($)</label><input type="number" id="mi-price" value={insertForm.price} onChange={e=>setInsertForm({...insertForm,price:e.target.value})} placeholder="e.g. 12.50" min="0" step="0.01" />
                </div>
                <div className="modal-actions">
                  <button style={{background:'transparent',borderColor:'var(--border-primary-color)',color:'var(--brand-primary-color)'}} onClick={()=>setModal(null)}>Cancel</button>
                  <button id="mi-submit" className="btn-green" onClick={handleInsert}>Add to Stock ✓</button>
                </div>
              </div>
            )}
            {modal==='update' && (
              <div id="modalContent">
                <p className="modal-title">✏️ Update Stock Record</p>
                <p className="modal-sub">Select an item and modify its details.</p>
                <div className="modal-body">
                  <label htmlFor="mu-id">Select Item</label>
                  <div className="select-container"><select id="mu-id" value={selectedId||''} onChange={e=>prefillUpdate(Number(e.target.value))}>
                    <option value="">— Choose an item —</option>
                    {stock.map(s=><option key={s.id} value={s.id}>{s.name}</option>)}
                  </select></div>
                  <label htmlFor="mu-qty">New Quantity</label><input type="number" id="mu-qty" value={updateForm.qty} onChange={e=>setUpdateForm({...updateForm,qty:e.target.value})} placeholder="Enter new quantity" min="0" />
                  <label htmlFor="mu-price">New Unit Price ($)</label><input type="number" id="mu-price" value={updateForm.price} onChange={e=>setUpdateForm({...updateForm,price:e.target.value})} placeholder="Enter new price" min="0" step="0.01" />
                </div>
                <div className="modal-actions">
                  <button style={{background:'transparent',borderColor:'var(--border-primary-color)',color:'var(--brand-primary-color)'}} onClick={()=>setModal(null)}>Cancel</button>
                  <button className="btn-yellow" onClick={handleUpdate}>Save Changes ✓</button>
                </div>
              </div>
            )}
            {modal==='delete' && (
              <div id="modalContent">
                <p className="modal-title">🗑️ Delete Stock Item</p>
                <p className="modal-sub" style={{color:'#ef4444'}}>⚠️ This action is permanent and cannot be undone.</p>
                <div className="modal-body">
                  <label htmlFor="md-id">Select Item to Remove</label>
                  <div className="select-container"><select id="md-id" value={selectedId||''} onChange={e=>setSelectedId(Number(e.target.value))}>
                    <option value="">— Choose an item —</option>
                    {stock.map(s=><option key={s.id} value={s.id}>{s.name}</option>)}
                  </select></div>
                  <p style={{marginTop:'8px',fontSize:'0.84rem'}}>Please confirm you want to permanently remove this item from the inventory database.</p>
                </div>
                <div className="modal-actions">
                  <button style={{background:'transparent',borderColor:'var(--border-primary-color)',color:'var(--brand-primary-color)'}} onClick={()=>setModal(null)}>Cancel</button>
                  <button className="btn-red" onClick={handleDelete}>Delete Permanently 🗑️</button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {toast && <div className="toast toast-success">{toast}</div>}
      <Footer />
    </>
  );
}
