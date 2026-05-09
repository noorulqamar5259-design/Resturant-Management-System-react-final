import { useState } from 'react';
import Navbar from '../../components/Navbar/page';
import Footer from '../../components/Footer/page';

type Category = 'all' | 'starters' | 'mains' | 'pasta' | 'seafood' | 'desserts' | 'drinks';

const menuItems = [
  { id: 1, name: 'Classic Bruschetta', desc: 'Grilled sourdough topped with vine tomatoes, basil, garlic oil and balsamic.', price: '$12', category: 'starters' as Category, img: 'https://images.unsplash.com/photo-1541014741259-de529411b96a?w=400&q=80', badge: 'badge-green', badgeText: 'Vegetarian' },
  { id: 2, name: 'French Onion Soup', desc: 'Slow caramelized onions in rich broth with gruyère toast.', price: '$14', category: 'starters' as Category, img: 'https://images.unsplash.com/photo-1565299507177-b0ac66763828?w=400&q=80', badge: 'badge-yellow', badgeText: "Chef's Pick" },
  { id: 3, name: 'Signature Wagyu Burger', desc: 'Premium wagyu beef, cheddar, truffle aioli, brioche bun, fries.', price: '$28', category: 'mains' as Category, img: '/images/food_burger.png', badge: 'badge-yellow', badgeText: 'Popular' },
  { id: 4, name: 'Ribeye Steak', desc: '12oz dry-aged ribeye, herb butter, garlic mash, vegetables.', price: '$52', category: 'mains' as Category, img: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=400&q=80', badge: 'badge-red', badgeText: 'Signature' },
  { id: 5, name: 'Truffle Carbonara', desc: 'Tagliatelle, pancetta, egg yolk, pecorino, black truffle.', price: '$24', category: 'pasta' as Category, img: '/images/food_pasta.png', badge: 'badge-yellow', badgeText: "Chef's Pick" },
  { id: 6, name: 'Atlantic Grilled Salmon', desc: 'Lemon butter sauce, asparagus, capers.', price: '$36', category: 'seafood' as Category, img: '/images/food_salmon.png', badge: 'badge-green', badgeText: 'Gluten Free' },
  { id: 7, name: 'Chocolate Lava Cake', desc: 'Molten chocolate center, vanilla ice cream.', price: '$14', category: 'desserts' as Category, img: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=400&q=80', badge: 'badge-red', badgeText: 'Must Try' },
  { id: 8, name: 'Signature Cocktails', desc: 'Crafted by expert mixologists.', price: 'From $14', category: 'drinks' as Category, img: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=400&q=80', badge: 'badge-green', badgeText: 'Bar Menu' },
];

export default function Menu() {
  const [activeFilter, setActiveFilter] = useState<Category>('all');

  const filtered = menuItems.filter(item =>
    activeFilter === 'all' || item.category === activeFilter
  );

  return (
    <>
      <Navbar />

      <div className="menu-header">
        <span className="section-label">Discover the Taste</span>
        <h1>Our Menu</h1>
        <div className="divider"></div>
        <p className="menu-header-text">Every dish is crafted fresh daily using the finest seasonal ingredients.</p>
      </div>

      <div className="page menu-page">
        <div className="filter-tabs" id="menuFilterTabs">
          {(['all','starters','mains','pasta','seafood','desserts','drinks'] as Category[]).map(cat => (
            <button key={cat} data-filter={cat} className={activeFilter === cat ? 'active' : ''} onClick={() => setActiveFilter(cat)}>
              {cat === 'all' ? 'All' : cat === 'starters' ? '🥗 Starters' : cat === 'mains' ? '🍽 Mains' : cat === 'pasta' ? '🍝 Pasta' : cat === 'seafood' ? '🐟 Seafood' : cat === 'desserts' ? '🍰 Desserts' : '🍷 Drinks'}
            </button>
          ))}
        </div>

        <div className="card-container" id="menuGrid">
          {filtered.map(item => (
            <div key={item.id} className="card menu-card" data-category={item.category}>
              <img src={item.img} alt={item.name} />
              <div className="card-body">
                <h3>{item.name}</h3>
                <p>{item.desc}</p>
              </div>
              <div className="card-footer">
                <span className="price">{item.price}</span>
                <span className={`badge ${item.badge}`}>{item.badgeText}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </>
  );
}
