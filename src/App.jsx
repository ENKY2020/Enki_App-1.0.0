import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom'; // Add routing
import './App.css'; // Ensure your styles are updated accordingly
import './Services.css'; 
import { createClient } from '@supabase/supabase-js';
import HeaderSection from './Components/Header/HeaderSection';
import MarketplaceSection from './MarketplaceSection'; // Import the MarketplaceSection component correctly
import Podcast from './Podcast'; 
import LearningHub from './LearningHub'; 
import ContactUs from './ContactUs'; 
import Footer from './Footer';
import AdminDashboard from './AdminDashboard'; // Import AdminDashboard
import "./AdminDashboard.css";

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseKey = process.env.REACT_APP_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

// App component declaration (use the functional component with hooks)
function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Track authentication state
  const [adminEmail, setAdminEmail] = useState(localStorage.getItem("adminEmail") || ''); // Persist email in local storage
  const [adminPassword, setAdminPassword] = useState(localStorage.getItem("adminPassword") || 'RICH2024!'); // Persist password in local storage

  // UseEffect to check authentication state on initial load
  useEffect(() => {
    const checkAuth = async () => {
      const user = supabase.auth.user();
      if (user) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
    };
    checkAuth();
  }, []);

  // Handler for logging in
  const handleLogin = async () => {
    const { user, error } = await supabase.auth.signInWithPassword({
      email: adminEmail,
      password: adminPassword,
    });
    if (error) {
      alert('Authentication failed: ' + error.message);
    } else {
      setIsAuthenticated(true);
      localStorage.setItem("adminEmail", adminEmail); // Save email in local storage
      localStorage.setItem("adminPassword", adminPassword); // Save password in local storage
    }
  };

  // Handler for logging out
  const handleLogout = async () => {
    await supabase.auth.signOut();
    setIsAuthenticated(false);
    localStorage.removeItem("adminEmail");
    localStorage.removeItem("adminPassword");
  };

  // Menu toggle for the mobile menu
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const [product, setProduct] = useState({
    name: '',
    price: '',
    description: '',
    image: null,
    whatsapp: '',
    category: '',
    condition: 'brand new',
  });

  const [products, setProducts] = useState(JSON.parse(localStorage.getItem('products')) || []); // Persist products in local storage
  const [previewImage, setPreviewImage] = useState(null);

  const categories = ['Electronics', 'Fashion', 'Household Items', 'Food & Drinks', 'Seller'];
  const conditions = ['Refurbished', 'Brand New'];

  // Handler for file upload preview
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPreviewImage(reader.result);
      reader.readAsDataURL(file);
      setProduct({ ...product, image: file });
    }
  };

  // Handler to add a product (frontend only)
  const handleAddProduct = () => {
    if (!product.name || !product.price || !product.whatsapp) {
      alert('Please fill in all required fields');
      return;
    }
    const updatedProducts = [...products, { ...product }];
    setProducts(updatedProducts);
    localStorage.setItem('products', JSON.stringify(updatedProducts)); // Save products in local storage
    setProduct({
      name: '',
      price: '',
      description: '',
      image: null,
      whatsapp: '',
      category: '',
      condition: 'brand new',
    });
    setPreviewImage(null);
  };

  return (
    <div className="App">
      {/* Sticky Header */}
      <header className="sticky-header">
        <div className="left">Powered by Enky Solutions</div>

        {/* Hamburger Menu */}
        <div className={`hamburger-menu ${menuOpen ? 'open' : ''}`} onClick={toggleMenu}>
          <div className="line"></div>
          <div className="line"></div>
          <div className="line"></div>
        </div>

        <div className={`right ${menuOpen ? 'open' : ''}`}>
          <Link to="/admin">Admin Dashboard</Link>
          <Link to="#services">Services</Link>
          <Link to="#marketplace">Marketplace</Link>
          <Link to="#podcast">Podcast</Link>
          <Link to="#learninghub">LearningHub</Link>
          <Link to="#contact">Contact Us</Link>
          {isAuthenticated ? (
            <button onClick={handleLogout}>Logout</button>
          ) : (
            <div>
              <Link to="#login" onClick={handleLogin}>Login</Link>
              <Link to="#signup">Sign Up</Link>
            </div>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section className="hero-container">
        <div className="hero-text">
          <h1>Your One-Stop ICT Solutions Partner</h1>
          <p>Professional IT services, digital marketplace, podcasts, and tech education - all in one place.</p>
          <button className="explore-button">Explore Services</button>
        </div>
      </section>

      {/* Professional Services Section */}
      <section className="services">
        <h2>Professional Services</h2> {/* Corrected closing tag */}
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

      {/* Marketplace Section */}
      <MarketplaceSection products={products} /> {/* Pass products to Marketplace */}

      {/* Podcast Section Below Marketplace */}
      <Podcast />

      {/* LearningHub Section */}
      <LearningHub />

      {/* Contact Us Section */}
      <ContactUs />
      <Footer />
    </div>
  );
}

// Routing Setup
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/admin" element={<AdminDashboard />} />
      </Routes>
    </Router>
  </React.StrictMode>
);

export default App;
