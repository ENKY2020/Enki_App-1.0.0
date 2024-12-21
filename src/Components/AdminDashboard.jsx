import React, { useEffect, useState } from "react";
import { supabase } from "../supabaseClient"; // Assuming you already have supabase set up

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);

  // Fetch all users and products
  useEffect(() => {
    const fetchUsersAndProducts = async () => {
      try {
        // Fetch users (assuming you have a 'users' table)
        const { data: usersData, error: usersError } = await supabase
          .from("users")
          .select("*");

        if (usersError) throw usersError;
        setUsers(usersData);

        // Fetch products (assuming you have a 'products' table)
        const { data: productsData, error: productsError } = await supabase
          .from("products")
          .select("*");

        if (productsError) throw productsError;
        setProducts(productsData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchUsersAndProducts();
  }, []);

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
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td>
                  <button>Edit</button>
                  <button>Delete</button>
                </td>
              </tr>
            ))}
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
            {products.map((product) => (
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
            ))}
          </tbody>
        </table>
      </section>

      {/* Add other sections like analytics, notifications, etc. */}
    </div>
  );
};

export default AdminDashboard;
