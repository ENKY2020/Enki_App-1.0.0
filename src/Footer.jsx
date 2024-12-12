import React from 'react';
import './Footer.css'; // Ensure your corresponding CSS file is updated

function Footer() {
  return (
    <footer className="footer-container">
      <div className="footer-section left">
        <h3>About Us</h3>
        <p>
          Professional ICT solutions provider specializing in digital services, marketplace solutions, and tech education.
        </p>
      </div>

      <div className="footer-section middle">
        <h3>Connect With Us</h3>
        <p>@Lockdown Podcast KE</p>
        <p>Enky Solutions</p>
      </div>

      <div className="footer-section right">
        <h3>Contact Us</h3>
        <p>
          <a href="https://wa.me/254768063078" target="_blank" rel="noopener noreferrer">
            +254 768 063 078 (WhatsApp)
          </a>
        </p>
        <p>© 2024 Enky Solutions. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
