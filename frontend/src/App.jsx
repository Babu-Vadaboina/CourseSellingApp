import { AuthProvider } from "./context/AuthContext";
import { useState } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Courses from "./pages/Courses";
import CourseDetails from "./pages/CourseDetails";
import Signin from "./pages/Signin";
import Purchases from "./pages/Purchases";
import Signup from "./pages/Signup";
import Navbar from "./components/Navbar";
import AdminSignin from "./pages/admin/AdminSignin";
import AdminDashboard from "./pages/admin/AdminDashboard";
import CreateCourse from "./pages/admin/CreateCourse";
import AdminCourses from "./pages/admin/AdminCourses";
import EditCourse from "./pages/admin/EditCourse";
import AdminSignup from "./pages/admin/AdminSignup";
import AdminHome from "./pages/admin/AdminHome";
import AdminRoute from "./components/AdminRoute";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Courses />} />
          <Route path="/course/:id" element={<CourseDetails />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/purchases" element={<Purchases />} />
          {/* admin routes */}

          <Route path="/admin" element={<AdminHome />} />
          <Route path="/admin/signin" element={<AdminSignin />} />
          <Route path="/admin/signup" element={<AdminSignup />} />
          <Route
            path="/admin/dashboard"
            element={
              <AdminRoute>
                <AdminDashboard />
              </AdminRoute>
            }
          />
          <Route
            path="/admin/create-course"
            element={
              <AdminRoute>
                <CreateCourse />
              </AdminRoute>
            }
          />
          <Route
            path="/admin/courses"
            element={
              <AdminRoute>
                <AdminCourses />
              </AdminRoute>
            }
          />
          <Route
            path="/admin/edit-course/:id"
            element={
              <AdminRoute>
                <EditCourse />
              </AdminRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
