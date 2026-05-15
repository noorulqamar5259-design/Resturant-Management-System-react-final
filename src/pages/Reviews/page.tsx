import { useState } from 'react';
import Navbar from '../../components/Navbar/page';
import Footer from '../../components/Footer/page';

export default function Reviews() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [rating, setRating] = useState('5');
  const [text, setText] = useState('');
  const [toast, setToast] = useState('');

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name || !text) { setToast('Please fill all fields.'); return; }
    setToast('Review submitted! Thank you.');
    setName(''); setEmail(''); setRating('5'); setText('');
    setTimeout(() => setToast(''), 3500);
  }

  const stats = [
    { icon: '⭐', value: '4.9 / 5', label: 'Overall Rating' },
    { icon: '💬', value: '1,248', label: 'Total Reviews' },
    { icon: '👍', value: '98%', label: 'Would Recommend' },
    { icon: '🔁', value: '87%', label: 'Return Guests' },
  ];

  const featuredReviews = [
    { initials: 'SM', name: 'Sarah Mitchell', context: 'Anniversary Dinner · May 2025', text: '"An absolutely magical evening. The truffle carbonara was out of this world!"' },
    { initials: 'JT', name: 'James Thornton', context: 'Business Dinner · April 2025', text: '"Best ribeye I\'ve ever had. Excellent wine pairing."' },
    { initials: 'ER', name: 'Elena Rossi', context: 'Date Night · April 2025', text: '"Perfect romantic dinner. Salmon and dessert were amazing."' },
  ];

  return (
    <div className="min-h-screen bg-stone-50 transition-colors duration-500">
      <Navbar />

      <header className="py-24 px-4 bg-white border-b border-stone-200 text-center">
        <div className="max-w-4xl mx-auto">
          <span className="text-amber-600 font-semibold tracking-widest uppercase text-sm">What Our Guests Say</span>
          <h1 className="text-5xl md:text-6xl font-serif font-bold text-stone-900 mt-4 mb-6">Guest Reviews</h1>
          <div className="w-24 h-1 bg-amber-600 mx-auto rounded-full mb-8"></div>
          <p className="text-xl text-stone-600 max-w-2xl mx-auto leading-relaxed">
            Real reviews from our wonderful guests. We cherish every visit and every word of feedback.
          </p>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-16 px-4">
        {/* Stats Section */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-24">
          {stats.map((s, i) => (
            <div key={i} className="bg-white p-8 rounded-3xl border border-stone-100 text-center shadow-lg shadow-stone-200/50">
              <span className="text-4xl mb-4 block">{s.icon}</span>
              <h3 className="text-3xl font-serif font-bold text-amber-600">{s.value}</h3>
              <p className="text-stone-500 font-medium">{s.label}</p>
            </div>
          ))}
        </div>

        <div className="text-center mb-16">
          <span className="text-amber-600 font-semibold tracking-widest uppercase text-sm">Testimonials</span>
          <h2 className="text-4xl font-serif font-bold text-stone-900 mt-3 mb-6">Recent Experiences</h2>
          <div className="w-16 h-1 bg-amber-600 mx-auto rounded-full"></div>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-24">
          {featuredReviews.map((r, i) => (
            <div key={i} className="bg-white p-8 rounded-3xl border border-stone-100 shadow-xl hover:-translate-y-2 transition-all duration-300 relative group">
              <div className="absolute -top-4 -left-4 bg-amber-600 text-white p-3 rounded-2xl shadow-lg opacity-0 group-hover:opacity-100 transition-opacity">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M14.017 21L14.017 18C14.017 16.899 14.899 16 16.017 16H19.017V14C19.017 11.243 16.774 9 14.017 9V7C17.876 7 21.017 10.141 21.017 14V21H14.017ZM3.017 21V18C3.017 16.899 3.899 16 5.017 16H8.017V14C8.017 11.243 5.774 9 3.017 9V7C6.876 7 10.017 10.141 10.017 14V21H3.017Z" /></svg>
              </div>
              <div className="flex text-amber-500 mb-6 gap-1">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                ))}
              </div>
              <p className="text-stone-700 italic text-lg leading-relaxed mb-8">
                {r.text}
              </p>
              <div className="flex items-center gap-4 border-t border-stone-100 pt-6">
                <div className="w-12 h-12 bg-amber-100 text-amber-700 rounded-full flex items-center justify-center font-bold text-lg">
                  {r.initials}
                </div>
                <div>
                  <h4 className="font-bold text-stone-900">{r.name}</h4>
                  <p className="text-sm text-stone-500">{r.context}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Review Form */}
        <div className="max-w-3xl mx-auto bg-white p-10 md:p-16 rounded-[3rem] shadow-2xl border border-stone-100 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-amber-600/10 rounded-bl-full"></div>
          <div className="relative z-10 text-center mb-12">
            <span className="text-amber-600 font-semibold tracking-widest uppercase text-sm">Share Your Experience</span>
            <h2 className="text-3xl font-serif font-bold text-stone-900 mt-2">Leave a Review</h2>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-bold text-stone-700 ml-1">Your Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  className="w-full px-6 py-4 rounded-2xl bg-stone-50 border-none focus:ring-2 focus:ring-amber-500 transition-all"
                  placeholder="John Doe"
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-stone-700 ml-1">Email Address (Optional)</label>
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="w-full px-6 py-4 rounded-2xl bg-stone-50 border-none focus:ring-2 focus:ring-amber-500 transition-all"
                  placeholder="john@example.com"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-stone-700 ml-1">Your Rating</label>
              <select
                value={rating}
                onChange={e => setRating(e.target.value)}
                className="w-full px-6 py-4 rounded-2xl bg-stone-50 border-none focus:ring-2 focus:ring-amber-500 transition-all appearance-none cursor-pointer"
              >
                <option value="5">★★★★★ — Excellent</option>
                <option value="4">★★★★☆ — Very Good</option>
                <option value="3">★★★☆☆ — Good</option>
                <option value="2">★★☆☆☆ — Fair</option>
                <option value="1">★☆☆☆☆ — Poor</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-stone-700 ml-1">Your Review</label>
              <textarea
                value={text}
                onChange={e => setText(e.target.value)}
                className="w-full px-6 py-4 rounded-2xl bg-stone-50 border-none focus:ring-2 focus:ring-amber-500 transition-all h-40 resize-none"
                placeholder="How was your visit? Tell us about the food, service, and atmosphere..."
                required
              />
            </div>

            <button
              type="submit"
              className="w-full py-5 bg-amber-600 hover:bg-amber-700 text-white rounded-2xl font-bold text-lg shadow-xl shadow-amber-900/20 transition-all transform active:scale-95"
            >
              Submit Review
            </button>
          </form>
        </div>
      </main>

      {/* Toast Notification */}
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
