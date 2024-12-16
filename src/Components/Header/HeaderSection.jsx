// src/components/HeaderSection.jsx
import React, { useState, useEffect } from "react";
import { supabase } from "../supabaseClient";
import "./HeaderSection.css";

const Header = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    // Check if the user is authenticated
    const user = supabase.auth.user();
    if (user) {
      setIsAuthenticated(true);
      // Optionally, you can fetch the user's role from your database if it's not available in the user object
      setUserRole(user.role); // Assuming the user object has a 'role' property
    } else {
      setIsAuthenticated(false);
    }

    // You can also listen for changes in auth state
    const authListener = supabase.auth.onAuthStateChange((event, session) => {
      if (session) {
        setIsAuthenticated(true);
        setUserRole(session.user.role); // Adjust based on your session structure
      } else {
        setIsAuthenticated(false);
        setUserRole(null);
      }
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header className="sticky-header">
      <div className="branding">
        <a href="#home" className="brand-link" onClick={() => scrollToSection("home")}>
          Powered by Enky Solutions
        </a>
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
          {/* Render Admin Panel link only if authenticated and is an admin */}
          {isAuthenticated && userRole === "admin" && (
            <li>
              <a href="/admin">Admin Panel</a>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
