import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [events, setEvents] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/events")
      .then((res) => setEvents(res.data))
      .catch((err) => console.error("Error fetching events:", err));
  }, []);

  const handleVolunteer = (event) => {
    navigate("/volunteer", { state: { selectedEvent: event } });
  };

  const handleCreateEvent = () => {
    navigate("/create-event");
  };

  return (
    <div className="container py-5">
      {/* Hero Section */}
      <div className="text-center mb-5">
        <h1 className="fw-bold text-primary">
          Welcome to Volunteer Management 🌟
        </h1>
        <p className="lead text-muted">
          Empower communities. Be the change. Create or join events easily.
        </p>

        <div className="mt-4">
          <button className="btn btn-success mx-2" onClick={handleCreateEvent}>
            ➕ Create Event
          </button>
          {/* <button
            className="btn btn-outline-primary mx-2"
            onClick={() => navigate("/volunteer")}
          >
            🙋‍♂️ Join as Volunteer
          </button> */}
        </div>
      </div>

      {/* Events Display */}
      <h2 className="text-center mb-4">🌐 Available Volunteer Events</h2>
      <div className="row">
        {events.map((event) => (
          <div className="col-md-4 mb-4" key={event.id}>
            <div className="card h-100 shadow-sm event-card">
              <div className="card-body d-flex flex-column">
                <h5 className="card-title">{event.title}</h5>
                <p className="card-text">{event.description}</p>
                <p className="text-muted">
                  📅 {event.date} | 📍 {event.location}
                </p>
                <button
                  className="btn btn-primary mt-auto"
                  onClick={() => handleVolunteer(event)}
                >
                  Volunteer Now
                </button>
              </div>
            </div>
          </div>
        ))}
        {events.length === 0 && (
          <p className="text-center text-muted">
            No events available at the moment.
          </p>
        )}
      </div>
    </div>
  );
};

export default Home;
