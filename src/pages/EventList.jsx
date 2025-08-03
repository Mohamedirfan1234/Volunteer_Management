import { useEffect, useState } from "react";
import axios from "axios";
import VolunteerListByEvent from "./VolunteerListByEvent";
import EditEventForm from "./EditEventForm";

export default function EventList() {
  const [events, setEvents] = useState([]);
  const [selectedEventId, setSelectedEventId] = useState(null);
  const [editingEvent, setEditingEvent] = useState(null);
  const [role, setRole] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/events")
      .then((res) => setEvents(res.data))
      .catch((err) => console.error(err));

    const userRole = localStorage.getItem("role");
    setRole(userRole);
  }, []);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this event?"
    );
    if (!confirmDelete) return;

    try {
      await axios.delete(`http://localhost:8080/api/events/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      alert("Event deleted successfully");

      // Refresh or remove the deleted event from the UI list
      setEvents((prevEvents) => prevEvents.filter((event) => event.id !== id));
    } catch (error) {
      console.error("Delete failed:", error);

      const message =
        error.response?.data || "Something went wrong. Check server logs.";
      alert("Delete failed: " + message);
    }
  };

  const handleEditClose = () => {
    setEditingEvent(null);
    axios
      .get("https://volunteer-management-backend-7.onrender.com/api/events")
      .then((res) => setEvents(res.data));
  };

  return (
    <div className="container mt-4">
      <h2>All Events</h2>
      {events.map((event) => (
        <div key={event.id} className="card mb-3 shadow-sm">
          <div className="card-body">
            <h5 className="card-title">{event.name}</h5>
            <p className="card-text">{event.description}</p>

            <button
              className="btn btn-outline-primary me-2"
              onClick={() =>
                setSelectedEventId(
                  selectedEventId === event.id ? null : event.id
                )
              }
            >
              {selectedEventId === event.id ? "Hide Details" : "View Details"}
            </button>

            {selectedEventId === event.id && (
              <div className="mt-3">
                {/* ADMIN-ONLY CONTROLS */}
                {role === "ADMIN" && (
                  <div className="d-flex flex-wrap gap-2 mb-3">
                    <button
                      className="btn btn-info"
                      onClick={() => setEditingEvent(event)}
                    >
                      ✏️ Edit
                    </button>
                    <button
                      className="btn btn-danger"
                      onClick={() => handleDelete(event.id)}
                    >
                      🗑️ Delete
                    </button>
                  </div>
                )}

                {editingEvent &&
                  editingEvent.id === event.id &&
                  role === "ADMIN" && (
                    <EditEventForm
                      event={editingEvent}
                      onClose={handleEditClose}
                    />
                  )}

                <VolunteerListByEvent eventId={event.id} />
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
