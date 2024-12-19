import React, { useEffect, useState } from 'react';

const AdminDashboard = () => {
  const [products, setProducts] = useState([]);
  
  useEffect(() => {
    // Fetch pending products from the API or database
    fetch('/api/pending-products')  // Your backend API route for fetching pending products
      .then(response => response.json())
      .then(data => setProducts(data))
      .catch(error => console.error('Error fetching products:', error));
  }, []);
  
  const handleApprove = (productId) => {
    // Call the API to approve the product
    fetch(`/api/approve-product/${productId}`, {
      method: 'POST',
    })
      .then(() => alert('Product Approved!'))
      .catch(error => console.error('Error approving product:', error));
  };

  const handleReject = (productId) => {
    // Call the API to reject the product
    const rejectionReason = prompt('Enter rejection reason:');
    if (rejectionReason) {
      fetch(`/api/reject-product/${productId}`, {
        method: 'POST',
        body: JSON.stringify({ reason: rejectionReason }),
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then(() => alert('Product Rejected!'))
        .catch(error => console.error('Error rejecting product:', error));
    }
  };

  const handleEdit = (productId) => {
    // Redirect to an edit page or open a modal to edit product details
    window.location.href = `/admin/edit-product/${productId}`;
  };

  return (
    <div>
      <h2>Pending Products</h2>
      <table>
        <thead>
          <tr>
            <th>Product Name</th>
            <th>Price</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map(product => (
            <tr key={product.id}>
              <td>{product.product_name}</td>
              <td>{product.price}</td>
              <td>
                <button onClick={() => handleApprove(product.id)}>Approve</button>
                <button onClick={() => handleReject(product.id)}>Reject</button>
                <button onClick={() => handleEdit(product.id)}>Edit</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminDashboard;
