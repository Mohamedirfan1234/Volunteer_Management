import React, { useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

const VolunteerForm = () => {
  const location = useLocation();
  const event = location.state?.selectedEvent;
  const navigate = useNavigate();

  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState(""); // Assuming you have userId from email

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Replace with actual userId logic if you have auth
      const userId = 1;

      const response = await axios.post(
        "http://localhost:8080/api/volunteers/volunteer/register",
        {
          fullName,
          phone,
          userId,
          eventId: event.id,
        }
      );

      alert("Volunteer registered successfully!");
      navigate("/volunteers"); // redirect to volunteers list
    } catch (err) {
      console.error("Error registering volunteer:", err);
      alert("Registration failed.");
    }
  };

  return (
    <div className="container my-5">
      <h2 className="mb-3">Join Event: {event?.name}</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Full Name</label>
          <input
            type="text"
            className="form-control"
            required
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Email address</label>
          <input
            type="email"
            className="form-control"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Phone Number</label>
          <input
            type="tel"
            className="form-control"
            required
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-success">
          Submit Registration
        </button>
      </form>
    </div>
  );
};

export default VolunteerForm;
