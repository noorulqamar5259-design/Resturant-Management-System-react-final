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
    <>
      <Navbar />

      <div className="gallery-header">
        <span className="section-label">Visual Journey</span>
        <h1>Our Gallery</h1>
        <div className="divider"></div>
        <p className="gallery-header-text">From exquisite plating to our warm dining spaces — a glimpse into the world of La Bella Cucina.</p>
      </div>

      <div className="page gallery-page">
        <div className="filter-tabs" id="galleryFilterTabs">
          {(['all','food','ambiance','team'] as GalleryCategory[]).map(cat => (
            <button key={cat} data-filter={cat} className={activeFilter === cat ? 'active' : ''} onClick={() => setActiveFilter(cat)}>
              {cat === 'all' ? 'All Photos' : cat === 'food' ? '🍽 Food' : cat === 'ambiance' ? '🕯 Ambiance' : '👨‍🍳 Our Team'}
            </button>
          ))}
        </div>

        <div className="gallery-container" id="galleryGrid">
          {filtered.map(item => (
            <div key={item.id} className="gallery-item" data-category={item.category} onClick={() => { setLightboxSrc(item.src); setLightboxAlt(item.alt); }}>
              <img src={item.src} alt={item.alt} />
              <div className="gallery-overlay"><span>{item.label}</span></div>
            </div>
          ))}
        </div>
      </div>

      {lightboxSrc && (
        <div className="lightbox open" id="lightbox" onClick={() => setLightboxSrc('')}>
          <button className="lightbox-close" onClick={() => setLightboxSrc('')}>✕</button>
          <img src={lightboxSrc} alt={lightboxAlt} id="lightboxImg" />
        </div>
      )}

      <Footer />
    </>
  );
}
