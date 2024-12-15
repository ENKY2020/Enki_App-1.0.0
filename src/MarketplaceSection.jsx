import React, { useState, useEffect } from "react";
import "./marketplace-section.css";
import { supabase } from "../supabaseClient"; // Ensure this is correctly configured

const MarketplaceSection = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase.from("products").select("*");
      if (error) throw error;
      setProducts(data);
    } catch (error) {
      console.error("Error fetching products:", error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = (productId) => {
    console.log("Add to cart clicked for product ID:", productId);
    // Implement add-to-cart functionality here
  };

  return (
    <section className="marketplace-section">
      <h1 className="heading">Welcome to Our Marketplace</h1>
      {loading ? (
        <div className="loading-container">
          <p className="loading">Loading products...</p>
        </div>
      ) : products.length > 0 ? (
        <div className="products-grid">
          {products.map((product) => (
            <div className="product-card" key={product.id}>
              <img
                src={product.image_url}
                alt={product.name}
                className="product-image"
              />
              <div className="product-info">
                <h2 className="product-name">{product.name}</h2>
                <p className="product-description">{product.description}</p>
                <p className="product-price">KSh {product.price}</p>
                <button
                  className="add-to-cart-button"
                  onClick={() => handleAddToCart(product.id)}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="no-products">No products available at the moment.</p>
      )}
    </section>
  );
};

export default MarketplaceSection;
