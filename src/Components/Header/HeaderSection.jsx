import React, { useState, useEffect } from "react";
import { supabase } from "../supabaseClient";
import ".component/HeaderSection.css";

const Header = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    // Check authentication and fetch role
    const fetchUserRole = async () => {
      const user = supabase.auth.user();
      if (user) {
        setIsAuthenticated(true);

        // Fetch role from the profiles table
        const { data, error } = await supabase
          .from("profiles") // Adjust table name if different
          .select("role")
          .eq("id", user.id)
          .single();

        if (error) {
          console.error("Error fetching user role:", error);
        } else {
          setUserRole(data?.role);
        }
      } else {
        setIsAuthenticated(false);
        setUserRole(null);
      }
    };

    fetchUserRole();

    // Listen for changes in auth state
    const authListener = supabase.auth.onAuthStateChange((event, session) => {
      if (session) {
        setIsAuthenticated(true);
        fetchUserRole(); // Refetch role on login
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
