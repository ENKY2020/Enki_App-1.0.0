// AddProductForm.js

import { useState } from 'react';
import { supabase } from './supabaseClient'; // Make sure this is the correct import

const AddProductForm = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [cost, setCost] = useState('');
  const [status, setStatus] = useState('pending'); // Default status
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !description || !cost || !status) {
      setError('Please fill all the fields');
      return;
    }

    try {
      const { user } = await supabase.auth.getUser(); // Get the current logged-in user

      if (!user) {
        setError('You must be logged in to add a product');
        return;
      }

      const { data, error } = await supabase
        .from('products')
        .insert([
          {
            name,
            description,
            cost: parseFloat(cost),
            status,
            uploaded_by: user.id, // Link product to logged-in seller
          },
        ]);

      if (error) {
        throw error;
      }

      // Reset form and show success message
      setName('');
      setDescription('');
      setCost('');
      setStatus('pending');
      setError(null);
      alert('Product added successfully!');
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add New Product</h2>
      <div>
        <label>Product Name:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div>
        <label>Description:</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <div>
        <label>Cost:</label>
        <input
          type="number"
          value={cost}
          onChange={(e) => setCost(e.target.value)}
        />
      </div>
      <div>
        <label>Status:</label>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="pending">Pending</option>
          <option value="approved">Approved</option>
          <option value="rejected">Rejected</option>
        </select>
      </div>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <button type="submit">Add Product</button>
    </form>
  );
};

export default AddProductForm;
