import { useEffect, useState } from "react";
import api from "../api/axios";
import CourseCard from "../components/CourseCard";

export default function Courses() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [q, setQ] = useState("");

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    api
      .get("/courses")
      .then((res) => {
        if (!cancelled) setCourses(res.data.courses || []);
      })
      .catch((e) => {
        console.error("Failed to load courses", e);
      })
      .finally(() => !cancelled && setLoading(false));
    return () => (cancelled = true);
  }, []);

  const filtered = courses.filter((c) =>
    `${c.title} ${c.description}`.toLowerCase().includes(q.toLowerCase())
  );

  return (
    <main className="max-w-6xl mx-auto p-6">
      <header className="mb-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">All Courses</h1>
          <p className="text-sm text-gray-500">Browse and buy courses</p>
        </div>

        <div className="w-full md:w-72">
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search courses..."
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>
      </header>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div
              key={i}
              className="animate-pulse bg-white rounded-lg p-4 h-56"
            />
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <div className="text-center text-gray-500">No courses available</div>
      ) : (
        <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {filtered.map((course) => (
            <CourseCard key={course._id} course={course} />
          ))}
        </section>
      )}
    </main>
  );
}
