import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useEffect } from "react";

export default function AdminDashboard() {
  const { token } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    if (!token) {
      navigate("/admin/signin");
    }
  }, [token, navigate]);
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
      <Link
        to="/admin/create-course"
        className="inline-block bg-black text-white px-4 py-2 rounded"
      >
        Create New Course
      </Link>
      <Link
        to="/admin/courses"
        className="inline-block bg-gray-800 text-white px-4 py-2 rounded mr-4"
      >
        View My Courses
      </Link>
    </div>
  );
}
