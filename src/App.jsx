import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { createClient } from '@supabase/supabase-js';

// Import components
import HeaderSection from './Components/Header/HeaderSection';
import MarketplaceSection from './Components/MarketplaceSection';
import Podcast from './Components/Podcast';
import LearningHub from './Components/LearningHub';
import ContactUs from './Components/ContactUs';
import Footer from './Components/Footer';
import AdminDashboard from './Components/AdminDashboard';
import Login from './Components/Login';
import SignUp from './Components/SignUp';
import './AdminDashboard.css';

// Initialize Supabase
const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseKey = process.env.REACT_APP_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        setIsAuthenticated(true);

        // Fetch the user's role
        const { data, error } = await supabase
          .from('profiles')
          .select('role')
          .eq('id', session.user.id)
          .single();

        if (!error) {
          setUserRole(data.role || 'user');
        } else {
          console.error('Error fetching user role:', error.message);
          setUserRole('user'); // Default role
        }
      } else {
        setIsAuthenticated(false);
        setUserRole(null);
      }
    };
    checkAuth();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setIsAuthenticated(false);
    setUserRole(null);
  };

  // Route Guard for Admin Dashboard
  const ProtectedRoute = ({ children }) => {
    if (!isAuthenticated || userRole !== 'admin') {
      return <Navigate to="/login" />;
    }
    return children;
  };

  return (
    <div className="App">
      <Router>
        {/* Sticky Header */}
        <HeaderSection isAuthenticated={isAuthenticated} userRole={userRole} handleLogout={handleLogout} />

        {/* Routes */}
        <Routes>
          <Route
            path="/"
            element={
              <>
                <section className="hero-container">
                  <div className="hero-text">
                    <h1>Your One-Stop ICT Solutions Partner</h1>
                    <p>Professional IT services, digital marketplace, podcasts, and tech education - all in one place.</p>
                    <button className="explore-button" onClick={() => window.scrollTo({ top: document.getElementById('services').offsetTop, behavior: 'smooth' })}>
                      Explore Services
                    </button>
                  </div>
                </section>

                {/* Services Section */}
                <section className="services" id="services">
                  <h2>Professional Services</h2>
                  <p>Quality services at competitive rates</p>
                  <div className="services-grid">
                    <div className="service-box">
                      <h3>Document Services</h3>
                      <p>Professional CV, Portfolio & Letter Writing</p>
                      <ul>
                        <li>Professional CV Typesetting: KSh 350</li>
                        <li>International CV Typesetting: KSh 500</li>
                        <li>Portfolio Creation: KSh 1500</li>
                        <li>Cover Letters: KSh 150</li>
                        <li>Recommendation Letters: KSh 200</li>
                        <li>CV Revamps: KSh 100</li>
                      </ul>
                      <a
                        href="https://wa.me/254768063078"
                        className="whatsapp-button"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Inquire via WhatsApp
                      </a>
                    </div>
                  </div>
                </section>

                <MarketplaceSection />
                <Podcast />
                <LearningHub />
                <ContactUs />
                <Footer />
              </>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
          <Route path="/marketplace" element={<MarketplaceSection />} />
          <Route path="/podcast" element={<Podcast />} />
          <Route path="/learning-hub" element={<LearningHub />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="*" element={<div>Page Not Found</div>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
