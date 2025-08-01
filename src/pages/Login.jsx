// import { useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import { setToken } from "../utils/auth";

// const Login = () => {
//   const [form, setForm] = useState({ email: "", password: "" });
//   const navigate = useNavigate();

//   const handleChange = (e) =>
//     setForm({ ...form, [e.target.name]: e.target.value });

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await axios.post(
//         "http://localhost:8080/api/auth/login",
//         form
//       );
//       setToken(res.data.token); // store JWT token
//       alert("Login successful");
//       navigate("/"); // go to home
//     } catch (err) {
//       alert("Login failed: " + err.response.data);
//     }
//   };

//   return (
//     <div className="container mt-5 d-flex justify-content-center">
//       <div className="card p-4 shadow" style={{ width: "400px" }}>
//         <h3 className="text-center mb-3">Login</h3>
//         <form onSubmit={handleSubmit}>
//           <input
//             type="email"
//             name="email"
//             className="form-control mb-2"
//             placeholder="Email"
//             onChange={handleChange}
//             required
//           />
//           <input
//             type="password"
//             name="password"
//             className="form-control mb-2"
//             placeholder="Password"
//             onChange={handleChange}
//             required
//           />
//           <button className="btn btn-primary w-100">Login</button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Login;
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../css/login.css";
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
