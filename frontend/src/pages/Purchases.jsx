import { useEffect } from "react";
import { useState } from "react";
import api from "../api/axios";

export default function Purchases() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    api
      .get("/user/purchases")
      .then((res) => {
        setCourses(res.data.courses);
      })
      .catch(console.error);
  }, []);
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">My Courses</h1>

      {courses.length === 0 && <p>No purchases yet</p>}

      <ul className="space-y-3">
        {courses.map((c) => (
          <li key={c._id} className="border p-4 rounded">
            {c.title}
          </li>
        ))}
      </ul>
    </div>
  );
}
