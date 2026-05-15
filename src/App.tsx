import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Navbar from './components/Navbar/page';
import Footer from './components/Footer/page';
import Menu      from './pages/Menu/page';
import Gallery   from './pages/Gallery/page';
import Reviews   from './pages/Reviews/page';
import Booking   from './pages/Booking/page';
import Dashboard from './pages/Dashboard/page';
import Login     from './pages/Login/page';
import Register  from './pages/Register/page';
import Cart      from './pages/Cart/page';
import Profile   from './pages/Profile/page';
import About     from './pages/About/page';

function Home() {
  return (
    <div className="min-h-screen bg-stone-50 transition-colors duration-500">
      <Navbar />

      {/* Hero Section */}
      <section className="relative h-[90vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1600&q=80"
            alt="Hero Background"
            className="w-full h-full object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-stone-900/40 to-stone-50 transition-colors duration-500"></div>
        </div>

        <div className="relative z-10 text-center px-4 max-w-4xl">
          <span className="inline-block text-amber-600 font-semibold tracking-[0.2em] uppercase mb-4 animate-fade-in">
            Welcome to La Bella Cucina
          </span>
          <h1 className="text-5xl md:text-7xl font-serif font-bold text-stone-900 mb-6 leading-tight">
            Where Every Bite <br /> <span className="text-amber-600 italic">Tells a Story</span>
          </h1>
          <p className="text-lg md:text-xl text-stone-600 mb-10 max-w-2xl mx-auto leading-relaxed">
            Award-winning fine dining crafted with passion, tradition, and the finest seasonal ingredients.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              to="/booking"
              className="px-8 py-4 bg-amber-600 hover:bg-amber-700 text-white rounded-full font-bold text-lg transition-all transform hover:scale-105 shadow-xl shadow-amber-900/20"
            >
              Reserve a Table
            </Link>
            <Link
              to="/menu"
              className="px-8 py-4 bg-transparent border-2 border-amber-600 text-amber-600 rounded-full font-bold text-lg hover:bg-amber-600 hover:text-white transition-all"
            >
              Explore Menu
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 px-4 bg-white transition-colors">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-amber-600 font-semibold tracking-widest uppercase text-sm">Why Choose Us</span>
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-stone-900 mt-3 mb-6">A Dining Experience Like No Other</h2>
            <div className="w-24 h-1 bg-amber-600 mx-auto rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: '👨‍🍳', title: 'Master Chefs', desc: 'Our Michelin-starred chefs bring decades of expertise to every plate.' },
              { icon: '🌿', title: 'Fresh Ingredients', desc: 'We source only locally-grown, seasonal produce and premium imported delicacies.' },
              { icon: '🍷', title: 'Fine Wine Selection', desc: 'Curated cellar of over 200 wines, perfectly paired with our seasonal menu.' },
              { icon: '🕯️', title: 'Elegant Ambiance', desc: 'Warm candlelit tables, live piano music — romance woven into every detail.' },
            ].map((feat, i) => (
              <div key={i} className="p-8 bg-stone-50 rounded-3xl border border-stone-100 hover:border-amber-500 transition-all group">
                <span className="text-5xl mb-6 block group-hover:scale-110 transition-transform">{feat.icon}</span>
                <h3 className="text-xl font-bold text-stone-900 mb-3">{feat.title}</h3>
                <p className="text-stone-600 leading-relaxed">{feat.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Dishes */}
      <section className="py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-amber-600 font-semibold tracking-widest uppercase text-sm">Chef's Picks</span>
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-stone-900 mt-3 mb-6">Featured Dishes</h2>
            <div className="w-24 h-1 bg-amber-600 mx-auto rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
              { id: 1, name: 'Signature Wagyu Burger', price: '$28', desc: 'Premium wagyu beef, aged cheddar, truffle aioli on a toasted brioche bun.', img: '/images/food_burger.png' },
              { id: 2, name: 'Atlantic Grilled Salmon', price: '$36', desc: 'Pan-seared salmon, lemon butter sauce, asparagus and caperberry garnish.', img: '/images/food_salmon.png' },
              { id: 3, name: 'Truffle Carbonara', price: '$24', desc: 'Handmade tagliatelle, smoked pancetta, egg yolk, aged pecorino, black truffle.', img: '/images/food_pasta.png' },
            ].map((dish) => (
              <div key={dish.id} className="bg-white rounded-3xl overflow-hidden shadow-xl shadow-stone-200 group hover:-translate-y-2 transition-all">
                <div className="h-64 overflow-hidden relative">
                  <img src={dish.img} alt={dish.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-4 py-1 rounded-full font-bold text-amber-600">
                    {dish.price}
                  </div>
                </div>
                <div className="p-8">
                  <h3 className="text-2xl font-serif font-bold text-stone-900 mb-3">{dish.name}</h3>
                  <p className="text-stone-600 mb-6">{dish.desc}</p>
                  <Link to="/menu" className="text-amber-600 font-bold flex items-center gap-2 group-hover:gap-3 transition-all">
                    View Menu <span>→</span>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-24 px-4 bg-amber-50">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16">
          <div className="flex-1">
            <span className="text-amber-600 font-semibold tracking-widest uppercase text-sm">Our Story</span>
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-stone-900 mt-3 mb-8 leading-tight">
              Passion on Every Plate <br /> Since 1998
            </h2>
            <div className="w-20 h-1.5 bg-amber-600 mb-8 rounded-full"></div>
            <p className="text-lg text-stone-600 mb-6 leading-relaxed">
              La Bella Cucina was born from a dream — to bring the soulful flavors of Italian and Mediterranean cuisine to life in an unforgettable setting.
            </p>
            <p className="text-lg text-stone-600 mb-10 leading-relaxed">
              Our kitchen team sources ingredients daily from local farms and artisan suppliers. Every dish is a tribute to the traditions we hold dear.
            </p>
            <Link
              to="/booking"
              className="inline-block px-10 py-4 bg-stone-900 text-white rounded-full font-bold transition-all hover:bg-stone-800 shadow-lg"
            >
              Reserve Your Table
            </Link>
          </div>
          <div className="flex-1 relative">
            <div className="absolute -inset-4 border-2 border-amber-600 rounded-3xl translate-x-4 translate-y-4 -z-10 hidden md:block"></div>
            <img
              src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&q=80"
              alt="Restaurant Interior"
              className="rounded-3xl shadow-2xl w-full h-[500px] object-cover"
            />
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/"          element={<Home />} />
        <Route path="/menu"      element={<Menu />} />
        <Route path="/gallery"   element={<Gallery />} />
        <Route path="/reviews"   element={<Reviews />} />
        <Route path="/booking"   element={<Booking />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/login"     element={<Login />} />
        <Route path="/register"  element={<Register />} />
        <Route path="/cart"      element={<Cart />} />
        <Route path="/profile"   element={<Profile />} />
        <Route path="/about"     element={<About />} />
      </Routes>
    </BrowserRouter>
  );
}
