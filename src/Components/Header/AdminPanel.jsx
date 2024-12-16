import React, { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient'; // Import Supabase client
import { useNavigate } from 'react-router-dom'; // For redirecting non-admin users

const AdminPanel = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate(); // For navigation

  // Check if the user is an admin
  useEffect(() => {
    const checkAdmin = async () => {
      const user = supabase.auth.user();
      if (user) {
        const { data, error } = await supabase
          .from('users') // Assuming you have a 'users' table with a 'role' column
          .select('role')
          .eq('id', user.id)
          .single();

        if (error) {
          console.error('Error fetching user role:', error);
        } else {
          setIsAdmin(data?.role === 'admin');
        }
      } else {
        navigate('/login'); // Redirect to login if not authenticated
      }
    };

    checkAdmin();
  }, [navigate]);

  // Fetch pending products
  useEffect(() => {
    const fetchPendingProducts = async () => {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('status', 'pending');

      if (error) {
        console.error('Error fetching products:', error);
      } else {
        setProducts(data);
      }
      setLoading(false);
    };

    if (isAdmin) {
      fetchPendingProducts();
    }
  }, [isAdmin]);

  // Approve a product
  const approveProduct = async (productId) => {
    const { error } = await supabase
      .from('products')
      .update({ status: 'approved' })
      .eq('id', productId);

    if (error) {
      console.error('Error approving product:', error);
    } else {
      setProducts(products.filter(product => product.id !== productId));
    }
  };

  // Reject a product
  const rejectProduct = async (productId) => {
    const { error } = await supabase
      .from('products')
      .update({ status: 'rejected' })
      .eq('id', productId);

    if (error) {
      console.error('Error rejecting product:', error);
    } else {
      setProducts(products.filter(product => product.id !== productId));
    }
  };

  // Edit product details
  const editProduct = async (productId) => {
    const updatedName = prompt('Enter updated product name:');
    const updatedDescription = prompt('Enter updated product description:');
    const updatedPrice = prompt('Enter updated price:');

    const { error } = await supabase
      .from('products')
      .update({
        name: updatedName,
        description: updatedDescription,
        price: updatedPrice,
      })
      .eq('id', productId);

    if (error) {
      console.error('Error editing product:', error);
    } else {
      setProducts(products.map(product =>
        product.id === productId
          ? { ...product, name: updatedName, description: updatedDescription, price: updatedPrice }
          : product
      ));
    }
  };

  if (!isAdmin) {
    return <p>Access denied. You must be an admin to view this page.</p>;
  }

  return (
    <div>
      <h1>Admin Product Review Panel</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Product ID</th>
              <th>Name</th>
              <th>Description</th>
              <th>Price</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map(product => (
              <tr key={product.id}>
                <td>{product.id}</td>
                <td>{product.name}</td>
                <td>{product.description}</td>
                <td>{product.price}</td>
                <td>{product.status}</td>
                <td>
                  <button onClick={() => approveProduct(product.id)}>Approve</button>
                  <button onClick={() => rejectProduct(product.id)}>Reject</button>
                  <button onClick={() => editProduct(product.id)}>Edit</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AdminPanel;
