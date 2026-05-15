import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-stone-50 dark:bg-stone-900 pt-20 pb-10 border-t border-stone-200 dark:border-stone-800 transition-colors duration-500">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div className="space-y-6">
            <h1 className="text-3xl font-serif font-bold text-amber-600 dark:text-amber-500">🍽️ La Bella Cucina</h1>
            <p className="text-stone-500 dark:text-stone-400 leading-relaxed max-w-xs">
              Fine dining experience crafted with love. Where every meal becomes a cherished memory in our authentic Italian kitchen.
            </p>
            <div className="flex gap-4">
              {['FB', 'TW', 'IG', 'LI'].map(social => (
                <button key={social} className="w-10 h-10 rounded-full bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 flex items-center justify-center text-xs font-bold text-stone-900 dark:text-stone-200 hover:bg-amber-600 hover:text-white transition-all">
                  {social}
                </button>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-xl font-bold text-stone-900 dark:text-white mb-8 flex items-center gap-2">
              <span className="w-2 h-2 bg-amber-600 rounded-full"></span>
              Quick Links
            </h2>
            <div className="flex flex-col gap-4 text-stone-500 dark:text-stone-400">
              <Link to="/" className="hover:text-amber-600 dark:hover:text-amber-400 transition-colors">Home</Link>
              <Link to="/about" className="hover:text-amber-600 dark:hover:text-amber-400 transition-colors">About Us</Link>
              <Link to="/menu" className="hover:text-amber-600 dark:hover:text-amber-400 transition-colors">Our Menu</Link>
              <Link to="/gallery" className="hover:text-amber-600 dark:hover:text-amber-400 transition-colors">Gallery</Link>
              <Link to="/reviews" className="hover:text-amber-600 dark:hover:text-amber-400 transition-colors">Reviews</Link>
              <Link to="/booking" className="hover:text-amber-600 dark:hover:text-amber-400 transition-colors font-bold text-amber-600/80">Book a Table</Link>
            </div>
          </div>

          <div>
            <h2 className="text-xl font-bold text-stone-900 dark:text-white mb-8 flex items-center gap-2">
              <span className="w-2 h-2 bg-amber-600 rounded-full"></span>
              Opening Hours
            </h2>
            <div className="space-y-4 text-stone-500 dark:text-stone-400">
              <div className="flex justify-between border-b border-stone-100 dark:border-stone-800 pb-2">
                <span>Mon - Thu</span>
                <span className="text-stone-900 dark:text-stone-200 font-medium">12pm – 10pm</span>
              </div>
              <div className="flex justify-between border-b border-stone-100 dark:border-stone-800 pb-2">
                <span>Fri - Sat</span>
                <span className="text-stone-900 dark:text-stone-200 font-medium">12pm – 11:30pm</span>
              </div>
              <div className="flex justify-between border-b border-stone-100 dark:border-stone-800 pb-2">
                <span>Sunday</span>
                <span className="text-stone-900 dark:text-stone-200 font-medium">1pm – 9pm</span>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-xl font-bold text-stone-900 dark:text-white mb-8 flex items-center gap-2">
              <span className="w-2 h-2 bg-amber-600 rounded-full"></span>
              Contact Us
            </h2>
            <div className="space-y-6 text-stone-500 dark:text-stone-400">
              <div className="flex gap-4">
                <span className="text-amber-600 dark:text-amber-500 text-xl">📍</span>
                <p>42 Gourmet Lane,<br />Culinary District, NY</p>
              </div>
              <div className="flex gap-4">
                <span className="text-amber-600 dark:text-amber-500 text-xl">📞</span>
                <p>+1 (555) 867-5309</p>
              </div>
              <div className="flex gap-4">
                <span className="text-amber-600 dark:text-amber-500 text-xl">✉️</span>
                <p>hello@labellacucina.com</p>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-stone-200 dark:border-stone-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-stone-400 text-sm">
          <p>© 2025 La Bella Cucina. All rights reserved.</p>
          <div className="flex gap-8">
            <a href="#" className="hover:text-stone-600 dark:hover:text-stone-300">Privacy Policy</a>
            <a href="#" className="hover:text-stone-600 dark:hover:text-stone-300">Terms of Service</a>
            <a href="#" className="hover:text-stone-600 dark:hover:text-stone-300">Sitemap</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
