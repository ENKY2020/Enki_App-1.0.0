// AdminDashboard.js

import React, { useState, useEffect } from "react";
import { supabase } from "./supabaseClient"; // make sure supabase client is properly set up

const AdminDashboard = () => {
  const [products, setProducts] = useState([]);

  // Fetch products from Supabase
  useEffect(() => {
    const fetchProducts = async () => {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("status", "pending"); // Only fetch pending products for now
      if (error) console.error("Error fetching products:", error);
      else setProducts(data);
    };

    fetchProducts();
  }, []);

  // Function to handle approval of product
  const approveProduct = async (productId) => {
    const { data, error } = await supabase
      .from("products")
      .update({ status: "approved" })
      .eq("id", productId);
    if (error) console.error("Error approving product:", error);
    else {
      setProducts(products.filter((product) => product.id !== productId)); // Remove the approved product from the pending list
    }
  };

  // Function to handle rejection of product
  const rejectProduct = async (productId) => {
    const { data, error } = await supabase
      .from("products")
      .update({ status: "rejected" })
      .eq("id", productId);
    if (error) console.error("Error rejecting product:", error);
    else {
      setProducts(products.filter((product) => product.id !== productId)); // Remove the rejected product from the pending list
    }
  };

  return (
    <div className="admin-dashboard">
      <h1>Admin Product Review</h1>
      <div className="product-list">
        {products.map((product) => (
          <div key={product.id} className="product-card">
            <img src={product.image_url} alt={product.name} className="product-image" />
            <h3>{product.name}</h3>
            <p>{product.category}</p>
            <p>Price: KSh {product.price}</p>
            <p>Status: {product.status}</p>
            <div className="actions">
              <button onClick={() => approveProduct(product.id)}>Approve</button>
              <button onClick={() => rejectProduct(product.id)}>Reject</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;
