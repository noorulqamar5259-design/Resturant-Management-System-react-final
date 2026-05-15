import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar/page';
import Footer from '../../components/Footer/page';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate login
    localStorage.setItem('user', JSON.stringify({ name: 'Guest User', email }));
    navigate('/profile');
  };

  return (
    <div className="min-h-screen bg-stone-50 dark:bg-stone-950 flex flex-col transition-colors duration-500">
      <Navbar />

      <main className="flex-1 flex items-center justify-center p-4 py-20">
        <div className="max-w-md w-full bg-white dark:bg-stone-900 rounded-[3rem] shadow-2xl border border-stone-100 dark:border-stone-800 p-10 md:p-12 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-amber-600/10 rounded-bl-full"></div>
          
          <div className="text-center mb-10">
            <span className="text-amber-600 font-bold tracking-widest uppercase text-xs">Welcome Back</span>
            <h1 className="text-4xl font-serif font-bold text-stone-900 dark:text-stone-100 mt-2">Login</h1>
            <div className="w-12 h-1 bg-amber-600 mx-auto rounded-full mt-4"></div>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-bold text-stone-700 dark:text-stone-300 ml-1">Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-6 py-4 rounded-2xl bg-stone-50 dark:bg-stone-800 text-stone-900 dark:text-stone-100 border-none focus:ring-2 focus:ring-amber-500 transition-all"
                placeholder="email@example.com"
                required
              />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center ml-1">
                <label className="text-sm font-bold text-stone-700 dark:text-stone-300">Password</label>
                <button type="button" className="text-xs text-amber-600 dark:text-amber-400 font-bold hover:underline">Forgot?</button>
              </div>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-6 py-4 rounded-2xl bg-stone-50 dark:bg-stone-800 text-stone-900 dark:text-stone-100 border-none focus:ring-2 focus:ring-amber-500 transition-all"
                  placeholder="••••••••"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-6 top-1/2 -translate-y-1/2 text-stone-400"
                >
                  {showPassword ? "👁️" : "🙈"}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-5 bg-amber-600 hover:bg-amber-700 text-white rounded-2xl font-bold text-lg shadow-xl shadow-amber-900/20 transition-all transform active:scale-95"
            >
              Sign In
            </button>
          </form>

          <div className="mt-10 text-center space-y-4">
            <p className="text-stone-500 text-sm">
              Don't have an account?{" "}
              <Link to="/register" className="text-amber-600 font-bold hover:underline">Register now</Link>
            </p>
            <div className="flex items-center gap-4 py-2">
              <div className="flex-1 h-px bg-stone-100"></div>
              <span className="text-xs text-stone-400 uppercase font-bold">Or continue with</span>
              <div className="flex-1 h-px bg-stone-100"></div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <button className="flex items-center justify-center gap-2 py-3 rounded-xl border border-stone-200 hover:bg-stone-50 transition-all">
                <span className="text-xl">G</span> <span className="text-xs font-bold">Google</span>
              </button>
              <button className="flex items-center justify-center gap-2 py-3 rounded-xl border border-stone-200 hover:bg-stone-50 transition-all">
                <span className="text-xl">f</span> <span className="text-xs font-bold">Facebook</span>
              </button>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
