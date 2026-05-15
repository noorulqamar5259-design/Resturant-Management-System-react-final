import { useState, type FormEvent } from 'react';
import Navbar from '../../components/Navbar/page';
import Footer from '../../components/Footer/page';

interface Booking {
  name: string; date: string; time: string; guests: string; occasion: string; status: string;
}

const initialBookings: Booking[] = [
  { name: 'Sarah Mitchell', date: '2025-05-10', time: '7:00 PM', guests: '2', occasion: 'Anniversary 💍', status: 'Confirmed' },
  { name: 'James Thornton', date: '2025-05-10', time: '8:00 PM', guests: '4', occasion: 'Birthday 🎂', status: 'Confirmed' },
  { name: 'Elena Rossi', date: '2025-05-10', time: '6:30 PM', guests: '6', occasion: 'Business 💼', status: 'Pending' },
  { name: 'Michael Chen', date: '2025-05-11', time: '7:30 PM', guests: '2', occasion: 'Romantic Date ❤️', status: 'Confirmed' },
  { name: 'Priya Sharma', date: '2025-05-11', time: '12:00 PM', guests: '3', occasion: '—', status: 'Cancelled' },
];

export default function Booking() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [guests, setGuests] = useState('');
  const [occasion, setOccasion] = useState('');
  const [requests, setRequests] = useState('');
  const [bookings, setBookings] = useState<Booking[]>(initialBookings);
  const [toast, setToast] = useState('');

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
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

  const badgeClass = (s: string) =>
    s === 'Confirmed' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' :
    s === 'Pending' ? 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400' :
    'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400';

  return (
    <div className="min-h-screen bg-stone-50 dark:bg-stone-950 flex flex-col transition-colors duration-500">
      <Navbar />

      <header className="py-24 px-4 bg-white dark:bg-stone-900 border-b border-stone-200 dark:border-stone-800 text-center">
        <div className="max-w-4xl mx-auto">
          <span className="text-amber-600 font-semibold tracking-widest uppercase text-sm">Join Our Table</span>
          <h1 className="text-5xl md:text-6xl font-serif font-bold text-stone-900 dark:text-stone-100 mt-4 mb-6">Make a Reservation</h1>
          <div className="w-24 h-1 bg-amber-600 mx-auto rounded-full mb-8"></div>
          <p className="text-xl text-stone-600 dark:text-stone-400 max-w-2xl mx-auto leading-relaxed italic">
            "Experience authentic Italian hospitality in the heart of the city."
          </p>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-16 px-4">
        <div className="grid gap-12 lg:grid-cols-[1.35fr_0.65fr]">
          <form onSubmit={handleSubmit} className="space-y-10 bg-white rounded-[2.5rem] p-10 shadow-2xl border border-stone-100">
            <div className="grid gap-6 sm:grid-cols-2">
              <div className="space-y-2">
                <label className="text-sm font-bold text-stone-700 ml-1">First Name</label>
                <input value={firstName} onChange={e => setFirstName(e.target.value)} required className="w-full px-6 py-4 rounded-2xl border border-stone-200 bg-stone-50 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 outline-none" placeholder="First name" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-stone-700 ml-1">Last Name</label>
                <input value={lastName} onChange={e => setLastName(e.target.value)} required className="w-full px-6 py-4 rounded-2xl border border-stone-200 bg-stone-50 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 outline-none" placeholder="Last name" />
              </div>
            </div>

            <div className="grid gap-6 sm:grid-cols-2">
              <div className="space-y-2">
                <label className="text-sm font-bold text-stone-700 ml-1">Email</label>
                <input type="email" value={email} onChange={e => setEmail(e.target.value)} required className="w-full px-6 py-4 rounded-2xl border border-stone-200 bg-stone-50 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 outline-none" placeholder="you@example.com" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-stone-700 ml-1">Phone</label>
                <input type="tel" value={phone} onChange={e => setPhone(e.target.value)} required className="w-full px-6 py-4 rounded-2xl border border-stone-200 bg-stone-50 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 outline-none" placeholder="(123) 456-7890" />
              </div>
            </div>

            <div className="grid gap-6 sm:grid-cols-2">
              <div className="space-y-2">
                <label className="text-sm font-bold text-stone-700 ml-1">Date</label>
                <input type="date" value={date} onChange={e => setDate(e.target.value)} required className="w-full px-6 py-4 rounded-2xl border border-stone-200 bg-stone-50 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 outline-none" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-stone-700 ml-1">Time</label>
                <input type="time" value={time} onChange={e => setTime(e.target.value)} required className="w-full px-6 py-4 rounded-2xl border border-stone-200 bg-stone-50 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 outline-none" />
              </div>
            </div>

            <div className="grid gap-6 sm:grid-cols-2">
              <div className="space-y-2">
                <label className="text-sm font-bold text-stone-700 ml-1">Guests</label>
                <input type="number" min="1" value={guests} onChange={e => setGuests(e.target.value)} required className="w-full px-6 py-4 rounded-2xl border border-stone-200 bg-stone-50 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 outline-none" placeholder="Number of guests" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-stone-700 ml-1">Occasion</label>
                <input value={occasion} onChange={e => setOccasion(e.target.value)} className="w-full px-6 py-4 rounded-2xl border border-stone-200 bg-stone-50 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 outline-none" placeholder="Anniversary, Birthday, etc." />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-stone-700 ml-1">Special Requests</label>
              <textarea value={requests} onChange={e => setRequests(e.target.value)} className="w-full px-6 py-4 rounded-2xl bg-stone-50 border border-stone-200 focus:ring-2 focus:ring-amber-500 h-32 resize-none outline-none" placeholder="Dietary requirements, seating preferences, allergies..." />
            </div>

            <button type="submit" className="w-full py-5 bg-amber-600 hover:bg-amber-700 text-white rounded-2xl font-bold text-lg shadow-xl shadow-amber-900/20 transition-all transform active:scale-95">
              Confirm Reservation
            </button>
          </form>

          {/* Sidebar / Info */}
          <div className="space-y-8">
            <div className="bg-amber-600 text-white p-10 rounded-[2.5rem] shadow-2xl relative overflow-hidden">
              <div className="absolute -top-4 -right-4 text-white/10 text-9xl font-serif">“</div>
              <h3 className="text-2xl font-serif font-bold mb-6 relative z-10">Private Dining</h3>
              <p className="text-amber-50 mb-8 relative z-10 leading-relaxed">
                Planning a larger event? Our private cellar and rooftop terrace are available for groups of 10 to 50 guests.
              </p>
              <button className="bg-white text-amber-600 px-8 py-3 rounded-full font-bold hover:bg-stone-100 transition-all relative z-10">
                Inquire Now
              </button>
            </div>

            <div className="bg-white p-10 rounded-[2.5rem] border border-stone-100 shadow-xl">
              <h3 className="text-xl font-bold text-stone-900 mb-6">Reservation Policy</h3>
              <ul className="space-y-4 text-sm text-stone-600">
                <li className="flex gap-3">
                  <span className="text-amber-600">✓</span>
                  <span>Tables are held for 15 minutes past reservation time.</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-amber-600">✓</span>
                  <span>Cancellations are requested at least 24 hours in advance.</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-amber-600">✓</span>
                  <span>Parties of 8 or more require a credit card guarantee.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Booking Summary Table */}
        <div className="mt-24">
          <div className="text-center mb-12">
            <span className="text-amber-600 font-semibold tracking-widest uppercase text-sm">Recent Reservations</span>
            <h2 className="text-4xl font-serif font-bold text-stone-900 mt-3 mb-6">Today's Summary</h2>
            <div className="w-16 h-1 bg-amber-600 mx-auto rounded-full"></div>
          </div>

          <div className="bg-white rounded-[2.5rem] overflow-hidden border border-stone-100 shadow-2xl">
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-stone-50 border-b border-stone-100">
                    <th className="px-8 py-6 text-sm font-bold text-stone-500 uppercase tracking-wider text-center">Guest</th>
                    <th className="px-8 py-6 text-sm font-bold text-stone-500 uppercase tracking-wider text-center">Date</th>
                    <th className="px-8 py-6 text-sm font-bold text-stone-500 uppercase tracking-wider text-center">Time</th>
                    <th className="px-8 py-6 text-sm font-bold text-stone-500 uppercase tracking-wider text-center">Guests</th>
                    <th className="px-8 py-6 text-sm font-bold text-stone-500 uppercase tracking-wider text-center">Occasion</th>
                    <th className="px-8 py-6 text-sm font-bold text-stone-500 uppercase tracking-wider text-center">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100">
                  {bookings.map((b, i) => (
                    <tr key={i} className="hover:bg-stone-50 transition-colors">
                      <td className="px-8 py-5 font-bold text-stone-900 text-center">{b.name}</td>
                      <td className="px-8 py-5 text-stone-600 text-center">{b.date}</td>
                      <td className="px-8 py-5 text-stone-600 text-center">{b.time}</td>
                      <td className="px-8 py-5 text-stone-600 text-center">{b.guests}</td>
                      <td className="px-8 py-5 text-stone-600 text-center italic">{b.occasion}</td>
                      <td className="px-8 py-5 text-center">
                        <span className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider ${badgeClass(b.status)}`}>
                          {b.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>

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
