import { Link, useLocation } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';

export default function Navbar() {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'dark');
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const isActive = (path: string) =>
    location.pathname === path ? 'text-accent font-bold' : 'text-secondary';

  const primaryLinks = [
    { name: 'Home', path: '/' },
    { name: 'Menu', path: '/menu' },
    { name: 'Book', path: '/booking' },
    { name: 'About', path: '/about' },
  ];

  const secondaryLinks = [
    { title: 'Community', links: [
      { name: 'Gallery', path: '/gallery', icon: '🖼️' },
      { name: 'Reviews', path: '/reviews', icon: '⭐' },
    ]},
    { title: 'System', links: [
      { name: 'Profile', path: '/profile', icon: '👤' },
      { name: 'Dashboard', path: '/dashboard', icon: '📊' },
    ]}
  ];

  return (
    <nav className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border-dim transition-colors duration-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Left: Logo */}
          <Link to="/" className="flex items-center gap-2 text-2xl font-serif font-bold text-accent">
            <span className="text-3xl">🍽</span>
            <span className="hidden sm:inline">La Bella Cucina</span>
          </Link>

          {/* Center: Mixed Nav (4 links + Dropdown) */}
          <div className="hidden lg:flex items-center gap-10">
            <ul className="flex gap-8">
              {primaryLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className={`text-sm uppercase tracking-widest transition-colors hover:text-accent font-semibold ${isActive(link.path)}`}
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>

            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center gap-2 text-sm uppercase tracking-widest text-secondary hover:text-accent font-bold transition-all focus:outline-none"
              >
                More 
                <svg className={`w-4 h-4 transition-transform duration-300 ${dropdownOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {dropdownOpen && (
                <div className="absolute right-0 mt-6 w-64 bg-background rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.2)] border border-border-dim py-6 px-2 animate-zoom-in">
                  <div className="space-y-6">
                    {secondaryLinks.map((cat, i) => (
                      <div key={i} className="space-y-2">
                        <h3 className="text-[10px] font-bold text-stone-400 uppercase tracking-widest px-4">{cat.title}</h3>
                        <div className="space-y-1">
                          {cat.links.map((link) => (
                            <Link
                              key={link.path}
                              to={link.path}
                              onClick={() => setDropdownOpen(false)}
                              className={`flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-surface transition-all ${isActive(link.path)}`}
                            >
                              <span className="text-base">{link.icon}</span>
                              <span className="text-sm font-semibold">{link.name}</span>
                            </Link>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right: Actions (Cart, Login, Theme) */}
          <div className="hidden lg:flex items-center gap-3">
            {/* Cart Toggle */}
            <Link 
              to="/cart"
              className="p-3 rounded-2xl bg-surface text-primary hover:ring-2 hover:ring-accent transition-all relative group"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-amber-600 text-white text-[10px] font-bold rounded-full flex items-center justify-center border-2 border-white dark:border-stone-800 opacity-0 group-hover:opacity-100 transition-opacity">0</span>
            </Link>

            {/* Login Button */}
            <Link 
              to="/login" 
              className="bg-accent hover:bg-accent/90 text-white px-7 py-3 rounded-2xl text-sm font-bold shadow-lg shadow-amber-900/20 transition-all active:scale-95 ml-2"
            >
              Login
            </Link>

            {/* Theme Toggle */}
            <button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="p-3 rounded-2xl bg-surface text-primary transition-all hover:ring-2 hover:ring-accent ml-1"
            >
              {theme === 'dark' ? '☀️' : '🌙'}
            </button>
          </div>

          {/* Mobile Buttons */}
          <div className="lg:hidden flex items-center gap-2">
            <Link to="/cart" className="p-2 rounded-xl bg-surface text-primary">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </Link>
            <button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="p-2 rounded-xl bg-surface text-primary"
            >
              {theme === 'dark' ? '☀️' : '🌙'}
            </button>
            <button
              className="p-2 text-secondary"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
              ) : (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="lg:hidden bg-background border-b border-border-dim py-8 px-6 animate-fade-in overflow-y-auto max-h-[85vh]">
          <div className="space-y-8">
            <div className="grid grid-cols-2 gap-4">
              {primaryLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setMenuOpen(false)}
                  className={`flex flex-col items-center justify-center p-6 rounded-3xl bg-surface border border-border-dim ${isActive(link.path)}`}
                >
                  <span className="text-lg font-bold">{link.name}</span>
                </Link>
              ))}
            </div>
            
            {secondaryLinks.map((cat, i) => (
              <div key={i} className="space-y-4">
                <h3 className="text-xs font-bold text-secondary uppercase tracking-widest ml-2">{cat.title}</h3>
                <div className="grid grid-cols-1 gap-2">
                  {cat.links.map((link) => (
                    <Link
                      key={link.path}
                      to={link.path}
                      onClick={() => setMenuOpen(false)}
                      className={`flex items-center gap-4 p-4 rounded-2xl bg-surface ${isActive(link.path)}`}
                    >
                      <span className="text-2xl">{link.icon}</span>
                      <span className="text-lg font-bold">{link.name}</span>
                    </Link>
                  ))}
                </div>
              </div>
            ))}

            <div className="flex flex-col gap-4 pt-4">
              <p className="text-center text-xs text-secondary uppercase font-bold tracking-widest">
                No account? <Link to="/register" onClick={() => setMenuOpen(false)} className="text-accent underline">Register Now</Link>
              </p>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
