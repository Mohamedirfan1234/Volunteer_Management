import React, { useState } from "react";
import axios from "axios";
import "./CreateEvent.css";

const CreateEvent = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
    time: "",
    location: "",
    capacity: "",
  });

  const [success, setSuccess] = useState(false); // ✅ Added

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    if (!token) {
      alert("User not authenticated");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:8080/api/events/add",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Event created:", response.data);
      setSuccess(true); // ✅ Show animation

      setFormData({
        title: "",
        description: "",
        date: "",
        time: "",
        location: "",
        capacity: "",
      });

      // ✅ Hide animation after 3s
      setTimeout(() => setSuccess(false), 3000);
    } catch (error) {
      console.error("❌ Error creating event:", error);
      alert("❌ Failed to create event.");
    }
  };

  return (
    <div className="event-container">
      {/* ✅ Custom Success Toast */}
      {success && (
        <div className="toast-success">🎉 Event created successfully!</div>
      )}

      <form className="event-form" onSubmit={handleSubmit}>
        <h2>Create New Event</h2>

        <label htmlFor="title">Event Title</label>
        <input
          type="text"
          id="title"
          name="title"
          placeholder="Enter event title"
          value={formData.title}
          onChange={handleChange}
          required
        />

        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          name="description"
          placeholder="Enter event description"
          value={formData.description}
          onChange={handleChange}
          required
        />

        <label htmlFor="date">Date</label>
        <input
          type="date"
          id="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          required
        />

        <label htmlFor="time">Time</label>
        <input
          type="time"
          id="time"
          name="time"
          value={formData.time}
          onChange={handleChange}
          required
        />

        <label htmlFor="location">Location</label>
        <input
          type="text"
          id="location"
          name="location"
          placeholder="Enter event location"
          value={formData.location}
          onChange={handleChange}
          required
        />

        <label htmlFor="capacity">Capacity</label>
        <input
          type="number"
          id="capacity"
          name="capacity"
          placeholder="Enter number of participants"
          value={formData.capacity}
          onChange={handleChange}
          required
        />

        <button type="submit">Submit Event</button>
      </form>
    </div>
  );
};

export default CreateEvent;
