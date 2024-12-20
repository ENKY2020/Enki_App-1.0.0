import React, { useState, useEffect } from "react";
import { supabase } from "../supabaseClient";
import "./HeaderSection.css"; // Fixed the CSS import path

const HeaderSection = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const [user, setUser] = useState(null); // Store the user details

  useEffect(() => {
    const fetchUserDetails = async () => {
      const currentUser = supabase.auth.user();
      if (currentUser) {
        setIsAuthenticated(true);
        setUser(currentUser);

        // For development, hardcoding admin access by email
        if (currentUser.email === "your-admin-email@example.com") {
          setUserRole("admin");
        } else {
          // Fetch role from the profiles table
          const { data, error } = await supabase
            .from("profiles")
            .select("role")
            .eq("id", currentUser.id)
            .single();

          if (error) {
            console.error("Error fetching user role:", error);
          } else {
            setUserRole(data?.role || "user");
          }
        }
      } else {
        setIsAuthenticated(false);
        setUser(null);
        setUserRole(null);
      }
    };

    fetchUserDetails();

    const { data: subscription } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session) {
        fetchUserDetails();
      } else {
        setIsAuthenticated(false);
        setUser(null);
        setUserRole(null);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error("Error during logout:", error);
    } else {
      setIsAuthenticated(false);
      setUser(null);
      setUserRole(null);
    }
  };

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
          {/* Admin Panel for authenticated admin users */}
          {isAuthenticated && userRole === "admin" && (
            <li>
              <a href="/admin-dashboard">Admin Dashboard</a> {/* Link to Admin Dashboard */}
            </li>
          )}
          {/* Login, Signup, and Logout Buttons */}
          {!isAuthenticated ? (
            <>
              <li>
                <a href="/login">Login</a>
              </li>
              <li>
                <a href="/signup">Sign Up</a>
              </li>
            </>
          ) : (
            <li>
              <button onClick={handleLogout}>Logout</button>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default HeaderSection;
