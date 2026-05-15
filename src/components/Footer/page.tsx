import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-surface pt-20 pb-10 border-t border-border-dim transition-colors duration-500">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div className="space-y-6">
            <h1 className="text-3xl font-serif font-bold text-accent">🍽️ La Bella Cucina</h1>
            <p className="text-secondary leading-relaxed max-w-xs">
              Fine dining experience crafted with love. Where every meal becomes a cherished memory in our authentic Italian kitchen.
            </p>
            <div className="flex gap-4">
              {['FB', 'TW', 'IG', 'LI'].map(social => (
                <button key={social} className="w-10 h-10 rounded-full bg-background border border-border-dim flex items-center justify-center text-xs font-bold text-primary hover:bg-accent hover:text-white transition-all">
                  {social}
                </button>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-xl font-bold text-primary mb-8 flex items-center gap-2">
              <span className="w-2 h-2 bg-accent rounded-full"></span>
              Quick Links
            </h2>
            <div className="flex flex-col gap-4 text-secondary">
              <Link to="/booking" className="hover:text-accent transition-colors font-bold text-accent/80">Book a Table</Link>
            </div>
          </div>

          <div>
            <h2 className="text-xl font-bold text-primary mb-8 flex items-center gap-2">
              <span className="w-2 h-2 bg-accent rounded-full"></span>
              Opening Hours
            </h2>
            <div className="space-y-4 text-secondary">
              <div className="flex justify-between border-b border-border-dim pb-2">
                <span>Mon - Thu</span>
                <span className="text-primary font-medium">12pm – 10pm</span>
              </div>
              <div className="flex justify-between border-b border-border-dim pb-2">
                <span>Fri - Sat</span>
                <span className="text-primary font-medium">12pm – 11:30pm</span>
              </div>
              <div className="flex justify-between border-b border-border-dim pb-2">
                <span>Sunday</span>
                <span className="text-primary font-medium">1pm – 9pm</span>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-xl font-bold text-primary mb-8 flex items-center gap-2">
              <span className="w-2 h-2 bg-accent rounded-full"></span>
              Contact Us
            </h2>
            <div className="space-y-6 text-secondary">
              <div className="flex gap-4">
                <span className="text-accent text-xl">📍</span>
                <p>42 Gourmet Lane,<br />Culinary District, NY</p>
              </div>
              <div className="flex gap-4">
                <span className="text-accent text-xl">📞</span>
                <p>+1 (555) 867-5309</p>
              </div>
              <div className="flex gap-4">
                <span className="text-accent text-xl">✉️</span>
                <p>hello@labellacucina.com</p>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-border-dim pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-secondary text-sm">
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
