import Navbar from '../../components/Navbar/page';
import Footer from '../../components/Footer/page';

export default function About() {
  const team = [
    { name: 'Marco Rossi', role: 'Executive Chef', bio: '20+ years of experience in Michelin-starred kitchens across Italy.', img: 'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=400&q=80' },
    { name: 'Sofia Moretti', role: 'Sommelier', bio: 'Expert in rare Italian vintages and modern wine pairings.', img: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&q=80' },
    { name: 'Antonio Gallo', role: 'Pastry Chef', bio: 'Master of authentic gelato and traditional Sicilian desserts.', img: 'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=400&q=80' },
    { name: 'Isabella Conti', role: 'General Manager', bio: 'Dedicated to providing an unmatched dining experience.', img: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&q=80' },
  ];

  return (
    <div className="min-h-screen bg-stone-50 transition-colors duration-500">
      <Navbar />

      <header className="py-24 px-4 bg-white border-b border-stone-200 text-center">
        <div className="max-w-4xl mx-auto">
          <span className="text-amber-600 font-semibold tracking-widest uppercase text-sm">Our Legacy</span>
          <h1 className="text-5xl md:text-6xl font-serif font-bold text-stone-900 mt-4 mb-6">About La Bella Cucina</h1>
          <div className="w-24 h-1 bg-amber-600 mx-auto rounded-full mb-8"></div>
          <p className="text-xl text-stone-600 max-w-2xl mx-auto leading-relaxed">
            Founded in 1982, we bring the authentic heart of Italy to your table with every dish we serve.
          </p>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-20 px-4 space-y-32">
        {/* Story Section */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=800&q=80"
              alt="Our Kitchen"
              className="rounded-[3rem] shadow-2xl relative z-10"
            />
            <div className="absolute -top-6 -left-6 w-32 h-32 bg-amber-600/10 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-6 -right-6 w-48 h-48 bg-amber-600/10 rounded-full blur-3xl"></div>
          </div>
          <div className="space-y-6">
            <h2 className="text-4xl font-serif font-bold text-stone-900">Our Story</h2>
            <p className="text-stone-600 leading-relaxed text-lg">
              It started with a simple dream: to share the recipes passed down through generations of the Rossi family. Today, La Bella Cucina stands as a testament to traditional techniques and the power of fresh, seasonal ingredients.
            </p>
            <p className="text-stone-600 leading-relaxed text-lg">
              We source our flour from Naples, our olives from Tuscany, and our passion from the soul of Rome. Every pasta is hand-rolled, every sauce is simmered for hours, and every guest is treated like family.
            </p>
          </div>
        </section>

        {/* Team Section */}
        <section>
          <div className="text-center mb-16">
            <span className="text-amber-600 font-semibold tracking-widest uppercase text-sm">The Experts</span>
            <h2 className="text-4xl font-serif font-bold text-stone-900 mt-3 mb-6">Meet Our Team</h2>
            <div className="w-16 h-1 bg-amber-600 mx-auto rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, i) => (
              <div key={i} className="bg-white rounded-[2.5rem] overflow-hidden border border-stone-100 shadow-xl group hover:-translate-y-2 transition-all duration-500">
                <div className="h-64 overflow-hidden relative">
                  <img
                    src={member.img}
                    alt={member.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-amber-600/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </div>
                <div className="p-8">
                  <h3 className="text-xl font-bold text-stone-900 mb-1 group-hover:text-amber-600 transition-colors">{member.name}</h3>
                  <p className="text-amber-600 font-bold text-sm uppercase tracking-wider mb-4">{member.role}</p>
                  <p className="text-stone-500 text-sm leading-relaxed">
                    {member.bio}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Values */}
        <section className="bg-stone-900 rounded-[4rem] p-12 md:p-20 text-white text-center shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-amber-600/10 rounded-full blur-[100px]"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-amber-600/10 rounded-full blur-[100px]"></div>

          <h2 className="text-4xl font-serif font-bold mb-16 relative z-10">Our Core Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative z-10">
            <div className="space-y-4">
              <span className="text-5xl block">🌿</span>
              <h4 className="text-xl font-bold">Authenticity</h4>
              <p className="text-stone-400">Strictly following traditional recipes and sourcing genuine Italian ingredients.</p>
            </div>
            <div className="space-y-4">
              <span className="text-5xl block">❤️</span>
              <h4 className="text-xl font-bold">Passion</h4>
              <p className="text-stone-400">Every plate is served with love and attention to the smallest details.</p>
            </div>
            <div className="space-y-4">
              <span className="text-5xl block">🤝</span>
              <h4 className="text-xl font-bold">Community</h4>
              <p className="text-stone-400">Creating a warm, welcoming space where everyone feels at home.</p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
