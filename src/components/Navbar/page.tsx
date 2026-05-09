import { Link, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';

export default function Navbar() {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'dark');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const isActive = (path: string) =>
    location.pathname === path ? 'active' : '';

  return (
    <nav id="mainNav">
      <Link to="/" id="navLogo">🍽 La Bella Cucina</Link>

      <button className="menu-toggle" id="menuToggle" onClick={() => setMenuOpen(!menuOpen)}>
        <span></span><span></span><span></span>
      </button>

      <ul id="navMenu" className={menuOpen ? 'open' : ''}>
        <li><Link to="/" className={isActive('/')}>Home</Link></li>
        <li><Link to="/menu" className={isActive('/menu')}>Menu</Link></li>
        <li><Link to="/gallery" className={isActive('/gallery')}>Gallery</Link></li>
        <li><Link to="/reviews" className={isActive('/reviews')}>Reviews</Link></li>
        <li><Link to="/booking" className={isActive('/booking')}>Book a Table</Link></li>
        <li><Link to="/dashboard" className={isActive('/dashboard')}>Dashboard</Link></li>
      </ul>

      <button id="darkModeToggle" onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
        {theme === 'dark' ? '☀️' : '🌙'}
      </button>
    </nav>
  );
}
