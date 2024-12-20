import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdminDashboard from "./Components/AdminDashboard"; // Adjusted path
import App from "./App";
import HeaderSection from "./Components/Header/HeaderSection"; // Correct import path

function Main() {
  return (
    <Router>
      <HeaderSection /> {/* Updated to use HeaderSection */}
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
      </Routes>
    </Router>
  );
}

export default Main;
