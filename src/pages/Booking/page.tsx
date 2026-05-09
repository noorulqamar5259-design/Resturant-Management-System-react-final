import { useState } from 'react';
import Navbar from '../../components/Navbar/page';
import Footer from '../../components/Footer/page';

interface Booking {
  name: string; date: string; time: string; guests: string; occasion: string; status: string;
}

const initialBookings: Booking[] = [
  { name:'Sarah Mitchell', date:'2025-05-10', time:'7:00 PM', guests:'2', occasion:'Anniversary 💍', status:'Confirmed' },
  { name:'James Thornton', date:'2025-05-10', time:'8:00 PM', guests:'4', occasion:'Birthday 🎂', status:'Confirmed' },
  { name:'Elena Rossi',    date:'2025-05-10', time:'6:30 PM', guests:'6', occasion:'Business 💼', status:'Pending' },
  { name:'Michael Chen',   date:'2025-05-11', time:'7:30 PM', guests:'2', occasion:'Romantic Date ❤️', status:'Confirmed' },
  { name:'Priya Sharma',   date:'2025-05-11', time:'12:00 PM', guests:'3', occasion:'—', status:'Cancelled' },
];

export default function Booking() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName]   = useState('');
  const [email, setEmail]         = useState('');
  const [phone, setPhone]         = useState('');
  const [date, setDate]           = useState('');
  const [time, setTime]           = useState('');
  const [guests, setGuests]       = useState('');
  const [occasion, setOccasion]   = useState('');
  const [requests, setRequests]   = useState('');
  const [bookings, setBookings]   = useState<Booking[]>(initialBookings);
  const [toast, setToast]         = useState('');

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const newBooking: Booking = {
      name: `${firstName} ${lastName}`, date, time, guests, occasion: occasion || '—', status: 'Confirmed'
    };
    setBookings([newBooking, ...bookings]);
    setToast('🎉 Table booked successfully! We look forward to seeing you.');
    setFirstName(''); setLastName(''); setEmail(''); setPhone('');
    setDate(''); setTime(''); setGuests(''); setOccasion(''); setRequests('');
    setTimeout(() => setToast(''), 3500);
  }

  const badgeClass = (s: string) => s === 'Confirmed' ? 'badge-green' : s === 'Pending' ? 'badge-yellow' : 'badge-red';

  return (
    <>
      <Navbar />

      <div className="booking-header">
        <span className="section-label">Make a Reservation</span>
        <h1>Book Your Table</h1>
        <div className="divider"></div>
        <p className="booking-header-text">Secure your seat for a memorable dining experience. We confirm all reservations within 2 hours.</p>
      </div>

      <div className="page booking-page">
        <div className="form-container" id="bookingFormContainer">
          <h2 className="reservation-title">Reservation Details</h2>
          <form id="bookingForm" onSubmit={handleSubmit} noValidate>
            <div className="flex-row">
              <div className="flex-item"><label htmlFor="guestFirstName">First Name</label><input type="text" id="guestFirstName" value={firstName} onChange={e=>setFirstName(e.target.value)} placeholder="John" required /></div>
              <div className="flex-item"><label htmlFor="guestLastName">Last Name</label><input type="text" id="guestLastName" value={lastName} onChange={e=>setLastName(e.target.value)} placeholder="Doe" required /></div>
            </div>
            <div><label htmlFor="guestEmail">Email Address</label><input type="email" id="guestEmail" value={email} onChange={e=>setEmail(e.target.value)} placeholder="john@example.com" required /></div>
            <div><label htmlFor="guestPhone">Phone Number</label><input type="tel" id="guestPhone" value={phone} onChange={e=>setPhone(e.target.value)} placeholder="+1 (555) 000-0000" /></div>
            <div className="flex-row">
              <div className="date-time-item"><label htmlFor="bookingDate">Date</label><input type="date" id="bookingDate" value={date} onChange={e=>setDate(e.target.value)} required /></div>
              <div className="date-time-item">
                <label htmlFor="bookingTime">Time</label>
                <div className="select-container">
                  <select id="bookingTime" value={time} onChange={e=>setTime(e.target.value)} required>
                    <option value="">Select time</option>
                    <option value="12:00 PM">12:00 PM</option><option value="12:30 PM">12:30 PM</option>
                    <option value="1:00 PM">1:00 PM</option><option value="1:30 PM">1:30 PM</option>
                    <option value="6:00 PM">6:00 PM</option><option value="6:30 PM">6:30 PM</option>
                    <option value="7:00 PM">7:00 PM</option><option value="7:30 PM">7:30 PM</option>
                    <option value="8:00 PM">8:00 PM</option><option value="8:30 PM">8:30 PM</option>
                    <option value="9:00 PM">9:00 PM</option>
                  </select>
                </div>
              </div>
            </div>
            <div>
              <label htmlFor="guestCount">Number of Guests</label>
              <div className="select-container">
                <select id="guestCount" value={guests} onChange={e=>setGuests(e.target.value)} required>
                  <option value="">Select guests</option>
                  <option value="1">1 Guest</option><option value="2">2 Guests</option><option value="3">3 Guests</option>
                  <option value="4">4 Guests</option><option value="5">5 Guests</option><option value="6">6 Guests</option>
                  <option value="7+">7+ Guests (large party)</option>
                </select>
              </div>
            </div>
            <div>
              <label htmlFor="occasionType">Special Occasion</label>
              <div className="select-container">
                <select id="occasionType" value={occasion} onChange={e=>setOccasion(e.target.value)}>
                  <option value="">None</option>
                  <option value="Birthday 🎂">🎂 Birthday</option><option value="Anniversary 💍">💍 Anniversary</option>
                  <option value="Romantic Date ❤️">❤️ Romantic Date</option><option value="Business 💼">💼 Business Dinner</option>
                  <option value="Celebration 🎉">🎉 Other Celebration</option>
                </select>
              </div>
            </div>
            <div><label htmlFor="specialRequests">Special Requests</label><textarea id="specialRequests" value={requests} onChange={e=>setRequests(e.target.value)} placeholder="Dietary requirements, seating preferences, allergies..." /></div>
            <button type="submit" id="submitBookingBtn">Confirm Reservation</button>
          </form>
        </div>

        <div className="booking-summary">
          <div className="text-center">
            <span className="section-label">Recent Reservations</span>
            <h2>Today's Booking Summary</h2>
            <div className="divider"></div>
          </div>
          <div className="table-container">
            <table id="bookingsTable" className="booking-table">
              <thead><tr><th>Guest Name</th><th>Date</th><th>Time</th><th>Guests</th><th>Occasion</th><th>Status</th></tr></thead>
              <tbody>
                {bookings.map((b, i) => (
                  <tr key={i}>
                    <td>{b.name}</td><td>{b.date}</td><td>{b.time}</td><td>{b.guests}</td><td>{b.occasion}</td>
                    <td><span className={`badge ${badgeClass(b.status)}`}>{b.status}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {toast && <div className="toast toast-success">{toast}</div>}
      <Footer />
    </>
  );
}
