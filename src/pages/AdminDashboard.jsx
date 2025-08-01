import axios from "axios";
import EventList from "./EventList";
import { useNavigate } from "react-router-dom";

export default function AdminDashboard() {
  const navigate = useNavigate();
  const role = localStorage.getItem("role");

  if (role !== "ADMIN") return <h3>Access Denied</h3>;

  const goToCreateEvent = () => {
    navigate("/create-event");
  };

  return (
    <div className="container mt-4">
      <h2>Welcome, Admin 👑</h2>
      <button className="btn btn-primary my-3" onClick={goToCreateEvent}>
        ➕ Create New Event
      </button>
      <EventList />
    </div>
  );
}
