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

  return (
    <>
      <Navbar />

      <div className="reviews-header">
        <span className="section-label">What Our Guests Say</span>
        <h1>Customer Reviews</h1>
        <div className="divider"></div>
        <p className="reviews-header-text">Real reviews from our wonderful guests. We cherish every visit and every word of feedback.</p>
      </div>

      <div className="page reviews-page">
        <div className="features-section reviews-stats">
          <div className="feature-item">
            <span className="feature-icon large">⭐</span>
            <h3 className="stat-number">4.9 / 5</h3>
            <p>Overall Rating</p>
          </div>
          <div className="feature-item">
            <span className="feature-icon large">💬</span>
            <h3 className="stat-number">1,248</h3>
            <p>Total Reviews</p>
          </div>
          <div className="feature-item">
            <span className="feature-icon large">👍</span>
            <h3 className="stat-number">98%</h3>
            <p>Would Recommend</p>
          </div>
          <div className="feature-item">
            <span className="feature-icon large">🔁</span>
            <h3 className="stat-number">87%</h3>
            <p>Return Guests</p>
          </div>
        </div>

        <div className="text-center">
          <span className="section-label">Featured Reviews</span>
          <h2>What Guests Are Saying</h2>
          <div className="divider"></div>
        </div>

        <div className="card-container">
          {[
            { initials:'SM', name:'Sarah Mitchell', context:'Anniversary Dinner · May 2025', text:'"An absolutely magical evening. The truffle carbonara was out of this world!"' },
            { initials:'JT', name:'James Thornton', context:'Business Dinner · April 2025', text:'"Best ribeye I\'ve ever had. Excellent wine pairing."' },
            { initials:'ER', name:'Elena Rossi', context:'Date Night · April 2025', text:'"Perfect romantic dinner. Salmon and dessert were amazing."' },
          ].map((r, i) => (
            <div key={i} className="card review-card">
              <div className="card-body">
                <div className="stars">★★★★★</div>
                <p className="review-text">{r.text}</p>
                <div className="reviewer-info">
                  <div className="avatar">{r.initials}</div>
                  <div><h4>{r.name}</h4><p>{r.context}</p></div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="review-form-section">
          <div className="text-center">
            <span className="section-label">Share Your Experience</span>
            <h2>Leave a Review</h2>
            <div className="divider"></div>
          </div>
          <div className="form-container">
            <form id="reviewForm" onSubmit={handleSubmit}>
              <div><label>Your Name</label><input type="text" id="reviewName" value={name} onChange={e => setName(e.target.value)} required /></div>
              <div><label>Email Address</label><input type="email" id="reviewEmail" value={email} onChange={e => setEmail(e.target.value)} /></div>
              <div>
                <label>Your Rating</label>
                <div className="select-container">
                  <select id="reviewRating" value={rating} onChange={e => setRating(e.target.value)}>
                    <option value="5">★★★★★ — Excellent</option>
                    <option value="4">★★★★☆ — Very Good</option>
                    <option value="3">★★★☆☆ — Good</option>
                    <option value="2">★★☆☆☆ — Fair</option>
                    <option value="1">★☆☆☆☆ — Poor</option>
                  </select>
                </div>
              </div>
              <div><label>Your Review</label><textarea id="reviewText" value={text} onChange={e => setText(e.target.value)} required /></div>
              <button type="submit">Submit Review</button>
            </form>
          </div>
        </div>
      </div>

      {toast && <div className="toast toast-success">{toast}</div>}
      <Footer />
    </>
  );
}
