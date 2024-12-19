import React, { useState } from 'react';
import { supabase } from './supabaseClient';

const AddProduct = () => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    cost: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = supabase.auth.user(); // Get logged-in user
    if (!user) {
      alert('Please log in to add a product.');
      return;
    }

    const { data, error } = await supabase
      .from('products')
      .insert({
        name: formData.name,
        description: formData.description,
        cost: parseFloat(formData.cost),
        uploaded_by: user.id, // Seller's UUID
        status: 'pending',
      });

    if (error) {
      console.error('Error adding product:', error);
    } else {
      alert('Product submitted for review.');
      setFormData({ name: '', description: '', cost: '' });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add a Product</h2>
      <input
        type="text"
        name="name"
        placeholder="Product Name"
        value={formData.name}
        onChange={handleChange}
        required
      />
      <textarea
        name="description"
        placeholder="Product Description"
        value={formData.description}
        onChange={handleChange}
        required
      />
      <input
        type="number"
        name="cost"
        placeholder="Cost"
        value={formData.cost}
        onChange={handleChange}
        required
      />
      <button type="submit">Submit</button>
    </form>
  );
};

export default AddProduct;
