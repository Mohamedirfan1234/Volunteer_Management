import { Navbar, Nav, Container, Button } from "react-bootstrap";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../css/navbar.css";

export default function MyNavbar() {
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
    <Navbar expand="lg" bg="primary" variant="dark" className="shadow-sm">
      <Container>
        <Navbar.Brand as={Link} to="/">
          🌟 Volunteer Management
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarNav" />
        <Navbar.Collapse id="navbarNav">
          <Nav className="me-auto ms-3">
            <Nav.Link as={NavLink} to="/" end>
              Home
            </Nav.Link>
            <Nav.Link as={NavLink} to="/events">
              Events
            </Nav.Link>
            <Nav.Link as={NavLink} to="/about">
              About
            </Nav.Link>
            {role === "ADMIN" && (
              <Nav.Link as={NavLink} to="/admin">
                Admin Panel
              </Nav.Link>
            )}
          </Nav>
          <div className="d-flex">
            {!isLoggedIn ? (
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
            ) : (
              <Button
                className="btn btn-light text-danger fw-bold"
                onClick={handleLogout}
              >
                Logout
              </Button>
            )}
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
