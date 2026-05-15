import { useState } from 'react';
import Navbar from '../../components/Navbar/page';
import Footer from '../../components/Footer/page';

type Category = 'all' | 'starters' | 'mains' | 'pasta' | 'seafood' | 'desserts' | 'drinks';

const menuItems = [
  { id: 1, name: 'Classic Bruschetta', desc: 'Grilled sourdough topped with vine tomatoes, basil, garlic oil and balsamic.', price: '$12', category: 'starters' as Category, img: 'https://images.unsplash.com/photo-1541014741259-de529411b96a?w=400&q=80', badge: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400', badgeText: 'Vegetarian' },
  { id: 2, name: 'French Onion Soup', desc: 'Slow caramelized onions in rich broth with gruyère toast.', price: '$14', category: 'starters' as Category, img: 'https://images.unsplash.com/photo-1565299507177-b0ac66763828?w=400&q=80', badge: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400', badgeText: "Chef's Pick" },
  { id: 3, name: 'Signature Wagyu Burger', desc: 'Premium wagyu beef, cheddar, truffle aioli, brioche bun, fries.', price: '$28', category: 'mains' as Category, img: '/images/food_burger.png', badge: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400', badgeText: 'Popular' },
  { id: 4, name: 'Ribeye Steak', desc: '12oz dry-aged ribeye, herb butter, garlic mash, vegetables.', price: '$52', category: 'mains' as Category, img: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=400&q=80', badge: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400', badgeText: 'Signature' },
  { id: 5, name: 'Truffle Carbonara', desc: 'Tagliatelle, pancetta, egg yolk, pecorino, black truffle.', price: '$24', category: 'pasta' as Category, img: '/images/food_pasta.png', badge: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400', badgeText: "Chef's Pick" },
  { id: 6, name: 'Atlantic Grilled Salmon', desc: 'Lemon butter sauce, asparagus, capers.', price: '$36', category: 'seafood' as Category, img: '/images/food_salmon.png', badge: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400', badgeText: 'Gluten Free' },
  { id: 7, name: 'Chocolate Lava Cake', desc: 'Molten chocolate center, vanilla ice cream.', price: '$14', category: 'desserts' as Category, img: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=400&q=80', badge: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400', badgeText: 'Must Try' },
  { id: 8, name: 'Signature Cocktails', desc: 'Crafted by expert mixologists.', price: 'From $14', category: 'drinks' as Category, img: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=400&q=80', badge: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400', badgeText: 'Bar Menu' },
];

export default function Menu() {
  const [activeFilter, setActiveFilter] = useState<Category>('all');

  const filtered = menuItems.filter(item =>
    activeFilter === 'all' || item.category === activeFilter
  );

  const categories: { id: Category; label: string; icon: string }[] = [
    { id: 'all', label: 'All', icon: '🍽️' },
    { id: 'starters', label: 'Starters', icon: '🥗' },
    { id: 'mains', label: 'Mains', icon: '🥩' },
    { id: 'pasta', label: 'Pasta', icon: '🍝' },
    { id: 'seafood', label: 'Seafood', icon: '🐟' },
    { id: 'desserts', label: 'Desserts', icon: '🍰' },
    { id: 'drinks', label: 'Drinks', icon: '🍷' },
  ];

  return (
    <div className="min-h-screen bg-stone-50 dark:bg-stone-950 transition-colors duration-500">
      <Navbar />

      <header className="py-20 px-4 bg-white dark:bg-stone-900 border-b border-stone-200 dark:border-stone-800 text-center">
        <div className="max-w-4xl mx-auto">
          <span className="text-amber-600 font-semibold tracking-widest uppercase text-sm">Discover the Taste</span>
          <h1 className="text-5xl md:text-6xl font-serif font-bold text-stone-900 dark:text-stone-100 mt-4 mb-6">Our Menu</h1>
          <div className="w-24 h-1 bg-amber-600 mx-auto rounded-full mb-8"></div>
          <p className="text-xl text-stone-600 dark:text-stone-400 max-w-2xl mx-auto leading-relaxed italic">
            "Every dish is crafted fresh daily using the finest seasonal ingredients."
          </p>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-16 px-4">
        {/* Filter Bar */}
        <div className="flex flex-wrap justify-center gap-4 mb-16">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveFilter(cat.id)}
              className={`flex items-center gap-2 px-6 py-3 rounded-full font-bold transition-all ${
                activeFilter === cat.id
                  ? 'bg-amber-600 text-white shadow-lg shadow-amber-900/20 scale-105'
                  : 'bg-white dark:bg-stone-900 text-stone-600 dark:text-stone-400 hover:bg-stone-100 dark:hover:bg-stone-800 border border-stone-200 dark:border-stone-800'
              }`}
            >
              <span>{cat.icon}</span>
              {cat.label}
            </button>
          ))}
        </div>

        {/* Menu Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filtered.map((item) => (
            <div
              key={item.id}
              className="bg-white dark:bg-stone-900 rounded-3xl overflow-hidden border border-stone-100 dark:border-stone-800 group hover:shadow-2xl transition-all duration-500 flex flex-col"
            >
              <div className="h-56 overflow-hidden relative">
                <img
                  src={item.img}
                  alt={item.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute top-4 right-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${item.badge}`}>
                    {item.badgeText}
                  </span>
                </div>
              </div>
              <div className="p-6 flex-1 flex flex-col">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-xl font-bold text-stone-900 dark:text-stone-100 leading-tight group-hover:text-amber-600 transition-colors">
                    {item.name}
                  </h3>
                  <span className="text-amber-600 font-bold text-lg">{item.price}</span>
                </div>
                <p className="text-stone-600 dark:text-stone-400 text-sm leading-relaxed flex-1">
                  {item.desc}
                </p>
                <button className="mt-6 w-full py-3 bg-stone-50 dark:bg-stone-800 hover:bg-amber-600 hover:text-white text-stone-600 dark:text-stone-300 rounded-xl font-bold text-sm transition-all border border-stone-200 dark:border-stone-700">
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-20">
            <span className="text-6xl block mb-6">🏜️</span>
            <h3 className="text-2xl font-bold text-stone-900">No items found in this category</h3>
            <p className="text-stone-600 mt-2">Try selecting another category or check back later.</p>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
