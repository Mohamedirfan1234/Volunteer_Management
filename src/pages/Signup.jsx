import React, { useState } from "react";
import axios from "axios";
import "../css/login.css"; // Reuse login styles for signup too

const Signup = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "USER",
  });

  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [animationType, setAnimationType] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccessMsg("");
    setErrorMsg("");
    setAnimationType("");

    try {
      await axios.post("http://localhost:8080/api/auth/signup", form);
      setSuccessMsg("✅ Registration successful!");
      setAnimationType("success");
    } catch (err) {
      setErrorMsg("❌ Registration failed!");
      setAnimationType("error");
    }
  };

  return (
    <div className="login-container">
      <h2 className="login-title">Sign Up</h2>

      {successMsg && (
        <div className={`animated-line-left success-box`}>{successMsg}</div>
      )}
      {errorMsg && (
        <div className={`animated-line-right error-box`}>{errorMsg}</div>
      )}

      <form onSubmit={handleSubmit}>
        <input
          className="login-input"
          type="text"
          name="name"
          placeholder="Name"
          onChange={handleChange}
          required
        />
        <input
          className="login-input"
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          required
        />
        <input
          className="login-input"
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          required
        />

        <select
          name="role"
          className="login-input"
          onChange={handleChange}
          required
        >
          <option value="USER">User</option>
          <option value="ADMIN">Admin</option>
        </select>

        <button className="login-button" type="submit">
          Register
        </button>
      </form>
    </div>
  );
};

export default Signup;
