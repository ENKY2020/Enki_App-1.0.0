import React, { useEffect, useState } from "react";
import { supabase } from "../supabaseClient"; // Ensure correct import

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch all users and products
  useEffect(() => {
    const fetchUsersAndProducts = async () => {
      try {
        setLoading(true);
        setError(null); // Clear any previous errors

        // Fetch users from Supabase
        const { data: usersData, error: usersError } = await supabase
          .from("users")
          .select("*");

        if (usersError) throw usersError;
        setUsers(usersData);
        console.log("Users fetched:", usersData);

        // Fetch products from Supabase
        const { data: productsData, error: productsError } = await supabase
          .from("products")
          .select("*");

        if (productsError) throw productsError;
        setProducts(productsData);
        console.log("Products fetched:", productsData);

        setLoading(false);
      } catch (error) {
        setLoading(false);
        setError("Error fetching data. Please try again later.");
        console.error("Error fetching data:", error);
      }
    };

    fetchUsersAndProducts();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="admin-dashboard">
      <h1>Welcome to Admin Dashboard</h1>
      <section>
        <h2>Dashboard Overview</h2>
        <p>Manage your users, view analytics, and more.</p>
      </section>

      <section>
        <h2>User Management</h2>
        <table>
          <thead>
            <tr>
              <th>User ID</th>
              <th>Email</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.length > 0 ? (
              users.map((user) => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.email}</td>
                  <td>{user.role}</td>
                  <td>
                    <button>Edit</button>
                    <button>Delete</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4">No users found</td>
              </tr>
            )}
          </tbody>
        </table>
      </section>

      <section>
        <h2>Product Management</h2>
        <table>
          <thead>
            <tr>
              <th>Product ID</th>
              <th>Name</th>
              <th>Price</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.length > 0 ? (
              products.map((product) => (
                <tr key={product.id}>
                  <td>{product.id}</td>
                  <td>{product.name}</td>
                  <td>{product.price}</td>
                  <td>{product.status}</td>
                  <td>
                    <button>Edit</button>
                    <button>Delete</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5">No products found</td>
              </tr>
            )}
          </tbody>
        </table>
      </section>

      {/* Add other sections like analytics, notifications, etc. */}
    </div>
  );
};

export default AdminDashboard;
