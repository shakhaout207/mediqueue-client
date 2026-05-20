import { Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import MainLayout from "./components/MainLayout";
import Home from "./pages/Home";
import Tutors from "./pages/Tutors";
import TutorDetails from "./pages/TutorDetails";
import AddTutor from "./pages/AddTutor";
import MyTutors from "./pages/MyTutors";
import MyBookedSessions from "./pages/MyBookedSessions";
import Login from "./pages/Login";
import Register from "./pages/Register";
import NotFound from "./pages/NotFound";
import PrivateRoute from "./components/PrivateRoute";

function TitleUpdater() {
  const location = useLocation();
  useEffect(() => {
    const titles = {
      "/": "Home | MediQueue",
      "/tutors": "Tutors | MediQueue",
      "/add-tutor": "Add Tutor | MediQueue",
      "/my-tutors": "My Tutors | MediQueue",
      "/my-booked-sessions": "My Booked Sessions | MediQueue",
      "/login": "Login | MediQueue",
      "/register": "Register | MediQueue",
    };
    if (location.pathname.startsWith("/tutors/")) {
      document.title = "Tutor Details | MediQueue";
    } else {
      document.title = titles[location.pathname] || "MediQueue";
    }
  }, [location]);
  return null;
}

function App() {
  return (
    <>
      <TitleUpdater />
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="tutors" element={<Tutors />} />
          <Route path="tutors/:id" element={
            <PrivateRoute><TutorDetails /></PrivateRoute>
          } />
          <Route path="add-tutor" element={
            <PrivateRoute><AddTutor /></PrivateRoute>
          } />
          <Route path="my-tutors" element={
            <PrivateRoute><MyTutors /></PrivateRoute>
          } />
          <Route path="my-booked-sessions" element={
            <PrivateRoute><MyBookedSessions /></PrivateRoute>
          } />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;