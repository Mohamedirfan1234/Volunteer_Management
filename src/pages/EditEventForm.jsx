import { useState } from "react";
import axios from "axios";
import "./EditEventForm.css"; // 👈 for toast styles

export default function EditEventForm({ event, onClose }) {
  const [title, setTitle] = useState(event.title || "");
  const [date, setDate] = useState(event.date || "");
  const [time, setTime] = useState(event.time || "");
  const [location, setLocation] = useState(event.location || "");
  const [capacity, setCapacity] = useState(event.capacity || "");
  const [description, setDescription] = useState(event.description || "");
  const [success, setSuccess] = useState(false); // ✅ success flag

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `https://volunteer-management-backend-7.onrender.com/api/events/${event.id}`,
        {
          title,
          location,
          date,
          time,
          capacity,
          description,
        }
      );

      setSuccess(true); // ✅ trigger toast
      setTimeout(() => {
        setSuccess(false);
        onClose(); // ✅ auto-close form after toast
      }, 3000);
    } catch (error) {
      console.error("Update failed:", error);
      alert("❌ Update failed");
    }
  };

  return (
    <>
      {success && (
        <div className="toast-success">✅ Event updated successfully!</div>
      )}

      <form
        className="p-4 bg-light shadow rounded"
        style={{ maxWidth: "600px", margin: "auto" }}
        onSubmit={handleSubmit}
      >
        <h3 className="text-center mb-4 text-primary">✏️ Edit Event Details</h3>

        <div className="mb-3">
          <label className="form-label fw-semibold">Event Title</label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="form-control"
            placeholder="Enter event title"
            required
          />
        </div>

        <div className="mb-3 row">
          <div className="col">
            <label className="form-label fw-semibold">Date</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="form-control"
              required
            />
          </div>

          <div className="col">
            <label className="form-label fw-semibold">Time</label>
            <input
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="form-control"
              required
            />
          </div>
        </div>

        <div className="mb-3">
          <label className="form-label fw-semibold">Location</label>
          <input
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="form-control"
            placeholder="Event location"
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label fw-semibold">Capacity</label>
          <input
            type="number"
            value={capacity}
            onChange={(e) => setCapacity(e.target.value)}
            className="form-control"
            placeholder="Max volunteers"
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label fw-semibold">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="form-control"
            rows={4}
            placeholder="Brief description of the event"
          />
        </div>

        <div className="d-flex justify-content-end">
          <button className="btn btn-success me-2" type="submit">
            💾 Save
          </button>
          <button
            className="btn btn-outline-secondary"
            type="button"
            onClick={onClose}
          >
            ❌ Cancel
          </button>
        </div>
      </form>
    </>
  );
}
