import { AuthProvider } from "./context/AuthContext";
import { useState } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Courses from "./pages/Courses";
import CourseDetails from "./pages/CourseDetails";
import Signin from "./pages/Signin";
import Purchases from "./pages/Purchases";
//import Signup from "./pages/Signup";
import Navbar from "./components/Navbar";

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
          {/* <Route path="/signup" element={<Signup />} /> */}
          <Route path="/purchases" element={<Purchases />} />
        </Routes>
        <h2>hello there</h2>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
