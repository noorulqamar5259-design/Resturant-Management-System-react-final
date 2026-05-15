import { useState } from 'react';
import Navbar from '../../components/Navbar/page';
import Footer from '../../components/Footer/page';

type GalleryCategory = 'all' | 'food' | 'ambiance' | 'team';

const galleryItems = [
  { id: 1, src: '/images/food_salmon.png', alt: 'Grilled Salmon', label: 'Atlantic Grilled Salmon', category: 'food' },
  { id: 2, src: '/images/food_burger.png', alt: 'Wagyu Burger', label: 'Signature Wagyu Burger', category: 'food' },
  { id: 3, src: '/images/food_pasta.png', alt: 'Truffle Carbonara', label: 'Truffle Carbonara', category: 'food' },
  { id: 4, src: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=600&q=80', alt: 'Chocolate Lava Cake', label: 'Chocolate Lava Cake', category: 'food' },
  { id: 5, src: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=600&q=80', alt: 'Ribeye Steak', label: 'Dry-Aged Ribeye Steak', category: 'food' },
  { id: 6, src: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=600&q=80', alt: 'Fresh Salad', label: 'Garden Fresh Salad', category: 'food' },
  { id: 7, src: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&q=80', alt: 'Restaurant Interior', label: 'Our Dining Room', category: 'ambiance' },
  { id: 8, src: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600&q=80', alt: 'Elegant Atmosphere', label: 'Evening Ambiance', category: 'ambiance' },
  { id: 9, src: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=600&q=80', alt: 'Bar Area', label: 'The Wine Bar', category: 'ambiance' },
  { id: 10, src: 'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=600&q=80', alt: 'Chef at work', label: 'Chef Marco at Work', category: 'team' },
  { id: 11, src: 'https://images.unsplash.com/photo-1551218808-94e220e084d2?w=600&q=80', alt: 'Kitchen Team', label: 'Our Kitchen Brigade', category: 'team' },
  { id: 12, src: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?w=600&q=80', alt: 'Service Team', label: 'Front of House Team', category: 'team' },
];

export default function Gallery() {
  const [activeFilter, setActiveFilter] = useState<GalleryCategory>('all');
  const [lightboxSrc, setLightboxSrc] = useState('');
  const [lightboxAlt, setLightboxAlt] = useState('');

  const filtered = galleryItems.filter(item =>
    activeFilter === 'all' || item.category === activeFilter
  );

  return (
    <div className="min-h-screen bg-background transition-colors duration-500">
      <Navbar />

      <header className="py-24 px-4 bg-background border-b border-border-dim text-center">
        <div className="max-w-4xl mx-auto">
          <span className="text-amber-600 font-semibold tracking-widest uppercase text-sm">Visual Journey</span>
          <h1 className="text-5xl md:text-6xl font-serif font-bold text-primary mt-4 mb-6">Our Gallery</h1>
          <div className="w-24 h-1 bg-amber-600 mx-auto rounded-full mb-8"></div>
          <p className="text-xl text-secondary max-w-2xl mx-auto leading-relaxed italic">
            "Capturing the artistry, the atmosphere, and the authentic spirit of La Bella Cucina."
          </p>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-16 px-4">
        {/* Filter Tabs */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {(['all', 'food', 'ambiance', 'team'] as GalleryCategory[]).map(cat => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className={`px-8 py-3 rounded-full font-bold transition-all ${
                activeFilter === cat
                  ? 'bg-accent text-white shadow-lg shadow-amber-900/20'
                  : 'bg-background text-secondary border border-border-dim hover:bg-surface'
              }`}
            >
              {cat === 'all' ? 'All Photos' : cat === 'food' ? '🍽️ Food' : cat === 'ambiance' ? '🕯️ Ambiance' : '👨‍🍳 Our Team'}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
          {filtered.map(item => (
            <div
              key={item.id}
              className="relative group overflow-hidden rounded-3xl cursor-zoom-in border border-border-dim break-inside-avoid shadow-lg bg-background"
              onClick={() => { setLightboxSrc(item.src); setLightboxAlt(item.alt); }}
            >
              <img
                src={item.src}
                alt={item.alt}
                className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-8">
                <span className="text-amber-400 text-xs font-bold uppercase tracking-widest mb-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                  {item.category}
                </span>
                <h3 className="text-white text-xl font-serif font-bold transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-75">
                  {item.label}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Lightbox */}
      {lightboxSrc && (
        <div
          className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-sm flex items-center justify-center p-4 md:p-12 animate-fade-in"
          onClick={() => setLightboxSrc('')}
        >
          <button
            className="absolute top-8 right-8 text-white/50 hover:text-white transition-colors p-4 z-[110]"
            onClick={(e) => { e.stopPropagation(); setLightboxSrc(''); }}
          >
            <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
          <div className="relative max-w-5xl w-full h-full flex items-center justify-center">
            <img
              src={lightboxSrc}
              alt={lightboxAlt}
              className="max-w-full max-h-full object-contain rounded-xl shadow-2xl animate-zoom-in"
              onClick={(e) => e.stopPropagation()}
            />
            <p className="absolute bottom-[-40px] text-white text-lg font-serif italic text-center w-full">
              {lightboxAlt}
            </p>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
