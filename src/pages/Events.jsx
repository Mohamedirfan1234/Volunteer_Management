// import { useEffect, useState } from "react";
// import axios from "axios";

// export default function Events() {
//   const [events, setEvents] = useState([]);

//   useEffect(() => {
//     axios.post("http://localhost:8080/api/events/add", event, {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     });
//   }, []);

//   return (
//     <div className="container mt-4">
//       <h2>All Events</h2>
//       <ul className="list-group">
//         {events.map((event, i) => (
//           <li key={i} className="list-group-item">
//             {event.name}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }
