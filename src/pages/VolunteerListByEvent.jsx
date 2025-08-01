import { useEffect, useState } from "react";
import axios from "axios";

export default function VolunteerListByEvent({ eventId }) {
  const [volunteers, setVolunteers] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/volunteers/event/${eventId}`)
      .then((res) => {
        console.log("Fetched volunteers:", res.data);
        setVolunteers(res.data);
      })
      .catch((err) => {
        console.error("Error fetching volunteers:", err);
        setVolunteers([]); // fallback
      });
  }, [eventId]);

  return (
    <div className="mt-3">
      <h5>👥 Volunteers Registered</h5>
      {volunteers.length === 0 ? (
        <p>No volunteers yet.</p>
      ) : (
        <ul className="list-group">
          {volunteers.map((v, i) => (
            <li key={i} className="list-group-item">
              <strong>{v.fullName}</strong> - {v.phone}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
