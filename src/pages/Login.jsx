import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../css/Login.css";

// Include animation styles here

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [animationType, setAnimationType] = useState(""); // 'success' or 'error'

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    setSuccessMsg("");
    setAnimationType("");

    try {
      const res = await axios.post("http://localhost:8080/api/auth/login", {
        email,
        password,
      });

      const { token, role } = res.data;

      localStorage.setItem("token", token);
      localStorage.setItem("role", role); // store the role
      setSuccessMsg("✅ Welcome back!");
      setAnimationType("success");

      setTimeout(() => {
        // Redirect based on role
        if (role === "ADMIN") {
          navigate("/");
        } else {
          navigate("/"); // regular user
        }
        window.location.reload(); // update navbar
      }, 1500);
    } catch (err) {
      setErrorMsg("❌ Invalid email or password");
      setAnimationType("error");
    }
  };
  return (
    <div className="login-container">
      <h2 className="login-title">Login</h2>

      {/* Success Message Box */}
      {successMsg && (
        <div className={`animated-line-left success-box`}>{successMsg}</div>
      )}

      {/* Error Message Box */}
      {errorMsg && (
        <div className={`animated-line-right error-box`}>{errorMsg}</div>
      )}

      <form onSubmit={handleLogin}>
        <input
          className="login-input"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="login-input"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="login-button" type="submit">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
