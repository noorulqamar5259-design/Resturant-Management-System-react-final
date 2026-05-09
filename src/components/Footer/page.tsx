import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer id="mainFooter">
      <div className="footer-container">
        <div>
          <h1>🍽 La Bella Cucina</h1>
          <p>Fine dining experience crafted with love. Where every meal becomes a cherished memory.</p>
        </div>
        <div>
          <h2>Quick Links</h2>
          <Link to="/">Home</Link>
          <Link to="/menu">Our Menu</Link>
          <Link to="/gallery">Gallery</Link>
          <Link to="/reviews">Reviews</Link>
          <Link to="/booking">Book a Table</Link>
          <Link to="/dashboard">Dashboard</Link>
        </div>
        <div>
          <h2>Opening Hours</h2>
          <p>Monday – Thursday: 12pm – 10pm</p>
          <p>Friday – Saturday: 12pm – 11:30pm</p>
          <p>Sunday: 1pm – 9pm</p>
        </div>
        <div>
          <h2>Contact</h2>
          <p>📍 42 Gourmet Lane, Culinary District</p>
          <p>📞 +1 (555) 867-5309</p>
          <p>✉️ hello@labellacucina.com</p>
        </div>
      </div>
      <div className="footer-bottom">
        <p>© 2025 La Bella Cucina. All rights reserved.</p>
      </div>
    </footer>
  );
}
