import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdminDashboard from "./Components/AdminDashboard"; // Adjusted path
import App from "./App";
import HeaderSection from "./Components/Header/HeaderSection"; // Correct import path

function Main() {
  return (
    <Router>
      {/* The HeaderSection is visible across all pages */}
      <HeaderSection /> 
      <Routes>
        {/* Main app route */}
        <Route path="/" element={<App />} />
        {/* Admin dashboard route */}
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
      </Routes>
    </Router>
  );
}

export default Main;
