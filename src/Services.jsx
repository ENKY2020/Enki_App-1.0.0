import React from 'react';
import './Services.css'; // Make sure to import the styles

function Services() {
  return (
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
  );
}

export default Services;
