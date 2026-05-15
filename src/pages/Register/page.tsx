import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar/page';
import Footer from '../../components/Footer/page';

export default function Register() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const navigate = useNavigate();

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate registration
    localStorage.setItem('user', JSON.stringify({ name: formData.name, email: formData.email }));
    navigate('/profile');
  };

  return (
    <div className="min-h-screen bg-stone-50 flex flex-col transition-colors duration-500">
      <Navbar />

      <main className="flex-1 flex items-center justify-center p-4 py-20">
        <div className="max-w-md w-full bg-white rounded-[3rem] shadow-2xl border border-stone-100 p-10 md:p-12 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-amber-600/10 rounded-bl-full"></div>
          
          <div className="text-center mb-10">
            <span className="text-amber-600 font-bold tracking-widest uppercase text-xs">Join Us Today</span>
            <h1 className="text-4xl font-serif font-bold text-stone-900 mt-2">Create Account</h1>
            <div className="w-12 h-1 bg-amber-600 mx-auto rounded-full mt-4"></div>
          </div>

          <form onSubmit={handleRegister} className="space-y-5">
            <div className="space-y-2">
              <label className="text-sm font-bold text-stone-700 ml-1">Full Name</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className="w-full px-6 py-4 rounded-2xl bg-stone-50 border-none focus:ring-2 focus:ring-amber-500 transition-all"
                placeholder="John Doe"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-stone-700 ml-1">Email Address</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                className="w-full px-6 py-4 rounded-2xl bg-stone-50 border-none focus:ring-2 focus:ring-amber-500 transition-all"
                placeholder="email@example.com"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-stone-700 ml-1">Password</label>
              <input
                type="password"
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
                className="w-full px-6 py-4 rounded-2xl bg-stone-50 border-none focus:ring-2 focus:ring-amber-500 transition-all"
                placeholder="••••••••"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-stone-700 ml-1">Confirm Password</label>
              <input
                type="password"
                value={formData.confirmPassword}
                onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                className="w-full px-6 py-4 rounded-2xl bg-stone-50 border-none focus:ring-2 focus:ring-amber-500 transition-all"
                placeholder="••••••••"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full py-5 bg-amber-600 hover:bg-amber-700 text-white rounded-2xl font-bold text-lg shadow-xl shadow-amber-900/20 transition-all transform active:scale-95"
            >
              Sign Up
            </button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-stone-500 text-sm">
              Already have an account?{" "}
              <Link to="/login" className="text-amber-600 font-bold hover:underline">Log in</Link>
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
