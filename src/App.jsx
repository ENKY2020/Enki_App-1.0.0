import React, { useState } from 'react'; // Import useState from React
import ReactDOM from 'react-dom/client';
import './App.css'; // Ensure your styles are updated accordingly
import './Services';  // Import Services component
import './Services.css';
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
      <section className="Services">
        <h2>Professional Services</h2>
        <p>Quality services at competitive rates</p>
        <section className="services-section">
      <h2>Professional Services</h2>
      <p>Quality services at competitive rates</p>

      <div className="services-grid">
        {/* Box 1: Document Services */}
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

        {/* Box 2: Government Services */}
        <div className="service-box">
          <h3>Government Services</h3>
          <p>E-Citizen & KRA Services</p>
          <ul>
            <li>Police Clearance Certificate</li>
            <li>Driving License Application</li>
            <li>SHA Services</li>
            <li>NSSF Services</li>
            <li>KRA Services</li>
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

        {/* Box 3: Academic & Business */}
        <div className="service-box">
          <h3>Academic & Business</h3>
          <p>Research Projects & Business Plans</p>
          <ul>
            <li>Academic Research Projects: KSh 3500</li>
            <li>Business Plans: KSh 2500</li>
            <li>Report Writing: KSh 1500</li>
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

        {/* Box 4: Travel Services */}
        <div className="service-box">
          <h3>Travel Services</h3>
          <p>Visa & Green Card Applications</p>
          <ul>
            <li>Green Card DV Lottery (Single): KSh 400</li>
            <li>Green Card DV Lottery (Family): KSh 500</li>
            <li>USA Visit Visa Application: KSh 1500</li>
            <li>Kenyan Visa Passport: KSh 700</li>
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

        {/* Box 5: Web Development */}
        <div className="service-box">
          <h3>Web Development</h3>
          <p>Website Packages</p>
          <ul>
            <li>Static Website (1-5 pages): KSh 5,000 - KSh 20,000</li>
            <li>Landing Page: KSh 10,000 - KSh 20,000</li>
            <li>Small Business Website (several pages): KSh 20,000 - KSh 30,000</li>
            <li>E-commerce Website (1-30 products): KSh 25,000 - KSh 50,000</li>
            <li>Corporate Website (advanced functionality): KSh 45,000 - KSh 90,000</li>
            <li>Custom E-commerce Website: KSh 250,000+</li>
            <li>Ongoing Maintenance: KSh 2,000 - KSh 6,000 per year</li>
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
