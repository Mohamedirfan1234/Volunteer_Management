import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import Events from "./pages/EventList";
import Volunteers from "./pages/Volunteers";
import VolunteerForm from "./pages/VolunteerForm";

import CreateEvent from "./pages/CreateEvent"; // ✅ ADDED THIS

import ProtectedRoute from "./components/ProtectedRoute";

import About from "./pages/About";
import EventList from "./pages/EventList";
import AdminDashboard from "./pages/AdminDashboard";

function App() {
  const role = localStorage.getItem("role");

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        {/* 🌐 Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/volunteer" element={<VolunteerForm />} />

        <Route path="/about" element={<About />} />

        {/* 🔐 Protected Routes */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/events"
          element={
            <ProtectedRoute>
              <EventList />
            </ProtectedRoute>
          }
        />
        <Route
          path="/volunteers"
          element={
            <ProtectedRoute>
              <Volunteers />
            </ProtectedRoute>
          }
        />

        {/* 👨‍💼 Admin-Only Routes */}
        <Route
          path="/create-event"
          element={
            <ProtectedRoute>
              {role === "ADMIN" ? <CreateEvent /> : <Navigate to="/" />}
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              {role === "ADMIN" ? <AdminDashboard/> : <Navigate to="/" />}
            </ProtectedRoute>
          }
        
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
