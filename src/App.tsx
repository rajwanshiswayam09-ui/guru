import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';
import Home from './pages/Home';
import Booking from './pages/Booking';
import Itinerary from './pages/Itinerary';
import ThankYou from './pages/ThankYou';
import AboutUs from './pages/AboutUs';
import Destinations from './pages/Destinations';
import TourPackages from './pages/TourPackages';
import DestinationDetail from './pages/DestinationDetail';
import TourPackageCategory from './pages/TourPackageCategory';
import TourPackageDetail from './pages/TourPackageDetail';
import OurCabs from './pages/OurCabs';
import Blog from './pages/Blog';
import BlogDetail from './pages/BlogDetail';
import ContactUs from './pages/ContactUs';

// Component to handle scroll to top on route change
const ScrollToTop = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const element = document.getElementById(hash.substring(1));
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
        return;
      }
    }
    window.scrollTo(0, 0);
  }, [pathname, hash]);

  return null;
};

const App: React.FC = () => {
  return (
    <Router>
      <ScrollToTop />
      <div className="min-h-screen bg-surface-bg flex flex-col">
        <Header />
        <main className="grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about-us" element={<AboutUs />} />
            <Route path="/destinations" element={<Destinations />} />
            <Route path="/destinations/:slug" element={<DestinationDetail />} />
            <Route path="/tour-packages" element={<TourPackages />} />
            <Route path="/tour-packages/:slug" element={<TourPackageCategory />} />
            <Route path="/tour-packages/:categorySlug/:packageSlug" element={<TourPackageDetail />} />
            <Route path="/our-cabs" element={<OurCabs />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:slug" element={<BlogDetail />} />
            <Route path="/contact-us" element={<ContactUs />} />
            <Route path="/booking" element={<Booking />} />
            <Route path="/itinerary/:id" element={<Itinerary />} />
            <Route path="/thank-you" element={<ThankYou />} />
          </Routes>
        </main>
        <Footer />
        <WhatsAppButton />
      </div>
    </Router>
  );
};

export default App;
