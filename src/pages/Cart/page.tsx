import { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../../components/Navbar/page';
import Footer from '../../components/Footer/page';

interface CartItem {
  id: number;
  name: string;
  price: number;
  qty: number;
  img: string;
}

const initialCart: CartItem[] = [
  { id: 3, name: 'Signature Wagyu Burger', price: 28, qty: 1, img: '/images/food_burger.png' },
  { id: 5, name: 'Truffle Carbonara', price: 24, qty: 2, img: '/images/food_pasta.png' },
];

export default function Cart() {
  const [items, setItems] = useState<CartItem[]>(initialCart);

  const updateQty = (id: number, delta: number) => {
    setItems(items.map(item => 
      item.id === id ? { ...item, qty: Math.max(1, item.qty + delta) } : item
    ));
  };

  const removeItem = (id: number) => {
    setItems(items.filter(item => item.id !== id));
  };

  const subtotal = items.reduce((sum, item) => sum + item.price * item.qty, 0);
  const tax = subtotal * 0.1;
  const total = subtotal + tax;

  return (
    <div className="min-h-screen bg-stone-50 dark:bg-stone-950 flex flex-col transition-colors duration-500">
      <Navbar />

      <main className="flex-1 max-w-7xl mx-auto w-full py-16 px-4">
        <div className="text-center mb-16">
          <span className="text-amber-600 font-bold tracking-widest uppercase text-xs">Your Selection</span>
          <h1 className="text-5xl font-serif font-bold text-stone-900 dark:text-stone-100 mt-2">Shopping Cart</h1>
          <div className="w-16 h-1 bg-amber-600 mx-auto rounded-full mt-6"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-6">
            {items.length > 0 ? (
              items.map(item => (
                <div key={item.id} className="bg-white dark:bg-stone-900 rounded-[2rem] p-6 shadow-xl border border-stone-100 dark:border-stone-800 flex flex-col md:flex-row items-center gap-8 group">
                  <div className="w-32 h-32 rounded-2xl overflow-hidden shrink-0">
                    <img src={item.img} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  </div>
                  <div className="flex-1 text-center md:text-left">
                    <h3 className="text-xl font-bold text-stone-900 dark:text-stone-100">{item.name}</h3>
                    <p className="text-amber-600 font-bold mt-1">${item.price.toFixed(2)}</p>
                  </div>
                  <div className="flex items-center gap-4 bg-stone-50 dark:bg-stone-800 p-2 rounded-xl">
                    <button onClick={() => updateQty(item.id, -1)} className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-stone-200 dark:hover:bg-stone-700 text-stone-600 dark:text-stone-400 transition-colors">-</button>
                    <span className="w-8 text-center font-bold dark:text-stone-100">{item.qty}</span>
                    <button onClick={() => updateQty(item.id, 1)} className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-stone-200 dark:hover:bg-stone-700 text-stone-600 dark:text-stone-400 transition-colors">+</button>
                  </div>
                  <div className="text-center md:text-right min-w-[100px]">
                    <p className="text-xl font-bold text-stone-900 dark:text-stone-100">${(item.price * item.qty).toFixed(2)}</p>
                    <button onClick={() => removeItem(item.id)} className="text-red-500 text-sm font-bold hover:underline mt-2">Remove</button>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-20 bg-white rounded-[3rem] border border-dashed border-stone-300">
                <span className="text-6xl block mb-6">🛒</span>
                <h3 className="text-2xl font-bold text-stone-900">Your cart is empty</h3>
                <Link to="/menu" className="inline-block mt-6 px-8 py-3 bg-amber-600 text-white rounded-full font-bold hover:bg-amber-700 transition-all shadow-lg shadow-amber-900/20">Explore Menu</Link>
              </div>
            )}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-stone-900 rounded-[2.5rem] p-10 shadow-2xl border border-stone-100 dark:border-stone-800 sticky top-24">
              <h2 className="text-2xl font-serif font-bold text-stone-900 dark:text-stone-100 mb-8">Order Summary</h2>
              <div className="space-y-4 mb-8">
                <div className="flex justify-between text-stone-600 dark:text-stone-400">
                  <span>Subtotal</span>
                  <span className="font-bold text-stone-900 dark:text-stone-100">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-stone-600 dark:text-stone-400">
                  <span>Tax (10%)</span>
                  <span className="font-bold text-stone-900 dark:text-stone-100">${tax.toFixed(2)}</span>
                </div>
                <div className="h-px bg-stone-100 dark:bg-stone-800 my-4"></div>
                <div className="flex justify-between text-xl font-bold text-stone-900 dark:text-stone-100">
                  <span>Total</span>
                  <span className="text-amber-600">${total.toFixed(2)}</span>
                </div>
              </div>
              <button className="w-full py-5 bg-amber-600 hover:bg-amber-700 text-white rounded-2xl font-bold text-lg shadow-xl shadow-amber-900/20 transition-all transform active:scale-95 mb-4">
                Checkout Now
              </button>
              <p className="text-center text-xs text-stone-400 uppercase tracking-widest font-bold">Secure Payment</p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
