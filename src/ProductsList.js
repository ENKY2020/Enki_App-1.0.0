import React, { useState, useEffect } from 'react';
import supabase from '.src/supabaseClient';  // Import the Supabase client

const ProductsList = () => {
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    const { data, error } = await supabase.from('products').select('*');
    if (error) {
      console.error('Error fetching products:', error);
    } else {
      console.log('Fetched products:', data);
      setProducts(data); // Update state with fetched products
    }
  };

  const updateProductStatus = async (productId, newStatus) => {
    const { data, error } = await supabase
      .from('products')
      .update({ status: newStatus })
      .eq('id', productId);

    if (error) {
      console.error('Error updating product status:', error);
    } else {
      console.log('Updated product status:', data);
      // Optionally update the UI to reflect the change
    }
  };

  useEffect(() => {
    fetchProducts();  // Fetch products on component mount
  }, []);

  return (
    <div>
      <h1>Products</h1>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            {product.name} - {product.cost} (Status: {product.status}) 
            <button onClick={() => updateProductStatus(product.id, 'approved')}>Approve</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductsList;
