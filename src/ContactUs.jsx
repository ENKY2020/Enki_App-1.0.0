import React from 'react';
import './contactUs.css'; // Import corresponding CSS file

function ContactUs() {
  return (
    <section className="contact-us-container" id="contactus">
      {/* Contact Information Box */}
      <div className="contact-box contact-info">
        <h2>Contact Information</h2>
        <p>Reach out to us for professional ICT services and solutions</p>
        <p><strong>Phone:</strong> +254 768 063 078</p>
        <p><strong>WhatsApp:</strong> <a href="https://wa.me/254768063078" target="_blank" rel="noopener noreferrer">Chat with us on WhatsApp</a></p>
        <p><strong>Business Hours:</strong></p>
        <p>Monday - Saturday: 8:00 AM - 8:00 PM</p>
        <p>Sunday: By Appointment</p>
      </div>

      {/* Contact on WhatsApp Box */}
      <div className="contact-box contact-whatsapp">
        <h2>Contact on WhatsApp</h2>
        <a href="https://wa.me/254768063078" target="_blank" rel="noopener noreferrer">
          <button className="whatsapp-button">Contact Us on WhatsApp</button>
        </a>
        <p><strong>Our Services Include:</strong></p>
        <ul>
          <li>✓ Document Processing & Printing</li>
          <li>✓ Professional Scanning Services</li>
          <li>✓ Digital Marketing Campaigns</li>
          <li>✓ Website Development</li>
          <li>✓ Online Product Listings</li>
          <li>✓ WhatsApp Business Marketing</li>
          <li>✓ Tech Education & Training</li>
          <li>✓ Digital Consultation</li>
        </ul>
      </div>
    </section>
  );
}

export default ContactUs;
