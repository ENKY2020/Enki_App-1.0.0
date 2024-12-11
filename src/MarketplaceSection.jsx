import React, { useState } from 'react';

// Marketplace Component
const Marketplace = () => {
  // State for products, new product data, and filters
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

  // Handle product input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct((prev) => ({ ...prev, [name]: value }));
  };

  // Handle product image upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    setNewProduct((prev) => ({ ...prev, image: URL.createObjectURL(file) }));
  };

  // Handle product submission
  const handleAddProduct = (e) => {
    e.preventDefault();
    setProducts((prev) => [...prev, newProduct]);
    setNewProduct({
      name: '',
      category: '',
      condition: '',
      price: '',
      image: null,
    });
  };

  // Filter products based on category and condition
  const filteredProducts = products.filter(
    (product) =>
      (!filters.category || product.category === filters.category) &&
      (!filters.condition || product.condition === filters.condition)
  );

  return (
    <div className="marketplace-container">
      {/* Header Section */}
      <div className="marketplace-header" style={{ backgroundColor: '#FF6F00', padding: '20px', borderRadius: '10px', color: 'white' }}>
        <h1>Welcome to the Marketplace</h1>
        <button className="promo-button" style={{ backgroundColor: '#1E88E5', padding: '10px', borderRadius: '5px', color: 'white' }}>
          Promo: Discounts Inside
        </button>
      </div>

      {/* Action Buttons */}
      <div className="action-buttons" style={{ display: 'flex', justifyContent: 'space-between', margin: '20px 0' }}>
        <button className="shop-button" style={buttonStyle}>
          Shop From Us
        </button>
        <button className="sell-button" style={buttonStyle}>
          Sell With Us
        </button>
      </div>

      {/* Product Filters */}
      <div className="filters" style={{ marginBottom: '20px' }}>
        <select
          name="category"
          value={filters.category}
          onChange={(e) => setFilters({ ...filters, category: e.target.value })}
          style={selectStyle}
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
          style={selectStyle}
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
            <div key={index} className="product-card" style={cardStyle}>
              <img
                src={product.image}
                alt={product.name}
                style={imageStyle}
              />
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
      <div className="add-product-form" style={formContainerStyle}>
        <h2>Add a Product</h2>
        <form onSubmit={handleAddProduct} style={formStyle}>
          <input
            type="text"
            name="name"
            placeholder="Product Name"
            value={newProduct.name}
            onChange={handleInputChange}
            style={inputStyle}
          />
          <select
            name="category"
            value={newProduct.category}
            onChange={handleInputChange}
            style={inputStyle}
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
            style={inputStyle}
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
            style={inputStyle}
          />
          <input
            type="file"
            onChange={handleImageUpload}
            style={inputStyle}
          />
          {newProduct.image && (
            <div className="image-preview" style={previewStyle}>
              <img src={newProduct.image} alt="Image preview" style={imagePreviewStyle} />
            </div>
          )}
          <button type="submit" style={submitButtonStyle}>
            Add Product
          </button>
        </form>
      </div>
    </div>
  );
};

// Inline style objects for cleaner code
const buttonStyle = {
  padding: '10px 20px',
  backgroundColor: '#FF6F00',
  border: 'none',
  borderRadius: '5px',
  color: 'white',
};

const selectStyle = {
  padding: '10px',
  margin: '5px',
  borderRadius: '5px',
  border: '1px solid #ccc',
};

const cardStyle = {
  border: '1px solid #ccc',
  padding: '10px',
  margin: '10px',
  borderRadius: '10px',
  boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
};

const imageStyle = {
  width: '100%',
  height: 'auto',
  borderRadius: '10px',
};

const formContainerStyle = {
  marginTop: '20px',
  padding: '20px',
  backgroundColor: '#F9F9F9',
  borderRadius: '10px',
};

const formStyle = {
  display: 'flex',
  flexDirection: 'column',
};

const inputStyle = {
  padding: '10px',
  marginBottom: '10px',
  borderRadius: '5px',
  border: '1px solid #ccc',
};

const previewStyle = {
  marginBottom: '10px',
  position: 'relative',
};

const imagePreviewStyle = {
  width: '100%',
  height: 'auto',
  filter: 'blur(4px)',
};

const submitButtonStyle = {
  padding: '10px 20px',
  backgroundColor: '#FF6F00',
  border: 'none',
  borderRadius: '5px',
  color: 'white',
  cursor: 'pointer',
};

export default Marketplace;
