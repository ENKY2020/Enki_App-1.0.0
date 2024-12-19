import React, { useState, useEffect } from 'react'; // Import useState from React
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Add routing
import './App.css'; // Ensure your styles are updated accordingly
import './Services';  // Import Services component
import './Services.css';
import { createClient } from '@supabase/supabase-js';
import Header from './Components/Header/HeaderSection';
import MarketplaceSection from './MarketplaceSection'; // Import the MarketplaceSection component correctly
import Podcast from './Podcast'; // Import the Podcast component
import LearningHub from './LearningHub'; // Import the LearningHub component
import ContactUs from './ContactUs'; // Import ContactUs component
import Footer from './Footer';
import AdminDashboard from './AdminDashboard'; // Import AdminDashboard
import "./admin-dashboard.css";

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseKey = process.env.REACT_APP_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

// App component declaration (use the functional component with hooks)
function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Track authentication state
  const [adminEmail, setAdminEmail] = useState('');
  const [adminPassword, setAdminPassword] = useState('RICH2024!'); // Default password
  
  useEffect(() => {
    // Check if the user is authenticated
    const checkAuth = async () => {
      const user = supabase.auth.user();
      if (user) {
        setIsAuthenticated(true);
        setAdminEmail(user.email);
      } else {
        setIsAuthenticated(false);
      }
    };
    checkAuth();
  }, []);
  
  const handleLogin = async () => {
    const { user, error } = await supabase.auth.signInWithPassword({
      email: adminEmail,
      password: adminPassword,
    });
    if (error) {
      alert('Authentication failed: ' + error.message);
    } else {
      setIsAuthenticated(true);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setIsAuthenticated(false);
  };

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
  const [products, setProducts] = useState([]); // State to display listed products
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
    setProducts([...products, { ...product }]);
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
          <a href="#services">Services</a>
          <a href="#marketplace">Marketplace</a>
          <a href="#podcast">Podcast</a>
          <a href="#learninghub">LearningHub</a>
          <a href="#contact">Contact Us</a>
          <a href="#login">Login</a>
          <a href="#signup">Sign Up</a>
          {/* Admin Dashboard link added */}
          <a href="/admin">Admin Dashboard</a>
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
          {/* Service Boxes */}
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
          {/* Add more service boxes here... */}
        </div>
      </section>

      {/* Marketplace Section */}
      <MarketplaceSection /> 

      {/* Podcast Section Below Marketplace */}
      <Podcast />

      {/* LearningHub Section */}
      <LearningHub />

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
        {/* Define the route for Admin Dashboard */}
        <Route path="/admin" element={<AdminDashboard />} />
        {/* Other routes can go here */}
      </Routes>
      <App />
    </Router>
  </React.StrictMode>
);

export default App;
