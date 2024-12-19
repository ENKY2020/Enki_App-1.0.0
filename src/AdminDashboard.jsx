// AdminDashboard.jsx

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "./supabaseClient";
import "./AdminDashboard.css"; // Ensure you create this file for styling

const AdminDashboard = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  // Fetch user role and products
  useEffect(() => {
    const verifyAdmin = async () => {
      const user = supabase.auth.user();
      if (!user) {
        navigate("/login"); // Redirect unauthenticated users to login
        return;
      }

      const { data, error } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", user.id)
        .single();

      if (error || data?.role !== "admin") {
        navigate("/"); // Redirect non-admins to home page
        return;
      }
    };

    const fetchProducts = async () => {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("status", "pending");

      if (error) console.error("Error fetching products:", error);
      else setProducts(data);
    };

    verifyAdmin();
    fetchProducts();
  }, [navigate]);

  const approveProduct = async (productId) => {
    const { error } = await supabase
      .from("products")
      .update({ status: "approved" })
      .eq("id", productId);

    if (error) {
      console.error("Error approving product:", error);
    } else {
      setProducts(products.filter((product) => product.id !== productId));
    }
  };

  const rejectProduct = async (productId) => {
    const { error } = await supabase
      .from("products")
      .update({ status: "rejected" })
      .eq("id", productId);

    if (error) {
      console.error("Error rejecting product:", error);
    } else {
      setProducts(products.filter((product) => product.id !== productId));
    }
  };

  return (
    <div className="admin-dashboard">
      <h1>Admin Dashboard</h1>
      <div className="product-list">
        {products.length > 0 ? (
          products.map((product) => (
            <div key={product.id} className="product-card">
              <img
                src={product.image_url}
                alt={product.name}
                className="product-image"
              />
              <h3>{product.name}</h3>
              <p>Category: {product.category}</p>
              <p>Price: KSh {product.price}</p>
              <p>Status: {product.status}</p>
              <div className="actions">
                <button
                  className="approve-button"
                  onClick={() => approveProduct(product.id)}
                >
                  Approve
                </button>
                <button
                  className="reject-button"
                  onClick={() => rejectProduct(product.id)}
                >
                  Reject
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>No pending products to review.</p>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
