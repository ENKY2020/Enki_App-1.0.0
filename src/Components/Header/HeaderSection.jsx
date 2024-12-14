// Header.jsx
import React from "react";
import "./HeaderSection.css";

const Header = () => {
  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header className="sticky-header">
      <div className="branding">
        <a href="#home" className="brand-link" onClick={() => scrollToSection("home")}>Powered by Enky Solutions</a>
      </div>
      <nav className="nav-links">
        <ul>
          <li>
            <button onClick={() => scrollToSection("services")}>Services</button>
          </li>
          <li>
            <button onClick={() => scrollToSection("marketplace")}>Marketplace</button>
          </li>
          <li>
            <button onClick={() => scrollToSection("podcast")}>Podcast</button>
          </li>
          <li>
            <button onClick={() => scrollToSection("learninghub")}>LearningHub</button>
          </li>
          <li>
            <button onClick={() => scrollToSection("contactus")}>Contact Us</button>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
