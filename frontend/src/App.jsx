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

function App() {
  const [count, setCount] = useState(0);

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
          <Route path="/admin/signin" element={<AdminSignin />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
