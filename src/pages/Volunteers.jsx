import { useEffect, useState } from "react";
import axios from "axios";

export default function Volunteers() {
  const [volunteers, setVolunteers] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/volunteers")
      .then((res) => setVolunteers(res.data));
  }, []);

  return (
    <div className="container mt-4">
      <h2>All Volunteers</h2>
      <ul className="list-group">
        {volunteers.map((v, i) => (
          <li key={i} className="list-group-item">
            {v.fullName} - {v.phone} - Event: {v.event?.eventName}
          </li>
        ))}
      </ul>
    </div>
  );
}
