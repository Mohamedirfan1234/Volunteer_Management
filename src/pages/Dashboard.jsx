import { logout } from "../utils/auth";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };
  const role = localStorage.getItem("role");

  {
    role === "ADMIN" && (
      <Link to="/admin" className="nav-link">
        Admin Panel
      </Link>
    );
  }

  return (
    <div className="container mt-5">
      <h2>Welcome to Volunteer Dashboard</h2>
      <p>You are logged in!</p>
      <button className="btn btn-danger mt-3" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
};

export default Dashboard;
