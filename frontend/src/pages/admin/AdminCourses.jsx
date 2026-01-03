import { useEffect, useState } from "react";
import api from "../../api/axios";
import { Link } from "react-router-dom";

export default function AdminCourses() {
  const [courses, setCourses] = useState([]);

  function fetchCourses() {
    api
      .get("/admin/courses")
      .then((res) => setCourses(res.data.courses))
      .catch(console.error);
  }

  useEffect(() => {
    fetchCourses();
  }, []);

  async function handleDelete(id) {
    if (!confirm("Are you sure you want to delete this course?")) return;

    try {
      await api.delete(`/admin/course/${id}`);
      fetchCourses(); // refresh list
    } catch (err) {
      alert("Delete failed");
    }
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">My Courses</h1>

      {courses.map((course) => (
        <div
          key={course._id}
          className="border p-4 rounded flex justify-between items-center mb-3"
        >
          <div>
            <h2 className="font-semibold">{course.title}</h2>
            <p className="text-sm text-gray-600">
              ₹{course.price} • {course.published ? "Published" : "Draft"}
            </p>
          </div>

          <div className="flex gap-4">
            <Link
              to={`/admin/edit-course/${course._id}`}
              className="text-blue-600"
            >
              Edit
            </Link>

            <button
              onClick={() => handleDelete(course._id)}
              className="text-red-600"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
