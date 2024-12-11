import React, { useState } from 'react'; // Import useState from React
import ReactDOM from 'react-dom/client';
import './App.css'; // Ensure your styles are updated accordingly
import MarketplaceSection from './MarketplaceSection'; // Import the MarketplaceSection component correctly
import Podcast from './Podcast'; // Import the Podcast component
import LearningHub from './LearningHub'; // Import the LearningHub component
import ContactUs from './ContactUs'; // Import ContactUs component
import Footer from './Footer'

// App component declaration (use the functional component with hooks)
function App() {
  const [menuOpen, setMenuOpen] = useState(false);
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

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
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
      <section className="professional-services">
        <h2>Professional Services</h2>
        <p>Quality services at competitive rates</p>

        <div className="services-grid">
          {/* Service boxes go here */}
        </div>
      </section>

      {/* Marketplace Section */}
      <MarketplaceSection /> 

      {/* Podcast Section Below Marketplace */}
      <Podcast /> {/* This ensures the Podcast component shows up below the Marketplace Section */}

      {/* LearningHub Section */}
      <LearningHub /> {/* This adds the LearningHub component below the Podcast section */}
      <ContactUs />
      <Footer/>
    </div>
  );
}

// Ensure your App is properly rendered in the DOM
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

export default App;
