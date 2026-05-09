import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home      from './pages/Home/page';
import Menu      from './pages/Menu/page';
import Gallery   from './pages/Gallery/page';
import Reviews   from './pages/Reviews/page';
import Booking   from './pages/Booking/page';
import Dashboard from './pages/Dashboard/page';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/"          element={<Home />} />
        <Route path="/menu"      element={<Menu />} />
        <Route path="/gallery"   element={<Gallery />} />
        <Route path="/reviews"   element={<Reviews />} />
        <Route path="/booking"   element={<Booking />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
}
