import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdminDashboard from "./components/Header/AdminDashboard";
import App from "./App";
import Header from "./components/Header";

function Main() {
  return (
    <Router>
      <Header /> {/* Include Header in the main layout */}
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
      </Routes>
    </Router>
  );
}

export default Main;