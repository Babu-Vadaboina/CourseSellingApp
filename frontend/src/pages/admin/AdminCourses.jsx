import { useEffect, useState } from "react";
import api from "../../api/axios";
import { Link } from "react-router-dom";

export default function AdminCourses() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    api
      .get("/admin/courses")
      .then((res) => setCourses(res.data.courses))
      .catch(console.error);
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">My Courses</h1>

      {courses.length === 0 && <p>No courses yet</p>}

      <div className="space-y-4">
        {courses.map((course) => (
          <div
            key={course._id}
            className="border p-4 rounded flex justify-between items-center"
          >
            <div>
              <h2 className="font-semibold">{course.title}</h2>
              <p className="text-sm text-gray-600">
                ₹{course.price} • {course.published ? "Published" : "Draft"}
              </p>
            </div>

            <Link
              to={`/admin/edit-course/${course._id}`}
              className="text-blue-600"
            >
              Edit
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
