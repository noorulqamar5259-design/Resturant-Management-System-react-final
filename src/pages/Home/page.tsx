import { Link } from 'react-router-dom';
import Navbar from '../../components/Navbar/page';
import Footer from '../../components/Footer/page';

export default function Home() {
  return (
    <>
      <Navbar />

      <section className="hero" id="hero">
        <div className="hero-content">
          <span className="section-label">Welcome to La Bella Cucina</span>
          <h1>Where Every Bite Tells a Story</h1>
          <p>Award-winning fine dining crafted with passion, tradition, and the finest seasonal ingredients.</p>
          <div className="hero-buttons">
            <Link to="/booking"><button id="heroBookBtn">Reserve a Table</button></Link>
            <Link to="/menu" className="link-button" id="heroMenuLink">Explore Menu</Link>
          </div>
        </div>
      </section>

      <section className="page" id="features">
        <div className="text-center">
          <span className="section-label">Why Choose Us</span>
          <h2>A Dining Experience Like No Other</h2>
          <div className="divider"></div>
        </div>
        <div className="features-section">
          <div className="feature-item" id="feat1">
            <span className="feature-icon">👨‍🍳</span>
            <h3>Master Chefs</h3>
            <p>Our Michelin-starred chefs bring decades of expertise to every plate.</p>
          </div>
          <div className="feature-item" id="feat2">
            <span className="feature-icon">🌿</span>
            <h3>Fresh Ingredients</h3>
            <p>We source only locally-grown, seasonal produce and premium imported delicacies.</p>
          </div>
          <div className="feature-item" id="feat3">
            <span className="feature-icon">🍷</span>
            <h3>Fine Wine Selection</h3>
            <p>Curated cellar of over 200 wines, perfectly paired with our seasonal menu.</p>
          </div>
          <div className="feature-item" id="feat4">
            <span className="feature-icon">🕯️</span>
            <h3>Elegant Ambiance</h3>
            <p>Warm candlelit tables, live piano music — romance woven into every detail.</p>
          </div>
        </div>
      </section>

      <section className="page" id="featuredDishes">
        <div className="text-center">
          <span className="section-label">Chef's Picks</span>
          <h2>Featured Dishes</h2>
          <div className="divider"></div>
        </div>
        <div className="card-container">
          <div className="card" id="dishCard1">
            <img src="/images/food_burger.png" alt="Gourmet Burger" />
            <div className="card-body">
              <h3>Signature Wagyu Burger</h3>
              <p>Premium wagyu beef, aged cheddar, truffle aioli on a toasted brioche bun.</p>
            </div>
            <div className="card-footer">
              <span className="price">$28</span>
              <Link to="/menu" id="dishLink1">View Menu →</Link>
            </div>
          </div>
          <div className="card" id="dishCard2">
            <img src="/images/food_salmon.png" alt="Grilled Salmon" />
            <div className="card-body">
              <h3>Atlantic Grilled Salmon</h3>
              <p>Pan-seared salmon, lemon butter sauce, asparagus and caperberry garnish.</p>
            </div>
            <div className="card-footer">
              <span className="price">$36</span>
              <Link to="/menu" id="dishLink2">View Menu →</Link>
            </div>
          </div>
          <div className="card" id="dishCard3">
            <img src="/images/food_pasta.png" alt="Creamy Pasta" />
            <div className="card-body">
              <h3>Truffle Carbonara</h3>
              <p>Handmade tagliatelle, smoked pancetta, egg yolk, aged pecorino, black truffle.</p>
            </div>
            <div className="card-footer">
              <span className="price">$24</span>
              <Link to="/menu" id="dishLink3">View Menu →</Link>
            </div>
          </div>
        </div>
      </section>

      <section className="page" id="aboutSection">
        <div className="about-wrapper">
          <div className="about-text">
            <span className="section-label">Our Story</span>
            <h2>Passion on Every Plate Since 1998</h2>
            <div className="divider about-divider"></div>
            <p>La Bella Cucina was born from a dream — to bring the soulful flavors of Italian and Mediterranean cuisine to life in an unforgettable setting.</p>
            <p>Our kitchen team sources ingredients daily from local farms and artisan suppliers.</p>
            <Link to="/booking"><button id="aboutBookBtn">Reserve Your Table</button></Link>
          </div>
          <div className="about-image">
            <img src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&q=80" alt="Restaurant Interior" />
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
