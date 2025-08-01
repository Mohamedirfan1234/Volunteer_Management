import { NavLink, Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "../css/navbar.css";

export default function Navbar() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const role = localStorage.getItem("role");

  useEffect(() => {
    setIsLoggedIn(!!localStorage.getItem("token"));
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
    setIsLoggedIn(false);
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary shadow-sm">
      <div className="container">
        {/* Brand */}
        <Link className="navbar-brand fw-bold" to="/">
          🌟 Volunteer Management
        </Link>

        {/* Toggler */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>

        {/* Links */}
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0 ms-3">
            <li className="nav-item">
              <NavLink className="nav-link" to="/" end>
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/events">
                Events
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink className="nav-link" to="/about">
                About
              </NavLink>
            </li>
            {role === "ADMIN" && (
              <li className="nav-item">
                <NavLink className="nav-link" to="/admin">
                  Admin Panel
                </NavLink>
              </li>
            )}
          </ul>

          <div className="d-flex">
            {!isLoggedIn ? (
              <>
                {localStorage.getItem("token") ? (
                  <button
                    className="btn btn-outline-light"
                    onClick={() => {
                      localStorage.removeItem("token");
                      window.location.reload();
                    }}
                  >
                    Logout
                  </button>
                ) : (
                  <>
                    <Link className="btn btn-outline-light me-2" to="/login">
                      Login
                    </Link>
                    <Link
                      className="btn btn-light text-primary fw-bold"
                      to="/signup"
                    >
                      Signup
                    </Link>
                  </>
                )}
              </>
            ) : (
              <button
                className="btn btn-light text-danger fw-bold"
                onClick={handleLogout}
              >
                Logout
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
