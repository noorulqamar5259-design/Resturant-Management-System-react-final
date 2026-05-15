import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar/page';
import Footer from '../../components/Footer/page';

interface User {
  name: string;
  email: string;
}

export default function Profile() {
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    } else {
      // For demo, if no user, redirect to login
      navigate('/login');
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-stone-50 dark:bg-stone-950 flex flex-col transition-colors duration-500">
      <Navbar />

      <main className="flex-1 max-w-5xl mx-auto w-full py-20 px-4">
        <div className="bg-white dark:bg-stone-900 rounded-[3rem] shadow-2xl border border-stone-100 dark:border-stone-800 overflow-hidden">
          {/* Cover / Header */}
          <div className="h-48 bg-amber-600 relative">
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20"></div>
          </div>
          
          <div className="px-10 pb-12 relative">
            {/* Avatar */}
            <div className="absolute -top-16 left-10 w-32 h-32 rounded-3xl bg-white dark:bg-stone-800 p-2 shadow-2xl">
              <div className="w-full h-full rounded-2xl bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center text-5xl font-bold text-amber-600 dark:text-amber-400">
                {user.name.charAt(0)}
              </div>
            </div>

            <div className="pt-20 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
              <div>
                <h1 className="text-4xl font-serif font-bold text-stone-900 dark:text-stone-100">{user.name}</h1>
                <p className="text-stone-500 dark:text-stone-400 font-medium">{user.email}</p>
              </div>
              <div className="flex gap-4">
                <button className="px-8 py-3 rounded-full border border-stone-200 dark:border-stone-700 font-bold text-stone-600 dark:text-stone-300 hover:bg-stone-50 dark:hover:bg-stone-800 transition-all">
                  Edit Profile
                </button>
                <button 
                  onClick={handleLogout}
                  className="px-8 py-3 rounded-full bg-red-500 hover:bg-red-600 text-white font-bold transition-all shadow-lg shadow-red-900/20"
                >
                  Logout
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
              <div className="p-6 bg-stone-50 dark:bg-stone-800/50 rounded-3xl border border-stone-100 dark:border-stone-800">
                <span className="text-2xl mb-2 block">🛍️</span>
                <h3 className="text-lg font-bold text-stone-900 dark:text-stone-100">Recent Orders</h3>
                <p className="text-stone-500 dark:text-stone-400 text-sm mt-1">12 total orders this year</p>
                <button className="mt-4 text-amber-600 dark:text-amber-400 font-bold text-sm hover:underline">View History</button>
              </div>
              <div className="p-6 bg-stone-50 dark:bg-stone-800/50 rounded-3xl border border-stone-100 dark:border-stone-800">
                <span className="text-2xl mb-2 block">📅</span>
                <h3 className="text-lg font-bold text-stone-900 dark:text-stone-100">Upcoming Bookings</h3>
                <p className="text-stone-500 dark:text-stone-400 text-sm mt-1">2 confirmed reservations</p>
                <button className="mt-4 text-amber-600 dark:text-amber-400 font-bold text-sm hover:underline">Manage Bookings</button>
              </div>
              <div className="p-6 bg-stone-50 dark:bg-stone-800/50 rounded-3xl border border-stone-100 dark:border-stone-800">
                <span className="text-2xl mb-2 block">🎁</span>
                <h3 className="text-lg font-bold text-stone-900 dark:text-stone-100">Loyalty Points</h3>
                <p className="text-stone-500 dark:text-stone-400 text-sm mt-1">850 points available</p>
                <button className="mt-4 text-amber-600 dark:text-amber-400 font-bold text-sm hover:underline">Redeem Points</button>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
