import React, { useState } from 'react';
import './MarketplaceSection.css'; // Moving inline styles to a dedicated CSS file

const Marketplace = () => {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({
    name: '',
    category: '',
    condition: '',
    price: '',
    image: null,
  });
  const [filters, setFilters] = useState({
    category: '',
    condition: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    setNewProduct((prev) => ({ ...prev, image: URL.createObjectURL(file) }));
  };

  const handleAddProduct = (e) => {
    e.preventDefault();
    setProducts((prev) => [...prev, newProduct]);
    setNewProduct({ name: '', category: '', condition: '', price: '', image: null });
  };

  const filteredProducts = products.filter(
    (product) =>
      (!filters.category || product.category === filters.category) &&
      (!filters.condition || product.condition === filters.condition)
  );

  return (
    <div className="marketplace-container">
      {/* Header Section */}
      <div className="marketplace-header">
        <h1>Welcome to the Marketplace</h1>
        <p className="promo-banner">10% DISCOUNT EVERY WEEKEND</p>
        <button className="promo-button">Promo: Discounts Inside</button>
      </div>

      {/* Action Buttons */}
      <div className="action-buttons">
        <button className="shop-button">Shop From Us</button>
        <button className="sell-button">Sell With Us</button>
      </div>

      {/* Product Filters */}
      <div className="filters">
        <select
          name="category"
          value={filters.category}
          onChange={(e) => setFilters({ ...filters, category: e.target.value })}
          className="filter-select"
        >
          <option value="">Select Category</option>
          <option value="Electronics">Electronics</option>
          <option value="Clothing">Clothing</option>
          <option value="Home">Home</option>
        </select>
        <select
          name="condition"
          value={filters.condition}
          onChange={(e) => setFilters({ ...filters, condition: e.target.value })}
          className="filter-select"
        >
          <option value="">Select Condition</option>
          <option value="New">New</option>
          <option value="Used">Used</option>
        </select>
      </div>

      {/* Product Listing */}
      <div className="product-listing">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product, index) => (
            <div key={index} className="product-card">
              <img src={product.image} alt={product.name} className="product-image" />
              <h3>{product.name}</h3>
              <p>Category: {product.category}</p>
              <p>Condition: {product.condition}</p>
              <p>Price: ${product.price}</p>
            </div>
          ))
        ) : (
          <p>No products listed yet.</p>
        )}
      </div>

      {/* Add Product Form */}
      <div className="add-product-form">
        <h2>Add a Product</h2>
        <form onSubmit={handleAddProduct}>
          <input
            type="text"
            name="name"
            placeholder="Product Name"
            value={newProduct.name}
            onChange={handleInputChange}
            className="form-input"
          />
          <select
            name="category"
            value={newProduct.category}
            onChange={handleInputChange}
            className="form-input"
          >
            <option value="">Select Category</option>
            <option value="Electronics">Electronics</option>
            <option value="Clothing">Clothing</option>
            <option value="Home">Home</option>
          </select>
          <select
            name="condition"
            value={newProduct.condition}
            onChange={handleInputChange}
            className="form-input"
          >
            <option value="">Select Condition</option>
            <option value="New">New</option>
            <option value="Used">Used</option>
          </select>
          <input
            type="number"
            name="price"
            placeholder="Price"
            value={newProduct.price}
            onChange={handleInputChange}
            className="form-input"
          />
          <input
            type="file"
            onChange={handleImageUpload}
            className="form-input"
          />
          {newProduct.image && (
            <div className="image-preview">
              <img src={newProduct.image} alt="Image preview" className="preview-image" />
            </div>
          )}
          <button type="submit" className="submit-button">
            Add Product
          </button>
        </form>
      </div>
    </div>
  );
};

export default Marketplace;
